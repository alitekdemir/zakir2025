<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const duaMetinleri = [
    { text: "minen-nâr.", color: 'red', repeat: '3-5-7 defa' },
    { text: "min kulli nâr.", color: 'red' },
    { text: "min fitnetid-dîniyye ved-dünyeviyye.", color: 'green' },
    { text: "min fitneti âhiri'z zamân.", color: 'green' },
    { text: "min fitnetil Mesîhid-Deccâlî ves-Süfyân.", color: 'green' },
    { text: "mined-dalâlâti vel-bid'iyyâti vel-baliyyât.", color: 'green' },
    { text: "min şerri'n nefsi'l-emmâre.", color: 'magenta' },
    { text: "min şurûrin nufûsi'l-emmârâtil-fir'avniyye.", color: 'magenta' },
    { text: "min şerri'n nisâ'.", color: 'orange' },
    { text: "min belâi'n nisâ'.", color: 'orange' },
    { text: "min fitneti'n-nisâ'.", color: 'orange' },
    { text: "min 'azâbi'l Kabr.", color: 'red' },
    { text: "min 'azâbi yevmi'l Kıyâme.", color: 'red' },
    { text: "min 'azâbi cehennem.", color: 'red' },
    { text: "min 'azâbi Kahrik.", color: 'red' },
    { text: "min nâri Kahrik.", color: 'red' },
    { text: "min 'azâbil Kabri ven-nîrân.", color: 'red' },
    { text: "minar-riyâ'i vassum'ati vel-'ucubi vel-fahr.", color: 'magenta' },
    { text: "vel-'ucubi vel-fahr.", color: 'magenta' },
    { text: "min tecâvüzi'l mulhidîn.", color: 'orange' },
    { text: "min şerri'l munâfiKîn.", color: 'orange' },
    { text: "min fitneti'l fâsiKîn.", color: 'orange' }
]

const sonDualar = [
    { text: "Allahümme ecirnâ ve ecir vâlideynâ", color: '' },
    { text: "ve talabete Resâili'n-Nûri's-Sâdıkîne", color: 'red' },
    { text: "fî hidmeti'l-Kur'âni vel-îmân,", color: 'green' },
    { text: "ve ahbâbenâ'l-mü'minîne'l-muḫliṣîne", color: 'orange' },
    { text: "ve akribâenâ ve ecdâdenâ minen-nâr.", color: '' }
]

const kapanisDualari = [
    { text: "Bi'afvike yâ Mucîr bi fâḍlike yâ Ġaffâr", color: 'green' },
    { text: "Allahümme edḫılne'l cennete ma'al-ebrâr", color: 'green' },
    { text: "Allahümme edḫılne'l cennete ma'al-ebrâr", color: 'green' },
    { text: "Allahümme edḫılne", color: 'green' },
    { text: "ve edhıl üstadena", color: 'red' },
    { text: "Saîd en-Nursî radıyallâhu anh", color: 'red' },
    { text: "ve vâlideynâ" },
    { text: "ve talebete Resâili'n Nûri's Sâdıkîne", color: 'red' },
    { text: "ve ihvânenâ ve ehavâtinâ", color: 'orange' },
    { text: "ve akribâenâ ve ecdâdenâ", color: 'orange' },
    { text: "ve ahbâbenel mü'minînel muhlisîne", color: 'orange' },
    { text: "fî hidmeti'l îmâni vel Kur'ân", color: 'green' },
    { text: "el-cennete mea'l ebrâr", color: 'green' },
    { text: "bi-şefâati nebiyyike'l-muhtâr", color: 'green' },
    { text: "ve âlihîl-ethâr ve ashâbihîl ahyâr", color: 'green' },
    { text: "ve sellim mâdâmel leyl ven nehâr", color: 'green' },
    { text: "Âmîn.", color: '' },
    { text: "Ve'l-hamdü lillâhi Rabbi'l-âlemîn.", color: '' }
]
</script>

<template>
    <div class="dua-wrapper">
        <button class="toggle-button" @click="isOpen = !isOpen">
            <span>Allahümme Ecirna Duası</span>
            <span class="material-symbols">{{ isOpen ? 'expand_less' : 'expand_more' }}</span>
        </button>

        <div v-if="isOpen" class="dua-content">
            <div class="info-section">
                <q class="blockquote" dir="ltr">A.e. = Allahümme Ecirna</q>
                <q class="blockquote" dir="ltr">Eller aşağı çevrilir!</q>
                <span class="material-symbols icon-down">arrow_downward</span>
            </div>

            <div class="main-prayers">
                <template v-for="(dua, index) in duaMetinleri" :key="index">
                    <p class="dua-line">
                        <span class="ae">A.e.</span>
                        <span :class="`text ${dua.color}`">{{ dua.text }}</span>
                        <span v-if="dua.repeat" class="repeat-text">({{ dua.repeat }})</span>
                    </p>
                </template>
            </div>

            <hr class="divider">

            <div class="middle-prayers">
                <template v-for="(dua, index) in sonDualar" :key="index">
                    <p class="text-center">
                        <span :class="dua.color">{{ dua.text }}</span>
                    </p>
                </template>
            </div>

            <hr class="divider">

            <div class="final-prayers">
                <div class="info-section">
                    <span class="material-symbols icon-up">arrow_upward</span>
                    <q class="blockquote" dir="ltr">Eller yukarı açılır!</q>
                </div>

                <template v-for="(dua, index) in kapanisDualari" :key="index">
                    <p class="text-center">
                        <span :class="dua.color">{{ dua.text }}</span>
                    </p>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dua-wrapper {
    width: 100%;
}

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

.info-section {
    text-align: center;
    margin: 1rem 0;
}

.main-prayers {
    text-align: left;
    /* padding: 0 1rem; */
}

.dua-line {
    margin: 0.2rem 0;
    display: flex;
    align-items: baseline;
    gap: 4px;
}

.ae {
    color: #666;
    white-space: nowrap;
}

.repeat-text {
    color: #666;
    font-size: 0.8em;
    margin-left: 4px;
}

.text-center {
    text-align: center;
    margin: 0.2rem 0;
}

.divider {
    width: 50%;
    margin: 1rem auto;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.red {
    color: #D10000;
}

.green {
    color: #1AB800;
}

.magenta {
    color: #D1008A;
}

.orange {
    color: #ff7322;
}

.icon-down,
.icon-up {
    font-size: 1rem;
    color: var(--primary);
}

@media (max-width: 768px) {
    .dua-line {
        flex-wrap: wrap;
    }
}
</style>