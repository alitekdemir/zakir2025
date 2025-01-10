<!-- src/components/DuaWidget.vue -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Modal from './Modal.vue';

defineProps({
  number: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    default: ''
  }
});

const showDropdown = ref(false);
const showInfoModal = ref(false);
const showMemorizedModal = ref(false);
const showHintModal = ref(false);

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

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="dua-widget">
    <div class="widget-header">
      <div class="number">{{ number }}</div>
      <span v-if="title" class="title">{{ title }}</span>
      <div class="dropdown-container">
        <!-- <button class="more-btn" @click.stop="showDropdown = !showDropdown">
          <i class="material-icons">more_vert</i>
        </button> -->

        <div v-show="showDropdown" class="dropdown">
          <div class="dropdown-menu">
            <button class="menu-item" @click="showInfoModal = true; closeDropdown()">
              <i class="material-icons">info</i>
              <span>Bilgi</span>
            </button>
            <button class="menu-item" @click="showHintModal = true; closeDropdown()">
              <i class="material-icons">lightbulb</i>
              <span>İpucu</span>  
            </button>
            <button class="menu-item" @click="showMemorizedModal = true; closeDropdown()">
              <i class="material-icons">face</i>
              <span>Ezberledim</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="widget-content">
      <slot></slot>
    </div>

    <!-- Info Modal -->
    <Modal 
      :show="showInfoModal"
      title="Bilgi"
      @close="showInfoModal = false"
    >
      <slot name="info-content"></slot>
    </Modal>

    <!-- Memorized Modal -->
    <Modal
      :show="showMemorizedModal"
      title="Ezberledim"
      @close="showMemorizedModal = false"
    >
      <div class="memorized-content">
        <p>Bu duayı ezberlediğinizi işaretlemek ister misiniz?</p>
        <button class="confirm-btn">Evet, Ezberledim</button>
      </div>
    </Modal>

    <!-- Hint Modal -->
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
  border-radius: 0.8rem;
  padding: 0.8rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--primary-light);
  /* box-shadow: 0 0 0 1px var(--primary), 4px 6px 0 0 var(--primary); */
  /* box-shadow: 0 0 0 1px var(--primary-light); */
}

.widget-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
}

.number {
  min-width: 2rem;
  height: 2rem;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  user-select: none;
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

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 120px;
  overflow: hidden;
  animation: slideDown 0.2s ease-out;
}

.dropdown-menu {
  padding: 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  color: var(--text-dark);
  transition: background-color 0.2s;
  border-radius: 6px;
}

.menu-item:hover {
  background-color: var(--primary-light);
  color: var(--primary);
}

.menu-item i {
  font-size: 20px;
}

.menu-item span {
  font-size: 0.9rem;
}

.confirm-btn {
  background: var(--primary);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  margin-top: 1rem;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Modal içerikleri için ek stiller */
.memorized-content,
.hint-content {
  padding: 1rem;
  text-align: center;
}

</style>
