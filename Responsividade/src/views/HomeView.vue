<script setup>
import { RouterLink } from 'vue-router'
import { secoes } from '@/data/secoes'
import { useTelaStore } from '@/stores/tela'
import AeroIcon from '@/components/layout/AeroIcon.vue'
import AeroCena from '@/components/layout/AeroCena.vue'
const tela = useTelaStore()
</script>

<template>
  <section class="inicio">
    <div class="boas-vindas">
      <div class="boas-vindas__texto">
        <p class="boas-vindas__saudacao">Olá, explorador da web.</p>
        <h1>Do celular ao monitor.<br /><em>A web se adapta.</em></h1>
        <p>Do primeiro pixel ao layout que se adapta.<br class="quebra-desktop" /> Aprenda responsividade colocando a mão no código — e vendo tudo acontecer.</p>
        <RouterLink class="botao" to="/por-que-importa">Começar a explorar</RouterLink>
        <span class="boas-vindas__nota">Pode mexer. É assim que se aprende.</span>
      </div>
      <AeroCena />
    </div>

    <div class="faixa-aprender">
      <AeroIcon tipo="folha" />
      <p><strong>Um guia para aprender fazendo.</strong> Explicações, código e pequenos experimentos. Tudo no seu tempo.</p>
    </div>

    <div class="inicio__explorar">
      <section class="trilha" aria-labelledby="titulo-trilha">
        <div class="trilha__cabecalho"><h2 id="titulo-trilha">Por onde vamos?</h2><span>6 paradas para descobrir</span></div>
        <ol class="trilha__lista">
          <li v-for="secao in secoes" :key="secao.rota">
            <RouterLink :to="secao.rota">
              <AeroIcon :tipo="secao.icone" />
              <span><strong>{{ secao.titulo }}</strong><small>{{ secao.descricao }}</small></span>
            </RouterLink>
          </li>
        </ol>
      </section>

      <aside class="mesa-lateral">
        <section class="visor" aria-labelledby="titulo-visor">
          <h2 id="titulo-visor"><AeroIcon tipo="tela" /> Sua tela, ao vivo</h2>
          <div class="visor__mostrador">
            <span>Largura da janela</span>
            <p><strong>{{ tela.largura }}</strong> px</p>
            <span>{{ tela.breakpoint.nome }}</span>
            <div class="visor__escala" aria-hidden="true"><i :style="{ width: Math.min(tela.largura / 1920 * 100, 100) + '%' }"></i></div>
            <div class="visor__marcas" aria-hidden="true"><span>320</span><span>768</span><span>1920</span></div>
          </div>
          <p class="visor__dica">Redimensione a janela.<br />O guia acompanha você.</p>
          <RouterLink to="/por-que-importa#laboratorio">Entender a viewport</RouterLink>
        </section>

        <section class="caderno">
          <div class="caderno__furos" aria-hidden="true"><i></i><i></i><i></i></div>
          <h2>Uma ideia para levar</h2>
          <p>Responsividade não é diminuir tudo.</p>
          <p>É encontrar um bom lugar para cada coisa.</p>
          <span>Experimente. Observe. Ajuste.</span>
        </section>
      </aside>
    </div>
    <div class="inicio__fim"><AeroIcon tipo="globo" /><p>A mesma web, vista por janelas diferentes.<br /><strong>Vamos fazer com que todas funcionem bem.</strong></p></div>
  </section>
</template>

<style scoped>
.boas-vindas { display: grid; grid-template-columns: 1.08fr 1fr; align-items: center; gap: .5rem; margin: -2.5rem -2.5rem 0; padding: 2.5rem 2rem 1.75rem 2.5rem; background: radial-gradient(ellipse at 95% 60%, #a7e5f77a, transparent 57%), linear-gradient(#effaff, #fff 90%); }
.boas-vindas__saudacao { margin-bottom: .7rem; font-size: .9375rem; color: #4b7589; }
.boas-vindas h1 { font-size: clamp(1.85rem, 2.65vw, 2.65rem); line-height: 1.17; margin-bottom: 1rem; }
.boas-vindas h1 em { font-style: normal; color: #448315; }
.boas-vindas__texto > p:not(:first-child) { font-size: 1rem; color: #4b697a; max-width: 29rem; }
.boas-vindas .botao { margin-top: .35rem; }
.boas-vindas__nota { display: block; font-size: .75rem; color: #5e7e88; margin-top: .6rem; }
.faixa-aprender { display: flex; align-items: center; gap: .7rem; padding: .8rem 1rem; border: 1px solid #c2d8aa; border-radius: 4px; background: linear-gradient(#f9fdef, #eef5dd); box-shadow: inset 0 1px #fff; }
.faixa-aprender .aero-icon { width: 2.2rem; height: 2.2rem; }
.faixa-aprender p { margin: 0; color: #526a38; font-size: .875rem; }
.faixa-aprender strong { font-weight: 600; color: #3b6028; }
.inicio__explorar { display: grid; grid-template-columns: minmax(0, 1fr) 14rem; gap: 2rem; margin-top: 2rem; }
.trilha__cabecalho { display: flex; justify-content: space-between; flex-wrap: wrap; align-items: baseline; gap: .3rem; padding-bottom: .75rem; border-bottom: 1px solid #c9dce5; }
.trilha__cabecalho h2 { font-weight: 400; margin: 0; font-size: 1.4rem; }
.trilha__cabecalho > span { font-size: .75rem; color: #63818e; }
.trilha__lista { margin: 0; padding: 0; list-style: none; }
.trilha__lista li { border-bottom: 1px solid #e0ebf0; }
.trilha__lista a { display: flex; gap: .8rem; align-items: center; padding: .8rem .3rem; text-decoration: none; border-radius: 3px; transition: background .15s; }
.trilha__lista a:hover { background: linear-gradient(90deg, #eef8ff, #fff); }
.trilha__lista .aero-icon { width: 2.8rem; height: 2.8rem; }
.trilha__lista strong { display: block; font-size: .9375rem; font-weight: 600; color: #16618c; }
.trilha__lista small { display: block; margin-top: .15rem; font-size: .875rem; color: #5b7382; }
.visor { border: 1px solid #9dbccc; border-radius: 6px; padding: .6rem; background: linear-gradient(120deg, #faffff, #e3eff6); box-shadow: 0 3px 8px #32658013, inset 0 1px white; }
.visor h2 { display: flex; align-items: center; gap: .4rem; margin: 0 0 .6rem; font-size: .9375rem; font-weight: 600; }
.visor h2 .aero-icon { width: 1.65rem; height: 1.65rem; }
.visor__mostrador { padding: 1rem .75rem .5rem; background: radial-gradient(ellipse at 50% 0%, #fff, #edf9fc 80%); border: 1px solid #a9c9d6; border-radius: 3px; box-shadow: inset 0 2px 5px #386b7820; text-align: center; color: #547887; }
.visor__mostrador > span { font-size: .75rem; }
.visor__mostrador p { margin: -.1rem 0; color: #2479a0; font-family: var(--fonte-mono); font-size: .9rem; }
.visor__mostrador strong { font-size: 2.6rem; font-weight: 400; letter-spacing: -.07em; color: #1f6e8f; text-shadow: 0 2px #fff; }
.visor__escala { overflow: hidden; margin-top: 1rem; height: .55rem; background: #ccdfe5; border: 1px solid #9ebecb; border-radius: 4px; box-shadow: inset 0 1px 2px #41667a26; }
.visor__escala i { display: block; height: 100%; background: linear-gradient(#bbea6d, #60a527); border-right: 1px solid #52921e; }
.visor__marcas { display: flex; justify-content: space-between; margin-top: .2rem; font-size: .625rem; }
.visor__dica { margin: .7rem 0 .4rem; color: #5b7785; font-size: .8125rem; text-align: center; }
.visor > a { display: block; text-align: center; font-size: .8125rem; margin-bottom: .2rem; }
.caderno { position: relative; margin: 1.5rem .15rem 0; padding: 1.4rem 1rem .9rem 1.25rem; border: 1px solid #dad9a9; border-radius: 2px 2px 12px 2px; background: repeating-linear-gradient(transparent 0 25px, #c5d4c24d 25px 26px), #fffef0; box-shadow: 2px 3px 4px #595a2d14; transform: rotate(-2deg); color: #647247; }
.caderno__furos { position: absolute; display: flex; justify-content: space-around; left: .8rem; right: .8rem; top: -.35rem; }
.caderno__furos i { width: .35rem; height: .75rem; border: 1px solid #91a6a8; border-radius: 4px; background: linear-gradient(90deg, #8da2a8, #fff, #b8c5c7); box-shadow: 0 1px 1px #68786a55; }
.caderno h2 { font-size: .875rem; color: #60733e; margin-bottom: .8rem; }
.caderno p { font-size: 1rem; margin-bottom: .5rem; }
.caderno > span { font-size: .6875rem; font-style: italic; }
.inicio__fim { display: flex; align-items: center; justify-content: center; gap: .7rem; border-top: 1px solid #d6e7ee; margin-top: 2rem; padding-top: 1.2rem; }
.inicio__fim .aero-icon { width: 2.5rem; height: 2.5rem; }
.inicio__fim p { font-size: .8125rem; color: #6b8591; margin: 0; }
.inicio__fim strong { font-weight: 400; color: #456b7b; }
@media (max-width: 70rem) {
  .boas-vindas { margin: -1.5rem -1.5rem 0; padding: 2rem 1.5rem 1.5rem; }
  .inicio__explorar { gap: 1.25rem; grid-template-columns: minmax(0, 1fr) 12rem; }
  .quebra-desktop { display: none; }
}
@media (max-width: 60rem) {
  .boas-vindas { grid-template-columns: 1fr; }
  .boas-vindas .aero-cena { max-width: 22rem; margin-top: .5rem; }
  .inicio__explorar { grid-template-columns: 1fr; }
  .mesa-lateral { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start; }
  .caderno { margin-top: .5rem; }
}
@media (max-width: 48rem) {
  .boas-vindas { margin: -1.25rem -1.25rem 0; padding: 1.75rem 1.25rem 1rem; grid-template-columns: 1.1fr 1fr; }
  .boas-vindas h1 { font-size: 1.85rem; }
  .boas-vindas .aero-cena { min-width: 0; }
}
@media (max-width: 38rem) {
  .boas-vindas { grid-template-columns: 1fr; }
  .boas-vindas h1 { font-size: 2.1rem; }
  .boas-vindas .aero-cena { margin: 1rem auto 0; max-width: 21rem; }
}
@media (max-width: 30rem) {
  .boas-vindas { margin: -1rem -1rem 0; padding-inline: 1rem; }
  .mesa-lateral { grid-template-columns: 1fr; gap: 1rem; }
  .caderno { margin: .5rem .5rem 0; }
  .trilha__lista a { gap: .6rem; }
  .faixa-aprender { align-items: flex-start; padding: .75rem; }
}
</style>
