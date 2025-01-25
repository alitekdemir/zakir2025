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
      <span class="emphasis" :class="scriptStyle">
        {{ line.text }}
        <!-- <span v-if="index === 0" class="material-symbols icon">mail</span>
        <span v-if="index === 1" class="material-symbols icon">favorite</span>
        <span v-if="index === 2" class="material-symbols icon">verified</span> -->
        <span v-if="index === 0" class="icon">💌</span>
        <span v-if="index === 1" class="icon">❤</span>
        <span v-if="index === 2" class="icon">👌</span>
      </span>
    </template>
  </div>
  <!-- <span v-if="index === 0" class="icon">'✉🖃📧💌❤👌'</span> -->
</template>

<style scoped>
.icon {font-size: 1.25rem; color: crimson;}
</style>
