// src/assets/font-loader.js
const loadFont = async (fontFamily, url) => {
    try {
      const font = new FontFace(fontFamily, `url(${url})`)
      const loadedFont = await font.load()
      document.fonts.add(loadedFont)
      return true
    } catch (error) {
      console.error(`Font yüklenemedi: ${fontFamily}`, error)
      return false
    }
  }
  
  // Font yükleme fonksiyonları
  export const loadGoogleFont = async (fontFamily) => {
    const link = document.createElement('link')
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@400;500;600&display=swap`
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  
  // Font konfigürasyonları
  export const fontConfigs = {
    'roboto': () => loadGoogleFont('Roboto'),
    'roboto-condensed': () => loadGoogleFont('Roboto+Condensed'),
    'fira': () => loadGoogleFont('Fira+Sans'),
    'fira-condensed': () => loadGoogleFont('Fira+Sans+Condensed'),
    'barlow': () => loadGoogleFont('Barlow'),
    'barlow-condensed': () => loadGoogleFont('Barlow+Condensed'),
    'scheherazade': () => loadGoogleFont('Scheherazade+New'),
    'amiri': () => loadGoogleFont('Amiri'),
  }
  