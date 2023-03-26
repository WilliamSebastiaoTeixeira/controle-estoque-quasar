<template>
  <q-layout view="lHh Lpr lFf">
    <div
      v-if="loading"
      class="row items-center justify-center estoque-full-height"
    >
    </div>
    <div v-else>
      <q-header class="header-shadow">
        <q-toolbar class="bg-white text-primary q-pa-md no-shadow">
          <q-toolbar-title class="row items-center q-gutter-x-md">
            <span class="label-subtitle">Controle de Estoque</span>
          </q-toolbar-title>

          <div class="q-gutter-x-sm">
            <q-avatar class="cursor-pointer">
              <q-menu fit anchor="bottom left" self="top left">
                <q-item
                  clickable
                  @click="onToggleFullWidth"
                >
                  <q-item-section avatar>
                    <q-avatar>
                      <q-icon color="grey-6" :name="!fullWidth ? 'las la-plus-circle' : 'las la-minus-circle'" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <div class="row">
                      <span class="text-grey-6 text-bold">
                        {{!fullWidth ? 'Expandir tela' : 'Retrair tela'}}
                      </span>
                  </div>
                  </q-item-section>
                </q-item>

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

            <q-btn
              flat
              dense
              round
              icon="apps"
              aria-label="Menu"
              @click="onToggleDrawer"
            />
          </div>
        </q-toolbar>
      </q-header>
    </div>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="599"
      bordered
      class="bg-primary text-green-2"
    >
      <q-scroll-area class="fit">
        <q-list v-for="(item, index) in menu" :key="index" padding>
          <q-item
            clickable
            v-ripple
            active-class="text-grey-1 bg-secondary"
            :class="{ 'q-mt-xl': index === 1 }"
            :to="item.route"
            :disable="item.disabled"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section>
              {{ item.nome }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="estoque-bg-color">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from '../stores/authentication'
import { useFullWidthStore } from '../stores/fullWidth'
import { useDrawerStore } from '../stores/drawer'

const menu = [
  {
    nome: 'Home',
    icon: 'las la-home',
    uri: 'DASHBOARD',
    route: '/home',
    disabled: false
  },
]

const router = useRouter()
const auth = useAuthenticationStore()
const fullWidthStore = useFullWidthStore()
const drawerStore = useDrawerStore()

const miniState = ref(true) as Ref<boolean>
const loading = ref(false) as Ref<boolean>
const drawer = ref(false) as Ref<boolean>
const fullWidth = ref(false) as Ref<boolean>

const container = computed(() => fullWidth.value ? '100%' : '1100px')

async function onLogout(){
  auth.logout()
  router.push('/')
}

function onToggleFullWidth(){
  fullWidthStore.toggle()
  fullWidth.value = fullWidthStore.get as boolean
}

function onToggleDrawer(){
  drawerStore.toggle()
  drawer.value = drawerStore.get as boolean
}

onMounted(() => {
  fullWidth.value = fullWidthStore.get as boolean
  drawer.value = drawerStore.get as boolean
})
</script>

<style scoped>
.estoque-full-height {
  height: 100vh;
}

.header-shadow {
  box-shadow: 0 0 5px rgba(31, 30, 47, 0.08);
}

.label-subtitle {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  color: #75798d;

  margin-left: 16px;
  padding: 4px 0 4px 16px;
  border-left: 1px solid #e6e8eb;
}

.container{
  max-width: v-bind(container)!important;
}
</style>
