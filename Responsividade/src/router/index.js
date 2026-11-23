import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// Cada seção é carregada sob demanda: o arquivo da página só é baixado
// quando a pessoa entra na rota (o Vite gera um "chunk" separado para cada uma).
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'inicio', component: HomeView },
    { path: '/por-que-importa', name: 'por-que-importa', component: () => import('@/views/PorQueImportaView.vue') },
    { path: '/unidades', name: 'unidades', component: () => import('@/views/UnidadesView.vue') },
    { path: '/flexbox-e-grid', name: 'flexbox-e-grid', component: () => import('@/views/FlexGridView.vue') },
    { path: '/imagens', name: 'imagens', component: () => import('@/views/ImagensView.vue') },
    { path: '/boas-praticas', name: 'boas-praticas', component: () => import('@/views/BoasPraticasView.vue') },
    { path: '/desafio', name: 'desafio', component: () => import('@/views/DesafioView.vue') },
    { path: '/:caminho(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
