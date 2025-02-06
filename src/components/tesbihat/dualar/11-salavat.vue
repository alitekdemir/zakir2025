<script setup>
import { ref } from 'vue'
import { dualar } from '../dualar.js'
import { useScriptStyle } from '../../../assets/useScriptStyle.js'
import rose from '../../../assets/icon_rose.vue'

const { salavatlar } = dualar
const { scriptStyle } = useScriptStyle()
const showSabah = ref(false)

const toggleSabah = () => {
  showSabah.value = !showSabah.value
}
</script>

<template>
  <div class="flex-container column" :class="scriptStyle">
    <p>
      <span class="text-segment">{{ salavatlar[scriptStyle].ana[0] }}</span>
      <rose class="rose" alt="Gül"/>
      <span class="text-segment">{{ salavatlar[scriptStyle].ana[1] }}</span>
    </p>

    <button class="sabah-btn" @click="toggleSabah">
      <span>{{ salavatlar[scriptStyle].sabah.title }}</span>
      <i class="material-symbols icon">{{ showSabah ? 'expand_less' : 'expand_more' }}</i>
    </button>

    <Transition name="fade">
      <div v-if="showSabah" class="sabah">
        <span class="latin info-text">{{ salavatlar[scriptStyle].sabah.info }}</span>
          <span v-for="(line, index) in salavatlar[scriptStyle].sabah.lines" 
                :key="index" 
                class="text-segment">
            {{ line }}
          </span>
      </div>
    </Transition>

    <p>
      <span v-for="(line, index) in salavatlar[scriptStyle].son" 
            :key="index" 
            class="text-segment">
        {{ line }}
      </span>
    </p>
  </div>
</template>


<style scoped>

.text-segment {
  margin-right: 0.25rem;
}

.icon {
  font-size: 1.25rem;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rose {
  height: 1.5rem;
  width: 1.5rem;
}
.sabah-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  border: 1px solid var(--primary);
  color: var(--primary);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}


.sabah-btn:hover {
  background: var(--primary-light);
}

.sabah {
  display: flex;
  flex-direction: column;
  /* background-color: var(--primary-light); */
  border-bottom: 1px solid var(--primary-light);
  /* gap: 0.5rem; */
  /* padding-left: 1rem; */
  /* border-left: 2px solid var(--primary-light); */
}

.sabah1 i {
  color: var(--text-gray);
  font-size: 0.875rem;
  line-height: 0.8rem;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
