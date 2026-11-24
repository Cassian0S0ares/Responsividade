<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AeroIcon from '@/components/layout/AeroIcon.vue'
import { secoes } from '@/data/secoes'
defineProps({
  pergunta: { type: String, required: true },
  fontes: { type: Array, required: true },
})
// A rota identifica a seção; assim reordenar secoes.js não troca título nem ícone.
const route = useRoute()
const indice = computed(() => secoes.findIndex((s) => s.rota === route.path))
const atual = computed(() => secoes[indice.value])
const anterior = computed(() => secoes[indice.value - 1])
const proxima = computed(() => secoes[indice.value + 1])
const total = secoes.length
</script>

<template>
  <article class="secao">
    <header class="secao__cabecalho">
      <AeroIcon :tipo="atual.icone" />
      <div><p class="secao__numero">Explore o guia · Seção {{ atual.numero }} de {{ total }}</p><h1>{{ atual.titulo }}</h1><p class="secao__resumo">{{ atual.descricao }}</p></div>
    </header>
    <nav class="secao__atalhos" aria-label="Nesta seção">
      <a href="#explicacao">Entender</a>
      <a href="#codigo">Ver o código</a>
      <a v-if="$slots.laboratorio" href="#laboratorio">Experimentar</a>
      <a href="#pergunta">Conferir a ideia</a>
    </nav>
    <section id="explicacao" class="secao__bloco">
      <h2>Entenda a ideia</h2><slot />
    </section>
    <section id="codigo" class="secao__bloco">
      <h2>Por dentro do código</h2><slot name="codigo" />
    </section>
    <section v-if="$slots.laboratorio" id="laboratorio" class="secao__bloco secao__laboratorio">
      <div class="secao__titulo-lab"><AeroIcon tipo="tela" /><div><h2>Hora de experimentar</h2><p>Mude um detalhe. Veja o que acontece.</p></div></div>
      <slot name="laboratorio" />
    </section>
    <section id="pergunta" class="secao__bloco secao__pergunta">
      <h2>Uma pergunta para conectar tudo</h2>
      <p class="secao__enunciado">{{ pergunta }}</p>
      <h3>Vamos pensar juntos</h3><slot name="resposta" />
    </section>
    <section class="secao__bloco secao__fontes">
      <h2>Continue a descoberta</h2>
      <p>As referências usadas nesta seção:</p>
      <ul><li v-for="fonte in fontes" :key="fonte.url"><a :href="fonte.url" target="_blank" rel="noopener">{{ fonte.titulo }}<span class="sr-only"> (abre em outra aba)</span></a></li></ul>
    </section>
    <nav class="secao__navegar" aria-label="Continuar pelo guia">
      <RouterLink :to="anterior?.rota || '/'"><small>{{ anterior ? 'Seção anterior' : 'Voltar ao início' }}</small>{{ anterior?.curto || 'Visão geral' }}</RouterLink>
      <RouterLink v-if="proxima" :to="proxima.rota"><small>Próxima descoberta</small>{{ proxima.curto }}<AeroIcon :tipo="proxima.icone" /></RouterLink>
    </nav>
  </article>
</template>

<style scoped>
.secao__cabecalho { display: flex; flex-wrap: wrap; align-items: flex-start; gap: var(--esp-075); padding: var(--esp-1) 0 var(--esp-4); }
.secao__cabecalho > div { flex: 1 1 12rem; min-width: 0; }
.secao__cabecalho > .aero-icon { width: 3rem; height: 3rem; }
.secao__numero { margin-bottom: var(--esp-040); font-size: .8125rem; color: var(--azul-45-v3); }
.secao__cabecalho h1 { margin-bottom: var(--esp-2); font-size: clamp(1.85rem, 2.7vw, 2.5rem); }
.secao__resumo { color: var(--azul-44-v2); margin: 0; font-size: .9375rem; }
.secao__atalhos { display: flex; flex-wrap: wrap; gap: var(--esp-1); padding: var(--esp-035); border: 1px solid var(--azul-76); border-radius: 4px; background: linear-gradient(var(--cinza-98), var(--azul-94-v2)); box-shadow: inset 0 1px var(--branco); }
.secao__atalhos a { flex: 1 0 40%; padding: var(--esp-040) var(--esp-080); text-align: center; text-decoration: none; font-size: .875rem; border-radius: 3px; }
.secao__atalhos a:hover { background: var(--branco); box-shadow: 0 1px 3px var(--azul-38-a11); }
.secao__bloco { margin-top: var(--esp-220); scroll-margin-top: var(--esp-4); }
.secao__bloco > h2 { padding-bottom: var(--esp-065); border-bottom: 1px solid var(--azul-89); font-weight: 400; }
.secao__bloco :deep(li) { margin-bottom: var(--esp-035); }
.secao__titulo-lab { display: flex; flex-wrap: wrap; align-items: center; gap: var(--esp-070); padding: var(--esp-3) 0; border-top: 1px solid var(--azul-82-v2); margin-bottom: var(--esp-075); }
.secao__titulo-lab > div { flex: 1 1 12rem; min-width: 0; }
.secao__titulo-lab .aero-icon { width: 3rem; height: 3rem; }
.secao__titulo-lab h2 { margin-bottom: var(--esp-015); font-weight: 400; }
.secao__titulo-lab p { margin: 0; font-size: .8125rem; color: var(--azul-45-v2); }
.secao__pergunta { padding: var(--esp-3); border: 1px solid var(--verde-77); border-left: 4px solid var(--verde-47-v3); border-radius: 4px; background: linear-gradient(110deg, var(--verde-95), var(--cinza-99-v6)); }
.secao__pergunta > h2 { color: var(--verde-30-v3); border-color: var(--verde-83); }
.secao__enunciado { font-size: 1.0625rem; color: var(--verde-27-v3); }
.secao__pergunta h3 { color: var(--verde-36-v2); font-size: .9375rem; margin-top: var(--esp-4); }
.secao__pergunta :deep(p:last-child) { margin-bottom: 0; }
.secao__fontes h2 { font-size: 1.15rem; }
.secao__fontes p, .secao__fontes li { font-size: .875rem; }
.secao__fontes ul { padding-left: var(--esp-125); }
.secao__fontes li::marker { color: var(--azul-62-v3); }
.secao__navegar { display: flex; justify-content: space-between; gap: var(--esp-3); margin-top: var(--esp-5); padding-top: var(--esp-3); border-top: 1px solid var(--azul-83-v3); }
.secao__navegar a { position: relative; min-width: 0; flex: 1; text-decoration: none; font-size: 1rem; }
.secao__navegar a:last-child { text-align: right; padding-right: var(--esp-260); }
.secao__navegar small { display: block; font-size: .75rem; color: var(--azul-49); }
.secao__navegar .aero-icon { position: absolute; right: 0; top: .3rem; width: 2rem; height: 2rem; }
/* Acima de 38rem (608px), o cabecalho ganha um icone maior e os atalhos
   deixam de ocupar duas colunas. */
@media (min-width: 38.0625rem) {
  .secao__cabecalho { align-items: center; gap: var(--esp-120); }
  .secao__cabecalho > .aero-icon { width: 4.75rem; height: 4.75rem; }
  .secao__atalhos a { flex: 0 1 auto; text-align: inherit; }
  .secao__pergunta { padding: var(--esp-4); }
}
</style>
