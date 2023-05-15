<template>
  <q-page padding class="container q-gutter-y-md">

    <div class="row justify-between">
      <span class="text-bold text-primary estoque-h1">
        Registrar saída de produtos
      </span>
    </div>

    <div class="row justify-center">
      <q-card class="full-width" flat>
        <q-card-section>
          <div class="row q-gutter-y-xs justify-center">
            <div class="row q-gutter-x-sm no-wrap">
              <input-search-produtos
                v-model="produtosSelecionados"
                :entrada="false"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-section
          style="min-height: 400px;"
          class="scroll"
        >
          <div
            v-if="produtosSelecionados.length === 0"
            class="column items-center justify-center q-gutter-x-sm no-wrap"
            style="height: 400px; width: 100%"
          >
            <span
              class="q-gutter-x-sm text-grey-9"
              style="font-size: 20px;"
            >
              Nenhum produto selecionado!
              <q-icon
                name="fas fa-box-open"
                size="20px"
                color="negative"
              />
            </span>

            <span
              class="text-grey-6"
              style="font-size: 12px;"
            >
              Utilize  o código QR ou o campo de pesquisa
            </span>
          </div>

          <q-table
            v-if="produtosSelecionados.length != 0"
            style="width: 100%"
            row-key="_id"
            :rows="produtosSelecionados"
            :columns="columns"
            wrap-cells
            :hide-bottom="() => produtosSelecionados ? produtosSelecionados?.length > 0 : true"
            v-model:pagination="pagination"
            hide-pagination
            flat
            bordered
          >
            <template #header="props">
              <q-tr :props="props">
                <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  class="estoque-table-header"
                >
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                >
                  <div v-if="col.name === 'expand'">
                    <q-btn
                      unelevated
                      round
                      flat
                      color="grey-7"
                      :class="props.expand ? 'rotate-180': ''"
                      style="transition: transform 0.3s;"
                      icon="keyboard_arrow_down"
                      @click.stop="() => props.expand ? props.expand = false : loadUnidades(props)"
                    />
                  </div>

                  <div v-else-if="col.name === 'delete'">
                    <q-btn
                      unelevated
                      round
                      flat
                      color="red"
                      icon="las la-trash"
                      @click="onDelete(props.row)"
                    >
                      <q-tooltip
                        delay="500"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        Remover todas as unidades adicionadas
                      </q-tooltip>
                    </q-btn>
                  </div>

                  <div
                    v-else
                  >
                    {{ col.value }}
                  </div>
                </q-td>

              </q-tr>

              <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%" style="padding:0">
                  <div class="row" style="width: 100%">
                    <div
                      v-if="props.row.loading"
                      class="column justify-center items-center q-my-sm"
                      style="width: 100%"
                    >
                      <q-spinner-hourglass
                        color="primary"
                        size="4em"
                      />
                      <span class="text-grey-8"> Carregando unidades. </span>
                    </div>

                    <div
                      v-if="!props.row.loading"
                      class="column justify-center items-center"
                      style="width: 100%"
                    >
                      <q-table
                        style="width:100%; max-height: 250px;"
                        :pagination="pagination"
                        flat
                        wrap-cells
                        :columns="columnsUnidades"
                        :rows="props.row.unidades"
                        row-key="_id"
                        selection="multiple"
                        v-model:selected="props.row.selected"
                        hide-bottom
                        virtual-scroll
                      />
                    </div>
                  </div>
                </q-td>
              </q-tr>

            </template>

          </q-table>
        </q-card-section>

        <q-card-section>
          <div class="row justify-end q-gutter-x-md">
            <q-btn
              no-caps
              unelevated
              color="secondary"
              @click="save"
              :loading="loading"
              :disable="disable"
            >
              Registrar
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">

/* eslint-disable */

import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { useServices } from '../../composables/useServices'

import type { Produto } from '../../services/ProdutosService'
import type { ProdutoUnidades, Unidade, IdProdutoUnidades } from '../../services/RegistrosService'
import type { QTableProps } from 'quasar'

import InputSearchProdutos from '../../components/registros/InputSearchProdutos.vue'

interface ProdutoLocal extends ProdutoUnidades, Produto {
  selected: Unidade[]
}

const pagination = { rowsPerPage: 0 }

const columnsUnidades: QTableProps['columns'] = [
  {
    name: 'descricao',
    label: 'Descrição',
    align: 'left',
    field: (data: { descricao: string }) => data.descricao
  },

  {
    name: 'dataInserido',
    label: 'Entrada',
    align: 'left',
    field: (data: { dataInserido: string }) => data.dataInserido,
    format: (data: string) => formatDate(data)
  },

  {
    name: 'dataValidade',
    label: 'Validade',
    align: 'left',
    field: (data: { dataValidade: string }) => data.dataValidade,
    format: (data: string) => formatDate(data)
  },
]

const columns: QTableProps['columns'] = [
  {
    name: 'nome',
    label: 'Nome',
    align: 'left',
    field: (data: { nome: string }) => data.nome
  },
  {
    name: 'descricao',
    label: 'Descricao',
    align: 'left',
    field: (data :{ descricao: string }) => data.descricao
  },
  {
    name: 'delete',
    label: '',
    align: 'center',
    field: ''
  },
  {
    name: 'expand',
    label: '',
    align: 'center',
    field: ''
  },
]

dayjs.extend(customParseFormat)
const services = useServices()
const $q = useQuasar()

const loading = ref(false)
const produtosSelecionados = ref<ProdutoLocal[]>([])

const disable = computed(() => {
  const data = produtosSelecionados.value?.filter((produto)=> {
    return produto.selected && produto.selected.length
  })

  if(data.length === 0) return true
  return (data.length < produtosSelecionados.value.length)
})

function formatDate(date: string){
  if(!date) return
  return dayjs(date).format('DD/MM/YYYY')
}

async function loadUnidades(props: any){
  props.expand = true

  props.row.loading = true
  const data = await services.registroService.listUnidadesByProduto(props.row._id)
  props.row.loading = false

  props.row.unidades = data
}

function onDelete(produto: Produto){
  const indexToDelete  = produtosSelecionados.value.findIndex(p => p._id === produto._id)
  if (indexToDelete !== -1) {
    produtosSelecionados.value.splice(indexToDelete, 1)
  }
}

async function save(){
  const produtos: any = produtosSelecionados.value.map((produto: ProdutoLocal) => {
    return {
      produto: produto._id,
      unidades: produto.selected.map((unidade: Unidade) => unidade._id)
    }
  })

  try{
    loading.value = true
    const data = await services.registroService.registrarSaida(produtos)
    $q.notify({
      message: data.message,
      icon: 'fas fa-check-circle',
      color: 'positive',
      timeout: 1200,
    })

    produtosSelecionados.value = []

    loading.value = false
  }catch(e){
    loading.value = false
    console.error(e)
  }
}
</script>
