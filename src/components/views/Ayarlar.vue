<!-- src/components/views/Ayarlar.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useThemeStore } from '../../assets/themeStore'
import { fontConfigs } from '../../assets/font-loader'
import { themes } from '../../assets/themes'

const themeStore = useThemeStore()

// Font boyutları için ref'ler
const latinSize = ref(parseInt(localStorage.getItem('latin-size')) || 16)
const arabicSize = ref(parseFloat(localStorage.getItem('arabic-size')) || 1.4)

// Font seçenekleri
const latinFonts = [
  { value: 'inter', label: 'Inter', family: '"Inter", system-ui, sans-serif' },
  { value: 'roboto', label: 'Roboto', family: 'Roboto, system-ui, sans-serif' },
  { value: 'roboto-condensed', label: 'Roboto Condensed', family: '"Roboto Condensed", system-ui, sans-serif' },
  { value: 'fira', label: 'Fira Sans', family: '"Fira Sans", system-ui, sans-serif' },
  { value: 'fira-condensed', label: 'Fira Sans Condensed', family: '"Fira Sans Condensed", system-ui, sans-serif' },
  { value: 'barlow', label: 'Barlow', family: '"Barlow", system-ui, sans-serif' },
  { value: 'barlow-condensed', label: 'Barlow Condensed', family: '"Barlow Condensed", system-ui, sans-serif' },
]

const arabicFonts = [
  { value: 'scheherazade', label: 'Scheherazade New', family: '"Scheherazade New", system-ui, serif' },
  { value: 'emine', label: 'Emine', family: 'Emine, system-ui, serif' },
  { value: 'amiri', label: 'Amiri', family: 'Amiri, system-ui, serif' },
]

// Font seçimleri için ref'ler
const selectedLatinFont = ref(localStorage.getItem('latin-font') || 'barlow-condensed')
const selectedArabicFont = ref(localStorage.getItem('arabic-font') || 'emine')

// Font güncelleme fonksiyonları
const updateLatinFont = async (value) => {
  selectedLatinFont.value = value
  const font = latinFonts.find(f => f.value === value)
  document.documentElement.style.setProperty('--font-family', font.family)
  
  if (fontConfigs[value]) {
    await fontConfigs[value]()
  }
  
  localStorage.setItem('latin-font', value)
}

const updateArabicFont = async (value) => {
  selectedArabicFont.value = value
  const font = arabicFonts.find(f => f.value === value)
  document.documentElement.style.setProperty('--arabic-font-family', font.family)
  
  if (fontConfigs[value]) {
    await fontConfigs[value]()
  }
  
  localStorage.setItem('arabic-font', value)
}

const updateLatinSize = (value) => {
  latinSize.value = value
  document.documentElement.style.fontSize = `${value}px`
  localStorage.setItem('latin-size', value)
}

const updateArabicSize = (value) => {
  arabicSize.value = value
  document.documentElement.style.setProperty('--arabic-size', `${value}rem`)
  document.documentElement.style.setProperty('--arabic-height', `${value * 1.6}rem`)
  localStorage.setItem('arabic-size', value)
}

// Sıfırlama fonksiyonları
const resetFonts = async () => {
  await updateLatinFont('barlow-condensed')
  await updateArabicFont('scheherazade')
  updateLatinSize(16)
  updateArabicSize(1.4)
}

const resetTheme = () => {
  themeStore.setTheme('default')
  themeStore.setMode('light')
}

// Sayfa yüklendiğinde ayarları yükle
onMounted(async () => {
  await updateLatinFont(selectedLatinFont.value)
  await updateArabicFont(selectedArabicFont.value)
  updateLatinSize(latinSize.value)
  updateArabicSize(arabicSize.value)
})
</script>



<template>
  <div class="settings-container">
    <!-- Tema Ayarları -->
    <div class="settings-section">
      <div class="setting-header">
        <h3>Görünüm</h3>
        <button class="buton reset-button" @click="resetTheme">
          <i class="material-symbols">restart_alt</i>
          <small>Varsayılan</small>
        </button>
      </div>

      <!-- Tema Seçenekleri -->
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

    <!-- Font Ayarları -->
    <div class="settings-section">
      <div class="setting-header">
        <h3>Yazı tipi</h3>
        <button class="buton reset-button" @click="resetFonts">
          <i class="material-symbols">restart_alt</i>
          <small>Sıfırla</small>
        </button>
      </div>

      <!-- Önizleme -->
      <div class="preview-card">
        <div class="preview arabic">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّح۪يمِ</div>
        <div class="preview latin">Bismillahirrahmanirrahim</div>
      </div>

      <!-- Font Ayarları -->
      <div class="font-settings">
        <!-- Latin Font Seçimi -->
        <div class="setting-group">
          <label>Latin Font</label>
          <select 
            :value="selectedLatinFont"
            @change="e => updateLatinFont(e.target.value)"
          >
            <option v-for="font in latinFonts" :key="font.value" :value="font.value">
              {{ font.label }}
            </option>
          </select>
        </div>

        <!-- Arapça Font Seçimi -->
        <div class="setting-group">
          <label>Arapça Font</label>
          <select 
            :value="selectedArabicFont"
            @change="e => updateArabicFont(e.target.value)"
          >
            <option v-for="font in arabicFonts" :key="font.value" :value="font.value">
              {{ font.label }}
            </option>
          </select>
        </div>

        <!-- Latin Boyut Ayarı -->
        <div class="setting-group">
          <div class="setting-header">
            <label>Latin Boyut</label>
            <span>{{ latinSize }}px</span>
          </div>
          <input 
            type="range" 
            :value="latinSize"
            @input="e => updateLatinSize(parseInt(e.target.value))"
            min="12" max="20" step="1"
          >
        </div>

        <!-- Arapça Boyut Ayarı -->
        <div class="setting-group">
          <div class="setting-header">
            <label>Arapça Oran</label>
            <span>{{ arabicSize }}rem</span>
          </div>
          <input 
            type="range" 
            :value="arabicSize"
            @input="e => updateArabicSize(parseFloat(e.target.value))"
            min="1.0" max="2.0" step="0.1"
          >
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.settings-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
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

/* Tema Grid */
.theme-grid {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
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
}

.theme-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-card:hover {
  background: var(--surface);
}

.theme-card.active {
  background: var(--surface);
  border: 1px solid var(--primary);
}

.color-preview {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  border: 2px solid var(--surface-variant);
}

.theme-name {
  font-size: 0.9rem;
  color: var(--text-primary);
}

/* Preview Card */
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

/* Font Settings */
.font-settings {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.setting-group label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.setting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.setting-header h3 {
  font-size: 1.1rem;
  color: var(--primary);
  margin: 0;
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



/* Form Elements */
select, input[type="range"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--divider);
  border-radius: 8px;
  background: var(--surface);
  color: var(--text-primary);
  font-size: 1rem;
}

select:focus {
  outline: none;
  border-color: var(--primary);
}

input[type="range"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 6px;
  background: var(--primary-light);
  border-radius: 3px;
  padding: 0;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: var(--primary);
  border-radius: 50%;
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
    margin-bottom: 1rem;
}

.mode-button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--divider);
    border-radius: 6px;
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

</style>
