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
  background: var(--primary);
  color: white;
  padding: 2rem 0.5rem; /* Düzeltildi */
  text-align: center;
  transition: background-color 0.6s ease-in-out, color 0.6s ease-in-out;
}

.subtitle {
  font-size: clamp(1rem, 3vw, 1.5rem); /* Dinamik font boyutu */
  line-height: 1.2;
  margin: 0.2rem auto;
}

.title {
  font-size: clamp(2rem, 8vw, 4rem); /* Dinamik font boyutu */
  line-height: 1.2;
  color: white;
  margin: 0.5rem auto;
}

@media (max-width: 230px) {
  .header { display: none; }
}
</style>
