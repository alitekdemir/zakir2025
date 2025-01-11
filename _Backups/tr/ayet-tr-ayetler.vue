<script setup>
import { ref } from 'vue'
import Modal from '../../Modal.vue'

// SURELER
import AyetTrFetih from '../../dualar/tr/ayet-tr-fetih.vue'
import AyetTrHasir from '../../dualar/tr/ayet-tr-hasr.vue'
import AyetTrNebe from '../../dualar/tr/ayet-tr-nebe.vue'
import AyetTrAmenereshulu from '../../dualar/tr/ayet-tr-amenerresulu.vue'

const modals = ref({
  sabahAksam: false,
  ogle: false,
  ikindi: false,
  yatsi: false
})

const buttonData = {
  sabahAksam: {
    title: "Sabah / Akşam",
    info: "Haşir 20-24",
    hint: "La yestevi…",
    icon: "wb_twilight"
  },
  ogle: {
    title: "Öğle",
    info: "Fetih 27-29",
    hint: "Lekad sadakallahü…",
    icon: "sunny"
  },
  ikindi: {
    title: "İkindi",
    info: "Nebe Suresi",
    hint: "Amme yetesaelun…",
    icon: "sunny"
  },
  yatsi: {
    title: "Yatsı",
    info: "Bakara 285-286",
    hint: "Amenerresulü…",
    icon: "nights_stay"
  }
}
</script>

<template>
  <div class="flex-container column">
    <!-- Üst Buton -->
    <div class="top-button">
      <span class="button-info">{{ buttonData.sabahAksam.info }}</span>&nbsp;
      <span class="info-text">{{ buttonData.sabahAksam.hint }}</span>
      <button class="buton" @click="modals.sabahAksam = true">
        <i class="material-symbols">{{ buttonData.sabahAksam.icon }}</i>
        {{ buttonData.sabahAksam.title }}
      </button>
    </div>

    <!-- Alt Butonlar -->
    <div class="bottom-buttons">
      <div v-for="(data, key) in buttonData" :key="key" class="" v-show="key !== 'sabahAksam'">
        <span class="button-info">{{ data.info }}</span>
        <button class="buton" @click="modals[key] = true">
          <i class="material-symbols">{{ data.icon }}</i>
          {{ data.title }}
        </button>
        <span class="info-text">{{ data.hint }}</span>
      </div>
    </div>

    <!-- Modals -->
    <Modal v-for="(data, key) in buttonData" :key="key" :show="modals[key]" :title="data.title"
      @close="modals[key] = false">
      <div class="flex-container latin">
        <!-- Modal içeriği buraya gelecek -->
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.asr-container {
  display: flex;
  flex-direction: column;
  gap: 1.0rem;
}

.top-button {
  text-align: center;
}

.bottom-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: flex-start;
}

.button-info {
  font-size: 0.7rem;
  color: darkgrey;
  /* margin-top: 0.25rem; */
}
</style>