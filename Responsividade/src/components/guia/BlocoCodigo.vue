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
.codigo { margin: 0 0 var(--esp-3); border: 1px solid var(--azul-76-v2); border-radius: 5px; background: var(--cor-codigo-fundo); color: var(--cor-codigo-texto); overflow: hidden; box-shadow: 0 2px 4px var(--azul-29-a5-v2); }
.codigo__barra { display: flex; align-items: center; justify-content: space-between; gap: var(--esp-2); min-height: 2.5rem; padding: var(--esp-030) var(--esp-080); border-bottom: 1px solid var(--azul-80); background: linear-gradient(var(--cinza-99), var(--azul-91-v2)); font-size: .8125rem; color: var(--azul-38-v4); }
.codigo__icone { margin-right: var(--esp-030); font-family: var(--fonte-mono); color: var(--azul-34); font-weight: 700; }
.codigo__barra button { min-height: 2rem; padding: var(--esp-015) var(--esp-060); border: 1px solid var(--azul-71-v4); border-radius: 3px; background: linear-gradient(var(--branco), var(--azul-94-v8)); box-shadow: inset 0 1px var(--branco); color: var(--azul-33-v2); font-size: .8125rem; }
.codigo__barra button:hover { background: var(--branco); }
pre { margin: 0; padding: var(--esp-110) var(--esp-125); white-space: pre-wrap; overflow-wrap: anywhere; font-size: .875rem; line-height: 1.75; tab-size: 2; background: linear-gradient(90deg, var(--azul-94-v7) 0 3px, transparent 3px); }
pre:focus-visible { outline-offset: -3px; }
</style>
