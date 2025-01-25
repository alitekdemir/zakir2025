// src/assets/theme-manager.js
import { themes, DEFAULT_THEME, DEFAULT_MODE } from './themes'

export const ThemeManager = {
    loadTheme(themeKey, mode = null) {
        try {
            const theme = themes[themeKey]
            if (!theme) {
                console.warn(`Tema bulunamadı: ${themeKey}`)
                return false
            }

            const linkId = 'theme-stylesheet'
            let link = document.getElementById(linkId)
            
            if (!link) {
                link = document.createElement('link')
                link.id = linkId
                link.rel = 'stylesheet'
                document.head.appendChild(link)
            }
            
            // CSS yüklendiğinde
            link.onload = () => {
                // İlk deneme
                this.updateThemeColor()
                
                // Biraz bekleyip tekrar dene
                setTimeout(() => {
                    this.updateThemeColor()
                }, 300)
            }

            link.href = theme.path

            const currentMode = mode || localStorage.getItem('theme-mode') || DEFAULT_MODE
            document.documentElement.setAttribute('data-theme', currentMode)

            localStorage.setItem('selected-theme', themeKey)
            localStorage.setItem('theme-mode', currentMode)

            // Hemen bir deneme yap
            this.updateThemeColor()

            return true
        } catch (error) {
            console.error('Tema yükleme hatası:', error)
            return false
        }
    },

    updateThemeColor() {
        const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary').trim()
        
        const metaTags = [
            document.querySelector('meta[name="theme-color"]'),
            document.querySelector('meta[name="theme_color"]'),
            document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]'),
            document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]')
        ]

        metaTags.forEach(meta => {
            if (meta) {
                meta.setAttribute('content', primaryColor)
            }
        })

        // Meta tag yoksa ekle
        if (!metaTags.some(tag => tag)) {
            const newMeta = document.createElement('meta')
            newMeta.name = 'theme-color'
            newMeta.content = primaryColor
            document.head.appendChild(newMeta)
        }
    },

    getCurrentTheme() {
        return localStorage.getItem('selected-theme') || DEFAULT_THEME
    },

    getCurrentMode() {
        return localStorage.getItem('theme-mode') || DEFAULT_MODE
    }
}
