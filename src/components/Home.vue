<!-- src/components/Home.vue -->
<script setup>
import Header from './Header.vue'
import ProgressBar from './stats/ProgressBar.vue';
import DuaNavigator from './DuaNavigator.vue';
import { duaList } from '../assets/duaList'; // Tesbihat yerine doğrudan data'dan import
import Tesbihat from './Tesbihat.vue'
import ZakirGullu from './ZakirGullu.vue'
import InstallPWAPrompt from './InstallPWAPrompt.vue'

</script>

<template>
  <div class="home-container">
    <Header />
    <ProgressBar class="pad"/>
    <DuaNavigator :duaList="duaList" />
    <Tesbihat />
    <ZakirGullu />
    <InstallPWAPrompt />
  </div>
</template>


<style scoped>
.home-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pad { 
  padding: 1rem 1rem;
  width: 100%; 
}
</style>