<!-- src/components/Header.vue -->
<template>
  <header class="flex-container column header">
    <span class="subtitle">Risale-i Nur talebeleri için, kolay ezberlenen</span>
    <span class="title">ÖZLÜ TESBİHAT</span>
  </header>
</template>

<style scoped>
.flex-container{
  gap: 0.2rem;
}
.header {
  width: 100%;
  min-height: 10vh;
  background: var(--primary);
  color: white;
  padding: 2rem 0.5rem;
  transition: background-color 0.6s ease-in-out, color 0.6s ease-in-out;
}

.subtitle {
  font-size: clamp(1rem, 3vw, 1.5rem); /* Dinamik font boyutu */
}

.title {
  font-size: clamp(2rem, 8vw, 4rem); /* Dinamik font boyutu */
  color: white;
  margin: 0;
}

@media (max-width: 230px) {
  .header { display: none; }
}
</style>
