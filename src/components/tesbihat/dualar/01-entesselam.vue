<!-- src/components/tesbihat/dualar/01-entesselam.vue -->
<script setup>
import { dualar } from '../dualar.js'
import { useScriptStyle } from '../../../assets/useScriptStyle.js'

const { selam } = dualar
const { scriptStyle } = useScriptStyle()
</script>



<template>
    <div class="flex-container wrap" :class="scriptStyle">
      <span 
      v-for="(line, index) in selam[scriptStyle]" 
      :key="index"
        :class="scriptStyle">
        {{ line.text }}
      </span>
    </div>
</template>


<style scoped>

</style>