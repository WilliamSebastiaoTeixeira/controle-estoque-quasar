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


    <template #body-cell-nome="props">
      <q-td :props="props">
        <span>
          {{ props.value }}
        </span>
      </q-td>
    </template>

    <template #body-cell-descricao="props">
      <q-td :props="props">
        <span>
          {{ props.value }}
        </span>
      </q-td>
    </template>

    <template #body-cell-qtdUnidades="props">
      <q-td :props="props">
        <span>
          {{ props.value }}
        </span>
      </q-td>
    </template>

    <template #body-cell-qrcode="props">
      <q-td :props="props">
        <q-img
          width="100px"
          ratio="1"
          :src="generateCanvasQrCode(props.row._id)"
        />
      </q-td>
    </template>

    <template #body-cell-editar="props">
      <q-td :props="props">
        <q-btn
          unelevated
          round
          flat
          color="blue-8"
          icon="las la-edit"
          @click="emit('onEdit', props.row)"
        />
      </q-td>
    </template>

    <template #body-cell-delete="props">
      <q-td :props="props">
        <q-btn
          unelevated
          round
          flat
          color="red"
          icon="las la-trash"
          @click="emit('onDelete', props.row._id)"
        />
      </q-td>
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

/* eslint-disable */
//@ts-ignore
import qrcode from 'qrcode'
/* eslint-enable */

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
    name: 'qtdUnidades',
    label: 'Qtd. Estoque',
    align: 'left',
    field: (data :{ qtdUnidades: number }) => data.qtdUnidades
  },

  {
    name: 'qrcode',
    label: '',
    align: 'right',
    field: ''
  },
  {
    name: 'editar',
    label: '',
    align: 'right',
    field: ''
  },
  {
    name: 'delete',
    label: '',
    align: 'left',
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

const emit = defineEmits(['onEdit', 'onDelete'])

function generateCanvasQrCode(_id: string){
  let canvas = document.createElement('canvas')
  qrcode.toCanvas(canvas, _id)
  return canvas.toDataURL()
}
</script>
