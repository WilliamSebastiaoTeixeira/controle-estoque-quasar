<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="header-shadow">
      <q-toolbar class="bg-primary text-primary q-pa-md no-shadow">
        <q-toolbar-title class="row text-white items-center q-gutter-x-md">
          <span class="label-subtitle">Controle de Estoque</span>
        </q-toolbar-title>

        <div class="q-gutter-x-sm">
          <q-avatar class="cursor-pointer" text-color="white" icon="las la-user-cog">
            <q-menu fit square anchor="bottom left" self="top left">
              <q-item
                clickable
                @click="onLogout"
              >
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon color="grey-6" name="las la-sign-out-alt" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <span class="text-grey-6 text-bold"> Sair </span>
                </q-item-section>
              </q-item>
            </q-menu>
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from '../stores/authentication'

const router = useRouter()
const auth = useAuthenticationStore()

async function onLogout(){
  auth.logout()
  router.push('/')
}
</script>
