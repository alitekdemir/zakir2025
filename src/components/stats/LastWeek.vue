<!-- src/components/stats/LastWeek.vue -->
<script setup>
import { computed } from 'vue'
import { useStatsStore } from '../../assets/statsStore.js'

const statsStore = useStatsStore()

const weeklyData = computed(() => {
  const last7Days = {}
  for (let i = 6; i >= 0; i--) {
    const date = new Date(Date.now() - i * 86400000).toISOString().split('T')[0]
    last7Days[date] = statsStore.dailyUsage[date] || 0
  }
  return last7Days
})

const totalMinutes = computed(() => {
  return Object.values(weeklyData.value).reduce((sum, value) => sum + value, 0)
})

const formatDay = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('tr-TR', { weekday: 'short' })
    .replace('.', '')
    .toUpperCase()
}

const formatDuration = (minutes) => {
  return `${minutes}`
}
</script>

<template>
  <div class="usage-chart">
    <h2>Haftalık Aktivite</h2>
    <p>7 Günlük Toplam: {{ totalMinutes }} dakika</p>
    <div class="days-grid">
      <div v-for="(value, date) in weeklyData" :key="date" class="day-column">
        <div class="day-label">{{ formatDay(date) }}</div>
        <div class="duration">{{ formatDuration(value) }}</div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.usage-chart {
  background: var(--surface);
  border-radius: 12px;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid var(--primary-light);
}

h2 {
  margin: 0;
  color: var(--text-primary);
}

p {
  margin: 0 0 1.05rem 0;
  color: var(--text-secondary);
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /* gap: 0.2rem; */
  text-align: center;
}

.day-column {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.day-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.duration {
  font-size: 0.9rem;
  color: var(--text-primary);
  padding: 0.5rem;
  background: var(--surface-alt);
  border-radius: 6px;
}
</style>
