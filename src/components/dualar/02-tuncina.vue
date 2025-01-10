<!-- src/components/dualar/02-tuncina.vue -->
<script setup>
import { ref } from 'vue'
import Modal from '../Modal.vue'
import { dualar } from '../../assets/dualar.js'
import { useScriptStyle } from '../../assets/useScriptStyle.js'

const showModal = ref(false)
const { tuncina } = dualar
const { scriptStyle } = useScriptStyle()
</script>


<template>
    <div class="flex-container">
        <button class="buton" @click="showModal = true">Salaten Tüncina</button>

        <Modal 
          :show="showModal" 
          title="Salaten Tuncina" 
          @close="showModal = false">
        <div class="flex-container wrap" 
            :class="scriptStyle">
            <span 
                v-for="(line, index) in tuncina[scriptStyle]" 
                :key="index"
                :class="scriptStyle">

                {{ line.text }}
            </span>
        </div>
        </Modal>
    </div>
</template>

