<template>
  <q-menu fit anchor="bottom left" self="top left">
    <q-item
      clickable
      @click="  fullWidthStore.toggle()"
    >
      <q-item-section avatar>
        <q-avatar>
          <q-icon color="grey-6" :name="!fullWidth ? 'las la-plus-circle' : 'las la-minus-circle'" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <div class="row">
          <span class="text-grey-6 text-bold">
            {{!fullWidthStore.get ? 'Expandir conteúdo' : 'Retrair conteúdo'}}
          </span>
      </div>
      </q-item-section>
    </q-item>

    <q-item
      clickable
      @click="  ministateStore.toggle()"
    >
      <q-item-section avatar>
        <q-avatar>
          <q-icon color="grey-6" name="apps" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <div class="row">
          <span class="text-grey-6 text-bold">
            {{!ministateStoreGet ? 'Drawer aberto' : 'Drawer flexível'}}
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
</template>
<script setup lang="ts">
import { ref, Ref, computed, ComputedRef } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthenticationStore } from '../../stores/authentication'
import { useFullWidthStore } from '../../stores/fullWidth'
import { useMiniStateStore } from '../../stores/miniState'

const fullWidthStore = useFullWidthStore()
const ministateStore = useMiniStateStore()
const router = useRouter()
const auth = useAuthenticationStore()

const fullWidth = ref(false) as Ref<boolean>
const ministateStoreGet = computed(() => ministateStore.get) as ComputedRef<boolean>

async function onLogout(){
  auth.logout()
  router.push('/')
}
</script>
