<script setup>
const activeContent = ref(null)
const toggleContent = (type) => {
  activeContent.value = activeContent.value === type ? null : type
}
const commonContent = {
  sabah: {
    first: [
      'Allahümme innâ nukaddimu ileyke',
      'beyne yedey külli nefesin',
      've lemhatin ve lahzatin ve tarfetin',
      "yatrifu bihâ ehlü's-semâvâti",
      "ve ehlü'l-aradîn",
      "şehâdeten eşhedü en"
    ],
    repeat: [
      "Lâ ilâhe illallâhü vahdehü lâ şerîke leh",
      "lehül mülkü ve lehül ḥamdü",
      "yuḥyî ve yümît,",
      ["ve hüve ḥayyün lâ yemût"], // Bold yapılacak
      "biyedihil ḥayr",
      "ve hüve alâ külli şey'in kadîr"
    ]
  },
  aksam: {
    first: ['Amenna bi-ennehü'],
    repeat: [
      "Lâ ilâhe illallâhü vahdehü lâ şerîke leh",
      "lehül mülkü ve lehül ḥamdü",
      "yuḥyî ve yümît,",
      [], // Boş satır
      "biyedihil ḥayr",
      "ve hüve alâ külli şey'in kadîr"
    ]
  },
  last: "ve ileyhil masîr"
}

</script>

<template>
  <div class="vird-container">
    <div class="button-group">
      <button v-for="(btn, type) in {
        sabah: { icon: 'wb_sunny', text: 'Sabah' },
        aksam: { icon: 'nights_stay', text: 'Akşam' }
      }" 
        :key="type"
        :class="['vird-btn', { active: activeContent === type }]"
        @click="toggleContent(type)"
      >
        <i class="material-symbols">{{ btn.icon }}</i>
        {{ btn.text }}
      </button>
    </div>
 
    <Transition name="fade" mode="out-in">
      <div v-if="activeContent" class="vird-content">
        <!-- Giriş Bölümü -->
        <div class="section section-1">
          <p class="text-paragraph">
            <template v-if="activeContent === 'sabah'">
              <span v-for="(text, i) in commonContent.sabah.first" 
                    :key="i" 
                    class="text-segment"
              >{{ text }}</span>
            </template>
            <template v-else>
              <span v-for="(text, i) in commonContent.aksam.first"
                    :key="i"
                    class="text-segment"
              >{{ text }}</span>
            </template>
          </p>
        </div>
 
        <!-- 9 defa tekrar -->
        <div class="section section-2">
          <div class="divider-wrapper">
            <span class="divider-text">"(bu cümle 9 defa okunur)"</span>
          </div>
          <p class="text-paragraph">
            <template v-for="(line, i) in commonContent[activeContent].repeat" :key="i">
              <span v-if="Array.isArray(line) && line.length > 0" 
                    class="text-segment special-line">{{ line[0] }}</span>
              <span v-else-if="Array.isArray(line) && line.length === 0" 
                    class="text-segment special-line empty">&nbsp;</span>
              <span v-else 
                    class="text-segment">{{ line }}</span>
            </template>
          </p>
        </div>
 
        <!-- 10. okuyuş -->
        <div class="section">
          <div class="divider-wrapper">
            <span class="divider-text">"(onuncu cümle)"</span>
          </div>
          <p class="text-paragraph">
            <template v-for="(line, i) in commonContent[activeContent].repeat" :key="i">
              <span class="text-segment">{{ Array.isArray(line) ? line[0] : line }}</span>
            </template>
            <span class="text-segment">{{ commonContent.last }}</span>
          </p>
        </div>
      </div>
    </Transition>
  </div>
 </template>
 
 <style>
 .text-segment {
  display: inline-block;
  padding: 0 2px;
 }
 
 .special-line {
  display: block;
  text-align: center;
  min-height: 1rem;
  font-weight: bold;
 }
 
 .special-line.empty {
  opacity: 0;
 }
 
 .section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
 }
 
 .section-1 {
  min-height: 180px;
  justify-content: center;
 }
 
 .section-2 {
  min-height: 160px;
 }
 
 .divider-wrapper {
  position: relative;
  width: 100%;
  text-align: center;
  margin: 1rem 0;
  border-bottom: 1px solid #DDD;
 }
 
 .divider-text {
  position: relative;
  top: 0.7em;
  background: white;
  padding: 0 10px;
  color: #AAA;
  font-style: italic;
  font-size: 0.9em;
 }
 
 .text-paragraph {
  text-align: center;
  line-height: 1.6;
  margin: 0;
  padding: 20px 0;
 }
 </style>
 
 <style scoped>
 .vird-container {
  background: white;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
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
 
 .fade-enter-active,
 .fade-leave-active {
  transition: opacity 0.2s ease;
 }
 
 .fade-enter-from,
 .fade-leave-to {
  opacity: 0;
 }
 </style>