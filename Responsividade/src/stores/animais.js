import { ref } from 'vue'
import { defineStore } from 'pinia'

// Lista usada se a API estiver fora do ar.
const RESERVA = ['capivara', 'tamanduá', 'arara', 'onça-pintada', 'lobo-guará']

// Store dos animais: busca a lista numa API pública uma única vez
// e compartilha com qualquer componente que precisar.
export const useAnimaisStore = defineStore('animais', () => {
  const animais = ref([]) // [{ id, nome }]
  const carregando = ref(false)
  const origem = ref('')

  async function carregar() {
    if (animais.value.length) return // já carregou antes
    carregando.value = true
    try {
      const resposta = await fetch('https://dog.ceo/api/breeds/list/all')
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`)
      const dados = await resposta.json()
      animais.value = Object.keys(dados.message)
        .slice(0, 5)
        .map((raca) => ({ id: raca, nome: `cachorro ${raca}` }))
      origem.value = 'API pública dog.ceo'
    } catch {
      animais.value = RESERVA.map((nome) => ({ id: nome, nome }))
      origem.value = 'lista local (a API não respondeu)'
    } finally {
      carregando.value = false
    }
  }

  return { animais, carregando, origem, carregar }
})
