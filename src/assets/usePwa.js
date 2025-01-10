// src/assets/usePwa.js
import { ref, onMounted } from 'vue'

export function usePWA() {
  const deferredPrompt = ref(null)
  const showInstallPrompt = ref(false)
  const isIOS = ref(false)
  const isInstalled = ref(false)

  const checkInstallState = () => {
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      isInstalled.value = true
      return true
    }
    return false
  }

  onMounted(() => {
    isIOS.value = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    
    if (checkInstallState()) {
      return
    }

    // PWA yükleme durumunu kontrol et
    const lastPromptTime = localStorage.getItem('pwa-prompt-time')
    const now = Date.now()
    const promptInterval = 7 * 24 * 60 * 60 * 1000 // 7 gün

    if (!lastPromptTime || (now - parseInt(lastPromptTime)) > promptInterval) {
      showInstallPrompt.value = true
      localStorage.setItem('pwa-prompt-time', now.toString())
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt.value = e
      if (!isInstalled.value) {
        showInstallPrompt.value = true
      }
    })

    // PWA yükleme durumu değişikliğini dinle
    window.addEventListener('appinstalled', () => {
      isInstalled.value = true
      showInstallPrompt.value = false
      localStorage.setItem('pwa-installed', 'true')
    })
  })

  const installPWA = async () => {
    try {
      if (isIOS.value) {
        showIOSInstallInstructions()
        return
      }

      if (deferredPrompt.value) {
        await deferredPrompt.value.prompt()
        const result = await deferredPrompt.value.userChoice
        deferredPrompt.value = null
        
        if (result.outcome === 'accepted') {
          isInstalled.value = true
          showInstallPrompt.value = false
        }
      }
    } catch (error) {
      console.error('PWA kurulum hatası:', error)
    }
  }

  return {
    showInstallPrompt,
    installPWA,
    isIOS,
    isInstalled
  }
}
