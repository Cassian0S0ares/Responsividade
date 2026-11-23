<script setup>
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'

// Perguntas que só se respondem usando os laboratórios do próprio guia.
const desafios = reactive([
  {
    id: 'grid',
    pergunta:
      'Na Calculadora de colunas, com mínimo de 14rem e gap de 1rem, qual é a menor largura do contêiner (em px) para aparecerem 3 colunas?',
    dica: 'Use a mesma conta da pergunta-guia 3, agora com 3 colunas e 2 gaps.',
    rota: '/flexbox-e-grid',
    laboratorio: 'Calculadora de colunas',
    resposta: 704,
    unidade: 'px',
    tentativa: null,
    resultado: null,
  },
  {
    id: 'lupa',
    pergunta:
      'Na Lupa de acessibilidade, com a fonte do navegador em 150%, quantos px vale um título de 1.5rem?',
    dica: 'Veja quanto vale 1rem nessa escala e multiplique.',
    rota: '/unidades',
    laboratorio: 'Lupa de acessibilidade',
    resposta: 36,
    unidade: 'px',
    tentativa: null,
    resultado: null,
  },
])

function conferir(desafio) {
  desafio.resultado = Number(desafio.tentativa) === desafio.resposta ? 'certo' : 'errado'
}
</script>

<template>
  <section>
    <p class="desafio__numero">Seção 6</p>
    <h1>Desafio</h1>
    <p>
      Só dá para responder usando os laboratórios deste guia. Abra o laboratório indicado, teste,
      e volte com a resposta.
    </p>

    <form
      v-for="(desafio, indice) in desafios"
      :key="desafio.id"
      class="desafio"
      @submit.prevent="conferir(desafio)"
    >
      <h2>Pergunta {{ indice + 1 }}</h2>
      <p>{{ desafio.pergunta }}</p>
      <p class="desafio__lab">
        Laboratório: <RouterLink :to="desafio.rota">{{ desafio.laboratorio }}</RouterLink>
      </p>

      <div class="desafio__campo">
        <label :for="`resposta-${desafio.id}`">Sua resposta ({{ desafio.unidade }})</label>
        <div class="desafio__linha">
          <input
            :id="`resposta-${desafio.id}`"
            v-model="desafio.tentativa"
            type="number"
            inputmode="numeric"
            required
          />
          <button type="submit" class="botao">Conferir</button>
        </div>
      </div>

      <p v-if="desafio.resultado === 'certo'" class="desafio__feedback desafio__feedback--certo">
        Aprovado! Resposta certa.
      </p>
      <p v-else-if="desafio.resultado === 'errado'" class="desafio__feedback desafio__feedback--errado">
        Ainda não. Dica: {{ desafio.dica }}
      </p>
    </form>
  </section>
</template>

<style scoped>
.desafio__numero {
  margin-bottom: var(--esp-1);
  color: var(--cor-destaque);
  font-weight: 700;
  text-transform: uppercase;
  font-size: var(--tam-p);
}

.desafio {
  margin-top: var(--esp-4);
  padding: var(--esp-3);
  border-radius: var(--raio);
  background: var(--cor-superficie);
}

.desafio__lab {
  font-size: var(--tam-p);
}

.desafio__campo {
  display: grid;
  gap: var(--esp-1);
}

.desafio__linha {
  display: flex;
  flex-wrap: wrap;
  gap: var(--esp-2);
}

.desafio__linha input {
  flex: 1;
  min-width: 0;
  padding: var(--esp-2);
}

.desafio__feedback {
  margin: var(--esp-3) 0 0;
  padding: var(--esp-2) var(--esp-3);
  border-left: 0.25rem solid;
  font-weight: 700;
}

.desafio__feedback--certo {
  border-color: var(--cor-ok);
  color: var(--cor-ok);
}

.desafio__feedback--errado {
  border-color: var(--cor-erro);
  color: var(--cor-erro);
}

@media (min-width: 48rem) {
  .desafio {
    padding: var(--esp-4);
  }
}
</style>
