<!-- src/components/dualar/15-sallivesellim.vue -->
<script setup>
import { dualar } from '../dualar.js'
import { useScriptStyle } from '../../../assets/useScriptStyle.js'

const { sallisellim } = dualar
const { scriptStyle } = useScriptStyle()
</script>

<template>
    <div class="flex-container wrap" :class="scriptStyle">
        <span 
            v-for="(item, index) in sallisellim[scriptStyle]" 
            :key="index"
            :class="[item.color]"
        >
        {{ item.text }}
    </span>
    </div>
</template>
