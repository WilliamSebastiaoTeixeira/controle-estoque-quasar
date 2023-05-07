<template>
  <q-list
    v-for="(item, index) in menuComputed"
    :key="index" padding
  >
    <q-expansion-item
      v-if="!item.disabled"
      clickable
      :default-opened="checkRoute(item.children)"
      :hide-expand-icon="!item.children?.length"
      :active-class="activeClass(index, item.children)"
      :class="classExpand(index, item.children)"
      :to="item.route"
      :disable="item.disabled"
      :icon="item.icon"
      :label="item.nome" class="text-white"
    >
      <div
        v-if="item.children"
        class="row"
      >
        <q-list
          v-for="(children, index) in item.children"
          :key="index"
          class="fit"
        >
          <q-item
            v-if="!children.disabled"
            clickable
            active-class="text-grey-1 bg-secondary"
            :to="children.route"
            :disable="children.disabled"
            class="text-white"
            :q-icon="children.icon"
          >
            <q-item-section avatar class="q-pl-lg">
              <q-icon size="20px" :name="children.icon" />
            </q-item-section>

            <q-item-section class="q-pl-lg">
              <span size="20px">
                {{ children.nome }}
              </span>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-expansion-item>
  </q-list>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, computed, ComputedRef } from 'vue'

import { useServices } from '../../composables/useServices'
import { useAuthenticationStore } from '../../stores/authentication'

const auth = useAuthenticationStore()
const services = useServices()

interface Children {
  nome: string
  icon: string
  uri: string
  route: string
  requiredPermission: string[]
  disabled: boolean,
}

interface Father {
  nome: string,
  icon: string,
  uri: string,
  route: string,
  disabled: boolean,
  requiredPermission: string[]
  children: Children[]
}

const props = defineProps({
  miniState: {
    type: Boolean,
    require: true
  }
})

const route = useRoute()

const menu: Father[] = [
  {
    nome: 'Home',
    icon: 'las la-home',
    uri: 'DASHBOARD',
    route: '/app',
    disabled: false,
    requiredPermission: [],
    children: []
  },
  {
    nome: 'Entrada e saída',
    icon: 'las la-warehouse',
    uri: '',
    route: '',
    disabled: false,
    requiredPermission: [],
    children: [
      {
        nome: 'Dashboard de registros',
        icon: 'dashboard',
        uri: '',
        route: '/app/registro/dashboard',
        requiredPermission: ['ENTRADA_SAIDA'],
        disabled: false,
      },
      {
        nome: 'Registrar entrada',
        icon: 'input',
        uri: '',
        route: '/app/registro/entrada',
        requiredPermission: ['ENTRADA_SAIDA'],
        disabled: false,
      },
    ]
  },
  {
    nome: 'Produtos',
    icon: 'las la-box',
    uri: '',
    route: '/app/produto',
    disabled: false,
    requiredPermission: ['PRODUTOS'],
    children: []
  },
  {
    nome: 'Configuração',
    icon: 'las la-cog',
    uri: '',
    route: '',
    disabled: false,
    requiredPermission: [],
    children: [
      {
        nome: 'Meu perfil',
        icon: 'las la-user',
        uri: '',
        route: '/app/configuracao/meu-perfil',
        requiredPermission: ['MEU_PERFIL', 'ADMINISTRAR'],
        disabled: false,
      },
      {
        nome: 'Usuários',
        icon: 'las la-users',
        uri: '',
        route: '/app/configuracao/usuarios',
        requiredPermission: ['ADMINISTRAR'],
        disabled: false,
      }
    ]
  },
]

const menuComputed = computed(() => menu.map(father => {
  const disabled = father.requiredPermission.length > 0 && !hasPermission(father.requiredPermission)
  const children = father.children.map(child => ({
    ...child,
    disabled: child.requiredPermission.length > 0 && !hasPermission(child.requiredPermission),
  }))
  return { ...father, disabled, children }
})) as ComputedRef<Father[]>

function hasPermission(permissions: string[]): boolean {
  return permissions.some(permission => auth.usuario?.permissoes.includes(permission))
}

function classExpand(index: number, itemChildren: Children[]){
  const marginTop = index === 1 ? 'q-mt-xl': ''
  const cor = itemChildren.length &&
              props.miniState &&
              checkRoute(itemChildren) ? 'text-grey-1 bg-secondary' : ''
  return `${marginTop} ${cor}`
}

function activeClass(index: number, itemChildren: Children[]){
  if(!props.miniState && checkRoute(itemChildren)){
    return 'text-grey-1 bg-secondary'
  }
  return index !== 0 ? 'text-grey-1 bg-secondary' : ''
}

function checkRoute(itemChildren: Children[]){
  if(!itemChildren.length) return false
  return itemChildren.some((child: Children) => route.fullPath.includes(child.route))
}

async function setData(){
  const data = await services.usuarioService.getMeuPerfil()
  auth.setUsuario(data)
}

onMounted(async () => {
  setData()
})
</script>
