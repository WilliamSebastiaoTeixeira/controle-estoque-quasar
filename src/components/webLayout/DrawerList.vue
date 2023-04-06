<template>
  <q-list
    v-for="(item, index) in menu"
    :key="index" padding
  >
    <q-expansion-item
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

interface Children {
  nome: string
  icon: string
  uri: string
  route: string
  disabled: boolean,
}

const props = defineProps({
  miniState: {
    type: Boolean,
    require: true
  }
})

const route = useRoute()

const menu = [
  {
    nome: 'Home',
    icon: 'las la-home',
    uri: 'DASHBOARD',
    route: '/app/controle',
    disabled: false,
    children: []
  },
  {
    nome: 'Entrada e saída',
    icon: 'las la-warehouse',
    uri: '',
    route: '/app/controle',
    disabled: false,
    children: []
  },
  {
    nome: 'Produtos',
    icon: 'las la-box',
    uri: '',
    route: '/app/produto',
    disabled: false,
    children: []
  },
  {
    nome: 'Configuração',
    icon: 'las la-cog',
    uri: '',
    route: '',
    disabled: false,
    children: [
      {
        nome: 'Meu perfil',
        icon: 'las la-user',
        uri: '',
        route: '/app/configuracao/meu-perfil',
        disabled: false,
      },
      {
        nome: 'Usuários',
        icon: 'las la-users',
        uri: '',
        route: '/app/configuracao/usuarios',
        disabled: false,
      }
    ]
  },
]

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
</script>
