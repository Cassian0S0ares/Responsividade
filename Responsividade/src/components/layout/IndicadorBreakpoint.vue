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
.indicador { position: fixed; bottom: 0; left: 0; right: 0; z-index: 20; border-top: 1px solid #e0f8ff; background: linear-gradient(#f0fcffe8, #c4e5f1e8 48%, #a1cbdee8 49%, #d4edf6f0); box-shadow: 0 -1px 8px #125d7e35; backdrop-filter: blur(12px); pointer-events: none; }
.indicador__interior { min-height: 2.6rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; max-width: 80rem; margin: auto; padding: .2rem 1.5rem; color: #315f75; font-size: .8125rem; text-shadow: 0 1px #ffffffc7; }
.indicador__marca, .indicador__medida { display: flex; align-items: center; gap: .5rem; }
.indicador__medida { min-width: 0; flex-wrap: wrap; }
.indicador__marca { flex-shrink: 0; }
.indicador .aero-icon { width: 1.75rem; height: 1.75rem; }
.indicador__marca { font-weight: 600; }
.indicador__medida { padding-left: 1rem; border-left: 1px solid #92bbcf; }
.indicador__medida strong { font-family: var(--fonte-mono); font-weight: 400; }
.indicador__medida > span { font-size: .75rem; }
@media (max-width: 48rem) { .indicador__dica { display: none; } }
@media (max-width: 30rem) { .indicador__marca > span { display: none; } .indicador__interior { padding-inline: .75rem; gap: .5rem; } .indicador__medida { flex: 1; justify-content: flex-end; border: 0; padding: 0; } }
</style>
