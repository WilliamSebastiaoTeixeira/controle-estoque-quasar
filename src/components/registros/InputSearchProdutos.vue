<template>
  <q-select
    v-model="selected"
    outlined
    dense
    use-input
    hide-selected
    hide-dropdown-icon
    bg-color="white"
    placeholder="Buscar por produtos..."
    :input-debounce="500"
    :options="produtos"
    @filter="onSearch"
    @update:modelValue="selectProduto"
  >
    <template #prepend>
      <q-icon
        name="las la-search"
        size="18px"
      />
    </template>
    <template #append>
      <q-btn
        unelevated
        round
        flat
        size="10px"
        color="blue-8"
        icon="qr_code_scanner"
        @click="setQrCodeDialog"
      />
    </template>
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          Nenhum produto encontrado
        </q-item-section>
      </q-item>
    </template>
    <template #option="scope">
      <q-item
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
      >
        <q-item-section>
          <q-item-label>
            {{ scope.opt.nome }}
          </q-item-label>
          <q-item-label class="text-grey-6" style="font-size: 12px;">
            {{ scope.opt.descricao }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'

import { useServices } from '../../composables/useServices'

import QrCodeDialog from './../registros/QrCodeDialog.vue'

import type { Produto } from '../../services/ProdutosService'

const $q = useQuasar()
const services = useServices()

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const produtos = ref<Produto[]>([])
const selected = ref(null)

function setQrCodeDialog(){
  $q.dialog({
    component: QrCodeDialog,
  }).onOk((produtosQrCode: Produto[]) => {

    const data = produtosQrCode.map((produto: Produto) => {
      const jaExistente = props.modelValue.some((p: Produto) => produto._id === p._id)
      if(jaExistente) {
        return undefined
      }

      return {
        ...produto,
        unidades: [
          {
            dataValidade: '',
            descricao: ''
          }
        ]
      }
    }).filter(((p) => p !== undefined))

    emit('update:modelValue', props.modelValue.concat(data))
  })
}

async function onSearch(val: string, update: (callbackFn: () => void) => void, abort: () => void) {
  if (!val.trim()) return abort()

  const produtosFind = produtos.value.filter((produto: Produto) => {
    return produto.nome.includes(val) || produto.descricao.includes(val)
  })

  if(produtosFind.length > 0) {
    produtos.value = produtosFind
    update(() => null)
  }

  const data: Produto[] = await services.produtosService.getByParam(val)

  produtos.value = data

  update(() => null)
}

function selectProduto(produto: Produto){
  const data = {
    ...produto,
    unidades: [
      {
        dataValidade: '',
        descricao: ''
      }
    ]
  }

  const jaExistente = props.modelValue.some((p: Produto) => produto._id === p._id)
  if(jaExistente) {
    $q.notify({
      message: 'Produto já inserido na listagem!',
      icon: 'fas fa-check-circle',
      color: 'negative',
      timeout: 1200,
    })

    return
  }

  selected.value = null

  emit('update:modelValue', props.modelValue.concat(data))
}
</script>
