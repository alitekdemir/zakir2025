<!-- src/components/ZakirGullu.vue -->
<template>
  <div class="gullu">
    <div class="flex-container wrap">
      <img src="../assets/rose.svg" class="rose" alt="Gül süslemesi" loading="lazy" />
      <img src="../assets/zakir.png" class="zakir" alt="Zakir ikonu" loading="lazy" />
      <img src="../assets/rose.svg" class="rose" alt="Gül süslemesi" loading="lazy" />
    </div>
    <p class="info-text">Allah kabul etsin kardeşim</p>

    <div class="flex-container column feedback">
      Uygulamayı geliştirmek için yardımınıza ihtiyacımız var. <br>
      Görüş, öneri veya tespit ettiğiniz hataları bize iletirseniz çok memnun oluruz.
    </div>
    <button class="buton" onclick="window.location.href='https://tally.so/r/mJXPP4'">
      <i class="material-symbols">edit_note</i>
      Geri Bildirim Gönder
    </button>
  </div>
</template>

<style scoped>
.gullu{
  display:flex;
  flex-direction: column;
  gap:1rem;
  align-items: center;
  background: var(--background);
  padding: 2rem;
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

.feedback {
  color: var(--text-primary);
}

.buton {
  font-size: 1.1rem;
  /* font-weight: normal; */
  align-items: center;
}
</style>
