<script setup>
import { ref } from 'vue'

const showSabah = ref(false)

const toggleSabah = () => {
  showSabah.value = !showSabah.value
}
</script>

<template>
  <div class="flex-container latin">
    <p>
      <span class="text-segment">Muhammedun Rasûlullâhi,</span>
      <img src="../../../assets/rose.svg" class="rose"/>
      <span class="text-segment">sallallâhu teâlâ aleyhi ve sellem.</span>
    </p>

    <button class="sabah-btn" @click="toggleSabah">
    Sabah
    <i class="material-icons icon">{{ showSabah ? 'expand_less' : 'expand_more' }}</i>
  </button>

    <Transition name="fade">
      <div v-if="showSabah" class="sabah">
        <i>sabahları 10 defa okunur</i>
        <p>
          <span class="text-segment">Lâ ilâhe illallâhü’l melikü’l ḥakku’l mubîn.</span>
          <span class="text-segment">Muḥammedun Rasûlullâhi sâdikul va'dil emîn.</span>
        </p>
      </div>
    </Transition>

    <p>
        <span class="text-segment">İnnallâhe ve melâiketehû</span>
        <span class="text-segment">yusallûne ale’n-nebiyy.</span>
      <span class="text-segment">Yâ eyyühe’l-lezîne âmenû</span>
      <span class="text-segment">sallû aleyhi ve sellimû teslîmâ.</span>
      <!-- <br> -->
      <span class="text-segment">Lebbeyk</span>
    </p>
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

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
  line-height: 1rem;
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

.sabah i {
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
