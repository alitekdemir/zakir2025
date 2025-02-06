<script>
export default {
  name: 'AboutPage',
  // Burada, eğer gerekirse, bileşene özel data, methods, computed properties vb. ekleyebilirsiniz.
};
</script>

<template>
  <div class="about-page">
    <h1>Zâkir: Tesbihat Ezber Arkadaşınız</h1>

    <p>
      Zâkir, namaz tesbihatını öğrenme ve ezberleme yolculuğunuzda size eşlik
      eden bir uygulamadır. Amacımız, beş vakit namaz tesbihatını kolay, pratik
      ve keyifli bir şekilde öğrenmenizi sağlamaktır. Zâkir, tüm tesbihat
      metinlerini tek bir yerde toplar ve farklı bölümlere kolayca erişmenizi
      sağlar.
    </p>

    <h2>Neden Zâkir?</h2>
    <ul>
      <li><strong>Kolay Kullanım:</strong> Karmaşık menüler olmadan tesbihatınıza odaklanın.</li>
      <li><strong>Her Zaman Yanınızda:</strong> Telefonunuzda veya tabletinizde, her an tesbihat yapın.</li>
      <li><strong>Vakitlere Özel:</strong> Doğru tesbihatı yapmanızı sağlar.</li>
      <li><strong>Ezber Dostu:</strong> Dualar, küçük parçalar halinde sunulur.</li>
      <li><strong>Kişiselleştirilebilir:</strong> Farklı temalar ve yazı tipleri.</li>
    </ul>

     <img src="/tesbihat-organize.png" alt="Tesbihat Ekranı" class="screenshot" />

    <h2>Uygulamanın Özellikleri</h2>
    <p>
      Zâkir, beş vakit namaz tesbihatını öğrenmenizi kolaylaştırır. Ana ekranda
      tesbihat metinleri, numaralandırılmış kartlar halinde sunulur.
    </p>

    <h3>Butonlar Nasıl Çalışır?</h3>
    <p>
      Bazı bölümler sadece belirli vakitlerde okunur. İlgili butonları
      kullanarak bu bölümlere ulaşabilirsiniz:
    </p>
    <ul>
      <li>🔹 <strong>Butona basarsanız:</strong> O vakte özel bölüm açılır.</li>
      <li>🔹 <strong>Butona basmazsanız:</strong> O bölüm atlanır.</li>
    </ul>

    <h3>Vakitlere Göre Okuma</h3>
     <p>Kartları, yaptığınız namazın vaktine göre sırayla takip edin.</p>

    <p><strong>Örnek:</strong></p>
    <ul>
      <li><strong>Öğle namazı için:</strong> 1, 2, 5... numaralı kartları okuyun, 3 ve 4'ü atlayın.</li>
      <li><strong>Sabah namazı için:</strong> "Sabah" butonuna basın.</li>
    </ul>

    <img src="/345.png" alt="Sabah/Akşam Butonları" class="screenshot" />
    <p>Resimde, "Sabah" ve "Akşam" butonları gösterilmektedir. Diğer vakitler için de benzer butonlar bulunur.</p>

    <h2>Tesbihat Ekranı</h2>
    <p>
      Tesbihat ekranı, dikkatinizi dağıtmadan odaklanmanızı sağlar. Her dua,
      küçük bir kart içinde gösterilir:
    </p>
      <ul>
        <li>Duaları istediğiniz sırayla ezberleyin.</li>
        <li>Duanın anlamına ve faziletlerine ulaşın.</li>
        <li>"Tesbihatı Tamamladım" ile ilerlemenizi kaydedin.</li>
      </ul>

    <h3>Uygulama İçinde Gezinme</h3>
    <ul>
      <li><strong>Üst Çubuk (Navbar):</strong> Diğer bölümlere geçiş, tema ve yazı tipi ayarları.</li>
      <li><strong>Dua Kartları:</strong> Detayları görmek için tıklayın.</li>
    </ul>

    <h2>Zâkir'i Kişiselleştirin</h2>
    <ul>
      <li><strong>Temalar:</strong> "forest", "nur" veya "ziya" temalarından birini seçin.</li>
      <li><strong>Yazı Tipi:</strong> Arapça veya Latin harfleriyle okuyun.</li>
    </ul>

    <h2>Geliştirici Notu</h2>
      <p>Bu uygulama PWA teknolojisiyle geliştirilmiştir. İnternet bağlantısı olmadan da (Çevrimdışı) kullanabilirsiniz. Cihazınızın uyku moduna geçmesini engeller, kesintisiz ezberleme imkanı sağlar.</p>

    <h2>Geri Bildirimleriniz Önemli!</h2>
    <p>
      Zâkir'i geliştirmemize yardımcı olmak için lütfen görüşlerinizi bizimle
      paylaşın. Uygulama içindeki "Geri Bildirim" bağlantısını kullanarak bize
      ulaşabilirsiniz.
    </p>
  </div>
</template>

<style scoped>
/* Buraya, about-page sınıfına ve diğer elementlere özel stillerinizi ekleyin. */
.about-page {
  padding: 20px;
  max-width: 800px; /* İsteğe bağlı, içeriği ortalamak için */
  margin: 0 auto;    /* İsteğe bağlı, içeriği ortalamak için */
}

.screenshot {
  max-width: 100%; /* Resimlerin sayfa genişliğini aşmamasını sağlar */
  height: auto;    /* Oranların korunması için */
  margin-bottom: 1rem; /* Resimlerin altında boşluk */
  display: block;
}

h1, h2, h3 {
    margin-bottom: 0.5rem;
}
ul {
  margin-bottom: 1rem;
  padding-left: 20px; /* Madde işaretlerinin düzgün görünmesi için */
}
li{
    margin-bottom: 0.4rem;
}

</style>