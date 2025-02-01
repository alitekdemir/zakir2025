<!-- src/components/badges/BadgesGrid.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useStatsBadgesStore } from './statsBadgesStore.js';
import { badgeConfigs } from './badgeConfigs.js';

const badgesStore = useStatsBadgesStore()

import Badge from './Badge.vue';
import BadgeModal from './BadgeModal.vue';
import BadgeSplash from './BadgeSplash.vue';

const selectedBadge = ref(null)
const showModal = ref(false)

const handleBadgeClick = (badge) => {
  selectedBadge.value = badge
  showModal.value = true
}

onMounted(() => {
  badgesStore.initializeBadges()
  badgesStore.checkBadges()
})

const testSplash = () => {
  // Test için örnek bir rozet seçiyoruz
  const testBadge = {
    id: 'firstTesbihat',
    title: 'İlk Adım',
    description: 'İlk tesbihatını tamamla',
    isAchieved: true,
    achievedDate: new Date().toISOString(),
    progress: 100
  }
  
  // Store'daki latestBadge'i güncelliyoruz
  badgesStore.$patch({
    latestBadge: testBadge
  })
}

</script>

<template>
  <section class="badges-section">
    <header class="badges-header">
      <h1>Rozetler</h1>
      <div class="header-right">
        <!-- <button @click="testSplash" class="test-button">Test Splash</button> -->
        <span class="badges-count">
          {{ badgesStore.earnedBadgesCount }}/{{ badgesStore.totalBadgesCount }}
        </span>
      </div>
    </header>

    <div class="badges-grid">
      <Badge
        v-for="badge in badgesStore.badges"
        :key="badge.id"
        v-bind="badge"
        @click="handleBadgeClick(badge)"
      >
        <component 
          :is="badgeConfigs[badge.id]?.icon" 
          v-if="badgeConfigs[badge.id]?.icon"
          :width="32"
          :height="32"
          :fill="badge.isAchieved ? '#5EB132' : 'rgba(255, 255, 255, 0.5)'"
        />
      </Badge>
    </div>

    <BadgeModal
      v-if="showModal"
      :badge="selectedBadge"
      :show="showModal"
      @close="showModal = false"
    />

    <BadgeSplash
      v-if="badgesStore.latestBadge"
      :badge="badgesStore.latestBadge"
      :show="true"
      @close="badgesStore.clearLatestBadge()"
    />
  </section>
</template>

<style scoped>
/* .badges-section {padding: 1rem;} */

.badges-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.badges-count {
  background: var(--primary-light);
  padding: 0.25rem 1.0rem;
  border-radius: 1rem;
}

.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.25rem;
  padding: 0.5rem 0;
}

@media (max-width: 600px) {
  .badges-grid {
    grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
  }
}


.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.test-button {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: opacity 0.2s ease;
}

.test-button:hover {
  opacity: 0.9;
}

</style>
