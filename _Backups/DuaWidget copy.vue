<!-- src/components/DuaWidget.vue -->
<script setup>
import { ref } from 'vue'
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

const showInfoModal = ref(false)
</script>



<template>
  <div class="dua-widget">
    <div class="widget-header">
      <div class="number-title">
        <div class="number">{{ number }}</div>
        <p v-if="title" class="title">{{ title }}</p>
      </div>
      <button class="info-btn" @click="showInfoModal = true">
        <i class="material-icons">info</i>
      </button>
    </div>
    <div class="widget-content">
      <slot></slot>
    </div>

    <!-- Info Modal -->
    <Modal 
      :show="showInfoModal"
      :title="title ? title + ' Hakkında' : 'Bilgi'"
      @close="showInfoModal = false"
    >
      <slot name="info-content"></slot>
    </Modal>
  </div>
</template>

<style scoped>
.dua-widget {
  background-color: white;
  border-radius: 16px;
  margin: 0.5rem;
  padding: 0.8rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* border: 1px solid rgba(255, 82, 82, 0.2); */
  border: 1px solid var(--primary);
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  margin-bottom: 1rem;
}

.number-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  gap: 8px;
}

.number {
  background-color: var(--primary-light);
  color: var(--primary);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 8px;
}

.title {
  color: var(--primary);
  font-size: 0.8rem;
  /* font-weight: bold; */
  margin: 0;
}

.info-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(255, 82, 82, 0.15);
}

.widget-content {
  color: var(--text-dark);
  text-align: center;
  /* align-items: center; */
}
</style>