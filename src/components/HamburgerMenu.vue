<!-- src/components/HamburgerMenu.vue -->
<script setup>
import { watch, inject } from 'vue'
import UpdateCheck from './UpdateCheck.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['toggle'])

// TourGuide bileşeninden startTour methodunu inject et
const tourGuide = inject('tourGuide')

const startTour = async () => {
  emit('toggle') // Menüyü kapat
  if (router.currentRoute.value.path !== '/') {
    await router.push('/') // Ana sayfaya yönlendir
    // Yönlendirme sonrası küçük bir gecikme ekleyelim
    setTimeout(() => {
      tourGuide.startTour()
    }, 100)
  } else {
    tourGuide.startTour()
  }
}

watch(() => props.isOpen, (newValue) => {
  document.body.style.overflow = newValue ? 'hidden' : 'auto'
})
</script>



<template>
  <div>
    <button 
      class="hamburger-btn" 
      @click="emit('toggle')" 
      :class="{ 'open': isOpen }"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="menu" :class="{ 'open': isOpen }">
      <router-link to="/" @click="emit('toggle')">
          <i class="material-symbols">home</i>
          <span class="main">Ana Sayfa</span>
      </router-link>

      <!-- <hr class="divider"> -->

      <router-link to="/ayarlar" @click="emit('toggle')">
        <i class="material-symbols">text_format</i>
        Ayarlar
      </router-link>
      <router-link to="/istatistikler" @click="emit('toggle')">
        <i class="material-symbols">analytics</i>
        İstatistikler
      </router-link>
      


      <hr class="divider">
      


      <router-link to="/hakkinda" @click="emit('toggle')">
        <i class="material-symbols">help</i>
        Hakkında
      </router-link>

      <!-- Rehberi Göster butonu eklendi -->
      <a href="#" @click="startTour">
        <i class="material-symbols">tour</i>
        Kullanım Kılavuzu
      </a>

      <router-link to="/tesbihatin-faziletleri" @click="emit('toggle')">
        <i class="material-symbols">auto_awesome</i>
        Tesbihatın Faziletleri
      </router-link>
      
      <hr class="divider">
      
      <router-link to="/geri-bildirim" @click="emit('toggle')">
        <i class="material-symbols">feedback</i>
        Geri Bildirim
      </router-link>
      <UpdateCheck :closeMenu="() => emit('toggle')" />
    </div>

    <div class="overlay" :class="{ 'open': isOpen }" @click="emit('toggle')"></div>
  </div>
</template>

<style scoped>
.hamburger-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 48px;
  height: 48px;
  background: none;
  border: none;
  border-radius: 0.5rem;
  padding: 14px 12px;
  cursor: pointer;
  z-index: 100;
}

.hamburger-btn:hover {
  background-color: rgba(0, 0, 0, 0.15);
}

.hamburger-btn:active {
  transform: scale(0.95);
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
  align-items: left;
}

.main {
  /* font-size: 1.5rem; */
  font-size: x-large; 
  line-height: 1rem;
  font-weight: 300;
}

.menu.open {left: 0;}

.menu a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  padding: 1rem;
  transition: 0.2s;
  /* text-align: left; */
}
.menu a {
  display: flex;
  align-items: center;
  gap: 1rem; /* ikon ile metin arasında boşluk */
}

.menu a:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  font-weight: 500;
}

.overlay {
  position: fixed;
  top: 64px; /* Navbar yüksekliği kadar yukarıdan başla */
  left: 0;
  width: 100%;
  height: calc(100vh - 64px); /* Navbar'ı hariç tut */
  /* background-color: rgba(0, 0, 0, 0.2); */
  backdrop-filter: blur(3px) brightness(70%);
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
  width: 100%; 
  border-bottom: 1px solid rgba(255, 255, 255, 0.3); /* Saydamlık arttırıldı */
  margin: 1rem auto;
}


</style>
