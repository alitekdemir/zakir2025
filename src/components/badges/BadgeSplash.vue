<!-- src/components/badges/BadgeSplash.vue -->
<script setup>
import { defineProps, defineEmits, onMounted } from 'vue'
import { badgeConfigs } from './badgeConfigs'

const props = defineProps({
  badge: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

onMounted(() => {
  // Rozet sesini çal
  if (badgeConfigs[props.badge.id]?.sound) {
    const audio = new Audio(badgeConfigs[props.badge.id].sound)
    try {
      audio.play()
    } catch (error) {
      console.error('Ses çalınamadı:', error)
    }
  }

  // 3 saniye sonra otomatik kapanma
  setTimeout(() => {
    emit('close')
  }, 5000)
})
</script>

<template>
  <div class="splash-overlay">
    <div class="splash-content">
      <h2>Yeni Rozet Kazandın!</h2>
      <div class="badge-animation">
        <component 
          :is="badgeConfigs[badge.id]?.icon"
          :width="96"
          :height="96"
          :fill="'#5EB132'"
        />
      </div>
      <h3>{{ badge.title }}</h3>
      <p>{{ badge.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.splash-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}

.splash-content {
  background: var(--surface);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  animation: scaleIn 0.5s ease;
}

.badge-animation {
  font-size: 4rem;
  margin: 1rem 0;
  /* margin-bottom: 1rem; */
  animation: bounce 1s ease infinite;
}

h2 {
  color: var(--primary);
  margin: 0 0 2.5rem;
}

h3 {
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

p {
  color: var(--text-secondary);
  margin: 0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { 
    transform: scale(0.8);
    opacity: 0;
  }
  to { 
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>
