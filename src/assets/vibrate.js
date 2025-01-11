// src/assets/vibrate.js

// Titreşim patternleri
export const VIBRATION_PATTERNS = {
    normal: 50,                         // Normal tıklama
    tesbih33: [200, 50, 200],           // Tesbih 33, 66
    tesbih99: [200, 50, 200, 50, 200],  // Tesbih 99
    falem33:  [200, 50, 200],           // Falem 33
    falem100: [200, 50, 200, 50, 200]   // Falem 100
  }
  
  // Titreşim yardımcı fonksiyonu
  export const vibrateWithPattern = (pattern) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern)
    }
  }
  
  // Tevhid için titreşim fonksiyonu
  export const useTevhidVibration = (count) => {
    if (count === 10) {
      return vibrateWithPattern(VIBRATION_PATTERNS.tesbih99)
    } 
    return vibrateWithPattern(VIBRATION_PATTERNS.normal)
  }

  // Tesbih için titreşim fonksiyonu
  export const useTesbihVibration = (count) => {
    if (count === 99) {
      return vibrateWithPattern(VIBRATION_PATTERNS.tesbih99)
    } else if (count % 33 === 0) {
      return vibrateWithPattern(VIBRATION_PATTERNS.tesbih33)
    }
    return vibrateWithPattern(VIBRATION_PATTERNS.normal)
  }
  
  // Falem için titreşim fonksiyonu
  export const useFalemVibration = (count) => {
    if (count === 100) {
      return vibrateWithPattern(VIBRATION_PATTERNS.falem100)
    } else if (count === 33) {
      return vibrateWithPattern(VIBRATION_PATTERNS.falem33)
    }
    return vibrateWithPattern(VIBRATION_PATTERNS.normal)
  }
  
  // Genel v-vibrate direktifi
  export const vibrate = {
    mounted(el, binding) {
      el.addEventListener('click', () => {
        const pattern = binding.value || VIBRATION_PATTERNS.normal
        vibrateWithPattern(pattern)
      })
    }
  }
  
  // Global buton titreşimi (isteğe bağlı)
  export const setupGlobalVibration = () => {
    document.addEventListener('click', (e) => {
      if (e.target.matches('button:not([data-no-vibrate])')) {
        vibrateWithPattern(VIBRATION_PATTERNS.normal)
      }
    })
  }
  

// Global titreşimi kur `src/main.js` içine ekle
// setupGlobalVibration()
