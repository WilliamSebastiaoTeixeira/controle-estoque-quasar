<template>
  <q-page padding class="container q-gutter-y-md">
    <div class="row justify-between">
      <span class="text-bold text-primary estoque-h1">
        Produtos
      </span>

      <q-btn
        color="secondary"
        unelevated
        no-caps
        label="Novo produto"
        @click="setEditarCadastrarProdutoDialog(null)"
      />
    </div>

    <div class="row justify-start">
      <q-input
        v-model="textFilter"
        outlined
        dense
        placeholder="Pesquise pelo produto..."
      >
        <template v-slot:prepend>
          <q-icon name="las la-search" />
        </template>
      </q-input>
    </div>

    <div class="row">
      <TabelaProdutos
        :rows="filteredProdutos"
        :loading="loading"
        @on-edit="onEditProduto"
        @on-delete="onDeleteProduto"
        @load-unidades="onLoadUnidades"
      />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted , computed} from 'vue'
import { useQuasar } from 'quasar'

import { useServices } from '../../composables/useServices'
import type { Produto } from '../../services/ProdutosService'

import TabelaProdutos from '../../components/produtos/TabelaProdutos.vue'
import EditarCadastrarProdutoDialog from '../../components/produtos/EditarCadastrarProdutoDialog.vue'
import ConfirmationDialog from '../../components/generic/ConfirmationDialog.vue'

const $q = useQuasar()
const services = useServices()

const produtos = ref<Produto[]>()
const textFilter = ref<string>()
const loading = ref(false)


const filteredProdutos = computed(() => {
  return produtos.value?.filter((produto: Produto) => {
    if(!textFilter.value) return produto
    return produto.nome.toLowerCase().includes(textFilter.value.toLowerCase()) ||
           produto.descricao.toLowerCase().includes(textFilter.value.toLowerCase())
  })
})

function onEditProduto(produto: Produto){
  setEditarCadastrarProdutoDialog(produto)
}

async function onLoadUnidades(props: any){
  try{
    props.row.loading = true
    props.row.unidades = await services.registroService.listUnidadesByProduto(props.row._id)
    props.row.loading = false
  }catch {
    props.row.loading = false
  }
}

function setEditarCadastrarProdutoDialog(produto: Produto | null) {
  $q.dialog({
    component: EditarCadastrarProdutoDialog,
    componentProps: {
      produto: produto,
    },
  }).onOk(()=>{
    load()
  })
}

async function onDeleteProduto(_id: string){
  $q.dialog({
    component: ConfirmationDialog,
    componentProps: {
      bodyText: 'Você tem certeza que deseja excluir o produto?',
      confirmationColor: 'negative',
      confirmationText: 'Excluir',
      maxWidth: '250px'
    },
  }).onOk(async () => {
    try {
      loading.value = true
      const data = await services.produtosService.deleteProduto(_id)
      $q.notify({
        message: data.message,
        icon: 'fas fa-check-circle',
        color: 'positive',
        timeout: 1200,
      })
    }finally{
      await load()
      loading.value = false
    }
  })
}


async function load(){
  try {
    loading.value = true
    const data = await services.produtosService.listProdutos()
    produtos.value = data
  }finally{
    loading.value = false
  }
}

onMounted(() => load())
</script>

