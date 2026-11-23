import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// Cada seção é carregada sob demanda: o arquivo da página só é baixado
// quando a pessoa entra na rota (o Vite gera um "chunk" separado para cada uma).
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'inicio', component: HomeView },
    { path: '/:caminho(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
