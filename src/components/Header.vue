<!-- src/components/Header.vue -->
<template>
  <header class="flex-container column header">
    <span class="subtitle subtitle-large">Risale-i Nur talebeleri için, kolay ezberlenen</span>
    <span class="subtitle subtitle-small">Risale-i Nur talebeleri için,</span>
    <span class="subtitle subtitle-small">kolay ezberlenen</span>
    <span class="title">ÖZLÜ TESBİHAT</span>
  </header>
</template>

<style scoped>

.header {
  color: white;
  background: var(--primary);
  padding: 2rem 0.5rem;
}

.title {
  font-size: clamp(2rem, 8vw, 4rem);
  margin: 0;
}

.subtitle {
  font-size: clamp(1rem, 3vw, 1.5rem);
}

.subtitle-small {
  display: none;
}

@media (max-width: 22rem) {
  .subtitle-large { display: none; }
  .subtitle-small { display: block; }
}

@media (max-width: 14rem) {
  .header { display: none; }
}
</style>
