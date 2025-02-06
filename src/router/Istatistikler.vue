<!-- src/components/Istatistikler.vue -->
<script setup>
import ProgressBar from '../components/stats/ProgressBar.vue';
import StatsCards from '../components/stats/StatsCards.vue';
import LastWeek from '../components/stats/LastWeek.vue';
import BadgesGrid from '../components/badges/BadgesGrid.vue';
import ResetStats from '../components/stats/ResetStats.vue'
</script>

<template>
    <div class="container">
      <ProgressBar />
      <StatsCards />
      <LastWeek />
      <BadgesGrid />
      <ResetStats />
    </div>
</template>

<style scoped>
.container {
  padding: 1rem;
  max-width: var(--max-width);
  margin: 0 auto;
}
</style>
