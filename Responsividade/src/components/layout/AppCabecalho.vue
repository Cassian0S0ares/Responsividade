<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { secoes } from '@/data/secoes'

const menuAberto = ref(false)
const route = useRoute()

// Fecha o menu do celular sempre que a pessoa troca de página.
watch(
  () => route.fullPath,
  () => {
    menuAberto.value = false
  },
)
</script>

<template>
  <header class="cabecalho">
    <div class="cabecalho__barra">
      <RouterLink to="/" class="cabecalho__marca">Guia Responsivo</RouterLink>
      <button
        class="cabecalho__botao"
        type="button"
        aria-controls="menu-principal"
        :aria-expanded="menuAberto"
        @click="menuAberto = !menuAberto"
      >
        {{ menuAberto ? 'Fechar' : 'Menu' }}
      </button>
    </div>

    <nav
      id="menu-principal"
      class="cabecalho__menu"
      :class="{ 'cabecalho__menu--aberto': menuAberto }"
      aria-label="Seções do guia"
    >
      <ul>
        <li v-for="secao in secoes" :key="secao.rota">
          <RouterLink :to="secao.rota">{{ secao.numero }}. {{ secao.titulo }}</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* Celular: menu escondido atrás de um botão. */
.cabecalho {
  background: var(--cor-superficie);
  border-bottom: 0.0625rem solid var(--cor-borda);
}

.cabecalho__barra {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--esp-3);
  padding: var(--esp-3);
}

.cabecalho__marca {
  font-weight: 700;
  font-size: var(--tam-g);
  color: var(--cor-texto);
  text-decoration: none;
}

.cabecalho__botao {
  padding: var(--esp-2) var(--esp-3);
  border: 0.0625rem solid var(--cor-texto);
  border-radius: var(--raio);
  background: transparent;
  color: var(--cor-texto);
}

.cabecalho__menu {
  display: none;
}

.cabecalho__menu--aberto {
  display: block;
}

.cabecalho__menu ul {
  list-style: none;
  margin: 0;
  padding: 0 var(--esp-3) var(--esp-3);
}

.cabecalho__menu a {
  display: block;
  padding: var(--esp-2) 0;
  color: var(--cor-texto);
  text-decoration: none;
}

.cabecalho__menu a.router-link-active {
  color: var(--cor-destaque);
  font-weight: 700;
}

/* Desktop: o botão some e os links ficam visíveis lado a lado. */
@media (min-width: 64rem) {
  .cabecalho {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--esp-3);
    padding: 0 var(--esp-3);
  }

  .cabecalho__barra {
    padding: var(--esp-3) 0;
  }

  .cabecalho__botao {
    display: none;
  }

  .cabecalho__menu {
    display: block;
  }

  .cabecalho__menu ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--esp-3);
    padding: 0;
  }

  .cabecalho__menu a {
    font-size: var(--tam-p);
  }
}
</style>
