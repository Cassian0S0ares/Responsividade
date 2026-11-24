<script setup>
import SecaoGuia from '@/components/guia/SecaoGuia.vue'
import BlocoCodigo from '@/components/guia/BlocoCodigo.vue'
import LabLupa from '@/components/labs/LabLupa.vue'
import LabConversor from '@/components/labs/LabConversor.vue'

const unidades = [
  { nome: 'px', tipo: 'Absoluta', uso: 'Bordas finas e sombras. Evite para fontes: ignora a preferência da pessoa.' },
  { nome: 'rem', tipo: 'Relativa à raiz', uso: 'Fontes e espaçamentos. 1rem = fonte do <html> (16px por padrão).' },
  { nome: 'em', tipo: 'Relativa ao pai', uso: 'Espaços que acompanham o texto do próprio componente (padding de botão). Cuidado: acumula quando aninhado.' },
  { nome: '%', tipo: 'Relativa ao pai', uso: 'Larguras que dependem do contêiner (ex.: width: 50%).' },
  { nome: 'fr', tipo: 'Fração do Grid', uso: 'Dividir o espaço que sobra entre colunas do Grid.' },
  { nome: 'vw / vh', tipo: 'Relativa à janela', uso: 'Elementos do tamanho da tela. 100vw pode causar rolagem horizontal por causa da barra de rolagem.' },
  { nome: 'dvh', tipo: 'Relativa à janela visível', uso: 'Telas cheias no celular: acompanha a barra do navegador que aparece e some (100vh fica maior que a tela visível).' },
  { nome: 'ch', tipo: 'Relativa à fonte', uso: 'Largura máxima de textos: entre 45ch e 75ch a leitura fica confortável.' },
]

const codigoCss = `
/* NÃO faça: px na raiz trava a escolha da pessoa */
/* html { font-size: 16px; } */

/* Tamanhos de texto em rem: crescem com a configuração do navegador */
h1 { font-size: 2rem; }      /* 2 x 16 = 32px no padrão */
p  { font-size: 1rem; }

/* em: o padding acompanha a fonte do próprio botão */
.botao {
  font-size: 1.125rem;
  padding: 0.5em 1em;        /* 0.5 x 18 = 9px e 1 x 18 = 18px */
}

/* ch: linhas de texto com largura confortável de leitura */
.artigo { max-width: 65ch; }

/* dvh: tela cheia de verdade no celular */
.capa { min-height: 100dvh; }

/* fr: 3 colunas, a do meio com o dobro do espaço */
.layout { display: grid; grid-template-columns: 1fr 2fr 1fr; }
`

const fontes = [
  { titulo: 'MDN: Valores e unidades CSS (em inglês)', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units' },
  { titulo: 'web.dev: Sizing units', url: 'https://web.dev/learn/css/sizing' },
  { titulo: 'Josh W. Comeau: The Surprising Truth About Pixels and Accessibility', url: 'https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/' },
  { titulo: 'W3C WCAG: Critério 1.4.4 Redimensionar texto', url: 'https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html' },
  { titulo: 'web.dev: Large, small, and dynamic viewport units', url: 'https://web.dev/blog/viewport-units' },
]
</script>

<template>
  <SecaoGuia
    pergunta="Uma pessoa com baixa visão aumenta o tamanho da fonte nas configurações do navegador. O texto definido em px continua do mesmo tamanho, e o definido em rem aumenta. Por que essa diferença acontece?"
    :fontes="fontes"
  >
    <p>
      Toda medida no CSS tem uma unidade. As <strong>absolutas</strong> têm sempre o mesmo
      tamanho (o <code>px</code>). As <strong>relativas</strong> são calculadas a partir de outra
      coisa: a fonte da página, o elemento pai ou o tamanho da janela. Responsividade é, em
      grande parte, escolher a unidade relativa certa.
    </p>

    <dl class="unidades">
      <div v-for="u in unidades" :key="u.nome" class="unidades__item">
        <dt><code>{{ u.nome }}</code> <span>{{ u.tipo }}</span></dt>
        <dd>{{ u.uso }}</dd>
      </div>
    </dl>

    <p>
      Regra prática: <strong>fontes e espaçamentos em rem</strong>, larguras flexíveis em
      <strong>%</strong> ou <strong>fr</strong>, textos longos limitados em <strong>ch</strong>
      e telas cheias no celular em <strong>dvh</strong>.
    </p>

    <template #codigo>
      <BlocoCodigo linguagem="css" :codigo="codigoCss" />
    </template>

    <template #laboratorio>
      <h3>Lupa de acessibilidade</h3>
      <p>
        O controle abaixo faz o mesmo que a configuração "tamanho da fonte" do navegador: muda a
        fonte da raiz (<code>&lt;html&gt;</code>). Compare os dois blocos.
      </p>
      <LabLupa />

      <h3 class="titulo-lab">Conversor de unidades</h3>
      <p>Digite um valor, escolha a unidade e veja quantos px o navegador calculou de verdade.</p>
      <LabConversor />
    </template>

    <template #resposta>
      <p>
        O <code>rem</code> significa "root em": é <strong>relativo ao tamanho da fonte da raiz</strong>
        (o elemento <code>&lt;html&gt;</code>). Se ninguém mexer, essa fonte vem da configuração
        do navegador, que por padrão é 16px. Quando a pessoa muda a configuração para 24px, a raiz
        passa a ter 24px e tudo que está em rem é recalculado: <code>1rem</code> vira 24px,
        <code>2rem</code> vira 48px.
      </p>
      <p>
        O <code>px</code> é uma <strong>unidade absoluta</strong>: <code>16px</code> é 16px e
        pronto, não depende de nenhuma configuração. Por isso o texto em px ignora a escolha da
        pessoa.
      </p>
      <p>
        O zoom do navegador (Ctrl +) aumenta os dois, porque amplia a página inteira. Mas muita
        gente com baixa visão usa a configuração de fonte, e só o rem respeita essa escolha. Pelo
        mesmo motivo, nunca se deve fixar <code>html { font-size: 16px }</code>: isso também trava
        o rem.
      </p>
    </template>
  </SecaoGuia>
</template>

<style scoped>
.unidades {
  display: grid;
  gap: var(--esp-2);
  margin: 0 0 var(--esp-3);
}

.unidades__item {
  padding: var(--esp-2) var(--esp-3);
  border-radius: var(--raio);
  background: var(--cor-superficie);
}

.unidades__item dt span {
  font-size: var(--tam-p);
  color: var(--cor-texto-suave);
}

.unidades__item dd {
  margin: 0;
}

.titulo-lab {
  margin-top: var(--esp-5);
}

@media (min-width: 48rem) {
  .unidades {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
