<!-- src/components/ZakirGullu.vue -->
<script setup>
import Rose from '../assets/icon_rose.vue'
import Zakir from '../assets/icon_zakir-crop.vue'
</script>

<template>
  <div class="gullu">
    <div class="flex-container wrap">
      <Rose class="rose" alt="Gül" loading="lazy"/>
      <Zakir class="zakir" alt="Gül" loading="lazy"/>
      <Rose class="rose" alt="Gül" loading="lazy"/>
    </div>
    <span class="info-text">Allah kabul etsin kardeşim.</span>
  </div>
</template>

<style scoped>
.gullu{
  display:flex;
  flex-direction: column;
  gap:1rem;
  align-items: center;
  background: var(--background);
  padding: 1rem;
}

.rose {
  width: 2.5rem;
  height: auto;
}

.zakir {
  width: 5rem;
  height: auto;
  transition: filter 300ms;
}

.zakir:hover {
  filter: drop-shadow(0 0 2em hwb(0 42% 0%));
}
</style>
