<script setup>
import { ref } from 'vue'

const activeContent = ref('sabah') // 'sabah' veya 'aksam'
</script>



<template>
  <div class="vird-container">

    <!-- Buton Grubu -->
    <div class="button-group">
      <button :class="['vird-btn', { active: activeContent === 'sabah' }]" @click="activeContent = 'sabah'">
        <i class="material-icons">wb_sunny</i>
        Sabahları
      </button>

      <button :class="['vird-btn', { active: activeContent === 'aksam' }]" @click="activeContent = 'aksam'">
        <i class="material-icons">nights_stay</i>
        Akşamları
      </button>
    </div>

    <!-- İçerik Alanı -->
    <Transition name="fade" mode="out-in">
      <div v-if="activeContent === 'sabah'" class="vird-content">
        <!-- Sabah virdi içeriği -->
        <p class="text-paragraph latin dua">
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

        <q class="blockquote" dir="ltr">Dedikten sonra 9 defa okunur</q>
        <p class="text-paragraph latin tevhid">
          <span class="text-segment">Lâ ilâhe illallâhü vahdehü lâ şerîke leh</span>
          <span class="text-segment">lehül mülkü ve lehül ḥamdü</span>
          <span class="text-segment">yuḥyî ve yümît,</span>
          <span class="text-segment"><strong>ve hüve ḥayyün lâ yemût</strong></span>
          <span class="text-segment">biyedihil ḥayr</span>
          <span class="text-segment">ve hüve alâ külli şey’in kadîr</span>
        </p>
        <q class="blockquote" dir="ltr">10. okuyuşta en son denir</q>
        <span class="text-segment">ve ileyhil masîr</span>

      </div>
      <div v-else class="vird-content">
        <!-- Akşam virdi içeriği -->
        <p class="text-paragraph latin dua">
          <span class="text-segment">Amenna bi-ennehü</span>
        </p>

        <q class="blockquote" dir="ltr">Dedikten sonra 9 defa okunur</q>
        <p class="text-paragraph latin tevhid">
          <span class="text-segment">Lâ ilâhe illallâhü vahdehü lâ şerîke leh</span>
          <span class="text-segment">lehül mülkü ve lehül ḥamdü</span>
          <span class="text-segment">yuḥyî ve yümît,</span>
          <span class="text-segment">&nbsp</span>
          <span class="text-segment">biyedihil ḥayr</span>
          <span class="text-segment">ve hüve alâ külli şey’in kadîr</span>
        </p>
        <q class="blockquote" dir="ltr">10. okuyuşta en son denir</q>
        <span class="text-segment">ve ileyhil masîr</span>
      </div>
    </Transition>
  </div>
</template>

<style>
.text-paragraph {
    /* Metni ortala */
    text-align: center;
    /* Satır yüksekliği */
    /* line-height: 1.5; */
}

.text-segment {
    /* Blok düzeyinde metin düzeni */
    display: inline-block;
    /* Sağ tarafa boşluk */
    margin-right: 0.25rem;
}

.text-segment:last-child {
    /* Son elemanda boşluk bırakma */
    margin-right: 0;
}

.text-paragraph.latin.dua{
  min-height: 200px;
}
</style>

<style scoped>

.vird-container {
  background: white;
  border-radius: 16px;
  padding: 1rem;
  border: 1px solid rgba(255, 82, 82, 0.2);
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
}

.vird-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--primary);
  background: transparent;
  color: var(--primary);
  transition: all 0.2s ease;
}

.vird-btn.active {
  background: var(--primary);
  color: white;
}

.vird-content {
  min-height: 300px;
  /* Sabit yükseklik */
  text-align: center;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
