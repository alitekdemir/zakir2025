<!-- src/components/ZakirGullu.vue -->
<template>
  <div class="flex-container wrap">
    <img src="../assets/rose.svg" class="rose" alt="Gül süslemesi" loading="lazy" />
    <img src="../assets/zakir.png" class="zakir" alt="Zakir ikonu" loading="lazy" />
    <img src="../assets/rose.svg" class="rose" alt="Gül süslemesi" loading="lazy" />
  </div>
  <p class="info-text">Allah kabul etsin kardeşim</p>

  <div class="flex-container column feedback">
    Uygulamayı geliştirmek için yardımınıza ihtiyacımız var. <br>
    Görüş, öneri veya tespit ettiğiniz hataları bize iletirseniz çok memnun oluruz.
    <button class="buton" onclick="window.location.href='https://tally.so/r/mJXPP4'">
      <i class="material-symbols">edit_note</i>
      Geri Bildirim Gönder
    </button>
  </div>
</template>

<style scoped>
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
  margin: 1rem auto;
}

.buton {
  font-size: 1.1rem;
  /* font-weight: normal; */
  align-items: center;
}
</style>
