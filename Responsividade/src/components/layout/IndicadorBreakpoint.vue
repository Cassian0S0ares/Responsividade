<script setup>
import { onMounted } from 'vue'
import { useTelaStore } from '@/stores/tela'

// Indicador fixo no canto: largura atual da janela + breakpoint ativo.
const tela = useTelaStore()
onMounted(() => tela.iniciar())
</script>

<template>
  <aside class="indicador" aria-live="polite">
    {{ tela.largura }}px · {{ tela.breakpoint.nome }}
  </aside>
</template>

<style scoped>
.indicador {
  position: fixed;
  right: var(--esp-2);
  bottom: var(--esp-2);
  z-index: 10;
  padding: var(--esp-1) var(--esp-2);
  border-radius: var(--raio);
  background: var(--cor-texto);
  color: var(--cor-fundo);
  font-family: var(--fonte-mono);
  font-size: 0.75rem;
  pointer-events: none;
}
</style>
