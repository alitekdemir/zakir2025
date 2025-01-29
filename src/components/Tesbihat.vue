<!-- src/components/Tesbihat.vue -->
<script setup>
import DuaWidget from './DuaWidget.vue';
import { duaList } from '../assets/duaList.js';

import { ref, computed } from 'vue'
import { useStatsStore } from '../assets/statsStore'

const statsStore = useStatsStore()

const canComplete = computed(() => {
  if (!statsStore.lastTesbihatTime) return true
  const timeDiff = Date.now() - new Date(statsStore.lastTesbihatTime)
  return timeDiff >= 300000 // 5 dakika
})

const completeTesbihat = () => {
  if (statsStore.completeTesbihat()) {
    // Başarılı tamamlama
    alert('Tesbihat tamamlandı!')
  } else {
    // 5 dakika geçmedi
    alert('Lütfen iki tamamlama arasında en az 5 dakika bekleyin.')
  }
}

</script>

<template>
  <div class="tesbihat-container">

    <DuaWidget
      v-for="dua in duaList"
      :key="dua.number"
      :number="dua.number"
      :title="dua.title"
      :id="`dua-${dua.number}`"
    >
      <component :is="dua.component" />
      <template v-if="dua.info" #info-content>
        <component :is="dua.info" />
      </template>
    </DuaWidget>
    
    <div class="complete-button" v-if="canComplete">
      <button class="buton" @click="completeTesbihat" :disabled="!canComplete">
        Tesbihatı Tamamladım
      </button>
    </div>

  </div>
</template>


<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tesbihat-container {
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 0.25rem;
  /* margin: 1.5rem auto; */
  gap: 1rem;
  width: 100%;
  max-width: min(600px, 100%);
  max-width: clamp(16rem, 38rem, 42rem);
}

.complete-button {
  margin: 2rem auto 0.25rem;
  /* padding: 2rem; */
}

.buton {
  font-size: 1.1em;
  user-select: none;
}

.buton:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>
