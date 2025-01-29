// src/assets/statsStore.js
import { defineStore } from 'pinia'

export const useStatsStore = defineStore('stats', {
  state: () => ({
    firstUseDate: null,
    totalScreenTime: 0,
    sessionStartTime: null,
    dailyUsage: {}, // Son 30 günlük kullanım
    streak: 0, // Kesintisiz kullanım
    dailyTesbihatCount: 0, // Günlük tamamlanan tesbihat sayısı
    lastTesbihatTime: null, // Son tesbihat tamamlama zamanı
    weeklyTesbihatCount: 0,
    dailyTesbihatCounts: {}, // Her gün için tesbihat sayısını tutacak obje
    lastWeekTesbihatCounts: [], // Son 7 günün tesbihat sayılarını tutacak array
    badges: {
      firstTesbihat: false,
      streak3: false,
      streak5: false,
      streak7: false,
      streak10: false,
      streak15: false,
      daily5: false,
      threeDay5: false,
      sevenDay5: false,
      zakir: false
    }
  }),

  actions: {
    initializeStats() {
      const stored = localStorage.getItem('app-stats')
      if (stored) {
        try {
          const stats = JSON.parse(stored)
          
          // Daily usage verilerinden toplam süreyi hesapla
          if (stats.dailyUsage) {
            const totalMinutes = Object.values(stats.dailyUsage).reduce((sum, minutes) => sum + minutes, 0)
            stats.totalScreenTime = totalMinutes * 60 // Dakikayı saniyeye çevir
          }
          
          this.$state = stats
        } catch (error) {
          console.error('Stats yüklenirken hata:', error)
          this.resetStats()
        }
      } else {
        this.resetStats()
      }
    },
        
    // Tesbihat tamamlandı butonuna basıldığında
    completeTesbihat() {
      const now = new Date()
      const today = now.toISOString().split('T')[0]
      
      // 5 dakika kontrolü
      if (this.lastTesbihatTime) {
        const timeDiff = now - new Date(this.lastTesbihatTime)
        if (timeDiff < 300000) return false
      }

      // İlk tesbihat rozeti
      if (!this.badges.firstTesbihat) {
        this.badges.firstTesbihat = true
      }

      // Günlük tesbihat sayısını güncelle
      if (!this.dailyTesbihatCounts[today]) {
        this.dailyTesbihatCounts[today] = 0
      }
      this.dailyTesbihatCounts[today]++

      // Günlük 5 tesbihat rozeti kontrolü
      if (this.dailyTesbihatCounts[today] >= 5 && !this.badges.daily5) {
        this.badges.daily5 = true
      }

      // 3 günlük ve 7 günlük tesbihat kontrolleri
      this.checkMultiDayTesbihatBadges()

      this.weeklyTesbihatCount++
      this.lastTesbihatTime = now.toISOString()
      this.checkZakirBadge()
      this.saveStats()
      return true
    },
  

    // Günlük kullanımı kaydet
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

    checkMultiDayTesbihatBadges() {
      const dates = Object.keys(this.dailyTesbihatCounts).sort()
      const last7Days = dates.slice(-7)
      
      // 3 günde 5 tesbihat kontrolü
      const last3Days = dates.slice(-3)
      const threeDayCount = last3Days.reduce((sum, date) => 
        sum + (this.dailyTesbihatCounts[date] || 0), 0)
      if (threeDayCount >= 5 && !this.badges.threeDay5) {
        this.badges.threeDay5 = true
      }

      // 7 günde 5 tesbihat kontrolü
      const sevenDayCount = last7Days.reduce((sum, date) => 
        sum + (this.dailyTesbihatCounts[date] || 0), 0)
      if (sevenDayCount >= 5 && !this.badges.sevenDay5) {
        this.badges.sevenDay5 = true
      }
    },

    // Streak hesaplama
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
    },

    // Streak rozetlerini kontrol et
    checkStreakBadges() {
      if (this.streak >= 3) this.badges.streak3 = true
      if (this.streak >= 5) this.badges.streak5 = true
      if (this.streak >= 7) this.badges.streak7 = true
      if (this.streak >= 10) this.badges.streak10 = true
      if (this.streak >= 15) this.badges.streak15 = true
    },

    // 30 günden eski verileri temizle
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

    // İstatistikleri sıfırla
    resetStats() {
      console.log('Reset başlatılıyor...')
      
      // Yeni default state
      const defaultState = {
        firstUseDate: new Date().toISOString(),
        totalScreenTime: 0,
        sessionStartTime: null,
        dailyUsage: {},
        streak: 0,
        dailyTesbihatCount: 0,
        lastTesbihatTime: null,
        weeklyTesbihatCount: 0,
        dailyTesbihatCounts: {}, // Bunu ekleyin
        badges: {
          firstTesbihat: false,
          streak3: false,
          streak5: false,
          streak7: false,
          streak10: false,
          streak15: false,
          daily5: false,
          threeDay5: false,
          sevenDay5: false,
          zakir: false
        }
      }
    
      this.$state = defaultState
      localStorage.removeItem('app-stats')
      this.saveStats()
      
      console.log('Reset tamamlandı, yeni state:', this.$state)
    },
    
    saveStats() {
      try {
        const dataToSave = { ...this.$state } // Tüm state'i kopyala
        localStorage.setItem('app-stats', JSON.stringify(dataToSave))
        console.log('Veriler kaydedildi:', dataToSave)
      } catch (error) {
        console.error('İstatistikler kaydedilirken hata:', error)
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

    // Oturum başlatma ve bitirme metodları
    startSession() {
      this.resetDailyCount()
      this.sessionStartTime = new Date()
      this.updateDailyUsage()
  },
      
    endSession() {
    if (this.sessionStartTime) {
        const sessionDuration = (new Date() - new Date(this.sessionStartTime)) / 1000
        this.totalScreenTime += sessionDuration
        this.sessionStartTime = null
        this.saveStats()
    }
    },

    checkZakirBadge() {
      const requiredBadges = [
        'firstTesbihat',
        'streak3',
        'streak5',
        'streak7',
        'streak10',
        'streak15',
        'daily5',
        'threeDay5',
        'sevenDay5'
      ]
  
      const hasAllBadges = requiredBadges.every(badge => this.badges[badge])
      if (hasAllBadges && !this.badges.zakir) {
        this.badges.zakir = true
      }
    },
  },

  getters: {
    getDaysFromFirstUse: (state) => {
      if (!state.firstUseDate) return 0
      const diff = new Date() - new Date(state.firstUseDate)
      return Math.floor(diff / (1000 * 60 * 60 * 24))
    },
    
    getFormattedScreenTime: (state) => {
      // dailyUsage'dan toplam dakikayı hesapla
      const totalMinutes = Object.values(state.dailyUsage).reduce((sum, minutes) => sum + minutes, 0)
      
      const hours = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60
      
      // Saat ve dakikayı her zaman iki haneli olarak formatla
      const formattedHours = hours.toString().padStart(2, '0')
      const formattedMinutes = minutes.toString().padStart(2, '0')
      
      return `${formattedHours}:${formattedMinutes}`
    },
            
    // Son 7 günlük tesbihat sayısı
    getWeeklyTesbihatCount: (state) => {
      const last7Days = Object.values(state.dailyUsage)
        .slice(-7)
        .reduce((sum, count) => sum + count, 0)
      return last7Days
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

    memorizedProgress: (state) => {
        if (!state.memorizedWidgets) return 0
        const memorizedCount = Object.values(state.memorizedWidgets).filter(Boolean).length
        const totalWidgets = 18 // Toplam widget sayısı
        return Math.round((memorizedCount / totalWidgets) * 100)
      }
    
  },
  
})
