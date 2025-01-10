<!-- src/components/dualar/tr/dua-tr-tuncina2.vue -->
<script setup>
    import { ref } from 'vue'
    import Modal from '../../Modal.vue'
    import { dualar } from '../../../assets/dualar.js'
    import { useScriptStyle } from '../../../assets/useScriptStyle.js'

    const showModal = ref(false)
    const { tuncina } = dualar
    const { scriptStyle } = useScriptStyle()
</script>


<template>
    <div class="flex-container">
        <button class="buton" @click="showModal = true">Salaten Tüncina</button>

        <Modal :show="showModal" title="Salaten Tuncina" @close="showModal = false">
            <div class="ayet-container" :class="scriptStyle">
                <span 
                    v-for="(line, index) in (scriptStyle === 'latin' ? tuncina.latin : tuncina.arabic)" 
                    :key="index"
                    class="text-segment"
                    :class="scriptStyle">
                    
                    {{ line }}
                </span>
            </div>
        </Modal>
    </div>
</template>


<style scoped>

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


    /* Ayetlerin container'ı */
    .ayet-container {
        display: flex;
        /* flex-direction: column; */
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