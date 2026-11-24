<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
// A mesma foto em três tamanhos de arquivo, para o srcset escolher.
import paisagem from '@/assets/Image1.jpg' // 736px
import paisagem480 from '@/assets/Image1-480.jpg'
import paisagem320 from '@/assets/Image1-320.jpg'

const opcoesSrcset = `${paisagem320} 320w, ${paisagem480} 480w, ${paisagem} 736w`
const ajustes = ['fill', 'contain', 'cover', 'none']
const objectFit = ref('cover')

// srcset: qual arquivo o navegador escolheu?
const arquivoEscolhido = ref('')
const larguraExibida = ref(0)
const densidade = ref(1)
const imagemSrcset = ref(null)

function atualizarSrcset() {
  const img = imagemSrcset.value
  if (!img) return
  // Descobre qual dos três arquivos o navegador baixou.
  const atual = img.currentSrc
  if (atual.includes(paisagem320)) arquivoEscolhido.value = 'versão de 320px'
  else if (atual.includes(paisagem480)) arquivoEscolhido.value = 'versão de 480px'
  else arquivoEscolhido.value = 'versão de 736px (original)'
  larguraExibida.value = Math.round(img.getBoundingClientRect().width)
  // O navegador às vezes devolve 1.0000000149...; duas casas bastam (ex.: 2.63).
  densidade.value = Math.round(window.devicePixelRatio * 100) / 100
}

onMounted(() => window.addEventListener('resize', atualizarSrcset))
onBeforeUnmount(() => window.removeEventListener('resize', atualizarSrcset))
</script>

<template>
  <div class="lab">
    <h4>object-fit: arraste o canto da moldura</h4>
    <div class="moldura__opcoes" role="radiogroup" aria-label="Valor de object-fit">
      <label v-for="a in ajustes" :key="a">
        <input v-model="objectFit" type="radio" name="object-fit" :value="a" />
        {{ a }}
      </label>
    </div>

    <div class="moldura">
      <img
        :src="paisagem"
        width="736"
        height="460"
        alt="Colina verde sob um céu azul com nuvens"
        class="moldura__img"
        :style="{ objectFit }"
      />
    </div>
    <p class="lab__info">
      <code>fill</code> estica e deforma; <code>contain</code> mostra tudo e sobra espaço;
      <code>cover</code> preenche e corta as bordas; <code>none</code> usa o tamanho original.
    </p>

    <h4 class="moldura__titulo">srcset: qual arquivo veio?</h4>
    <img
      ref="imagemSrcset"
      :src="paisagem"
      :srcset="opcoesSrcset"
      sizes="(min-width: 48rem) 40rem, 100vw"
      width="736"
      height="460"
      alt="A mesma colina, servida em três tamanhos de arquivo"
      loading="lazy"
      @load="atualizarSrcset"
    />
    <p class="lab__info">
      Arquivo escolhido: <strong>{{ arquivoEscolhido || '…' }}</strong>. A imagem aparece com
      {{ larguraExibida }}px numa tela de densidade {{ densidade }}x, então o navegador precisa
      de cerca de {{ Math.round(larguraExibida * densidade) }}px de imagem. Abra no celular e
      compare.
    </p>
  </div>
</template>

<style scoped>
.moldura__opcoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--esp-3);
  margin-bottom: var(--esp-3);
  font-family: var(--fonte-mono);
}

/* resize: both cria a alça de arrastar no canto. max-width impede de vazar. */
.moldura {
  width: 100%;
  max-width: 100%;
  height: 12rem;
  min-width: 6rem;
  min-height: 6rem;
  resize: both;
  overflow: hidden;
  border: 0.125rem dashed var(--cor-destaque);
  background: var(--cor-fundo);
}

.moldura__img {
  width: 100%;
  height: 100%;
}

.moldura__titulo {
  margin-top: var(--esp-5);
}
</style>
