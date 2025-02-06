<!-- src/components/dualar/09-dua.vue -->
<script setup>
import { dualar } from '../dualar.js'
import { useScriptStyle } from '../../../assets/useScriptStyle.js'

const { dua } = dualar
const { scriptStyle } = useScriptStyle()
</script>

<template>
   <div class="flex-container column">
       <!-- El işaretleri -->
       <div>
           <span class="material-symbols icon">back_hand</span>
           <span class="material-symbols icon mirror">back_hand</span>
       </div>

       <!-- Dua metni -->
       <span v-for="item in dua[scriptStyle]" 
            :key="item.title" 
            :class="scriptStyle">
        {{ item.title }}
        </span>

       <!-- Bilgilendirme -->
       <small class="info-text">
           Burada herkes elini açar, dua ve taleb eder.
       </small>
   </div>
</template>

<style scoped>
</style>