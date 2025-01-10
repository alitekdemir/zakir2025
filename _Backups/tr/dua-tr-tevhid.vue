<template>
    <div class="flex-container latin">
        <p class="text-paragraph">
            <span class="text-segment">Lâ ilâhe illallâhü vahdehü lâ şerîke leh,</span>
            <span class="text-segment">lehül mülkü ve lehül ḥamdü</span>
            <span class="text-segment">yuḥyî ve yümît,</span>
            <span class="text-segment">ve hüve ḥayyün lâ yemût,</span>
            <span class="text-segment">biyedihil ḥayr,</span>
            <span class="text-segment">ve hüve alâ külli şey’in kadîr,</span>
            <span class="text-segment">ve ileyhil masîr</span>
        </p>
    </div>
</template>

<style>
.text-paragraph {
    /* Metni ortala */
    text-align: center;
    /* Satır yüksekliği */
    /* line-height: 1.5; */
}

.text-segment {
    /* Blok düzeyinde metin düzeni */
    /* display: inline-block; */
    /* Sağ tarafa boşluk */
    margin-right: 0.25rem;
}

.text-segment:last-child {
    /* Son elemanda boşluk bırakma */
    margin-right: 0;
}
</style>
