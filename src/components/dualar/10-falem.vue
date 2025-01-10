<!-- src/components/dualar/10-falem.vue -->
<script setup>
import { ref, computed } from 'vue'
import { dualar } from '../../assets/dualar.js'
import { useScriptStyle } from '../../assets/useScriptStyle'

const { falemennehu } = dualar
const { scriptStyle } = useScriptStyle()
const count = ref(0)
const isGreen = computed(() => count.value >= 33)

const increment = () => {
    count.value = count.value === 100 ? 0 : count.value + 1
}

</script>

<template>
    <div class="flex-container">
        <!-- Sol taraf: Metinler -->
        <div class="flex-container column" :class="scriptStyle">
            <span :class="scriptStyle">
                {{ falemennehu[scriptStyle][0].title }}
                <small class="info-text" dir="ltr">1 defa</small>
            </span>
            <span :class="[scriptStyle, 'red', { 'green': isGreen }]">
                {{ falemennehu[scriptStyle][0].text }}
                <small class="info-text" dir="ltr">33 defa</small>
            </span>
            <div class="info-text">Sabah ve Yatsı namazlarında <strong>100 defa</strong> okunabilir</div>
        </div>

        <!-- Sağ taraf: Sayaç -->
        <div class="counter-button buton" @click="increment">{{ count }}</div>
    </div>

    <!-- Alt bilgi -->
</template>

<style scoped>
/* .info-text {margin-top: 0.5rem;} */
.flex-container.latin{align-items: flex-start;}
.flex-container.arabic{align-items: flex-end;}
</style>