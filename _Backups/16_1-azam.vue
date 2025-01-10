<!-- src/components/dualar/16_1-azam.vue -->
<script setup>
import { ref, watch } from 'vue'
import { dualar } from '../src/assets/dualar.js'
import { useScriptStyle } from '../src/assets/useScriptStyle.js'

const { ismiazam } = dualar
const { scriptStyle } = useScriptStyle()

const groupedNames = ref([])

// Arapça Ya ve Ya Allah ifadeleri
const arabicPhrases = {
  ya: 'يَا',
  yaAllah: 'يَا اللّٰهُ'
}

const createGroups = () => {
  const names = ismiazam[scriptStyle.value]
  groupedNames.value = []
  for (let i = 0; i < names.length; i += 4) {
    groupedNames.value.push(names.slice(i, i + 4))
  }
}

// Script style değişimini izle
watch(scriptStyle, () => {
  createGroups()
}, { immediate: true })

// Grup bazında ses çalma
const playSound = (groupIndex) => {
  try {
    const audio = new Audio(`/src/assets/audio/azam-${groupIndex + 1}.mp3`)
    audio.play().catch(error => {
      console.error('Ses dosyası yüklenemedi:', error)
    })
  } catch (error) {
    console.error('Ses çalma hatası:', error)
  }
}
</script>

<template>
  <div class="container">
    <div class="grid">
      <div v-for="(group, groupIndex) in groupedNames" 
           :key="groupIndex"
           class="name-group"
           @click="playSound(groupIndex)">
        <div class="group-number">{{ groupIndex + 1 }}.</div>
        <div v-for="name in group" 
             :key="name" 
             class="name-line"
             :class="scriptStyle">
          <span class="ya" :class="scriptStyle">
            {{ scriptStyle === 'latin' ? 'yâ' : arabicPhrases.ya }}
          </span>
          <span class="isim">{{ name }}</span>
          <span class="ya" :class="scriptStyle">
            {{ scriptStyle === 'latin' ? 'yâ Allâh' : arabicPhrases.yaAllah }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 0.2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem;
  justify-items: center;
}

.name-group {
  position: relative;
  width: 100%;
  max-width: 136px;
  padding: 0.5rem;
  border: 1px solid var(--primary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.name-group:hover {
  background-color: var(--primary-light);
}

.name-group:active {
  transform: scale(0.98);
}

.group-number {
  position: absolute;
  top: -0.75rem;
  left: 0.75rem;
  background-color: var(--primary);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.name-line {
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  align-items: center;
  /* padding: 0.25rem 0; */
}

.ya {
  color: var(--text-gray);
  font-size: calc(var(--latin-size) * 0.8);
}

.arabic {
  /* font-size: calc(var(--arabic-size) * 0.85); */
  line-height: calc(var(--arabic-height) * 0.9);
}

.ya.arabic {
  font-size: calc(var(--arabic-size) * 0.85);
  line-height: calc(var(--arabic-height) * 0.9);
}

.isim {
  color: var(--primary);
  font-weight: 500;
}
</style>
