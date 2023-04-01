<template>
  <q-table
    style="width: 100%"
    class="estoque-border"
    row-key="_id"
    :rows="rows"
    :columns="columns"
    :hide-bottom="() => rows ? rows?.length > 0 : true"
    v-model:pagination="pagination"
    hide-pagination
    square
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

    <template #body-cell-email="props">
      <q-td :props="props">
        <span>
          {{ props.value }}
        </span>
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
            <q-icon avatar name="las la-user" color="grey-8" size="30px" />
          </q-item-section>
          <q-item-section class="column items-center justify-center q-mb-md">
            <span class="estoque-text"> Nenhum usuário encontrado. </span>
          </q-item-section>
        </q-item>
        <q-item v-if="loading" class="full-width flex-center">
          <q-spinner color="primary" size="3em" :thickness="2" />
        </q-item>
      </template>
  </q-table>
</template>
<script setup lang="ts">
import { QTableProps } from 'quasar'

const pagination = { rowsPerPage: 0 }

const columns: QTableProps['columns'] = [
  {
    name: 'nome',
    label: 'Nome',
    align: 'left',
    field: (data: { nome: string }) => data.nome
  },
  {
    name: 'email',
    label: 'Email',
    align: 'left',
    field: (data :{ email: string }) => data.email
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

const emit = defineEmits(['onEdit', 'onDelete'])

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
</script>
