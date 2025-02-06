<!-- src/components/dualar/14-elfu.vue -->
<script setup>
import { dualar } from '../../assets/dualar.js'
import { useScriptStyle } from '../../assets/useScriptStyle.js'

const { elfu } = dualar
const { scriptStyle } = useScriptStyle()
</script>

<template>
  <div class="flex-container column" :class="scriptStyle">
    <template v-for="(line, index) in elfu[scriptStyle].slice(1)">
      <span :class="scriptStyle">{{ elfu[scriptStyle][0].text }}</span>
      <span class="emphasis" :class="scriptStyle">{{ line.text }}</span>
    </template>
  </div>
</template>


<style scoped>
.emphasis{
  color:var(--primary);
}
</style>

