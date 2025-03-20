
// src/assets/wakeLock.js
export const useWakeLock = () => {
  let wakeLock = null;
  let isLoggedOnce = false;

  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const requestWakeLock = async () => {
    // Masaüstünde ve daha önce log yapıldıysa, tekrar log yapma
    if (!isMobileDevice() && isLoggedOnce) return;

    try {
      if ('wakeLock' in navigator && 'request' in navigator.wakeLock) {
        if (isMobileDevice()) {
          wakeLock = await navigator.wakeLock.request('screen');
          console.log('Ekran kilidi aktif');
        } else {
          if (!isLoggedOnce) {
            console.log('Masaüstü cihazda ekran kilidi atlandı');
            isLoggedOnce = true;
          }
        }
      }
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        console.log('Wake Lock izni reddedildi');
      } else {
        console.error('Ekran kilidi hatası:', err);
      }
    }
  };

  const releaseWakeLock = async () => {
    try {
      if (wakeLock) {
        await wakeLock.release();
        wakeLock = null;
        console.log('Ekran kilidi devre dışı');
      }
    } catch (err) {
      console.error('Ekran kilidi kaldırma hatası:', err);
    }
  };

  // Sayfa visibility değiştiğinde wake lock'u yeniden talep et
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      requestWakeLock();
    }
  };

  // Event listener'ı ekle
  document.addEventListener('visibilitychange', handleVisibilityChange);

  return {
    requestWakeLock,
    releaseWakeLock
  };
};
