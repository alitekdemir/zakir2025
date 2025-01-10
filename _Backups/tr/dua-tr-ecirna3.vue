<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
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
            <q class="blockquote" dir="ltr">A.e. = Allahümme Ecirna</q>
            <br>
            <q class="blockquote" dir="ltr">Eller aşağı çevrilir!</q>
            <br><span class="material-icons" style="font-size: 1rem; color: var(--primary);">arrow_downward</span>

            <div class="two-column-container">
                <!-- Sol sütun - tekrar eden kısım -->
                <div class="left-column">
                    <span class="ecirna">A.e.</span>
                    <template v-for="n in 21" :key="n">
                        <span class="ecirna-repeat">A.e.</span>
                    </template>
                </div>

                <!-- Sağ sütun - dualar -->
                <div class="right-column">
                    <span class="color-red">minen-nâr. <q class="blockquote" dir="ltr">3-5-7 defa</q></span>
                    <span class="color-red">min kulli nâr.</span>
                    <span class="color-green">min fitnetid-dîniyye ved-dünyeviyye.</span>
                    <span class="color-green">min fitneti âhiri'z zamân.</span>
                    <span class="color-green">min fitnetil Mesîhid-Deccâlî ves-Süfyân.</span>
                    <span class="color-green">mined-dalâlâti vel-bid‘iyyâti vel-baliyyât.</span>
                    <span class="color-magenta">min şerri'n nefsi'l-emmâre.</span>
                    <span class="color-magenta">min şurûrin nufûsi'l-emmârâtil-fir‘avniyye.</span>
                    <span class="color-orange">min şerri'n nisâ'.</span>
                    <span class="color-orange">min belâi'n nisâ'.</span>
                    <span class="color-orange">min fitneti'n-nisâ'.</span>
                    <span class="color-red">min ‘azâbi'l Kabr.</span>
                    <span class="color-red">min ‘azâbi yevmi'l Kıyâme.</span>
                    <span class="color-red">min ‘azâbi cehennem.</span>
                    <span class="color-red">min ‘azâbi Kahrik.</span>
                    <span class="color-red">min nâri Kahrik.</span>
                    <span class="color-red">min ‘azâbil Kabri ven-nîrân.</span>
                    <span class="color-magenta">minar-riyâ'i vassum‘ati vel-‘ucubi vel-fahr.</span>
                    <span class="color-magenta">vel-‘ucubi vel-fahr.</span>
                    <span class="color-orange">min tecâvüzi'l mulhidîn.</span>
                    <span class="color-orange">min şerri'l munâfiKîn.</span>
                    <span class="color-orange">min fitneti'l fâsiKîn.</span>
                </div>
            </div>

            <!-- Ayırıcı çizgi -->
            <hr class="divider">

            <!-- Tek sütunlu bölüm -->
            <div class="single-column">
                <span>Allahümme ecirnâ ve ecir vâlideynâ</span>
                <span class="color-red">ve talabete Resâili’n-Nûri’s-Sâdıkîne</span>
                <span class="color-green">fî hidmeti'l-Kur'âni vel-îmân,</span>
                <span class="color-orange">ve ahbâbenâ'l-mü'minîne'l-muḫliṣîne</span>
                <span>ve akribâenâ ve ecdâdenâ minen-nâr.</span>
            </div>

            <hr class="divider">

            <!-- Son bölüm -->
            <div class="single-column">
                <span class="material-icons" style="font-size: 1rem; color: var(--primary);">arrow_upward</span>
                <q class="blockquote" dir="ltr">Eller yukarı açılır!</q>

                <span class="color-green">Bi‘afvike yâ Mucîr bi fâḍlike yâ Ġaffâr</span>
                <span class="color-green">Allahümme edḫılne'l cennete ma‘al-ebrâr</span>
                <span class="color-green">Allahümme edḫılne'l cennete ma‘al-ebrâr</span>
                <span class="color-green">Allahümme edḫılne</span>
                <span class="color-red">ve edhıl üstadena</span>
                <span class="color-red">Saîd en-Nursî radıyallâhu anh</span>
                <span class="">ve vâlideynâ</span>
                <span class="color-red">ve talebete Resâili’n Nûri’s Sâdıkîne</span>
                <span class="color-orange">ve ihvânenâ ve ehavâtinâ</span>
                <span class="color-orange">ve akribâenâ ve ecdâdenâ</span>
                <span class="color-orange">ve ahbâbenel mü’minînel muhlisîne</span>
                <span class="color-green">fî hidmeti’l îmâni vel Kur’ân</span>
                <span class="color-green">el-cennete mea’l ebrâr</span>
                <span class="color-green">bi-şefâati nebiyyike’l-muhtâr</span>
                <span class="color-green">ve âlihîl-ethâr <span>ve ashâbihîl ahyâr</span></span>
                <span class="color-green">ve sellim mâdâmel leyl ven" nehâr</span>
                <span class=""><b>Âmîn.</b></span>
                <span class="">Ve’l-hamdü lillâhi Rabbi’l-âlemîn.</span>

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

.dua-wrapper {
    width: 100%;
    /* padding-left: 0rem; */
}

.two-column-container {
    display: grid;
    /* Sol sütun minimum genişlikte, sağ sütun kalan alanı doldurur */
    grid-template-columns: 20px 1fr;
    gap: 0.2rem;
    align-items: start;
    font-size: 0.8rem;
}

.left-column {
    display: flex;
    flex-direction: column;
    text-align: center;
    /* gap: 0.34rem; */
    /* Merkeze hizalama */
    /* Küçük yazı */
}

.right-column {
    display: flex;
    flex-direction: column;
    text-align: left;
    /* gap: 0.01rem; */
    /* margin-left: -0.5rem; */
    /* Sola biraz daha yaklaştırma */
}

.ecirna {
    /* font-size: 0.9rem; */
    /* font-weight: 700; */
    color: #666;
    opacity: 0.9;
    white-space: nowrap;
    /* line-height: 80%; */
    text-align: center;
}

.ecirna-repeat {
    color: #666;
    /* opacity: 0.7; */
    white-space: nowrap;
    /* font-size: 0.9rem; */
    text-align: center;
}

.single-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    /* gap: 0.5rem; */
}

.divider {
    width: 50%;
    margin: 1rem auto;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

/* Renk sınıfları */
.color-red {
    color: #D10000;
}

.color-green {
    color: #1AB800;
}

.color-magenta {
    color: #D1008A;
}

.color-orange {
    color: #ff7322;
}

/* Sağ sütundaki metinler */
[class*="color-"] {
    /* font-size: 0.9rem; */
    /* line-height: 1.4; */
    text-align: left;
}
</style>
