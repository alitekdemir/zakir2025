<!-- src/components/dualar/05-subhanallahi.vue -->
<script setup>
import { dualar } from '../../assets/dualar.js'
import { useScriptStyle } from '../../assets/useScriptStyle.js'

const { subhanallahi } = dualar
const { scriptStyle } = useScriptStyle()

</script>

<template>
    <p class="flex-container wrap" :class="scriptStyle">
        <span 
            v-for="line in subhanallahi[scriptStyle]"
            :key="line.text || line"
            :class="{'special-line': line.emphasis || line.last}"
        >
        {{ line.text || line }}
        </span>
    </p>
    
</template>

<style scoped>
.special-line { color: var(--primary); width: 100%; }
</style>
