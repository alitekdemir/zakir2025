<!-- src/components/dualar/tr/dua-tr-entesselam.vue -->
<script setup>
import { dualar } from '../../../assets/dualar.js'
import { useScriptStyle } from '../../../assets/useScriptStyle.js'

const { selam } = dualar
const { scriptStyle } = useScriptStyle()
</script>


<template>

    <div class="flex-container wrap" :class="scriptStyle">
      <span v-for="(line, index) in (scriptStyle === 'latin' ? selam.latin : selam.arabic)" :key="index"
        :class="scriptStyle">
        {{ line }}
      </span>
    </div>
</template>


<style scoped>

</style>