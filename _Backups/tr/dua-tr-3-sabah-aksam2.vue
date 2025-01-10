<script setup>
import { ref } from 'vue'

const activeContent = ref(null)
const toggleContent = (type) => activeContent.value = activeContent.value === type ? null : type

const virdContent = {
  sabah: {
    intro: [
      'Allahümme innâ nukaddimu ileyke',
      'beyne yedey',
      'külli nefesin',
      've lemhatin',
      've lahzatin',
      've tarfetin',
      "yatrifu bihâ ehlü's-semâvâti",
      "ve ehlü'l-aradîn",
      'şehâdeten eşhedü en'
    ],
    main: [
      'Lâ ilâhe illallâhü vahdehü lâ şerîke leh',
      'lehül mülkü ve lehül ḥamdü',
      'yuḥyî ve yümît,',
      've hüve ḥayyün lâ yemût',
      'biyedihil ḥayr',
      "ve hüve alâ külli şey'in kadîr"
    ],
    specialLineIndex: 3
  },
  aksam: {
    intro: ['Amenna bi-ennehü'],
    main: [
      'Lâ ilâhe illallâhü vahdehü lâ şerîke leh',
      'lehül mülkü ve lehül ḥamdü',
      'yuḥyî ve yümît,',
      '',
      'biyedihil ḥayr',
      "ve hüve alâ külli şey'in kadîr"
    ],
    specialLineIndex: 3
  }
}
</script>

<template>
  <div class="vird-container">
    <div class="button-group">
      <button 
        v-for="(type, key) in ['sabah', 'aksam']" 
        :key="key"
        :class="['vird-btn', { active: activeContent === type }]" 
        @click="toggleContent(type)"
      >
        <i class="material-icons">
          {{ type === 'sabah' ? 'wb_sunny' : 'nights_stay' }}
        </i>
        {{ type === 'sabah' ? 'Sabahları' : 'Akşamları' }}
      </button>
    </div>

    <Transition name="fade" mode="out-in">
      <div v-if="activeContent" class="vird-content">
        <div class="content-section">
          <div class="section-1">
            <p class="text-paragraph">
              <span 
                v-for="(line, index) in virdContent[activeContent].intro"
                :key="index"
                class="text-segment"
              >
                {{ line }}
              </span>
            </p>
          </div>

          <div class="divider">"Şimdi 9 defa"</div>

          <div class="section-2">
            <p class="text-paragraph">
              <span 
                v-for="(line, index) in virdContent[activeContent].main"
                :key="index"
                :class="[
                  'text-segment',
                  { 
                    'special-line': index === virdContent[activeContent].specialLineIndex,
                    'empty': !line
                  }
                ]"
              >
                <strong v-if="index === virdContent[activeContent].specialLineIndex && line">
                  {{ line }}
                </strong>
                <template v-else>{{ line }}</template>
              </span>
            </p>
          </div>

          <div class="divider">"10. okuyuşta en son denir"</div>
          <span class="text-segment">ve ileyhil masîr</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
.text-segment {
  display: inline-block;
}

.special-line {
  display: block;
  text-align: center;
  margin: 8px 0;
  min-height: 28px;
}

.special-line.empty {
  opacity: 0;
}

.section-1, .section-2 {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.section-1 {
  min-height: 180px;
}

.section-1 .text-paragraph {
  display: block;
  text-align: center;
  padding: 20px 0;
  line-height: 1.6;
  margin: 0;
}

.section-2 {
  min-height: 160px;
}
</style>

<style scoped>
.vird-container {
  background: white;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.content-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

.vird-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 18px;
  border: 1px solid var(--primary);
  background: transparent;
  color: var(--primary);
  transition: all 0.2s ease;
  cursor: pointer;
}

.vird-btn.active {
  background: var(--primary);
  color: white;
}

.divider {
  width: 100%;
  text-align: center;
  color: #AAA;
  font-style: italic;
  margin: 0.5rem 0;
  font-size: 0.9em;
  white-space: nowrap;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>