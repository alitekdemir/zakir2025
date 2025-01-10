<!-- src/components/DropdownMenu.vue -->
<script setup>
const props = defineProps({
  show: Boolean,
  items: {
    type: Array,
    default: () => [
      { id: 'info', icon: 'info', label: 'Bilgi' },
      { id: 'hint', icon: 'lightbulb', label: 'İpucu' },
      { id: 'memorized', icon: 'face', label: 'Ezberledim' },
    ]
  }
})

const emit = defineEmits(['select'])

const handleClick = (itemId) => {
  emit('select', itemId)
}
</script>

<template>
  <Transition name="dropdown">
    <div v-if="show" class="dropdown">
      <div class="dropdown-menu">
        <button
          v-for="item in items"
          :key="item.id"
          class="menu-item"
          @click="handleClick(item.id)"
        >
          <i class="material-icons">{{ item.icon }}</i>
          <span>{{ item.label }}</span>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
  min-width: 140px;
  z-index: 10;
}

.dropdown-menu {
  padding: 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  color: var(--text-dark);
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background-color: var(--primary-light);
  color: var(--primary);
  transform: translateX(2px);
}

.menu-item i {
  font-size: 18px;
}

/* Transition Animations */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
