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
    title: 'Bismillah', //İlk Adım
    description: 'Nur Talebesi\'nin en mühim bir vazifesi olan namaz tesbihatına başladın. Allah kabul etsin.',
    sound: marioSound,
    requirements: ['İlk tesbihatını tamamla'],
    order: 1
  },
  streak3: {
    id: 'streak3',
    icon: ArdArda3Gun,
    title: 'İstikrar',
    description: '3 gündür devam ediyorsun. Bu yolda ne kadar kararlı olduğunu gösterdin.',
    sound: defaultSound,
    requirements: ['3 gün kesintisiz uygulama kullanımı'],
    order: 2
  },
  streak5: {
    id: 'streak5',
    icon: ArdArda5Gun,
    title: 'Sebat',
    description: '5 günlük bu seri, manevi disiplininin ve iradenin bir kanıtı, Ne mutlu sana!',
    sound: defaultSound,
    requirements: ['5 gün kesintisiz uygulama kullanımı'],
    order: 3
  },
  streak7: {
    id: 'streak7',
    icon: ArdArda7Gun,
    title: 'Azim',
    description: 'Bir haftadır kalbini zikirle nurlandırıyorsun. Yolun ve yönün hep hak olsun!',
    sound: defaultSound,
    requirements: ['7 gün kesintisiz uygulama kullanımı'],
    order: 4
  },
  streak10: {
    id: 'streak10',
    icon: ArdArda10Gun,
    title: 'Metanet',
    description: '10 gündür sarsılmadan vazifene devam etmen, metanetinin bir delilidir.',
    sound: defaultSound,
    requirements: ['10 gün kesintisiz uygulama kullanımı'],
    order: 5
  },
  streak15: {
    id: 'streak15',
    icon: ArdArda15Gun,
    title: 'Sadakat',
    description: 'Ayın yarısını zikirle aydınlattın. Gecen de gündüzün de nur olsun.',
    sound: tetrisSound,
    requirements: ['15 gün kesintisiz uygulama kullanımı'],
    order: 6
  },
  oneDay5: {
    id: 'oneDay5',
    icon: X1x5,
    title: 'Şevk ve Gayret',
    description: 'Bugün üzerine adeta bereket yağmış. Bir günde 5 tesbihat!',
    sound: defaultSound,
    requirements: ['24 saat içinde 5 tesbihat tamamla'],
    order: 7
  },
  threeDay5: {
    id: 'threeDay5',
    icon: X3x5,
    title: 'Bereketli Hafta',
    description: 'Evet, mesleğimizde ihlas-ı tammeden sonra en büyük esas, sebat ve metanettir.',
    sound: defaultSound,
    requirements: ['3 gün içinde toplam 5 tesbihat tamamla'],
    order: 8
  },
  sevenDay5: {
    id: 'sevenDay5',
    icon: X5x5,
    title: 'Vazifede İleri Adım',
    description: 'Damlaya damlaya göl olur derler. Sen kısa sürede bir zikir denizi oluşturdun! Allah kabul etsin.',
    sound: defaultSound,
    requirements: ['7 gün içinde toplam 5 tesbihat tamamla'],
    order: 9
  },
  ezber33: {
    id: 'ezber33',
    icon: Ezber33,
    title: 'İlk Talim',
    description: "Tesbihatın üçte birini ezberledin. Tesbihatı sadece dilinle değil, kalbine de nakşediyorsun.",
    sound: defaultSound,
    requirements: ["Tesbihatın %33'ünü ezberle"],
    order: 10
  },
  ezber66: {
    id: 'ezber66',
    icon: Ezber66,
    title: "Hıfz'a Gayret",
    description: "Yolun çoğunu geride bıraktın. Ezberin mübarek olsun. Maşallah!",
    sound: tetrisSound,
    requirements: ["Tesbihatın %66'sını ezberle"],
    order: 11
  },
  ezber100: {
    id: 'ezber100',
    icon: Ezber100,
    title: 'Tesbihat Hafızı',
    description: 'Elhamdulillah! Namaz tesbihatını eksiksiz ezberleyerek bu mühim vazifeyi tamamladın ve "Tesbihat Hafızı" oldun. Ezberin mübarek olsun. Maşallah!',
    sound: tetrisSound,
    requirements: ["Tesbihatın %100'sını ezberle"],
    order: 12
  },
  zakir: {
    id: 'zakir',
    icon: Zakir,
    title: 'Gerçek Zâkir',
    description: 'Bu yolculukta kemâle ulaştın. Zikrin, halin oldu. Sen artık bir Zâkir\'sin.',
    sound: tetrisSound,
    requirements: ['Diğer tüm rozetleri kazan'],
    order: 13
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
