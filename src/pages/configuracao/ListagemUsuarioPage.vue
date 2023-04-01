<template>
  <q-page padding class="container q-gutter-y-md">
    <div class="row justify-between">
      <span class="text-bold text-primary estoque-h1">
        Cadastro de usuarios
      </span>

      <q-btn
        color="secondary"
        unelevated
        no-caps
        label="Novo usuário"
        square
        @click="setEditarCadastrarUsuarioDialog(null)"
      />
    </div>
    <div class="row">
      <TabelaListagemUsuario
        :rows="usuarios"
        :loading="loading"
        @on-edit="onEditUsuario"
        @on-delete="onDeleteUsuario"
      />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref, Ref, onMounted } from 'vue'

import { useServices } from '../../composables/useServices'
import { Usuario } from '../../services/UsuarioService'

import EditarCadastrarUsuarioDialog from '../../components/configuracao/usuarios/CadastrarEditarUsuarioDialog.vue'
import TabelaListagemUsuario from '../../components/configuracao/usuarios/TabelaListagemUsuario.vue'
import ConfirmationDialog from '../../components/generic/ConfirmationDialog.vue'

const $q = useQuasar()
const services = useServices()

const loading = ref(false) as Ref<boolean>
const usuarios = ref([]) as Ref<Usuario[]>

function setEditarCadastrarUsuarioDialog(usuario: Usuario | null) {
  $q.dialog({
    component: EditarCadastrarUsuarioDialog,
    componentProps: {
      usuario: usuario,
    },
  }).onOk(()=>{
    load()
  })
}

function onEditUsuario(usuario: Usuario){
  setEditarCadastrarUsuarioDialog(usuario)
}

async function onDeleteUsuario(_id: string){
  $q.dialog({
    component: ConfirmationDialog,
    componentProps: {
      bodyText: 'Você tem certeza que deseja excluir o usuário?',
      confirmationColor: 'negative',
      confirmationText: 'Excluir',
      maxWidth: '250px'
    },
  }).onOk(async () => {
    try {
      loading.value = true
      const data = await services.usuarioService.deleteUsuario(_id)
      $q.notify({
        message: data.message,
        icon: 'fas fa-check-circle',
        color: 'positive',
        classes: 'estoque-square',
        timeout: 1200,
      })
    }finally{
      await load()
      loading.value = false
    }
  })
}

async function load() {
  try {
    loading.value = true
    const data = await services.usuarioService.listUsuarios()
    usuarios.value = data
  }finally{
    loading.value = false
  }
}

onMounted(() => {
  load()
})
</script>
