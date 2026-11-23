<script setup>
import { computed } from 'vue'

const props = defineProps({
  codigo: { type: String, required: true },
  linguagem: { type: String, default: 'css' },
})

const codigoLimpo = computed(() => props.codigo.trim())
</script>

<template>
  <figure class="codigo">
    <figcaption class="codigo__linguagem">{{ linguagem }}</figcaption>
    <pre><code>{{ codigoLimpo }}</code></pre>
  </figure>
</template>

<style scoped>
.codigo {
  margin: 0 0 var(--esp-3);
  border-radius: var(--raio);
  background: var(--cor-codigo-fundo);
  color: var(--cor-codigo-texto);
  overflow: hidden;
}

.codigo__linguagem {
  padding: var(--esp-1) var(--esp-3);
  font-family: var(--fonte-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.7;
}

/* pre-wrap quebra linhas longas: o código nunca vaza para fora da tela. */
pre {
  margin: 0;
  padding: 0 var(--esp-3) var(--esp-3);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font-size: var(--tam-p);
  line-height: 1.5;
}
</style>
