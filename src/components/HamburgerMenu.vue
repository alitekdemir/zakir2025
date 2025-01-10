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
    <button class="hamburger-btn" @click="toggleMenu" :class="{ 'open': isOpen }">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Menü -->
    <div class="menu" :class="{ 'open': isOpen }">
      <router-link to="/" @click="toggleMenu">
          <span style="font-size: x-large; line-height: 1rem; font-weight: 300; color: white;">
            TESBİHAT
          </span>
      </router-link>
      <hr class="divider">
      <router-link to="/font-ayarlari" @click="toggleMenu">Font Ayarları</router-link>
      <router-link to="/istatistikler" @click="toggleMenu">İstatistikler</router-link>
      <hr class="divider">
      <router-link to="/nasil-kullanilir" @click="toggleMenu">Nasıl Kullanılır</router-link>
      <router-link to="/tesbihatin-faziletleri" @click="toggleMenu">Tesbihatın Faziletleri</router-link>
      <router-link to="/geri-bildirim" @click="toggleMenu">Geri Bildirim</router-link>
    </div>

    <!-- Overlay -->
    <div class="overlay" :class="{ 'open': isOpen }" @click="toggleMenu"></div>
  </div>
</template>

<style scoped>
.hamburger-btn {
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

.hamburger-btn span {
  width: 100%;
  height: 2px;
  background-color: white;
  transition: 0.3s;
}
.hamburger-btn.open span:nth-child(1) {transform: translateY(9px) rotate(45deg);}
.hamburger-btn.open span:nth-child(2) {opacity: 0;}
.hamburger-btn.open span:nth-child(3) {transform: translateY(-9px) rotate(-45deg);}

.menu {
  font-size: 1.3rem;
  font-weight: 300;
  position: fixed;
  top: 64px;
  left: -100%;
  width: min(300px, 100vw);
  height: calc(100vh - 64px);
  background: var(--primary);
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  z-index: 99;
  /* text-align: left; */
}

.menu.open {left: 0;}

.menu a {
  color: white;
  text-decoration: none;
  padding: 1rem;
  transition: 0.2s;
  /* text-align: left; */
}

.menu a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.overlay {
  position: fixed;
  top: 64px; /* Navbar yüksekliği kadar yukarıdan başla */
  left: 0;
  width: 100%;
  height: calc(100vh - 64px); /* Navbar'ı hariç tut */
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
  z-index: 98;
}


.overlay.open {
  visibility: visible;
  opacity: 1;
}

.divider {
  width: 70%; 
  border-bottom: 1px solid rgba(255, 255, 255, 0.3); /* Saydamlık arttırıldı */
  margin: 0 auto;
}


</style>
