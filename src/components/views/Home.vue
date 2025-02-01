<!-- src/components/Home.vue -->
<script setup>
import { onMounted, onUnmounted, watch, computed } from 'vue' // computed'ı ekleyin
import { useStatsTimeStore } from '../stats/statsTimeStore'
import { useStatsBadgesStore } from '../badges/statsBadgesStore'
import { useProgress, widgetWeights } from '../../assets/useProgress'

import Header from './Header.vue';
import ProgressBar from '../stats/ProgressBar.vue';
import DuaNavigator from '../DuaNavigator.vue';
import { duaList } from '../dualar/duaList.js';
import Tesbihat from '../Tesbihat.vue';
import ZakirGullu from '../ZakirGullu.vue';
import InstallPWAPrompt from '../InstallPWAPrompt.vue';

const statsStore = useStatsTimeStore()
const { progress: score } = useProgress()
const badgesStore = useStatsBadgesStore()

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
  statsStore.startSession()
  
  // İlk yüklemede mevcut ilerlemeyi kontrol et
  badgesStore.checkProgressBadges(progressPercentage.value)
})
</script>

<template>
  <div class="home-container">
    <Header />
    <ProgressBar/>
    <!-- <DuaNavigator :duaList="duaList" /> -->
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
