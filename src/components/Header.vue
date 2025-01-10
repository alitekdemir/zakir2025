<!-- src/components/Header.vue -->
<template>
  <header class="header">
    <span class="subtitle">Risale-i Nur talebeleri için kolay ezberlenen</span>
    <h1 class="title">ÖZLÜ TESBİHAT</h1>
  </header>
</template>

<style scoped>
.header {
  width: 100%; /* Genişlik %100 */
  min-height: 10vh;
  background-color: var(--primary);
  color: var(--text-primary, #fff); /* Varsayılan birincil metin rengi */
  padding: 2rem 1rem; /* Düzeltildi */
  text-align: center;
  transition: background-color 0.6s ease-in-out, color 0.6s ease-in-out; /* Yalnızca gerekli geçiş */
}

.title {
  font-size: clamp(2rem, 8vw, 4rem); /* Dinamik font boyutu */
  line-height: 1.2;
  font-weight: 400; /* Standart font ağırlığı */
  margin: 0.2rem auto;
}
.subtitle {
  font-size: clamp(1rem, 3vw, 1.5rem); /* Dinamik font boyutu */
  line-height: 1.2;
  font-weight: 400; /* Standart font ağırlığı */
  margin: 0.2rem auto;
}

@media (max-width: 230px) {
  .header {
    display: none;
  }
}
</style>
