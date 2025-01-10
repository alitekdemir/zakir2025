<!-- src/components/ProgressBar.vue -->
<template>
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: progressValue + '%' }"></div>
      <div class="progress-label">{{ progressValue }}%</div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { overallProgress } from '../assets/progressStore.js'
  
  /**
   * Progress değerini tam sayı olarak yuvarlıyor (örn. % 50)
   */
  const progressValue = computed(() => {
    return overallProgress.value.toFixed(0)
  })
  </script>
  
  <style scoped>
  .progress-bar-container {
    position: relative;
    width: 100%;
    height: 8px;
    background-color: #ddd;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  .progress-bar {
    height: 100%;
    background-color: #1AB800; /* Yeşil */
    border-radius: 4px;
    transition: width 0.3s ease-in-out;
  }
  .progress-label {
    position: absolute;
    top: -22px;
    right: 0;
    font-size: 0.75rem;
    color: #333;
  }
  </style>
  