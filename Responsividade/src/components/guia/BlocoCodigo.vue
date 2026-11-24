<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
const props = defineProps({ codigo: { type: String, required: true }, linguagem: { type: String, default: 'css' } })
const codigoLimpo = computed(() => props.codigo.trim())
// O estado guarda a situação, não o texto: assim mudar a redação do botão
// não altera o que o leitor de tela anuncia.
const ROTULOS = { ocioso: 'Copiar', ok: 'Copiado!', falha: 'Selecione para copiar' }
const estado = ref('ocioso')
const copia = computed(() => ROTULOS[estado.value])
let timeout
async function copiar() {
  try {
    await navigator.clipboard.writeText(codigoLimpo.value)
    estado.value = 'ok'
  } catch {
    estado.value = 'falha'
  }
  clearTimeout(timeout)
  timeout = setTimeout(() => { estado.value = 'ocioso' }, 2500)
}
onBeforeUnmount(() => clearTimeout(timeout))
</script>

<template>
  <figure class="codigo">
    <figcaption class="codigo__barra">
      <span><span class="codigo__icone" aria-hidden="true">&lt;/&gt;</span> {{ linguagem }}</span>
      <button type="button" @click="copiar" aria-live="polite" :aria-label="estado === 'ocioso' ? 'Copiar código ' + linguagem : copia">{{ copia }}</button>
    </figcaption>
    <pre tabindex="0" :aria-label="'Exemplo de código ' + linguagem"><code>{{ codigoLimpo }}</code></pre>
  </figure>
</template>

<style scoped>
.codigo { margin: 0 0 1rem; border: 1px solid #aec8d7; border-radius: 5px; background: var(--cor-codigo-fundo); color: var(--cor-codigo-texto); overflow: hidden; box-shadow: 0 2px 4px #2655700c; }
.codigo__barra { display: flex; align-items: center; justify-content: space-between; gap: .5rem; min-height: 2.5rem; padding: .3rem .8rem; border-bottom: 1px solid #b9d0de; background: linear-gradient(#f8fcff, #ddebf3); font-size: .8125rem; color: #476b7c; }
.codigo__icone { margin-right: .3rem; font-family: var(--fonte-mono); color: #12709b; font-weight: 700; }
.codigo__barra button { min-height: 2rem; padding: .15rem .6rem; border: 1px solid #9fbccc; border-radius: 3px; background: linear-gradient(#fff, #e9f2f7); box-shadow: inset 0 1px #fff; color: #335e75; font-size: .8125rem; }
.codigo__barra button:hover { background: #fff; }
pre { margin: 0; padding: 1.1rem 1.25rem; white-space: pre-wrap; overflow-wrap: anywhere; font-size: .875rem; line-height: 1.75; tab-size: 2; background: linear-gradient(90deg, #e9f2f6 0 3px, transparent 3px); }
pre:focus-visible { outline-offset: -3px; }
</style>
