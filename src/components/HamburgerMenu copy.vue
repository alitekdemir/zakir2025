<!-- src/components/HamburgerMenu.vue -->
<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div>
    <!-- Menü Butonu -->
    <button class="menu-btn" @click="toggleMenu" :class="{ 'open': isOpen }">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Menü -->
    <div class="menu" :class="{ 'open': isOpen }">
        <router-link to="/" @click="toggleMenu">
            <span style="font-size: x-large; line-height: 1rem; font-weight: 300; color: white;">TESBİHAT</span>
        </router-link>
      <hr class="divider" style="border-color: white;">
      <router-link to="/font-ayarlari" @click="toggleMenu">Font Ayarları</router-link>
      <router-link to="/istatistikler" @click="toggleMenu">İstatistikler</router-link>
      <hr class="divider" style="border-color: white;">
      <router-link to="/nasil-kullanilir" @click="toggleMenu">Nasıl Kullanılır</router-link>
      <router-link to="/tesbihatin-faziletleri" @click="toggleMenu">Tesbihatın Faziletleri</router-link>
      <router-link to="/geri-bildirim" @click="toggleMenu">Geri Bildirim</router-link>
    </div>

    <!-- Overlay -->
    <div class="overlay" :class="{ 'open': isOpen }" @click="toggleMenu"></div>
  </div>
</template>

<style scoped>
.menu-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 20px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 100;
}

.menu-btn span {
  width: 100%;
  height: 2px;
  background-color: white;
  transition: 0.3s;
}
.menu-btn.open span:nth-child(1) {transform: translateY(9px) rotate(45deg);}
.menu-btn.open span:nth-child(2) {opacity: 0;}
.menu-btn.open span:nth-child(3) {transform: translateY(-9px) rotate(-45deg);}

.menu {
  position: fixed;
  top: 64px;
  left: -380px;
  width: 280px;
  height: calc(100vh - 64px);
  background: var(--primary);
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  padding: 20px;
  z-index: 99;
}

.menu.open {left: 0;}

.menu a {
  color: white;
  text-decoration: none;
  padding: 15px;
  border-radius: 8px;
  margin: 5px 0;
  transition: 0.2s;
}

.menu a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
  z-index: 98;
}

.overlay.open {
  visibility: visible;
  opacity: 1;
}
</style>
