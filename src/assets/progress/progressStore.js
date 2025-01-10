// src/assets/progressStore.js
import { ref, computed } from 'vue'

/**
 * Her bir widget’ın ağırlıkları
 */
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
  18: 12, // Sureler
}

/**
 * Her widget içerisindeki toplam parça sayıları
 */
export const partCounts = {
  1: 1,
  2: 1,
  3: 2,
  4: 1,
  5: 1,
  6: 1,
  7: 1,
  8: 1,
  9: 1,
  10: 1,
  11: 1,
  12: 1,
  13: 1,
  14: 1,
  15: 1,
  16: 2,
  17: 2,
  18: 4,
}

/**
 * Kullanıcının her widget’ta kaç parça ezberlediğini tutan değişken.
 * Başlangıçta her widget için "0" ezberli olarak kabul ediyoruz.
 */
export const memorizedParts = ref({
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
  14: 0,
  15: 0,
  16: 0,
  17: 0,
  18: 0
})

/**
 * Belirli bir widget’ın ezberlenen parça sayısını günceller.
 */
export function setMemorizedCount(widgetId, count) {
  memorizedParts.value[widgetId] = count
}

/**
 * Tüm widget’ların toplam ağırlığının hesaplanması.
 */
export const totalWeight = computed(() => {
  return Object.values(widgetWeights).reduce((sum, w) => sum + w, 0)
})

/**
 * Ezberlenen parçaların toplam ağırlığı.
 * memorizedParts içindeki değere göre, o widget’ın ağırlığının ezber yüzdesini alıyoruz.
 * Örnek: Widget #3’te 2 parça varsa ve 1’i ezberlenmişse => o widget’ın weight’i * (1/2).
 */
export const memorizedWeight = computed(() => {
  let total = 0
  for (const widgetId in widgetWeights) {
    const wId = parseInt(widgetId, 10)
    const weight = widgetWeights[wId]
    const totalParts = partCounts[wId]
    const learned = memorizedParts.value[wId]
    total += weight * (learned / totalParts)
  }
  return total
})

/**
 * Genel progress yüzdesi = (Ezberlenen parçaların toplam ağırlığı / Tüm ağırlık) * 100
 */
export const overallProgress = computed(() => {
  if (totalWeight.value === 0) return 0
  return (memorizedWeight.value / totalWeight.value) * 100
})
