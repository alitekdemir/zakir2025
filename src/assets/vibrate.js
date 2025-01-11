// src/assets/vibrate.js
export const setupGlobalVibration = () => {
    document.addEventListener('click', (e) => {
      if (e.target.matches('button:not([data-no-vibrate])')) {
        if ('vibrate' in navigator) {
          navigator.vibrate(50)
        }
      }
    })
  }
  
  // v-vibrate direktifi için
  export const vibrate = {
    mounted(el, binding) {
      el.addEventListener('click', () => {
        if ('vibrate' in navigator) {
          navigator.vibrate(binding.value || 50)
        }
      })
    }
  }
  

// Global titreşimi kur `src/main.js` içine ekle
// setupGlobalVibration()
