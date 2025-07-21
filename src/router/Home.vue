<!-- src/router/Home.vue -->
<script setup>
import { onMounted, onUnmounted, watch, computed } from 'vue'
import { useStatsStore } from '../assets/statsStore.js';
import { useProgress, widgetWeights } from '../assets/useProgress.js';

import ProgressBar from '../components/stats/ProgressBar.vue';
// import DuaNavigator from '../components/stats/DuaNavigator.vue';
import { duaList } from '../components/tesbihat/duaList.js';
import Tesbihat from '../components/tesbihat/Tesbihat.vue';
import Header from '../components/Header.vue';
import InstallPWAPrompt from '../components/InstallPWAPrompt.vue';
import ZakirGullu from '../components/ZakirGullu.vue';

const statsStore = useStatsStore()
const { progress: score } = useProgress()

// Navigator görünürlüğü
const isNavigatorVisible = computed(() => localStorage.getItem('show-navigator') !== 'false')

// Progress yüzdesini hesapla
const progressPercentage = computed(() => {
  const totalWeight = Object.values(widgetWeights).reduce((sum, weight) => sum + weight, 0)
  return (score.value / totalWeight) * 100
})

// Progress değişikliklerini izle
watch(progressPercentage, (newPercentage) => {
  statsStore.checkProgressBadges(newPercentage)
})

onMounted(() => {
  // Stats store zaten main.js'de başlatılıyor, burada sadece progress kontrolü yapalım
  statsStore.checkProgressBadges(progressPercentage.value)
})

onUnmounted(() => {
  // Session yönetimi artık main.js'de yapılıyor
})

// Uygulamadan çıkışta son bir güncelleme yap
window.addEventListener('beforeunload', () => {
  statsStore.endSession()
})
</script>

<template>
  <div class="home-container">
    <Header />
    <ProgressBar />
    <!-- <DuaNavigator :duaList="duaList" /> -->
    <main class="tesbihat-wrapper">
      <Tesbihat />
    </main>
    <ZakirGullu />
    <InstallPWAPrompt />
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tesbihat-wrapper {
  width: 100%;
  padding: 1rem 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
