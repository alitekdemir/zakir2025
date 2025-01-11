<!-- src/components/dualar/03-sabah-aksam.vue -->
<script setup>
import { ref } from 'vue'
import { dualar } from '../../assets/dualar.js'
import { useScriptStyle } from '../../assets/useScriptStyle.js'

const { nukaddimu, amenna, tevhid } = dualar
const { scriptStyle } = useScriptStyle()
const activeTab = ref(null)

const count = ref(0)
const increment = () => { count.value = count.value >= 10 ? 1 : count.value + 1 }
</script>

<template>
      <!-- Tab Butonları -->
      <div class="flex-container wrap">
      <button 
        class="buton"
        :class="{ active: activeTab === 'sabah' }"
        @click="activeTab = activeTab === 'sabah' ? null : 'sabah'"
      >
        <i class="material-symbols">input_circle</i>
        Sabah
      </button>
      
      <button 
        class="buton"
        :class="{ active: activeTab === 'aksam' }"
        @click="activeTab = activeTab === 'aksam' ? null : 'aksam'"
      >
        <i class="material-symbols">output_circle</i>
        Akşam
      </button>

      <button 
        class="buton counter-button" 
        :class="{ 'green': count === 10 }"
        @click="increment"
      >
        {{ count }}
      </button>
    </div>

    <div class="flex-container column">
   
    <!-- İçerik Alanı -->
    <Transition name="fade" mode="out-in">
      <div v-if="activeTab" class="tab-content">
        <div class="content-section">
          <!-- Giriş Duası -->
          <div class="flex-container section" :class="scriptStyle">
            <p class="flex-container wrap" :class="[scriptStyle]">
              <span
                v-for="line in (activeTab === 'sabah' ? nukaddimu : amenna)[scriptStyle]"
                :key="line.text"
                :class="[scriptStyle]"
              >
                {{ line.text }}
              </span>
            </p>
          </div>

          <!-- 9 Defa -->
          <p class="divider"><strong>Şimdi 9 defa</strong></p>
          <p class="flex-container wrap" :class="[scriptStyle]">
            <template v-for="line in tevhid[scriptStyle]" :key="line.text">
              <span 
                v-if="!line.last" 
                :class="{
                  [scriptStyle]: true,
                  'special-line': line.emphasis,
                  'empty': activeTab === 'aksam' && line.emphasis,
                }"
              >
                {{ line.text }}
              </span>
            </template>
          </p>

          <!-- 10. Okuyuş -->
          <p class="divider"><strong>10. okuyuş</strong></p>
          <p class="flex-container wrap" :class="[scriptStyle]">
            <span 
              v-for="line in tevhid[scriptStyle]"
              :key="line.text"
              :class="{ 
                'special-line': line.emphasis, 
                'blue': line.last 
              }"
            >
              {{ line.text }}
            </span>
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>
   
<style scoped>
.special-line { 
  color: var(--primary); 
  width: 100%; }
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

/* Arabic script için yükseklik değerleri */
/* Temel yükseklikler */
.section.arabic { min-height: 208px; }
.section.latin { min-height: 180px; }


@media (min-width: 370px) {
  .section.arabic { min-height: 172px; }
}

@media (min-width: 420px) {
  .section.latin { min-height: 120px; }
}

</style>
