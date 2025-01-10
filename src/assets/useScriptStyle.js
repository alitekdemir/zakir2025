// src/assets/useScriptStyle.js
import { ref } from 'vue'

const scriptStyle = ref(localStorage.getItem('scriptStyle') || 'latin')
const notification = ref('')
let notificationTimer = null

export function useScriptStyle() {
    // Dil tercihini değiştir ve bildirim göster
    const toggleScript = () => {
        scriptStyle.value = scriptStyle.value === 'latin' ? 'arabic' : 'latin'
        localStorage.setItem('scriptStyle', scriptStyle.value)
        
        // Bildirim metnini ayarla
        notification.value = scriptStyle.value === 'arabic' 
            ? 'Kuran harfleri aktif' 
            : 'Latin harflerine geçildi'
        
        // Önceki zamanlayıcıyı temizle
        if (notificationTimer) clearTimeout(notificationTimer)
        
        // 3 saniye sonra bildirimi temizle
        notificationTimer = setTimeout(() => {
            notification.value = ''
        }, 3000)
    }

    return {
        scriptStyle,
        notification,
        toggleScript
    }
}