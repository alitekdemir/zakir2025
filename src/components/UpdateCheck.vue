<!-- src/components/UpdateCheck.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { APP_VERSION, ASSETS_VERSION } from '../assets/version'

const currentVersion = ref(localStorage.getItem('app-version') || APP_VERSION)
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
    // Tüm önbellekleri listele
    const keys = await caches.keys()
    // Her bir önbelleği sil
    const clearPromises = keys.map(key => caches.delete(key))
    await Promise.all(clearPromises)
    return true
  } catch (error) {
    console.error('Önbellek temizleme hatası:', error)
    return false
  }
}

// Manuel güncelleme kontrolü
const checkForUpdates = async () => {
  if (isUpdating.value) return
  
  try {
    isUpdating.value = true

    // Eğer localStorage'da versiyon yoksa, güncel versiyonu kaydet
    if (!localStorage.getItem('app-version')) {
      localStorage.setItem('app-version', APP_VERSION)
      localStorage.setItem('assets-version', ASSETS_VERSION)
      currentVersion.value = APP_VERSION
    }

    if (currentVersion.value !== APP_VERSION) {
      updateStatus.value = `Yeni sürüm: ${APP_VERSION}`
      await clearCache()

      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        await registration.unregister()
      }

      localStorage.setItem('app-version', APP_VERSION)
      localStorage.setItem('assets-version', ASSETS_VERSION)
      currentVersion.value = APP_VERSION

      setTimeout(() => {
        window.location.href = window.location.href + '?t=' + new Date().getTime()
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
    updateStatus.value = 'Güncelleme hatası: ' + error.message
    isUpdating.value = false
  }
}

// Sayfa yüklendiğinde versiyon kontrolü
onMounted(() => {
  // Eğer localStorage'da versiyon yoksa, güncel versiyonu kaydet
  if (!localStorage.getItem('app-version')) {
    localStorage.setItem('app-version', APP_VERSION)
    localStorage.setItem('assets-version', ASSETS_VERSION)
    currentVersion.value = APP_VERSION
    return
  }

  // Sadece localStorage'daki versiyon güncel versiyondan eskiyse mesaj göster
  if (currentVersion.value !== APP_VERSION) {
    updateStatus.value = `Yeni sürüm: ${APP_VERSION}`
  }
})

// onMounted(() => {
//   const storedVersion = localStorage.getItem('app-version')
//   if (storedVersion && storedVersion !== APP_VERSION) {
//     updateStatus.value = `Yeni versiyon mevcut! (${storedVersion} → ${APP_VERSION})`}})

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
        <small class="version">v{{ currentVersion }}</small>
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
