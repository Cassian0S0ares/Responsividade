<script setup>
import SecaoGuia from '@/components/guia/SecaoGuia.vue'
import BlocoCodigo from '@/components/guia/BlocoCodigo.vue'
import LabCls from '@/components/labs/LabCls.vue'
import LabMoldura from '@/components/labs/LabMoldura.vue'

const codigoCss = `
/* A imagem nunca fica maior que o espaço disponível... */
img {
  max-width: 100%;
  /* ...e a altura acompanha, sem deformar */
  height: auto;
}

/* aspect-ratio: caixa sempre na proporção 16:9, seja qual for a largura */
.video {
  width: 100%;
  aspect-ratio: 16 / 9;
}

/* object-fit: como a imagem preenche uma caixa de tamanho fixo */
.avatar {
  width: 6rem;
  height: 6rem;
  object-fit: cover;   /* preenche e corta o excesso, sem esticar */
  border-radius: 50%;
}
`

const codigoHtml = `
<!-- width e height: o navegador reserva o espaço ANTES de baixar (evita o "pulo") -->
<!-- loading="lazy": só baixa quando a imagem estiver perto de aparecer na tela -->
<img src="foto-800.jpg" width="800" height="500" alt="Descrição da foto" loading="lazy">

<!-- srcset + sizes: o navegador escolhe o arquivo do tamanho certo -->
<img
  src="foto-800.jpg"
  srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1200.jpg 1200w"
  sizes="(min-width: 48rem) 40rem, 100vw"
  width="800" height="500"
  alt="Descrição da foto">
<!-- sizes diz: "em telas de 48rem ou mais, a imagem ocupa 40rem;
     abaixo disso, ocupa a largura toda da tela (100vw)" -->

<!-- NÃO use lazy na imagem principal do topo (o banner): ela precisa vir logo.
     Lazy nela piora o LCP. -->
<img src="banner.jpg" width="1200" height="600" alt="..." fetchpriority="high">
`

const fontes = [
  { titulo: 'MDN: Imagens responsivas', url: 'https://developer.mozilla.org/pt-BR/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images' },
  { titulo: 'web.dev: Cumulative Layout Shift (CLS)', url: 'https://web.dev/articles/cls' },
  { titulo: 'web.dev: Optimize Cumulative Layout Shift', url: 'https://web.dev/articles/optimize-cls' },
  { titulo: 'web.dev: Browser-level image lazy loading', url: 'https://web.dev/articles/browser-level-image-lazy-loading' },
  { titulo: 'MDN: object-fit', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/object-fit' },
  { titulo: 'MDN: aspect-ratio', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/aspect-ratio' },
]
</script>

<template>
  <SecaoGuia
    :numero="4"
    titulo="Imagens responsivas"
    pergunta="Ao abrir uma página, o texto aparece primeiro. Quando a imagem termina de carregar, ela empurra o texto para baixo. Por que isso acontece quando a imagem não tem width e height no HTML? Qual métrica do Google mede esse problema?"
    :fontes="fontes"
  >
    <p>
      Imagens são, quase sempre, o que mais pesa numa página e o que mais quebra o layout no
      celular. Uma imagem responsiva precisa de três coisas: <strong>caber na tela</strong>,
      <strong>não fazer o layout pular</strong> e <strong>não baixar mais do que precisa</strong>.
    </p>
    <ul>
      <li>
        <code>max-width: 100%</code> + <code>height: auto</code>: a imagem encolhe junto com a
        tela, sem deformar.
      </li>
      <li>
        <code>width</code> e <code>height</code> no HTML: informam a proporção para o navegador
        reservar o espaço antes de baixar.
      </li>
      <li>
        <code>loading="lazy"</code>: adia imagens que estão lá embaixo na página.
        <strong>Não use</strong> na imagem principal do topo, porque atrasa o que a pessoa vê
        primeiro.
      </li>
      <li><code>aspect-ratio</code>: fixa a proporção de qualquer caixa (16/9, 1/1…).</li>
      <li>
        <code>object-fit</code>: decide como a imagem preenche uma caixa de tamanho fixo (cortar,
        encaixar ou esticar).
      </li>
      <li>
        <code>srcset</code> + <code>sizes</code>: oferecem vários tamanhos do arquivo, e o
        navegador baixa o menor que serve. O celular não baixa a foto de 1200px.
      </li>
    </ul>

    <template #codigo>
      <BlocoCodigo linguagem="css" :codigo="codigoCss" />
      <BlocoCodigo linguagem="html" :codigo="codigoHtml" />
    </template>

    <template #laboratorio>
      <h3>Medidor de pulo (CLS)</h3>
      <p>
        Clique em "Carregar notícia". A imagem demora 2 segundos para chegar, como numa internet
        lenta. Faça primeiro <strong>sem</strong> width e height e depois <strong>com</strong>, e
        compare quanto o texto pula. Repare no <em>skeleton</em> (o bloco cinza com brilho):
        com width e height ele tem exatamente o tamanho da foto; sem eles, o tamanho é um
        "chute" e o texto pula mesmo assim.
      </p>
      <LabCls />

      <h3 class="titulo-lab">Moldura elástica e srcset</h3>
      <LabMoldura />
    </template>

    <template #resposta>
      <p>
        O HTML chega antes da imagem. Quando o navegador monta a página, ele ainda não baixou o
        arquivo, então <strong>não sabe a altura da imagem</strong> e reserva 0px para ela. O texto
        é desenhado logo abaixo, ocupando esse lugar.
      </p>
      <p>
        Quando a imagem termina de baixar, o navegador descobre que ela tem, por exemplo, 500px de
        altura. Ele recalcula o layout e tudo que está abaixo é <strong>empurrado para
        baixo</strong>. Isso é um <em>layout shift</em>: a pessoa perde a linha que lia ou clica no
        botão errado.
      </p>
      <p>
        Com <code>width="736" height="460"</code> no HTML, o navegador calcula a proporção
        (736 ÷ 460 = 1,6) antes de baixar qualquer coisa. Com <code>height: auto</code>, ele já
        reserva a altura certa para a largura disponível, e o texto nasce no lugar final.
      </p>
      <p>
        A métrica do Google que mede isso é o <strong>CLS (Cumulative Layout Shift)</strong>, uma
        das <strong>Core Web Vitals</strong>. Um CLS de até <strong>0,1</strong> é considerado
        bom.
      </p>
    </template>
  </SecaoGuia>
</template>

<style scoped>
.titulo-lab {
  margin-top: var(--esp-5);
}
</style>
