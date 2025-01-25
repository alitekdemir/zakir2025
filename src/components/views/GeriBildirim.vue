<!-- src/components/views/GeriBildirim.vue -->
<template>
  <div class="flex-container column">
    <h2>Bize Ulaşın</h2>
    <span>
      Uygulamayı geliştirmek için yardımınıza ihtiyacımız var.<br>
      Görüş, öneri veya tespit ettiğiniz hataları bize iletirseniz çok memnun oluruz.
      Aşağıdaki form linkini kullanarak bize ulaşabilirsiniz.
    </span>
    <button class="buton" onclick="window.location.href='https://tally.so/r/mJXPP4'">
      <i class="material-symbols">edit_note</i>
      Geri Bildirim Gönder
    </button>
  </div>
</template>

<style scoped>
.column {
  gap: 2rem;
}

h2 {
  font-size: 2rem;
  font-weight: 300;
  margin: 0;
  /* padding: 0; */
  padding-top: 3rem;
}
</style>