<!-- src/components/tesbihat/dualar/07-tesbih.vue -->
<script setup>
import { ref, computed } from 'vue'
import { dualar } from '../dualar.js'
import { useScriptStyle } from '../../../assets/useScriptStyle.js'
import { useTesbihVibration } from '../../../assets/vibrate.js'

const { tesbih } = dualar
const { scriptStyle } = useScriptStyle()
const count = ref(0)

const greenIndexes = computed(() => {
  if (count.value < 33) return []
  if (count.value < 66) return [0]
  if (count.value < 99) return [0, 1]
  return [0, 1, 2]
})

const increment = () => {
  const newCount = count.value === 99 ? 1 : count.value + 1
  useTesbihVibration(newCount)
  count.value = newCount
}
</script>


<template>
  <div class="flex-container">
    <!-- Sol taraf: Metinler -->
    <div class="flex-container column">
      <div v-for="(item, index) in tesbih[scriptStyle]" :key="index">
        <span :class="scriptStyle">{{ item.title }}&nbsp;</span>
        <span :class="[scriptStyle, 'red', { 'green': greenIndexes.includes(index) }]">
          {{ item.text }}
        </span>
      </div>
    </div>

    <div class="counter-button buton" @click="increment">{{ count }}</div>
  </div>
</template>


<style scoped>
.flex-container{align-items: flex-start;}
.flex-container.arabic{align-items: flex-end;}
</style>