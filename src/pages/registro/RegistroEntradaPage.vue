<template>
  <q-page padding class="container q-gutter-y-md">

    <div class="row justify-between">
      <span class="text-bold text-primary estoque-h1">
        Registrar entrada de produtos
      </span>
    </div>

    <div class="row justify-center">
      <q-card class="full-width" flat>
        <q-card-section>
          <div class="row q-gutter-y-xs justify-center">
            <div class="row q-gutter-x-sm no-wrap">
              <input-search-produtos
                v-model="produtosSelecionados"
                :entrada="true"
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
                color="positive"
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
                      @click.stop="props.expand = !props.expand"
                    />
                  </div>

                  <div v-if="col.name === 'adicionarUnidade'">
                    <q-btn
                      unelevated
                      outline
                      :label="props.row.unidades.length"
                      color="positive"
                      icon="add"
                      @click="onAddUnidade(props.row)"
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
                <q-td colspan="100%" class=q-gutter-y-sm>
                  <div
                    v-for="(unidade, index) in props.row.unidades"
                    :key="index"
                  >
                    <div class="row justify-between items-center q-gutter-x-sm no-wrap">

                      <span class="text-grey-9 q-mx-md">
                        {{ index + 1 }}
                      </span>

                      <q-input
                        v-model="unidade.descricao"
                        style="width: 100%"
                        outlined
                        dense
                        placeholder="Informação adicional sobre a unidade do produto..."
                      >
                      </q-input>

                      <div>
                        <q-input
                          dense
                          style="width: 140px"
                          mask="##/##/####"
                          :input-style="{textAlign: 'center'}"
                          outlined
                          v-model="unidade.dataValidade"
                        >
                          <template #append>
                            <q-btn
                              size="sm"
                              unelevated
                              round
                              flat
                              color="blue-8"
                              icon="las la-calendar"
                            >
                              <q-menu>
                                <q-date
                                  v-model="unidade.dataValidade"
                                  mask="DD/MM/YYYY"
                                  subtitle="Validade do produto"
                                />
                              </q-menu>
                            </q-btn>
                          </template>
                        </q-input>

                        <q-tooltip
                          delay="500"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          Data para vencimento do produto
                        </q-tooltip>
                      </div>

                      <q-btn
                        unelevated
                        round
                        flat
                        color="red"
                        icon="las la-trash"
                        @click="onDeleteUnidade(props.row, index)"
                      >
                        <q-tooltip
                          delay="500"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          Remove unidade
                        </q-tooltip>
                      </q-btn>
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
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { useServices } from '../../composables/useServices'

import type { Produto } from '../../services/ProdutosService'
import type { ProdutoUnidades, Unidade } from '../../services/RegistrosService'
import type { QTableProps } from 'quasar'

import InputSearchProdutos from '../../components/registros/InputSearchProdutos.vue'

interface ProdutoLocal extends ProdutoUnidades, Produto {}

const pagination = { rowsPerPage: 0 }

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
    name: 'adicionarUnidade',
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

const disable = computed(() => !produtosSelecionados.value.length)

function onDelete(produto: Produto){
  const indexToDelete  = produtosSelecionados.value.findIndex(p => p._id === produto._id)
  if (indexToDelete !== -1) {
    produtosSelecionados.value.splice(indexToDelete, 1)
  }
}

function onAddUnidade(produto: ProdutoLocal) {
  const unidade = {
    dataValidade: '',
    descricao: ''
  }
  produto.unidades.push(unidade)
}

function onDeleteUnidade(produto: ProdutoLocal, unidadeIndex: number){
  if(produto.unidades.length === 1){
    onDelete(produto)
    return
  }
  produto.unidades.splice(unidadeIndex, 1)
}

async function save(){
  const produtos = produtosSelecionados.value.map((produto: ProdutoLocal) => {
    return {
      produto: produto._id,
      unidades: produto.unidades.map((unidade: Unidade) => {

        const data = unidade.dataValidade ?
          dayjs(unidade.dataValidade, 'DD/MM/YYYY').toISOString() :
          null

        return {
          dataValidade: data,
          descricao: unidade.descricao
        }
      })
    }
  })

  try{
    loading.value = true
    const data = await services.registroService.registrarEntrada(produtos as ProdutoUnidades[])
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
