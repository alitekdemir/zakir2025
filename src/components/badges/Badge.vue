<!-- src/components/badges/Badge.vue -->
<script setup>
const props = defineProps({
  id: String,
  title: String,
  description: String,
  isAchieved: Boolean,
  progress: Number
})

defineEmits(['click'])
</script>

<template>
  <div 
    class="badge" 
    :class="{  
      'achieved': isAchieved,
      'not-achieved': !isAchieved
    }"
    @click="$emit('click')"
  >
    <div class="badge-icon">
      <slot></slot>
    </div>
    <div class="badge-info">
      <h3>{{ title }}</h3>
      <div class="progress-bar">
        <div 
          class="progress" 
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge {
  background: var(--surface);
  border-radius: 1rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.badge:hover {
  transform: translateY(-2px);
}

.badge.achieved {
  border-color: var(--primary);
  background: var(--surface);
  opacity: 1;
}

.badge.not-achieved {
  opacity: 0.5;
  /* border-color: var(--border-color); */
}

.badge-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible; /* Eklendi */
}

.badge-icon :deep(svg) {
  width: 48px;
  height: 48px;
  object-fit: contain; /* Eklendi */
}

.badge-info {
  text-align: center;
  width: 100%;
}

.badge-info h3 {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.progress-bar {
  height: 4px;
  background: var(--surface-variant);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress {
  height: 100%;
  background: var(--primary);
  transition: width 0.3s ease;
}

.achieved .progress {
  background: var(--success-color, #4CAF50);
}
</style>
