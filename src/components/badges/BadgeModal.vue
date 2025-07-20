<!-- src/components/badges/BadgeModal.vue -->
<script setup>
import { defineProps, defineEmits } from 'vue'
import { badgeConfigs } from './badgeConfigs' 

const props = defineProps({
  badge: {
    type: Object,
    required: true
  },
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const formatDate = (dateString) => {
  if (!dateString) return 'Henüz kazanılmadı'
  return new Date(dateString).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div v-if="show" class="modal-overlay" @click="emit('close')">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="emit('close')">×</button>
      
      <div class="badge-details">
        <h2>{{ badge.title }}</h2>

        <div class="badge-icon">
          <!-- Icon'u component olarak render et -->
          <component 
            :is="badgeConfigs[badge.id]?.icon"
            v-if="badgeConfigs[badge.id]?.icon"
            :width="64"
            :height="64"
          />
        </div>
        
        
        <div class="progress-section">
          <span class="progress-text">{{ Math.round(badge.progress) }}%</span>
          <div class="progress-bar">
            <div 
              class="progress" 
              :style="{ width: `${Math.round(badge.progress)}%` }"
              :class="{ achieved: badge.isAchieved }"
            ></div>
          </div>
        </div>
        <p class="description">{{ badge.description }}</p>

        <div class="achievement-date">
          <span>Kazanılma Tarihi:</span>
          <span>{{ formatDate(badge.achievedDate) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--surface);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 90%;
  /* width: 400px; */
  position: relative;
  /* width: min(--max-width, 60%); */
  /* width: min(var(--max-width), 70vw); */
  width: calc(var(--max-width) * 0.6);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
}

.badge-details {
  text-align: center;
}

.badge-icon {
  width: 4rem;
  height: 4rem;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-icon :deep(svg) {
  width: 4rem;
  height: 4rem;
  object-fit: contain;
}

h2 {
  margin: 0 0 0.5rem;
  color: var(--text-primary);
}

.description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.progress-section {
  margin: 1rem 0;
}

.progress-bar {
  height: 0.5rem;
  background: var(--surface-variant);
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.progress {
  height: 100%;
  background: var(--primary);
  transition: width 0.3s ease;
}

.progress.achieved {
  background: var(--success-color, #4CAF50);
}

.progress-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.achievement-date {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 0.9rem;
}
</style>
