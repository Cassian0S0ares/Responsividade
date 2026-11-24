<script setup>
import { onMounted } from 'vue'
import { useTelaStore } from '@/stores/tela'
import AeroIcon from './AeroIcon.vue'
const tela = useTelaStore()
onMounted(() => tela.iniciar())
</script>

<template>
  <aside class="indicador" aria-label="Dimensões atuais da janela">
    <div class="indicador__interior">
      <span class="indicador__marca"><AeroIcon tipo="globo" /><span>Guia Responsivo</span></span>
      <span class="indicador__dica">Experimente redimensionar a janela</span>
      <span class="indicador__medida"><AeroIcon tipo="tela" /><strong>{{ tela.largura }} px</strong><span>{{ tela.breakpoint.nome }}</span></span>
    </div>
  </aside>
</template>

<style scoped>
.indicador { position: fixed; bottom: 0; left: 0; right: 0; z-index: 20; border-top: 1px solid var(--azul-94); background: linear-gradient(var(--azul-97-a91), var(--azul-86-a91) 48%, var(--azul-75-a91) 49%, var(--azul-90-a94)); box-shadow: 0 -1px 8px var(--azul-28-a21); pointer-events: none; }
.indicador__interior { min-height: 2.6rem; display: flex; align-items: center; justify-content: space-between; gap: var(--esp-2); max-width: 80rem; margin: auto; padding: var(--esp-020) var(--esp-075); color: var(--azul-33); font-size: .8125rem; text-shadow: 0 1px var(--branco-a78); }
.indicador__marca, .indicador__medida { display: flex; align-items: center; gap: var(--esp-2); }
.indicador__marca { flex-shrink: 0; font-weight: 600; }
.indicador__marca > span, .indicador__dica { display: none; }
.indicador__medida { flex: 1; justify-content: flex-end; min-width: 0; flex-wrap: wrap; }
.indicador .aero-icon { width: 1.75rem; height: 1.75rem; }
.indicador__medida strong { font-family: var(--fonte-mono); font-weight: 400; }
.indicador__medida > span { font-size: .75rem; }
@media (min-width: 30.0625rem) {
  .indicador__marca > span { display: inline; }
  .indicador__interior { padding-inline: var(--esp-4); gap: var(--esp-3); }
  .indicador__medida { flex: 0 1 auto; justify-content: normal; padding-left: var(--esp-3); border-left: 1px solid var(--azul-69); }
}
@media (min-width: 48.0625rem) { .indicador__dica { display: inline; } }
</style>
