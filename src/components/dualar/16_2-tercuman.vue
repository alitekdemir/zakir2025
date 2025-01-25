<!-- src/components/dualar/16_2-tercuman.vue -->
<script setup>
import { dualar } from '../../assets/dualar.js'
import { useScriptStyle } from '../../assets/useScriptStyle.js'
import { sureler } from '../../assets/sureler.js'

const { tercuman } = dualar
const { scriptStyle } = useScriptStyle()
</script>

<template>
  <div class="flex-container column">
      <span class="besmele" :class="scriptStyle">{{ sureler.bismillah[scriptStyle] }}</span>

      <div class="flex-container wrap">
        <span>Subhaneke ya <strong class="red">Allâh</strong> tealeyte yâ <strong class="red">Rahmân</strong><br/>
        ecirnâ mine'n-nâr bi afvike yâ Rahmân</span>
      </div>

      <div class="isimler-grid" :class="scriptStyle">
          <div v-for="(grup, index) in tercuman[scriptStyle]" 
               :key="index" class="row">
                <span class="latin number" style="font-size: 0.9rem;">{{ index + 1 }}.</span>
                {{ grup[0] }} - {{ grup[1] }}
          </div>
      </div>
  </div>
</template>

<style scoped>
.isimler-grid {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(19, auto);
  /* gap: 0.2rem;  */
  column-gap: 0.5rem; 
  width: 100%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}
.latin.number{
  color: var(--primary);
  padding-right: .1rem;
}
.row{
  padding: 0 .1rem 0 .5rem;
}
.row:hover {
  background-color: var(--primary-light);
  border-radius: 4px;
}

.latin {text-align: left;}
.arabic {text-align: right;}

@media (max-width: 300px) {
  .isimler-grid {
    grid-auto-flow: row;
    grid-template-rows: auto;
  }
}
</style>