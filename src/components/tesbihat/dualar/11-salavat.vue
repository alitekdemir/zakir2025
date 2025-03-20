<!-- src/components/tesbihat/dualar/11-salavat.vue -->
<script setup>
import { ref } from 'vue'
import { dualar } from '../dualar.js'
import { useScriptStyle } from '../../../assets/useScriptStyle.js'
import { useTevhidVibration } from '../../../assets/vibrate.js'
import rose from '../../../assets/icon_rose.vue'

const { salavatlar } = dualar
const { scriptStyle } = useScriptStyle()
const showSabah = ref(false)

const toggleSabah = () => {
  showSabah.value = !showSabah.value
}

// Sayaç
const count = ref(0)
const increment = () => {
  const newCount = count.value === 10 ? 1 : count.value + 1
  useTevhidVibration(newCount)
  count.value = newCount
}

</script>

<template>
  <div class="flex-container column" :class="scriptStyle">
    <p>
      <span class="text-segment">{{ salavatlar[scriptStyle].ana[0] }}</span>
      <rose class="rose" alt="Gül"/>
      <span class="text-segment">{{ salavatlar[scriptStyle].ana[1] }}</span>
    </p>

    <button class="sabah-btn" @click="toggleSabah">
      <span>{{ salavatlar[scriptStyle].sabah.title }}</span>
      <i class="material-symbols icon">{{ showSabah ? 'expand_less' : 'expand_more' }}</i>
    </button>

    <Transition name="fade">
      <div v-if="showSabah" class="flex-container">
        <div class="flex-col" style="text-align: left">
          <i class="latin info-text" style="text-align: left">{{ salavatlar[scriptStyle].sabah.info }}</i>
          <span v-for="(line, index) in salavatlar[scriptStyle].sabah.lines" 
            :key="index" 
            class="text-segment">
            {{ line }}
          </span>
        </div>
        <button class="counter-button buton" @click="increment" :class="{ 'green': count === 10 }">{{ count }}</button>
      </div>
    </Transition>

    <p>
      <span v-for="(line, index) in salavatlar[scriptStyle].son" 
            :key="index" 
            class="text-segment">
        {{ line }}
      </span>
    </p>
  </div>
</template>


<style scoped>

.text-segment {
  margin-right: 0.25rem;
}

.row {
    flex-direction: row;
}

.icon {
  font-size: 1.25rem;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rose {
  height: 1.5rem;
  width: 1.5rem;
}
.sabah-btn {
  display: inline-flex; 
  align-items: center; /* buton içeriği dikeyde hizalama */
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  border: 1px solid var(--primary);
  color: var(--primary);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: center; /* buton pozisyonu*/
}

.sabah-btn:hover {
  background: var(--primary-light);
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.counter-button {
  height: 100%;
  margin: 0;
}

.counter-button.green {
  background-color: var(--green, #8bd867, brown);
  color: white;
}

</style>
