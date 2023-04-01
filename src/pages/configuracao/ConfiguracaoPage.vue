<template>
  <q-page class="row col justify-center items-center">
    <div
      class="q-gutter-sm"
      :class="$q.screen.width > 900 ? 'row': 'column'"
    >
      <CardGeneric
        v-for="(modulo, index) in modulos"
        :key="index"
        :modulo="modulo"
        @on-go-to="onGoTo"
      />
    </div>

  </q-page>
</template>
<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useQuasar } from 'quasar'

import { useRouter } from 'vue-router'
import CardGeneric from '../../components/generic/CardGeneric.vue'

const modulos = [
  {
    title: 'Usuários',
    icon: 'las la-user',
    available: true,
    route: '/app/configuracao/usuarios',
  },
]

const router = useRouter()
const $q = useQuasar()

function onGoTo(route: string){
  router.push(route)
}

const mobileOrSmallWidth = computed(() => {
  if($q.screen.width < 585 || $q.platform.is.mobile) return true
  return false
})

onBeforeMount(() => {
  if(!mobileOrSmallWidth.value) return router.push(modulos[0].route)
})

</script>
