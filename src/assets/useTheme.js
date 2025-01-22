// src/assets/useTheme.js
import { ref } from 'vue'

export function useTheme() {
  const theme = ref(localStorage.getItem('theme') || 'light')

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  // Sayfa yüklendiğinde tema ayarını uygula
  document.documentElement.setAttribute('data-theme', theme.value)

  return {
    theme,
    toggleTheme
  }
}
