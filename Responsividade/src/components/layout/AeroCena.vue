<script setup>
import AeroIcon from './AeroIcon.vue'
import paisagem from '@/assets/Image1.jpg'
</script>

<template>
  <div class="aero-cena" aria-hidden="true">
    <div class="orbita"></div>
    <div class="bolha bolha--um"></div><div class="bolha bolha--dois"></div><div class="bolha bolha--tres"></div>
    <AeroIcon tipo="globo" class="cena-globo" />
    <div class="monitor">
      <div class="monitor__corpo"><div class="monitor__tela"><img :src="paisagem" alt="" /><div class="mini-janela"><div></div><span></span><span></span><span></span></div></div><i></i></div>
      <div class="monitor__pe"></div><div class="monitor__base"></div>
    </div>
    <div class="tablet"><img :src="paisagem" alt="" /><div class="tablet__linhas"></div></div>
    <div class="telefone"><div class="telefone__som"></div><img :src="paisagem" alt="" /><div class="telefone__botao"></div></div>
    <AeroIcon tipo="folha" class="cena-folha" />
    <span class="estrela estrela--um">✦</span><span class="estrela estrela--dois">✦</span>
  </div>
</template>

<style scoped>
.aero-cena { position: relative; width: 100%; max-width: 25rem; height: 18rem; margin: auto; isolation: isolate; }
.orbita { position: absolute; width: 92%; height: 9rem; left: 5%; bottom: 2rem; border-radius: 50%; border: 1px solid #8acee680; background: radial-gradient(ellipse, #8ad9ee70, #bdeeff15 68%, #fff9 70%, transparent 72%); transform: rotate(-15deg); }
.monitor { position: absolute; width: 65%; top: 3rem; left: 18%; transform: rotate(-5deg); z-index: 2; filter: drop-shadow(0 8px 5px #21688930); }
.monitor__corpo { position: relative; padding: .55rem .55rem 1rem; border-radius: 9px; border: 1px solid #88aebf; background: linear-gradient(135deg, #fff, #e7f3f7 45%, #aac2cf 46%, #f0faff 90%); box-shadow: inset 0 1px #fff; }
.monitor__tela { position: relative; aspect-ratio: 16/10; overflow: hidden; border: 1px solid #376b8a; background: #4cbbf5; }
.monitor__tela > img { width: 100%; height: 100%; object-fit: cover; }
.monitor__tela::after { content: ''; position: absolute; inset: 0; background: linear-gradient(125deg, #fff0 30%, #fff6 30%, #fff1 60%, transparent 60%); }
.monitor__corpo > i { position: absolute; bottom: .3rem; left: 50%; height: .25rem; width: .25rem; background: #68bf23; border-radius: 50%; box-shadow: 0 0 3px #75b837; }
.monitor__pe { height: 1.5rem; width: 20%; margin: auto; background: linear-gradient(90deg, #93b1c2, #e8f4f9, #b5ccd9); clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%); }
.monitor__base { width: 47%; height: .6rem; margin: auto; background: linear-gradient(#fff, #92b2c7); border-radius: 60% 60% 20% 20%; border: 1px solid #a0bfcf; }
.mini-janela { position: absolute; top: 22%; left: 20%; width: 60%; height: 61%; background: #fffffff0; border: 3px solid #d2f2ffbd; border-radius: 4px; box-shadow: 0 2px 8px #225d7d50; display: flex; flex-wrap: wrap; gap: 5%; padding: 8% 6% 5%; }
.mini-janela > div { width: 100%; height: 20%; background: #3c99c8; border-radius: 2px; }
.mini-janela > span { flex: 1; background: linear-gradient(#bfe68d, #8cc64d); border: 1px solid #84b84d; border-radius: 2px; }
.tablet { position: absolute; width: 40%; height: 7.5rem; bottom: 1.9rem; left: 0; padding: .5rem .7rem; border-radius: .5rem; border: 1px solid #7395a6; background: linear-gradient(145deg, #f9ffff, #9cb9c7); transform: rotate(-12deg); z-index: 3; box-shadow: 0 5px 10px #215c7333, inset 0 1px white; }
.tablet img { width: 100%; height: 100%; object-fit: cover; border: 1px solid #4d86a5; }
.tablet__linhas { position: absolute; width: 45%; height: 2rem; right: 22%; top: 40%; background: repeating-linear-gradient(#fff 0 6px, #d5eabf 6px 12px); border: 4px solid #ffffffe8; box-shadow: 0 1px 4px #244b4150; }
.telefone { position: absolute; height: 8rem; width: 4.3rem; bottom: 1.4rem; right: 11%; padding: .85rem .3rem 1rem; transform: rotate(9deg); border-radius: .7rem; border: 1px solid #83a6b8; background: linear-gradient(110deg, #fff, #ccdee8); box-shadow: 0 6px 8px #1d5d7c36, inset 0 1px white; z-index: 4; }
.telefone img { width: 100%; height: 100%; object-fit: cover; border: 1px solid #78a1b5; }
.telefone__som { position: absolute; top: .35rem; width: 30%; height: 2px; left: 35%; background: #7d9ba8; border-radius: 2px; }
.telefone__botao { position: absolute; bottom: .2rem; left: calc(50% - .3rem); width: .6rem; height: .6rem; border-radius: 50%; border: 1px solid #90aab6; box-shadow: inset 0 1px white; }
.cena-globo { position: absolute; right: -1%; top: -.5rem; width: 8rem; height: 8rem; transform: rotate(12deg); filter: drop-shadow(0 5px 5px #078cc329); }
.cena-folha { position: absolute; bottom: 1rem; right: -1%; width: 5rem; height: 5rem; transform: rotate(20deg); z-index: 5; }
.bolha { position: absolute; border-radius: 50%; border: 1px solid #fff; background: radial-gradient(circle at 30% 25%, #fff 0%, #fff4 13%, #b4e8fd10 45%, #2cb8e720 70%, #fff9 90%); box-shadow: inset 1px 2px 3px #fff, inset -2px -3px 5px #51b6d745, 0 2px 4px #2986af15; }
.bolha--um { width: 3rem; height: 3rem; top: 1rem; left: 7%; }
.bolha--dois { width: 1.4rem; height: 1.4rem; top: 0; left: 28%; }
.bolha--tres { width: 2rem; height: 2rem; bottom: .5rem; left: 42%; }
.estrela { position: absolute; color: #fff; text-shadow: 0 0 5px #58bdd7; z-index: 5; }
.estrela--um { top: 2rem; left: 38%; font-size: 1.8rem; }
.estrela--dois { bottom: .5rem; left: 14%; font-size: 1.1rem; }
@media (max-width: 30rem) { .aero-cena { height: 16rem; } .monitor { top: 2.5rem; } .tablet { height: 6rem; } .telefone { height: 7rem; width: 3.8rem; } }
</style>
