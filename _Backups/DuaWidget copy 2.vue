<!-- src/components/DuaWidget.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import Modal from './Modal.vue'
import DropdownMenu from './DropdownMenu.vue'

defineProps({
  number: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})

const showDropdown = ref(false)
const showInfoModal = ref(false)
const showMemorizedModal = ref(false)
const showHintModal = ref(false)

const closeDropdown = () => {
  showDropdown.value = false
}

onMounted(() => {
  document.addEventListener('click', (e) => {
    const dropdown = document.querySelector('.dropdown')
    const toggleBtn = document.querySelector('.more-btn')
    if (dropdown && !dropdown.contains(e.target) && !toggleBtn?.contains(e.target)) {
      showDropdown.value = false
    }
  })
})
</script>



<template>
  <div class="dua-widget">
    <div class="widget-header">
      <div class="number">{{ number }}</div>
      <span v-if="title" class="title">{{ title }}</span>
      <div class="dropdown-container">
        <button class="more-btn" @click.stop="showDropdown = !showDropdown">
          <i class="material-symbols">more_vert</i>
        </button>

        <DropdownMenu
          :show="showDropdown"
          @info-click="showInfoModal = true; closeDropdown()"
          @hint-click="showHintModal = true; closeDropdown()"
          @memorized-click="showMemorizedModal = true; closeDropdown()"
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
      title="Ezberledim"
      @close="showMemorizedModal = false"
    >
      <div class="memorized-content">
        <p>Bu duayı ezberlediğinizi işaretlemek ister misiniz?</p>
        <button class="confirm-btn">Evet, Ezberledim</button>
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
  margin: 0.5rem;
  background: white;
  border-radius: 12px;
  padding: 0.8rem;
  box-shadow: 0 4px 8px hsl(0, 0%, 88%);
  border: 1px solid hsl(0, 0%, 88%);
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
  z-index: 12;
}

.confirm-btn {
  background: var(--primary);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  margin-top: 1rem;
}

.memorized-content,
.hint-content {
  padding: 1rem;
  text-align: center;
}
</style>
