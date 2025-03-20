// src/composables/useAppSettings.js
import { ref } from 'vue'

export function useAppSettings() {
  // SplashScreen ayarı için ref
  const showSplashScreen = ref(true)
  // Navigator göster/gizle ayarı için ref
  const showNavigator = ref(true)

  // LocalStorage'dan güvenli bir şekilde okuma
  const safeGetItem = (key, defaultValue) => {
    try {
      const value = localStorage.getItem(key)
      return value !== null ? value : defaultValue
    } catch (error) {
      console.error(`LocalStorage read error for ${key}:`, error)
      return defaultValue
    }
  }

  // LocalStorage'a güvenli bir şekilde yazma
  const safeSetItem = (key, value) => {
    try {
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.error(`LocalStorage write error for ${key}:`, error)
      return false
    }
  }

  // Ayarları yükleme
  const loadAppSettings = () => {
    showSplashScreen.value = safeGetItem('show-splash-screen', 'true') !== 'false'
    showNavigator.value = safeGetItem('show-navigator', 'true') !== 'false'
  }

  // SplashScreen gösterimini güncelleme
  const updateSplashScreen = (value) => {
    showSplashScreen.value = value
    safeSetItem('show-splash-screen', value.toString())
  }

  // Navigator gösterimini güncelleme
  const updateNavigator = (value) => {
    showNavigator.value = value
    safeSetItem('show-navigator', value.toString())
    
    // Sayfa yeniden yüklenmeden değişikliği uygulamak için özel olay tetikle
    window.dispatchEvent(new CustomEvent('navigator-visibility-change', { 
      detail: { visible: value } 
    }))
  }

  // Tüm uygulama ayarlarını sıfırlama 
  const resetAppSettings = () => {
    updateSplashScreen(true)
    updateNavigator(true)
  }

  return {
    showSplashScreen,
    showNavigator,
    loadAppSettings,
    updateSplashScreen,
    updateNavigator,
    resetAppSettings
  }
}
