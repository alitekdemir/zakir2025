<script setup>
import { ref } from 'vue'
import Modal from '../../Modal.vue'
import AzamDua from './dua-tr-ismi-azam.vue'
import AzamDuaT from './dua-tr-ismi-azam-tercuman.vue'

const modals = ref({
 azam: false,
 tercuman: false
})

const duaData = {
 tercuman: {
   title: "Tercümân-ı İsm-i Âzam",
   buttonText: "Sabah / İkindi",
   component: AzamDuaT,
   hint: "Subhâneke âhiyyen şerâhiyyen…"
 },
 azam: {
   title: "İsm-i Âzam",
   buttonText: "Diğer Vakitler",
   component: AzamDua,
   hint: "Yâ rabbe's-semâvâti ve'l-ard…"
 }
}
</script>

<template>
 <div class="flex-container">
     <div v-for="(item, key) in duaData" :key="key" class="flex-container column">
       <span class="info-text">{{ item.title }}</span>
       <button 
          class="buton" 
          @click="modals[key] = true">
         {{ item.buttonText }}
       </button>
       
       <Modal 
         :show="modals[key]" 
         :title="item.buttonText" 
         @close="modals[key] = false"
       >
        <component :is="item.component" />
       </Modal>
       
       <span class="info-text">{{ item.hint }}</span>
       
      </div>
 </div>
</template>

<style scoped>
</style>