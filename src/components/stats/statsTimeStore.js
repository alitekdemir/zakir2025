// src/components/stats/statsTimeStore.js
import { defineStore } from 'pinia'

export const useStatsTimeStore = defineStore('statsTime', {
  state: () => ({
    firstUseDate: null,
    totalScreenTime: 0,
    sessionStartTime: null,
    dailyUsage: {}, // Son 30 günlük kullanım
    streak: 0,
    dailyTesbihatCount: 0,
    lastTesbihatTime: null,
    weeklyTesbihatCount: 0,
    dailyTesbihatCounts: {}
  }),

  actions: {
    initializeStats() {
      const stored = localStorage.getItem('app-stats-time')
      if (stored) {
        try {
          const stats = JSON.parse(stored)
          if (stats.dailyUsage) {
            const totalMinutes = Object.values(stats.dailyUsage).reduce((sum, minutes) => sum + minutes, 0)
            stats.totalScreenTime = totalMinutes * 60
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

    startSession() {
      this.sessionStartTime = new Date()
      this.updateDailyUsage()
    },

    endSession() {
      if (this.sessionStartTime) {
        const sessionDuration = Math.floor((new Date() - new Date(this.sessionStartTime)) / 1000)
        this.totalScreenTime += sessionDuration
        this.sessionStartTime = null
        this.saveStats()
      }
    },

    updateDailyUsage() {
      const today = new Date().toISOString().split('T')[0]
      if (!this.dailyUsage[today]) {
        this.dailyUsage[today] = 1
        this.updateStreak()
      } else {
        this.dailyUsage[today]++
      }
      this.cleanOldData()
      this.saveStats()
    },

    updateStreak() {
      const today = new Date().toISOString().split('T')[0]
      let currentStreak = 0
      let date = new Date(today)

      while (this.dailyUsage[date.toISOString().split('T')[0]]) {
        currentStreak++
        date.setDate(date.getDate() - 1)
      }

      this.streak = currentStreak
      return this.streak
    },

    completeTesbihat() {
      const now = new Date()
      const today = now.toISOString().split('T')[0]
      
      if (this.lastTesbihatTime) {
        const timeDiff = now - new Date(this.lastTesbihatTime)
        if (timeDiff < 300000) return false
      }

      if (!this.dailyTesbihatCounts[today]) {
        this.dailyTesbihatCounts[today] = 0
      }
      this.dailyTesbihatCounts[today]++
      
      this.weeklyTesbihatCount++
      this.lastTesbihatTime = now.toISOString()
      
      this.saveStats()
      return {
        dailyCount: this.dailyTesbihatCounts[today],
        weeklyCount: this.weeklyTesbihatCount,
        isFirstTesbihat: this.weeklyTesbihatCount === 1
      }
    },

    cleanOldData() {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      
      this.dailyUsage = Object.fromEntries(
        Object.entries(this.dailyUsage).filter(([date]) => 
          new Date(date) > thirtyDaysAgo
        )
      )

      this.dailyTesbihatCounts = Object.fromEntries(
        Object.entries(this.dailyTesbihatCounts).filter(([date]) => 
          new Date(date) > thirtyDaysAgo
        )
      )
    },

    resetStats() {
      const defaultState = {
        firstUseDate: new Date().toISOString(),
        totalScreenTime: 0,
        sessionStartTime: null,
        dailyUsage: {},
        streak: 0,
        dailyTesbihatCount: 0,
        lastTesbihatTime: null,
        weeklyTesbihatCount: 0,
        dailyTesbihatCounts: {}
      }
    
      this.$state = defaultState
      localStorage.removeItem('app-stats-time')
      this.saveStats()
    },

    saveStats() {
      try {
        const dataToSave = { ...this.$state }
        localStorage.setItem('app-stats-time', JSON.stringify(dataToSave))
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
    }
  }
})
