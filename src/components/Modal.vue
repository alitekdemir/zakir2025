<!-- src/components/Modal.vue -->
<script setup>
import { watch } from 'vue'

const props = defineProps({
  show: Boolean,
  title: String
})

// Modal açılıp kapandığında body overflow'unu kontrol et
watch(() => props.show, (newValue) => {
  document.body.style.overflow = newValue ? 'hidden' : 'auto'
})

const emit = defineEmits(['close'])
</script>


<template>
  <Transition name="modal">
    <div v-if="show" class="modal-overlay" @click="emit('close')">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button class="close-button" @click="emit('close')">
            <i class="material-symbols">close</i>
          </button>
        </div>
        <!-- <hr class="divider"> -->
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.35); */
  backdrop-filter: blur(3px) brightness(70%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-body {
  padding: .75rem;
}

.modal-header {
  padding: .75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: rgba(0, 0, 0, 0.5); */
  /* background: var(--surface-variant); */
  /* background: var(--surface); */
  background: var(--card-background);
  filter: brightness(0.9);
  filter: brightness(1.5);
}

.modal-header h3 {
  font-size: small;
  font-weight: inherit;
  margin: 0;
  color: var(--text-secondary);
}

.modal-content {
  /* background: var(--surface); */
  background: var(--card-background);
  border-radius: .5rem;
  width: min(100vw - 1rem, var(--max-width));
  min-width: 100vw - 1rem;
  /* max-width: min(100vw - 1rem, var(--max-width)); */
  max-height: 80vh;
  overflow-y: auto;
}
.close-button {
  width: 32px;
  height: 32px;
  display: flex; /* Flexbox düzeni */
  align-items: center; /* Dikey ortalama */
  justify-content: center; /* Yatay ortalama */
  border-radius: 20%;
  /* background-color: white; */
  /* color: rgba(1, 121, 111, 0.952); */
  color: var(--red);
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-button:hover {
  color: white;
  background-color: var(--primary);
  border-radius: 20%;
}

/* Transition animasyonları */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.divider{
  width:100%;
  margin: 0 auto 8px;
}

</style>