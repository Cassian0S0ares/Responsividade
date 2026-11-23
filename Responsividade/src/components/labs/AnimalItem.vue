<script setup>
import { ref } from 'vue'

// Props tipadas: o Vue avisa no console se alguém passar o tipo errado.
defineProps({
  nome: { type: String, required: true },
})

// Eventos declarados: quem usa o componente sabe o que ele pode "avisar".
const emit = defineEmits(['remover'])

// Estado interno do componente: é este texto que "pula" sem :key.
const anotacao = ref('')
</script>

<template>
  <li class="animal">
    <label class="animal__rotulo">
      <span class="animal__nome">{{ nome }}</span>
      <input v-model="anotacao" type="text" placeholder="Escreva algo…" />
    </label>
    <button type="button" class="animal__remover" :aria-label="`Remover ${nome}`" @click="emit('remover')">
      ×
    </button>
  </li>
</template>

<style scoped>
.animal {
  display: flex;
  align-items: flex-end;
  gap: var(--esp-2);
  padding: var(--esp-2) 0;
  border-bottom: 0.0625rem solid var(--cor-borda);
}

.animal__rotulo {
  display: grid;
  flex: 1;
  min-width: 0;
}

.animal__nome {
  font-weight: 700;
  text-transform: capitalize;
}

.animal__rotulo input {
  width: 100%;
  padding: var(--esp-1) var(--esp-2);
}

.animal__remover {
  padding: var(--esp-1) var(--esp-2);
  border: 0.0625rem solid var(--cor-borda);
  border-radius: var(--raio);
  background: transparent;
}
</style>
