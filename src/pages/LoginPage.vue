<template>
  <q-page
    class="estoque-background"
    padding
  >
    <div
      class="estoque-border bg-white q-pa-lg column"
      style="min-width: 200px; max-width: 400px; width: 100%;"
    >
      <div class="flex justify-start">
        <span class="text-h5 q-mb-md text-primary text-bold">
          Entrar
        </span>
      </div>
      <q-form class="q-gutter-y-sm">
        <q-input
          v-model="form.email"
          outlined
          square
          placeholder="Email"
          dense
          autocorrect="off"
          autocapitalize="off"
          autocomplete="username"
          bg-color="white"
          :rules="[
            () => !v$.email.required.$invalid || 'O email é obrigatório.',
          ]"
          @keydown.enter.prevent="onLogin"
        />
        <q-input
          v-model="form.senha"
          outlined
          square
          placeholder="Senha"
          :type="mostrarSenha ? 'text' : 'password'"
          dense
          autocorrect="off"
          autocapitalize="off"
          autocomplete="current-password"
          bg-color="white"
          :rules="[
            () => !v$.senha.required.$invalid || 'A senha é obrigatória.',
            () =>
              !v$.senha.minLength.$invalid ||
              'A senha deve ter no mínimo 6 caracteres.',
          ]"
          @keydown.enter.prevent="onLogin"
        >
          <template #append>
            <q-icon
              :name="mostrarSenha ? 'las la-eye-slash' : 'las la-eye'"
              class="cursor-pointer"
              @click="mostrarSenha = !mostrarSenha"
            />
          </template>
        </q-input>

        <q-btn
          color="primary"
          label="Entrar"
          square
          unelevated
          class="full-width"
          :disable="v$.$invalid"
          @click="onLogin"
        />
      </q-form>
    </div>
  </q-page>

</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'
import { computed, reactive, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useServices } from '../composables/useServices'
import { useAuthenticationStore } from '../stores/authentication'

import { LoginRequest } from 'src/services/LoginService'

const router = useRouter()
const services = useServices()
const auth = useAuthenticationStore()

const mostrarSenha = ref(false) as Ref<boolean>

const form: LoginRequest = reactive({
  email: '',
  senha: '',
})

const rules = computed(() => ({
  email: {
    required,
    email
  },

  senha: {
    required,
    minLength: minLength(6),
  },
}))

const v$ = useVuelidate(rules, form)

async function onLogin() {
  const data = await services.loginService.login(form)
  auth.setToken(data.token)
  auth.setUsuario(data.usuario)
  router.push('/home')
}

</script>

<style scoped>
.estoque-background {
  background: grey;
  background-size: cover;
}
</style>
