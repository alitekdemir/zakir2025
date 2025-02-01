// src/components/badges/statsBadgesStore.js
import { defineStore } from 'pinia'
import { useStatsTimeStore } from '../stats/statsTimeStore'
import { badgeConfigs } from './badgeConfigs'

export const useStatsBadgesStore = defineStore('badges', {
  state: () => ({
    badges: Object.keys(badgeConfigs).reduce((acc, badgeId) => {
      acc[badgeId] = {
        id: badgeId,
        title: badgeConfigs[badgeId].title,
        description: badgeConfigs[badgeId].description,
        isAchieved: false,
        achievedDate: null,
        progress: 0
      }
      return acc
    }, {}),
    latestBadge: null
  }),

  actions: {
    initializeBadges() {
      const stored = localStorage.getItem('app-badges')
      if (stored) {
        try {
          const storedBadges = JSON.parse(stored)
          // Tüm rozet konfigürasyonlarını koruyarak mevcut durumu güncelle
          this.badges = Object.keys(badgeConfigs).reduce((acc, badgeId) => {
            acc[badgeId] = {
              ...this.badges[badgeId],
              ...(storedBadges[badgeId] || {}),
            }
            return acc
          }, {...this.badges})
        } catch (error) {
          console.error('Rozetler yüklenirken hata:', error)
        }
      }
    },
    
    checkBadges() {
      const timeStore = useStatsTimeStore()
      
      // İlk tesbihat rozeti
      if (timeStore.weeklyTesbihatCount > 0) {
        this.earnBadge('firstTesbihat')
      }

      // Streak rozetleri
      this.checkStreakBadges(timeStore.streak)

      // Günlük tesbihat rozetleri
      this.checkDailyTesbihatBadges(timeStore.dailyTesbihatCounts)

      // Zakir rozeti kontrolü
      this.checkZakirBadge()
    },


    checkStreakBadges(streak) {
      if (streak >= 3) this.earnBadge('streak3')
      if (streak >= 5) this.earnBadge('streak5')
      if (streak >= 7) this.earnBadge('streak7')
      if (streak >= 10) this.earnBadge('streak10')
      if (streak >= 15) this.earnBadge('streak15')
    },

    checkDailyTesbihatBadges(dailyCounts) {
      const today = new Date().toISOString().split('T')[0]
      if (dailyCounts[today] >= 5) {
        this.earnBadge('oneDay5')
      }

      // 3 günlük kontrol
      const last3DaysTotal = this.calculatePeriodTotal(dailyCounts, 3)
      if (last3DaysTotal >= 5) {
        this.earnBadge('threeDay5')
      }

      // 7 günlük kontrol
      const last7DaysTotal = this.calculatePeriodTotal(dailyCounts, 7)
      if (last7DaysTotal >= 5) {
        this.earnBadge('sevenDay5')
      }
    },

    calculatePeriodTotal(dailyCounts, days) {
      const dates = Object.keys(dailyCounts).sort()
      const lastDays = dates.slice(-days)
      return lastDays.reduce((sum, date) => sum + (dailyCounts[date] || 0), 0)
    },

    earnBadge(badgeId) {
      if (this.badges[badgeId] && !this.badges[badgeId].isAchieved) {
        this.badges[badgeId].isAchieved = true
        this.badges[badgeId].achievedDate = new Date().toISOString()
        this.badges[badgeId].progress = 100
        this.latestBadge = this.badges[badgeId] // Yeni rozet kazanıldığında latestBadge'i güncelle
        this.saveBadges()
      }
    },

    checkZakirBadge() {
      const allOtherBadgesEarned = Object.values(this.badges).every(
        badge => badge.id === 'zakir' || badge.isAchieved
      )
      if (allOtherBadgesEarned) {
        this.earnBadge('zakir')
      }
    },

    saveBadges() {
      try {
        localStorage.setItem('app-badges', JSON.stringify(this.badges))
      } catch (error) {
        console.error('Rozetler kaydedilirken hata:', error)
      }
    },

    resetBadges() {
      Object.keys(this.badges).forEach(badgeId => {
        this.badges[badgeId].isAchieved = false
        this.badges[badgeId].achievedDate = null
        this.badges[badgeId].progress = 0
      })
      this.latestBadge = null
      this.saveBadges()
    },

    clearLatestBadge() {
      this.latestBadge = null;
    },

    checkProgressBadges(percentage) {
      // Progress değerlerini her durumda güncelle
      this.badges.ezber33.progress = Math.min(Math.round(percentage), 100)
      this.badges.ezber66.progress = Math.min(Math.round(percentage), 100)
    
      // %33 rozeti kontrolü
      if (percentage > 32) {
        this.earnBadge('ezber33')
      } else {
        this.badges.ezber33.isAchieved = false
        this.badges.ezber33.achievedDate = null
      }
    
      // %66 rozeti kontrolü
      if (percentage > 65) {
        this.earnBadge('ezber66')
      } else {
        this.badges.ezber66.isAchieved = false
        this.badges.ezber66.achievedDate = null
      }
    
      this.saveBadges()
    }
      
  },

  getters: {
    earnedBadgesCount: (state) => 
      Object.values(state.badges).filter(badge => badge.isAchieved).length,
    
    totalBadgesCount: (state) => 
      Object.keys(state.badges).length,
    
    getLatestBadge: (state) => 
      state.latestBadge
  }
})
