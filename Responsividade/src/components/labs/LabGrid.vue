<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

const TOTAL_CARDS = 8

const minRem = ref(14)
const gapRem = ref(1)
const largura = ref(320)
const disponivel = ref(320)
const pxPorRem = ref(16)
const colunasReais = ref(1)
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

// Confere com o navegador: conta as colunas que o CSS realmente criou.
watch(
  [largura, minRem, gapRem],
  async () => {
    await nextTick()
    if (!grade.value) return
    const trilhas = getComputedStyle(grade.value).gridTemplateColumns.split(' ')
    colunasReais.value = trilhas.filter((t) => parseFloat(t) > 0).length
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
        <div v-for="n in TOTAL_CARDS" :key="n" class="grid-lab__card">{{ n }}</div>
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

.grid-lab__card {
  display: grid;
  place-items: center;
  min-height: 4rem;
  border-radius: var(--raio);
  background: var(--cor-fundo);
  font-weight: 700;
}

@media (min-width: 48rem) {
  .grid-lab__ajustes {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
