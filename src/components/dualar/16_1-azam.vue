<!-- src/components/dualar/16-ismi-azam.vue -->
<script setup>
import { dualar } from '../../assets/dualar.js'
import { useScriptStyle } from '../../assets/useScriptStyle.js'
import { sureler } from '../../assets/sureler.js'

const { ismiazam } = dualar
const { scriptStyle } = useScriptStyle()
</script>

<template>
      <span class="besmele" :class="scriptStyle">{{ sureler.bismillah[scriptStyle] }}</span>

      <p>
        <span class="latin">ya <strong class="red">Cemîlu</strong> yâ Allâh,</span>
        <span class="latin"> yâ <strong class="red">Karîbu</strong> yâ Allâh,</span><br/>
        <span class="latin">ya <strong class="red">Mücîbu</strong> yâ Allâh,</span>
        <span class="latin"> yâ <strong class="red">Habîbu</strong> yâ Allâh</span>
      </p>

      <!-- İsimler Container Numaralı-->
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
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: .5rem;
  /* padding: 1rem; */
}

.isim-kutu {
  position: relative;
  justify-content: center;
  border: 1px solid var(--primary-light);
  border-radius: 8px;
  padding: 0.9rem 0.5rem 0.5rem;
  cursor: pointer;
  user-select: none;
}

.isim-kutu:hover {
  background-color: var(--primary-light);
}

.number {
  position: absolute;
  top: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--primary);
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
  grid-column: 1 / -1; /* Son kutu tüm sütunları kaplasın */
}


@media (max-width: 22rem) {
  .grid-container {
    grid-template-columns: 1fr; /* 1 sütun */
  }
}
</style>
