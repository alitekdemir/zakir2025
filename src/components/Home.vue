<!-- src/components/Home.vue -->
<script setup>
import Header from './Header.vue'
import ProgressBar from './ProgressBar.vue';
import { createProgress } from '../assets/useProgress';
createProgress() // Progress provider'ı oluştur
import DuaNavigator from './DuaNavigator.vue';
import { duaList } from '../assets/duaList'; // Tesbihat yerine doğrudan data'dan import
import Tesbihat from './Tesbihat.vue'
import ZakirGullu from './ZakirGullu.vue'
import InstallPWAPrompt from './InstallPWAPrompt.vue'
</script>

<template>
  <Header />
  <ProgressBar />
  <DuaNavigator :duaList="duaList" />
  <Tesbihat />
  <ZakirGullu />
  <InstallPWAPrompt />
</template>


