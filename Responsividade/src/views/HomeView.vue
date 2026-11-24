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
        <div class="trilha__cabecalho"><h2 id="titulo-trilha">Por onde vamos?</h2><span>{{ secoes.length }} paradas para descobrir</span></div>
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
/* Sangra ate a borda de .conteudo reaproveitando o padding declarado la. */
.boas-vindas { display: grid; grid-template-columns: 1fr; align-items: center; gap: var(--esp-2); margin: calc(var(--pad-conteudo) * -1) calc(var(--pad-conteudo) * -1) 0; padding: var(--esp-175) var(--esp-3) var(--esp-3); background: radial-gradient(ellipse at 95% 60%, var(--azul-81-a48), transparent 57%), linear-gradient(var(--azul-97-v2), var(--branco) 90%); }
.boas-vindas__saudacao { margin-bottom: var(--esp-070); font-size: .9375rem; color: var(--azul-42); }
.boas-vindas h1 { font-size: 2.1rem; line-height: 1.17; margin-bottom: var(--esp-3); }
.boas-vindas h1 em { font-style: normal; color: var(--verde-30); }
.boas-vindas__texto > p:not(:first-child) { font-size: 1rem; color: var(--azul-39); max-width: 29rem; }
.boas-vindas .botao { margin-top: var(--esp-035); }
.boas-vindas .aero-cena { min-width: 0; max-width: 21rem; margin: var(--esp-3) auto 0; }
.quebra-desktop { display: none; }
.boas-vindas__nota { display: block; font-size: .75rem; color: var(--azul-45-v4); margin-top: var(--esp-060); }
.faixa-aprender { display: flex; align-items: flex-start; gap: var(--esp-070); padding: var(--esp-075); border: 1px solid var(--verde-76); border-radius: 4px; background: linear-gradient(var(--verde-96), var(--verde-91)); box-shadow: inset 0 1px var(--branco); }
.faixa-aprender .aero-icon { width: 2.2rem; height: 2.2rem; }
.faixa-aprender p { margin: 0; color: var(--verde-32); font-size: .875rem; }
.faixa-aprender strong { font-weight: 600; color: var(--verde-27-v2); }
.inicio__explorar { display: grid; grid-template-columns: 1fr; gap: var(--esp-125); margin-top: var(--esp-5); }
.mesa-lateral { display: grid; grid-template-columns: 1fr; gap: var(--esp-3); align-items: start; }
.trilha__cabecalho { display: flex; justify-content: space-between; flex-wrap: wrap; align-items: baseline; gap: var(--esp-030); padding-bottom: var(--esp-075); border-bottom: 1px solid var(--azul-84-v2); }
.trilha__cabecalho h2 { font-weight: 400; margin: 0; font-size: 1.4rem; }
.trilha__cabecalho > span { font-size: .75rem; color: var(--azul-47-v2); }
.trilha__lista { margin: 0; padding: 0; list-style: none; }
.trilha__lista li { border-bottom: 1px solid var(--azul-91-v3); }
.trilha__lista a { display: flex; gap: var(--esp-060); align-items: center; padding: var(--esp-080) var(--esp-030); text-decoration: none; border-radius: 3px; transition: background .15s; }
.trilha__lista a:hover { background: linear-gradient(90deg, var(--azul-97), var(--branco)); }
.trilha__lista .aero-icon { width: 2.8rem; height: 2.8rem; }
.trilha__lista strong { display: block; font-size: .9375rem; font-weight: 600; color: var(--azul-32); }
.trilha__lista small { display: block; margin-top: var(--esp-015); font-size: .875rem; color: var(--azul-43-v3); }
.visor { border: 1px solid var(--azul-71-v2); border-radius: 6px; padding: var(--esp-060); background: linear-gradient(120deg, var(--cinza-99-v5), var(--azul-93-v3)); box-shadow: 0 3px 8px var(--azul-35-a7), inset 0 1px var(--branco); }
.visor h2 { display: flex; align-items: center; gap: var(--esp-040); margin: 0 0 var(--esp-060); font-size: .9375rem; font-weight: 600; }
.visor h2 .aero-icon { width: 1.65rem; height: 1.65rem; }
.visor__mostrador { padding: var(--esp-3) var(--esp-075) var(--esp-2); background: radial-gradient(ellipse at 50% 0%, var(--branco), var(--azul-96) 80%); border: 1px solid var(--azul-75); border-radius: 3px; box-shadow: inset 0 2px 5px var(--azul-35-a13); text-align: center; color: var(--azul-43); }
.visor__mostrador > span { font-size: .75rem; }
.visor__mostrador p { margin: calc(var(--esp-010) * -1) 0; color: var(--azul-38); font-family: var(--fonte-mono); font-size: .9rem; }
.visor__mostrador strong { font-size: 2.6rem; font-weight: 400; letter-spacing: -.07em; color: var(--azul-34-v2); text-shadow: 0 2px var(--branco); }
.visor__escala { overflow: hidden; margin-top: var(--esp-3); height: .55rem; background: var(--azul-85-v2); border: 1px solid var(--azul-71-v3); border-radius: 4px; box-shadow: inset 0 1px 2px var(--azul-37-a15); }
.visor__escala i { display: block; height: 100%; background: linear-gradient(var(--verde-67), var(--verde-40)); border-right: 1px solid var(--verde-35-v2); }
.visor__marcas { display: flex; justify-content: space-between; margin-top: var(--esp-020); font-size: .625rem; }
.visor__dica { margin: var(--esp-070) 0 var(--esp-040); color: var(--azul-44-v4); font-size: .8125rem; text-align: center; }
.visor > a { display: block; text-align: center; font-size: .8125rem; margin-bottom: var(--esp-020); }
.caderno { position: relative; margin: var(--esp-2) var(--esp-2) 0; padding: var(--esp-140) var(--esp-3) var(--esp-090) var(--esp-125); border: 1px solid var(--amarelo-76); border-radius: 2px 2px 12px 2px; background: repeating-linear-gradient(transparent 0 25px, var(--verde-80-a30) 25px 26px), var(--amarelo-97); box-shadow: 2px 3px 4px var(--amarelo-26-a8); transform: rotate(-2deg); color: var(--verde-36-v3); }
.caderno__furos { position: absolute; display: flex; justify-content: space-around; left: .8rem; right: .8rem; top: -.35rem; }
.caderno__furos i { width: .35rem; height: .75rem; border: 1px solid var(--cinza-61); border-radius: 4px; background: linear-gradient(90deg, var(--azul-61), var(--branco), var(--cinza-75)); box-shadow: 0 1px 1px var(--cinza-44-a33); }
.caderno h2 { font-size: .875rem; color: var(--verde-35-v3); margin-bottom: var(--esp-080); }
.caderno p { font-size: 1rem; margin-bottom: var(--esp-2); }
.caderno > span { font-size: .6875rem; font-style: italic; }
.inicio__fim { display: flex; align-items: center; justify-content: center; gap: var(--esp-070); border-top: 1px solid var(--azul-89-v2); margin-top: var(--esp-5); padding-top: var(--esp-120); }
.inicio__fim .aero-icon { width: 2.5rem; height: 2.5rem; }
.inicio__fim p { font-size: .8125rem; color: var(--azul-49-v2); margin: 0; }
.inicio__fim strong { font-weight: 400; color: var(--azul-38-v3); }
/* Faixas de largura, do celular para cima (limites + 1px, ver App.vue). */
@media (min-width: 30.0625rem) {
  .boas-vindas { padding-inline: var(--esp-125); }
  .faixa-aprender { align-items: center; padding: var(--esp-080) var(--esp-3); }
  .mesa-lateral { grid-template-columns: 1fr 1fr; gap: var(--esp-4); }
  .caderno { margin-inline: var(--esp-015); }
  .trilha__lista a { gap: var(--esp-080); }
}
@media (min-width: 38.0625rem) {
  .boas-vindas { grid-template-columns: 1.1fr 1fr; }
  .boas-vindas h1 { font-size: 1.85rem; }
  .boas-vindas .aero-cena { max-width: 22rem; margin: var(--esp-2) auto auto; }
}
@media (min-width: 48.0625rem) {
  .boas-vindas { grid-template-columns: 1fr; padding: var(--esp-5) var(--esp-4) var(--esp-4); }
  .boas-vindas h1 { font-size: clamp(1.85rem, 2.65vw, 2.65rem); }
  .boas-vindas .aero-cena { min-width: auto; }
}
@media (min-width: 60.0625rem) {
  .boas-vindas { grid-template-columns: 1.08fr 1fr; }
  .boas-vindas .aero-cena { max-width: 25rem; margin: auto; }
  .inicio__explorar { grid-template-columns: minmax(0, 1fr) 12rem; }
  .mesa-lateral { display: block; }
  .caderno { margin-top: var(--esp-4); }
}
@media (min-width: 70.0625rem) {
  .boas-vindas { padding: var(--esp-250) var(--esp-5) var(--esp-175) var(--esp-250); }
  .inicio__explorar { grid-template-columns: minmax(0, 1fr) 14rem; gap: var(--esp-5); }
  .quebra-desktop { display: inline; }
}
</style>
