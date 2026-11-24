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
  let agendado = false

  // matchMedia responde exatamente como o CSS responderia.
  // As consultas sao criadas uma vez; depois basta ler .matches.
  const consultas = BREAKPOINTS.map((bp) => ({
    ...bp,
    mq: window.matchMedia(`(min-width: ${bp.minRem}rem)`),
  }))

  const breakpoint = computed(() => {
    versao.value // recalcula quando a janela muda
    return consultas.find((bp) => bp.mq.matches)
  })

  function iniciar() {
    if (iniciada) return
    iniciada = true
    // O resize dispara dezenas de vezes por segundo; uma atualizacao por quadro basta.
    window.addEventListener('resize', () => {
      if (agendado) return
      agendado = true
      requestAnimationFrame(() => {
        agendado = false
        largura.value = window.innerWidth
        versao.value++
      })
    })
  }

  return { largura, breakpoint, iniciar }
})
