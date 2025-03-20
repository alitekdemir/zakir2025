// src/composables/useFontSettings.js
import { ref, watch, onMounted } from 'vue'
import { APP_VERSION, ASSETS_VERSION } from '../../../public/version'

export function useFontSettings() {
  // Font boyutları için ref'ler
  const latinSize = ref(16)
  const arabicSize = ref(1.4)

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

  // Yüklenen fontları takip etmek için
  const loadedFonts = ref(new Set())

  // Font seçimleri için ref'ler
  const selectedLatinFont = ref('barlow-condensed')
  const selectedArabicFont = ref('emine')

  // LocalStorage'dan güvenli bir şekilde okuma
  const safeGetItem = (key, defaultValue) => {
    try {
      const value = localStorage.getItem(key)
      return value !== null ? value : defaultValue
    } catch (error) {
      console.error(`LocalStorage read error for ${key}:`, error)
      return defaultValue
    }
  }

  // LocalStorage'a güvenli bir şekilde yazma
  const safeSetItem = (key, value) => {
    try {
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.error(`LocalStorage write error for ${key}:`, error)
      return false
    }
  }

  // Font değerlerini LocalStorage'dan yükleme
  const loadSettingsFromStorage = () => {
    latinSize.value = parseInt(safeGetItem('latin-size', '16'))
    arabicSize.value = parseFloat(safeGetItem('arabic-size', '1.4'))
    selectedLatinFont.value = safeGetItem('latin-font', 'barlow-condensed')
    selectedArabicFont.value = safeGetItem('arabic-font', 'emine')
  }

  // Google Font yükleme
  const loadGoogleFont = async (fontFamily) => {
    // Eğer font zaten yüklendiyse, tekrar yükleme
    if (loadedFonts.value.has(fontFamily)) return true

    try {
      // Google Fonts bağlantısını oluştur
      const link = document.createElement('link')
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@400;500;600&display=swap`
      link.rel = 'stylesheet'
      
      // Font yüklenene kadar bekle
      return new Promise((resolve) => {
        link.onload = () => {
          loadedFonts.value.add(fontFamily)
          resolve(true)
        }
        link.onerror = () => resolve(false)
        document.head.appendChild(link)
      })
    } catch (error) {
      console.error(`Error loading font ${fontFamily}:`, error)
      return false
    }
  }

  // Font konfigürasyonları
  const fontConfigs = {
    'roboto': () => loadGoogleFont('Roboto'),
    'roboto-condensed': () => loadGoogleFont('Roboto+Condensed'),
    'fira': () => loadGoogleFont('Fira+Sans'),
    'fira-condensed': () => loadGoogleFont('Fira+Sans+Condensed'),
    'barlow': () => loadGoogleFont('Barlow'),
    'barlow-condensed': () => loadGoogleFont('Barlow+Condensed'),
    'scheherazade': () => loadGoogleFont('Scheherazade+New'),
    'amiri': () => loadGoogleFont('Amiri'),
  }

  // Latin font güncelleme
  const updateLatinFont = async (value) => {
    selectedLatinFont.value = value
    const font = latinFonts.find(f => f.value === value)
    
    if (!font) return false
    
    document.documentElement.style.setProperty('--font-family', font.family)
    
    if (fontConfigs[value]) {
      await fontConfigs[value]()
    }
    
    safeSetItem('latin-font', value)
    return true
  }

  // Arapça font güncelleme
  const updateArabicFont = async (value) => {
    selectedArabicFont.value = value
    const font = arabicFonts.find(f => f.value === value)
    
    if (!font) return false
    
    document.documentElement.style.setProperty('--arabic-font-family', font.family)
    
    if (fontConfigs[value]) {
      await fontConfigs[value]()
    }
    
    safeSetItem('arabic-font', value)
    return true
  }

  // Latin boyutu güncelleme
  const updateLatinSize = (value) => {
    latinSize.value = value
    document.documentElement.style.fontSize = `${value}px`
    safeSetItem('latin-size', value.toString())
    return true
  }

  // Arapça boyutu güncelleme
  const updateArabicSize = (value) => {
    arabicSize.value = value
    document.documentElement.style.setProperty('--arabic-size', `${value}rem`)
    document.documentElement.style.setProperty('--arabic-height', `${value * 1.6}rem`)
    safeSetItem('arabic-size', value.toString())
    return true
  }

  // Tüm fontları sıfırlama
  const resetFonts = async () => {
    await updateLatinFont('barlow-condensed')
    await updateArabicFont('emine')
    updateLatinSize(16)
    updateArabicSize(1.4)
    return true
  }

  // Font ayarlarını başlatma
  const initializeFontSettings = async () => {
    loadSettingsFromStorage()
    await updateLatinFont(selectedLatinFont.value)
    await updateArabicFont(selectedArabicFont.value)
    updateLatinSize(latinSize.value)
    updateArabicSize(arabicSize.value)
  }

  // Bu fonksiyon, uygulamanın herhangi bir yerinde font yükleme durumunu kontrol etmek için kullanılabilir
  const checkFontsLoaded = async () => {
    const storedAssetsVersion = safeGetItem('assets-version', '')
    
    if (storedAssetsVersion !== ASSETS_VERSION) {
      try {
        await initializeFontSettings()
        safeSetItem('assets-version', ASSETS_VERSION)
        return true
      } catch (error) {
        console.error('Font initialization error:', error)
        return false
      }
    }
    return true
  }

  return {
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
    checkFontsLoaded,
    APP_VERSION,
    ASSETS_VERSION
  }
}
