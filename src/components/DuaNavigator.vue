<!-- src/components/DuaNavigator.vue -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'; // onMounted ve onBeforeUnmount ekledik
import { useProgress } from '../assets/useProgress';

const props = defineProps({
  duaList: {
    type: Array,
    required: true
  }
});

const memorizedStates = ref(new Map());

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
});

// Component unmount olduğunda
onBeforeUnmount(() => {
  window.removeEventListener('storage', handleStorageChange);
  window.removeEventListener('memorization-change', updateMemorizedStates);
});

const scrollToSection = (number) => {
  const element = document.getElementById(`dua-${number}`);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  }
};
</script>

<template>
  <div class="navigator-container">
    <div class="numbers-container">
      <button
        v-for="dua in duaList"
        :key="dua.number"
        class="number-btn"
        :class="{ 'memorized': memorizedStates.get(dua.number) }"
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
  background: var(--background);
  /* padding: 0.5rem; */
  margin: 0px 0 1rem 0;
  z-index: 100;
  border-bottom: 3px solid var(--primary);
  box-shadow: rgba(38, 57, 77, 0.20) 0px 10px 15px -5px;
  

}


.numbers-container {
  display: flex;
  flex-wrap: wrap; /* İki satıra izin ver */
  justify-content: center; /* Merkezde hizala */
  /* gap: 0.5rem; */
}

.numbers-container::-webkit-scrollbar {
  display: none;
}

.number-btn {
  min-width: 2rem;
  height: 2rem;
  /* border-radius: 10%; */
  /* border: 1px solid var(--primary-light); */
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

</style>
