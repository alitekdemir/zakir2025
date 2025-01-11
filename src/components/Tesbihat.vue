<!-- src/components/Tesbihat.vue -->
<script setup>
import DuaWidget from './DuaWidget2.vue';
import ProgressBar from './ProgressBar.vue';
import { createProgress } from '../assets/useProgress';
createProgress() // Progress provider'ı oluştur

// Dualar
import Entesselam from './dualar/01-entesselam.vue';
import Tuncina from './dualar/02-tuncina.vue';
import SabahAksam from './dualar/03-sabah-aksam5.vue';
import Ecirna from './dualar/04-ecirna.vue';
import Subhanallahi from './dualar/05-subhanallahi.vue';
import AyetTrKursi from './dualar/06-kursi.vue';
import Tesbih from './dualar/07-tesbih.vue';
import Tevhid from './dualar/08-tevhid.vue';
import Dua from './dualar/09-dua.vue';
import Falem from './dualar/10-falem.vue';
import Selam from './dualar/11-salavat.vue';
import Kesira from './dualar/12-kesira.vue';
import SalliveSellim from './dualar/13-sallivesellim.vue';
import Elfu from './dualar/14-elfu.vue';
import Biadedi from './dualar/15-biadedievrakil.vue';
import IsmiAzam from './dualar/16-ismiazam.vue';
import IsmiAzamDua from './dualar/17-ismiazamdua.vue';
import Sureler from './dualar/18-sureler.vue';

// Bilgiler
import i01Entesselam from './info/i01Entesselam.vue';
import i02Tuncina from './info/i02Tuncina.vue';
import i03SabahAksam from './info/i03SabahAksam.vue';
import i09Dua from './info/i09Dua.vue';

const duaList = [
  { number: 1, title: 'Farzdan Sonra', component: Entesselam, info: i01Entesselam },
  { number: 2, title: 'Salaten Tuncina', component: Tuncina, info: i02Tuncina },
  { number: 3, title: 'Sünnet kılınır sonra', component: SabahAksam, info: i03SabahAksam },
  { number: 4, title: 'İstiaze/Ecirna', component: Ecirna, info: null },
  { number: 5, title: ' ', component: Subhanallahi, info: null },
  { number: 6, title: ' ', component: AyetTrKursi, info: null },
  { number: 7, title: 'Tesbih', component: Tesbih, info: null },
  { number: 8, title: 'Tevhid', component: Tevhid, info: null },
  { number: 9, title: 'Dua', component: Dua, info: i09Dua },
  { number: 10, title: 'Tehlil', component: Falem, info: null },
  { number: 11, title: ' ', component: Selam, info: null },
  { number: 12, title: 'Kesîran kesîrâ', component: Kesira, info: null },
  { number: 13, title: ' ', component: SalliveSellim, info: null },
  { number: 14, title: ' ', component: Elfu, info: null },
  { number: 15, title: ' ', component: Biadedi, info: null },
  { number: 16, title: 'İsm-i Âzam', component: IsmiAzam, info: null },
  { number: 17, title: 'İsm-i Âzam Duası', component: IsmiAzamDua, info: null },
  { number: 18, title: 'Aşirler', component: Sureler, info: null },
];
</script>

<template>
    <ProgressBar />
    <div class="tesbihat-container">
        <DuaWidget
            v-for="dua in duaList"
            :key="dua.number"
            :number="dua.number"
            :title="dua.title"
            >
            <component :is="dua.component" />
            <template v-if="dua.info" #info-content>
                <component :is="dua.info" />
            </template>
        </DuaWidget>
    </div>
</template>

<style scoped>
.tesbihat-container {
  display: flex;
  flex-direction: column;
  padding: 0 0.25rem;
  margin: 1.5rem auto;
  max-width: 600px;
  gap: 1rem;
}
</style>
