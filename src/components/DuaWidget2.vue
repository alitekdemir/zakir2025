<!-- src/components/DuaWidget.vue -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Modal from './Modal.vue';
import DropdownMenu from './DropdownMenu.vue';
import { useProgress, widgetWeights } from '../assets/useProgress';

const props = defineProps({
  number: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    default: ''
  }
});

const { updateProgress } = useProgress();
const showDropdown = ref(false);
const showInfoModal = ref(false);
const showMemorizedModal = ref(false);
const showHintModal = ref(false);
const isMemorized = ref(false);

onMounted(() => {
  const memorizedState = localStorage.getItem(`memorized-${props.number}`);
  isMemorized.value = memorizedState === 'true';
  document.addEventListener('click', handleClickOutside);
});

const handleMemorized = () => {
  isMemorized.value = true;
  localStorage.setItem(`memorized-${props.number}`, 'true');
  showMemorizedModal.value = false;
  
  const currentScore = parseInt(localStorage.getItem('memorization-score') || '0');
  const widgetWeight = widgetWeights[props.number] || 1;
  localStorage.setItem('memorization-score', currentScore + widgetWeight);
};

const closeDropdown = () => {
  showDropdown.value = false;
};

const handleClickOutside = (e) => {
  const dropdown = document.querySelector('.dropdown');
  const toggleBtn = document.querySelector('.more-btn');
  if (dropdown && !dropdown.contains(e.target) && !toggleBtn?.contains(e.target)) {
    showDropdown.value = false;
  }
};

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const handleMemorizedToggle = () => {
  isMemorized.value = !isMemorized.value;
  localStorage.setItem(`memorized-${props.number}`, isMemorized.value);
  showMemorizedModal.value = false;
  
  const currentScore = parseInt(localStorage.getItem('memorization-score') || '0');
  const widgetWeight = widgetWeights[props.number] || 1;
  
  const newScore = isMemorized.value 
    ? currentScore + widgetWeight 
    : currentScore - widgetWeight;

  localStorage.setItem('memorization-score', newScore);
  updateProgress(newScore);
};

</script>

<template>
  <div class="dua-widget" :class="{ 'memorized': isMemorized }">
    <div class="widget-header">
      <div class="number">{{ number }}</div>
      <span v-if="title" class="title">{{ title }}</span>
      <div class="dropdown-container">
        <button class="more-btn" @click.stop="showDropdown = !showDropdown">
          <i class="material-symbols">more_vert</i>
        </button>

        <DropdownMenu
          :show="showDropdown"
          @info="showInfoModal = true; closeDropdown()"
          @hint="showHintModal = true; closeDropdown()"
          @memorized="showMemorizedModal = true; closeDropdown()"
          @close="closeDropdown"
        />
      </div>
    </div>

    <div class="widget-content">
      <slot></slot>
    </div>

    <!-- Modals -->
    <Modal 
      :show="showInfoModal"
      title="Bilgi"
      @close="showInfoModal = false"
    >
      <slot name="info-content"></slot>
    </Modal>

    <Modal
      :show="showMemorizedModal"
      title="Ezberlenme Durumu"
      @close="showMemorizedModal = false"
    >
      <div class="memorized-content">
        <p v-if="!isMemorized">Bu duayı ezberlediğinizi işaretlemek ister misiniz?</p>
        <p v-else>Bu duayı ezberlenmedi olarak işaretlemek ister misiniz?</p>
        <button 
          class="confirm-btn" 
          @click="handleMemorizedToggle"
        >
          {{ isMemorized ? 'Ezberlenmedi Olarak İşaretle' : 'Evet, Ezberledim' }}
        </button>
      </div>
    </Modal>

    <Modal
      :show="showHintModal"
      title="İpucu"
      @close="showHintModal = false"
    >
      <div class="hint-content">
        <p>Bu dua için ipuçları yakında eklenecek.</p>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.dua-widget {
  background: white;
  border-radius: 12px;
  padding: 0.8rem;
  box-shadow: 0 4px 12px hsl(0, 0%, 90%);
  border: 1px solid var(--primary-light);
  transition: all 0.3s ease;
}

.dua-widget.memorized {
  border: 1px solid rgba(1, 121, 111, 0.99);
  background-color: #f8f8f8;
}


.dua-widget.memorized .widget-content {
  opacity: 0.7;
  color: #666;
}

.dua-widget.memorized .number {
  background: rgba(1, 121, 111, 0.1);
}

.widget-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.number {
  min-width: 32px;
  height: 32px;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.title {
  flex: 1;
  margin: 0;
  font-size: 0.9rem;
  color: var(--primary);
  text-align: left;
}

.more-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  background-color: white;
  border-radius: 20%;
  transition: background-color 0.2s;
}

.more-btn:hover {
  background-color: var(--primary-light);
}

.dropdown-container {
  position: relative;
}

.confirm-btn {
  background: var(--primary);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.confirm-btn:hover {
  background: rgba(1, 121, 111, 0.9);
}

.memorized-content,
.hint-content {
  padding: 1rem;
  text-align: center;
}
</style>
