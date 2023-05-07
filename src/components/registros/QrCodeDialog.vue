<template>
  <q-dialog
    ref="dialogRef"
    persistent
    @hide="onDialogHide"
  >
    <q-card
      style="width: 100%;  max-width: 500px;"
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
                QRCode
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
          <div class="column justify-between">
            <div class="col q-pb-md">
              <QrStream @decode="onDecode" style="border-radius: 4px; overflow: hidden;"></QrStream>
            </div>
            <div class="col q-gutter-y-sm scroll" style="max-height: 200px;">
              <q-card
                v-for="(produto, index) in produtos"
                :key="index"
                class="estoque-border q-mx-sm"
                flat
              >
                <q-card-section
                  class="q-px-lg"
                >
                  <div class="row justify-between items-center">
                    <div class="column">
                      <div class="row q-gutter-x-sm">
                        <span class="text-bold text-grey-8">Nome:</span>
                        <span class="text-grey-8"> {{ produto.nome }}</span>
                      </div>

                      <div class="row q-gutter-x-sm">
                        <span class="text-bold text-grey-8">Descricao:</span>
                        <span class="text-grey-8"> {{ produto.descricao }}</span>
                      </div>
                    </div>

                    <div>
                      <q-btn
                        unelevated
                        round
                        flat
                        color="red"
                        icon="las la-trash"
                        @click="onDelete(produto)"
                      />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
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
          >
            Salvar
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { useQuasar } from 'quasar'

/* eslint-disable */
//@ts-ignore
import { QrStream } from 'vue3-qr-reader'
/* eslint-enable */

import { useServices } from '../../composables/useServices'

import type { Produto } from '../../services/ProdutosService'

defineEmits(useDialogPluginComponent.emits)
const { dialogRef, onDialogOK,onDialogHide } = useDialogPluginComponent()

const service = useServices()
const $q = useQuasar()

const loading = ref(false)
const produtos = ref<Produto[]>([])

function onDelete(produto: Produto){
  const indexToDelete  = produtos.value.findIndex(p => p._id === produto._id)
  if (indexToDelete !== -1) {
    produtos.value.splice(indexToDelete, 1)
  }
}

async function onDecode(_id: string){
  if(!_id) return

  const jaExistente = produtos.value.some((p: Produto) => _id === p._id)
  if(jaExistente) {
    $q.notify({
      message: 'Produto já inserido na listagem!',
      icon: 'fas fa-check-circle',
      color: 'negative',
      timeout: 1200,
    })

    return
  }

  try {
    loading.value = true
    const produto: Produto = await service.produtosService.getById(_id)
    produtos.value.push(produto)
    loading.value = false
  }catch(e){
    loading.value = false
  }
}

async function save() {
  onDialogOK(produtos.value)
}

</script>
