import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Os mesmos breakpoints usados nas media queries do CSS (em rem).
export const BREAKPOINTS = [
  { nome: 'lg (desktop)', minRem: 64 },
  { nome: 'md (tablet)', minRem: 48 },
  { nome: 'sm (celular grande)', minRem: 40 },
  { nome: 'base (celular)', minRem: 0 },
]

// Store com a largura da janela e o breakpoint ativo, compartilhada entre componentes.
export const useTelaStore = defineStore('tela', () => {
  const largura = ref(window.innerWidth)
  const versao = ref(0)
  let iniciada = false

  // matchMedia responde exatamente como o CSS responderia.
  const breakpoint = computed(() => {
    versao.value // recalcula quando a janela muda
    return BREAKPOINTS.find((bp) => window.matchMedia(`(min-width: ${bp.minRem}rem)`).matches)
  })

  function iniciar() {
    if (iniciada) return
    iniciada = true
    window.addEventListener('resize', () => {
      largura.value = window.innerWidth
      versao.value++
    })
  }

  return { largura, breakpoint, iniciar }
})
