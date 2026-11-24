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
.secao__cabecalho { display: flex; flex-wrap: wrap; align-items: center; gap: 1.2rem; padding: .25rem 0 1.5rem; }
.secao__cabecalho > div { flex: 1 1 12rem; min-width: 0; }
.secao__cabecalho > .aero-icon { width: 4.75rem; height: 4.75rem; }
.secao__numero { margin-bottom: .4rem; font-size: .8125rem; color: #5a7b8b; }
.secao__cabecalho h1 { margin-bottom: .5rem; font-size: clamp(1.85rem, 2.7vw, 2.5rem); }
.secao__resumo { color: #5b7685; margin: 0; font-size: .9375rem; }
.secao__atalhos { display: flex; flex-wrap: wrap; gap: .25rem; padding: .35rem; border: 1px solid #abcad8; border-radius: 4px; background: linear-gradient(#f7fcff, #e7f2f8); box-shadow: inset 0 1px #fff; }
.secao__atalhos a { padding: .4rem .8rem; text-decoration: none; font-size: .875rem; border-radius: 3px; }
.secao__atalhos a:hover { background: #fff; box-shadow: 0 1px 3px #3f6b811c; }
.secao__bloco { margin-top: 2.2rem; scroll-margin-top: 1.5rem; }
.secao__bloco > h2 { padding-bottom: .65rem; border-bottom: 1px solid #d6e6ee; font-weight: 400; }
.secao__bloco :deep(li) { margin-bottom: .35rem; }
.secao__titulo-lab { display: flex; flex-wrap: wrap; align-items: center; gap: .7rem; padding: 1rem 0; border-top: 1px solid #bdd9e6; margin-bottom: .75rem; }
.secao__titulo-lab > div { flex: 1 1 12rem; min-width: 0; }
.secao__titulo-lab .aero-icon { width: 3rem; height: 3rem; }
.secao__titulo-lab h2 { margin-bottom: .15rem; font-weight: 400; }
.secao__titulo-lab p { margin: 0; font-size: .8125rem; color: #587c8e; }
.secao__pergunta { padding: 1.5rem; border: 1px solid #c3d8af; border-left: 4px solid #80ad45; border-radius: 4px; background: linear-gradient(110deg, #f4f9eb, #fcfff8); }
.secao__pergunta > h2 { color: #496f2c; border-color: #d5e4c4; }
.secao__enunciado { font-size: 1.0625rem; color: #3f5b30; }
.secao__pergunta h3 { color: #587443; font-size: .9375rem; margin-top: 1.5rem; }
.secao__pergunta :deep(p:last-child) { margin-bottom: 0; }
.secao__fontes h2 { font-size: 1.15rem; }
.secao__fontes p, .secao__fontes li { font-size: .875rem; }
.secao__fontes ul { padding-left: 1.25rem; }
.secao__fontes li::marker { color: #84a5b6; }
.secao__navegar { display: flex; justify-content: space-between; gap: 1rem; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #c2dbe7; }
.secao__navegar a { position: relative; min-width: 0; flex: 1; text-decoration: none; font-size: 1rem; }
.secao__navegar a:last-child { text-align: right; padding-right: 2.6rem; }
.secao__navegar small { display: block; font-size: .75rem; color: #688592; }
.secao__navegar .aero-icon { position: absolute; right: 0; top: .3rem; width: 2rem; height: 2rem; }
@media (max-width: 38rem) {
  .secao__cabecalho { align-items: flex-start; gap: .75rem; }
  .secao__cabecalho > .aero-icon { width: 3rem; height: 3rem; }
  .secao__atalhos a { flex: 1 0 40%; text-align: center; }
  .secao__pergunta { padding: 1rem; }
}
</style>
