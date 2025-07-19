// src/assets/themeStore.js
import { defineStore } from 'pinia';
import { themes, DEFAULT_THEME, DEFAULT_MODE } from './themes';
import { loadStylesheet } from './composables/useStylesheetLoader';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    currentTheme: localStorage.getItem('selected-theme') || DEFAULT_THEME,
    currentMode: localStorage.getItem('theme-mode') || DEFAULT_MODE,
  }),

  getters: {
    themeConfig: (state) => themes[state.currentTheme],
    isDark: (state) => state.currentMode === 'dark',
  },

  actions: {
    async setTheme(themeName) {
      if (!themes[themeName]) return;
      this.currentTheme = themeName;
      await this.applyTheme();
    },

    async setMode(mode) {
      if (mode !== 'light' && mode !== 'dark') return;
      this.currentMode = mode;
      document.documentElement.setAttribute('data-theme', mode);
      localStorage.setItem('theme-mode', mode);
      await this.applyTheme();
    },

    toggleMode() {
      const newMode = this.isDark ? 'light' : 'dark';
      return this.setMode(newMode);
    },

    async applyTheme() {
      const theme = this.themeConfig;
      if (!theme) return;

      try {
        await loadStylesheet(theme.path, 'theme-stylesheet');
        this.updateMetaColors();
        localStorage.setItem('selected-theme', this.currentTheme);
      } catch (error) {
        console.error('Tema uygulama hatası:', error);
      }
    },

    updateMetaColors() {
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      const metaThemeColor = document.querySelector("meta[name=theme-color]");
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", primaryColor);
      }
    },

    resetToDefaults() {
      this.setTheme(DEFAULT_THEME);
      this.setMode(DEFAULT_MODE);
    },
  },

  persist: true,
});
