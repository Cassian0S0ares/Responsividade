<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

const UNIDADES = {
  rem: 'tamanho da fonte da raiz (<html>)',
  em: 'tamanho da fonte do elemento pai (aqui, a caixa tracejada tem 1.25rem)',
  '%': 'largura do elemento pai (a caixa tracejada)',
  vw: '1% da largura da janela',
  vh: '1% da altura da janela',
  dvh: '1% da altura visível agora (no celular, muda quando a barra do navegador some)',
  ch: 'largura do caractere "0" na fonte atual',
  px: 'unidade absoluta: não depende de nada',
}

const valor = ref(1.5)
const unidade = ref('rem')
const resultado = ref(0)
const larguraPai = ref(0)
const fontePai = ref(0)
const pai = ref(null)
const sonda = ref(null)

// Truque: aplicamos o valor como largura de um elemento invisível
// e perguntamos ao navegador quantos px ele ficou.
async function medir() {
  await nextTick()
  if (!sonda.value) return
  resultado.value = sonda.value.getBoundingClientRect().width
  larguraPai.value = pai.value.clientWidth
  fontePai.value = parseFloat(getComputedStyle(pai.value).fontSize)
}

watch([valor, unidade], medir)
onMounted(() => {
  medir()
  window.addEventListener('resize', medir)
})
onBeforeUnmount(() => window.removeEventListener('resize', medir))
</script>

<template>
  <div class="lab">
    <div class="conversor__entradas">
      <label class="lab__controle">
        Valor
        <input v-model.number="valor" type="number" step="0.25" min="0" />
      </label>
      <label class="lab__controle">
        Unidade
        <select v-model="unidade">
          <option v-for="(descricao, nome) in UNIDADES" :key="nome" :value="nome">{{ nome }}</option>
        </select>
      </label>
    </div>

    <div ref="pai" class="conversor__pai">
      <div
        ref="sonda"
        class="conversor__sonda"
        :style="{ width: `${valor}${unidade}` }"
        aria-hidden="true"
      >0</div>
      <p class="conversor__resultado">
        <code>{{ valor }}{{ unidade }}</code> = <strong>{{ resultado.toFixed(1) }}px</strong>
      </p>
      <p class="conversor__explica">{{ unidade }} é relativo a: {{ UNIDADES[unidade] }}.</p>
      <p class="conversor__explica">
        Caixa-pai: {{ larguraPai }}px de largura, fonte de {{ fontePai }}px.
      </p>
    </div>
  </div>
</template>

<style scoped>
.conversor__entradas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--esp-3);
}

.conversor__entradas input,
.conversor__entradas select {
  width: 100%;
  padding: var(--esp-2);
}

/* O pai tem fonte maior que a raiz, para "em" dar diferente de "rem". */
.conversor__pai {
  position: relative;
  overflow: hidden;
  padding: var(--esp-3);
  border: 0.125rem dashed var(--cor-destaque);
  border-radius: var(--raio);
  font-size: 1.25rem;
}

.conversor__sonda {
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  visibility: hidden;
}

.conversor__resultado {
  margin-bottom: var(--esp-2);
}

.conversor__explica {
  margin-bottom: var(--esp-1);
  font-size: var(--tam-p);
}
</style>
