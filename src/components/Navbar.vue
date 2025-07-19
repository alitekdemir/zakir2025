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
const currentIcon = computed(() => scriptStyle.value === 'latin' ? abcIcon : elifbeIcon)
const themeIcon = computed(() => themeStore.isDark ? 'light_mode' : 'dark_mode')
</script>



<template>
  <nav class="navbar">
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
        <component :is="currentIcon" class="custom-icon" fill="currentColor" />
      </button>
    </div>

    <!-- Bildirim Alanı -->
    <div v-if="notification" class="notification">
      {{ notification }}
    </div>
  </nav>
</template>



<style scoped>
/* Navbar'a kutu modellemesi ekleniyor */
.navbar *,
.navbar *::before,
.navbar *::after {
  box-sizing: border-box;
}

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
  padding: 0 0.5rem;
  z-index: 102;
  gap: 0.5rem; /* Sol ve sağ bölümler arasında boşluk */
}

/* Sol ve Sağ Bölümler */
.navbar-left, .navbar-right {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* Sol bölümün esnekliği ve taşma yönetimi */
.navbar-left {
  flex-shrink: 1; /* Gerektiğinde küçülebilir */
  min-width: 0; /* Küçülmeye izin verir */
  overflow: hidden; /* Taşmayı gizler */
}

/* Başlık stilleri ve taşma yönetimi */
.title {
  font-size: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Taşan metinler için '...' */
  transition: transform 0.2s ease;
}

.short-title { display: none; }

/* Ana sayfa linki */
.home-link {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: inherit;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.home-link .zakir {
  flex-shrink: 0; /* İkonun küçülmesini engelle */
  transition: transform 0.3s ease;
}

/* Sağ taraftaki butonlar */
.navbar-right {
  flex-shrink: 0; /* Butonların küçülmesini engelle */
}

.navbar-right button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%; /* Dairesel butonlar */
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

/* İkonların boyutu */
.material-symbols {
  font-size: 26px;
}

.custom-icon {
  width: 26px;
  height: 26px;
}

/* Hover ve Aktif Durumları */
.navbar-right button:hover,
.home-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.navbar-right button:active,
.home-link:active {
  transform: scale(0.9);
}

.home-link:hover .zakir {
  transform: translateX(-4px) scale(1.2) rotate(-9deg);
}
.home-link:hover .title {
  transform: translateX(-4px) scale(1.2) rotate(2deg);
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

/* Responsive tasarım */
/* iPhone SE gibi dar ekranlar (375px) */
@media (max-width: 24rem) {
  .full-title { display: none; }
  .short-title { display: inline; }
  .navbar {
    padding: 0 0.25rem;
    gap: 0.25rem;
  }
}

/* Çok dar ekranlar (örn. 280px) */
@media (max-width: 17.5rem) {
  .title { display: none; }
}
</style>
