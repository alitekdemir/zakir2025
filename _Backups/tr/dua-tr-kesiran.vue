<template>
  <div class="flex-container latin" >
    <div v-for="index in 3" :key="index" :class="{ dim: index !== 3 }">
      <span class="text-segment">Allâhümme salli alâ seyyidinâ Muhammedin</span>
      <span class="text-segment">ve alâ âli seyyidinâ Muhammedin</span>
      <span class="text-segment">bi'adedi kulli dâin ve devâin ve bârik</span>
      <span class="text-segment">ve sellim aleyhi ve aleyhim </span>
      <span v-if="index !== 3" class="text-segment red">kesîrâ</span>
      <span v-if="index === 3" class="text-segment red">kesîran kesîrâ</span>
    </div>
  </div>
</template>

<style scoped>
.dim {color: darkgrey;}
.red {color: crimson;}
</style>
