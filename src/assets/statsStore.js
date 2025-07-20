// src/assets/statsStore.js
import { defineStore } from 'pinia'
import { badgeConfigs } from '../components/badges/badgeConfigs'

export const useStatsStore = defineStore('stats', {
  state: () => ({
    homepageTimer: null,
    firstUseDate: null,
    totalScreenTime: 0, 
    timeSpentOnHomepage: 0,
    dailyUsage: {}, 
    streak: 0,
    lastTesbihatTime: null,
    dailyTesbihatCounts: {},
    memorizedWidgets: {},
    badges: Object.keys(badgeConfigs).reduce((acc, badgeId) => {
      acc[badgeId] = {
        id: badgeId,
        title: badgeConfigs[badgeId].title,
        description: badgeConfigs[badgeId].description,
        icon: badgeConfigs[badgeId].icon,
        sound: badgeConfigs[badgeId].sound,
        requirements: badgeConfigs[badgeId].requirements,
        order: badgeConfigs[badgeId].order,
        isAchieved: false,
        achievedDate: null,
        progress: 0
      }
      return acc
    }, {}),
    latestBadge: null,
  }),

  actions: {
    // ============= İNİTİALİZASYON VE VERİ ONARIMI =============
    initializeStats() {
      const stored = localStorage.getItem('app-stats');
      if (stored) {
        try {
          const stats = JSON.parse(stored);
          delete stats.homepageTimer;
          Object.assign(this.$state, stats);
        } catch (error) {
          console.error('Stats yüklenirken hata:', error);
          this.resetStats();
        }
      }
      
      // --- VERİ ONARIM ADIMI ---
      // totalScreenTime'ı, günlük kayıtların toplamı olarak yeniden hesapla
      // Bu, geçmişten gelen veri tutarsızlıklarını düzeltir.
      const calculatedTotalTime = Object.values(this.dailyUsage).reduce((sum, dailySeconds) => sum + dailySeconds, 0);
      if (this.totalScreenTime !== calculatedTotalTime) {
          console.warn('Veri tutarsızlığı düzeltildi. totalScreenTime güncellendi.');
          this.totalScreenTime = calculatedTotalTime;
      }
      // --- ONARIM SONU ---

      if (!this.firstUseDate) {
        this.firstUseDate = new Date().toISOString();
      }
      this.updateStreak();
      this.saveStats();
    },

    // ============= MERKEZİ SÜRE TAKİBİ (SADECE ANASAYFA) =============
    startTimeTracking() {
      if (this.homepageTimer) return;

      this.homepageTimer = setInterval(() => {
        const today = new Date().toISOString().split('T')[0];

        this.timeSpentOnHomepage++;
        this.totalScreenTime++;
        
        if (!this.dailyUsage[today]) {
          this.dailyUsage[today] = 0;
          this.updateStreak();
        }
        this.dailyUsage[today]++;

        if (this.timeSpentOnHomepage % 10 === 0) {
            this.checkBadges();
            this.saveStats(); // Periyodik olarak kaydet
        }

      }, 1000);
    },

    stopTimeTracking() {
      clearInterval(this.homepageTimer);
      this.homepageTimer = null;
      this.saveStats();
    },

    // ============= TESBİHAT YÖNETİMİ =============
    completeTesbihat() {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      
      if (this.lastTesbihatTime) {
        const timeDiff = now - new Date(this.lastTesbihatTime);
        if (timeDiff < 300000) { return false; }
      }

      this.dailyTesbihatCounts[today] = (this.dailyTesbihatCounts[today] || 0) + 1;
      this.lastTesbihatTime = now.toISOString();
      this.checkBadges();
      this.saveStats();
      return true;
    },

    // ============= ROZET SİSTEMİ =============
    checkBadges() {
      const totalTesbihat = Object.values(this.dailyTesbihatCounts).reduce((sum, count) => sum + count, 0);
      if (totalTesbihat > 0) this.earnBadge('firstTesbihat');
      this.checkStreakBadges();
      this.checkDailyTesbihatBadges();
      this.checkProgressBadges();
      this.checkZakirBadge();
    },

    earnBadge(badgeId) {
      if (this.badges[badgeId] && !this.badges[badgeId].isAchieved) {
        this.badges[badgeId].isAchieved = true;
        this.badges[badgeId].achievedDate = new Date().toISOString();
        this.badges[badgeId].progress = 100;
        this.latestBadge = { ...this.badges[badgeId] };
        console.log(`🏆 Rozet kazanıldı: ${this.badges[badgeId].title}`);
        this.saveStats();
        return true;
      }
      return false;
    },
    
    // Diğer badge kontrol fonksiyonları (checkStreakBadges, etc.) buraya olduğu gibi eklenebilir...
    checkStreakBadges() {
        const streakBadges = [
            { id: 'streak3', target: 3 }, { id: 'streak5', target: 5 },
            { id: 'streak7', target: 7 }, { id: 'streak10', target: 10 },
            { id: 'streak15', target: 15 }
        ];
        streakBadges.forEach(({ id, target }) => {
            if (this.badges[id]) {
                this.badges[id].progress = Math.round(Math.min((this.streak / target) * 100, 100));
                if (this.streak >= target) this.earnBadge(id);
            }
        });
    },

    checkDailyTesbihatBadges() {
        const today = new Date().toISOString().split('T')[0];
        const dailyCount = this.dailyTesbihatCounts[today] || 0;
        if (this.badges.oneDay5) {
            this.badges.oneDay5.progress = Math.round(Math.min((dailyCount / 5) * 100, 100));
            if (dailyCount >= 5) this.earnBadge('oneDay5');
        }
        const last3DaysTotal = this.calculatePeriodTotal(3);
        if (this.badges.threeDay5) {
            this.badges.threeDay5.progress = Math.round(Math.min((last3DaysTotal / 5) * 100, 100));
            if (last3DaysTotal >= 5) this.earnBadge('threeDay5');
        }
        const last7DaysTotal = this.calculatePeriodTotal(7);
        if (this.badges.sevenDay5) {
            this.badges.sevenDay5.progress = Math.round(Math.min((last7DaysTotal / 5) * 100, 100));
            if (last7DaysTotal >= 5) this.earnBadge('sevenDay5');
        }
    },

    calculatePeriodTotal(days) {
        let total = 0;
        for (let i = 0; i < days; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            total += this.dailyTesbihatCounts[dateStr] || 0;
        }
        return total;
    },

    checkProgressBadges() {
        const percentage = this.memorizedProgress;
        if (this.badges.ezber33) {
            this.badges.ezber33.progress = Math.min(Math.round(percentage), 100);
            if (percentage >= 33) this.earnBadge('ezber33');
        }
        if (this.badges.ezber66) {
            this.badges.ezber66.progress = Math.min(Math.round(percentage), 100);
            if (percentage >= 66) this.earnBadge('ezber66');
        }
    },

    checkZakirBadge() {
        const requiredBadges = [
            'firstTesbihat', 'streak3', 'streak5', 'streak7', 'streak10', 'streak15',
            'oneDay5', 'threeDay5', 'sevenDay5', 'ezber33', 'ezber66'
        ];
        const hasAllBadges = requiredBadges.every(id => this.badges[id]?.isAchieved);
        if (this.badges.zakir) {
            const progress = Math.round(
                (requiredBadges.filter(id => this.badges[id]?.isAchieved).length / requiredBadges.length) * 100
            );
            this.badges.zakir.progress = progress;
            if (hasAllBadges) this.earnBadge('zakir');
        }
    },

    clearLatestBadge() {
      this.latestBadge = null;
    },

    // ============= GÜNLÜK KULLANIM VE STREAK =============
    updateStreak() {
      let currentStreak = 0;
      let date = new Date();
      while (this.dailyUsage[date.toISOString().split('T')[0]]) {
        currentStreak++;
        date.setDate(date.getDate() - 1);
      }
      this.streak = currentStreak;
    },

    // ============= RESET VE SAVE =============
    resetStats() {
      console.log('📊 İstatistikler sıfırlanıyor...');
      Object.assign(this.$state, {
        homepageTimer: null, firstUseDate: new Date().toISOString(),
        totalScreenTime: 0, timeSpentOnHomepage: 0, dailyUsage: {},
        streak: 0, lastTesbihatTime: null, dailyTesbihatCounts: {},
        memorizedWidgets: {},
        badges: Object.keys(badgeConfigs).reduce((acc, badgeId) => {
            acc[badgeId] = { ...badgeConfigs[badgeId], isAchieved: false, achievedDate: null, progress: 0 };
            return acc;
        }, {}),
        latestBadge: null,
      });
      this.saveStats();
    },
    
    saveStats() {
      try {
        const dataToSave = { ...this.$state };
        delete dataToSave.homepageTimer;
        localStorage.setItem('app-stats', JSON.stringify(dataToSave));
      } catch (error) {
        console.error('İstatistikler kaydedilirken hata:', error);
      }
    }
  },

  getters: {
    getDaysFromFirstUse: (state) => {
      if (!state.firstUseDate) return 0;
      return Math.floor((new Date() - new Date(state.firstUseDate)) / (1000 * 60 * 60 * 24));
    },
    
    getFormattedScreenTime: (state) => {
      const totalSeconds = state.totalScreenTime;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },

    // HAFTALIK AKTİVİTE İÇİN YENİ GETTERLAR
    getWeeklyActivityChartData: (state) => {
        const weeklyData = {};
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            weeklyData[dateStr] = state.dailyUsage[dateStr] || 0; // Saniye olarak döndür
        }
        return weeklyData;
    },

    getWeeklyActivityTotalSeconds: (state) => {
        let totalSeconds = 0;
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            totalSeconds += state.dailyUsage[dateStr] || 0;
        }
        return totalSeconds;
    },

    memorizedProgress: (state) => {
      if (!state.memorizedWidgets) return 0;
      const memorizedCount = Object.values(state.memorizedWidgets).filter(Boolean).length;
      return Math.round((memorizedCount / 18) * 100);
    },

    earnedBadgesCount: (state) => Object.values(state.badges).filter(b => b.isAchieved).length,
    totalBadgesCount: (state) => Object.keys(state.badges).length,
    getLatestBadge: (state) => state.latestBadge,
    getOrderedBadges: (state) => Object.values(state.badges).sort((a, b) => (a.order || 999) - (b.order || 999)),
    getTodayTesbihatCount: (state) => {
      const today = new Date().toISOString().split('T')[0];
      return state.dailyTesbihatCounts[today] || 0;
    }
  }
})