<!-- src/components/tesbihat/dualar/17-sure.vue -->
<script setup>
import { ref } from 'vue'
import Modal from '../../Modal.vue'
import { useScriptStyle } from '../../../assets/useScriptStyle.js'
import { sureler } from '../sureler.js'

const { scriptStyle } = useScriptStyle()
const modals = ref({
  sabahAksam: false,
  ogle: false,
  ikindi: false,
  yatsi: false
})

const buttonData = {
  sabahAksam: {
    component: sureler.hasir,  // sureler objesinden direkt erişim
    title: "Sabah / Akşam",
    info: "Haşir 20-24",
    hint: "La yestevi…",
    icon: "wb_twilight"
  },
  ogle: {
    component: sureler.fetih,
    title: "Öğle",
    info: "Fetih 27-29",
    hint: "Lekad sadakallahü…",
    icon: "sunny"
  },
  ikindi: {
    component: sureler.nebe,
    title: "İkindi",
    info: "Nebe Suresi",
    hint: "Amme yetesaelun…",
    icon: "sunny"
  },
  yatsi: {
    component: sureler.amanerRasulu,
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

      <Modal :show="modals.sabahAksam" :title="buttonData.sabahAksam.info" @close="modals.sabahAksam = false">
        <span class="besmele" :class="scriptStyle">
          {{ sureler.bismillah[scriptStyle] }}
        </span>
        <div class="flex-container column" :class="scriptStyle">
          <span v-for="(line, index) in buttonData.sabahAksam.component[scriptStyle]" :key="index">
            {{ line }}
          </span>
        </div>
        <!-- Sadakallahül Azim -->
        <span class="besmele" :class="scriptStyle">{{ sureler.sadakallah[scriptStyle] }}</span>
      </Modal>
    </div>

    <!-- Alt Butonlar -->
    <div class="bottom-buttons">
      <div v-for="(data, key) in buttonData" :key="key" v-show="key !== 'sabahAksam'">
        <span class="button-info">{{ data.info }}</span>
        <button class="buton" @click="modals[key] = true">
          <i class="material-symbols">{{ data.icon }}</i>
          {{ data.title }}
        </button>
        <span class="info-text">{{ data.hint }}</span>

        <Modal :show="modals[key]" :title="data.info" @close="modals[key] = false">
          <span class="besmele" :class="scriptStyle">{{ sureler.bismillah[scriptStyle] }}</span>
          <div class="flex-container column" :class="scriptStyle">
            <span v-for="(line, index) in data.component[scriptStyle]" :key="index">
              {{ line }}
            </span>
          </div>
          <span class="besmele" :class="scriptStyle">{{ sureler.sadakallah[scriptStyle] }}</span>
        </Modal>
      </div>
    </div>
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