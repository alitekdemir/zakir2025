<!-- src/components/DuaWidget.vue -->
<script setup>
  import { ref, onMounted } from 'vue'
  import Modal from './Modal.vue'
  
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
  
  const isContentVisible = ref(false) // Accordion için yeni ref
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
      <!-- Header'a tıklanabilir özellik eklendi -->
      <div 
        class="widget-header" 
        @click="isContentVisible = !isContentVisible"
        :class="{ 'active': isContentVisible }"
      >
        <div class="number">{{ number }}</div>
        <span v-if="title" class="title">{{ title }}</span>
        <!-- Dropdown için click event'in yayılmasını engelleyelim -->
        <div class="dropdown-container" @click.stop>
          <button class="more-btn" @click.stop="showDropdown = !showDropdown">
            <i class="material-symbols">more_vert</i>
          </button>
  
          <div v-show="showDropdown" class="dropdown">
            <div class="dropdown-menu">
              <button class="menu-item" @click="showInfoModal = true; closeDropdown()">
                <i class="material-symbols">info</i>
                <span>Bilgi</span>
              </button>
              <button class="menu-item" @click="showHintModal = true; closeDropdown()">
                <i class="material-symbols">lightbulb</i>
                <span>İpucu</span>  
              </button>
              <button class="menu-item" @click="showMemorizedModal = true; closeDropdown()">
                <i class="material-symbols">face</i>
                <span>Ezberledim</span>
              </button>
            </div>
          </div>
        </div>
        <!-- Accordion icon eklendi -->
        <i class="material-symbols accordion-icon" :class="{ 'rotated': isContentVisible }">
          expand_more
        </i>
      </div>
  
      <!-- Content kısmı transition ile beraber -->
      <transition name="accordion">
        <div v-show="isContentVisible" class="widget-content">
          <slot></slot>
        </div>
      </transition>
  
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
    /* margin: 0.5rem; */
    background: white;
    border-radius: 12px;
    padding: 0.8rem;
    box-shadow: 0 4px 12px hsl(0, 0%, 90%);
    border: 1px solid var(--text-gray);
    border: 1px solid hsl(0, 0%, 90%);
    border: 1px solid var(--primary-light);
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
    color: var(--text-dark);
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
  
  .widget-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .widget-header {
    cursor: pointer;
    user-select: none;
    position: relative;
    padding-right: 40px; /* Icon için alan */
  }
  
  .widget-header:hover {
    background-color: var(--primary-light);
    border-radius: 8px;
  }
  
  /* Active durumu için stil */
  .widget-header.active {
    border-bottom: 1px solid var(--primary-light);
    margin-bottom: 12px;
  }
  
  .accordion-icon {
    position: absolute;
    right: 8px;
    transition: transform 0.3s ease;
  }
  
  .accordion-icon.rotated {
    transform: rotate(180deg);
  }
  
  /* Accordion animasyonu için */
  .accordion-enter-active,
  .accordion-leave-active {
    transition: max-height 0.3s ease-out;
    overflow: hidden;
  }
  
  .accordion-enter-from,
  .accordion-leave-to {
    max-height: 0;
  }
  
  .accordion-enter-to,
  .accordion-leave-from {
    max-height: 1000px; /* İçeriğin maximum yüksekliği */
  }
  
  .widget-content {
    overflow: hidden;
  }
  
  </style>
  