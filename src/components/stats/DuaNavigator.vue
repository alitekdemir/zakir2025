<!-- src/components/DuaNavigator.vue -->
<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import VueScrollTo from 'vue-scrollto'

const props = defineProps({
  duaList: {
    type: Array,
    required: true
  }
});

const memorizedStates = ref(new Map());
const activeSection = ref(1);
// Navigatör görünürlüğü için ref
const isNavigatorVisible = ref(localStorage.getItem('show-navigator') !== 'false');

// Başlangıçta ve değişikliklerde ezberleme durumlarını kontrol et
const updateMemorizedStates = () => {
  props.duaList.forEach(dua => {
    const isMemorized = localStorage.getItem(`memorized-${dua.number}`) === 'true';
    memorizedStates.value.set(dua.number, isMemorized);
  });
};

// Storage event dinleyicisi
const handleStorageChange = (e) => {
  if (e.key && e.key.startsWith('memorized-')) {
    updateMemorizedStates();
  } else if (e.key === 'show-navigator') {
    isNavigatorVisible.value = localStorage.getItem('show-navigator') !== 'false';
  }
};

// Navigator görünürlüğü değişikliğini dinle
const handleNavigatorVisibilityChange = (e) => {
  isNavigatorVisible.value = e.detail.visible;
};

// Component mount olduğunda
onMounted(() => {
  updateMemorizedStates();
  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('memorization-change', updateMemorizedStates);
  window.addEventListener('navigator-visibility-change', handleNavigatorVisibilityChange);

  // Intersection Observer kurulumu
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        const sectionNumber = parseInt(entry.target.id.split('-')[1]);
        activeSection.value = sectionNumber;
      }
    });
  }, {
    root: null,
    rootMargin: '-20% 0px',
    threshold: [0.5]
  });

  // Tüm dua section'larını gözlemle
  props.duaList.forEach(dua => {
    const element = document.getElementById(`dua-${dua.number}`);
    if (element) observer.observe(element);
  });

  // Cleanup için observer'ı sakla
  onBeforeUnmount(() => {
    observer.disconnect();
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('memorization-change', updateMemorizedStates);
    window.removeEventListener('navigator-visibility-change', handleNavigatorVisibilityChange);
  });
});

const scrollToSection = (number) => {
  VueScrollTo.scrollTo(`#dua-${number}`, {
    duration: 500,
    easing: "ease",
    offset: -140,
    onStart: () => {
      activeSection.value = number;
    }
  });
};
</script>


<template>
  <div v-if="isNavigatorVisible" class="navigator-container" role="navigation" aria-label="Dua Navigasyonu">
    <div class="numbers-container">
      <button
        v-for="dua in duaList"
        :key="dua.number"
        class="number-btn"
        :class="{
          'memorized': memorizedStates.get(dua.number),
          'active': activeSection === dua.number
        }"
        @click="scrollToSection(dua.number)"
        :aria-label="`Dua ${dua.number} - ${dua.title}`"
        :aria-current="activeSection === dua.number ? 'true' : 'false'"
      >
        {{ dua.number }}
      </button>
    </div>
  </div>
</template>


<style scoped>
.navigator-container {
  width: 100%;
  max-width: var(--max-width);
  position: sticky;
  top: 4rem;
  background: var(--primary);
  margin: 0 0 1rem 0;
  z-index: 100;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: rgba(38, 57, 77, 0.20) 0px 10px 15px -5px;
}

.numbers-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.numbers-container::-webkit-scrollbar {
  display: none;
}

.number-btn {
  min-width: 2rem;
  height: 2rem;
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  border-radius: 0;
}

.number-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.number-btn.memorized {
  opacity: 0.5;
}

.number-btn.active {
  box-shadow: inset 0 -3px 0 0 white;
  background: rgba(255, 255, 255, 0.1);
  font-weight: bold;
}

</style>
