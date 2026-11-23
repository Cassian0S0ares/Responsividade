<script setup>
// Molde de toda seção do guia: explicação, código, laboratório,
// pergunta-guia respondida e fontes no final.
defineProps({
  numero: { type: Number, required: true },
  titulo: { type: String, required: true },
  pergunta: { type: String, required: true },
  fontes: { type: Array, required: true }, // [{ titulo, url }]
})
</script>

<template>
  <article class="secao">
    <header>
      <p class="secao__numero">Seção {{ numero }}</p>
      <h1>{{ titulo }}</h1>
    </header>

    <section class="secao__bloco">
      <h2>Explicação</h2>
      <slot />
    </section>

    <section class="secao__bloco">
      <h2>Exemplo de código</h2>
      <slot name="codigo" />
    </section>

    <section v-if="$slots.laboratorio" class="secao__bloco">
      <h2>Laboratório</h2>
      <slot name="laboratorio" />
    </section>

    <section class="secao__bloco secao__pergunta">
      <h2>Pergunta-guia</h2>
      <p class="secao__enunciado">{{ pergunta }}</p>
      <h3>Resposta</h3>
      <slot name="resposta" />
    </section>

    <section class="secao__bloco secao__fontes">
      <h2>Fontes consultadas</h2>
      <ul>
        <li v-for="fonte in fontes" :key="fonte.url">
          <a :href="fonte.url" target="_blank" rel="noopener">{{ fonte.titulo }}</a>
        </li>
      </ul>
    </section>
  </article>
</template>

<style scoped>
.secao__numero {
  margin-bottom: var(--esp-1);
  color: var(--cor-destaque);
  font-weight: 700;
  text-transform: uppercase;
  font-size: var(--tam-p);
}

.secao__bloco {
  margin-top: var(--esp-5);
}

.secao__pergunta {
  padding: var(--esp-3);
  border-left: 0.25rem solid var(--cor-destaque);
  background: var(--cor-superficie);
}

.secao__enunciado {
  font-style: italic;
}

.secao__fontes ul {
  padding-left: var(--esp-4);
}

@media (min-width: 48rem) {
  .secao__pergunta {
    padding: var(--esp-4);
  }
}
</style>
