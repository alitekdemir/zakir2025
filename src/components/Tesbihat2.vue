<!-- src/components/Tesbihat.vue -->
<script setup>
// Tesbihat
// import DuaWidget from './DuaWidgetAccordion.vue'
import DuaWidget from './DuaWidget2.vue'
import Entesselam from './dualar/01-entesselam.vue'
import Tuncina from './dualar/02-tuncina.vue'
import SabahAksam from './dualar/03-sabah-aksam.vue'
import Ecirna from './dualar/04-ecirna.vue'
import Subhanallahi from './dualar/05-subhanallahi.vue'
import AyetTrKursi from './dualar/06-kursi.vue'
import Tesbih from './dualar/07-tesbih.vue'
import Tevhid from './dualar/08-tevhid.vue'
import Dua from './dualar/09-dua.vue'
import Falem from './dualar/10-falem.vue'
import Selam from './dualar/11-salavat.vue'
import Kesira from './dualar/12-kesira.vue'
import SalliveSellim from './dualar/13-sallivesellim.vue'
import Elfu from './dualar/14-elfu.vue'
import Biadedi from './dualar/15-biadedievrakil.vue'
import IsmiAzam from './dualar/16-ismiazam.vue'
import IsmiAzamDua from './dualar/17-ismiazamdua.vue'
import Sureler from './dualar/18-sureler.vue'

// Bilgiler
import i01Entesselam from './info/i01Entesselam.vue'
import i02Tuncina from './info/i02Tuncina.vue'
import i03SabahAksam from './info/i03SabahAksam.vue'
import i09Dua from './info/i09Dua.vue'
// ... diğer bilgiler eklenecek
</script>



<template>
    <div class="tesbihat-container">

        <DuaWidget number="1" title="Farzdan Sonra">
            <Entesselam />
            <template #info-content>
                <i01Entesselam />
            </template>
        </DuaWidget>

        <DuaWidget number="2" title="Salaten Tuncina">
            <Tuncina />
            <template #info-content>
                <i02Tuncina />
            </template>
        </DuaWidget>

        <DuaWidget number="3" title="Sünnetler kılınır sonra">
            <SabahAksam />
            <template #info-content>
                <i03SabahAksam />
            </template>
        </DuaWidget>

        <DuaWidget number="4" title="İstiaze/Ecirna">
            <Ecirna />
        </DuaWidget>

        <DuaWidget number="5" title=" ">
            <Subhanallahi />
        </DuaWidget>

        <DuaWidget number="6" title=" ">
            <AyetTrKursi />
        </DuaWidget>

        <DuaWidget number="7" title="Tesbih">
            <Tesbih />
        </DuaWidget>

        <DuaWidget number="8" title="Tevhid">
            <Tevhid />
        </DuaWidget>
        
        <DuaWidget number="9" title="Dua">
            <Dua />
            <template #info-content>
                <i09Dua />
            </template>
        </DuaWidget>

        <DuaWidget number="10" title="Tehlil">
            <Falem />
        </DuaWidget>

        <DuaWidget number="11" title=" ">
            <Selam />
        </DuaWidget>

        <DuaWidget number="12" title="Kesîran kesîrâ">
            <Kesira />
        </DuaWidget>

        <DuaWidget number="13" title=" ">
            <SalliveSellim />
        </DuaWidget>

        <DuaWidget number="14" title=" ">
            <Elfu />
        </DuaWidget>

        <DuaWidget number="15" title=" ">
            <Biadedi />
        </DuaWidget>

        <DuaWidget number="16" title="İsm-i Âzam">
            <IsmiAzam />
        </DuaWidget>

        <DuaWidget number="17" title="İsm-i Âzam Duası">
            <IsmiAzamDua />
        </DuaWidget>

        <DuaWidget number="18" title="Aşirler">
            <Sureler />
        </DuaWidget>

    </div>
</template>


<style scoped>
.tesbihat-container {
    display: flex;
    flex-direction: column;
    padding: 0 0.25rem;
    margin: 1.5rem auto; /* Ortala ve boşluk bırak */
    max-width: 600px; /* Maksimum genişlik */
    gap: 1rem;
}
</style>