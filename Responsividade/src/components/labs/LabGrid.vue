<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

const TOTAL_CARDS = 8

const minRem = ref(14)
const gapRem = ref(1)
const largura = ref(320)
const disponivel = ref(320)
const pxPorRem = ref(16)
const colunasReais = ref(1)
const larguraCard = ref(0)
const area = ref(null)
const grade = ref(null)
let observador
let primeiraMedida = true

// A largura máxima do slider é o espaço que existe na tela: assim a grade nunca vaza.
onMounted(() => {
  pxPorRem.value = parseFloat(getComputedStyle(document.documentElement).fontSize)
  observador = new ResizeObserver(([entrada]) => {
    disponivel.value = Math.floor(entrada.contentRect.width)
    if (primeiraMedida || largura.value > disponivel.value) {
      largura.value = disponivel.value
      primeiraMedida = false
    }
  })
  observador.observe(area.value)
})
onBeforeUnmount(() => observador?.disconnect())

const minPx = computed(() => minRem.value * pxPorRem.value)
const gapPx = computed(() => gapRem.value * pxPorRem.value)

// Quantas colunas cabem: n colunas precisam de n × mínimo + (n − 1) × gap.
const colunasCalculadas = computed(() =>
  Math.min(TOTAL_CARDS, Math.max(1, Math.floor((largura.value + gapPx.value) / (minPx.value + gapPx.value)))),
)
const larguraPara = (n) => n * minPx.value + (n - 1) * gapPx.value
const proxima = computed(() => colunasCalculadas.value + 1)

// Maior mínimo (em rem inteiro) que ainda deixa caber 2 colunas na largura atual.
const minimoParaDuas = computed(() => Math.floor((largura.value - gapPx.value) / 2 / pxPorRem.value))

// Confere com o navegador: conta as colunas que o CSS realmente criou.
watch(
  [largura, minRem, gapRem],
  async () => {
    await nextTick()
    if (!grade.value) return
    const trilhas = getComputedStyle(grade.value).gridTemplateColumns.split(' ')
    colunasReais.value = trilhas.filter((t) => parseFloat(t) > 0).length
    larguraCard.value = Math.round(grade.value.firstElementChild.getBoundingClientRect().width)
  },
  { immediate: true, flush: 'post' },
)
</script>

<template>
  <div class="lab">
    <div class="lab__controle">
      <label for="grid-largura">Largura do contêiner: <strong>{{ largura }}px</strong></label>
      <input id="grid-largura" v-model.number="largura" type="range" min="160" :max="disponivel" />
    </div>
    <div class="grid-lab__ajustes">
      <div class="lab__controle">
        <label for="grid-min">Mínimo: <strong>{{ minRem }}rem</strong> ({{ minPx }}px)</label>
        <input id="grid-min" v-model.number="minRem" type="range" min="8" max="20" step="1" />
      </div>
      <div class="lab__controle">
        <label for="grid-gap">Gap: <strong>{{ gapRem }}rem</strong> ({{ gapPx }}px)</label>
        <input id="grid-gap" v-model.number="gapRem" type="range" min="0" max="3" step="0.5" />
      </div>
    </div>

    <p class="grid-lab__conta">
      <code>grid-template-columns: repeat(auto-fit, minmax({{ minRem }}rem, 1fr)); gap: {{ gapRem }}rem;</code>
    </p>
    <p class="grid-lab__conta">
      Colunas agora: <strong>{{ colunasReais }}</strong> (pela conta: {{ colunasCalculadas }}).
      <template v-if="proxima <= TOTAL_CARDS">
        <br />
        {{ proxima }} colunas a partir de: {{ proxima }} × {{ minPx }} + {{ proxima - 1 }} × {{ gapPx }} =
        <strong>{{ larguraPara(proxima) }}px</strong>
        <span v-if="larguraPara(proxima) > disponivel"> (não cabe nesta tela, gire o celular ou use um monitor maior)</span>
      </template>
    </p>
    <p class="grid-lab__conta">
      Cada card tem <strong>{{ larguraCard }}px</strong>: o mínimo é {{ minPx }}px e o
      <code>1fr</code> estica o card para dividir o espaço que sobra.
    </p>
    <p v-if="colunasReais === 1 && larguraPara(2) > largura" class="grid-lab__aviso">
      Já está em 1 coluna: aumentar o mínimo não muda nada, porque o card já ocupa tudo.
      <template v-if="minimoParaDuas >= 8">
        <strong>Diminua o mínimo</strong> até {{ minimoParaDuas }}rem ou menos para caberem 2 colunas.
      </template>
      <template v-else>
        <strong>Aumente a largura</strong> do contêiner: nesta largura, 2 colunas não cabem nem com o menor mínimo.
      </template>
    </p>

    <div ref="area" class="grid-lab__area">
      <div
        ref="grade"
        class="grid-lab__grade"
        :style="{
          width: `${largura}px`,
          gridTemplateColumns: `repeat(auto-fit, minmax(min(${minRem}rem, 100%), 1fr))`,
          gap: `${gapRem}rem`,
        }"
      >
        <div v-for="n in TOTAL_CARDS" :key="n" class="grid-lab__card">
          {{ n }}
          <!-- Linha tracejada: o tamanho mínimo que o card pode ter -->
          <span class="grid-lab__minimo" :style="{ width: `min(${minRem}rem, 100%)` }"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-lab__ajustes {
  display: grid;
  gap: var(--esp-3);
}

.grid-lab__conta {
  font-size: var(--tam-p);
}

.grid-lab__area {
  width: 100%;
}

.grid-lab__grade {
  display: grid;
  padding: var(--esp-2) 0;
  outline: 0.125rem dashed var(--cor-destaque);
}

.grid-lab__aviso {
  padding: var(--esp-2) var(--esp-3);
  border-left: 0.25rem solid var(--cor-destaque);
  background: var(--cor-fundo);
  font-size: var(--tam-p);
}

.grid-lab__card {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 4rem;
  border-radius: var(--raio);
  background: var(--cor-fundo);
  font-weight: 700;
}

.grid-lab__minimo {
  position: absolute;
  left: 0;
  bottom: var(--esp-1);
  border-top: 0.1875rem dashed var(--cor-destaque);
}

@media (min-width: 48rem) {
  .grid-lab__ajustes {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
