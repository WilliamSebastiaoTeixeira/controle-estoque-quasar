import { RouteRecordRaw } from 'vue-router'

export const DashboardRoutes: RouteRecordRaw[] = [
  {
    path: 'registro/dashboard',
    component: () => import('src/pages/registro/DashboardRegistroPage.vue')
  },
  {
    path: 'registro/entrada',
    component: () => import('src/pages/registro/RegistroEntradaPage.vue')
  },
  {
    path: 'registro/saida',
    component: () => import('src/pages/registro/RegistroSaidaPage.vue')
  },
]
