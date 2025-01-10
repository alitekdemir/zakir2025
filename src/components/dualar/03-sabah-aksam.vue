<!-- src/components/dualar/03-sabah-aksam.vue -->
<script setup>
import { ref } from 'vue'
import { dualar } from '../../assets/dualar.js'
import { useScriptStyle } from '../../assets/useScriptStyle.js'

const { nukaddimu, amenna, tevhid } = dualar
const { scriptStyle } = useScriptStyle()
const activeTab = ref(null)

const tabs = {
  sabah: { icon: 'wb_sunny', text: 'Sabah' },
  aksam: { icon: 'nights_stay', text: 'Akşam' }
}

</script>

<template>
    <div class="flex-container column">
    <!-- Tab Butonları -->
    <div class="flex-container wrap">
      <button 
        v-for="(btn, type) in tabs"
        :key="type"
        :class="['buton', { active: activeTab === type }]"
        @click="activeTab = activeTab === type ? null : type"
      >
        <i class="material-icons">{{ btn.icon }}</i>
        {{ btn.text }}
      </button>
    </div>
   
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
                <span v-if="!line.last" 
                :class="{scriptStyle,
                  'special-line': line.emphasis,
                  'empty': activeTab === 'aksam' && line.emphasis,
                }">
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
                  'blue': line.last }"
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
