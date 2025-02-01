// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/nasil-kullanilir',
      name: 'nasil-kullanilir',
      component: () => import('../components/views/NasilKullanilir.vue')
    },
    {
      path: '/tesbihatin-faziletleri',
      component: () => import('../components/views/TesbihatinFaziletleri.vue')
    },
    {
      path: '/ayarlar',
      component: () => import('../components/views/Ayarlar.vue')
    },
    {
      path: '/istatistikler',
      component: () => import('../components/views/Istatistikler.vue')
    },
    {
      path: '/geri-bildirim',
      component: () => import('../components/views/GeriBildirim.vue')
    },
    // {
    //   path: '/privacy',
    //   component: () => import('../components/views/privacy.vue')
    // }
  ]
})

export default router
