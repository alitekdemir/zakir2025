// src/assets/themes.js
export const DEFAULT_THEME = 'nur'
export const DEFAULT_MODE = 'light'

export const resetThemeToDefault = (themeStore) => {
    themeStore.setTheme(DEFAULT_THEME)
    themeStore.setMode(DEFAULT_MODE)
}

export const themes = {
    ziya: {
        name: 'Ziya',
        path: './themes/ziya.css',
        color: 'hwb(33 41% 0%)',
        modes: {
            light: { name: 'Aydınlık' },
            dark: { name: 'Karanlık' }
        }
    },
    nur: {
        name: 'Nur',
        path: './themes/nur.css',
        color: '#FF6666',
        modes: {
            light: { name: 'Aydınlık' },
            dark: { name: 'Karanlık' }
        }
    },
    forest: {
        name: 'Orman',
        path: './themes/forest.css',
        color: 'hwb(175 0% 53%)',
        modes: {
            light: { name: 'Aydınlık' },
            dark: { name: 'Karanlık' }
        }
    },
    
}

