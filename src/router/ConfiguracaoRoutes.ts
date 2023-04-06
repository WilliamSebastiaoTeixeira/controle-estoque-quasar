import { RouteRecordRaw } from 'vue-router'

export const ConfiguracaoRoutes: RouteRecordRaw[] = [
  {
    path: 'configuracao',
    component: () => import('src/pages/configuracao/ConfiguracaoPage.vue')
  },
  {
    path: 'configuracao/usuarios',
    component: () => import('src/pages/configuracao/ListagemUsuarioPage.vue')
  },
  {
    path: 'configuracao/meu-perfil',
    component: () => import('src/pages/configuracao/MeuPerfilPage.vue')
  },
]
