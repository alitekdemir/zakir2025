// src/assets/themeStore.js
import { defineStore } from 'pinia'
import { themes, DEFAULT_THEME, DEFAULT_MODE } from './themes'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    currentTheme: localStorage.getItem('selected-theme') || DEFAULT_THEME,
    currentMode: localStorage.getItem('theme-mode') || DEFAULT_MODE
  }),

  getters: {
    themeConfig: (state) => themes[state.currentTheme],
    isDark: (state) => state.currentMode === 'dark'
  },

  actions: {
    async setTheme(themeName) {
      if (!themes[themeName]) return false
      
      this.currentTheme = themeName
      return this.applyTheme()
    },

    setMode(mode) {
      if (mode !== 'light' && mode !== 'dark') return false
      
      this.currentMode = mode
      localStorage.setItem('theme-mode', mode)
      document.documentElement.setAttribute('data-theme', mode)
      return this.applyTheme()
    },

    toggleMode() {
      const newMode = this.currentMode === 'light' ? 'dark' : 'light'
      return this.setMode(newMode)
    },

    async applyTheme() {
      try {
        const theme = themes[this.currentTheme]
        if (!theme) return false

        // CSS dosyasını yükle
        const linkId = 'theme-stylesheet'
        let link = document.getElementById(linkId)
        
        if (!link) {
          link = document.createElement('link')
          link.id = linkId
          link.rel = 'stylesheet'
          document.head.appendChild(link)
        }

        link.href = theme.path

        // Mode'u uygula
        document.documentElement.setAttribute('data-theme', this.currentMode)
        
        // Meta renkleri güncelle
        this.updateMetaColors()

        // LocalStorage'a kaydet
        localStorage.setItem('selected-theme', this.currentTheme)
        localStorage.setItem('theme-mode', this.currentMode)

        return true
      } catch (error) {
        console.error('Tema uygulama hatası:', error)
        return false
      }
    },

    updateMetaColors() {
      // Biraz gecikme ekleyelim ki CSS yüklensin
      setTimeout(() => {
        const primaryColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--primary').trim()
        
        const metaTags = [
          document.querySelector('meta[name="theme-color"]'),
          document.querySelector('meta[name="theme_color"]'),
          document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]'),
          document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]')
        ]

        metaTags.forEach(meta => {
          if (meta) meta.setAttribute('content', primaryColor)
        })

        if (!metaTags.some(tag => tag)) {
          const newMeta = document.createElement('meta')
          newMeta.name = 'theme-color'
          newMeta.content = primaryColor
          document.head.appendChild(newMeta)
        }
      }, 100)
    }
  },

  // Persist özelliği ekleyelim
  persist: true
})
