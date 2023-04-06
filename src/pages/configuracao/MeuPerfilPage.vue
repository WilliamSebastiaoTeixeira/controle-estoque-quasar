<template>
   <q-page padding class="container q-gutter-y-md">
    <div class="row justify-between">
      <span class="text-bold text-primary estoque-h1">
        Meu perfil
      </span>
    </div>
    <div class="row justify-center">
      <q-card
        class="estoque-border full-width"
        square
        flat
      >
        <div>
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
                    'É necessário cadastrar um nome para o usuário.',
                ]"
                no-error-icon
              />
            </div>

            <div class="q-gutter-y-xs">
              <span class="text-bold text-grey-8">Email</span>
              <q-input
                outlined
                dense
                color="grey-8"
                autocorrect="off"
                autocapitalize="off"
                :v="v$.email"
                autocomplete="new-username"
                :rules="[
                  () => !v$.email.required.$invalid ||
                        'É necessário cadastrar um email para o usuário.',
                  () => !v$.email.email.$invalid ||
                        'Email inválido.'
                ]"
                v-model="form.email"
                no-error-icon
              />
            </div>
            <div
              v-if="auth.usuario?.permissoes.includes('ADMINISTRAR')"
              class="q-gutter-y-xs"
            >
              <span class="text-bold text-grey-8">Permissões</span>
              <q-select
                v-model="form.permissoes"
                :options="permissoesOptions"
                map-options
                option-label="label"
                option-value="value"
                emit-value
                multiple
                outlined
                dense
                color="grey-8"
                use-chips
                :v="v$.permissao"
                :rules="[
                  () => !v$.permissoes.required.$invalid ||
                        'É necessário atribuir ao menos uma permissão ao usuário.',
                ]"
              />
            </div>

            <div class="q-gutter-y-xs">
              <span class="text-bold text-grey-8">Nova senha</span>
              <q-input
                outlined
                dense
                :type="mostrarSenha ? 'text' : 'password'"
                color="grey-8"
                autocorrect="off"
                autocapitalize="off"
                :v="v$.senha"
                :rules="[
                  () =>
                    !v$.senha.minLength.$invalid ||
                    'A senha deve ter no mínimo 6 caracteres.',
                  () =>
                    !v$.senha.required.$invalid ||
                    'É necessario cadastrar uma senha.'
                ]"
                autocomplete="new-password"
                v-model="form.senha"
                no-error-icon
              >
                <template #append>
                  <q-icon
                    :name="mostrarSenha ? 'las la-eye-slash' : 'las la-eye'"
                    class="cursor-pointer"
                    @click="mostrarSenha = !mostrarSenha"
                  />
                </template>
              </q-input>
            </div>

            <div class="q-gutter-y-xs">
              <span class="text-bold text-grey-8">Confimar senha</span>
              <q-input
                outlined
                dense
                :type="mostrarConfirmarSenha ? 'text' : 'password'"
                color="grey-8"
                autocorrect="off"
                autocapitalize="off"
                :v="v$.confirmarSenha"
                :rules="[
                  () =>
                    !v$.senha.sameAs.$invalid ||
                    'As senhas não correspondem uma a outra.',
                ]"
                autocomplete="new-password"
                v-model="confirmarSenha"
                no-error-icon
              >
                <template #append>
                  <q-icon
                    :name="mostrarConfirmarSenha ? 'las la-eye-slash' : 'las la-eye'"
                    class="cursor-pointer"
                    @click="mostrarConfirmarSenha = !mostrarConfirmarSenha"
                  />
                </template>
              </q-input>
            </div>
          </q-card>
        </div>

        <q-card-section>
          <div class="row justify-end q-gutter-x-md">
            <q-btn
              no-caps
              unelevated
              square
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
    </div>
  </q-page>
</template>
<script setup lang="ts">
import {
  ref,
  Ref,
  reactive,
  computed,
  onMounted
} from 'vue'
import useVuelidate from '@vuelidate/core'
import { useQuasar } from 'quasar'
import { required, requiredIf, sameAs, email, minLength } from '@vuelidate/validators'

import { useServices } from '../../composables/useServices'
import { Usuario, Permissoes } from '../../services/UsuarioService'
import { useAuthenticationStore } from '../../stores/authentication'

const services = useServices()
const $q = useQuasar()
const auth = useAuthenticationStore()

const permissoesOptions = ref([]) as Ref<Permissoes[]>
const mostrarSenha = ref(false) as Ref<boolean>
const mostrarConfirmarSenha = ref(false) as Ref<boolean>
const confirmarSenha = ref('') as Ref<string>
const loading = ref(false) as Ref<boolean>

const form: Usuario = reactive({
  nome: '',
  email: '',
  senha: '',
  permissoes: [],
})

const rules = computed(() => ({
  nome: {
    required
  },
  email: {
    email,
    required
  },
  permissoes: {
    required
  },
  senha: {
    required: requiredIf(form.senha || confirmarSenha.value),
    sameAs: sameAs(confirmarSenha.value),
    minLength: minLength(6),
  },
}))

const v$ = useVuelidate(rules, form)

async function save() {
  try {
    loading.value = true

    const data = await services.usuarioService.updateMeuPerfil({
      nome: form.nome,
      email: form.email,
      senha: form.senha,
    })

    if(auth.usuario?.permissoes.includes('ADMINISTRAR')){
      await services.usuarioService.updateMeuPerfilPermissoes(form.permissoes)
    }

    await setData()

    loading.value = false

    $q.notify({
      message: data.message,
      icon: 'fas fa-check-circle',
      color: 'positive',
      classes: 'estoque-square',
      timeout: 1200,
    })
  }catch(e){
    console.error(e)
  }
}

async function setPermissoes(){
  const data = await services.usuarioService.listPermissoes()
  permissoesOptions.value = data
}

async function setData(){
  const data = await services.usuarioService.getMeuPerfil()
  auth.setUsuario(data)
  Object.assign(form, data)
}

onMounted(()=> {
  setData()
  if(auth.usuario?.permissoes.includes('ADMINISTRAR')){
    setPermissoes()
  }
})
</script>
