<!-- Elfü elfin salatin ve elfü elfi selamin aleyke -->
<template>
  <div class="flex-container latin">
    <p class="text-paragraph">
      <span class="text-segment">Elfü elfi salâtin ve elfü elfi selâmin aleyke</span>
      <br>
      <span class="text-segment emphasis">yâ Resûlallah.</span>
      <br>
      <span class="text-segment">Elfü elfi salâtin ve elfü elfi selâmin aleyke</span>
      <br>
      <span class="text-segment emphasis">yâ Habîballâh.</span>
      <br>
      <span class="text-segment">Elfü elfi salâtin ve elfü elfi selâmin aleyke</span>
      <br>
      <span class="text-segment emphasis">yâ Emîne Vahyillâh.</span>
    </p>
  </div>
</template>

<style scoped>
.flex-container{
  margin: 0px;
  padding: 0px;
}

.text-paragraph {
  /* Metni ortala */
  text-align: center;
}

.text-segment {
  line-height: 1rem;
  /* Sağ tarafa boşluk */
  margin-right: 0.25rem;
}

.text-segment:last-child {
  /* Son elemanda boşluk bırakma */
  margin-right: 0;
}

.emphasis {
  color: var(--primary);
  /* font-weight: 500; */
}
</style>
