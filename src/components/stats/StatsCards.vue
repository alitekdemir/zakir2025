<!-- src/components/stats/StatsCards.vue -->
<script setup>
import { useStatsStore } from '../../assets/statsStore.js'
const stats = useStatsStore()
</script>

<template>
    <h1>İstatistikler</h1>
  <div class="stats-grid">
    <div class="stat-box">
      <div class="stat-icon">⏱️</div>
      <div class="stat-content">
        <h4>Kullanım Süresi</h4>
        <p>{{ stats.getFormattedScreenTime }}</p>
      </div>
    </div>

    <div class="stat-box">
      <div class="stat-icon">📅</div>
      <div class="stat-content">
        <h4>Başlangıç</h4>
        <p>{{ stats.getDaysFromFirstUse }} gün önce</p>
      </div>
    </div>

    <div class="stat-box">
      <div class="stat-icon">🔥</div>
      <div class="stat-content">
        <h4>Kesintisiz Kullanım</h4>
        <p>{{ stats.streak }} gün</p>
      </div>
    </div>

    <div class="stat-box">
      <div class="stat-icon">📊</div>
      <div class="stat-content">
        <h4>Haftalık Tesbihat</h4>
        <p>{{ stats.weeklyTesbihatCount }} kez</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-grid {
  display: grid;
  gap: 0.5rem;
  margin: 1rem 0;
}

.stat-box {
  background: var(--surface);
  border-radius: 1rem;
  padding: 0.95rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s ease;
  border: 1px solid var(--primary-light);
}

.stat-box:hover {
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 2rem;
  color: var(--primary);
}

.stat-content h4 {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: normal;
}

.stat-content p {
  margin: 0.5rem 0 0;
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: bold;
}

/* Responsive Grid */
@media (min-width: 581px) {
  .stats-grid { grid-template-columns: repeat(4, 1fr); }
}

@media (min-width: 301px) and (max-width: 580px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 300px) {
  .stats-grid { grid-template-columns: 1fr; }
}

@media (max-width: 400px) {
  .stat-icon { font-size: 1.5rem; }
}

@media (max-width: 300px) {
  .stat-icon { font-size: 1.25rem; }
}

@media (max-width: 160px) {
  .stat-box { padding: 0.5rem; }
  .stat-icon { font-size: 0.9rem; }
  .stat-content h4 { font-size: 0.7rem; }
  .stat-content p { font-size: 0.9rem; }
}
</style>
