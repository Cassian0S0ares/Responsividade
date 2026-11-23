<script setup>
import { RouterLink } from 'vue-router'
import { secoes } from '@/data/secoes'
</script>

<template>
  <section>
    <h1>Guia Responsivo</h1>
    <p>
      Um guia prático para criar páginas que funcionam em qualquer tela: do celular pequeno ao
      monitor gigante. Cada seção tem uma explicação curta, código comentado, um laboratório para
      mexer e a resposta de uma pergunta-guia.
    </p>
    <p>
      Repare no indicador no canto inferior direito: ele mostra a largura da janela e o
      breakpoint ativo. Redimensione a janela e veja ele mudar.
    </p>

    <ol class="lista-secoes">
      <li v-for="secao in secoes" :key="secao.rota">
        <RouterLink :to="secao.rota">{{ secao.titulo }}</RouterLink>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.lista-secoes {
  display: grid;
  gap: var(--esp-2);
  padding-left: var(--esp-4);
  font-size: var(--tam-g);
}
</style>
