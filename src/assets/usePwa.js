// src/assets/usePwa.js
import { ref, onMounted } from 'vue'

export function usePWA() {
  const deferredPrompt = ref(null)
  const showInstallPrompt = ref(false)
  const isInstallable = ref(false)

  onMounted(() => {
    // Tarayıcı kurulum desteğini kontrol et
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) {
      isInstallable.value = false
      return
    }

    // Install prompt olayını dinle
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt.value = e
      isInstallable.value = true
      showInstallPrompt.value = true
    })

    // Kurulum tamamlandığında
    window.addEventListener('appinstalled', () => {
      deferredPrompt.value = null
      isInstallable.value = false
      showInstallPrompt.value = false
    })
  })

  const installPWA = async () => {
    if (!deferredPrompt.value) return

    try {
      const result = await deferredPrompt.value.prompt()
      if (result) {
        deferredPrompt.value = null
        isInstallable.value = false
        showInstallPrompt.value = false
      }
    } catch (err) {
      console.error('Kurulum hatası:', err)
    }
  }

  return {
    isInstallable,
    showInstallPrompt,
    installPWA
  }
}
