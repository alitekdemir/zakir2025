// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useStatsStore } from '../assets/statsStore.js';
import HomeView from './Home.vue'
import Hakkinda from './Hakkinda.vue'
import Fazilet from './TesbihatinFaziletleri.vue'
import Ayarlar from './Ayarlar.vue'
import Istatistikler from './Istatistikler.vue'
import GeriBildirim from './GeriBildirim.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/hakkinda',
      name: 'hakkinda',
      component: Hakkinda
    },
    {
      path: '/tesbihatin-faziletleri',
      component: Fazilet
    },
    {
      path: '/ayarlar',
      component: Ayarlar
    },
    {
      path: '/istatistikler',
      component: Istatistikler
    },
    {
      path: '/geri-bildirim',
      component: GeriBildirim
    },
  ]
})

router.beforeEach((to, from, next) => {
  const statsStore = useStatsStore();

  // Uygulama ilk açıldığında veya doğrudan anasayfaya gelindiğinde
  if (from.name === undefined && to.name === 'home') {
      statsStore.startTimeTracking();
  } 
  // Başka bir sayfadan anasayfaya gelindiğinde
  else if (to.name === 'home' && from.name !== 'home') {
    statsStore.startTimeTracking();
  } 
  // Anasayfadan başka bir sayfaya geçildiğinde
  else if (from.name === 'home' && to.name !== 'home') {
    statsStore.stopTimeTracking();
  }
  
  next();
});

export default router