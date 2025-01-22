<!-- src/App.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import SplashScreen from './components/SplashScreen.vue'
import Navbar from './components/Navbar.vue'
import Home from './components/Home.vue'
import InstallPWAPrompt from './components/InstallPWAPrompt.vue'

const showSplash = ref(true)

onMounted(() => {
  setTimeout(() => { showSplash.value = false }, 2000);
  document.fonts.ready.then(() => { console.log('Tüm fontlar yüklendi.') });
})
</script>

<template>
  <SplashScreen :show="showSplash" />
  <div class="app" v-show="!showSplash">
    <InstallPWAPrompt />
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
}
</style>
