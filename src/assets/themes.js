// src/assets/themes.js
export const DEFAULT_THEME = 'default'
export const DEFAULT_MODE = 'light'

export const themes = {
    default: {
        name: 'Nur',
        path: './themes/default.css',
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
    ziya: {
        name: 'Ziya',
        path: './themes/ziya.css',
        color: 'hwb(33 41% 0%)',
        modes: {
            light: { name: 'Aydınlık' },
            dark: { name: 'Karanlık' }
        }
    }
}
