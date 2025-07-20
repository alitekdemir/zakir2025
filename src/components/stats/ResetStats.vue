<!-- src/components/stats/ResetStats.vue -->
<script setup>
import { ref } from 'vue'
import { useStatsStore } from '../../assets/statsStore.js'

const statsStore = useStatsStore()
const showResetModal = ref(false)

const resetStats = () => {
  statsStore.resetStats()
  showResetModal.value = false
  // Sayfayı yenile
  window.location.reload()
}
</script>

<template>
  <div class="reset-section">
    <button @click="showResetModal = true" class="reset-button">
      <span class="material-symbols-outlined">delete</span>
      İstatistikleri Sıfırla
    </button>

    <div v-if="showResetModal" class="modal-overlay" @click="showResetModal = false">
      <div class="modal-content" @click.stop>
        <h3>İstatistikleri Sıfırla</h3>
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
    </div>
  </div>
</template>

<style scoped>
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
  align-items: center;
  gap: 0.5rem;
}

.reset-button:hover {
  background-color: var(--error-color-dark, #c82333);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--surface);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 90%;
  width: 400px;
  text-align: center;
}

.modal-content h3 {
  margin: 0 0 1rem;
  color: var(--text-primary);
}

.modal-content p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
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
