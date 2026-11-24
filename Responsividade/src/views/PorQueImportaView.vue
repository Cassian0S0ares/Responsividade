<script setup>
import SecaoGuia from '@/components/guia/SecaoGuia.vue'
import BlocoCodigo from '@/components/guia/BlocoCodigo.vue'
import LabViewport from '@/components/labs/LabViewport.vue'

const codigoHtml = `
<!-- Dentro do <head> de TODA página. Sem esta linha, o celular finge ter ~980px. -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- width=device-width  -> a página usa a largura real do aparelho (ex.: 390px) -->
<!-- initial-scale=1     -> começa sem zoom (1 px do CSS = 1 px "do aparelho") -->
`

const codigoCss = `
/* Mobile-first: este é o estilo do celular (vale para todo mundo) */
.cards {
  display: grid;
  gap: 1rem;
}

/* Só a partir de 48rem (768px) de largura, os cards viram 3 colunas.
   Sem a meta viewport, o celular diz ter 980px... e entra aqui por engano! */
@media (min-width: 48rem) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
`

const fontes = [
  { titulo: 'MDN: The viewport meta tag', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport' },
  { titulo: 'MDN: Design responsivo', url: 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/CSS_layout/Responsive_Design' },
  { titulo: 'web.dev: Responsive web design basics', url: 'https://web.dev/articles/responsive-web-design-basics' },
  { titulo: 'MDN: Usando media queries', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/Guides/Media_queries/Using' },
]
</script>

<template>
  <SecaoGuia
    pergunta="Um site tem media queries bem escritas, mas não tem a meta tag viewport. No celular, ele aparece como a versão de computador, só que minúscula. Por que isso acontece, e o que a meta viewport muda?"
    :fontes="fontes"
  >
    <p>
      Hoje a maior parte das pessoas acessa a internet pelo celular. Um site responsivo é aquele
      que <strong>se adapta à tela</strong>: no celular, as coisas ficam empilhadas e com letras
      legíveis; no computador, aproveitam o espaço lado a lado. É o mesmo HTML, só o CSS muda.
    </p>
    <p>
      Se o site não se adapta, a pessoa precisa dar zoom, arrastar para os lados e mirar em botões
      minúsculos. Ela desiste e vai embora. O Google também prioriza sites que funcionam bem no
      celular nos resultados de busca.
    </p>
    <p>
      As ferramentas principais são três: a <strong>meta tag viewport</strong> (avisa o celular
      para usar a largura real), <strong>layouts flexíveis</strong> (Flexbox, Grid e unidades
      relativas) e <strong>media queries</strong> (regras que só valem a partir de certa largura).
    </p>

    <template #codigo>
      <BlocoCodigo linguagem="html" :codigo="codigoHtml" />
      <BlocoCodigo linguagem="css" :codigo="codigoCss" />
    </template>

    <template #laboratorio>
      <p>
        <strong>Celular sem óculos.</strong> O celular abaixo mostra o mesmo mini-site. Ligue e
        desligue a meta viewport e veja o que o navegador do aparelho faz.
      </p>
      <LabViewport />
    </template>

    <template #resposta>
      <p>
        Os primeiros sites não eram feitos para celular. Para não quebrá-los, os navegadores de
        celular adotaram um truque: <strong>fingir que a tela tem cerca de 980px de largura</strong>
        (a chamada <em>layout viewport</em>), desenhar a página nesse tamanho e depois encolher tudo
        para caber na tela de verdade.
      </p>
      <p>
        Por isso as media queries "não funcionam": elas perguntam "a tela tem pelo menos 48rem?" e o
        navegador responde "sim, tenho 980px". O layout de computador é aplicado e depois reduzido,
        e o resultado é a versão desktop minúscula.
      </p>
      <p>
        A meta viewport desliga esse truque. <code>width=device-width</code> diz ao navegador para
        usar a largura real do aparelho (por exemplo, 390px) como largura da página, e
        <code>initial-scale=1</code> diz para começar sem zoom. Assim as media queries recebem a
        largura verdadeira e o layout de celular aparece em tamanho legível.
      </p>
    </template>
  </SecaoGuia>
</template>
