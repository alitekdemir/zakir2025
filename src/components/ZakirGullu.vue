<!-- src/components/ZakirGullu.vue -->
<template>
  <div class="content">
    <img 
      src="../assets/rose.svg" 
      class="rose" 
      alt="Gül süslemesi"
      loading="lazy"
    />
    <!-- src="../assets/zakir.png"  -->
    <img 
      src="../assets/zakir.png" 
      class="zakir" 
      alt="Zakir ikonu"
      loading="lazy"
    />
    <img 
      src="../assets/rose.svg" 
      class="rose" 
      alt="Gül süslemesi"
      loading="lazy"
    />
  </div>
  <p class="acceptance-text">Allah kabul etsin kardeşim</p>
</template>

<style scoped>


.content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
}

.rose {
  height: 2rem;
  transition: filter 300ms;
}

.zakir {
  height: 7rem;
  transition: filter 300ms;
}

.zakir:hover {
  filter: drop-shadow(0 0 2em hwb(0 42% 0%));
}

.acceptance-text {
  text-align: center;
  margin: 1rem auto;
}

</style>
