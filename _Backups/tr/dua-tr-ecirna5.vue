<!-- src/components/dualar/tr/dua-tr-ecirna5.vue -->
<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
const dua1 = [
    { text: "minen-nâr.", color: 'red', info: '3-5-7 defa' },
    { text: "min kulli nâr.", color: 'red' },
    { text: "min fitnetid-dîniyye ved-dünyeviyye.", color: 'green' },
    { text: "min fitneti âhiri'z zamân.", color: 'green' },
    { text: "min fitnetil Mesîhid-Deccâlî ves-Süfyân.", color: 'green' },
    { text: "mined-dalâlâti vel bid‘iyyâti vel baliyyât.", color: 'green' },
    { text: "min şerri'n nefsil emmâre.", color: 'magenta' },
    { text: "min şurûrin nufûsil emmârâtil fir‘avniyye.", color: 'magenta' },
    { text: "min şerri'n nisâ'.", color: 'orange' },
    { text: "min belâi'n nisâ'.", color: 'orange' },
    { text: "min fitneti'n-nisâ'.", color: 'orange' },
    { text: "min azâbil Kabr.", color: 'red' },
    { text: "min azâbi yevmil Kıyâme.", color: 'red' },
    { text: "min azâbi cehennem.", color: 'red' },
    { text: "min azâbi Kahrik.", color: 'red' },
    { text: "min nâri Kahrik.", color: 'red' },
    { text: "min azâbil Kabri ven-nîrân.", color: 'red' },
    { text: "miner-riyâi vassum'ati vel 'ucubi vel fahr.", color: 'magenta' },
    { text: "min tecâvüzil mulhidîn.", color: 'orange' },
    { text: "min şerril munâfikîn.", color: 'orange' },
    { text: "min fitnetil fâsikîn.", color: 'orange' }
]
const dua2 = [
    { text: "Allahümme ecirnâ ve ecir vâlideynâ", color: '' },
    { text: "ve talabete Resâili'n-Nûri's-Sâdıkîne", color: 'red' },
    { text: "fî hidmeti'l-Kur'âni vel-îmân,", color: 'green' },
    { text: "ve ahbâbenâ'l-mü'minîne'l-muḫliṣîne", color: 'orange' },
    { text: "ve akribâenâ ve ecdâdenâ minen-nâr.", color: '' }
]

const dua3 = [
    { text: "Bi‘afvike yâ Mucîr bi fâḍlike yâ Ġaffâr", color: 'green' },
    { text: "Allahümme edḫılnel cennete ma‘al-ebrâr", color: 'green' },
    { text: "Allahümme edḫılnel cennete ma‘al-ebrâr", color: 'green' },
    { text: "Allahümme edḫılne", color: 'green' },
    { text: "ve edhıl üstadena", color: 'red' },
    { text: "Saîd en-Nursî radıyallâhu anh", color: 'red' },
    { text: "ve vâlideynâ", color: "" },
    { text: "ve talebete Resâilin Nûris-Sâdıkîne", color: 'red' },
    { text: "ve ihvânenâ ve ehavâtinâ", color: 'orange' },
    { text: "ve akribâenâ ve ecdâdenâ", color: 'orange' },
    { text: "ve ahbâbenel mü’minînel muhlisîne", color: 'orange' },
    { text: "fî hidmetil îmâni vel Kur’ân", color: 'green' },
    { text: "el-cennete meal ebrâr", color: 'green' },
    { text: "bi-şefâati nebiyyikel muhtâr", color: 'green' },
    { text: "ve âlihîl ethâr ve ashâbihîl ahyâr", color: 'green' },
    { text: "ve sellim mâdâmel leyl ven nehâr", color: 'green' },
    { text: "Âmîn.", color: '' },
    { text: "Vel-hamdü lillâhi Rabbil-âlemîn.", color: '' }
]

</script>

<template>
    <div class="dua-wrapper">
        <!-- Başlık/Buton -->
        <button class="toggle-button" @click="isOpen = !isOpen">
            <span>Allahümme Ecirna Duası</span>
            <span class="material-icons">{{ isOpen ? 'expand_less' : 'expand_more' }}</span>
        </button>
        <div v-if="isOpen" class="dua-wrapper">
            <!-- İlk bölüm - 2 sütunlu yapı -->
            <q class="blockquote" dir="ltr">Allahümme ecirna <b>minen-nâr</b></q>
            <br>
            <br>
            <div>
                <span class="material-icons icon mirror">back_hand</span>
                <span class="material-icons icon">back_hand</span>
            </div>
            <q class="blockquote" dir="ltr">Eller aşağı çevrilir!</q>


            <!-- <div class="main-prayers"> -->
            <div class="section1">
                <template v-for="(dua, index) in dua1" :key="index">
                    <p class="dua-line">
                        <span class="ae">A.e.</span>
                        <span :class="`text ${dua.color}`">{{ dua.text }}</span>
                        <span v-if="dua.info" class="info-text">({{ dua.info }})</span>
                    </p>
                </template>
            </div>

            <!-- Ayırıcı çizgi -->
            <hr class="divider">

            <!-- Tek sütunlu bölüm -->
            <div class="column">
                <template v-for="(dua, index) in dua2" :key="index">
                    <p class="text-center">
                        <span :class="dua.color">{{ dua.text }}</span>
                    </p>
                </template>
            </div>

            <!-- Ayırıcı çizgi -->
            <hr class="divider">

            <!-- Son bölüm -->
            <div class="column">
                <div>
                    <span class="material-icons icon">back_hand</span>
                    <span class="material-icons icon mirror">back_hand</span>
                </div>
                <q class="blockquote" dir="ltr">Eller yukarı açılır!</q>

                <template v-for="(dua, index) in dua3" :key="index">
                    <p class="text-center">
                        <span :class="dua.color">{{ dua.text }}</span>
                    </p>
                </template>
            </div>
        </div>

    </div>
</template>

<style>
.toggle-button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: transparent;
    border: 1px solid var(--primary);
    color: var(--primary);
    cursor: pointer;
    transition: all 0.2s ease;
}

.toggle-button:hover {
    background: var(--primary);
    color: white;
}

.text-center {
    text-align: center;
    margin: 0.2rem 0;
}

.dua-line {
    margin: 0.2rem 0;
    display: flex;
    align-items: baseline;
    text-align: left;
    gap: 4px;
}

.ae {
    color: #666;
    white-space: nowrap;
    font-size: 0.8rem;
}


.column {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    /* gap: 0.5rem; */
}




</style>
