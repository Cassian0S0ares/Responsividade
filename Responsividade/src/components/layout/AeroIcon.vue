<script setup>
import { computed, useId } from 'vue'

// Cada desenho usa no maximo dois gradientes; declarar os quatro em toda
// instancia encheria a pagina de nos SVG que ninguem referencia.
const GRADIENTES_POR_TIPO = {
  globo: ['azul', 'verde'],
  tela: ['azul', 'verde', 'prata'],
  regua: ['ouro'],
  grade: ['azul', 'verde', 'prata'],
  imagem: ['azul', 'verde', 'prata'],
  folha: ['verde'],
  trofeu: ['ouro', 'prata'],
}

const props = defineProps({ tipo: { type: String, default: 'globo' } })
const id = useId()
const usados = computed(() => GRADIENTES_POR_TIPO[props.tipo] ?? [])
const usa = (nome) => usados.value.includes(nome)
</script>

<template>
  <svg class="aero-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient v-if="usa('azul')" :id="`${id}-azul`" x1="15" y1="8" x2="45" y2="58" gradientUnits="userSpaceOnUse">
        <stop stop-color="#c6ffff" /><stop offset=".48" stop-color="#26bce4" /><stop offset=".5" stop-color="#0697d0" /><stop offset="1" stop-color="#005b9e" />
      </linearGradient>
      <linearGradient v-if="usa('verde')" :id="`${id}-verde`" x1="22" y1="12" x2="40" y2="54" gradientUnits="userSpaceOnUse">
        <stop stop-color="#d6fc88" /><stop offset=".48" stop-color="#98d94b" /><stop offset="1" stop-color="#3c8b13" />
      </linearGradient>
      <linearGradient v-if="usa('prata')" :id="`${id}-prata`" x1="15" y1="10" x2="43" y2="59" gradientUnits="userSpaceOnUse">
        <stop stop-color="white" /><stop offset=".5" stop-color="#e5f1f4" /><stop offset=".55" stop-color="#aec5d0" /><stop offset="1" stop-color="#f2fbff" />
      </linearGradient>
      <linearGradient v-if="usa('ouro')" :id="`${id}-ouro`" x1="20" y1="10" x2="40" y2="55" gradientUnits="userSpaceOnUse">
        <stop stop-color="#fff6a4" /><stop offset=".5" stop-color="#f9ce43" /><stop offset="1" stop-color="#d78315" />
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="58" rx="22" ry="3" fill="#184b6a" opacity=".14" />
    <g v-if="tipo === 'globo'">
      <circle cx="32" cy="30" r="25" :fill="`url(#${id}-azul)`" stroke="#1276a7" />
      <path d="m18 10 10-3 4 7-7 5 2 7-7 5-8-5-3-6m25-1 9-4 10 9-2 9-8 4-3 14-8-4 1-10-7-7z" :fill="`url(#${id}-verde)`" />
      <ellipse cx="29" cy="17" rx="17" ry="9" fill="white" opacity=".43" />
      <path d="M10 36c9 10 30 17 44 2" stroke="#a6efff" opacity=".6" />
    </g>
    <g v-else-if="tipo === 'tela'">
      <path d="m27 43-2 10-7 3h28l-7-3-2-10" :fill="`url(#${id}-prata)`" stroke="#799baa" />
      <rect x="5" y="9" width="54" height="36" rx="4" :fill="`url(#${id}-prata)`" stroke="#7495a6" />
      <path d="M10 14h44v25H10z" :fill="`url(#${id}-azul)`" />
      <path d="M10 33c15-12 26 9 44-8v14H10z" :fill="`url(#${id}-verde)`" />
      <path d="M12 16h32L12 34z" fill="white" opacity=".35" />
      <circle cx="32" cy="42" r="1.5" fill="#408cba" />
    </g>
    <g v-else-if="tipo === 'regua'" transform="rotate(-25 32 32)">
      <rect x="5" y="19" width="54" height="25" rx="4" :fill="`url(#${id}-ouro)`" stroke="#ba881e" />
      <path d="M12 20v10m7-10v6m7-6v10m7-10v6m7-6v10m7-10v6m7-6v10" stroke="#846314" stroke-width="2" />
      <path d="M9 39h45" stroke="#fff4b6" stroke-width="2" />
    </g>
    <g v-else-if="tipo === 'grade'">
      <rect x="6" y="8" width="52" height="46" rx="5" :fill="`url(#${id}-prata)`" stroke="#779dab" />
      <rect x="11" y="13" width="42" height="9" rx="1" :fill="`url(#${id}-azul)`" />
      <path d="M11 27h12v21H11zm17 0h25v8H28zm0 13h25v8H28z" :fill="`url(#${id}-verde)`" stroke="#76ad46" />
    </g>
    <g v-else-if="tipo === 'imagem'">
      <rect x="8" y="10" width="46" height="43" rx="3" transform="rotate(-8 31 31)" :fill="`url(#${id}-prata)`" stroke="#8babb8" />
      <rect x="13" y="13" width="46" height="38" rx="3" fill="white" stroke="#8babb8" />
      <path d="M17 17h38v29H17z" :fill="`url(#${id}-azul)`" />
      <circle cx="45" cy="25" r="5" fill="#ffffd4" />
      <path d="m17 39 10-12 9 11 8-7 11 13v2H17z" :fill="`url(#${id}-verde)`" />
    </g>
    <g v-else-if="tipo === 'folha'">
      <path d="M12 49C-2 13 40 6 55 9c4 29-10 48-36 42" :fill="`url(#${id}-verde)`" stroke="#4c961e" />
      <path d="M8 57 46 19M23 41l-5-18m15 8 15 2" stroke="#f0ffbe" stroke-width="3" stroke-linecap="round" />
      <path d="M12 31c0-13 20-19 34-19" stroke="white" stroke-width="4" opacity=".45" stroke-linecap="round" />
    </g>
    <g v-else-if="tipo === 'trofeu'">
      <path d="M18 14H7v9c0 10 8 13 16 13m23-22h11v9c0 10-8 13-16 13" stroke="#d59823" stroke-width="5" />
      <path d="M17 9h30l-3 20c-1 6-5 10-12 10s-11-4-12-10zM29 39h6v11h-6z" :fill="`url(#${id}-ouro)`" stroke="#bf8a1f" />
      <path d="M21 51h22l3 6H18z" :fill="`url(#${id}-prata)`" stroke="#7e9eab" />
      <path d="M22 13h19M24 17l2 13" stroke="white" stroke-width="3" opacity=".65" stroke-linecap="round" />
    </g>
  </svg>
</template>

<style scoped>
.aero-icon { width: 3rem; height: 3rem; flex-shrink: 0; }
</style>
