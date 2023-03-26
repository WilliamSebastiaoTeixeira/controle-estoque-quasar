import { RouteRecordRaw } from 'vue-router'

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
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/app/controle'
      },
      {
        path: 'controle',
        component: () => import('src/pages/controle/DashboardControlePage.vue')
      },
      {
        path: 'produto',
        component: () => import('src/pages/produto/DashboardProdutosPage.vue')
      },
      {
        path: 'configuracao',
        component: () => import('src/pages/configuracao/ConfiguracaoUsuarioPage.vue')
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/404Page.vue'),
  }
]
export default routes