<!-- src/components/dualar/12-kesira.vue -->
<script setup>
import { dualar } from '../../assets/dualar.js'
import { useScriptStyle } from '../../assets/useScriptStyle.js'

const { kesira } = dualar
const { scriptStyle } = useScriptStyle()

</script>


<template>
  <div class="info-text latin">
    3 defa okunur. ilk ikisinde <span class="red">kesîrâ</span>,
    <br>son tekrarda <span class="red">kesîran kesîrâ</span> denir.
  </div>

  <hr class="divider">

  <div class="flex-container wrap" :class="scriptStyle">
      <span 
      v-for="(line, index) in kesira[scriptStyle]" 
      :key="index"
      :class="scriptStyle"
      v-html="line.suffix ? line.text + line.suffix : line.text"
    />
  </div>
</template>
