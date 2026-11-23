<script setup>
import SecaoGuia from '@/components/guia/SecaoGuia.vue'
import BlocoCodigo from '@/components/guia/BlocoCodigo.vue'
import LabKey from '@/components/labs/LabKey.vue'

const codigoPastas = `
src/
├── assets/        -> CSS global e design tokens (main.css)
├── components/    -> peças reutilizáveis
│   ├── guia/      -> SecaoGuia.vue, BlocoCodigo.vue
│   ├── labs/      -> LabGrid.vue, LabCls.vue, AnimalItem.vue...
│   └── layout/    -> AppCabecalho.vue, IndicadorBreakpoint.vue
├── data/          -> dados fixos (secoes.js)
├── router/        -> rotas (index.js)
├── stores/        -> estado compartilhado com Pinia (tela.js, animais.js)
└── views/         -> uma página por rota (UnidadesView.vue...)
`

const codigoComponente = `
<!-- AnimalItem.vue: nome em PascalCase e com duas palavras -->
<script setup>
// Props tipadas: o Vue avisa no console se vier o tipo errado
defineProps({
  nome: { type: String, required: true },
})

// Eventos declarados: o componente "avisa" o pai, não altera a lista sozinho
const emit = defineEmits(['remover'])
<\/script>

<template>
  <li>
    {{ nome }}
    <button @click="emit('remover')">×</button>
  </li>
</template>
`

const codigoLista = `
<!-- :key com um valor ÚNICO e ESTÁVEL de cada item (id). -->
<!-- Evite usar o índice como key: ele muda quando a lista muda. -->
<AnimalItem
  v-for="animal in animais"
  :key="animal.id"
  :nome="animal.nome"
  @remover="remover(animal.id)"
/>
`

const codigoTokens = `
/* Design tokens: decisões de design guardadas em variáveis CSS */
:root {
  --cor-destaque: #c2410c;
  --esp-3: 1rem;
  --raio: 0.5rem;
}

/* Os componentes usam os tokens, nunca o valor solto.
   Mudar o tema = mudar só o :root. */
.botao {
  background: var(--cor-destaque);
  padding: var(--esp-3);
  border-radius: var(--raio);
}
`

const codigoRotas = `
// router/index.js: carregamento sob demanda (lazy loading)
// A página só é baixada quando a pessoa entra na rota.
{
  path: '/unidades',
  component: () => import('@/views/UnidadesView.vue'),
}
// O Vite gera um arquivo separado para cada página: o primeiro
// carregamento fica menor e o LCP melhora.
`

const fontes = [
  { titulo: 'Vue.js: Guia de estilo (Style Guide)', url: 'https://vuejs.org/style-guide/' },
  { titulo: 'Vue.js: Renderização de listas e key', url: 'https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key' },
  { titulo: 'Vue.js: Props', url: 'https://vuejs.org/guide/components/props.html' },
  { titulo: 'Vue.js: Eventos de componentes', url: 'https://vuejs.org/guide/components/events.html' },
  { titulo: 'Vue Router: Lazy loading de rotas', url: 'https://router.vuejs.org/guide/advanced/lazy-loading.html' },
  { titulo: 'Pinia: Documentação', url: 'https://pinia.vuejs.org/' },
  { titulo: 'web.dev: Web Vitals', url: 'https://web.dev/articles/vitals' },
  { titulo: 'MDN: Propriedades personalizadas (variáveis CSS)', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/Using_CSS_custom_properties' },
]
</script>

<template>
  <SecaoGuia
    :numero="5"
    titulo="Boas práticas em projetos Vue"
    pergunta="Uma lista de animais é exibida com v-for, sem :key, e cada item tem um campo de texto. A pessoa digita algo no campo do segundo animal, e em seguida o primeiro animal é removido da lista. O que pode acontecer com o texto digitado, e por quê?"
    :fontes="fontes"
  >
    <p>
      Um projeto organizado é mais fácil de entender, de dividir em dupla e de consertar. Estas
      são as práticas que usamos neste próprio guia:
    </p>
    <ul>
      <li>
        <strong>Estrutura de pastas</strong>: cada tipo de arquivo no seu lugar
        (<code>views</code> para páginas, <code>components</code> para peças,
        <code>stores</code> para o estado compartilhado).
      </li>
      <li>
        <strong>Nomes de componentes</strong> em PascalCase e com mais de uma palavra
        (<code>AnimalItem</code>, não <code>Item</code>), para não confundir com tags do HTML.
      </li>
      <li>
        <strong>Props tipadas e eventos declarados</strong>: o pai manda dados por props, o filho
        avisa o pai por eventos (<code>emit</code>). O filho nunca altera a prop direto.
      </li>
      <li><strong><code>:key</code> no <code>v-for</code></strong>, sempre com um id único.</li>
      <li>
        <strong>Variáveis CSS como design tokens</strong>: cores e espaçamentos definidos uma
        vez no <code>:root</code>.
      </li>
      <li>
        <strong>Core Web Vitals</strong>, as métricas do Google para a experiência real:
        <ul>
          <li><strong>LCP</strong> (Largest Contentful Paint): quanto demora para o maior conteúdo aparecer. Bom: até 2,5s.</li>
          <li><strong>INP</strong> (Interaction to Next Paint): quanto a página demora para responder a um clique ou toque. Bom: até 200ms.</li>
          <li><strong>CLS</strong> (Cumulative Layout Shift): quanto o layout "pula". Bom: até 0,1.</li>
        </ul>
      </li>
      <li>
        <strong>Rotas sob demanda</strong>: cada página só é baixada quando alguém entra nela.
      </li>
    </ul>

    <template #codigo>
      <BlocoCodigo linguagem="estrutura de pastas" :codigo="codigoPastas" />
      <BlocoCodigo linguagem="vue" :codigo="codigoComponente" />
      <BlocoCodigo linguagem="vue" :codigo="codigoLista" />
      <BlocoCodigo linguagem="css" :codigo="codigoTokens" />
      <BlocoCodigo linguagem="js" :codigo="codigoRotas" />
    </template>

    <template #laboratorio>
      <h3>:key ou caos?</h3>
      <p>
        As duas listas abaixo são iguais (os animais vêm de uma API e ficam guardados no Pinia). A
        única diferença é o <code>:key</code>.
      </p>
      <LabKey />
    </template>

    <template #resposta>
      <p>
        <strong>O texto pode aparecer no animal errado.</strong> Ele "pula" para o animal que
        estava em terceiro e agora ocupa a segunda posição.
      </p>
      <p>
        Sem <code>:key</code>, o Vue não sabe qual elemento da tela pertence a qual animal. Ele usa
        a estratégia de <strong>reaproveitar pela posição</strong>: quando o primeiro animal sai, a
        lista fica uma posição menor. Em vez de apagar o primeiro elemento, o Vue troca os
        <em>nomes</em> exibidos em cada posição e apaga o <strong>último</strong> elemento.
      </p>
      <p>
        O texto digitado não faz parte dos dados da lista: ele mora no campo (estado do DOM ou do
        componente) da <strong>segunda posição</strong>. Esse campo continua lá, mas agora com o
        nome do animal que era o terceiro. Resultado: o texto parece ter mudado de dono.
      </p>
      <p>
        Com <code>:key="animal.id"</code>, o Vue sabe exatamente qual elemento é de qual animal.
        Ele remove o elemento do primeiro animal e mantém o campo do segundo intacto, com o texto
        no lugar certo. Use um id estável: usar o índice como key causa o mesmo problema, porque o
        índice muda quando a lista muda.
      </p>
    </template>
  </SecaoGuia>
</template>

<style scoped>
ul ul {
  margin-top: var(--esp-1);
}
</style>
