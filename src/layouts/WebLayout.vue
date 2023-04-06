<template>
  <q-layout
    view="lHh Lpr lFf"
    class="estoque-menu-height"
  >
    <q-header class="header-shadow">
      <q-toolbar class="bg-white text-primary q-pa-md no-shadow">

        <q-toolbar-title class="row items-center q-gutter-x-md">
          <span class="label-subtitle">Controle de Estoque</span>
        </q-toolbar-title>

        <div class="q-gutter-x-sm">
          <q-avatar class="cursor-pointer" text-color="primary" icon="las la-wrench">
            <MenuToolBar/>
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="onMouseMinistate(false)"
      @mouseout="onMouseMinistate(true)"
      :width="250"
      :breakpoint="599"
      bordered
      class="bg-primary text-white"
    >
      <q-scroll-area class="fit">
        <DrawerList :miniState="miniState"/>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="estoque-bg-color absolute-full">
      <div class="fit scroll">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref, Ref, computed, watch, onMounted } from 'vue'
import { useFullWidthStore } from '../stores/fullWidth'
import { useMiniStateStore } from '../stores/miniState'

import MenuToolBar from 'components/webLayout/MenuToolBar.vue'
import DrawerList from 'components/webLayout/DrawerList.vue'

const fullWidthStore = useFullWidthStore()
const ministateStore = useMiniStateStore()

const drawer = ref(false) as Ref<boolean>
const miniState = ref(true) as Ref<boolean>

const container = computed(() => fullWidthStore.get ? '100%' : '1100px')

function onMouseMinistate(event: boolean){
  if(!ministateStore.get) return
  miniState.value = event
}

watch(() => [ministateStore.get], () => {
  miniState.value = ministateStore.get
})

onMounted(()=> {
  miniState.value = ministateStore.get
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
