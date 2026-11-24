# Guia Responsivo

Guia interativo, feito em Vue 3, que ensina a criar páginas que funcionam em qualquer tela.
Cada seção tem uma explicação curta, código comentado, laboratório interativo, a resposta da
pergunta-guia e as fontes consultadas.

- **Site publicado:** https://cassian0s0ares.github.io/Responsividade/
- **Dupla:** Cassiano Luiz Brandes Soares e Guilherme Emanuel Gonçalves
- **Repositório:** https://github.com/Cassian0S0ares/Responsividade

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

- `src/assets/main.css`: tokens (paleta, espaçamentos), tipografia, controles e materiais dos laboratórios.
- `src/App.vue`: moldura da janela, navegação responsiva e caminho da página.
- `src/components/layout/AeroIcon.vue`: ícones SVG com gradientes e identificadores únicos.
- `src/components/layout/AeroCena.vue`: composição de dispositivos feita em CSS, usando a foto já existente.
- `src/assets/mundo-aero.jpg`: paisagem enviada como referência (processada pelo Vite).
- `public/aero/`: favicon próprio.

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

- **Mobile-first** em todo o projeto: o CSS fora de media query é o do celular e todas as media
  queries usam `min-width` em `rem`. A barra lateral aparece a partir de 48.0625rem (769px); os
  limites somam 1px para que a largura exata (ex.: 768px) continue com o layout menor.
- Fontes e espaçamentos em `rem`. **Cores e espaçamentos são variáveis CSS no `:root`**
  (`src/assets/main.css`): tokens semânticos (`--cor-texto`, `--cor-destaque`...), a escala de
  espaçamento `--esp-1` a `--esp-6` com ajustes finos (`--esp-035` = .35rem) e a paleta Aero
  (`--azul-21`, `--verde-40`...; `-aNN` indica a opacidade). Os componentes só usam `var(--...)`.
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

## Publicação (GitHub Pages)

O workflow `.github/workflows/deploy.yml` (na raiz do repositório) faz o build e publica a cada
push na `main`:

1. Roda `npm ci` e `npm run build` dentro da pasta `Responsividade`, com
   `BASE_PATH=/Responsividade/` (o site fica em `usuario.github.io/Responsividade/`, e o
   `vite.config.js` usa essa variável como `base`).
2. Copia `dist/index.html` para `dist/404.html`: o Pages não conhece as rotas do Vue Router, então
   ao recarregar `/unidades` ele entrega o app pelo 404.html e o router mostra a página certa.
3. Publica a pasta `dist`.

No GitHub, em **Settings → Pages → Build and deployment → Source**, escolha **GitHub Actions**.

O `vercel.json` continua no projeto caso prefiram publicar na Vercel (Root Directory:
`Responsividade`); lá o site fica na raiz e não precisa de `BASE_PATH`.
