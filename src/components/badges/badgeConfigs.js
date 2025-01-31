// src/components/badges/badgeConfigs.js
import Ilk from './icons/ilk.vue';
import ArdArda3Gun from './icons/ArdArda3Gun.vue';
import ArdArda5Gun from './icons/ArdArda5Gun.vue';
import ArdArda7Gun from './icons/ArdArda7Gun.vue';
import ArdArda10Gun from './icons/ArdArda10Gun.vue';
import ArdArda15Gun from './icons/ArdArda15Gun.vue';
import X1x5 from './icons/1x5.vue';
import X3x5 from './icons/3x5.vue';
import X5x5 from './icons/5x5.vue';
import Ezber33 from './icons/Ezber33.vue';
import Ezber66 from './icons/Ezber66.vue';
import Zakir from './icons/Zakir.vue';

import marioSound from './sounds/mario-v.mp3'
import defaultSound from './sounds/default.mp3'
import tetrisSound from './sounds/tetris-v.mp3'
import cekirgeSound from './sounds/cekirge-v.mp3'


export const badgeConfigs = {
  firstTesbihat: {
    id: 'firstTesbihat',
    icon: Ilk,
    title: 'İlk Adım',
    description: 'İlk tesbihatını tamamla',
    sound: marioSound,
    requirements: ['İlk tesbihatını tamamla'],
    order: 1
  },
  streak3: {
    id: 'streak3',
    icon: ArdArda3Gun,
    title: 'Art arda 3 gün',
    description: '3 gün kesintisiz kullanım',
    sound: defaultSound,
    requirements: ['3 gün kesintisiz uygulama kullanımı'],
    order: 2
  },
  streak5: {
    id: 'streak5',
    icon: ArdArda5Gun,
    title: 'Art arda 5 gün',
    description: '5 gün kesintisiz kullanım',
    sound: defaultSound,
    requirements: ['5 gün kesintisiz uygulama kullanımı'],
    order: 3
  },
  streak7: {
    id: 'streak7',
    icon: ArdArda7Gun,
    title: 'Art arda 7 gün',
    description: '7 gün kesintisiz kullanım',
    sound: defaultSound,
    requirements: ['7 gün kesintisiz uygulama kullanımı'],
    order: 4
  },
  streak10: {
    id: 'streak10',
    icon: ArdArda10Gun,
    title: 'Art arda 10 gün',
    description: '10 gün kesintisiz kullanım',
    sound: defaultSound,
    requirements: ['10 gün kesintisiz uygulama kullanımı'],
    order: 5
  },
  streak15: {
    id: 'streak15',
    icon: ArdArda15Gun,
    title: 'Art arda 15 gün',
    description: '15 gün kesintisiz kullanım',
    sound: './sounds/tetris-v.mp3',
    requirements: ['15 gün kesintisiz uygulama kullanımı'],
    order: 6
  },
  oneDay5: {
    id: 'oneDay5',
    icon: X1x5,
    title: '1 günde 5 tesbihat',
    description: 'Bir gün içinde 5 tesbihat tamamla',
    sound: defaultSound,
    requirements: ['24 saat içinde 5 tesbihat tamamla'],
    order: 7
  },
  threeDay5: {
    id: 'threeDay5',
    icon: X3x5,
    title: '3 günde 5 tesbihat',
    description: '3 gün içinde 5 tesbihat tamamla',
    sound: defaultSound,
    requirements: ['3 gün içinde toplam 5 tesbihat tamamla'],
    order: 8
  },
  sevenDay5: {
    id: 'sevenDay5',
    icon: X5x5,
    title: '7 günde 5 tesbihat',
    description: '7 gün içinde 5 tesbihat tamamla',
    sound: defaultSound,
    requirements: ['7 gün içinde toplam 5 tesbihat tamamla'],
    order: 9
  },
  ezber33: {
    id: 'ezber33',
    icon: Ezber33,
    title: '33% Ezber',
    description: 'Tesbihatların 33%\'ini ezberle',
    sound: defaultSound,
    requirements: ['Tesbihatların %33\'ünü ezberle'],
    order: 10
  },
  ezber66: {
    id: 'ezber66',
    icon: Ezber66,
    title: '66% Ezber',
    description: 'Tesbihatların 66%\'sını ezberle',
    sound: tetrisSound,
    requirements: ['Tesbihatların %66\'sını ezberle'],
    order: 11
  },
  zakir: {
    id: 'zakir',
    icon: Zakir,
    title: 'Zâkir',
    description: 'Tüm rozetleri topla',
    sound: cekirgeSound,
    requirements: ['Diğer tüm rozetleri kazan'],
    order: 12
  }
}

// Rozet durumlarını başlatmak için yardımcı fonksiyon
export const initializeBadgeState = (config) => {
  return {
    ...config,
    progress: 0,
    isAchieved: false,
    achievedDate: null
  }
}

// Tüm rozetleri sıralı almak için yardımcı fonksiyon
export const getOrderedBadges = () => {
  return Object.values(badgeConfigs).sort((a, b) => a.order - b.order)
}

// Rozet ilerlemesini hesaplamak için yardımcı fonksiyonlar
export const calculateProgress = {
  streak: (currentStreak, targetStreak) => {
    return Math.min((currentStreak / targetStreak) * 100, 100)
  },
  daily: (count, target) => {
    return Math.min((count / target) * 100, 100)
  },
  ezber: (percentage) => {
    return Math.min(percentage, 100)
  }
}
