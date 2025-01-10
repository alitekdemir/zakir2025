<!-- src/components/DropdownMenu.vue -->
<script setup>
const props = defineProps({
  show: Boolean,
  items: {
    type: Array,
    default: () => [
      { id: 'info', icon: 'info', label: 'Bilgi' },
      // { id: 'hint', icon: 'lightbulb', label: 'İpucu' },
      { id: 'memorized', icon: 'face', label: 'Ezberledim' },
    ]
  }
});

const emit = defineEmits(['select', 'close']);

const handleSelect = (itemId) => {
  emit('select', itemId);
  emit('close');
};
</script>

<template>
  <div v-show="show" class="dropdown">
    <div class="dropdown-menu">
      <button 
        v-for="item in items" 
        :key="item.id"
        class="menu-item"
        @click="handleSelect(item.id)"
      >
        <i class="material-icons">{{ item.icon }}</i>
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
