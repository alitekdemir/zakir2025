// useCloseHandlers.js (composables klasöründe oluşturabilirsiniz)
import { onMounted, onUnmounted } from 'vue';
import { useKeyboard } from '../assets/keyboard';

export function useCloseHandlers(closeCallback) {
  const keyboard = useKeyboard();
  
  // Tarayıcı geri buton kontrolü
  const handlePopState = () => {
    closeCallback();
  };

  onMounted(() => {
    // ESC tuşu için listener
    keyboard.register('Escape', () => {
      closeCallback();
    }, { preventDefault: true });

    // Mobil geri butonu için history listener
    window.addEventListener('popstate', handlePopState);
    // Geçmiş durumunu kaydet
    history.pushState(null, '', window.location.pathname);
  });

  onUnmounted(() => {
    keyboard.unregister('Escape');
    window.removeEventListener('popstate', handlePopState);
  });
}
