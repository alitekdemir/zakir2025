<!-- src/components/tesbihat/dualar/06-kursi.vue -->
<script setup>
import { ref } from 'vue'
import Modal from '../../Modal.vue'
import { sureler } from '../sureler.js'
import { useScriptStyle } from '../../../assets/useScriptStyle.js'

const showModal = ref(false)
const { bismillah, kursi, sadakallah } = sureler
const { scriptStyle } = useScriptStyle()
</script>

<template>
    <div class="flex-container column">
        <button class="buton" @click="showModal = true">Ayet-el Kürsi</button>

        <Modal :show="showModal" title="Ayet-el Kürsi" @close="showModal = false">
            <div class="flex-container column">
                <!-- Besmele -->
                <span class="besmele" :class="scriptStyle">
                    {{ scriptStyle === 'latin' ? bismillah.latin : bismillah.arabic }}
                </span>

                <!-- Sure metni -->
                <div class="flex-container wrap" :class="scriptStyle">
                    <span v-for="(line, index) in (scriptStyle === 'latin' ? kursi.latin : kursi.arabic)" :key="index"
                        :class="scriptStyle">
                        {{ line }}
                    </span>
                </div>

                <!-- Sadakallahül Azim -->
                <span class="besmele" :class="scriptStyle">{{ sureler.sadakallah[scriptStyle] }}</span>
            </div>
        </Modal>
    </div>
</template>
