// src/assets/wakeLock.js
export const useWakeLock = () => {
  let wakeLock = null;

  const requestWakeLock = async () => {
    try {
      // Önce API'nin varlığını ve erişilebilirliğini kontrol et
      if ('wakeLock' in navigator && 'request' in navigator.wakeLock) {
        // Mobil cihaz kontrolü
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
          wakeLock = await navigator.wakeLock.request('screen');
          // Test için alert
          // alert('Ekran kilidi aktif edildi. Ekranınız kapanmayacak.');
          console.log('Ekran kilidi aktif');
        } else {
          console.log('Masaüstü cihazda ekran kilidi atlandı');
        }
      } else {
        // alert('Wake Lock API desteklenmiyor');
        console.log('Wake Lock API desteklenmiyor');
      }
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        console.log('Wake Lock izni reddedildi');
      } else {
        // alert('Ekran kilidi hatası: ' + err.message);
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
  const handleVisibilityChange = async () => {
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
