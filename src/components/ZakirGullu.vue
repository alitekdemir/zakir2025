<!-- src/components/ZakirGullu.vue -->
<template>
  <div class="gullu">
    <div class="flex-container wrap">
      <img src="../assets/rose.svg" class="rose" alt="Gül süslemesi" loading="lazy" />
      <img src="../assets/zakir.png" class="zakir" alt="Zakir ikonu" loading="lazy" />
      <img src="../assets/rose.svg" class="rose" alt="Gül süslemesi" loading="lazy" />
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
  height: 2rem;
}

.zakir {
  height: 7rem;
  transition: filter 300ms;
}

.zakir:hover {
  filter: drop-shadow(0 0 2em hwb(0 42% 0%));
}
</style>
