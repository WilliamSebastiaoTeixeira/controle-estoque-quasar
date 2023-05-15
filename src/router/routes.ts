import { RouteRecordRaw } from 'vue-router'
import { ConfiguracaoRoutes } from './ConfiguracaoRoutes'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('src/layouts/LoginLayout.vue'),
    children: [
      {
        path: '/login',
        component: () => import('src/pages/LoginPage.vue'),
        beforeEnter: (to, from, next) => {
          const token = localStorage.getItem('token')
          if (token) {
            next('/home')
          } else {
            next()
          }
        },
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('src/layouts/HomeLayout.vue'),
    children: [
      {
        path: 'home',
        component: () => import('src/pages/HomePage.vue')
      }
    ]
  },
  {
    path: '/app',
    component: () => import('src/layouts/CheckLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/app/registro/dashboard'
      },
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
      {
        path: 'produto',
        component: () => import('src/pages/produto/ListagemProdutosPage.vue')
      },
      ...ConfiguracaoRoutes
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/404Page.vue'),
  }
]
export default routes
