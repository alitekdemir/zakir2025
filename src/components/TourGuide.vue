<!-- src/components/TourGuide.vue -->
<script setup>
import { onMounted, ref } from 'vue';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = ref(null);
const isFirstVisit = ref(localStorage.getItem('hasSeenTour') !== 'true');


const steps = [
  {
    element: '.app',
    popover: {
      title: 'Temel Kullanım Kılavuzu!',
      description: 'Size uygulamanın temel özelliklerini tanıtalım.',
      position: 'top'
    }
  },
  {
    element: '.navbar-right button:first-child',
    popover: {
      title: 'Tema Değiştirme',
      description: 'Açık/Koyu tema arasında geçiş yapabilirsiniz. Renk değiştirmek için Ayarlar sayfasına göz atmanızı tavsiye ederiz.',
      position: 'bottom'
    }
  },
  {
    element: '.navbar-right button:last-child',
    popover: {
      title: 'Yazı Tipi',
      description: 'Latin/Arapça yazı tipi arasında geçiş yapabilirsiniz. Ayarlar sayfasında Font boyutlarını değiştirebileceğiniz seçenekler mevcut.',
      position: 'bottom'
    }
  },
  {
    element: '.hamburger-btn',
    popover: {
      title: 'Ana Menü',
      description: 'Güncelleme, Ayarlar ve diğer sayfalara erişmek için buraya tıklayın.',
      position: 'right'
    }
  },
  {
    element: '.dua-widget:first-child .widget-header',
    popover: {
      title: 'Dua Kartı Başlığı',
      description: 'Bu alanda (Sıra No, Hatırlatıcı Başlık ve Alt Menü) içerikleri yer alıyor. Kartın başlığına tıklayarak içeriği açıp kapatabilirsiniz.',
      position: 'bottom'
    }
  },
  {
    element: '.more-btn',
    popover: {
      title: 'Alt Menü',
      description: 'Bir dua parçasını Ezberledim olarak işaretlemek için veya Dua hakkında çeşitli bilgileri görmek için buraya tıklayın.',
      position: 'left'
    }
  },
  {
    element: '.flex-container.wrap button.buton',
    popover: {
      title: 'Vakitlere Özel Dualar',
      description: '"Sabah" ve "Akşam" gibi butonlarla vakitlere özel duaları görüntüleyebilirsiniz.',
      position: 'bottom'
    }
  },
  {
    element: '.complete-button',
    popover: {
      title: 'Tesbihatı Tamamla',
      description: 'Tesbihatınızı bitirdiğinizde bu butona tıklayarak ilerlemenizi kaydedin. İstatistikler sayfasında ne kadar zaman harcadığınızı ve kazandığınız rozetleri görebilirsiniz. Allah muvaffak etsin inşallah.\nCenab-ı Hak fazl u keremiyle, şu hizmette hâlisane, muhlisane bizi ve umum Risale-i Nur talebelerini daim ve muvaffak eylesin, âmin',
      position: 'bottom'
    }
  }
];

const createDriverConfig = () => ({
  showProgress: true,
  steps: steps,
  nextBtnText: 'Sonraki',
  prevBtnText: 'Önceki',
  doneBtnText: 'Tamam',
  overlayOpacity: 0.5,
  smoothScroll: true,
  stagePadding: 0, // İlk adımda overlay'in tam ekran görünmesi için
  animate: true, // Animasyonları etkinleştir
  onNext: (step) => {
    if (step.element === '.complete-button') {
      setTimeout(() => {
        document.querySelector(step.element)?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  },
  onReset: () => {
    // Tur tamamlandığında veya kapatıldığında
    localStorage.setItem('hasSeenTour', 'true');
  },
  onDestroyed: () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Driver örneğini temizle
    driverObj.value = null;
  }
});

onMounted(() => {
  if (isFirstVisit.value) {
    // Splash screen'den sonra başlatmak için timeout
    setTimeout(() => {
      startTour();
      // İlk ziyaret flag'ini güncelle
      localStorage.setItem('hasSeenTour', 'true');
    }, 2500);
  }
});

const startTour = () => {
  // Varolan tour instance'ı temizle
  if (driverObj.value) {
    driverObj.value.destroy();
  }
  // Yeni tour instance'ı oluştur ve başlat
  driverObj.value = driver(createDriverConfig());
  setTimeout(() => {
    driverObj.value.drive();
  }, 100);
};

defineExpose({ startTour });

</script>

<template>
  <!-- Bileşenin görsel bir çıktısı yok -->
</template>

<style>

  .driver-popover{
      font-family: var(--font-family);
      /* box-shadow: 0 0 2rem #0006; */
      background-color: var(--background);
      background-color: var(--surface);

      border: 1px outset var(--text-emphasis);
      border: 1px outset var(--text-primary);
      border: 1px outset var(--primary-dark);
      border: 1px outset var(--primary);
      border-radius: 0.5rem;
      padding: 1rem;
  }

  .driver-popover-title{
      font-family: var(--font-family);
      color: var(--primary);
  }

  .driver-popover-description{
      font-family: var(--font-family);
      color: var(--text-primary);
      /* color: var(--text-secondary); */
  }
  .driver-popover-progress-text {
    font-family: var(--font-family);
  }

  .driver-popover-footer button {
      /* font: unset; */
      font-family: var(--font-family);
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: 0.25rem;
      padding: 0.4rem 0.6rem;
      transition: all 0.3s ease;
      text-shadow:none;
  }

  .driver-popover-footer button:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      opacity: 0.9; 
      background-color: var(--primary-dark);
      /* color: var(--primary); */
  }
</style>
