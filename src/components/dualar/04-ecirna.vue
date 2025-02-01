<!-- src/components/dualar/04-ecirna.vue -->
<script setup>
import { ref } from 'vue'
import { dualar } from '../../assets/dualar.js'
import { useScriptStyle } from '../../assets/useScriptStyle.js'

const { ecirna } = dualar
const { scriptStyle } = useScriptStyle()
const isOpen = ref(false)
</script>


<template>
    <div class="flex-container column">
        <button class="buton" @click="isOpen = !isOpen">
            <span>Sabah / Akşam</span>
            <span class="material-symbols">{{ isOpen ? 'expand_less' : 'expand_more' }}</span>
        </button>

        <div v-if="isOpen" class="flex-container column">
            <q class="blockquote" :class="scriptStyle" :dir="scriptStyle === 'latin' ? 'ltr' : 'rtl'">
                <span class="ae-box">AE</span>⇒
                {{ scriptStyle === 'latin' ? 'Allahümme ecirna minen-nâr' : 'اللّٰهُمَّ أَجِرْنَا مِنَ النَّارِ' }}
            </q>

            <div>
                <span class="material-symbols icon mirror">back_hand</span>
                <span class="material-symbols icon">back_hand</span>
            </div>
            <q class="blockquote">Eller aşağı çevrilir!</q>

            <div class="flex-container column">
                <!-- <template v-for="(dua, index) in (scriptStyle === 'latin' ? ecirna.latin.part1 : ecirna.arabic.part1)" -->
                <template v-for="(dua, index) in ecirna[scriptStyle].part1"
                    :key="index">
                    <div class="dua-line" :class="scriptStyle">
                        <span class="ae-box">AE</span>
                        <!-- <span class="ae" :class="scriptStyle">☔</span> -->
                        <!-- <span class="ae" :class="scriptStyle">{{ scriptStyle === 'latin' ? 'A.e. ' : 'اَللّٰهُمَّ اَجِرْنَا ' }}</span> -->
                        <span :class="[scriptStyle, `text ${dua.color}`]" v-html="dua.text"/>
                        <small v-if="dua.info" class="info-text" dir="ltr">({{ dua.info }})</small>
                    </div>
                </template>
            </div>

            <hr class="divider">

            <div class="flex-container column" :class="scriptStyle">
                <template v-for="(dua, index) in ecirna[scriptStyle].part2"
                    :key="index">
                    <div :class="scriptStyle">
                        <span :class="`${dua.color}`" v-html="dua.text"></span>
                    </div>
                </template>
            </div>

            <hr class="divider">

            <div>
                <span class="material-symbols icon">back_hand</span>
                <span class="material-symbols icon mirror">back_hand</span>
            </div>
            <q class="blockquote">Eller yukarı açılır!</q>

            <div class="flex-container column" :class="scriptStyle">
                <template v-for="(dua, index) in ecirna[scriptStyle].part3"
                    :key="index">
                    <div :class="scriptStyle">
                        <span :class="`${dua.color}`" v-html="dua.text"></span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>


<style scoped>
.dua-line {
    width: 100%;
    align-items: baseline;
    display: inline-flex;
    gap: 0.2rem;
}

.text.arabic{text-align: right;}

.ae {
    color: var(--text-gray);
    font-family: var(--font-family);
    font-size: calc(var(--latin-size));
}

.ae.arabic {
    font-size: calc(var(--arabic-size) * 0.8);
    line-height: calc(var(--arabic-height) * 0.8);
}


.ae-box {
    display: inline-block; /* Kutuyu metin boyutunda yapmak için */
    background-color: var(--primary-light);
    color: var(--primary);
    padding: 0.2rem 0.4rem; /* Kutunun iç boşluğu */
    border-radius: 0.3rem;
    margin: 0 0 0 .2rem;
    font-family: var(--font-family);
    font-weight: bold;
    font-size: calc(var(--latin-size) * 0.9);
    line-height: calc(var(--latin-height) * 0.9);
}
</style>