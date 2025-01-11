// src/main.js
import { createApp } from 'vue'
import './style.css'
import './ilaveler.css'
import App from './App.vue'
import router from './router'
import { registerSW } from 'virtual:pwa-register'
import { APP_VERSION, ASSETS_VERSION } from './assets/version'
import { vibrate, setupGlobalVibration } from './assets/vibrate'
// Global titreşimi kur
// setupGlobalVibration()

let app = null; // Global app değişkeni

// Font yükleme fonksiyonu
const loadFonts = async () => {
  const storedAssetsVersion = localStorage.getItem('assets-version')
  
  if (storedAssetsVersion !== ASSETS_VERSION) {
    try {
      const fontPromises = [
        document.fonts.load('1em "Scheherazade New"'),
        document.fonts.load('1em "Material Symbols Outlined"'),
        document.fonts.load('1em "Barlow Condensed"')
      ]
      
      await Promise.all(fontPromises)
      localStorage.setItem('assets-version', ASSETS_VERSION)
    } catch (error) {
      console.error('Font yükleme hatası:', error)
    }
  }
}

// Service Worker güncelleme kontrolü
const checkForUpdates = async () => {
  try {
    const registration = await navigator.serviceWorker.getRegistration()
    if (registration && registration.waiting) {
      if (confirm('Yeni versiyon mevcut. Güncellemek ister misiniz?')) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        window.location.reload()
      }
    }
  } catch (error) {
    console.error('SW güncelleme kontrolü hatası:', error)
  }
}

// PWA kayıt işlemi
const registerServiceWorker = () => {
  const updateSW = registerSW({
    onNeedRefresh() {
      const lastVersion = localStorage.getItem('app-version')
      if (lastVersion !== APP_VERSION) {
        if (confirm('Yeni versiyon mevcut. Güncellemek ister misiniz?')) {
          localStorage.setItem('app-version', APP_VERSION)
          window.location.reload()
        }
      }
    },
    immediate: true
  })
  return updateSW
}


// Uygulama başlangıcı
const initializeApp = async () => {
  try {
    // Eğer önceden mount edilmiş bir uygulama varsa, unmount et
    if (app) {
      app.unmount()
    }

    // Font yükleme ve güncelleme kontrolü
    await Promise.all([
      loadFonts(),
      checkForUpdates()
    ])

    // Yeni uygulamayı oluştur ve mount et
    app = createApp(App)
    app.directive('vibrate', vibrate)
    app.use(router)
    app.mount('#app')

    // Service worker'ı kaydet
    registerServiceWorker()

  } catch (error) {
    console.error('Uygulama başlatma hatası:', error)
  }
}

// Uygulamayı başlat
initializeApp()

// Hot Module Replacement(HMR) desteği
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    initializeApp()
  })
}
