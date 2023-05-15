<template>
  <q-page padding class="container q-gutter-y-md">
    <div class="row justify-between">
      <span class="text-bold text-primary estoque-h1">
        Dashboard de registros
      </span>
    </div>

    <q-infinite-scroll
      v-if="!loading"
      :offset="250"
      @load="loadMore"
    >
      <TabelaRegistros
        :registros="registros"
      />

      <template #loading>
        <div
          class="
              row
              justify-center
              bg-white
              inmeta-border-bottom inmeta-border-left inmeta-border-right
            "
        >
          <q-spinner-dots
            color="primary"
            size="40px"
          />
        </div>
      </template>
    </q-infinite-scroll>

    <div
      v-if="loading"
      class="column items-center q-gutter-y-md"
    >
      <q-spinner-hourglass
        color="primary"
        size="4em"
      />
      <span class="text-grey-8"> Carregando registros realizados. </span>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'

import { useServices } from '../../composables/useServices'

import TabelaRegistros from '../../components/registros/TabelaRegistros.vue'

import type { Registro } from '../../services/RegistrosService'

const services = useServices()

const registros = ref<Registro[]>([])
const loading = ref(true)
const termoFiltro = ref('')

const pagination = reactive({
  page: 0,
  total: 0,
})

const filter = computed(() => {
  return {
    skip: 15 * pagination.page,
    limit: 15,
    termo: termoFiltro.value
  }
})

async function load(){
  loading.value = true
  try{
    const data = await services.registroService.listRegistros(filter.value)
    pagination.total = data.pageTotal
    registros.value = data.list

    loading.value = false
  }catch(e){
    loading.value = false
  }

}

async function loadMore(index: number,  done: (stop?: boolean) => void){
  if(pagination.page >= pagination.total || !registros.value.length) {
    done(true)
    return
  }

  try{
    pagination.page += 1
    const data = await services.registroService.listRegistros(filter.value)
    pagination.total = data.pageTotal
    registros.value = registros.value.concat(data.list)
  }catch(e){
    loading.value = false
    done(true)
  }finally{
    done()
  }

}

onMounted(() => {
  load()
})
</script>
