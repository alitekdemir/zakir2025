<!-- src/components/DropdownMenu.vue -->
<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
  show: Boolean,
  items: {
    type: Array,
    default: () => [
      { id: 'info', icon: 'info', label: 'Bilgi' },
      { id: 'memorized', icon: 'face', label: 'Ezberledim' },
    ],
  },
});

const emit = defineEmits(['info', 'memorized', 'hint', 'close']);

// Dropdown menüsüne tıklama işlemi
const handleClick = (event) => {
  const itemId = event.target.closest('.menu-item')?.dataset.id;
  if (itemId) {
    // Doğrudan ilgili event'i emit et
    emit(itemId);
    emit('close');
  }
};

// Klavye navigasyonu için
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    emit('close');
  }
};

// Dropdown gösterildiğinde klavye event'ini dinle
watchEffect(() => {
  if (props.show) {
    document.addEventListener('keydown', handleKeydown);
  } else {
    document.removeEventListener('keydown', handleKeydown);
  }
});
</script>


<template>
  <div
    v-show="show"
    class="dropdown"
    @click="handleClick"
  >
    <div class="dropdown-menu" role="menu">
      <button
        v-for="item in items"
        :key="item.id"
        class="menu-item"
        :data-id="item.id"
        role="menuitem"
        tabindex="0"
      >
        <i class="material-symbols" aria-hidden="true">{{ item.icon }}</i>
        <span>{{ item.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: var(--background);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
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
  color: var(--text-primary);
  transition: background-color 0.2s, color 0.2s;
  border-radius: 6px;
  cursor: pointer;
  background: none;
  border: none;
  text-align: left;
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
</style>
