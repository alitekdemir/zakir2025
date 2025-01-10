<!-- src/components/ProgressBar.vue -->
<script setup>
import { ref, onMounted, watch } from 'vue'
// import { widgetWeights } from '../assets/widgetData';
import { useProgress, widgetWeights } from '../assets/useProgress';

const { progress: score } = useProgress();
const progress = ref(0);
const totalWeight = Object.values(widgetWeights).reduce((sum, weight) => sum + weight, 0);

// Progress yüzdesini hesapla
watch(score, (newScore) => {
  progress.value = (newScore / totalWeight) * 100;
  if (progress.value > 100) progress.value = 100;
});

// İlk yüklemede mevcut ilerlemeyi hesapla
onMounted(() => {
  const currentScore = parseInt(localStorage.getItem('memorization-score') || '0');
  progress.value = (currentScore / totalWeight) * 100;
});
</script>

<template>
  <div class="progress-container">
    <div class="progress-stats">
      <span class="progress-text">Ezberleme İlerlemesi</span>
      <span class="progress-percentage">{{ Math.round(progress) }}%</span>
    </div>
    <div class="progress-bar">
      <div 
        class="progress-fill"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.progress-container {
  width: 100%;
  max-width: 600px;
  margin: 1rem auto;
  padding: 0 0.25rem;
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.progress-text {
  font-size: 0.9rem;
  color: #666;
}

.progress-percentage {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgb(76, 0, 130);
}

.progress-bar {
  width: 100%;
  height: 0.5rem;
  background: #f0f0f0;
  border-radius: 0.25rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: rgb(76, 0, 130);
  border-radius: 0.25rem;
  transition: width 0.3s ease;
}
</style>
