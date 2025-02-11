<!-- src/components/DuaWidget.vue -->
<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import Modal from './Modal.vue';
import DropdownMenu from './DropdownMenu.vue';
import { useProgress, widgetWeights } from '../assets/useProgress';

const props = defineProps({
  number: { type: [String, Number], required: true },
  title: { type: String, default: '' }
});

// Computed property olarak dropdownItems'ı tanımla
const dropdownItems = computed(() => [
  { id: 'info', icon: 'info', label: 'Bilgi' },
  { id: 'memorized', icon: 'face', label: isMemorized.value ? 'Unuttum' : 'Ezberledim'},
]);
const modalTitle = computed(() => 
  isMemorized.value ? 'Unuttuğunuzu mu Düşünüyorsunuz?' : 'Ezberlediniz mi?'
);

// Collapse için yeni ref ekliyoruz
const isCollapsed = ref(false);
const { updateProgress } = useProgress();
const showDropdown = ref(false);
const showInfoModal = ref(false);
const showMemorizedModal = ref(false);
const showHintModal = ref(false);
const isMemorized = ref(false);

onMounted(() => {
  const memorizedState = localStorage.getItem(`memorized-${props.number}`);
  isMemorized.value = memorizedState === 'true';
  isCollapsed.value = isMemorized.value;
  document.addEventListener('click', handleClickOutside);
});

// Ezberlenme durumu değiştiğinde collapse durumunu güncelle
watch(isMemorized, (newValue) => {
  if (newValue) {
    isCollapsed.value = true;
  }
});

const closeDropdown = () => { showDropdown.value = false; };

const handleClickOutside = (e) => {
  const dropdown = document.querySelector('.dropdown');
  const toggleBtn = document.querySelector('.more-btn');
  if (dropdown && !dropdown.contains(e.target) && !toggleBtn?.contains(e.target)) {
    showDropdown.value = false;
  }
};

onBeforeUnmount(() => { document.removeEventListener('click', handleClickOutside); });

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

  // Custom event dispatch et
  window.dispatchEvent(new Event('memorization-change'));
};

</script>

<template>
  <div class="dua-widget" :class="{ 'memorized': isMemorized, 'collapsed': isCollapsed }">
    <div class="widget-header">
      <div class="header-main" @click="isCollapsed = !isCollapsed">
        <div class="number">
          {{ number }}
        </div>
        <span v-if="title" class="title">{{ title }}</span>
        <!-- <div class="collapse-indicator"> {{ isCollapsed ? '▼' : '▲' }} </div> -->
      </div>
      
      <div class="dropdown-container">
        <button class="more-btn" @click.stop="showDropdown = !showDropdown">
          <i class="material-symbols">more_vert</i>
        </button>

        <!-- items prop'unu dinamik items ile değiştir -->
        <DropdownMenu
          :show="showDropdown"
          :items="dropdownItems"
          @info="showInfoModal = true; closeDropdown()"
          @hint="showHintModal = true; closeDropdown()"
          @memorized="showMemorizedModal = true; closeDropdown()"
          @close="closeDropdown"
        />
      </div>
    </div>

    <transition name="collapse">
      <div v-show="!isCollapsed" class="widget-content">
        <slot></slot>
      </div>
    </transition>

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
    :title="modalTitle"
    @close="showMemorizedModal = false"
  >
    <div class="memorized-content">
      <p v-if="!isMemorized">
        <div style="font-size: large;">Bu duayı ezberlediğinizden emin misiniz?</div>
        <span>Ezberledim olarak işaretlerseniz:</span>
        <ul>
          <li>Dua kartı küçültülecek</li>
          <li>İlerleme çubuğunuz güncellenecek</li>
          <li>İstediğiniz zaman tekrar "Unuttum" diyebilirsiniz</li>
        </ul>
      </p>
      <p v-else>
        <div style="font-size: large;">Bu duayı tekrar çalışmanız mı gerekiyor?</div>
        <span>"Unuttum" derseniz:</span>
        <ul>
          <li>Dua kartı tekrar açılacak</li>
          <li>İlerleme çubuğunuz güncellenecek</li>
          <li>Duayı tekrar çalışıp ezberleyince işaretleyebilirsiniz</li>
        </ul>
      </p>
      <button 
        class="confirm-btn" 
        @click="handleMemorizedToggle"
      >
        {{ isMemorized ? 'Evet, Tekrar Çalışmam Gerek' : 'Evet, Bu Duayı Ezberledim' }}
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
  color: var(--text-primary);
  background: var(--card-background);
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--primary-light);
  border: 1px solid var(--primary);
  box-shadow: var(--card-shadow);
  transition: all 0.3s ease;
  scroll-margin-top: 80px; /* Navbar + Navigator yüksekliği */
}

.dua-widget {
  width: 100%;
  box-sizing: border-box;
}

/* Collapsed durumunda padding ve margin'leri azalt */
.dua-widget.collapsed {
  padding: 0.2rem;
}

/* Header margin'i collapsed durumunda sıfırla */
.dua-widget.collapsed .widget-header {
  margin-bottom: 0;
}


.dua-widget.memorized {
  border: none;
  box-shadow: none;
  border: 1px solid var(--primary-light);
  background-color: var(--primary-lighter);
}


.dua-widget.memorized .widget-content {
  opacity: 0.935;
  /* color: var(--text-primary); */
}

.dua-widget.memorized .number {
  background: rgba(1, 121, 111, 0.1);
  background: none;
  color: var(--primary-light);
}
.dua-widget.memorized .title {
  opacity: 0.935;
}

.dua-widget.memorized .title {
  opacity: 0.5;
  color: indianred;
  color: var(--text-primary);
  color: var(--primary-light);
  color: var(--primary-dark);
  color: var(--primary);
}


.widget-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.1rem;
  /* margin-bottom: 1rem; */
  cursor: pointer;
  user-select: none;
  justify-content: space-between;
  transition: margin-bottom 0.3s ease;
}

.collapse-indicator {
  color: var(--primary-light);
  margin-left: auto;
  margin-right: 0.25rem;
  font-size: 0.8rem;
}

.widget-content {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.3s ease;
  overflow: hidden;
  padding-top: 0.5rem;
  transition: padding 0.3s ease;
}

.dua-widget.collapsed .widget-content {
  padding-top: 0;
}

.widget-content.collapsed {
  grid-template-rows: 0fr;
}

.number {
  min-width: 32px;
  height: 32px;
  background: var(--primary-lighter);
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
  /* color: var(--primary); */
  color: var(--text-tertiary);
  text-align: left;
}


.header-main {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  cursor: pointer;
  width: 100%;
  min-width: 0;
}


.more-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  /* background-color: var(--background); */
  background-color: none;
  border-radius: 20%;
  transition: background-color 0.2s;
}

.more-btn:hover {
  background-color: var(--hover-background);
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
  transition: all 0.2s ease;
}

.confirm-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}


.memorized-content,
.hint-content {
  padding: 1rem;
  text-align: center;
}


/* Collapse Animation */
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
  max-height: 500px; /* max-height değerini düşür */
  opacity: 1;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  margin-bottom: 0;
}






.memorized-content ul {
  text-align: left;
  margin: 1rem 0;
  padding-left: 1.5rem;
  color: var(--text-secondary);
}

.memorized-content li {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

</style>
