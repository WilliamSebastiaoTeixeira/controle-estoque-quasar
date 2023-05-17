import { RouteRecordRaw } from 'vue-router'

export const ProdutosRoutes: RouteRecordRaw[] = [
  {
    path: 'produto/aph',
    component: () => import('src/pages/produto/ListagemProdutosAphPage.vue')
  },
  {
    path: 'produto/limpeza',
    component: () => import('src/pages/produto/ListagemProdutosLimpezaPage.vue')
  },
]
