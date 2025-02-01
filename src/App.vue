<!-- src/App.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useWakeLock } from './assets/wakeLock'
import SplashScreen from './components/SplashScreen.vue'
import Navbar from './components/Navbar.vue'
import Home from './components/views/Home.vue'
// import InstallPWAPrompt from './components/InstallPWAPrompt.vue'

// ProgressBar birden fazla yerde kullanımı için ana App içinde oluşturuldu
import { createProgress } from './assets/useProgress';
createProgress() // Progress provider'ı oluştur

const showSplash = ref(true)
const wakeLockControls = useWakeLock()


onMounted(async () => {
  setTimeout(() => { showSplash.value = false }, 2000);
  document.fonts.ready.then(() => { console.log('Tüm fontlar yüklendi.') });
  
  // Wake Lock'u başlat
  await wakeLockControls.requestWakeLock();
});

onUnmounted(() => {
  wakeLockControls.releaseWakeLock();
});
</script>

<template>
  <SplashScreen :show="showSplash" />
  <div class="app" v-show="!showSplash">
    <Navbar />
    <router-view v-if="$route.name !== 'home'" />
    <Home v-else />
  </div>
</template>

<style scoped>
.app {
  background: var(--background);
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
}
</style>
