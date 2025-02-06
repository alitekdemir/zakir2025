<!-- src/components/Home.vue -->
<script setup>
import { onMounted, onUnmounted, watch, computed } from 'vue'
import { useStatsTimeStore } from '../components/stats/statsTimeStore.js';
import { useStatsBadgesStore } from '../components/badges/statsBadgesStore.js';
import { useProgress, widgetWeights } from '../assets/useProgress.js';

import Header from '../components/Header.vue';
import ProgressBar from '../components/stats/ProgressBar.vue';
import { duaList } from '../components/tesbihat/duaList.js';
import Tesbihat from '../components/tesbihat/Tesbihat.vue';
import DuaNavigator from '../components/DuaNavigator.vue';
import InstallPWAPrompt from '../components/InstallPWAPrompt.vue';
import ZakirGullu from '../components/ZakirGullu.vue';

const statsStore = useStatsTimeStore()
const badgesStore = useStatsBadgesStore()
const { progress: score } = useProgress()

// Progress yüzdesini hesapla
const progressPercentage = computed(() => {
  const totalWeight = Object.values(widgetWeights).reduce((sum, weight) => sum + weight, 0)
  return (score.value / totalWeight) * 100
})

// Progress değişikliklerini izle
watch(progressPercentage, (newPercentage) => {
  badgesStore.checkProgressBadges(newPercentage)
})


onMounted(() => {
  statsStore.initializeStats()
  statsStore.startSession()
  
  // Sayfa görünürlük değişikliklerini dinle
  document.addEventListener('visibilitychange', () => {
    statsStore.handleVisibilityChange()
  })
  
  // İlk yüklemede mevcut ilerlemeyi kontrol et
  badgesStore.checkProgressBadges(progressPercentage.value)
})

onUnmounted(() => {
  statsStore.endSession()
  document.removeEventListener('visibilitychange', statsStore.handleVisibilityChange)
})

// Uygulamadan çıkışta son bir güncelleme yap
window.addEventListener('beforeunload', () => {
  statsStore.endSession()
})
</script>

<template>
  <div class="home-container">
    <Header />
    <ProgressBar/>
    <DuaNavigator :duaList="duaList" />
    <Tesbihat />
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
</style>
