<!-- src/components/views/Istatistikler.vue -->
<script setup>
import { onMounted } from 'vue';
import { useStatsStore } from '../../assets/statsStore';

import ProgressBar from '../stats/ProgressBar.vue';
import StatsCards from '../stats/StatsCards.vue';
import LastWeek from '../stats/LastWeek.vue';
import BadgesGrid from '../stats/BadgesGrid.vue';
import ResetStats from '../stats/ResetStats.vue';

const stats = useStatsStore();

onMounted(() => {
  stats.initializeStats();
});
</script>

<template>
  <div class="container">
    <ProgressBar /> <!-- Ezberleme İlerlemesi -->
    <StatsCards /> <!-- Ana İstatistikler -->
    <LastWeek /> <!-- Günlük Aktivite Grafiği -->
    <BadgesGrid /> <!-- Rozetler -->
    <ResetStats /> <!-- İstatistikleri Sıfırla -->
  </div>
</template>



<style scoped>
.container {
  padding: 1rem;
  max-width: var(--max-width);
  margin: 0 auto;
}
</style>
