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

Em todas as páginas há um **indicador fixo** no canto com a largura da janela e o breakpoint
ativo.

## Tecnologias

- Vue 3 + Vite (criado com `npm create vue@latest`)
- Vue Router, com uma rota por seção carregada sob demanda (lazy loading)
- Pinia: store `tela` (largura/breakpoint) e store `animais` (consome a API pública dog.ceo)

## Regras de responsividade seguidas

- CSS **mobile-first**: o estilo fora de media query é o do celular; as media queries usam
  apenas `min-width` (40rem, 48rem e 64rem).
- Fontes e espaçamentos em `rem`; cores e espaçamentos como variáveis CSS no `:root`
  (`src/assets/main.css`).
- Sem rolagem horizontal: imagens com `max-width: 100%`, código com `white-space: pre-wrap` e
  laboratórios limitados à largura disponível.
- No celular, o menu vira um botão (`AppCabecalho.vue`).

## Estrutura

```
src/
├── assets/main.css      design tokens e estilos base
├── components/
│   ├── guia/            SecaoGuia (molde das seções) e BlocoCodigo
│   ├── labs/            um componente por laboratório
│   └── layout/          cabeçalho e indicador de breakpoint
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
