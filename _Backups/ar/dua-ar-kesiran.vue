<template>
  <div class="flex-container arabic" >
      <div v-for="index in 3" :key="index" :class="{ dim: index !== 3 }">
        <span class="text-segment">اَللّٰهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ</span>
        <span class="text-segment">وَعَلٰى آلِ سَيِّدِنَا مُحَمَّدٍ</span>
        <span class="text-segment">بِعَدَدِ كُلِّ دَاءٍ وَ دَوَاءٍ وَ بَارِكْ</span>
        <span class="text-segment">وَسَلِّمْ عَلَيْهِ وَ عَلَيْهِمْ</span>
        <span v-if="index !== 3" style="color:red">كَثِيرًا</span>
        <span v-if="index === 3" style="color:red">كَثِيرًا كَثِيرًا</span>
      </div>
    </div>
  </template>
  
<style scoped>
  .dim {color: darkgrey;}
  .red {color: crimson;}
</style>
  