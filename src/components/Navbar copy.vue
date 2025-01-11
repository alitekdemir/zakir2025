<!-- src/components/Navbar.vue -->
<script setup>
import HamburgerMenu from './HamburgerMenu.vue'

import { computed } from 'vue'
import { useScriptStyle } from '../assets/useScriptStyle'

// Script Style Hook
const { scriptStyle, notification, toggleScript } = useScriptStyle()

// SVG İkonlar
import elifbeIcon from '../assets/icon_elifbe.vue'
import abcIcon from '../assets/icon_abc.vue'

// Aktif ikonu belirle
const currentIcon = computed(() =>
  scriptStyle.value === 'latin' ? abcIcon : elifbeIcon
)
</script>



<template>
  <nav class="navbar">
    <!-- Sol Taraf: Menü ve Başlık -->
    <div class="navbar-left">
      <!-- <button class="menu-btn" aria-label="Menü"><i class="material-symbols">menu</i></button> -->
      <HamburgerMenu />
      <span class="title">Zâkir | Özlü Tesbihat</span>
    </div>

    <!-- Sağ Taraf: Temalar ve Font Değiştirici -->
    <div class="navbar-right">
      <!-- <button class="theme-btn" aria-label="Tema Değiştir">
        <i class="material-symbols">dark_mode</i>
      </button> -->
      <button class="font-btn" @click="toggleScript" aria-label="Yazı Tipi Değiştir">
        <component :is="currentIcon" width="32" height="32" fill="#fff" />
      </button>
    </div>

    <!-- Bildirim Alanı -->
    <div v-if="notification" class="notification">
      {{ notification }}
    </div>
  </nav>
</template>



<style scoped>
/* Navbar Temel Yapısı */
.navbar {
  background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.2)), var(--primary);
  color: white;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */
}

/* Sol Bölüm */
.navbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title {
  font-size: 1.2rem;
  /* font-weight: bold; */
  white-space: nowrap;
}

/* Sağ Bölüm */
.navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

button {
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

/* Buton Hover ve Aktif Durumları */
button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

button:active {
  transform: scale(0.95);
}

.font-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

svg {
  fill: currentColor;
}

/* Bildirim Alanı */
.notification {
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #032535;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  animation: slideDown 0.3s ease-out;
  z-index: 1000;
}

/* Animasyon */
@keyframes slideDown {
  from {
    transform: translate(-50%, -20px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}
</style>
