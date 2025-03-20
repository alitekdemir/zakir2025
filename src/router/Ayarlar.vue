<!-- src/router/Ayarlar.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useThemeStore } from '../assets/themeStore'
import { themes, resetThemeToDefault } from '../assets/themes'
import { useFontSettings } from '../assets/composables/useFontSettings'
import { useAppSettings } from '../assets/composables/useAppSettings'

// Tema
const themeStore = useThemeStore()

// Font ayarları
const { 
  latinSize, 
  arabicSize,
  selectedLatinFont,
  selectedArabicFont,
  latinFonts,
  arabicFonts,
  updateLatinFont,
  updateArabicFont,
  updateLatinSize,
  updateArabicSize,
  resetFonts,
  initializeFontSettings,
  APP_VERSION,
  ASSETS_VERSION
} = useFontSettings()

// Uygulama ayarları
const {
  showSplashScreen,
  showNavigator,
  loadAppSettings,
  updateSplashScreen,
  updateNavigator,
  resetAppSettings
} = useAppSettings()

// Tema sıfırlama
const resetTheme = () => {
  resetThemeToDefault(themeStore)
}

// Tüm ayarları sıfırlama
const resetAllSettings = async () => {
  if (confirm('Tüm ayarları sıfırlamak istediğinizden emin misiniz?')) {
    await resetFonts()
    resetAppSettings()
    resetThemeToDefault(themeStore)
  }
}

// Aktif tap seçimi için
const activeTab = ref('system-font') // Varsayılan olarak sistem fontu sekmesi aktif


// Sayfa yüklendiğinde ayarları yükle
onMounted(async () => {
  loadAppSettings()
  await initializeFontSettings()
})
</script>



<template>
  <div class="settings-container">
    <!-- Versiyon Bilgisi -->
    <div class="version-info">
      <span>Uygulama Versiyonu: {{ APP_VERSION }}</span>
      <span>İçerik Versiyonu: {{ ASSETS_VERSION }}</span>
    </div>


    <!-- SplashScreen ve Navigator Ayarları -->
    <div class="settings-section">
      <div class="setting-header">
        <h3>Uygulama Ayarları</h3>
      </div>
      <div class="setting-group">
        <label class="checkbox-container">
          <span>Açılış Ekranını Göster</span>
          <div class="toggle-switch">
            <input 
              type="checkbox" 
              :checked="showSplashScreen" 
              @change="e => updateSplashScreen(e.target.checked)"
            >
            <span class="slider"></span>
          </div>
        </label>
      </div>
      <div class="setting-group">
        <label class="checkbox-container">
          <span>Dua Navigasyon Barını Göster</span>
          <div class="toggle-switch">
            <input 
              type="checkbox" 
              :checked="showNavigator" 
              @change="e => updateNavigator(e.target.checked)"
            >
            <span class="slider"></span>
          </div>
        </label>
      </div>
    </div>
    <span class="divider-line"></span>
  
    <!-- Tema Ayarları -->
    <div class="settings-section">
      <div class="setting-header">
        <h3>Görünüm</h3>
        <button class="reset-all-button" @click="resetTheme">
          <i class="material-symbols">restart_alt</i>
          Görünümü Sıfırla
        </button>
      </div>

      <!-- Tema Seçenekleri -->
      <div class="theme-container">
        <div class="theme-grid">
          <div 
            v-for="(theme, key) in themes" 
            :key="key"
            class="theme-option"
            :class="{ active: themeStore.currentTheme === key }"
            @click="themeStore.setTheme(key)"
          >
            <div class="theme-color" :style="{ backgroundColor: theme.color }"></div>
            <span>{{ theme.name }}</span>
          </div>
        </div>

        <!-- Mode Seçici -->
        <div class="mode-selector">
          <button 
            class="mode-button"
            :class="{ active: !themeStore.isDark }"
            @click="themeStore.setMode('light')"
          >
            Aydınlık
          </button>
          <button 
            class="mode-button"
            :class="{ active: themeStore.isDark }"
            @click="themeStore.setMode('dark')"
          >
            Karanlık
          </button>
        </div>
      </div>
    </div>

    <span class="divider-line"></span>

    <!-- Font Ayarları -->
    <div class="settings-section">
      <div class="setting-header">
        <h3>Yazı tipi</h3>
        <button class="reset-all-button" @click="resetFonts">
          <i class="material-symbols">restart_alt</i>
          Sıfırla
        </button>
      </div>

      <!-- Geliştirilmiş Önizleme -->
      <div class="preview-section">
        <div class="preview-card">
          <div class="preview arabic">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّح۪يمِ</div>
          <div class="preview latin">Bismillahirrahmanirrahim</div>
        </div>
      </div>

      <!-- Font Ayarları - Modern Tab Tasarımı -->
      <div class="font-settings-tabs">
        <div class="tab-header">
          <button 
            :class="{ active: activeTab === 'system-font' }" 
            @click="activeTab = 'system-font'"
          >
            Sistem Fontu
          </button>
          <button 
            :class="{ active: activeTab === 'arabic-font' }" 
            @click="activeTab = 'arabic-font'"
          >
            Arapça Fontu
          </button>
        </div>

        <!-- Sistem Font Ayarları -->
        <div class="tab-content" v-if="activeTab === 'system-font'">
          <!-- Sistem Font Seçimi -->
          <div class="setting-row">
            <label>Sistem Font</label>
            <div class="select-wrapper">
              <select 
                :value="selectedLatinFont"
                @change="e => updateLatinFont(e.target.value)"
              >
                <option v-for="font in latinFonts" :key="font.value" :value="font.value">
                  {{ font.label }}
                </option>
              </select>
              <i class="material-symbols select-icon">arrow_drop_down</i>
            </div>
          </div>
          
          <!-- Sistem Font Boyut Ayarı -->
          <div class="setting-row">
            <div class="setting-header">
              <label>Boyut</label>
              <span class="size-value">{{ latinSize }}px</span>
            </div>
            <div class="size-selector">
              <button class="size-button" @click="updateLatinSize(Math.max(12, latinSize - 1))">
                <i class="material-symbols">remove</i>
              </button>
              <input 
                type="range" 
                :value="latinSize"
                @input="e => updateLatinSize(parseInt(e.target.value))"
                min="12" max="24" step="1"
              >
              <button class="size-button" @click="updateLatinSize(Math.min(24, latinSize + 1))">
                <i class="material-symbols">add</i>
              </button>
            </div>
          </div>
        </div>

        <!-- Arapça Font Ayarları -->
        <div class="tab-content" v-if="activeTab === 'arabic-font'">
          <!-- Arapça Font Seçimi -->
          <div class="setting-row">
            <label>Arapça Font</label>
            <div class="select-wrapper">
              <select 
                :value="selectedArabicFont"
                @change="e => updateArabicFont(e.target.value)"
              >
                <option v-for="font in arabicFonts" :key="font.value" :value="font.value">
                  {{ font.label }}
                </option>
              </select>
              <i class="material-symbols select-icon">arrow_drop_down</i>
            </div>
          </div>
          
          <!-- Arapça Font Oran Ayarı -->
          <div class="setting-row">
            <div class="setting-header">
              <label>Oran</label>
              <span class="size-value">{{ arabicSize }}rem</span>
            </div>
            <div class="size-selector">
              <button class="size-button" @click="updateArabicSize(Math.max(1.0, parseFloat((arabicSize - 0.1).toFixed(1))))">
                <i class="material-symbols">remove</i>
              </button>
              <input 
                type="range" 
                :value="arabicSize"
                @input="e => updateArabicSize(parseFloat(e.target.value))"
                min="1.0" max="2.0" step="0.1"
              >
              <button class="size-button" @click="updateArabicSize(Math.min(2.0, parseFloat((arabicSize + 0.1).toFixed(1))))">
                <i class="material-symbols">add</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

        <!-- Tüm Ayarları Sıfırla -->
        <button class="reset-all-button" @click="resetAllSettings">
      <i class="material-symbols">restart_alt</i>
      Tüm Ayarları Sıfırla
    </button>

  </div>
</template>


<style scoped>
.settings-container {
  max-width: var(--content-width);
  width: min(30rem, 90%);
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 5rem;
}

.version-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
  padding: 0.5rem;
  background: var(--surface);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.reset-button {
  color: var(--text-secondary);
  padding: 4px;
  border-radius: 4px;
}

.reset-button:hover {
  color: var(--primary);
  background: var(--primary-lighter);
}


.reset-all-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: var(--surface-variant);
  color: var(--on-surface-variant);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
}

.reset-all-button:hover {
  background-color: var(--primary);
  color: var(--background);
}

.reset-all-button .material-symbols {
  font-size: 1.25rem;
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.settings-section h3 {
  font-size: 1.25rem;
  color: var(--primary);
  margin: 0;
}

/* Toggle Switch için stil */
.checkbox-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-primary);
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--divider);
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--primary);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--primary);
}

input:checked + .slider:before {
  transform: translateX(24px);
}

/* Tema Container ve Grid */
.theme-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  gap: 1rem;
  justify-content: center;
  width: 100%;
  max-width: 400px;
}

.theme-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  border: 1px solid var(--divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-option:hover {
  border-color: var(--primary);
}

.theme-option.active {
  background: var(--primary-lighter);
  border-color: var(--primary);
}
.theme-color {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 0.25rem;
  border: 1px solid var(--divider);
}

.theme-option span {
  font-size: 0.9rem;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

/* Preview Section */
.preview-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preview-card {
  background: var(--surface);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  border: 1px solid var(--divider);
}

/* Modern Font Settings Tabs */
.font-settings-tabs {
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
  background: var(--surface);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--divider);
}

.tab-header {
  display: flex;
  width: 100%;
  border-bottom: 1px solid var(--divider);
}

.tab-header button {
  flex: 1;
  padding: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease;
}

.tab-header button.active {
  color: var(--primary);
}

.tab-header button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary);
}

.tab-content {
  background: var(--background);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Setting Row */
.setting-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.setting-row label {
  color: var(--text-primary);
  font-size: 0.9rem;
}

/* Select Wrapper */
.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.select-wrapper select {
  appearance: none;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--divider);
  border-radius: 0.5rem;
  background: var(--surface);
  color: var(--text-primary);
  font-size: 1rem;
  padding-right: 2.5rem;
}

.select-icon {
  position: absolute;
  right: 0.75rem;
  pointer-events: none;
  color: var(--text-secondary);
}

/* Size Selector */
.size-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.size-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: var(--surface-variant);
  color: var(--on-surface-variant);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.size-button:hover {
  background-color: var(--primary-light);
  color: var(--primary);
}

.size-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary);
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  flex: 1;
  background: var(--primary-light);
  border-radius: 3px;
  padding: 0;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: var(--primary);
  cursor: pointer;
}

/* Preview Text */
.preview.arabic {
  font-family: var(--arabic-font-family);
  font-size: var(--arabic-size);
  line-height: var(--arabic-height);
  text-align: center;
}

.preview.latin {
  font-size: 1rem;
  text-align: center;
  color: var(--text-secondary);
}

.mode-selector {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 0.5rem;
}

.mode-button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--divider);
  border-radius: 0.5rem;
  background: var(--surface);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-button:hover {
  border-color: var(--primary);
}

.mode-button.active {
  background: var(--primary-lighter);
  border-color: var(--primary);
  color: var(--primary);
}


/* Responsive Düzenlemeler */
@media (max-width: 480px) {
  .settings-container {
    padding: 0.5rem;
  }
  
  .theme-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .preview-card {
    padding: 1rem;
  }
  
  .mode-selector {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .mode-button {
    flex: 1;
    min-width: 80px;
    text-align: center;
  }
  
  .tab-header button {
    padding: 0.75rem 0.5rem;
    font-size: 0.9rem;
  }
  
  .size-button {
    width: 1.75rem;
    height: 1.75rem;
  }
}
</style>
