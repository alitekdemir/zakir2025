// src/data/duaList.js
// Dualar
import Entesselam from '../components/dualar/01-entesselam.vue';
import Tuncina from '../components/dualar/02-tuncina.vue';
import SabahAksam from '../components/dualar/03-sabah-aksam5.vue';
import Ecirna from '../components/dualar/04-ecirna.vue';
import Subhanallahi from '../components/dualar/05-subhanallahi.vue';
import AyetTrKursi from '../components/dualar/06-kursi.vue';
import Tesbih from '../components/dualar/07-tesbih.vue';
import Tevhid from '../components/dualar/08-tevhid.vue';
import Dua from '../components/dualar/09-dua.vue';
import Falem from '../components/dualar/10-falem.vue';
import Selam from '../components/dualar/11-salavat.vue';
import Kesira from '../components/dualar/12-kesira.vue';
import SalliveSellim from '../components/dualar/13-sallivesellim.vue';
import Elfu from '../components/dualar/14-elfu.vue';
import Biadedi from '../components/dualar/15-biadedievrakil.vue';
import IsmiAzam from '../components/dualar/16-ismiazam.vue';
import IsmiAzamDua from '../components/dualar/17-ismiazamdua.vue';
import Sureler from '../components/dualar/18-sureler.vue';

// Bilgiler
import i01Entesselam from '../components/info/i01Entesselam.vue';
import i02Tuncina from '../components/info/i02Tuncina.vue';
import i03SabahAksam from '../components/info/i03SabahAksam.vue';
import i09Dua from '../components/info/i09Dua.vue';

export const duaList = [
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
