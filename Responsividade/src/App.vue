<script setup>
import { RouterView } from 'vue-router'
import AppCabecalho from '@/components/layout/AppCabecalho.vue'
import IndicadorBreakpoint from '@/components/layout/IndicadorBreakpoint.vue'
</script>

<template>
  <AppCabecalho />
  <main class="conteudo">
    <RouterView />
  </main>
  <IndicadorBreakpoint />
</template>

<style scoped>
.conteudo {
  max-width: var(--largura-conteudo);
  margin: 0 auto;
  padding: var(--esp-4) var(--esp-3) var(--esp-6);
}

@media (min-width: 48rem) {
  .conteudo {
    padding: var(--esp-5) var(--esp-4) var(--esp-6);
  }
}
</style>
