<template>
  <q-table
    style="width: 100%"
    row-key="_id"
    :rows="rows"
    :columns="columns"
    wrap-cells
    :hide-bottom="() => rows ? rows?.length > 0 : true"
    v-model:pagination="pagination"
    hide-pagination
    flat
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

          <div v-if="col.name === 'delete'">
            <q-btn
              unelevated
              round
              flat
              color="red"
              icon="las la-trash"
              @click="emit('onDelete', props.row._id)"
            />
          </div>

          <div v-if="col.name === 'editar'">
            <q-btn
              unelevated
              round
              flat
              color="blue-8"
              icon="las la-edit"
              @click="emit('onEdit', props.row)"
            />
          </div>

          <div v-if="col.name === 'qrcode'">
            <q-img
              width="100px"
              ratio="1"
              :src="generateCanvasQrCode(props.row._id)"
            />
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
              class="row justify-start items-center q-ma-sm"
              style="width: 100%"
            >
              <q-chip
                v-for="(unidade, indexUnid) in props.row.unidades"
                :key="indexUnid"
                class="text-grey-9"
              >
                <span>
                  {{ props.row.nome }}
                </span>

                <span v-if="unidade.descricao">
                  : {{ unidade.descricao }}
                </span>

                <q-btn
                  v-if="unidade.dataValidade"
                  flat
                  dense
                  size="sm"
                  unelevated
                  icon="las la-calendar"
                  :label="formatDate(unidade.dataValidade)"
                >
                  <q-tooltip
                    delay="500"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    Validade
                  </q-tooltip>
                </q-btn>
              </q-chip>

              <!--
              <q-table
                v-if="props.row.unidades && props.row.unidades.length > 0"
                style="width:100%"
                flat
                wrap-cells
                :columns="columnsUnidades"
                :rows="props.row.unidades"
                row-key="_id"
                hide-bottom
              />
              -->

              <div
                v-if="!props.row.unidades"
                class="column justify-center items-center"
                style="width: 100%"
              >
                <span class="text-grey-8"> Produto não possui unidades. </span>
              </div>
            </div>
          </div>
        </q-td>
      </q-tr>

    </template>

    <template #no-data>
        <q-item v-if="!loading" class="column items-center justify-center full-width">
          <q-item-section class="column items-center justify-center q-ma-md">
            <q-icon avatar name="las la-box" color="grey-8" size="30px" />
          </q-item-section>
          <q-item-section class="column items-center justify-center q-mb-md">
            <span class="estoque-text"> Nenhum produto encontrado. </span>
          </q-item-section>
        </q-item>
        <q-item v-if="loading" class="full-width flex-center">
          <q-spinner color="primary" size="3em" :thickness="2" />
        </q-item>
      </template>
  </q-table>
</template>

<script setup lang="ts">
import type { QTableProps } from 'quasar'

import dayjs from 'dayjs'
/* eslint-disable */
//@ts-ignore
import qrcode from 'qrcode'
/* eslint-enable */

const pagination = { rowsPerPage: 0 }

/*
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
*/

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
    name: 'qtdUnidades',
    label: 'Qtd. Estoque',
    align: 'left',
    field: (data :{ qtdUnidades: number }) => data.qtdUnidades
  },
  {
    name: 'qrcode',
    label: '',
    align: 'center',
    field: ''
  },
  {
    name: 'editar',
    label: '',
    align: 'center',
    field: ''
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
  }
]

defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['onEdit', 'onDelete', 'loadUnidades'])

async function loadUnidades(props: any){
  props.expand = true
  if(props.row.unidades) return
  emit('loadUnidades', props)
}

function generateCanvasQrCode(_id: string){
  let canvas = document.createElement('canvas')
  qrcode.toCanvas(canvas, _id)
  return canvas.toDataURL()
}

function formatDate(date: string){
  if(!date) return
  return dayjs(date).format('DD/MM/YYYY')
}
</script>
