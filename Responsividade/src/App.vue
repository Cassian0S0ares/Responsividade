<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { RouterLink, RouterView, START_LOCATION, useRoute, useRouter } from 'vue-router'
import AppCabecalho from '@/components/layout/AppCabecalho.vue'
import IndicadorBreakpoint from '@/components/layout/IndicadorBreakpoint.vue'
import AeroIcon from '@/components/layout/AeroIcon.vue'
import { secoes } from '@/data/secoes'

const route = useRoute()
const router = useRouter()
const menuAberto = ref(false)
const conteudo = ref(null)
const atual = computed(() => secoes.find((s) => s.rota === route.path))
// immediate para o titulo valer tambem na primeira carga.
watch(() => route.path, () => {
  menuAberto.value = false
  document.title = `${atual.value?.titulo || 'Início'} · Guia Responsivo`
}, { immediate: true })
// O foco so se move em trocas de pagina feitas pela pessoa. A navegacao
// inicial (vinda de START_LOCATION) roubaria o foco de quem acabou de abrir
// o site e faria o Tab pular o "Pular para o conteudo" e o menu.
router.afterEach(async (to, from, falha) => {
  if (falha || from === START_LOCATION || to.path === from.path) return
  await nextTick()
  conteudo.value?.focus({ preventScroll: true })
})
</script>

<template>
  <a href="#conteudo" class="skip-link">Pular para o conteúdo</a>
  <div class="ambiente">
    <AppCabecalho />
    <div class="janela">
      <div class="janela__titulo">
        <AeroIcon :tipo="atual?.icone || 'globo'" />
        <span>Guia Responsivo <span class="janela__subtitulo">— {{ atual?.curto || 'Bem-vindo' }}</span></span>
        <span class="janela__ornamento" aria-hidden="true"><i></i><i></i><i></i></span>
      </div>
      <div class="janela__interior">
        <div class="barra-caminho">
          <button class="menu-botao botao botao--secundario" type="button" aria-controls="menu-principal" :aria-expanded="menuAberto" @click="menuAberto = !menuAberto">{{ menuAberto ? 'Fechar guia' : 'Explorar guia' }}</button>
          <nav class="endereco" aria-label="Caminho da página">
            <RouterLink to="/">Início</RouterLink>
            <span v-if="atual" aria-hidden="true">/</span>
            <span v-if="atual" aria-current="page">{{ atual.curto }}</span>
            <span v-else class="endereco__descricao">Seu laboratório de responsividade</span>
          </nav>
          <span class="barra-caminho__tipo">Guia interativo</span>
        </div>
        <div class="area-trabalho">
          <aside class="explorador" :class="{ 'explorador--aberto': menuAberto }">
            <nav id="menu-principal" aria-label="Seções do guia" @keydown.esc="menuAberto = false">
              <RouterLink to="/" class="explorador__inicio" exact-active-class="explorador__ativo"><AeroIcon tipo="globo" /> Visão geral</RouterLink>
              <p class="explorador__rotulo">Explore o guia</p>
              <ul>
                <li v-for="secao in secoes" :key="secao.rota">
                  <RouterLink :to="secao.rota" active-class="explorador__ativo"><AeroIcon :tipo="secao.icone" /><span>{{ secao.curto }}</span></RouterLink>
                </li>
              </ul>
            </nav>
            <div class="explorador__nota">
              <AeroIcon tipo="folha" />
              <p>Aprender é experimentar.</p>
              <span>Mexa nos controles.<br />Observe o que muda.<br />Encontre seu ritmo.</span>
            </div>
            <div class="explorador__paisagem" aria-hidden="true"></div>
          </aside>
          <main id="conteudo" ref="conteudo" tabindex="-1" class="conteudo">
            <RouterView />
          </main>
        </div>
        <footer class="janela__rodape"><span>Feito para explorar em qualquer tela.</span><span>HTML · CSS · Vue</span></footer>
      </div>
    </div>
    <footer class="ambiente__rodape">Um mesmo mundo. Infinitas janelas.</footer>
  </div>
  <IndicadorBreakpoint />
</template>

<style scoped>
.ambiente { padding: 0 2rem 3rem; }
.janela { max-width: var(--largura-conteudo); margin: auto; padding: 0 .5rem .5rem; border: 1px solid #e6ffffd9; border-radius: 9px; background: linear-gradient(110deg, #c9f0ffa6, #e7fbffd4 45%, #91d1e9c4); box-shadow: 0 10px 45px #00375d66, inset 0 0 0 1px #3b93b750; }
.janela__titulo { display: flex; align-items: center; gap: .5rem; min-height: 2.5rem; padding: .25rem .5rem; font-size: .875rem; color: #143f56; text-shadow: 0 1px #fff; }
.janela__titulo > .aero-icon { width: 1.5rem; height: 1.5rem; }
.janela__titulo > span { min-width: 0; }
.janela__ornamento { display: flex; gap: .3rem; margin-left: auto; padding-left: .5rem; }
.janela__ornamento i { width: .35rem; height: .35rem; border-radius: 50%; background: #4a98b7; box-shadow: 0 1px #fff; }
.janela__interior { border: 1px solid #6facc4; border-radius: 3px; overflow: clip; background: #fff; }
.barra-caminho { display: flex; align-items: center; gap: .75rem; padding: .6rem .8rem; background: linear-gradient(#f9fdff, #e7f0f5); border-bottom: 1px solid #adc8d4; font-size: .875rem; }
.endereco { display: flex; align-items: center; gap: .75rem; flex: 1; min-width: 0; padding: .25rem .65rem; border: 1px solid #b1c7d1; border-radius: 3px; background: #fff; box-shadow: inset 0 1px 2px #26536d0d; }
.endereco a { text-decoration: none; }
.endereco > span { min-width: 0; }
.endereco__descricao { color: #587786; border-left: 1px solid #c7dbe2; padding-left: .75rem; }
.barra-caminho__tipo { padding: 0 .25rem; color: #506f80; }
.menu-botao { display: none; }
.area-trabalho { display: grid; grid-template-columns: 13rem minmax(0, 1fr); }
.explorador { position: relative; display: flex; flex-direction: column; border-right: 1px solid #bfd6e0; background: linear-gradient(100deg, #f8fcfe, #eaf4f8); overflow: hidden; }
.explorador nav { padding: 1rem .6rem; }
.explorador ul { margin: 0; padding: 0; list-style: none; }
.explorador a { display: flex; align-items: center; gap: .6rem; min-height: 3rem; padding: .4rem .6rem; margin-bottom: .15rem; border: 1px solid transparent; border-radius: 4px; font-size: .875rem; text-decoration: none; color: #345d72; }
.explorador a:hover { background: #e1f1f9; border-color: #bedce9; }
.explorador .explorador__ativo { background: linear-gradient(#f3fcff, #c9e8f6); border-color: #92c3da; box-shadow: inset 0 1px #fff; color: #074c74; }
.explorador .aero-icon { width: 2rem; height: 2rem; }
.explorador__rotulo { margin: 1.3rem .7rem .5rem; font-size: .8125rem; color: #5b7686; }
.explorador__nota { position: relative; z-index: 1; margin: 1.5rem 1.25rem 6rem; padding-top: 1.25rem; border-top: 1px solid #c2d9e3; font-size: .8125rem; color: #567785; }
.explorador__nota .aero-icon { margin-bottom: .5rem; }
.explorador__nota p { font-weight: 600; color: #467228; margin-bottom: .35rem; }
.explorador__paisagem { height: 9rem; margin-top: auto; background: linear-gradient(#edf6fa, transparent 80%), url('@/assets/mundo-aero.jpg') 78% 65% / auto 280px; opacity: .7; }
/* O padding vira variavel para que filhos possam sangrar ate a borda. */
.conteudo { --pad-conteudo: clamp(1.25rem, 3vw, 2.5rem); min-width: 0; padding: var(--pad-conteudo); background: #fff; }
.conteudo:focus { outline: none; }
.janela__rodape { display: flex; justify-content: space-between; gap: .75rem; padding: .45rem 1rem; border-top: 1px solid #bdd5df; background: linear-gradient(#f4f9fc, #e3edf3); color: #537483; font-size: .75rem; }
.ambiente__rodape { text-align: center; padding: 1rem; color: #fff; text-shadow: 0 1px 4px #234d20, 0 1px 8px #234d20; font-size: .8125rem; }
@media (min-width: 80rem) { .ambiente { padding-top: .75rem; } }
@media (max-width: 60rem) {
  .ambiente { padding: 0 1rem 3rem; }
  .area-trabalho { grid-template-columns: 11rem minmax(0, 1fr); }
  .explorador nav { padding-inline: .35rem; }
  .explorador a { gap: .4rem; padding-inline: .4rem; }
  .conteudo { --pad-conteudo: 1.5rem; }
}
@media (max-width: 48rem) {
  .area-trabalho { display: block; }
  .explorador { display: none; border-right: 0; border-bottom: 1px solid #aecddc; }
  .explorador--aberto { display: block; }
  .explorador nav { padding: .75rem; }
  .explorador ul { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .explorador__nota, .explorador__paisagem, .barra-caminho__tipo, .endereco__descricao { display: none; }
  .explorador__rotulo { margin-top: .5rem; }
  .menu-botao { display: inline-flex; min-height: 2.5rem; padding: .35rem .65rem; font-size: .875rem; }
  .endereco { gap: .4rem; min-height: 2.5rem; }
  .conteudo { --pad-conteudo: 1.25rem; }
}
@media (max-width: 30rem) {
  .ambiente { padding-inline: .5rem; }
  .janela { padding-inline: .25rem; padding-bottom: .25rem; }
  .janela__subtitulo, .janela__rodape span:last-child { display: none; }
  .barra-caminho { padding: .5rem; gap: .4rem; }
  .conteudo { --pad-conteudo: 1rem; }
  .janela__rodape { font-size: .75rem; }
}
</style>
