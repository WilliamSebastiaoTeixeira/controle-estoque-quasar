<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white">
      <q-toolbar>
        <div
          class="row justify-evenly q-pa-xs items-center"
          style="width: 100%"
        >
          <q-btn
            v-for="(item, index) in menu"
            :key="index"
            round
            :size="item.size"
            color="primary"
            :icon="item.icon"
            @click="router.push(item.route)"
          />
        </div>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()


const menu = [
  {
    nome: 'Home',
    icon: 'las la-home',
    uri: 'DASHBOARD',
    route: '/home',
    size: '15px',
    disabled: false
  },
  {
    nome: 'Entrada e saída',
    icon: 'las la-warehouse',
    uri: '',
    route: '/app/controle',
    size: '17px',
    disabled: false
  },
  {
    nome: 'Configuração',
    icon: 'las la-cog',
    uri: '',
    route: '/app/configuracao',
    size: '15px',
    disabled: false
  },
]
</script>
