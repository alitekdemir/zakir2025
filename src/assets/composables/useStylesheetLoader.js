// src/assets/composables/useStylesheetLoader.js
/**
 * Harici bir stil sayfasını dinamik olarak yükler ve yüklendiğinde çözümlenen bir Promise döndürür.
 * @param {string} path - Stil sayfasının yolu.
 * @param {string} id - Stil sayfası <link> elementinin ID'si.
 * @returns {Promise<void>} Yükleme tamamlandığında çözümlenir.
 */
export function loadStylesheet(path, id) {
  return new Promise((resolve, reject) => {
    let link = document.getElementById(id);

    // Eğer link zaten varsa ve doğru yola sahipse, tekrar yüklemeye gerek yok.
    if (link && link.href.includes(path)) {
      resolve();
      return;
    }
    
    // Yeni bir link oluştur veya mevcut olanı güncelle.
    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    link.href = path;

    link.onload = () => resolve();
    link.onerror = (error) => reject(new Error(`Stil sayfası yüklenemedi: ${path}`, { cause: error }));
  });
}
