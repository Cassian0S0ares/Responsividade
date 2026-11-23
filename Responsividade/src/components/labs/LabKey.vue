<script setup>
import { ref, onMounted } from 'vue'
import { useAnimaisStore } from '@/stores/animais'
import AnimalItem from './AnimalItem.vue'

const store = useAnimaisStore()
const listaComKey = ref([])
const listaSemKey = ref([])
const rodada = ref(0) // muda para recriar as listas do zero (apaga o que foi digitado)

function restaurar() {
  listaComKey.value = [...store.animais]
  listaSemKey.value = [...store.animais]
  rodada.value++
}

function removerPrimeiro() {
  listaComKey.value.shift()
  listaSemKey.value.shift()
}

function remover(lista, id) {
  const indice = lista.findIndex((animal) => animal.id === id)
  lista.splice(indice, 1)
}

onMounted(async () => {
  await store.carregar()
  restaurar()
})
</script>

<template>
  <div class="lab">
    <ol class="key-lab__passos">
      <li>Escreva algo no campo do <strong>segundo</strong> animal nas duas listas.</li>
      <li>Clique em "Remover o primeiro".</li>
      <li>Compare: onde foi parar o texto?</li>
    </ol>

    <div class="key-lab__botoes">
      <button type="button" class="botao" :disabled="!listaComKey.length" @click="removerPrimeiro">
        Remover o primeiro
      </button>
      <button type="button" class="botao botao--secundario" @click="restaurar">Restaurar</button>
    </div>

    <p v-if="store.carregando" class="lab__info">Buscando animais na API…</p>
    <p v-else class="lab__info">Animais vindos de: {{ store.origem }}</p>

    <div class="key-lab__listas">
      <section class="key-lab__lista key-lab__lista--ok">
        <h4>Com <code>:key="animal.id"</code></h4>
        <ul :key="`com-${rodada}`">
          <AnimalItem
            v-for="animal in listaComKey"
            :key="animal.id"
            :nome="animal.nome"
            @remover="remover(listaComKey, animal.id)"
          />
        </ul>
      </section>

      <section class="key-lab__lista key-lab__lista--ruim">
        <h4>Sem <code>:key</code></h4>
        <ul :key="`sem-${rodada}`">
          <!-- Sem :key DE PROPÓSITO, para mostrar o problema. Nunca faça isso! -->
          <!-- eslint-disable-next-line vue/require-v-for-key -->
          <AnimalItem
            v-for="animal in listaSemKey"
            :nome="animal.nome"
            @remover="remover(listaSemKey, animal.id)"
          />
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.key-lab__passos {
  padding-left: var(--esp-4);
}

.key-lab__botoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--esp-2);
}

.key-lab__listas {
  display: grid;
  gap: var(--esp-4);
}

.key-lab__lista {
  padding: var(--esp-3);
  border-top: 0.25rem solid;
  background: var(--cor-fundo);
}

.key-lab__lista ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.key-lab__lista--ok {
  border-color: var(--cor-ok);
}

.key-lab__lista--ruim {
  border-color: var(--cor-erro);
}

@media (min-width: 48rem) {
  .key-lab__listas {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
