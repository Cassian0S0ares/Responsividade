<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import paisagem from '@/assets/Image1.jpg'

const ATRASO_MS = 2000

const comDimensoes = ref(false)
const src = ref('')
const estado = ref('parado') // parado | carregando | pronto
const rodada = ref(0)
const pulo = ref(0)
const cls = ref(0)
const texto = ref(null)

// O CLS de verdade, medido pelo navegador (só Chrome/Edge expõem essa API).
const suportaCls =
  typeof PerformanceObserver !== 'undefined' &&
  PerformanceObserver.supportedEntryTypes?.includes('layout-shift')
let observador
let medindo = false
let topoAntes = 0

onMounted(() => {
  if (!suportaCls) return
  observador = new PerformanceObserver((lista) => {
    for (const entrada of lista.getEntries()) {
      // Mudanças logo após um clique não contam como CLS (a pessoa "pediu").
      if (medindo && !entrada.hadRecentInput) cls.value += entrada.value
    }
  })
  observador.observe({ type: 'layout-shift' })
})
onBeforeUnmount(() => observador?.disconnect())

async function carregar() {
  rodada.value++ // recria a <img> do zero
  src.value = ''
  pulo.value = 0
  cls.value = 0
  estado.value = 'carregando'
  await nextTick()
  topoAntes = texto.value.offsetTop
  medindo = true
  // Simula uma internet lenta: a imagem só "chega" depois de 2 segundos.
  setTimeout(() => {
    src.value = `${paisagem}?rodada=${rodada.value}`
  }, ATRASO_MS)
}

async function aoCarregar() {
  await nextTick()
  pulo.value = texto.value.offsetTop - topoAntes
  estado.value = 'pronto'
  setTimeout(() => {
    medindo = false
  }, 1000)
}

function trocarModo() {
  estado.value = 'parado'
  src.value = ''
  rodada.value++
}
</script>

<template>
  <div class="lab cls-lab">
    <label class="cls-lab__chave">
      <input v-model="comDimensoes" type="checkbox" @change="trocarModo" />
      Colocar <code>width="736" height="460"</code> na imagem
    </label>

    <button type="button" class="botao" :disabled="estado === 'carregando'" @click="carregar">
      {{ estado === 'carregando' ? 'Carregando (internet lenta)…' : 'Carregar notícia' }}
    </button>

    <div class="cls-lab__noticia">
      <h4>Primavera chega com céu limpo no interior</h4>

      <!-- Com width e height: o navegador calcula a proporção (736/460) e reserva o espaço antes. -->
      <img
        v-if="comDimensoes"
        :key="`com-${rodada}`"
        :src="src || undefined"
        width="736"
        height="460"
        alt=""
        class="cls-lab__img cls-lab__img--reservada"
        :class="{ skeleton: estado === 'carregando' }"
        @load="aoCarregar"
      />
      <!-- Sem width e height: o navegador não sabe o tamanho até a imagem chegar. -->
      <img
        v-else
        :key="`sem-${rodada}`"
        :src="src || undefined"
        alt=""
        class="cls-lab__img"
        :class="{ skeleton: estado === 'carregando' }"
        @load="aoCarregar"
      />

      <p ref="texto" class="cls-lab__texto">
        Este é o texto da notícia. Tente começar a ler antes de a imagem carregar e veja se ele
        sai do lugar.
      </p>
    </div>

    <div v-if="estado === 'pronto'" class="cls-lab__resultado" :class="pulo > 0 ? 'ruim' : 'bom'">
      <p>O texto pulou <strong>{{ Math.round(pulo) }}px</strong> para baixo.</p>
      <p v-if="suportaCls">
        CLS medido pelo navegador: <strong>{{ cls.toFixed(3) }}</strong>
        ({{ cls <= 0.1 ? 'bom: até 0,1' : 'ruim: acima de 0,1' }})
      </p>
      <p v-else>Seu navegador não expõe o CLS. Abra no Chrome ou Edge para ver o número.</p>
    </div>
  </div>
</template>

<style scoped>
.cls-lab {
  display: grid;
  gap: var(--esp-3);
  justify-items: start;
}

.cls-lab__chave {
  display: flex;
  gap: var(--esp-2);
  align-items: flex-start;
}

.cls-lab__chave input {
  margin-top: 0.4rem;
  flex-shrink: 0;
}

.cls-lab__noticia {
  position: relative;
  width: 100%;
  max-width: 40rem;
}

.cls-lab__img {
  max-width: 100%;
  height: auto;
  background: var(--cor-borda);
}

/* O navegador já faz isso sozinho a partir de width e height;
   deixamos explícito para a reserva funcionar antes mesmo do src existir. */
.cls-lab__img--reservada {
  width: 100%;
  aspect-ratio: 736 / 460;
}

/* Skeleton: um "esqueleto" com brilho passando enquanto a foto não chega.
   Só aparece se houver espaço reservado: sem width/height a imagem tem 0px
   de altura e o skeleton some junto (mais um motivo para usar width e height). */
.skeleton {
  border-radius: var(--raio);
  background: linear-gradient(
    90deg,
    var(--cor-borda) 25%,
    var(--cor-fundo) 50%,
    var(--cor-borda) 75%
  );
  background-size: 200% 100%;
  animation: brilho 1.2s ease-in-out infinite;
}

@keyframes brilho {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

/* Quem pediu menos movimento no sistema vê o skeleton parado. */
@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
  }
}

.cls-lab__texto {
  margin-top: var(--esp-2);
}

.cls-lab__resultado {
  width: 100%;
  padding: var(--esp-3);
  border-radius: var(--raio);
  border-left: 0.25rem solid;
}

.cls-lab__resultado p {
  margin: 0;
}

.bom {
  border-color: var(--cor-ok);
}

.ruim {
  border-color: var(--cor-erro);
}
</style>
