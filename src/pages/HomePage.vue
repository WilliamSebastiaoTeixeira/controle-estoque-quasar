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
    title: 'Entrada',
    icon: 'las la-plus-circle',
    available: true,
    route: '/app/registro/entrada'
  },
  {
    title: 'Saida',
    icon: 'las la-minus-circle',
    available: true,
    route: '/app/registro/saida'
  },
]

const router = useRouter()

function onGoTo(route: string){
  router.push(route)
}

</script>
