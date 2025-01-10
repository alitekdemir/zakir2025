<template>
  <div class="dua-wrapper">
    <!-- İlk bölüm - 2 sütunlu yapı -->
    <div class="two-column-container">
      <!-- Sol sütun - tekrar eden kısım -->
      <div class="left-column">
        <span class="ecirna">Allahümme<br>ecirnâ</span>
        <template v-for="n in 21" :key="n">
          <span class="ecirna-repeat">〃 〃</span>
        </template>
      </div>
      
      <!-- Sağ sütun - dualar -->
      <div class="right-column">
        <span class="color1">minen-nâr.</span>
<span class="color1">min kulli nâr.</span>
<span class="color2">min fitnetid-dîniyye ved-dünyeviyye.</span>
<span class="color2">min fitneti âhiri'z zamân.</span>
<span class="color2">min fitnetil Mesîhid-Deccâlî ves-Süfyân.</span>
<span class="color2">mineż-żalâlâti vel-bid‘iyyâti vel-baliyyât.</span>
<span class="color4">min şerri'n nefsi'l-emmâre.</span>
<span class="color4">min şurûrin nufûsi'l-emmârâtil-fir‘avniyye.</span>
<span class="color5">min şerri'n nisâ'.</span>
<span class="color5">min belâi'n nisâ'.</span>
<span class="color5">min fitneti'n-nisâ'.</span>
<span class="color1">min ‘azâbi'l Kabr.</span>
<span class="color1">min ‘azâbi yevmi'l Kıyâme.</span>
<span class="color1">min ‘azâbi cehennem.</span>
<span class="color1">min ‘azâbi Kahrik.</span>
<span class="color1">min nâri Kahrik.</span>
<span class="color1">min ‘azâbil Kabri ven-nîrân.</span>
<span class="color4">minar-riyâ'i vassum‘ati vel-‘ucubi vel-fahr.</span>
<span class="color2">min tecâvüzi'l mulhidîn.</span>
<span class="color2">min şerri'l munâfiKîn.</span>
<span class="color2">min fitneti'l fâsiKîn.</span>
      </div>
    </div>

    <!-- Ayırıcı çizgi -->
    <hr class="divider">

    <!-- Tek sütunlu bölüm -->
    <div class="single-column">
      <span>Allahümme ecirnâ ve ecir vâlideynâ</span>
        <span class="color1">ve talabete Resâili’n-Nûri’s-Sâdıkîne</span>
        <span class="color3">fî hidmeti'l-Kur'âni vel-îmân,</span>
        <span class="color5">ve ahbâbenâ'l-mü'minîne'l-muḫliṣîne</span>
        <span>ve akribâenâ ve ecdâdenâ minen-nâr.</span>
    </div>

    <hr class="divider">

    <!-- Son bölüm -->
    <div class="single-column">
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

<style scoped>
.dua-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.two-column-container {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
  width: 100%;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
  padding-right: 0.5rem;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}

.ecirna {
  font-size: 0.85rem;
  color: var(--text-dark);
  opacity: 0.8;
  text-align: right;
  white-space: nowrap;
}

.ecirna-repeat {
  font-size: 0.85rem;
  color: var(--text-dark);
  opacity: 0.6;
  text-align: right;
  white-space: nowrap;
}

.single-column {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  text-align: center;
}

.divider {
  width: 50%;
  margin: 1rem auto;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

/* Renk sınıfları */
.color1 { color: #FF6B6B; }
.color2 { color: #4ECDC4; }
.color3 { color: #45B7D1; }
.color4 { color: #96CEB4; }
.color5 { color: #FF9F9F; }
</style>
