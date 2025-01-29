<!-- src/components/stats/BadgesGrid.vue -->
<template>
  <div class="badges-section">
    <h3>Rozetler</h3>
    <div class="badges-container">
      <div 
        v-for="(value, badge) in stats.badges" 
        :key="badge"
        class="badge"
        :class="{ 'achieved': value }"
        :data-tooltip="getBadgeInfo(badge).description"
      >
        <span class="badge-icon">{{ getBadgeInfo(badge).icon }}</span>
        <span class="badge-title">{{ getBadgeInfo(badge).title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStatsStore } from '../../assets/statsStore'

const stats = useStatsStore()

const badgeInfo = {
  firstTesbihat: {
    icon: '🌟',
    title: 'İlk Adım',
    description: 'İlk tesbihatını tamamla'
  },
  streak3: {
    icon: '🔥',
    title: '3 Günlük Seri',
    description: '3 gün kesintisiz kullanım'
  },
  streak5: {
    icon: '🔥',
    title: '5 Günlük Seri',
    description: '5 gün kesintisiz kullanım'
  },
  streak7: {
    icon: '🔥',
    title: '7 Günlük Seri',
    description: '7 gün kesintisiz kullanım'
  },
  streak10: {
    icon: '🔥',
    title: '10 Günlük Seri',
    description: '10 gün kesintisiz kullanım'
  },
  streak15: {
    icon: '🏆',
    title: '15 Günlük Seri',
    description: '15 gün kesintisiz kullanım'
  },
  daily5: {
    icon: '⭐',
    title: 'Günlük 5',
    description: '1 günde 5 tesbihat'
  },
  zakir: {
    icon: '👑',
    title: 'Zâkir',
    description: 'Tüm rozetleri topla'
  }
}

const getBadgeInfo = (badge) => {
  return badgeInfo[badge] || {
    icon: '❓',
    title: 'Bilinmeyen Rozet',
    description: 'Rozet bilgisi bulunamadı'
  }
}
</script>

<style scoped>
.badges-section {
  margin: 2rem 0;
}

.badges-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;
}

.badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  position: relative;
  opacity: 0.5;
  transition: all 0.2s ease;
}

.badge.achieved {
  opacity: 1;
}

.badge[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--surface-variant);
  color: var(--text-primary);
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  white-space: nowrap;
  z-index: 1;
}

.badge-icon {
  font-size: 1.5rem;
}

.badge-title {
  font-size: 0.8rem;
  color: var(--text-primary);
}

@media (max-width: 480px) {
  .badges-container {
    justify-content: center;
  }
  
  .badge {
    flex: 0 0 calc(33.33% - 1rem);
  }
}
</style>
