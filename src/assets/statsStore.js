// src/assets/statsStore.js
import { defineStore } from 'pinia'
import { badgeConfigs } from '../components/badges/badgeConfigs'

export const useStatsStore = defineStore('stats', {
  state: () => ({
    // Zaman ve kullanım takibi
    firstUseDate: null,
    totalScreenTime: 0,
    sessionStartTime: null,
    lastUpdateTime: null,
    dailyUsage: {}, // Son 30 günlük kullanım (dakika cinsinden)
    streak: 0, // Kesintisiz kullanım
    
    // Tesbihat takibi
    dailyTesbihatCount: 0, // Günlük tamamlanan tesbihat sayısı
    lastTesbihatTime: null, // Son tesbihat tamamlama zamanı
    weeklyTesbihatCount: 0,
    dailyTesbihatCounts: {}, // Her gün için tesbihat sayısını tutacak obje
    
    // Ezber takibi
    memorizedWidgets: {},
    
    // Rozet sistemi - badgeConfigs'den otomatik oluştur
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
    
    // Son kazanılan rozet
    latestBadge: null,
    
    // Güncelleme interval'ı
    updateInterval: null
  }),

  actions: {
    // ============= İNİTİALİZATION =============
    initializeStats() {
      // Önce eski stats verilerini yükle
      const stored = localStorage.getItem('app-stats')
      if (stored) {
        try {
          const stats = JSON.parse(stored)
          // Eski verilerle state'i güncelle
          Object.assign(this.$state, stats)
        } catch (error) {
          console.error('Stats yüklenirken hata:', error)
        }
      }

      // Sonra eski time stats verilerini yükle ve birleştir
      const timeStored = localStorage.getItem('app-stats-time') 
      if (timeStored) {
        try {
          const timeStats = JSON.parse(timeStored)
          // Time stats verilerini mevcut state ile birleştir
          this.firstUseDate = this.firstUseDate || timeStats.firstUseDate
          this.totalScreenTime = this.totalScreenTime || timeStats.totalScreenTime || 0
          this.dailyUsage = { ...this.dailyUsage, ...timeStats.dailyUsage }
          this.streak = Math.max(this.streak || 0, timeStats.streak || 0)
          this.weeklyTesbihatCount = this.weeklyTesbihatCount || timeStats.weeklyTesbihatCount || 0
          this.dailyTesbihatCounts = { ...this.dailyTesbihatCounts, ...timeStats.dailyTesbihatCounts }
          this.lastTesbihatTime = this.lastTesbihatTime || timeStats.lastTesbihatTime
          
          // Eğer önceki oturum düzgün kapanmadıysa süreyi ekle
          if (timeStats.sessionStartTime && timeStats.lastUpdateTime) {
            const lastSessionDuration = Math.floor(
              (new Date(timeStats.lastUpdateTime) - new Date(timeStats.sessionStartTime)) / 1000
            )
            this.totalScreenTime += lastSessionDuration
          }
        } catch (error) {
          console.error('Time stats yüklenirken hata:', error)
        }
      }

      // Eski badges verilerini yükle
      const badgesStored = localStorage.getItem('app-badges')
      if (badgesStored) {
        try {
          const storedBadges = JSON.parse(badgesStored)
          // Mevcut rozet yapısını koruyarak eski verileri yükle
          Object.keys(this.badges).forEach(badgeId => {
            if (storedBadges[badgeId]) {
              this.badges[badgeId] = {
                ...this.badges[badgeId],
                ...storedBadges[badgeId]
              }
            }
          })
        } catch (error) {
          console.error('Badges yüklenirken hata:', error)
        }
      }

      // Eğer hiç veri yoksa varsayılan değerleri ayarla
      if (!stored && !timeStored) {
        this.firstUseDate = new Date().toISOString()
      }
      
      this.saveStats()
    },

    // ============= SESSION YÖNETİMİ =============
    startSession() {
      this.resetDailyCount()
      this.sessionStartTime = new Date().toISOString()
      this.lastUpdateTime = new Date().toISOString()
      this.updateDailyUsage()
      
      // Periyodik güncelleme başlat
      this.startPeriodicUpdate()
    },

    startPeriodicUpdate() {
      // Her 30 saniyede bir süreyi güncelle
      if (this.updateInterval) {
        clearInterval(this.updateInterval)
      }
      this.updateInterval = setInterval(() => {
        this.updateCurrentSession()
      }, 30000)
    },

    updateCurrentSession() {
      if (this.sessionStartTime) {
        const now = new Date()
        const lastUpdate = new Date(this.lastUpdateTime)
        const sessionDuration = Math.floor((now - lastUpdate) / 1000)
        
        // Sadece makul bir süre geçmişse güncelle (maksimum 5 dakika)
        if (sessionDuration > 0 && sessionDuration < 300) {
          this.totalScreenTime += sessionDuration
          this.lastUpdateTime = now.toISOString()
          this.saveStats()
        } else if (sessionDuration >= 300) {
          // 5 dakikadan fazla geçmişse sadece zamanı güncelle
          this.lastUpdateTime = now.toISOString()
        }
      }
    },

    endSession() {
      if (this.sessionStartTime) {
        this.updateCurrentSession()
        if (this.updateInterval) {
          clearInterval(this.updateInterval)
          this.updateInterval = null
        }
        this.sessionStartTime = null
        this.saveStats()
      }
    },

    handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        // Sayfa arka plana geçtiğinde mevcut oturumu güncelle
        this.updateCurrentSession()
      } else if (document.visibilityState === 'visible') {
        // Sayfa tekrar aktif olduğunda zamanı yenile
        this.lastUpdateTime = new Date().toISOString()
      }
    },

    // ============= TESBİHAT YÖNETİMİ =============
    completeTesbihat() {
      const now = new Date()
      const today = now.toISOString().split('T')[0]
      
      // 5 dakika kontrolü
      if (this.lastTesbihatTime) {
        const timeDiff = now - new Date(this.lastTesbihatTime)
        if (timeDiff < 300000) { // 5 dakika = 300000 ms
          return false
        }
      }

      // Günlük tesbihat sayısını güncelle
      if (!this.dailyTesbihatCounts[today]) {
        this.dailyTesbihatCounts[today] = 0
      }
      this.dailyTesbihatCounts[today]++
      
      // Haftalık sayıyı güncelle
      this.weeklyTesbihatCount++
      this.lastTesbihatTime = now.toISOString()
      
      // Rozetleri kontrol et
      this.checkBadges()
      
      this.saveStats()
      
      return {
        dailyCount: this.dailyTesbihatCounts[today],
        weeklyCount: this.weeklyTesbihatCount,
        isFirstTesbihat: this.weeklyTesbihatCount === 1
      }
    },

    resetDailyCount() {
      const today = new Date().toISOString().split('T')[0]
      const lastDate = this.lastTesbihatTime 
        ? new Date(this.lastTesbihatTime).toISOString().split('T')[0] 
        : null
      
      if (lastDate !== today) {
        this.dailyTesbihatCount = 0
      }
    },

    // ============= ROZET SİSTEMİ =============
    checkBadges() {
      // İlk tesbihat rozeti
      if (this.weeklyTesbihatCount > 0) {
        this.earnBadge('firstTesbihat')
      }

      // Streak rozetleri
      this.checkStreakBadges()

      // Günlük tesbihat rozetleri
      this.checkDailyTesbihatBadges()

      // Ezber rozetlerini kontrol et
      this.checkProgressBadges()

      // Zakir rozeti kontrolü (en son)
      this.checkZakirBadge()
    },

    earnBadge(badgeId) {
      if (this.badges[badgeId] && !this.badges[badgeId].isAchieved) {
        this.badges[badgeId].isAchieved = true
        this.badges[badgeId].achievedDate = new Date().toISOString()
        this.badges[badgeId].progress = 100
        this.latestBadge = {
          ...this.badges[badgeId],
          // Badge config'den ses ve icon bilgilerini ekle
          sound: badgeConfigs[badgeId]?.sound,
          icon: badgeConfigs[badgeId]?.icon
        }
        console.log(`🏆 Rozet kazanıldı: ${this.badges[badgeId].title}`)
        this.saveStats()
        return true
      }
      return false
    },

    checkStreakBadges() {
      const streakBadges = [
        { id: 'streak3', target: 3 },
        { id: 'streak5', target: 5 },
        { id: 'streak7', target: 7 },
        { id: 'streak10', target: 10 },
        { id: 'streak15', target: 15 }
      ]
      
      streakBadges.forEach(({ id, target }) => {
        if (this.streak >= target) {
          this.earnBadge(id)
        }
        // Progress güncellemesi - yuvarlayarak
        if (this.badges[id]) {
          this.badges[id].progress = Math.round(Math.min((this.streak / target) * 100, 100))
        }
      })
    },

    checkDailyTesbihatBadges() {
      const today = new Date().toISOString().split('T')[0]
      const dailyCount = this.dailyTesbihatCounts[today] || 0
      
      // Günlük 5 tesbihat kontrolü
      if (this.badges.oneDay5) {
        this.badges.oneDay5.progress = Math.round(Math.min((dailyCount / 5) * 100, 100))
        if (dailyCount >= 5) {
          this.earnBadge('oneDay5')
        }
      }

      // 3 günlük kontrol
      const last3DaysTotal = this.calculatePeriodTotal(3)
      if (this.badges.threeDay5) {
        this.badges.threeDay5.progress = Math.round(Math.min((last3DaysTotal / 5) * 100, 100))
        if (last3DaysTotal >= 5) {
          this.earnBadge('threeDay5')
        }
      }

      // 7 günlük kontrol
      const last7DaysTotal = this.calculatePeriodTotal(7)
      if (this.badges.sevenDay5) {
        this.badges.sevenDay5.progress = Math.round(Math.min((last7DaysTotal / 5) * 100, 100))
        if (last7DaysTotal >= 5) {
          this.earnBadge('sevenDay5')
        }
      }
    },

    calculatePeriodTotal(days) {
      const today = new Date()
      let total = 0
      
      for (let i = 0; i < days; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const dateStr = date.toISOString().split('T')[0]
        total += this.dailyTesbihatCounts[dateStr] || 0
      }
      
      return total
    },

    checkProgressBadges() {
      const percentage = this.memorizedProgress
      
      // Progress değerlerini güncelle
      if (this.badges.ezber33) {
        this.badges.ezber33.progress = Math.min(Math.round(percentage), 100)
        if (percentage >= 33) {
          this.earnBadge('ezber33')
        } else {
          this.badges.ezber33.isAchieved = false
          this.badges.ezber33.achievedDate = null
        }
      }
      
      if (this.badges.ezber66) {
        this.badges.ezber66.progress = Math.min(Math.round(percentage), 100)
        if (percentage >= 66) {
          this.earnBadge('ezber66')
        } else {
          this.badges.ezber66.isAchieved = false
          this.badges.ezber66.achievedDate = null
        }
      }
    },

    checkZakirBadge() {
      const requiredBadges = [
        'firstTesbihat', 'streak3', 'streak5', 'streak7', 'streak10', 'streak15',
        'oneDay5', 'threeDay5', 'sevenDay5', 'ezber33', 'ezber66'
      ]
      
      const hasAllBadges = requiredBadges.every(badgeId => 
        this.badges[badgeId] && this.badges[badgeId].isAchieved
      )
      
      if (this.badges.zakir) {
        this.badges.zakir.progress = Math.round(
          (requiredBadges.filter(badgeId => 
            this.badges[badgeId] && this.badges[badgeId].isAchieved
          ).length / requiredBadges.length) * 100
        )
        
        if (hasAllBadges) {
          this.earnBadge('zakir')
        }
      }
    },

    clearLatestBadge() {
      this.latestBadge = null
    },

    resetBadges() {
      Object.keys(this.badges).forEach(badgeId => {
        this.badges[badgeId].isAchieved = false
        this.badges[badgeId].achievedDate = null
        this.badges[badgeId].progress = 0
      })
      this.latestBadge = null
      this.saveStats()
    },

    // ============= GÜNLÜK KULLANIM VE STREAK =============
    updateDailyUsage() {
      const today = new Date().toISOString().split('T')[0]
      
      if (!this.dailyUsage[today]) {
        this.dailyUsage[today] = 1
        this.updateStreak()
      } else {
        this.dailyUsage[today]++
      }

      // 30 günden eski verileri temizle
      this.cleanOldData()
      this.saveStats()
    },

    updateStreak() {
      const today = new Date().toISOString().split('T')[0]
      let currentStreak = 0
      let date = new Date(today)

      // Geriye doğru günleri kontrol et
      while (this.dailyUsage[date.toISOString().split('T')[0]]) {
        currentStreak++
        date.setDate(date.getDate() - 1)
      }

      this.streak = currentStreak
      this.checkStreakBadges()
      console.log(`📈 Streak güncellendi: ${this.streak} gün`)
    },

    cleanOldData() {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      
      // Günlük kullanım verilerini temizle
      this.dailyUsage = Object.fromEntries(
        Object.entries(this.dailyUsage).filter(([date]) => 
          new Date(date) > thirtyDaysAgo
        )
      )

      // Günlük tesbihat sayılarını temizle
      this.dailyTesbihatCounts = Object.fromEntries(
        Object.entries(this.dailyTesbihatCounts).filter(([date]) => 
          new Date(date) > thirtyDaysAgo
        )
      )
    },

    // ============= RESET VE SAVE =============
    resetStats() {
      console.log('📊 İstatistikler sıfırlanıyor...')
      
      const defaultState = {
        firstUseDate: new Date().toISOString(),
        totalScreenTime: 0,
        sessionStartTime: null,
        lastUpdateTime: null,
        dailyUsage: {},
        streak: 0,
        dailyTesbihatCount: 0,
        lastTesbihatTime: null,
        weeklyTesbihatCount: 0,
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
        updateInterval: null
      }
    
      this.$state = defaultState
      
      // Eski storage'ları da temizle
      localStorage.removeItem('app-stats')
      localStorage.removeItem('app-stats-time') 
      localStorage.removeItem('app-badges')
      
      this.saveStats()
      console.log('✅ İstatistikler sıfırlandı')
    },
    
    saveStats() {
      try {
        const dataToSave = { ...this.$state }
        delete dataToSave.updateInterval // Interval'ı kaydetme
        localStorage.setItem('app-stats', JSON.stringify(dataToSave))
      } catch (error) {
        console.error('İstatistikler kaydedilirken hata:', error)
      }
    }
  },

  getters: {
    getDaysFromFirstUse: (state) => {
      if (!state.firstUseDate) return 0
      const diff = new Date() - new Date(state.firstUseDate)
      return Math.floor(diff / (1000 * 60 * 60 * 24))
    },
    
    getFormattedScreenTime: (state) => {
      const totalMinutes = Math.floor(state.totalScreenTime / 60)
      const hours = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    },

    // Son 7 günlük tesbihat sayısı
    getWeeklyTesbihatCount: (state) => {
      const today = new Date()
      let total = 0
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const dateStr = date.toISOString().split('T')[0]
        total += state.dailyTesbihatCounts[dateStr] || 0
      }
      
      return total
    },

    // En aktif günler
    getMostActiveWeekdays: (state) => {
      const weekdayCounts = {}
      Object.entries(state.dailyUsage).forEach(([date, count]) => {
        const weekday = new Date(date).getDay()
        weekdayCounts[weekday] = (weekdayCounts[weekday] || 0) + count
      })
      return weekdayCounts
    },

    // Ezber ilerlemesi
    memorizedProgress: (state) => {
      if (!state.memorizedWidgets) return 0
      const memorizedCount = Object.values(state.memorizedWidgets).filter(Boolean).length
      const totalWidgets = 18 // Toplam widget sayısı
      return Math.round((memorizedCount / totalWidgets) * 100)
    },

    // Rozet getters
    earnedBadgesCount: (state) => 
      Object.values(state.badges).filter(badge => badge.isAchieved).length,
    
    totalBadgesCount: (state) => 
      Object.keys(state.badges).length,
    
    getLatestBadge: (state) => 
      state.latestBadge,
      
    // Sıralı rozetler
    getOrderedBadges: (state) => 
      Object.values(state.badges).sort((a, b) => (a.order || 999) - (b.order || 999)),
    
    // Bugünkü tesbihat sayısı
    getTodayTesbihatCount: (state) => {
      const today = new Date().toISOString().split('T')[0]
      return state.dailyTesbihatCounts[today] || 0
    }
  }
})
