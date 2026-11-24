<script setup>
import SecaoGuia from '@/components/guia/SecaoGuia.vue'
import BlocoCodigo from '@/components/guia/BlocoCodigo.vue'
import LabGrid from '@/components/labs/LabGrid.vue'
import LabFlex from '@/components/labs/LabFlex.vue'

const codigoFlex = `
/* Flexbox: uma dimensão (uma linha OU uma coluna) */
.menu {
  display: flex;
  justify-content: space-between; /* distribui no eixo principal (horizontal) */
  align-items: center;            /* alinha no eixo cruzado (vertical) */
  flex-wrap: wrap;                /* se não couber, quebra para a linha de baixo */
  gap: 1rem;                      /* espaço entre os itens (sem margin!) */
}
`

const codigoGrid = `
/* Grid: duas dimensões (linhas E colunas ao mesmo tempo) */
.cards {
  display: grid;
  /* "Crie quantas colunas couberem, cada uma com no mínimo 14rem;
      o espaço que sobrar é dividido igualmente (1fr)."
      Responsivo SEM nenhuma media query! */
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}

/* Dica: min(14rem, 100%) evita que o card vaze em telas
   menores que 14rem (224px). */
.cards-seguros {
  grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr));
}
`

const fontes = [
  { titulo: 'MDN: Conceitos básicos do Flexbox', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts' },
  { titulo: 'MDN: Conceitos básicos do Grid Layout', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/Guides/Grid_layout/Basic_concepts' },
  { titulo: 'MDN: repeat() (em inglês)', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/repeat' },
  { titulo: 'CSS-Tricks: A Complete Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
  { titulo: 'CSS-Tricks: A Complete Guide to CSS Grid', url: 'https://css-tricks.com/complete-guide-css-grid-layout/' },
  { titulo: 'web.dev: Learn CSS – Grid', url: 'https://web.dev/learn/css/grid' },
]
</script>

<template>
  <SecaoGuia
    pergunta="Um contêiner usa grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)) e gap: 1rem. A partir de qual largura do contêiner, em px, os cards deixam de ficar em 1 coluna e passam para 2? Considerem 1rem = 16px e mostrem a conta."
    :fontes="fontes"
  >
    <p>
      <strong>Flexbox</strong> organiza itens em <strong>uma dimensão</strong>: uma fila
      (horizontal) ou uma pilha (vertical). É ideal para menus, barras de botões e para centralizar
      coisas.
    </p>
    <p>
      <strong>Grid</strong> organiza em <strong>duas dimensões</strong>: linhas e colunas ao mesmo
      tempo, como uma tabela. É ideal para o layout da página e para galerias de cards.
    </p>
    <ul>
      <li><code>justify-content</code>: distribui os itens no eixo principal.</li>
      <li><code>align-items</code>: alinha os itens no eixo cruzado.</li>
      <li><code>flex-wrap: wrap</code>: deixa os itens quebrarem para a próxima linha.</li>
      <li><code>gap</code>: espaço entre os itens (funciona no Flex e no Grid).</li>
      <li>
        <code>repeat(auto-fit, minmax(14rem, 1fr))</code>: o Grid decide sozinho quantas colunas
        cabem.
      </li>
    </ul>
    <p>
      <strong>Quando usar cada um?</strong> Se você pensa em "uma fila de coisas", use Flexbox. Se
      pensa em "linhas e colunas alinhadas", use Grid. Os dois convivem: um Grid de cards em que
      cada card usa Flexbox por dentro.
    </p>

    <template #codigo>
      <BlocoCodigo linguagem="css" :codigo="codigoFlex" />
      <BlocoCodigo linguagem="css" :codigo="codigoGrid" />
    </template>

    <template #laboratorio>
      <h3>Calculadora de colunas (Grid)</h3>
      <p>
        Arraste a largura do contêiner e veja o exato momento em que uma nova coluna aparece. Mude
        o mínimo e o gap para ver a conta mudar.
      </p>
      <LabGrid />

      <h3 class="titulo-lab">Playground de Flexbox</h3>
      <p>Troque as propriedades e veja os itens se moverem. O CSS gerado aparece embaixo.</p>
      <LabFlex />
    </template>

    <template #resposta>
      <p>
        Para caber <strong>2 colunas</strong>, o contêiner precisa ter espaço para duas colunas
        com o tamanho mínimo e mais um gap entre elas:
      </p>
      <BlocoCodigo
        linguagem="conta"
        codigo="mínimo = 14rem × 16px = 224px
gap    =  1rem × 16px =  16px

2 colunas = 224 + 16 + 224 = 464px"
      />
      <p>
        Com <strong>menos de 464px</strong> só cabe 1 coluna (a segunda ficaria menor que 224px).
        A partir de <strong>464px</strong> o Grid cria 2 colunas, e o <code>1fr</code> divide
        igualmente o espaço que sobrar. Teste no laboratório acima: com mínimo 14rem e gap 1rem,
        arraste até 464px.
      </p>
    </template>
  </SecaoGuia>
</template>

<style scoped>
.titulo-lab {
  margin-top: var(--esp-5);
}
</style>
