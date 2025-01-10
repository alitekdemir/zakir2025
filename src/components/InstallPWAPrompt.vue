<!-- src/components/InstallPWAPrompt.vue -->
<script setup>
  import { usePWA } from '../assets/usePwa.js'

  const { showInstallPrompt, installPWA } = usePWA()
</script>

<template>
  <div v-if="showInstallPrompt" class="install-prompt">
    <div class="prompt-content">
      <p>Daha iyi bir deneyim için uygulamayı yükleyin</p>
      <div class="button-group">
        <button @click="installPWA" class="install-btn">Yükle</button>
        <button @click="showInstallPrompt = false" class="close-btn">Kapat</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.install-prompt {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.prompt-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
}

.button-group {
  display: flex;
  gap: 8px;
}

.install-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.close-btn {
  background: #f5f5f5;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>