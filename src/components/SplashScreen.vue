<!-- src/components/SplashScreen.vue -->
<script setup>
import zakirIcon from '../assets/icon_zakir.vue'

defineProps({
  show: Boolean
})
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="splash-screen">
      <div class="splash-content">
        <!-- <img src="../assets/zakir.png" class="splash-logo" alt="Zakir Logo"/> -->
        <component :is="zakirIcon" width="512" height="512" fill="none" class="splash-logo" alt="Zakir Logo"/>
        <div class="splash-text">
          <h1>ZAKİR</h1>
          <h3>Namaz Tesbihatı</h3>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.splash-logo {
  /* Uzun kenarın 1/5'i */
  width: min(25vw, 25vh); 
  /* height: auto; */
  animation: pulse 2s infinite;
}

.splash-text {
  text-align: center;
  color: #ffffff;
}

.splash-text h1 {
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 400;
  margin: 0;
  /* letter-spacing: 2px; */
}

.splash-text h3 {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
  /* letter-spacing: 1px; */
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-to {
  opacity: 0;
}


.splash-text h1, .splash-text h3 {
  animation: slideUp 0.8s ease-out forwards;
  opacity: 0;
}

.splash-text h3 {
  animation-delay: 0.3s;
}

@keyframes slideUp {
  from {
    transform: translateY(3rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}


</style>
