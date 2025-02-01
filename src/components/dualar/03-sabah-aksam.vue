<script setup>
import { ref } from 'vue'
import { dualar } from '../../assets/dualar.js'
import { useScriptStyle } from '../../assets/useScriptStyle.js'
import { useTevhidVibration } from '../../assets/vibrate'

const { nukaddimu, amenna, tevhid } = dualar
const { scriptStyle } = useScriptStyle()
const activeTab = ref(null)

const count = ref(0)
// const increment = () => { count.value = count.value >= 10 ? 1 : count.value + 1 }
const increment = () => {
  const newCount = count.value === 10 ? 1 : count.value + 1
  useTevhidVibration(newCount)
  count.value = newCount
}

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
  
      <div class="counter-button buton" @click="increment" :class="{ 'green': count === 10 }">{{ count }}</div>
    </div>
  
    <div class="flex-container column">
      <Transition name="fade" mode="out-in">
        <div v-if="activeTab" class="tab-content">
          <!-- SABAH İÇERİĞİ -->
          <template v-if="activeTab === 'sabah'">
            <div class="content-section">
              <div class="flex-container section" :class="scriptStyle">
                <p class="flex-container wrap" :class="[scriptStyle]">
                  <span v-for="line in nukaddimu[scriptStyle]" :key="line.text" :class="[scriptStyle]">
                    {{ line.text }}
                  </span>
                </p>
              </div>
  
              <p class="divider">
                <strong>10 defa okunur</strong>
              </p>
              
              <p class="flex-container wrap" :class="[scriptStyle]">
                <template v-for="line in tevhid[scriptStyle]" :key="line.text">
                  <span v-if="!line.last" :class="{ 'special-line': line.emphasis }">
                    {{ line.text }}
                  </span>
                </template>
              </p>
  
              <p class="divider">Sonuncuda eklenir</p>
              <div class="flex-container wrap" :class="[scriptStyle]">
                <template v-for="line in tevhid[scriptStyle]" :key="line.text">
                  <span v-if="line.last" :class="{ 'special-line': line.emphasis, 'blue': line.last }">
                    {{ line.text }}
                  </span>
                </template>
              </div>
            </div>
          </template>
  
          <!-- AKŞAM İÇERİĞİ -->
        <template v-if="activeTab === 'aksam'">
          <div class="content-section">
            <div class="flex-container section" :class="scriptStyle">
              <p class="flex-container wrap" :class="[scriptStyle]">
                <span v-for="line in amenna[scriptStyle]" :key="line.text" :class="[scriptStyle]">
                  {{ line.text }}
                </span>
              </p>
            </div>

            <p class="divider"><strong>9 defa okunur</strong></p>
            <p class="flex-container wrap" :class="[scriptStyle]">
              <template v-for="line in tevhid[scriptStyle]" :key="line.text">
                <span v-if="!line.last && !line.emphasis" 
                  :class="{ [scriptStyle]: true, 'special-line': line.emphasis, 'empty': line.emphasis }">
                  {{ line.text }}
                </span>
              </template>
            </p>

            <p class="divider"><strong>10. okuyuş</strong></p>
            <p class="flex-container wrap" :class="[scriptStyle]">
              <span v-for="line in tevhid[scriptStyle]" :key="line.text"
                :class="{ 'special-line': line.emphasis, 'blue': line.last }">
                {{ line.text }}
              </span>
            </p>
          </div>
        </template>

        </div>
      </Transition>
    </div>
  </template>
  

<style scoped>

.divider{text-align:left;}
.special-line { 
  color: var(--primary); 
  width: 100%; 
}
.special-line.empty { opacity: 0; }

.counter-button {
  min-width: 4rem;
  height: 2.25rem;
  font-size: 2rem;
  margin: 0;
}

.counter-button.green {
  background-color: #8bd867;
  color: white;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

</style>


