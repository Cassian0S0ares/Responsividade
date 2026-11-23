<script setup>
import { ref, computed } from 'vue'
import BlocoCodigo from '@/components/guia/BlocoCodigo.vue'

const OPCOES = {
  justifyContent: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
  alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
  flexWrap: ['nowrap', 'wrap'],
}

const justifyContent = ref('flex-start')
const alignItems = ref('stretch')
const flexWrap = ref('wrap')
const gapRem = ref(0.5)
const quantidade = ref(4)

// Alturas diferentes para o align-items ficar visível.
const alturas = [3, 5, 4, 6, 3.5, 4.5, 5.5, 3]

const cssGerado = computed(
  () => `.container {
  display: flex;
  justify-content: ${justifyContent.value};
  align-items: ${alignItems.value};
  flex-wrap: ${flexWrap.value};
  gap: ${gapRem.value}rem;
}`,
)
</script>

<template>
  <div class="lab">
    <div class="flex-lab__controles">
      <label class="lab__controle">
        justify-content (eixo principal)
        <select v-model="justifyContent">
          <option v-for="o in OPCOES.justifyContent" :key="o">{{ o }}</option>
        </select>
      </label>
      <label class="lab__controle">
        align-items (eixo cruzado)
        <select v-model="alignItems">
          <option v-for="o in OPCOES.alignItems" :key="o">{{ o }}</option>
        </select>
      </label>
      <label class="lab__controle">
        flex-wrap
        <select v-model="flexWrap">
          <option v-for="o in OPCOES.flexWrap" :key="o">{{ o }}</option>
        </select>
      </label>
      <label class="lab__controle">
        gap: {{ gapRem }}rem
        <input v-model.number="gapRem" type="range" min="0" max="2" step="0.25" />
      </label>
      <label class="lab__controle">
        Itens: {{ quantidade }}
        <input v-model.number="quantidade" type="range" min="1" max="8" />
      </label>
    </div>

    <div
      class="flex-lab__container"
      :style="{ justifyContent, alignItems, flexWrap, gap: `${gapRem}rem` }"
    >
      <div
        v-for="n in quantidade"
        :key="n"
        class="flex-lab__item"
        :style="{ minHeight: alignItems === 'stretch' ? null : `${alturas[n - 1]}rem` }"
      >
        {{ n }}
      </div>
    </div>

    <BlocoCodigo linguagem="css gerado" :codigo="cssGerado" />
  </div>
</template>

<style scoped>
.flex-lab__controles {
  display: grid;
  gap: var(--esp-2);
}

.flex-lab__controles select {
  width: 100%;
  padding: var(--esp-2);
}

.flex-lab__container {
  display: flex;
  min-height: 10rem;
  margin: var(--esp-3) 0;
  padding: var(--esp-2);
  outline: 0.125rem dashed var(--cor-destaque);
}

.flex-lab__item {
  display: grid;
  place-items: center;
  width: 4rem;
  border-radius: var(--raio);
  background: var(--cor-fundo);
  font-weight: 700;
}

@media (min-width: 48rem) {
  .flex-lab__controles {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
