<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

// Simula a configuração "tamanho da fonte" do navegador.
// Usamos % (e não px) na raiz para respeitar o valor que a pessoa já escolheu.
const escala = ref(100)
const pxPorRem = ref(16)
const tamanhoPx = ref(16)
const tamanhoRem = ref(16)
const textoPx = ref(null)
const textoRem = ref(null)

async function aplicarEscala() {
  document.documentElement.style.fontSize = `${escala.value}%`
  await nextTick()
  // Lê o tamanho que o navegador calculou de verdade para cada texto.
  pxPorRem.value = parseFloat(getComputedStyle(document.documentElement).fontSize)
  tamanhoPx.value = parseFloat(getComputedStyle(textoPx.value).fontSize)
  tamanhoRem.value = parseFloat(getComputedStyle(textoRem.value).fontSize)
}

watch(escala, aplicarEscala)
onMounted(aplicarEscala)

// Ao sair da página, devolve a fonte padrão para o site.
onBeforeUnmount(() => {
  document.documentElement.style.fontSize = ''
})
</script>

<template>
  <div class="lab">
    <div class="lab__controle">
      <label for="lupa-escala">
        Tamanho da fonte do navegador: <strong>{{ escala }}%</strong>
      </label>
      <input id="lupa-escala" v-model.number="escala" type="range" min="75" max="200" step="25" />
    </div>

    <div class="lupa__atalhos">
      <button type="button" class="botao botao--secundario" @click="escala = 100">Padrão (100%)</button>
      <button type="button" class="botao botao--secundario" @click="escala = 150">Grande (150%)</button>
      <button type="button" class="botao botao--secundario" @click="escala = 200">Enorme (200%)</button>
    </div>

    <p class="lab__info">
      Agora <strong>1rem = {{ pxPorRem }}px</strong>. Repare que o site inteiro (feito em rem)
      cresceu junto, menos o bloco em px.
    </p>

    <div class="lupa__comparacao">
      <div class="lupa__caixa">
        <p class="lupa__rotulo">font-size: 16px</p>
        <!-- px de propósito, para mostrar o problema -->
        <p ref="textoPx" class="lupa__texto-px">Eu fico sempre do mesmo tamanho.</p>
        <p class="lupa__medida">Calculado: {{ tamanhoPx }}px</p>
      </div>
      <div class="lupa__caixa lupa__caixa--ok">
        <p class="lupa__rotulo">font-size: 1rem</p>
        <p ref="textoRem" class="lupa__texto-rem">Eu respeito a escolha da pessoa.</p>
        <p class="lupa__medida">Calculado: {{ tamanhoRem }}px</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lupa__atalhos {
  display: flex;
  flex-wrap: wrap;
  gap: var(--esp-2);
}

.lupa__comparacao {
  display: grid;
  gap: var(--esp-3);
}

.lupa__caixa {
  padding: var(--esp-3);
  border: 0.125rem solid var(--cor-erro);
  border-radius: var(--raio);
}

.lupa__caixa--ok {
  border-color: var(--cor-ok);
}

.lupa__rotulo {
  margin-bottom: var(--esp-2);
  font-family: var(--fonte-mono);
  font-size: var(--tam-p);
}

/* Únicos tamanhos em px do projeto: estão aqui só para a comparação. */
.lupa__texto-px {
  font-size: 16px;
}

.lupa__texto-rem {
  font-size: 1rem;
}

.lupa__medida {
  margin: 0;
  font-size: var(--tam-p);
  color: var(--cor-texto-suave);
}

@media (min-width: 40rem) {
  .lupa__comparacao {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
