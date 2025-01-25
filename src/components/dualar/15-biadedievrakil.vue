<!-- src/components/dualar/15-biadedievrakil.vue -->
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
            <span v-if="item.type === 'break'" class="line-break"></span>
            <span v-if="item.color === 'red'" class="line-break red">{{ item.text }}</span>
            <!-- Normal metin gösterimi -->
            <span v-else :class="[item.color]">{{ item.text }}</span>
        </template>
    </div>
</template>

<style scoped>
.line-break {width: 100%; line-height: 1rem; height: 1rem;}
</style>
