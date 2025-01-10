<!-- src/components/Modal.vue -->
<script setup>
defineProps({
  show: Boolean,
  title: String
})

// Modal'ı kapatmak için emit tanımlıyoruz
const emit = defineEmits(['close'])
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-overlay" @click="emit('close')">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button class="close-button" @click="emit('close')">
            <i class="material-icons">close</i>
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: .5rem;
  width: min(100vw - 1rem, var(--max-width));
  min-width: 100vw - 1rem;
  /* max-width: min(100vw - 1rem, var(--max-width)); */
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  padding: .75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background: rgba(0, 0, 0, 0.03);
}
.modal-body {
  padding: .75rem;
}

.modal-header h3 {
  font-size: small;
  /* font-weight: lighter; */
  font-weight: 400;
  margin: 0;
  color: var(--text-dark);
}

.close-button {
  width: 32px;
  height: 32px;
  display: flex; /* Flexbox düzeni */
  align-items: center; /* Dikey ortalama */
  justify-content: center; /* Yatay ortalama */
  border-radius: 20%;
  /* background-color: white; */
  color: var(--primary);
  color: rgba(1, 121, 111, 0.952);
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