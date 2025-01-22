<!-- src/components/Navbar.vue -->
<script setup>
import HamburgerMenu from './HamburgerMenu.vue'

import { computed } from 'vue'
import { useScriptStyle } from '../assets/useScriptStyle'
import { useTheme } from '../assets/useTheme'

// Script Style Hook
const { scriptStyle, notification, toggleScript } = useScriptStyle()
// Theme Hook
const { theme, toggleTheme } = useTheme()

// SVG İkonlar
import elifbeIcon from '../assets/icon_elifbe.vue'
import abcIcon from '../assets/icon_abc.vue'

// Aktif ikonu belirle
const currentIcon = computed(() =>
  scriptStyle.value === 'latin' ? abcIcon : elifbeIcon
)

// Tema ikonunu belirle
const themeIcon = computed(() => 
  theme.value === 'light' ? 'dark_mode' : 'light_mode'
)
</script>



<template>
  <nav class="navbar">
    <!-- Sol Taraf: Menü ve Başlık public/favicon-32x32.png-->
    <div class="navbar-left">
      <HamburgerMenu />
      <img class="zakir" src="/zakir-alpha.svg" alt="Zakir ikon" />
      <span class="title">Zâkir - Özlü Tesbihat</span>
    </div>

    <!-- Sağ Taraf: Temalar ve Font Değiştirici -->
    <div class="navbar-right">
      <button 
        class="theme-btn" 
        @click="toggleTheme" 
        :aria-label="theme === 'light' ? 'Dark temaya geç' : 'Light temaya geç'"
      >
        <i class="material-symbols">{{ themeIcon }}</i>
      </button>

      <button 
        class="font-btn" 
        @click="toggleScript" 
        aria-label="Yazı Türünü Değiştir"
      >
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
.zakir { height: 48px; }

/* Navbar Temel Yapısı */
.navbar {
  position: sticky;
  top: 0;
  width: 100%;
  background: linear-gradient(0.25turn, var(--primary), var(--primary));
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), var(--primary);
  /* color: var(--text-primary); */
  color: white;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 102;
}

/* Sol Bölüm */
.navbar-left {
  display: flex;
  align-items: center;
  /* gap: 12px; */
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
  /* background-color: rgba(255, 255, 255, 0.2); */
  background-color: rgba(0, 0, 0, 0.1);
}

button:active {
  transform: scale(0.95);
}

.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}
.font-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
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


@media (max-width: 320px) {
  .title {
    display: none;
  }
}

</style>
