# Helal Ön İzleme

**TR:** Eğitim amaçlı, tarayıcıda çalışan İslami / katılım-benzeri portföy **simülasyonu**. Gerçek para yatırma, emir veya ödeme yoktur. Fiyatlar üretileştirilmiş (simüle) hareketlerdir.

**EN:** A browser-based **educational simulation** of participation / Islamic-style portfolios. No real money, orders, or payments. Prices are simulated.

---

## ⚠️ Big warnings / Önemli uyarılar

- **Gerçek para yok.** Bu bir yatırım platformu değildir.
- **Fiyatlar simüle edilir**; resmi BIST, katılım endeksi veya TEFAS verisi değildir.
- Listeler **eğitim amaçlı örnek semboller** içerir; resmi endeks üyeliği veya şer’i onay iddiası yoktur.
- Senaryo sonuçları **illüstratif**tir; tarihsel backtest veya getiri garantisi değildir.
- **Yatırım tavsiyesi değildir.** Kararlarınızdan siz sorumlusunuz.

---

## Features / Özellikler

- Çoklu portföy (localStorage, anahtar: `helal-onizleme-v6`)
- Öğretici şablonlar (muhafazakâr / dengeli / büyüme / enerji / katılım çekirdek / temettü / savunma-tech / çok sektör)
- Katılım-benzeri eğitim paneli + BIST deneyimli yatırımcı özetleri + **branş/sektör** (tıklanır filtre, **Çok sektörlü**) + simüle tick
- **Telefon görünümü** (üst bar) — dar dikey düzen
- Haber etkileri: eski önemli + yeni (ASTOR ABD çok milyar $ eğitim senaryosu vb.)
- Pro metrikler: F/K, sektör medyanı, PD/DD, DY, gelir/kâr büyümesi, net borç/EBITDA, likidite, faiz/uygun olmayan gelir mock
- Öğren: detay açılır kartlar; briefler genişletilmiş
- Geçmiş senaryolar: aylık / 6 ay / yıllık / çok yıllı ufuklar
- Fiyat tabanları Eyl 2026 civarı ballpark; tick seed düzeltmesi (Simüle hareket üret görünür çalışır)
- Chart.js ile değer / dağılım grafikleri (yüklenemezse metin yedek)

---

## Run locally / Yerel çalıştırma

Statik site; derleme gerekmez.

```bash
cd helal-yatirim
python -m http.server 8765
```

Tarayıcıda: [http://127.0.0.1:8765](http://127.0.0.1:8765)

Alternatif:

```bash
npx --yes serve -l 8765 .
```

---

## GitHub Pages

Repo kökünde `index.html` olduğu için Pages’te **Deploy from branch → `/ (root)`** seçebilirsiniz. Özel domain veya `docs/` kökü gerekmez; ekran görüntüsü `docs/screenshot.png` altındadır.

---

## Disclaimer

Bu yazılım “olduğu gibi” sunulur. Yazarlar, simüle verilerden veya yanlış yorumlamadan doğan kayıplardan sorumlu değildir. Helal / katılım uygunluğu için yetkili screening ve danışmanlık kaynaklarına başvurun.

---

## License

MIT © 2026 Roadbl Yılmaz (roadbl) — see [LICENSE](LICENSE).
