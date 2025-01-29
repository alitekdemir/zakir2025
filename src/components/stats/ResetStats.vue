<!-- src/components/stats/ResetStats.vue -->
<script setup>
import { ref } from 'vue'
import { useStatsStore } from '../../assets/statsStore'
import Modal from '../Modal.vue'

const stats = useStatsStore()
const showResetModal = ref(false)

const resetStats = () => {
  stats.resetStats()
  showResetModal.value = false
  // Sayfayı yenile
  window.location.reload()
}
</script>

<template>
  <div class="reset-section">
    <button @click="showResetModal = true" class="reset-button">
      <span class="material-symbols icon">delete</span>
      İstatistikleri Sıfırla
    </button>

    <Modal 
      :show="showResetModal" 
      title="İstatistikleri Sıfırla" 
      @close="showResetModal = false"
    >
      <div class="modal-content-wrapper">
        <p>İstatistikleri sıfırlamak istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
        <div class="modal-buttons">
          <button 
            @click="resetStats" 
            class="confirm-button"
          >
            Evet, Sıfırla
          </button>
          <button 
            @click="showResetModal = false" 
            class="cancel-button"
          >
            İptal
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped>

.icon {font-size: 1.25rem; color: white;}

.reset-section {
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid var(--border-color);
}

.reset-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--error-color, #dc3545);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}

.reset-button:hover {
  background-color: var(--error-color-dark, #c82333);
}

.reset-note {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.modal-content-wrapper {
  padding: 1rem;
  text-align: center;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.confirm-button, .cancel-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.confirm-button {
  background-color: var(--error-color, #dc3545);
  color: white;
}

.confirm-button:hover {
  background-color: var(--error-color-dark, #c82333);
}

.cancel-button {
  background-color: var(--surface-variant);
  color: var(--text-primary);
}

.cancel-button:hover {
  background-color: var(--surface-variant-dark);
}
</style>
