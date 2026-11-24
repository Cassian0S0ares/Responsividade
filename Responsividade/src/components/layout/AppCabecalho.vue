<script setup>
import { RouterLink } from 'vue-router'
import AeroIcon from './AeroIcon.vue'
</script>

<template>
  <header class="cabecalho">
    <RouterLink to="/" class="cabecalho__marca" aria-label="Guia Responsivo — início">
      <AeroIcon tipo="globo" />
      <span>Guia<span class="cabecalho__leve">Responsivo</span><small>Um espaço para aprender e experimentar.</small></span>
    </RouterLink>
    <p class="cabecalho__recado">A web se adapta.<br /><strong>Você descobre como.</strong></p>
  </header>
</template>

<style scoped>
.cabecalho { display: flex; justify-content: space-between; align-items: center; gap: 1rem; max-width: var(--largura-conteudo); margin: auto; padding: 1.5rem .5rem 1.25rem; }
.cabecalho__marca { display: flex; gap: .65rem; align-items: center; text-decoration: none; color: #fff; font-size: 1.8rem; font-weight: 650; letter-spacing: -.05em; line-height: 1.2; text-shadow: 0 2px 4px #004679; }
.cabecalho__marca .aero-icon { width: 3.8rem; height: 3.8rem; filter: drop-shadow(0 2px 3px #00487980); }
.cabecalho__leve { font-weight: 350; }
.cabecalho__marca, .cabecalho__marca > span { min-width: 0; }
.cabecalho__marca small { display: block; font-size: .8125rem; font-weight: 400; letter-spacing: .01em; margin-top: .3rem; }
.cabecalho__recado { margin: 0; color: #fff; font-size: .875rem; text-align: right; text-shadow: 0 1px 4px #003f70, 0 0 12px #00609a; }
@media (max-width: 40rem) {
  .cabecalho { padding: 1rem .5rem; }
  .cabecalho__marca { font-size: 1.5rem; }
  .cabecalho__marca .aero-icon { width: 3rem; height: 3rem; }
  .cabecalho__recado { display: none; }
}
</style>
