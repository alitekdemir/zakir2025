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
          :style="{ width: `${Math.round(progress)}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge {
  background: var(--surface);
  border-radius: 1rem;
  padding: 0.75rem;
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
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.badge-icon :deep(svg) {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
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
  height: 0.25rem;
  background: var(--surface-variant);
  border-radius: 0.25rem;
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
