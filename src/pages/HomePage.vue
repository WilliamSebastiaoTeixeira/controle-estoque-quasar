<template>
  <q-page class="row col justify-center items-center">
    <div
      class="q-gutter-sm"
      :class="$q.screen.width > 900 ? 'row': 'column'"
    >
      <HomeCard
        v-for="(modulo, index) in modulos"
        :key="index"
        :modulo="modulo"
        @on-go-to="onGoTo"
      />
    </div>

  </q-page>
</template>

<script setup lang="ts">
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router'
  import HomeCard from 'components/home/HomeCard.vue'

  const modulos = [
  {
    title: 'Entrada e Saída',
    icon: 'las la-table',
    available: true,
    route: '/app/controle',
  },
  {
    title: 'Produtos',
    icon: 'las la-box',
    available: true,
    route: '/app/produto',
  },
  {
    title: 'Configuração',
    icon: 'las la-cog',
    available: true,
    route: '/app/configuracao',
  },
]

const router = useRouter()

function onGoTo(route: string){
  router.push(route)
}

const $q = useQuasar()
</script>
