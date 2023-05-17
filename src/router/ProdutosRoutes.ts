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
  {
    path: 'produto/diversos',
    component: () => import('src/pages/produto/ListagemProdutosDiversosPage.vue')
  },
  {
    path: 'produto/aquatico',
    component: () => import('src/pages/produto/ListagemProdutosAquaticoPage.vue')
  },
  {
    path: 'produto/provisoes',
    component: () => import('src/pages/produto/ListagemProdutosProvisoesPage.vue')
  },
  {
    path: 'produto/uniformes',
    component: () => import('src/pages/produto/ListagemProdutosUniformePage.vue')
  },
]
