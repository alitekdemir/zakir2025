<script setup>
import { ref, computed } from 'vue'

const count = ref(0)

const greenIndexes = computed(() => {
  if (count.value < 33) return []
  if (count.value < 66) return [0]
  if (count.value < 99) return [0, 1]
  return [0, 1, 2]
})

const increment = () => {
  count.value = count.value === 99 ? 1 : count.value + 1
}
</script>

<template>
  <div class="tesbih-container">
    <div class="flex-container">
      <div class="text-line">
        <span class="text-prefix">Zül Celâli</span>
        <span class="text-main" :class="{ 'text-success': greenIndexes.includes(0) }">
          Subḥânallâh
        </span>
      </div>
      <div class="text-line">
        <span class="text-prefix">Zül Kemali</span>
        <span class="text-main" :class="{ 'text-success': greenIndexes.includes(1) }">
          Elhamdülillâh
        </span>
      </div>
      <div class="text-line">
        <span class="text-prefix">Zül Kudreti</span>
        <span class="text-main" :class="{ 'text-success': greenIndexes.includes(2) }">
          Allâhu ekber
        </span>
      </div>
    </div>

    <div class="counter-button" @click="increment">
      {{ count }}
    </div>
  </div>
</template>

<style scoped>
.tesbih-container {
  display: flex;
}

.flex-container {
  display: flex;
  flex-direction: column;
  /* gap: 0.25rem; */
  align-items: flex-start;
}

.text-line {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.text-prefix {
  color: var(--text-dark);
  /* font-size: 1rem; */
}

.text-main {
  color: var(--primary);
  /* font-size: 1rem; */
  font-weight: 500;
  transition: color 0.3s ease;
}

.text-success {
  color: #4CAF50;
}

.counter-button {
  min-width: 5rem;
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
}

.counter-button:hover {
  border-color: var(--primary);
}
</style>