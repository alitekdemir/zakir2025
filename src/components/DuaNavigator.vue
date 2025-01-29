<!-- src/components/DuaNavigator.vue -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useProgress } from '../assets/useProgress';
import VueScrollTo from 'vue-scrollto'

const props = defineProps({
  duaList: {
    type: Array,
    required: true
  }
});

const memorizedStates = ref(new Map());
const activeSection = ref(1);

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
  }
};

// Component mount olduğunda
onMounted(() => {
  updateMemorizedStates();
  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('memorization-change', updateMemorizedStates);

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
  <div class="navigator-container">
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
      >
        {{ dua.number }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.navigator-container {
  position: sticky;
  top: 4rem;
  background: var(--background);
  margin: 0px 0 1rem 0;
  z-index: 100;
  border-bottom: 3px solid var(--primary);
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
  background: var(--primary-lighter);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.number-btn:hover {
  background: var(--primary-light);
}

.number-btn.memorized {
  opacity: 0.4;
  background: none;
  border-color: var(--primary-light);
}

.number-btn.active {
  box-shadow: inset 0 -3px 0 0 var(--primary);
  /* background: var(--primary-light); */
  /* color: white; */
}

</style>
