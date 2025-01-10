<script setup>
import { ref } from 'vue'
import Modal from '../../Modal.vue'

const showModal = ref(false)
</script>

<template>
  <!-- Ana görünüm butonu -->
  <div class="flex-container"> <!-- class ismi ekledik -->
    <button class="dua-btn" @click="showModal = true">
      Salaten Tuncina
    </button>

    <Modal :show="showModal" title="Salaten Tuncina" @close="showModal = false">
      <div class="flex-container latin">
        <p class="text-paragraph">
          <span class="bir">Allahümme salli alâ seyyidinâ Muhammedin</span>
          <!-- <br> -->
          <span class="iki">ve alâ âli seyyidinâ Muhammed.</span>
          <!-- <br> -->
          <span class="bir">Salâten tuncînâ bihâ</span>
          <span class="bir">min cemî‘il-ehvâli ve’l-âfât.</span>
          <!-- <br> -->
          <span class="iki">Ve takdî lenâ bihâ cemî‘a’l-hâcât.</span>
          <!-- <br> -->
          <span class="bir">Ve tutahhirunâ bihâ min cemî‘i’s-seyyiât.</span>
          <!-- <br> -->
          <span class="iki">Ve terfe‘unâ bihâ ‘indeke a‘lâ’d-derecât.</span>
          <!-- <br> -->
          <span class="bir">Ve tubelliğunâ bihâ aksâ’l-gâyât,</span>
          <span class="iki">min cemî‘il-hayrâti</span>
          <span class="iki">fil-hayâti ve ba‘del-memât.</span>
          <!-- <br> -->
          <span class="bir">Âmîn yâ mucîbed deavât.</span>
          <!-- <br> -->
          <span class="iki">Ve’l-hamdü lillâhi rabbi’l-âlemîn.</span>
        </p>
      </div>
    </Modal>
  </div>
</template>


<style scoped>
.flex-container {
  display: flex;
  justify-content: center;
  width: 100%;
}


.text-paragraph {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

/* Yukarıdakine alternatif olarak aşağıdaki şekilde paragraf yapısı kullanılabilir */
/* .text-paragraph {line-height: 1.6rem;} */
/* .text-paragraph span {margin-right: 0.2rem;} */
/* Son span'da sağ margin olmasın */
/* .text-paragraph span:last-child {margin-right: 0;} */

.dua-btn {
  /* background-color: var(--primary-light); */
  color: var(--primary);
  background-color: white;
  border: 1px solid var(--primary);
  border-radius: 8px;
  padding: 6px 16px;
  margin-bottom: 12px;
  font-size: 1.09rem;
}

.dua-btn:hover {
  filter: drop-shadow(0 4px 1em hwb(0 42% 0% / 0.5));
}
</style>
