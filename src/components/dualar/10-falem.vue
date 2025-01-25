<!-- src/components/dualar/10-falem.vue -->
<script setup>
import { ref, computed } from 'vue'
import { dualar } from '../../assets/dualar.js'
import { useScriptStyle } from '../../assets/useScriptStyle'
import { useFalemVibration } from '../../assets/vibrate'

const { falemennehu } = dualar
const { scriptStyle } = useScriptStyle()
const count = ref(0)
const isGreen = computed(() => count.value >= 33)

const increment = () => {
  const newCount = count.value === 100 ? 0 : count.value + 1
  useFalemVibration(newCount)
  count.value = newCount
}
</script>

<template>
    <div class="flex-container">
        <!-- Sol taraf: Metinler -->
        <div class="flex-container column" :class="scriptStyle">
            <span :class="scriptStyle">
                {{ falemennehu[scriptStyle][0].title }}
                <small class="latin info-text" dir="ltr">1 defa</small>
            </span>
            <span :class="[scriptStyle, 'red', { 'green': isGreen }]">
                {{ falemennehu[scriptStyle][0].text }}
                <small class="latin info-text" dir="ltr">33 defa</small>
            </span>
            <span class="latin info-text">Sabah ve Yatsı namazlarında <strong>100 defa</strong> okunabilir</span>
        </div>

        <!-- Sağ taraf: Sayaç - v-vibrate direktifini kaldırdık -->
        <div class="counter-button buton" @click="increment">{{ count }}</div>
    </div>
</template>

<style scoped>
/* .info-text {margin-top: 0.5rem;} */
.latin{text-align: left;}
.flex-container.latin{align-items: flex-start; }
.flex-container.arabic{align-items: flex-end;}
</style>
