<script setup>
import AeroIcon from './AeroIcon.vue'
// A cena e decorativa e nenhuma das telas passa de ~240px de largura,
// entao a variante menor da foto ja cobre o necessario.
import paisagem from '@/assets/Image1-320.jpg'
</script>

<template>
  <div class="aero-cena" aria-hidden="true">
    <div class="orbita"></div>
    <div class="bolha bolha--um"></div><div class="bolha bolha--dois"></div><div class="bolha bolha--tres"></div>
    <AeroIcon tipo="globo" class="cena-globo" />
    <div class="monitor">
      <div class="monitor__corpo"><div class="monitor__tela"><img :src="paisagem" alt="" loading="lazy" decoding="async" /><div class="mini-janela"><div></div><span></span><span></span><span></span></div></div><i></i></div>
      <div class="monitor__pe"></div><div class="monitor__base"></div>
    </div>
    <div class="tablet"><img :src="paisagem" alt="" loading="lazy" decoding="async" /><div class="tablet__linhas"></div></div>
    <div class="telefone"><div class="telefone__som"></div><img :src="paisagem" alt="" loading="lazy" decoding="async" /><div class="telefone__botao"></div></div>
    <AeroIcon tipo="folha" class="cena-folha" />
    <span class="estrela estrela--um">✦</span><span class="estrela estrela--dois">✦</span>
  </div>
</template>

<style scoped>
.aero-cena { position: relative; width: 100%; max-width: 25rem; height: 16rem; margin: auto; isolation: isolate; }
.orbita { position: absolute; width: 92%; height: 9rem; left: 5%; bottom: 2rem; border-radius: 50%; border: 1px solid var(--azul-72-a50); background: radial-gradient(ellipse, var(--azul-74-a44), var(--azul-87-a8) 68%, var(--branco-a60) 70%, transparent 72%); transform: rotate(-15deg); }
.monitor { position: absolute; width: 65%; top: 2.5rem; left: 18%; transform: rotate(-5deg); z-index: 2; filter: drop-shadow(0 8px 5px var(--azul-33-a19)); }
.monitor__corpo { position: relative; padding: var(--esp-055) var(--esp-055) var(--esp-3); border-radius: 9px; border: 1px solid var(--azul-64); background: linear-gradient(135deg, var(--branco), var(--azul-94-v4) 45%, var(--azul-74) 46%, var(--azul-97-v3) 90%); box-shadow: inset 0 1px var(--branco); }
.monitor__tela { position: relative; aspect-ratio: 16/10; overflow: hidden; border: 1px solid var(--azul-38-v2); background: var(--azul-63); }
.monitor__tela > img { width: 100%; height: 100%; object-fit: cover; }
.monitor__tela::after { content: ''; position: absolute; inset: 0; background: linear-gradient(125deg, var(--branco-a0) 30%, var(--branco-a40) 30%, var(--branco-a7) 60%, transparent 60%); }
.monitor__corpo > i { position: absolute; bottom: .3rem; left: 50%; height: .25rem; width: .25rem; background: var(--verde-44); border-radius: 50%; box-shadow: 0 0 3px var(--verde-47-v2); }
.monitor__pe { height: 1.5rem; width: 20%; margin: auto; background: linear-gradient(90deg, var(--azul-67-v2), var(--azul-94-v6), var(--azul-78)); clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%); }
.monitor__base { width: 47%; height: .6rem; margin: auto; background: linear-gradient(var(--branco), var(--azul-68)); border-radius: 60% 60% 20% 20%; border: 1px solid var(--azul-72); }
.mini-janela { position: absolute; top: 22%; left: 20%; width: 60%; height: 61%; background: var(--branco-a94); border: 3px solid var(--azul-91-a74); border-radius: 4px; box-shadow: 0 2px 8px var(--azul-31-a31); display: flex; flex-wrap: wrap; gap: 5%; padding: 8% 6% 5%; }
.mini-janela > div { width: 100%; height: 20%; background: var(--azul-51); border-radius: 2px; }
.mini-janela > span { flex: 1; background: linear-gradient(var(--verde-73), var(--verde-54)); border: 1px solid var(--verde-51); border-radius: 2px; }
.tablet { position: absolute; width: 40%; height: 6rem; bottom: 1.9rem; left: 0; padding: var(--esp-2) var(--esp-070); border-radius: .5rem; border: 1px solid var(--azul-55); background: linear-gradient(145deg, var(--cinza-99-v4), var(--azul-70)); transform: rotate(-12deg); z-index: 3; box-shadow: 0 5px 10px var(--azul-29-a20), inset 0 1px var(--branco); }
.tablet img { width: 100%; height: 100%; object-fit: cover; border: 1px solid var(--azul-47); }
.tablet__linhas { position: absolute; width: 45%; height: 2rem; right: 22%; top: 40%; background: repeating-linear-gradient(var(--branco) 0 6px, var(--verde-83-v2) 6px 12px); border: 4px solid var(--branco-a91); box-shadow: 0 1px 4px var(--azul-22-a31); }
.telefone { position: absolute; height: 7rem; width: 3.8rem; bottom: 1.4rem; right: 11%; padding: var(--esp-085) var(--esp-030) var(--esp-3); transform: rotate(9deg); border-radius: .7rem; border: 1px solid var(--azul-62-v2); background: linear-gradient(110deg, var(--branco), var(--azul-85)); box-shadow: 0 6px 8px var(--azul-30-a21), inset 0 1px var(--branco); z-index: 4; }
.telefone img { width: 100%; height: 100%; object-fit: cover; border: 1px solid var(--azul-59-v2); }
.telefone__som { position: absolute; top: .35rem; width: 30%; height: 2px; left: 35%; background: var(--azul-57); border-radius: 2px; }
.telefone__botao { position: absolute; bottom: .2rem; left: calc(50% - .3rem); width: .6rem; height: .6rem; border-radius: 50%; border: 1px solid var(--azul-64-v3); box-shadow: inset 0 1px var(--branco); }
.cena-globo { position: absolute; right: -1%; top: -.5rem; width: 8rem; height: 8rem; transform: rotate(12deg); filter: drop-shadow(0 5px 5px var(--azul-40-a16)); }
.cena-folha { position: absolute; bottom: 1rem; right: -1%; width: 5rem; height: 5rem; transform: rotate(20deg); z-index: 5; }
.bolha { position: absolute; border-radius: 50%; border: 1px solid var(--branco); background: radial-gradient(circle at 30% 25%, var(--branco) 0%, var(--branco-a27) 13%, var(--azul-85-a6) 45%, var(--azul-54-a13) 70%, var(--branco-a60) 90%); box-shadow: inset 1px 2px 3px var(--branco), inset -2px -3px 5px var(--azul-58-a27), 0 2px 4px var(--azul-42-a8); }
.bolha--um { width: 3rem; height: 3rem; top: 1rem; left: 7%; }
.bolha--dois { width: 1.4rem; height: 1.4rem; top: 0; left: 28%; }
.bolha--tres { width: 2rem; height: 2rem; bottom: .5rem; left: 42%; }
.estrela { position: absolute; color: var(--branco); text-shadow: 0 0 5px var(--azul-59); z-index: 5; }
.estrela--um { top: 2rem; left: 38%; font-size: 1.8rem; }
.estrela--dois { bottom: .5rem; left: 14%; font-size: 1.1rem; }
@media (min-width: 30.0625rem) { .aero-cena { height: 18rem; } .monitor { top: 3rem; } .tablet { height: 7.5rem; } .telefone { height: 8rem; width: 4.3rem; } }
</style>
