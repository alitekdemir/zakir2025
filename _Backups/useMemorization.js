// src/assets/useMemorization.js
import { ref, computed } from 'vue'
import { widgetWeights, partCounts } from './memorizationData'

export function useMemorization() {
  const getStoredProgress = () => {
    try {
      const stored = localStorage.getItem('memorization-progress')
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.error('Error loading memorization progress:', error)
      return {}
    }
  }

  const memorizedParts = ref(getStoredProgress())

  const saveProgress = () => {
    try {
      localStorage.setItem(
        'memorization-progress', 
        JSON.stringify(memorizedParts.value)
      )
    } catch (error) {
      console.error('Error saving memorization progress:', error)
    }
  }

  const updateMemorization = (widgetId, isMemorized) => {
    if (isMemorized) {
      memorizedParts.value[widgetId] = Array.from(
        { length: partCounts[widgetId] }, 
        (_, i) => i
      )
    } else {
      delete memorizedParts.value[widgetId]
    }
    saveProgress()
  }

  const totalProgress = computed(() => {
    let totalWeight = 0
    let memorizedWeight = 0

    Object.entries(widgetWeights).forEach(([id, weight]) => {
      totalWeight += weight
      if (memorizedParts.value[id]?.length === partCounts[id]) {
        memorizedWeight += weight
      }
    })

    return (memorizedWeight / totalWeight) * 100
  })

  const getWidgetProgress = (widgetId) => {
    const parts = memorizedParts.value[widgetId] || []
    return {
      memorizedCount: parts.length,
      totalParts: partCounts[widgetId],
      opacity: parts.length / partCounts[widgetId],
      isFullyMemorized: parts.length === partCounts[widgetId]
    }
  }

  return {
    updateMemorization,
    totalProgress,
    getWidgetProgress
  }
}
