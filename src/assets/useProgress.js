// src/assets/useProgress.js
import { ref, provide, inject } from 'vue'

const progressKey = Symbol()

export function createProgress() {
  const progress = ref(0)
  
  const updateProgress = (newScore) => {
    progress.value = newScore
  }

  provide(progressKey, {
    progress,
    updateProgress
  })
}

export function useProgress() {
  const context = inject(progressKey)
  
  if (!context) {
    throw new Error('useProgress must be used within a provider')
  }

  return context
}

export const widgetWeights = {
    1: 1,   // Entesselam
    2: 2,   // Tuncina
    3: 4,   // SabahAksam
    4: 9,   // Ecirna
    5: 1,   // Subhanallahi
    6: 3,   // AyetTrKursi
    7: 1,   // Tesbih
    8: 1,   // Tevhid
    9: 1,   // Dua
    10: 1,  // Falem
    11: 2,  // Selam
    12: 1,  // Kesira
    13: 1,  // SalliveSellim
    14: 1,  // Elfu
    15: 3,  // Biadedi
    16: 20, // IsmiAzam
    17: 6,  // IsmiAzamDua
    18: 12, // Aşirler
  }