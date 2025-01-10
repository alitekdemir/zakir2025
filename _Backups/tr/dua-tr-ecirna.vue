<template>
    <div class="flex-container latin">
        <!-- <blockquote dir="ltr">Eller aşağı çevrilir</blockquote> -->
        <q class="blockquote" dir="ltr">Eller aşağı çevrilir!</q>
        <!-- <span class="text-segment">Allahümme ecirnâ minen-nâr.</span> -->
        <span class="ecirna">Allahümme<br>ecirnâ</span><span class="color1">minen-nâr.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color1">min kulli nâr.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color2">min fitnetid-dîniyye ved-dünyeviyye.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color2">min fitneti âhiri'z zamân.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color2">min fitnetil Mesîhid-Deccâlî ves-Süfyân.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color2">mineż-żalâlâti vel-bid‘iyyâti vel-baliyyât.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color4">min şerri'n nefsi'l-emmâre.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color4">min şurûrin nufûsi'l-emmârâtil-fir‘avniyye.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color5">min şerri'n nisâ'.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color5">min belâi'n nisâ'.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color5">min fitneti'n-nisâ'.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color1">min ‘azâbi'l Kabr.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color1">min ‘azâbi yevmi'l Kıyâme.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color1">min ‘azâbi cehennem.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color1">min ‘azâbi Kahrik.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color1">min nâri Kahrik.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color1">min ‘azâbil Kabri ven-nîrân.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color4">minar-riyâ'i vassum‘ati vel-‘ucubi vel-fahr.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color2">min tecâvüzi'l mulhidîn.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color2">min şerri'l munâfiKîn.</span>
        <span class="ecirna"> 〃  〃 </span>            <span class="color2">min fitneti'l fâsiKîn.</span>
        <hr>
        <span class="">Allahümme ecirnâ ve ecir vâlideynâ</span>
        <span class="color1">ve talabete Resâili’n-Nûri’s-Sâdıkîne</span>
        <span class="color3">fî hidmeti'l-Kur'âni vel-îmân,</span>
        <span class="color5">ve ahbâbenâ'l-mü'minîne'l-muḫliṣîne</span>
        <span class="">ve akribâenâ ve ecdâdenâ minen-nâr.</span>
        <hr>
        <q class="blockquote" dir="ltr">Eller yukarı açılır!</q>
        <span class="color2">Bi‘afvike yâ Mucîr bi fâḍlike yâ Ġaffâr.</span>
        <span class="color2">Allahümme edḫılne'l cennete ma‘al-ebrâr.</span>
        <span class="color2">Allahümme edḫılne'l cennete ma‘al-ebrâr.</span>
        <span class="color2">Allahümme edḫılne ve edhıl üstadena </span>
        <span class="color1">Saîd en-Nursî radıyallâhu anh</span>
        <span class="color1">ve vâlideynâ ve talebete Resâili’n Nûri’s Sâdıkîne</span>
        <span class="color5">ve ihvânenâ ve ehavâtinâ ve akribâenâ ve ecdâdenâ</span>
        <span class="color5">ve ahbâbenel mü’minînel muhlisîne</span>
        <span class="color3">fî hidmeti’l îmâni vel Kur’ân</span>
        <span class="color3">el-cennete mea’l ebrâr</span>
        <span class="color3">bi-şefâati nebiyyike’l-muhtâr</span>
        <span class="color3">ve âlihîl-ethâr ve ashâbihîl ahyâr</span>
        <span class="color3">ve sellim mâdâmel leyl ven" nehâr.</span>
        <span class="text-segment"><b>Âmîn.</b></span>
        <span class="text-segment">Ve’l-hamdü lillâhi Rabbi’l-âlemîn.</span>
    </div>

    <div class="flex-container latin">
    <!-- Sol sütun -->
    <div class="column">
      <p class="ecirna">Allahümme<br>ecirnâ</p>
      <div v-for="(item, index) in leftColumnItems">
        <span class="ecirna">〃 〃</span>
      </div>
    </div>
    <!-- Sağ sütun -->
    <div class="column">
      <div v-for="(item, index) in rightColumnItems" :key="index">
        <span :class="item.color">{{ item.text }}</span>
      </div>
    </div>
    <div class="dua">
      <hr>
      <span class="">Allahümme ecirnâ ve ecir vâlideynâ</span>
        <span class="color1">ve talabete Resâili’n-Nûri’s-Sâdıkîne</span>
        <span class="color3">fî hidmeti'l-Kur'âni vel-îmân,</span>
        <span class="color5">ve ahbâbenâ'l-mü'minîne'l-muḫliṣîne</span>
        <span class="">ve akribâenâ ve ecdâdenâ minen-nâr.</span>
        <hr>
        <q class="blockquote" dir="ltr">Eller yukarı açılır!</q>
        <span class="color2">Bi‘afvike yâ Mucîr bi fâḍlike yâ Ġaffâr.</span>
        <span class="color2">Allahümme edḫılne'l cennete ma‘al-ebrâr.</span>
        <span class="color2">Allahümme edḫılne'l cennete ma‘al-ebrâr.</span>
        <span class="color2">Allahümme edḫılne ve edhıl üstadena </span>
        <span class="color1">Saîd en-Nursî radıyallâhu anh</span>
        <span class="color1">ve vâlideynâ ve talebete Resâili’n Nûri’s Sâdıkîne</span>
        <span class="color5">ve ihvânenâ ve ehavâtinâ ve akribâenâ ve ecdâdenâ</span>
        <span class="color5">ve ahbâbenel mü’minînel muhlisîne</span>
        <span class="color3">fî hidmeti’l îmâni vel Kur’ân</span>
        <span class="color3">el-cennete mea’l ebrâr</span>
        <span class="color3">bi-şefâati nebiyyike’l-muhtâr</span>
        <span class="color3">ve âlihîl-ethâr ve ashâbihîl ahyâr</span>
        <span class="color3">ve sellim mâdâmel leyl ven" nehâr.</span>
        <span class="text-segment"><b>Âmîn.</b></span>
        <span class="text-segment">Ve’l-hamdü lillâhi Rabbi’l-âlemîn.</span>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { text: "minen nâr (3-5 veya 7 defâ)", color: "color1" },
        { text: "min kulli nâr.", color: "color1" },
        { text: "min fitnetid-dîniyye ved-dünyeviyye", color: "color2" },
        { text: "min fitneti âhiri'z zamân.", color: "color2" },
        { text: "min fitnetil Mesîhid-Deccâlî ves-Süfyân.", color: "color2" },
        { text: "mineż-żalâlâti vel-bid‘iyyâti vel-baliyyât.", color: "color2" },
        { text: "min şerri'n nefsi'l-emmâre.", color: "color4" },
        { text: "min şurûrin nufûsi'l-emmârâtil-fir‘avniyye.", color: "color4" },
        { text: "min şerri'n nisâ'.", color: "color5" },
        { text: "min belâi'n nisâ'.", color: "color5" },
        { text: "min fitneti'n-nisâ'.", color: "color5" },
        { text: "min ‘azâbi'l Kabr.", color: "color1" },
        { text: "min ‘azâbi yevmi'l Kıyâme.", color: "color1" },
        { text: "min ‘azâbi cehennem.", color: "color1" },
        { text: "min ‘azâbi Kahrik.", color: "color1" },
        { text: "min nâri Kahrik.", color: "color1" },
        { text: "min ‘azâbil Kabri ven-nîrân.", color: "color1" },
        { text: "minar-riyâ'i vassum‘ati vel-‘ucubi vel-fahr.", color: "color4" },
        { text: "min tecâvüzi'l mulhidîn.", color: "color2" },
        { text: "min şerri'l munâfiKîn.", color: "color2" },
        { text: "min fitneti'l fâsiKîn.", color: "color2" },
      ],
    };
  },
  computed: {
    leftColumnItems() {
      return this.items.filter((_, index) => index % 2 === 0); // Tek sıra
    },
    rightColumnItems() {
      return this.items.filter((_, index) => index % 2 !== 0); // Çift sıra
    },
  },
};
</script>


<style>
.container {
  display: flex;
  justify-content: space-between;
}

.column {
  flex: 1;
  margin: 0 10px;
}

.ecirna {
  font-weight: normal;
  margin-right: 5px;
}

.blockquote {
    width: 100%; /* Tam genişlik kullanarak başka içeriklerle aynı satırda görünmesini engeller */
    text-align: center; /* Metni ortalar */
    margin: 10px 0; /* Üst ve alttan boşluk ekler */
    opacity: .33;
  }

.flex-container{
    width: 100%;
    /* flex-direction: column; */
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center; 
    text-align: left;
    /* padding: 4px; */
    gap: 4px;
}

.flex {
    /* ecirnalar sola hizalamak için */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
    text-align: left;
    /* font-size: x-small; */
    /* Metin hizasını sola çeker */
    gap: 4px;
  }

  .ecirna{
    font-size: 0.75em;
    line-height: 0.5;
    /* margin: -5px 0; */
    text-align: center;
    /* color: rgb(235, 135, 135); */
    color: LightSlateGray;
  }

.color1{color: crimson;}
.color2{color: DodgerBlue;}
.color3{color: SeaGreen;}
.color4{color: Magenta;}
.color5{color: DarkOrange;}

/* .color2 {color: green;} */
/* .color4 {color: purple;} */

</style>

