<template>
  <q-dialog
    ref="dialogRef"
    persistent
    @hide="onDialogHide"
  >
    <q-card
      style="width: 100%;  max-width: 600px;"
    >
      <div>
        <q-card-section
          class="q-px-lg"
        >
          <div class="row items-center justify-between">
            <div class="row items-baseline q-gutter-x-sm">
              <span
                class="text-h6 text-bold text-grey-9"
              >
                {{ `${ produto ? 'Editar' : 'Novo' } produto`}}
              </span>
            </div>
            <q-btn
              v-close-popup
              icon="la la-close"
              flat
              round
              color="grey-8"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card
          class="q-mt-md q-px-md q-gutter-y-sm q-pb-md"
          flat
        >
          <div class="q-gutter-y-xs">
            <span class="text-bold text-grey-8">Nome</span>
            <q-input
              outlined
              dense
              color="grey-8"
              v-model="form.nome"
              :rules="[
                () =>
                  !v$.nome.required.$invalid ||
                  'É necessário cadastrar um nome para o produto.',
              ]"
              no-error-icon
            />
          </div>

          <div class="q-gutter-y-xs">
            <span class="text-bold text-grey-8">Descrição</span>
            <q-input
              outlined
              dense
              color="grey-8"
              v-model="form.descricao"
              no-error-icon
            />
          </div>
        </q-card>
      </div>

      <q-card-section>
        <div class="row justify-end q-gutter-x-md">
          <q-btn
            v-close-popup
            no-caps
            flat
            class="text-blue-6"
          >
            <span class="estoque-subtitle-size">Cancelar</span>
          </q-btn>
          <q-btn
            no-caps
            unelevated
            color="secondary"
            @click="save"
            :loading="loading"
            :disabled="v$.$invalid"
          >
            Salvar
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import {
  ref,
  Ref,
  reactive,
  computed,
} from 'vue'
import { useDialogPluginComponent } from 'quasar'
import useVuelidate from '@vuelidate/core'
import { useQuasar } from 'quasar'
import { required } from '@vuelidate/validators'

import { useServices } from '../../composables/useServices'
import { Produto } from './../../services/ProdutosService'

const props = defineProps({
  produto: {
    type: Object,
    required: true,
  },
})

defineEmits(useDialogPluginComponent.emits)
const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent()
const services = useServices()
const $q = useQuasar()

const loading = ref(false) as Ref<boolean>

const form: Produto = reactive({
  nome: '',
  descricao: '',
})

const rules = computed(() => ({
  nome: {
    required
  },
}))

const v$ = useVuelidate(rules, form)

async function save() {
  try {
    loading.value = true
    if (props.produto) {
      const data = await services.produtosService.updateProduto(form)
      $q.notify({
        message: data.message,
        icon: 'fas fa-check-circle',
        color: 'positive',
        timeout: 1200,
      })
    } else {
      const data = await services.produtosService.createProduto(form)
      $q.notify({
        message: data.message,
        icon: 'fas fa-check-circle',
        color: 'positive',
        timeout: 1200,
      })
    }
  } finally {
    loading.value = false
    onDialogOK()
  }
}

function setData(){
  if(!props.produto) return
  Object.assign(form, props.produto)
}

setData()
</script>
