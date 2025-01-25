<script setup>
import { ref } from 'vue'
import { dualar } from '../../assets/dualar.js'
import { useScriptStyle } from '../../assets/useScriptStyle.js'
import Modal from '../Modal.vue'

// Modal durumları
const modals = ref({
  azam: false,
  tercuman: false
})

// Dua verisi 
const duaData = {
  tercuman: {
    title: "Tercümân-ı İsm-i Âzam",
    buttonText: "Sabah / İkindi", 
    // hint: "Subhâneke âhiyyen şerâhiyyen…"
  },
  azam: {
    title: "İsm-i Âzam",
    buttonText: "Diğer Vakitler",
    // hint: "Yâ rabbe's-semâvâti ve'l-ard…"
  }
}

// Dualar ve stil
const { ismiazam, tercuman } = dualar
const { scriptStyle } = useScriptStyle()
</script>

<template>
  <div class="flex-container">
    <div v-for="(item, key) in duaData" :key="key" class="flex-container column">
      <span class="info-text">{{ item.title }}</span>
      <button class="buton" @click="modals[key] = true">
        {{ item.buttonText }}
      </button>
      
      <Modal 
        :show="modals[key]" 
        :title="item.title" 
        @close="modals[key] = false">
        
        <!-- İsmi Azam Modal İçeriği -->
        <template v-if="key === 'azam'">
          <div class="flex-container column">

            <span class="besmele">Bismillâhir rahmânir rahîm</span>
            <div class="flex-container wrap">
              <span class="latin">ya <strong class="red">Cemîlu</strong> yâ Allâh,</span>
              <span class="latin"> yâ <strong class="red">Karîbu</strong> yâ Allâh,</span><br/>
              <span class="latin">ya <strong class="red">Mücîbu</strong> yâ Allâh,</span>
              <span class="latin"> yâ <strong class="red">Habîbu</strong> yâ Allâh</span>
            </div>

          <div class="grid-container" :class="scriptStyle">
            <div v-for="(grup, index) in ismiazam[scriptStyle]" 
                 :key="index" 
                 class="isim-kutu"
                 :class="{ 'son-kutu': index === ismiazam[scriptStyle].length - 1 }">
                <div class="number">{{ index + 1 }}</div>
                <div class="primary" :class="scriptStyle">
                    {{ grup[0] }} - {{ grup[1] }}
                </div>
                <div :class="scriptStyle">
                    {{ grup[2] }}{{ grup[3] ? ` - ${grup[3]}` : '' }}
                </div>
            </div>
          </div>
        </div>
        </template>

        <!-- Tercüman Modal İçeriği -->
        <template v-if="key === 'tercuman'">
          <div class="flex-container column">
            <span class="besmele">Bismillâhir rahmânir rahîm</span>

            <div class="flex-container wrap">
              <span>Subhaneke ya <strong class="red">Allâh</strong> tealeyte yâ <strong class="red">Rahmân</strong><br/>
              ecirnâ mine'n-nâr bi afvike yâ Rahmân</span>
            </div>

            <div class="tercuman-grid" :class="scriptStyle">
              <div v-for="(grup, index) in tercuman[scriptStyle]" 
                   :key="index" class="row">
                    <span class="latin red">{{ index + 1 }}.</span>
                    {{ grup[0] }} - {{ grup[1] }}
              </div>
            </div>
          </div>
        </template>

      </Modal>
      
      <span class="info-text">{{ item.hint }}</span>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  padding: 1rem;
  width: 100%;
}

.isim-kutu {
  position: relative;
  justify-content: center;
  min-width: 120px;
  border: 1px solid var(--primary-light);
  border-radius: 8px;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  user-select: none;
  padding-top: 0.9rem;
}

.isim-kutu:hover {
  background-color: var(--primary-light);
}

.number {
  position: absolute;
  top: -0.5rem;
  transform: translateX(-50%);
  background-color:var(--primary);
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 20%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 600;
}

.son-kutu {
  flex-basis: 100%;
}

.tercuman-grid {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(19, auto);
  /* gap: 0.2rem; */
  column-gap: 0.5rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}

.row {
  padding: 0.25rem;
}
.row:hover {
  background-color: var(--primary-light);
  border-radius: 4px;
  /* padding: .1rem; */
}

.latin {text-align: left;}
.arabic {text-align: right;}

@media (max-width: 300px) {
  .tercuman-grid {
    grid-auto-flow: row;
    grid-template-rows: auto;
  }
}

@media (max-width: 200px) {
  .isim-kutu {
    flex-basis: 100%;
    padding: 0.5rem;
  }
}
</style>
