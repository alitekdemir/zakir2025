<script setup>
import { ref } from 'vue'

const activeContent = ref(null)

const toggleContent = (type) => {
  activeContent.value = activeContent.value === type ? null : type
}

</script>

<template>
  <div class="flex-container column">

    <div class="flex-container wrap">
      <button v-for="(btn, type) in {
        sabah: { icon: 'wb_sunny', text: 'Sabah' },
        aksam: { icon: 'nights_stay', text: 'Akşam' }
      }" 
        :key="type"
        :class="['buton', { active: activeContent === type }]"
        @click="toggleContent(type)"
      >
        <i class="material-symbols">{{ btn.icon }}</i>
        {{ btn.text }}
      </button>
    </div>

    <Transition name="fade" mode="out-in">
      <div v-if="activeContent" class="vird-content">
        <div v-if="activeContent === 'sabah'" class="content-section">
          <div class="flex-container section">
            <p class="text-paragraph">
              <span class="text-segment">Allahümme innâ nukaddimu ileyke</span>
              <span class="text-segment">beyne yedey</span>
              <span class="text-segment">külli nefesin</span>
              <span class="text-segment">ve lemhatin</span>
              <span class="text-segment">ve lahzatin</span>
              <span class="text-segment">ve tarfetin</span>
              <span class="text-segment">yatrifu bihâ ehlü's-semâvâti</span>
              <span class="text-segment">ve ehlü'l-aradîn</span>
              <span class="text-segment">şehâdeten eşhedü en</span>
            </p>
          </div>


          <div class="flex-container section">
            <p class="text-paragraph">
              <p class="divider-line">"Şimdi 9 defa"</p>
              <span class="text-segment">Lâ ilâhe illallâhü vahdehü lâ şerîke leh</span>
              <span class="text-segment">lehül mülkü ve lehül ḥamdü</span>
              <span class="text-segment">yuḥyî ve yümît,</span>
              <span class="text-segment special-line">ve hüve ḥayyün lâ yemût</span>
              <span class="text-segment">biyedihil ḥayr</span>
              <span class="text-segment">ve hüve alâ külli şey’in kadîr</span>
            </p>
          </div>

          <p class="text-paragraph">
            <p class="divider-line">"10. okuyuş"</p>
            <span class="text-segment">Lâ ilâhe illallâhü vahdehü lâ şerîke leh</span>
            <span class="text-segment">lehül mülkü ve lehül ḥamdü</span>
            <span class="text-segment">yuḥyî ve yümît,</span>
            <span class="text-segment special-line">ve hüve ḥayyün lâ yemût</span>
            <span class="text-segment">biyedihil ḥayr</span>
            <span class="text-segment">ve hüve alâ külli şey’in kadîr</span>
            <span class="text-segment special-line">ve ileyhil masîr</span>
          </p>
        </div>

        <div v-else class="content-section">
          <div class="flex-container section">
            <p class="text-paragraph">
              <span class="text-segment">Amenna bi-ennehü</span>
            </p>
          </div>


          <div class="flex-container section">
            <p class="text-paragraph">
            <div class="divider-line">"Şimdi 9 defa"</div>
            <span class="text-segment">Lâ ilâhe illallâhü vahdehü lâ şerîke leh</span>
            <span class="text-segment">lehül mülkü ve lehül ḥamdü</span>
            <span class="text-segment">yuḥyî ve yümît,</span>
            <span class="text-segment special-line empty">&nbsp;</span>
            <span class="text-segment">biyedihil ḥayr</span>
            <span class="text-segment">ve hüve alâ külli şey’in kadîr</span>
            </p>
          </div>

          <p class="text-paragraph">
          <div class="divider-line">"10. okuyuş"</div>
          <span class="text-segment">Lâ ilâhe illallâhü vahdehü lâ şerîke leh</span>
          <span class="text-segment">lehül mülkü ve lehül ḥamdü</span>
          <span class="text-segment">yuḥyî ve yümît,</span>
          <span class="text-segment special-line">ve hüve ḥayyün lâ yemût</span>
          <span class="text-segment">biyedihil ḥayr</span>
          <span class="text-segment">ve hüve alâ külli şey’in kadîr</span>
          <span class="text-segment special-line">ve ileyhil masîr</span>
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>

.buton.active {
  background: var(--primary);
  color: white;
}

.section {
  min-height: 160px;
}

.text-segment {
  display: inline-block;
  padding: 0 0px;
  line-height: 1rem;
}

.special-line {
  color: var(--primary);
  display: block;
  text-align: center;
  min-height: 1rem;
  /* font-weight: 500; */
}


.special-line.empty {
  opacity: 0;
}

.text-paragraph{
  line-height: 1.6rem;
}

.vird-container {
  background: white;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}



.divider-line {
  position: relative;
  text-align: center;
  color: darkgray;
  font-style: italic;
  font-size: 0.9em;
  margin: 1rem 0;
  border-bottom: 1px solid #DDD;
  padding-bottom: 0.5rem;
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