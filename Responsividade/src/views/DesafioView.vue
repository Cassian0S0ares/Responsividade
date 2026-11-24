<script setup>
import { computed, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import AeroIcon from '@/components/layout/AeroIcon.vue'
import { secoes } from '@/data/secoes'

// Perguntas que só se respondem usando os laboratórios do próprio guia.
// Uma pergunta por seção (1 a 5).
const desafios = reactive([
  {
    id: 'viewport',
    secao: 'Seção 1: Por que responsividade importa',
    pergunta:
      'No laboratório Celular sem óculos, com a meta viewport DESLIGADA, com quantos px de largura o navegador desenha a página?',
    dica: 'Deixe a chave desligada e leia a primeira frase abaixo dela.',
    rota: '/por-que-importa#laboratorio',
    laboratorio: 'Celular sem óculos',
    resposta: 980,
    unidade: 'px',
    tentativa: null,
    resultado: null,
  },
  {
    id: 'lupa',
    secao: 'Seção 2: Unidades CSS',
    pergunta:
      'Na Lupa de acessibilidade, com a fonte do navegador em 150%, quantos px vale um título de 1.5rem?',
    dica: 'Veja quanto vale 1rem nessa escala e multiplique.',
    rota: '/unidades#laboratorio',
    laboratorio: 'Lupa de acessibilidade',
    resposta: 36,
    unidade: 'px',
    tentativa: null,
    resultado: null,
  },
  {
    id: 'grid',
    secao: 'Seção 3: Flexbox e Grid',
    pergunta:
      'Na Calculadora de colunas, com mínimo de 14rem e gap de 1rem, qual é a menor largura do contêiner (em px) para aparecerem 3 colunas?',
    dica: 'Use a mesma conta da pergunta-guia 3, agora com 3 colunas e 2 gaps.',
    rota: '/flexbox-e-grid#laboratorio',
    laboratorio: 'Calculadora de colunas',
    resposta: 704,
    unidade: 'px',
    tentativa: null,
    resultado: null,
  },
  {
    id: 'cls',
    secao: 'Seção 4: Imagens responsivas',
    pergunta:
      'No Medidor de pulo, com width e height LIGADOS na imagem, quantos px o texto pula quando a foto termina de carregar?',
    dica: 'Marque a chave do width e height, clique em "Carregar notícia" e espere 2 segundos.',
    rota: '/imagens#laboratorio',
    laboratorio: 'Medidor de pulo (CLS)',
    resposta: 0,
    unidade: 'px',
    tentativa: null,
    resultado: null,
  },
  {
    id: 'key',
    secao: 'Seção 5: Boas práticas em Vue',
    pergunta:
      'No laboratório :key ou caos?, na lista SEM :key, escreva algo no 2º animal e remova o primeiro. O texto aparece ao lado do animal que antes estava em qual posição da lista?',
    dica: 'Antes de remover, repare em quem é o 3º animal da lista.',
    rota: '/boas-praticas#laboratorio',
    laboratorio: ':key ou caos?',
    resposta: 3,
    unidade: 'posição',
    tentativa: null,
    resultado: null,
  },
])

const acertos = computed(() => desafios.filter((desafio) => desafio.resultado === 'certo').length)

function conferir(desafio) {
  desafio.resultado = Number(desafio.tentativa) === desafio.resposta ? 'certo' : 'errado'
}

// Editar a resposta apaga o veredito anterior: senão o placar continuaria
// contando um acerto que não corresponde mais ao que está no campo.
function aoEditar(desafio) {
  desafio.resultado = null
}
</script>

<template>
  <section class="desafios">
    <header class="desafios__cabecalho">
      <AeroIcon tipo="trofeu" />
      <div><p class="desafio__numero">Explore o guia · Seção {{ secoes.length }} de {{ secoes.length }}</p><h1>Suas descobertas, na prática.</h1></div>
    </header>
    <p>
      Só dá para responder usando os laboratórios deste guia. Abra o laboratório indicado, teste,
      e volte com a resposta.
    </p>

    <div class="desafios__progresso">
      <label for="progresso-desafio">{{ acertos }} de {{ desafios.length }} descobertas conferidas</label>
      <progress id="progresso-desafio" :value="acertos" :max="desafios.length"></progress>
      <p v-if="acertos === desafios.length" role="status">Você completou o percurso. Agora leve essas ideias para a sua próxima página!</p>
    </div>

    <form
      v-for="(desafio, indice) in desafios"
      :key="desafio.id"
      class="desafio"
      @submit.prevent="conferir(desafio)"
    >
      <p class="desafio__secao">{{ desafio.secao }}</p>
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
            @input="aoEditar(desafio)"
          />
          <button type="submit" class="botao">Conferir</button>
        </div>
      </div>

      <p v-if="desafio.resultado === 'certo'" role="status" class="desafio__feedback desafio__feedback--certo">
        Aprovado! Resposta certa.
      </p>
      <p v-else-if="desafio.resultado === 'errado'" role="status" class="desafio__feedback desafio__feedback--errado">
        Ainda não. Dica: {{ desafio.dica }}
      </p>
    </form>
  </section>
</template>

<style scoped>
.desafios__cabecalho { display: flex; flex-wrap: wrap; gap: var(--esp-3); align-items: center; margin-bottom: var(--esp-4); }
.desafios__cabecalho > div { flex: 1 1 12rem; min-width: 0; }
.desafios__cabecalho .aero-icon { width: 4.5rem; height: 4.5rem; }
.desafios__cabecalho h1 { margin: 0; }
.desafios__progresso { display: grid; gap: var(--esp-060); padding: var(--esp-3) var(--esp-125); border: 1px solid var(--verde-76-v2); border-radius: 4px; background: linear-gradient(var(--verde-97), var(--verde-92)); font-size: .875rem; color: var(--verde-30-v4); }
.desafios__progresso progress { width: 100%; height: .9rem; accent-color: var(--verde-40-v2); }
.desafios__progresso p { margin: 0; }
.desafio__numero {
  margin-bottom: var(--esp-1);
  color: var(--cor-destaque);
  font-weight: 700;
  font-size: var(--tam-p);
}

.desafio {
  margin-top: var(--esp-4);
  padding: var(--esp-3);
  border-radius: var(--raio);
  background: linear-gradient(120deg, var(--cinza-98), var(--branco));
  border: 1px solid var(--azul-82-v3);
  box-shadow: inset 0 1px var(--branco), 0 2px 4px var(--azul-31-a4);
}

.desafio__secao {
  margin-bottom: var(--esp-1);
  color: var(--azul-45);
  font-size: var(--tam-p);
  font-weight: 700;
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
