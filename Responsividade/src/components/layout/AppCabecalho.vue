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
.cabecalho { display: flex; justify-content: space-between; align-items: center; gap: var(--esp-3); max-width: var(--largura-conteudo); margin: auto; padding: var(--esp-3) var(--esp-2); }
.cabecalho__marca { display: flex; gap: var(--esp-065); align-items: center; text-decoration: none; color: var(--branco); font-size: 1.5rem; font-weight: 650; letter-spacing: -.05em; line-height: 1.2; text-shadow: 0 2px 4px var(--azul-24); }
.cabecalho__marca .aero-icon { width: 3rem; height: 3rem; filter: drop-shadow(0 2px 3px var(--azul-24-a50)); }
.cabecalho__leve { font-weight: 350; }
.cabecalho__marca, .cabecalho__marca > span { min-width: 0; }
.cabecalho__marca small { display: block; font-size: .8125rem; font-weight: 400; letter-spacing: .01em; margin-top: var(--esp-030); }
.cabecalho__recado { display: none; margin: 0; color: var(--branco); font-size: .875rem; text-align: right; text-shadow: 0 1px 4px var(--azul-22), 0 0 12px var(--azul-30); }
@media (min-width: 40.0625rem) {
  .cabecalho { padding: var(--esp-4) var(--esp-2) var(--esp-125); }
  .cabecalho__marca { font-size: 1.8rem; }
  .cabecalho__marca .aero-icon { width: 3.8rem; height: 3.8rem; }
  .cabecalho__recado { display: block; }
}
</style>
