<!-- src/components/tesbihat/dualar/17-ismiazamdua.vue -->
<script setup>
import { ref } from 'vue'
import Modal from '../../Modal.vue'
import { dualar } from '../dualar.js'
import { useScriptStyle } from '../../../assets/useScriptStyle.js'

// const { ismiazamDua, tercumanDua } = dualar
const { scriptStyle } = useScriptStyle()
const modals = ref({azam: false, tercuman: false})

const duaData = {
  tercuman: {
    title: "Tercümân-ı İsm-i Âzam",
    buttonText: "Sabah / İkindi",
    component: dualar.tercumandua,
    hint: "Subhâneke âhiyyen şerâhiyyen…"
  },
  azam: {
    title: "İsm-i Âzam",
    buttonText: "Diğer Vakitler",
    component: dualar.ismiazamdua,
    hint: "Yâ rabbe's-semâvâti ve'l-ard…"
  }
}

</script>

<template>
  
  <div class="flex-container">
    <div v-for="(item, key) in duaData" :key="key" class="flex-container column">
      <!-- <span class="info-text">{{ item.title }}</span> -->
      <button class="buton" @click="modals[key] = true">
        {{ item.buttonText }}
      </button>
      
      <Modal 
        :show="modals[key]" 
        :title="item.title" 
        @close="modals[key] = false"
      >
        <div class="flex-container wrap" :class="scriptStyle">
          <template v-for="(line, index) in item.component[scriptStyle]" :key="index">
            <div class="flex-container hand" v-if="line.type === 'info' && line.color === 'blue'" >
              <span class="material-symbols icon">back_hand</span>
              <span class="material-symbols icon mirror">back_hand</span>
            </div>
            <div class="flex-container hand" v-if="line.type === 'info' && line.color === 'red'" >
              <span class="material-symbols icon mirror">back_hand</span>
              <span class="material-symbols icon">back_hand</span>
            </div>
            <small v-if="line.type === 'info'" 
                   class="info-text latin" 
                   dir="ltr"
                   :class="line.color"
            >
              {{ line.text }}
            </small>
            <!-- Normal text için span -->
            <span v-else>
              {{ line.text }}
            </span>
          </template>
        </div>
      </Modal>
      <span class="info-text" v-if="item.hint">{{ item.hint }}</span>
    </div>
  </div>
</template>

<style scoped>
.hand{gap:0;}
.info-text {
  display: block;
  width: 100%;
  text-align: center;
}
</style>
