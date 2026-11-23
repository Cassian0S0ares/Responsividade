<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Sem a meta viewport, o navegador do celular finge ter uma tela de ~980px.
const LARGURA_SEM_VIEWPORT = 980

const comViewport = ref(false)
const tela = ref(null)
const larguraTela = ref(300)
let observador

// Mede a largura real da "tela" do celular desenhado (muda conforme a janela).
onMounted(() => {
  observador = new ResizeObserver(([entrada]) => {
    larguraTela.value = entrada.contentRect.width
  })
  observador.observe(tela.value)
})
onBeforeUnmount(() => observador?.disconnect())

// Com viewport: a página é desenhada na largura do aparelho.
// Sem viewport: é desenhada com 980px e depois encolhida para caber.
const larguraLayout = computed(() => (comViewport.value ? larguraTela.value : LARGURA_SEM_VIEWPORT))
const escala = computed(() => larguraTela.value / larguraLayout.value)
</script>

<template>
  <div class="lab">
    <label class="lab__chave">
      <input v-model="comViewport" type="checkbox" />
      Ligar <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code>
    </label>

    <p class="lab__info">
      O navegador desenhou a página com
      <strong>{{ Math.round(larguraLayout) }}px</strong> de largura e mostrou numa tela de
      <strong>{{ Math.round(larguraTela) }}px</strong> (zoom de {{ escala.toFixed(2) }}x).
      <span v-if="!comViewport">As media queries enxergam 980px, então o layout de desktop vence.</span>
      <span v-else>As media queries enxergam a largura real, então o layout de celular aparece.</span>
    </p>

    <div class="celular">
      <div ref="tela" class="celular__tela">
        <div
          class="mini-site"
          :style="{ width: `${larguraLayout}px`, transform: `scale(${escala})` }"
        >
          <!-- O mini-site usa container queries para imitar as media queries de um site real. -->
          <div class="mini-site__layout">
            <header class="mini-site__topo">
              <strong>Padaria do Bairro</strong>
              <span class="mini-site__hamburguer">☰</span>
              <nav class="mini-site__nav">
                <span>Início</span><span>Pães</span><span>Bolos</span><span>Contato</span>
              </nav>
            </header>
            <h3 class="mini-site__titulo">Pão quentinho toda manhã</h3>
            <div class="mini-site__cards">
              <div class="mini-site__card">Pão francês</div>
              <div class="mini-site__card">Bolo de fubá</div>
              <div class="mini-site__card">Sonho</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lab__chave {
  display: flex;
  gap: var(--esp-2);
  align-items: flex-start;
  font-weight: 700;
}

.lab__chave input {
  margin-top: 0.4rem;
  flex-shrink: 0;
}

/* O "aparelho" desenhado */
.celular {
  width: min(100%, 20rem);
  margin: 0 auto;
  padding: var(--esp-4) var(--esp-2);
  border-radius: 1.5rem;
  background: var(--cor-texto);
}

.celular__tela {
  height: 26rem;
  overflow: hidden;
  background: #fff;
}

.mini-site {
  transform-origin: top left;
  container-type: inline-size;
  color: #222;
}

/* Estilo base (celular) do mini-site */
.mini-site__layout {
  padding: 1rem;
  font-size: 1rem;
}

.mini-site__topo {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
}

.mini-site__nav {
  display: none;
}

.mini-site__titulo {
  margin: 1rem 0;
  font-size: 1.5rem;
}

.mini-site__cards {
  display: grid;
  gap: 0.75rem;
}

.mini-site__card {
  padding: 2rem 1rem;
  border-radius: 0.5rem;
  background: #f3d9b1;
}

/* "Desktop" do mini-site: só aparece quando o layout tem 37.5rem (600px) ou mais. */
@container (min-width: 37.5rem) {
  .mini-site__hamburguer {
    display: none;
  }

  .mini-site__nav {
    display: flex;
    gap: 1.5rem;
  }

  .mini-site__titulo {
    font-size: 2.5rem;
  }

  .mini-site__cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
