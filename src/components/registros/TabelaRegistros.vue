<template>
  <q-table
    style="width: 100%"
    row-key="_id"
    :rows="registros"
    :loading="loading"
    :columns="columns"
    wrap-cells
    :hide-bottom="() => registros ? registros?.length > 0 : true"
    v-model:pagination="tablePagination"
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
      <q-tr
        :props="props"
        :class="props.row.entrada ? 'bg-green-1' : 'bg-red-1'"
        @click.stop="props.expand = !props.expand"
      >
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

          <div v-else-if="col.name === 'entrada'">
            <q-chip
              v-if="col.value"
              class="text-white"
              label="Entrada"
              color="positive"
            />
            <q-chip
              v-if="!col.value"
              class="text-white"
              label="Saída"
              color="negative"
            />
          </div>

          <div v-else-if="col.name === 'dataRegistro'">
            <span class="text-grey-8">
              {{ formatDate(col.value) }}
            </span>
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
            v-for="(produto, indexProd) in props.row.produtos"
            :key="indexProd"
          >
            <q-chip
              v-for="(unidade, indexUnid) in produto.unidades"
              :key="indexUnid"
              class="text-grey-9"
            >
              <span>
                {{ produto.nome }}
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
                  Data de validade
                </q-tooltip>
              </q-btn>

            </q-chip>
          </div>
        </q-td>
      </q-tr>
    </template>

    <template #no-data>
      <q-item
        v-if="!loading"
        class="column items-center justify-center full-width"
      >
        <q-item-section class="column items-center justify-center q-ma-md">
          <q-icon
            avatar
            name="dashboard"
            color="grey-8"
            size="40px"
          />
        </q-item-section>
        <q-item-section class="column items-center justify-center q-mb-md">
          <span class="estoque-text"> Nenhum registro encontrado. </span>
        </q-item-section>
      </q-item>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { QTableProps } from 'quasar'

const tablePagination = { rowsPerPage: 0 }

defineProps({
  registros : {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    required: true
  }
})

const columns: QTableProps['columns'] = [
  {
    name: 'entrada',
    label: '',
    align: 'left',
    field: (data: { entrada: boolean }) => data.entrada
  },

  {
    name: 'usuario',
    label: 'Usuario',
    align: 'left',
    classes: 'text-grey-8 text-bold',
    field: (data: { usuario: { nome: string} }) => data.usuario.nome
  },

  {
    name: 'dataRegistro',
    label: 'Data do registro',
    align: 'left',
    field: (data: { dataEntrada: string, dataSaida: string }) => data.dataEntrada || data.dataSaida
  },

  {
    name: 'expand',
    label: '',
    align: 'left',
    field: ''
  },
]

function formatDate(date: string){
  if(!date) return
  return dayjs(date).format('DD/MM/YYYY')
}
</script>
