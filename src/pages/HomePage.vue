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
  import { useRouter } from 'vue-router'
  import CardGeneric from '../components/generic/CardGeneric.vue'

  const modulos = [
  {
    title: 'Entrada e saída',
    icon: 'las la-warehouse',
    available: true,
    route: '/app/registro',
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

</script>
