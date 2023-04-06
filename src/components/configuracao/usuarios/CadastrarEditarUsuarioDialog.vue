<template>
  <q-dialog
    ref="dialogRef"
    persistent
    @hide="onDialogHide"
  >
    <q-card
      square
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
                {{ `${ usuario ? 'Editar' : 'Novo' } usuario`}}
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
          <div class="q-gutter-y-xs">
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
            <span class="text-bold text-grey-8">{{ usuario ? 'Nova senha' : 'Senha'}}</span>
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
            v-close-popup
            no-caps
            square
            flat
            class="text-blue-6"
          >
            <span class="estoque-subtitle-size">Cancelar</span>
          </q-btn>
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
  </q-dialog>
</template>
<script setup lang="ts">
import {
  ref,
  Ref,
  reactive,
  computed,
  onMounted
} from 'vue'
import { useDialogPluginComponent } from 'quasar'
import useVuelidate from '@vuelidate/core'
import { useQuasar } from 'quasar'
import { required, requiredIf, sameAs, email, minLength } from '@vuelidate/validators'

import { useServices } from '../../../composables/useServices'
import { Usuario, Permissoes } from '../../../services/UsuarioService'

const props = defineProps({
  usuario: {
    type: Object,
    required: true,
  },
})

defineEmits(useDialogPluginComponent.emits)
const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent()
const services = useServices()
const $q = useQuasar()

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
    sameAs: sameAs(confirmarSenha.value),
    required: requiredIf(!props.usuario),
    minLength: minLength(6),
  },
}))

const v$ = useVuelidate(rules, form)

async function save() {
  try {
    loading.value = true
    if (props.usuario) {
      const data = await services.usuarioService.updateUsuario(form)
      $q.notify({
        message: data.message,
        icon: 'fas fa-check-circle',
        color: 'positive',
        classes: 'estoque-square',
        timeout: 1200,
      })
    } else {
      const data = await services.usuarioService.createUsuario(form)
      $q.notify({
        message: data.message,
        icon: 'fas fa-check-circle',
        color: 'positive',
        classes: 'estoque-square',
        timeout: 1200,
      })
    }
  } finally {
    loading.value = false
    onDialogOK()
  }
}

async function setPermissoes(){
  const data = await services.usuarioService.listPermissoes()
  permissoesOptions.value = data
}

function setData(){
  if(!props.usuario) return
  Object.assign(form, props.usuario)
}

setData()

onMounted(()=> {
  setPermissoes()
})
</script>
