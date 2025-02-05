// src/assets/tour.js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const tourSteps = [
  {
    element: '.welcome-step',
    popover: {
      title: 'Hoş Geldiniz!',
      description: 'Size uygulamanın temel özelliklerini tanıtalım.',
      position: 'bottom'
    }
  },
  {
    element: '.navbar-right button:first-child',
    popover: {
      title: 'Tema Değiştirme',
      description: 'Açık/Koyu tema arasında geçiş yapabilirsiniz.',
      position: 'bottom'
    }
  },
  {
    element: '.navbar-right button:nth-child(2)',
    popover: {
      title: 'Yazı Tipi',
      description: 'Latin/Arapça yazı tipi arasında geçiş yapabilirsiniz.',
      position: 'bottom'
    }
  },
  {
    element: '.hamburger-btn',
    popover: {
      title: 'Ana Menü',
      description: 'Menüyü açmak için buraya tıklayın.',
      position: 'right'
    }
  },
  {
    element: '.dua-widget:first-child .widget-header',
    popover: {
      title: 'Dua Kartı',
      description: 'Kartın başlığına tıklayarak içeriği açıp kapatabilirsiniz.',
      position: 'bottom'
    }
  },
  {
    element: '.dua-widget:first-child .more-btn',
    popover: {
      title: 'Dua Seçenekleri',
      description: 'Seçenekleri görmek için buraya tıklayın.',
      position: 'left'
    }
  },
  {
    element: '.flex-container .buton:first-child',
    popover: {
      title: 'Vakitlere Özel Dualar',
      description: '"Sabah" ve "Akşam" butonlarıyla ilgili vakitlere özel duaları görüntüleyebilirsiniz.',
      position: 'bottom'
    }
  },
  {
    element: '.complete-button',
    popover: {
      title: 'Tesbihatı Tamamla',
      description: 'Tesbihatınızı bitirdiğinizde bu butona tıklayarak ilerlemenizi kaydedin.',
      position: 'top'
    }
  }
];

const driverObj = driver({
  animate: true,
  opacity: 0.7,
  padding: 5,
  allowClose: true,
  stageBackground: 'rgba(255, 255, 255, 0.9)',
  showProgress: true,
  nextBtnText: 'İleri',
  prevBtnText: 'Geri',
  doneBtnText: 'Tamam',
  smoothScroll: true,
  animationDuration: 300,
  onDestroyStarted: () => {
    // Tour kapatılmaya başladığında
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },
  onDestroyed: () => {
    // Tour tamamen kapandığında
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
});

export function startTour() {
  driverObj.setSteps(tourSteps);
  driverObj.drive();
}
