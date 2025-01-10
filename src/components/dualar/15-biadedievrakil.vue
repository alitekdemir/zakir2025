<!-- src/components/dualar/13-biadedievrakil.vue -->
<script setup>
import { dualar } from '../../assets/dualar.js'
import { useScriptStyle } from '../../assets/useScriptStyle.js'

const { biadedievrakil } = dualar
const { scriptStyle } = useScriptStyle()
</script>


<template>
    <div class="flex-container wrap" :class="scriptStyle">
        <template v-for="(item, index) in biadedievrakil[scriptStyle]" :key="index">
            <!-- Eğer type break ise div kullanarak yeni satıra geçiş sağlayalım -->
            <div v-if="item.type === 'break'" class="line-break"></div>
            <!-- Normal metin gösterimi -->
            <span v-else :class="[item.color]">
                {{ item.text }}
            </span>
        </template>
    </div>
</template>

<style scoped>
.red { color: var(--primary); }

/* Satır sonu için yeni stil */
.line-break {
    width: 100%;
}
</style>
