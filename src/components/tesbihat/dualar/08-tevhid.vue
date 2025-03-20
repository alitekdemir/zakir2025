<!-- src/components/tesbihat/dualar/08-tevhid.vue -->
<script setup>
import { dualar } from '../dualar.js'
import { useScriptStyle } from '../../../assets/useScriptStyle.js'

const { tevhid } = dualar
const { scriptStyle } = useScriptStyle()

</script>

<template>
    <div class="flex-container wrap" :class="scriptStyle">
        <span 
            v-for="line in tevhid[scriptStyle]"
            :key="line.text || line"
            :class="{'special-line': line.emphasis || line.last}"
        >
        {{ line.text || line }}
        </span>
    </div>
    
</template>

<style scoped>
.special-line { color: var(--primary); width: 100%; }
</style>
