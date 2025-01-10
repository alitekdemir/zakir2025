<script setup>
import { ref } from 'vue'
import Modal from '../../Modal.vue'
import { sureler } from '../../../assets/sureler.js'
import { useScriptStyle } from '../../../assets/useScriptStyle'

const showModal = ref(false)
const { bismillah, kursi } = sureler
const { scriptStyle } = useScriptStyle()
</script>

<template>
    <div class="flex-container">
        <button class="dua-btn" @click="showModal = true">Ayet-el Kürsi</button>

        <Modal :show="showModal" title="Ayet-el Kürsi" @close="showModal = false">
            <div class="sure-container">
                <div class="flex-container">
                    <!-- Besmele -->
                    <span class="besmele" :class="scriptStyle">
                        {{ scriptStyle === 'latin' ? bismillah.latin : bismillah.arabic }}
                    </span>

                    <!-- Sure metni -->
                    <div class="ayet-container" :class="scriptStyle">
                        <span
                            v-for="(line, index) in (scriptStyle === 'latin' ? kursi.latin : kursi.arabic)"
                            :key="index"
                            class="text-segment"
                            :class="scriptStyle"
                        >
                            {{ line }}
                        </span>
                    </div>
                </div>
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

.dua-btn {
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

.sure-container {
    margin-top: 1rem;
}

/* Ayetlerin container'ı */
.ayet-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
}

/* Arapça metin için özel container ayarları */
.ayet-container.arabic {
    /* Sağdan sola akış için */
    direction: rtl;
}

/* text-segment sınıfı için ek özellikler */
.text-segment {
    /* Satır sonlarında düzgün kesme için */
    padding: 0.2rem 0.2rem;
}
</style>