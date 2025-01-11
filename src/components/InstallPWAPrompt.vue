<!-- src/components/InstallPWAPrompt.vue -->
<script setup>
import { usePWA } from '../assets/usePwa'
const { isInstallable, showInstallPrompt, installPWA } = usePWA()
</script>


<template>
  <div v-if="isInstallable && showInstallPrompt" class="install-banner">
    <div class="install-content">
      <span class="install-icon">📱</span>
      <span>Bu uygulamayı yükle</span>
      <button @click="installPWA" class="install-button">
        Yükle
      </button>
      <button @click="showInstallPrompt = false" class="close-button">
        ✕
      </button>
    </div>
  </div>
</template>


<style scoped>
.install-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #24292e;
  color: white;
  padding: 12px;
  z-index: 1000;
}

.install-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  max-width: 600px;
  margin: 0 auto;
}

.install-button {
  background: #2ea44f;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.close-button {
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
}
</style>