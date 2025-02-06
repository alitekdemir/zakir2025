// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
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
    // {
    //   path: '/privacy',
    //   component: () => import('../components/views/privacy.vue')
    // }
  ]
})

export default router


// component: () => import('../components/views/Ayarlar.vue') şeklinde import edilmeden yazılabilir