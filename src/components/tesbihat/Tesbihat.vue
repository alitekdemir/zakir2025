<!-- src/components/tesbihat/Tesbihat.vue -->
<script setup>
import { ref, computed } from 'vue'
import DuaWidget from '../DuaWidget.vue';
import { duaList } from './duaList.js';
import { useStatsStore } from '../../assets/statsStore.js';
import BadgeSplash from '../badges/BadgeSplash.vue';

const statsStore = useStatsStore();

const canComplete = computed(() => {
  if (!statsStore.lastTesbihatTime) return true;
  const timeDiff = Date.now() - new Date(statsStore.lastTesbihatTime);
  return timeDiff >= 300000; // 5 dakika
});

const completeTesbihat = async () => {
  const result = statsStore.completeTesbihat();
  
  if (result) {
    console.log('✅ Tesbihat tamamlandı!', result);
  } else {
    console.log('⏱️ Lütfen iki tamamlama arasında en az 5 dakika bekleyin.');
  }
};
</script>


<template>
  <div class="tesbihat-container">
    <DuaWidget
      v-for="dua in duaList"
      :key="dua.number"
      :number="dua.number"
      :title="dua.title"
      :id="`dua-${dua.number}`"
      class="dua"
    >
      <component :is="dua.component" />

      
      <template v-if="dua.info" #info-content>
        <component :is="dua.info" />
      </template>
      <!-- <hr class="divider"> -->
      <!-- <div class="divider-line2"></div> -->
    </DuaWidget>
    
    <div class="complete-button" v-if="canComplete">
      <button class="buton" @click="completeTesbihat" :disabled="!canComplete">
        Tesbihatı Tamamladım
      </button>
    </div>
    
    <BadgeSplash
    v-if="statsStore.latestBadge"
    :badge="statsStore.latestBadge"
    :show="true"
    @close="statsStore.clearLatestBadge()"
    />
    
  </div>
</template>


<style scoped>

.dua {
  /* border-top: 1px solid var(--primary-light); */
  /* border: 1px solid var(--text-tertiary); */
  border: 1px solid var(--primary-light);
  border: 1px solid var(--primary);
  box-shadow: var(--card-shadow);
}

.tesbihat-container {
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 0.2rem;
  /* margin: 1.5rem auto; */
  gap: 1.0rem;
  max-width: var(--content-width);
  /* max-width: clamp(16rem, 38rem, 42rem); */
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

.divider-line2 {
  border-top: 1px solid var(--primary-light);
  margin: 2rem 0rem 1.5rem;
}

</style>
