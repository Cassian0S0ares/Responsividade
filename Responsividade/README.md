# Guia Responsivo

Guia interativo, feito em Vue 3, que ensina a criar páginas que funcionam em qualquer tela.
Cada seção tem uma explicação curta, código comentado, laboratório interativo, a resposta da
pergunta-guia e as fontes consultadas.

- **Site publicado:** _(colocar o link aqui)_
- **Dupla:** _(nomes)_

## Seções

| # | Seção | Rota | Laboratórios |
|---|---|---|---|
| 1 | Por que responsividade importa | `/por-que-importa` | Celular sem óculos (meta viewport ligada/desligada) |
| 2 | Unidades CSS | `/unidades` | Lupa de acessibilidade (px x rem) e conversor de unidades |
| 3 | Flexbox e Grid | `/flexbox-e-grid` | Calculadora de colunas (auto-fit + minmax) e playground de Flexbox |
| 4 | Imagens responsivas | `/imagens` | Medidor de pulo (CLS real), moldura com object-fit e srcset |
| 5 | Boas práticas em Vue | `/boas-praticas` | :key ou caos? (lista com e sem key, dados de API + Pinia) |
| 6 | Desafio | `/desafio` | Perguntas que só se respondem usando os laboratórios |

Em todas as páginas há uma **barra de status fixa** com a largura da janela e o breakpoint
ativo.

## Direção visual: Frutiger Aero

A interface combina natureza e tecnologia: uma paisagem fornecida como referência, uma janela
translúcida, botões com relevo, ícones vetoriais próprios e tipografia humanista (Segoe UI).
As áreas de leitura permanecem opacas para preservar a legibilidade. A página inicial funciona
como um explorador de assuntos; as seções têm atalhos para explicação, código e laboratórios.

- `src/assets/main.css`: paleta, tipografia, controles e materiais dos laboratórios.
- `src/App.vue`: moldura da janela, navegação responsiva e caminho da página.
- `src/components/layout/AeroIcon.vue`: ícones SVG com gradientes e identificadores únicos.
- `src/components/layout/AeroCena.vue`: composição de dispositivos feita em CSS, usando a foto já existente.
- `public/aero/`: paisagem enviada como referência e favicon próprio.

A pesquisa visual partiu do [acervo e definição do CARI](https://cari.institute/aesthetics/frutiger-aero).
Também foram consultadas as observações da [Falia sobre padrões recorrentes em sites gerados por IA](https://falia.co/en/insights/web-design/spot-ai-built-website/)
e a análise do [Web Almanac](https://almanac.httparchive.org/en/2025/generative-ai).
Esses padrões não comprovam autoria por IA. A decisão aqui foi evitar cartões repetitivos,
ornamentos sem função e composição genérica de landing page, mantendo o brilho e os gradientes
que fazem parte da referência Aero.

## Tecnologias

- Vue 3 + Vite (criado com `npm create vue@latest`)
- Vue Router, com uma rota por seção carregada sob demanda (lazy loading)
- Pinia: store `tela` (largura/breakpoint) e store `animais` (consome a API pública dog.ceo)

## Regras de responsividade seguidas

- Os laboratórios mantêm os exemplos **mobile-first**. A moldura e a navegação usam media queries
  em `rem` para adaptar a composição, recolhendo a barra lateral em telas de até 48rem.
- Fontes e espaçamentos em `rem`; cores e espaçamentos como variáveis CSS no `:root`
  (`src/assets/main.css`).
- Sem rolagem horizontal: imagens com `max-width: 100%`, código com `white-space: pre-wrap` e
  laboratórios limitados à largura disponível.
- No celular, o menu vira o botão “Explorar guia” (`App.vue`).
- Há link para pular ao conteúdo, indicação de foco, respeito a movimento reduzido e campos rotulados.

## Estrutura

```
src/
├── assets/main.css      design tokens e estilos base
├── components/
│   ├── guia/            SecaoGuia (molde das seções) e BlocoCodigo
│   ├── labs/            um componente por laboratório
│   └── layout/          cabeçalho, ícones Aero, cena e indicador de breakpoint
├── data/secoes.js       lista das seções (menu e página inicial)
├── router/index.js      rotas
├── stores/              Pinia
└── views/               uma página por seção
```

## Como rodar

```sh
cd Responsividade
npm install
npm run dev      # desenvolvimento
npm run build    # gera a pasta dist/
```

## Publicação (Vercel)

1. Importe o repositório na Vercel.
2. Em **Root Directory**, escolha a pasta `Responsividade`.
3. Framework: Vite. Build: `npm run build`. Output: `dist`.

O `vercel.json` redireciona todas as rotas para o `index.html`, para que recarregar a página
em `/unidades` (por exemplo) não dê erro 404.
