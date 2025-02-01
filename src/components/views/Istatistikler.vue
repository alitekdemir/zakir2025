<!-- src/components/Istatistikler.vue -->
<script setup>
import ProgressBar from '../stats/ProgressBar.vue';
import StatsCards from '../stats/StatsCards.vue';
import LastWeek from '../stats/LastWeek.vue';
import BadgesGrid from '../badges/BadgesGrid.vue';
import ResetStats from '../stats/ResetStats.vue'
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
