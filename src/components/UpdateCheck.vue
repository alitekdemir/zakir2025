<!-- src/components/UpdateCheck.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { APP_VERSION, ASSETS_VERSION } from '../../public/version'

const currentVersion = ref(localStorage.getItem('app-version') || APP_VERSION)
const currentAssetsVersion = ref(localStorage.getItem('assets-version') || ASSETS_VERSION)
const updateStatus = ref('')
const isUpdating = ref(false)

defineProps({
  closeMenu: {
    type: Function,
    default: () => {}
  }
})

// Önbelleği temizle
const clearCache = async () => {
  try {
    const keys = await caches.keys()
    const clearPromises = keys.map(key => caches.delete(key))
    await Promise.all(clearPromises)
    return true
  } catch (error) {
    console.error('Önbellek temizleme hatası:', error)
    return false
  }
}

// Sunucudan version.js'i kontrol et
const fetchLatestVersion = async () => {
  try {
    // Firebase hosting için tam URL kullanıyoruz
    const versionUrl = `${window.location.origin}/version.js?t=${Date.now()}`
    const response = await fetch(versionUrl)
    
    if (!response.ok) {
      throw new Error('Version dosyası bulunamadı')
    }
    
    const text = await response.text()
    
    // Version parse işlemini geliştirdik
    const appVersionMatch = text.match(/APP_VERSION\s*=\s*['"](.+?)['"]/)
    const assetsVersionMatch = text.match(/ASSETS_VERSION\s*=\s*['"](.+?)['"]/)
    
    if (!appVersionMatch) {
      throw new Error('Version formatı geçersiz')
    }

    return {
      appVersion: appVersionMatch[1],
      assetsVersion: assetsVersionMatch ? assetsVersionMatch[1] : null
    }
  } catch (error) {
    console.error('Versiyon kontrol hatası:', error)
    throw new Error('Versiyon bilgisi alınamadı: ' + error.message)
  }
}

// Manuel güncelleme kontrolü
const checkForUpdates = async () => {
  if (isUpdating.value) return
  
  try {
    isUpdating.value = true
    updateStatus.value = 'Güncellemeler kontrol ediliyor...'

    const { appVersion, assetsVersion } = await fetchLatestVersion()

    if (!appVersion) {
      throw new Error('Versiyon bilgisi alınamadı')
    }

    // Hem APP_VERSION hem de ASSETS_VERSION kontrolü
    if (currentVersion.value !== appVersion || currentAssetsVersion.value !== assetsVersion) {
      updateStatus.value = `Yeni sürüm bulundu: ${appVersion} (Assets: ${assetsVersion})`
      await clearCache()

      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        await registration.unregister()
      }

      localStorage.setItem('app-version', appVersion)
      localStorage.setItem('assets-version', assetsVersion)
      currentVersion.value = appVersion
      currentAssetsVersion.value = assetsVersion

      setTimeout(() => {
        window.location.reload(true)
      }, 1000)
    } else {
      updateStatus.value = 'En güncel sürümü kullanıyorsunuz'
      setTimeout(() => {
        updateStatus.value = ''
        isUpdating.value = false
      }, 2000)
    }

  } catch (error) {
    console.error('Güncelleme hatası:', error)
    updateStatus.value = 'Güncelleme kontrolü başarısız: ' + error.message
    isUpdating.value = false
  }
}

// Sayfa yüklendiğinde otomatik kontrol
onMounted(async () => {
  try {
    const { appVersion, assetsVersion } = await fetchLatestVersion()
    
    if (!localStorage.getItem('app-version') || !localStorage.getItem('assets-version')) {
      localStorage.setItem('app-version', appVersion)
      localStorage.setItem('assets-version', assetsVersion)
      currentVersion.value = appVersion
      currentAssetsVersion.value = assetsVersion
      return
    }

    if (currentVersion.value !== appVersion || currentAssetsVersion.value !== assetsVersion) {
      updateStatus.value = `Yeni sürüm mevcut: ${appVersion} (Assets: ${assetsVersion})`
    }
  } catch (error) {
    console.error('Otomatik versiyon kontrolü hatası:', error)
  }
})
</script>


<template>
  <div class="update-container">
    <button 
      class="update-check" 
      @click="checkForUpdates"
      :disabled="isUpdating"
    >
      <i class="material-symbols" :class="{ 'spinning': isUpdating }">
        {{ isUpdating ? 'sync' : 'system_update' }}
      </i>
      <span>Güncelleme Kontrolü</span>
      <small class="version">v{{ currentVersion }} ({{ currentAssetsVersion }})</small>
    </button>
    
    <div 
      v-if="updateStatus" 
      class="update-status"
      :class="{ 'updating': isUpdating }"
    >
      {{ updateStatus }}
    </div>
  </div>
</template>
  

<style scoped>
.update-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.update-check {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.3rem;
  font-weight: 300;
  cursor: pointer;
  transition: 0.2s;
  text-align: left;
}

.update-check:disabled {
  opacity: 0.7;
  cursor: wait;
}

.update-check:hover:not(:disabled) {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  font-weight: 500;
}

.version {
  margin-left: auto;
  /* font-size: 0.8rem; */
  /* opacity: 0.7; */
}

.update-status {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(0, 0, 0, 0.2);
  margin: 0.5rem;
  border-radius: 4px;
  white-space: pre-line;
  /* text-align: right; */
}

.material-symbols.spinning {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}
</style>
