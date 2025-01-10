<script setup>
import { ref, computed } from 'vue'

const count = ref(0)

// 33'ten sonra yeşil olacak
const isGreen = computed(() => count.value >= 33)

const increment = () => {
  count.value = count.value === 100 ? 0 : count.value + 1
}
</script>

<template>
  <div class="tesbih-wrapper">
    <div class="tesbih-container">
      <div class="flex-container">
        <div class="text-line">
          <span class="text-prefix">Fa'lem ennehü <i class="info-text">1 defa</i></span>
          <span class="text-main" :class="{ 'text-success': isGreen }">
            Lâ ilâhe illallâh
          </span>
        </div>
      </div>

      <div class="counter-button" @click="increment">
        {{ count }}
      </div>
    </div>
    <small class="info-text">Sabah ve Yatsı namazlarında 100 defa okunabilir</small>
  </div>
</template>

<style scoped>
.tesbih-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tesbih-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.flex-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-start;
}

.text-line {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  line-height: 1rem;
}

.text-prefix {
  color: var(--text-dark);
}

.text-main {
  color: var(--primary);
  font-weight: 500;
  transition: color 0.3s ease;
}

.text-success {
  color: #4CAF50;
}

.counter-button {
  min-width: 5rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-light);
  border-radius: 4px;
  font-size: 2rem;
  color: var(--primary);
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  padding: 0.5rem;
}

.counter-button:hover {
  border-color: var(--primary);
}

</style>