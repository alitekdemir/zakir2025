<!-- src/components/dualar/03-sabah-aksam3.vue -->
<script setup>
import { ref } from 'vue'
import { useScriptStyle } from '../../assets/useScriptStyle.js'
import SabahContent from './03_1-sabah.vue'
import AksamContent from './03_2-aksam.vue'

const { scriptStyle } = useScriptStyle()
const activeTab = ref(null)
const count = ref(0)
const increment = () => { count.value = count.value >= 10 ? 1 : count.value + 1 }
</script>

<template>
  <!-- Tab Butonları -->
  <div class="flex-container wrap">
    <button class="buton" :class="{ active: activeTab === 'sabah' }"
      @click="activeTab = activeTab === 'sabah' ? null : 'sabah'">
      <i class="material-symbols">input_circle</i>
      Sabah
    </button>
    
    <button class="buton" :class="{ active: activeTab === 'aksam' }"
      @click="activeTab = activeTab === 'aksam' ? null : 'aksam'">
      <i class="material-symbols">output_circle</i>
      Akşam
    </button>

    <button class="buton counter-button" :class="{ 'green': count === 10 }"
      @click="increment" v-vibrate>
      {{ count }}
    </button>
  </div>

  <div class="flex-container column">
    <!-- İçerik Alanı -->
    <Transition name="fade" mode="out-in">
      <div>
        <SabahContent v-if="activeTab === 'sabah'" :scriptStyle="scriptStyle" />
        <AksamContent v-if="activeTab === 'aksam'" :scriptStyle="scriptStyle" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.special-line.empty { opacity: 0; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
