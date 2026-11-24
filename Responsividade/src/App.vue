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
/* Mobile-first: as regras fora de media query sao as do celular; cada
   @media (min-width) acrescenta o que muda em telas maiores. */
.ambiente { padding: 0 var(--esp-2) var(--esp-6); }
.janela { max-width: var(--largura-conteudo); margin: auto; padding: 0 var(--esp-1) var(--esp-1); border: 1px solid var(--azul-95-a85); border-radius: 9px; background: linear-gradient(110deg, var(--azul-89-a65), var(--azul-95-a83) 45%, var(--azul-74-a77)); box-shadow: 0 10px 45px var(--azul-18-a40), inset 0 0 0 1px var(--azul-47-a31); }
.janela__titulo { display: flex; align-items: center; gap: var(--esp-2); min-height: 2.5rem; padding: var(--esp-1) var(--esp-2); font-size: .875rem; color: var(--azul-21); text-shadow: 0 1px var(--branco); }
.janela__titulo > .aero-icon { width: 1.5rem; height: 1.5rem; }
.janela__titulo > span { min-width: 0; }
.janela__subtitulo { display: none; }
.janela__ornamento { display: flex; gap: var(--esp-030); margin-left: auto; padding-left: var(--esp-2); }
.janela__ornamento i { width: .35rem; height: .35rem; border-radius: 50%; background: var(--azul-50); box-shadow: 0 1px var(--branco); }
.janela__interior { border: 1px solid var(--azul-60); border-radius: 3px; overflow: clip; background: var(--branco); }
.barra-caminho { display: flex; align-items: center; gap: var(--esp-040); padding: var(--esp-2); background: linear-gradient(var(--cinza-99-v3), var(--azul-93-v4)); border-bottom: 1px solid var(--azul-75-v2); font-size: .875rem; }
.endereco { display: flex; align-items: center; gap: var(--esp-040); flex: 1; min-width: 0; min-height: 2.5rem; padding: var(--esp-1) var(--esp-065); border: 1px solid var(--azul-76-v3); border-radius: 3px; background: var(--branco); box-shadow: inset 0 1px 2px var(--azul-29-a5); }
.endereco a { text-decoration: none; }
.endereco > span { min-width: 0; }
.endereco__descricao { display: none; color: var(--azul-44); border-left: 1px solid var(--azul-83-v4); padding-left: var(--esp-075); }
.barra-caminho__tipo { display: none; padding: 0 var(--esp-1); color: var(--azul-41); }
/* No celular o menu vira este botao. */
.menu-botao { display: inline-flex; min-height: 2.5rem; padding: var(--esp-035) var(--esp-065); font-size: .875rem; }
.area-trabalho { display: block; }
.explorador { position: relative; display: none; flex-direction: column; border-bottom: 1px solid var(--azul-77); background: linear-gradient(100deg, var(--cinza-98-v2), var(--azul-95)); overflow: hidden; }
.explorador--aberto { display: block; }
.explorador nav { padding: var(--esp-075); }
.explorador ul { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); margin: 0; padding: 0; list-style: none; }
.explorador a { display: flex; align-items: center; gap: var(--esp-040); min-height: 3rem; padding: var(--esp-040); margin-bottom: var(--esp-015); border: 1px solid transparent; border-radius: 4px; font-size: .875rem; text-decoration: none; color: var(--azul-33-v3); }
.explorador a:hover { background: var(--azul-93); border-color: var(--azul-83); }
.explorador .explorador__ativo { background: linear-gradient(var(--azul-98), var(--azul-88)); border-color: var(--azul-71); box-shadow: inset 0 1px var(--branco); color: var(--azul-24-v2); }
.explorador .aero-icon { width: 2rem; height: 2rem; }
.explorador__rotulo { margin: var(--esp-2) var(--esp-070) var(--esp-2); font-size: .8125rem; color: var(--azul-44-v3); }
.explorador__nota { display: none; position: relative; z-index: 1; margin: var(--esp-4) var(--esp-125) var(--esp-600); padding-top: var(--esp-125); border-top: 1px solid var(--azul-83-v2); font-size: .8125rem; color: var(--azul-43-v2); }
.explorador__nota .aero-icon { margin-bottom: var(--esp-2); }
.explorador__nota p { font-weight: 600; color: var(--verde-30-v2); margin-bottom: var(--esp-035); }
.explorador__paisagem { display: none; height: 9rem; margin-top: auto; background: linear-gradient(var(--azul-95-v2), transparent 80%), url('@/assets/mundo-aero.jpg') 78% 65% / auto 280px; opacity: .7; }
/* O padding vira variavel para que filhos possam sangrar ate a borda. */
.conteudo { --pad-conteudo: var(--esp-3); min-width: 0; padding: var(--pad-conteudo); background: var(--branco); }
.conteudo:focus { outline: none; }
.janela__rodape { display: flex; justify-content: space-between; gap: var(--esp-075); padding: var(--esp-045) var(--esp-3); border-top: 1px solid var(--azul-81); background: linear-gradient(var(--cinza-97), var(--azul-92)); color: var(--azul-42-v2); font-size: .75rem; }
.janela__rodape span:last-child { display: none; }
.ambiente__rodape { text-align: center; padding: var(--esp-3); color: var(--branco); text-shadow: 0 1px 4px var(--verde-21), 0 1px 8px var(--verde-21); font-size: .8125rem; }
/* Os limites somam 0.0625rem (1px) para que a largura exata do limite
   (ex.: 768px) continue com o layout menor, como no desenho original. */
@media (min-width: 30.0625rem) {
  .ambiente { padding-inline: var(--esp-3); }
  .janela { padding-inline: var(--esp-2); padding-bottom: var(--esp-2); }
  .janela__subtitulo, .janela__rodape span:last-child { display: inline; }
  .barra-caminho { padding: var(--esp-060) var(--esp-080); gap: var(--esp-075); }
  .conteudo { --pad-conteudo: var(--esp-125); }
}
@media (min-width: 48.0625rem) {
  .menu-botao { display: none; }
  .endereco { gap: var(--esp-075); min-height: auto; }
  .endereco__descricao, .barra-caminho__tipo { display: inline; }
  .area-trabalho { display: grid; grid-template-columns: 11rem minmax(0, 1fr); }
  .explorador { display: flex; border-right: 1px solid var(--azul-81-v2); border-bottom: 0; }
  .explorador nav { padding: var(--esp-3) var(--esp-035); }
  .explorador ul { display: block; }
  .explorador__rotulo { margin-top: var(--esp-130); }
  .explorador__nota, .explorador__paisagem { display: block; }
  .conteudo { --pad-conteudo: var(--esp-4); }
}
@media (min-width: 60.0625rem) {
  .ambiente { padding-inline: var(--esp-5); }
  .area-trabalho { grid-template-columns: 13rem minmax(0, 1fr); }
  .explorador nav { padding-inline: var(--esp-060); }
  .explorador a { gap: var(--esp-060); padding-inline: var(--esp-060); }
  .conteudo { --pad-conteudo: clamp(var(--esp-125), 3vw, var(--esp-250)); }
}
@media (min-width: 80rem) { .ambiente { padding-top: var(--esp-075); } }
</style>
