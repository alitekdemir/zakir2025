<!-- src/components/Navbar.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useThemeStore } from '../assets/themeStore'
import { useScriptStyle } from '../assets/useScriptStyle'
import HamburgerMenu from './HamburgerMenu.vue'
import elifbeIcon from '../assets/icon_elifbe.vue'
import abcIcon from '../assets/icon_abc.vue'
import zakirIcon from '../assets/icon_zakir.vue'

// Store ve Custom Hook kullanımı
const themeStore = useThemeStore()
const { scriptStyle, notification, toggleScript } = useScriptStyle()

// Menü state yönetimi
const isMenuOpen = ref(false)
const toggleMenu = () => {isMenuOpen.value = !isMenuOpen.value}
const closeMenu = () => {isMenuOpen.value = false}

// Computed properties
const currentIcon = computed(() =>  scriptStyle.value === 'latin' ? abcIcon : elifbeIcon )
const themeIcon = computed(() =>  themeStore.isDark ? 'light_mode' : 'dark_mode' )
</script>



<template>
  <nav class="navbar">
    <!-- Sol Taraf: Menü ve Başlık public/favicon-32x32.png-->
    <div class="navbar-left">
      <HamburgerMenu 
        :is-open="isMenuOpen" 
        @toggle="toggleMenu" 
      />

      <router-link to="/" class="home-link" @click="closeMenu">
        <component :is="zakirIcon" class="zakir" width="48" height="48" fill="none" alt="Zakir ikon"/>
        <span class="title">
          <span class="full-title">Zâkir - Özlü Tesbihat</span>
          <span class="short-title">Zâkir</span>
        </span>
      </router-link>
    </div>

    <!-- Sağ Taraf: Temalar ve Font Değiştirici -->
    <div class="navbar-right">
      <button 
        @click="themeStore.toggleMode()" 
        :aria-label="themeStore.isDark ? 'Aydınlık temaya geç' : 'Karanlık temaya geç'"
      >
        <i class="material-symbols">{{ themeIcon }}</i>
      </button>

      <button 
        @click="toggleScript" 
        aria-label="Yazı Türünü Değiştir"
      >
        <component :is="currentIcon" width="32" height="32" fill="#000" />
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
  position: sticky;
  top: 0;
  width: 100%;
  background: var(--primary-dark);
  color: white;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  z-index: 102;
}

/* Sol Bölüm */
.navbar-left, .navbar-right {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.title {
  font-size: 1.2rem;
  white-space: nowrap;
}

.short-title { display: none; }

button {
  color: inherit;
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, transform 0.2s ease;
  user-select: none;
  height: 3rem;
}


/* Buton Hover ve Aktif Durumları */
button:hover {
  background-color: rgba(0, 0, 0, 0.15);
}

button:active {
  transform: scale(0.95);
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

/* ---------------------------- */
.home-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 0.25rem;
  transition: all 0.3s ease;
  gap: 0.2rem; 
  height: 3rem;
}

.home-link:hover {
  background-color: rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.home-link:active {
  transform: translateY(0) scale(0.95); /* Güncellendi */
}

/* Logo ve başlık için ayrı hover efektleri */
.home-link .zakir {
  transition: transform 0.3s ease;
}

.home-link:hover .zakir {
  transform: scale(1.05) rotate(-9deg);
}

.home-link .title {
  transition: transform 0.3s ease;
}

.home-link:hover .title {
  transform: translateX(-4px) rotate(2deg);
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

/* Responsive tasarım için media queries */
@media (max-width: 360px) {
  .full-title { display: none; }
  .short-title { display: inline; }
}

@media (max-width: 260px) {
  .title { display: none; }
}
</style>
