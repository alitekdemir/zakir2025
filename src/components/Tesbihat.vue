<!-- src/components/Tesbihat.vue -->
<script setup>
import DuaWidget from './DuaWidget.vue';
import { duaList } from '../assets/duaList.js';
</script>

<template>
  <div class="tesbihat-container">
    <DuaWidget
      v-for="dua in duaList"
      :key="dua.number"
      :number="dua.number"
      :title="dua.title"
      :id="`dua-${dua.number}`"
    >
      <component :is="dua.component" />
      <template v-if="dua.info" #info-content>
        <component :is="dua.info" />
      </template>
    </DuaWidget>
  </div>
</template>


<style scoped>
.tesbihat-container {
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  padding: 0 0.25rem;
  /* margin: 1.5rem auto; */
  max-width: 600px;
  gap: 1rem;
}
</style>
