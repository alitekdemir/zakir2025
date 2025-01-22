<!-- src/components/dualar/12-kesira.vue -->
<script setup>
import { dualar } from '../../assets/dualar.js'
import { useScriptStyle } from '../../assets/useScriptStyle.js'

const { kesira } = dualar
const { scriptStyle } = useScriptStyle()

</script>


<template>
  <div class="flex-container wrap" :class="scriptStyle">
    <div class="info-text">3 defa okunur. ilk ikisinde <span class="red">'kesîrâ'</span>,
      <br>son tekrarda <span class="red">kesîran kesîrâ</span> denir.
    </div>
  
    <hr class="divider">
    
    <template v-for="(line, index) in kesira[scriptStyle]" :key="index">
      <span :class="scriptStyle" v-if="line.suffix" v-html="line.text + line.suffix"></span>
      <span :class="scriptStyle" v-else>{{ line.text }}</span>
    </template>
  </div>

</template>

