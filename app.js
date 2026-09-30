(() => {
  const STORAGE_KEY = "helal-onizleme-v6";
  const STORAGE_KEY_LEGACY = "helal-onizleme-v5";
  const STORAGE_KEY_LEGACY2 = "helal-onizleme-v4";

  /** vol: günlük yaklaşık volatilite; drift: hafif uzun vadeli eğilim */
  /** vol: günlük yaklaşık volatilite; drift: hafif uzun vadeli eğilim
   *  base: Eyl 2026 civarı ballpark (simülasyon; resmi BIST kotasyonu değildir)
   *  sector: branş/sektör eğitimi için; resmi endeks sektör kodu iddiası yoktur
   *  indexNote: resmi katılım üyeliği iddiası YOKTUR — dönemsel screening değişir */
  const CATALOG = [
    // --- Enerji ---
    // pe/pb/dy/de + revG/profitG/ndEbitda/liq/intRatio/nonComp = sim eğitim metrikleri (ballpark)
    { symbol: "ASTOR", name: "Astor Enerji", type: "Hisse", sector: "Enerji", sectors: ["Enerji"], market: "BIST", indexNote: "Eğitim örneği · dönemsel screening (resmî üyelik iddiası yok)", base: 220, vol: 0.032, drift: 0.00015, pe: 17.0, pb: 4.3, dy: 0.5, de: 0.45, revG: 42, profitG: 38, ndEbitda: 0.8, liq: 85, intRatio: 4, nonComp: 2, note: "Transformatör · yüksek vol" },
    { symbol: "TUPRS", name: "Tüpraş", type: "Hisse", sector: "Enerji", sectors: ["Enerji"], market: "BIST", indexNote: "Eğitim örneği · dönemsel", base: 400, vol: 0.024, drift: 0.00012, pe: 6.2, pb: 1.5, dy: 5.5, de: 0.80, revG: 8, profitG: -5, ndEbitda: 1.4, liq: 92, intRatio: 6, nonComp: 3, note: "Rafineri · emtia duyarlı" },
    { symbol: "ENJSA", name: "Enerjisa Enerji", type: "Hisse", sector: "Enerji", sectors: ["Enerji"], market: "BIST", indexNote: "Eğitim örneği · Katılım 30’a ekleme (Eki 2026 dönemi, örnek)", base: 68, vol: 0.02, drift: 0.00018, pe: 9.5, pb: 1.4, dy: 3.2, de: 0.9, revG: 18, profitG: 12, ndEbitda: 2.1, liq: 70, intRatio: 8, nonComp: 4, note: "Dağıtım / perakende enerji" },
    { symbol: "AKFYE", name: "Akfen Yenilenebilir", type: "Hisse", sector: "Enerji", sectors: ["Enerji"], market: "BIST", indexNote: "Eğitim örneği · yenilenebilir", base: 22.5, vol: 0.026, drift: 0.0002, pe: 11.0, pb: 1.8, dy: 1.0, de: 0.7, revG: 25, profitG: 20, ndEbitda: 2.8, liq: 45, intRatio: 9, nonComp: 3, note: "YE · kapasite hikâyesi" },
    { symbol: "SMRTG", name: "Smart Güneş Enerjisi", type: "Hisse", sector: "Enerji", sectors: ["Enerji"], market: "BIST", indexNote: "Eğitim örneği · güneş / YE", base: 9.8, vol: 0.03, drift: 0.00015, pe: 8.5, pb: 3.2, dy: 0, de: 0.55, revG: 55, profitG: 40, ndEbitda: 1.1, liq: 55, intRatio: 5, nonComp: 2, note: "Güneş paneli / YE" },
    { symbol: "ALFAS", name: "Alfa Solar Enerji", type: "Hisse", sector: "Enerji", sectors: ["Enerji"], market: "BIST", indexNote: "Eğitim örneği · güneş", base: 78, vol: 0.028, drift: 0.00018, pe: 12.0, pb: 2.5, dy: 0.4, de: 0.5, revG: 35, profitG: 28, ndEbitda: 0.9, liq: 48, intRatio: 4, nonComp: 2, note: "Solar ekipman" },
    { symbol: "YEOTK", name: "Yeo Teknoloji Enerji", type: "Hisse", sector: "Enerji", sectors: ["Enerji", "Teknoloji / Savunma"], market: "BIST", indexNote: "Eğitim örneği · dönemsel (liste giriş/çıkış olabilir)", base: 48, vol: 0.03, drift: 0.0001, pe: 14.0, pb: 2.8, dy: 0, de: 0.6, revG: 30, profitG: 15, ndEbitda: 1.5, liq: 40, intRatio: 7, nonComp: 5, note: "Enerji teknolojisi · çok branşlı" },
    { symbol: "GESAN", name: "Girişim Elektrik", type: "Hisse", sector: "Enerji", sectors: ["Enerji", "İnşaat / Çimento"], market: "BIST", indexNote: "Eğitim örneği · elektrik taahhüt", base: 52, vol: 0.027, drift: 0.00012, pe: 10.5, pb: 2.1, dy: 0.8, de: 0.65, revG: 22, profitG: 18, ndEbitda: 1.6, liq: 42, intRatio: 6, nonComp: 3, note: "Elektrik taahhüt · çok branşlı" },
    { symbol: "EUPWR", name: "Europower Enerji", type: "Hisse", sector: "Enerji", sectors: ["Enerji"], market: "BIST", indexNote: "Eğitim örneği · dönemsel", base: 38, vol: 0.029, drift: 0.0001, pe: 11.5, pb: 2.0, dy: 0.3, de: 0.55, revG: 28, profitG: 16, ndEbitda: 1.2, liq: 38, intRatio: 5, nonComp: 2, note: "Enerji otomasyon" },
    // --- Teknoloji / Savunma ---
    { symbol: "ASELS", name: "Aselsan", type: "Hisse", sector: "Teknoloji / Savunma", sectors: ["Teknoloji / Savunma"], market: "BIST", indexNote: "Eğitim örneği", base: 380, vol: 0.022, drift: 0.0003, pe: 22.0, pb: 4.2, dy: 0.6, de: 0.30, revG: 35, profitG: 30, ndEbitda: 0.4, liq: 95, intRatio: 3, nonComp: 1, note: "Savunma elektroniği" },
    { symbol: "KONTR", name: "Kontrolmatik", type: "Hisse", sector: "Teknoloji / Savunma", sectors: ["Teknoloji / Savunma", "Enerji"], market: "BIST", indexNote: "Eğitim örneği · teknoloji", base: 55, vol: 0.031, drift: 0.0002, pe: 18.0, pb: 3.5, dy: 0, de: 0.4, revG: 48, profitG: 35, ndEbitda: 0.7, liq: 60, intRatio: 5, nonComp: 2, note: "Endüstriyel otomasyon · çok branşlı" },
    // --- Gıda / Perakende ---
    { symbol: "BIMAS", name: "BİM Mağazalar", type: "Hisse", sector: "Gıda / Perakende", sectors: ["Gıda / Perakende"], market: "BIST", indexNote: "Eğitim örneği", base: 415, vol: 0.016, drift: 0.0003, pe: 24.0, pb: 7.2, dy: 1.4, de: 0.42, revG: 28, profitG: 22, ndEbitda: 0.3, liq: 90, intRatio: 2, nonComp: 1, note: "İndirim perakende" },
    { symbol: "PNSUT", name: "Pınar Süt", type: "Hisse", sector: "Gıda / Perakende", sectors: ["Gıda / Perakende"], market: "BIST", indexNote: "Eğitim örneği · gıda", base: 115, vol: 0.02, drift: 0.00015, pe: 13.5, pb: 1.6, dy: 2.0, de: 0.5, revG: 15, profitG: 10, ndEbitda: 0.9, liq: 35, intRatio: 4, nonComp: 2, note: "Süt / gıda" },
    // --- Sanayi / Metal ---
    { symbol: "EREGL", name: "Ereğli Demir Çelik", type: "Hisse", sector: "Sanayi / Metal", sectors: ["Sanayi / Metal"], market: "BIST", indexNote: "Eğitim örneği", base: 38, vol: 0.025, drift: 0.0001, pe: 8.5, pb: 0.85, dy: 2.5, de: 0.50, revG: -8, profitG: -25, ndEbitda: 1.0, liq: 88, intRatio: 5, nonComp: 2, note: "Döngüsel çelik" },
    { symbol: "KCAER", name: "Kocaer Çelik", type: "Hisse", sector: "Sanayi / Metal", sectors: ["Sanayi / Metal"], market: "BIST", indexNote: "Eğitim örneği · Katılım 30’a ekleme (Eki 2026 dönemi, örnek)", base: 32, vol: 0.026, drift: 0.00015, pe: 7.8, pb: 1.3, dy: 1.5, de: 0.7, revG: 12, profitG: 5, ndEbitda: 1.8, liq: 50, intRatio: 7, nonComp: 3, note: "Çelik profil" },
    { symbol: "SISE", name: "Şişecam", type: "Hisse", sector: "Sanayi / Metal", sectors: ["Sanayi / Metal"], market: "BIST", indexNote: "Eğitim örneği", base: 42, vol: 0.02, drift: 0.00015, pe: 9.8, pb: 0.95, dy: 2.2, de: 0.75, revG: 10, profitG: 4, ndEbitda: 1.9, liq: 80, intRatio: 6, nonComp: 3, note: "Cam / kimya" },
    // --- Otomotiv ---
    { symbol: "FROTO", name: "Ford Otosan", type: "Hisse", sector: "Otomotiv", sectors: ["Otomotiv"], market: "BIST", indexNote: "Eğitim örneği", base: 78, vol: 0.021, drift: 0.00025, pe: 7.5, pb: 2.0, dy: 4.5, de: 0.60, revG: 20, profitG: 15, ndEbitda: 0.6, liq: 85, intRatio: 4, nonComp: 2, note: "Otomotiv ihracat" },
    { symbol: "TOASO", name: "Tofaş Oto", type: "Hisse", sector: "Otomotiv", sectors: ["Otomotiv"], market: "BIST", indexNote: "Eğitim örneği", base: 270, vol: 0.023, drift: 0.0002, pe: 8.0, pb: 1.7, dy: 4.8, de: 0.65, revG: 14, profitG: 8, ndEbitda: 0.7, liq: 75, intRatio: 5, nonComp: 2, note: "Otomotiv" },
    // --- İnşaat / Çimento ---
    { symbol: "CIMSA", name: "Çimsa", type: "Hisse", sector: "İnşaat / Çimento", sectors: ["İnşaat / Çimento"], market: "BIST", indexNote: "Eğitim örneği", base: 42, vol: 0.024, drift: 0.00012, pe: 7.2, pb: 1.3, dy: 2.8, de: 0.85, revG: 16, profitG: 12, ndEbitda: 2.2, liq: 55, intRatio: 8, nonComp: 3, note: "Çimento" },
    { symbol: "ENKAI", name: "Enka İnşaat", type: "Hisse", sector: "İnşaat / Çimento", sectors: ["İnşaat / Çimento", "Enerji"], market: "BIST", indexNote: "Eğitim örneği", base: 84, vol: 0.019, drift: 0.0002, pe: 11.5, pb: 1.6, dy: 1.6, de: 0.28, revG: 12, profitG: 10, ndEbitda: 0.2, liq: 72, intRatio: 3, nonComp: 2, note: "Müteahhitlik / enerji · çok branşlı" },
    // --- Havacılık ---
    { symbol: "THYAO", name: "Türk Hava Yolları", type: "Hisse", sector: "Havacılık", sectors: ["Havacılık"], market: "BIST", indexNote: "Eğitim örneği · dönemsel", base: 280, vol: 0.028, drift: 0.00022, pe: 5.0, pb: 1.05, dy: 0, de: 1.70, revG: 18, profitG: 25, ndEbitda: 3.5, liq: 98, intRatio: 14, nonComp: 6, note: "Havacılık · borç duyarlı" },
    // --- Holding (çoğu çok sektörlü) ---
    { symbol: "KCHOL", name: "Koç Holding", type: "Hisse", sector: "Holding", sectors: ["Holding", "Otomotiv", "Enerji", "Dayanıklı tüketim"], market: "BIST", indexNote: "Eğitim örneği · holding", base: 205, vol: 0.02, drift: 0.0002, pe: 7.2, pb: 1.35, dy: 3.0, de: 0.70, revG: 15, profitG: 12, ndEbitda: 1.5, liq: 90, intRatio: 7, nonComp: 5, note: "Holding iskontosu · çok sektörlü" },
    { symbol: "SAHOL", name: "Sabancı Holding", type: "Hisse", sector: "Holding", sectors: ["Holding", "Sanayi / Metal", "Enerji", "Banka (bağlı)"], market: "BIST", indexNote: "Eğitim örneği · holding", base: 86, vol: 0.019, drift: 0.00018, pe: 6.5, pb: 1.05, dy: 2.6, de: 0.58, revG: 14, profitG: 11, ndEbitda: 1.3, liq: 88, intRatio: 8, nonComp: 6, note: "Holding · çok sektörlü" },
    { symbol: "BERA", name: "Bera Holding", type: "Hisse", sector: "Holding", sectors: ["Holding", "Sanayi / Metal", "Gıda / Perakende"], market: "BIST", indexNote: "Eğitim örneği · Katılım 30’a ekleme (Eki 2026 dönemi, örnek)", base: 18.5, vol: 0.025, drift: 0.00012, pe: 8.0, pb: 0.9, dy: 1.2, de: 0.45, revG: 10, profitG: 6, ndEbitda: 1.0, liq: 40, intRatio: 5, nonComp: 4, note: "Holding / sanayi · çok sektörlü" },
    // --- Telekom ---
    { symbol: "TCELL", name: "Turkcell", type: "Hisse", sector: "Telekom", sectors: ["Telekom"], market: "BIST", indexNote: "Eğitim örneği", base: 96, vol: 0.018, drift: 0.0002, pe: 11.2, pb: 1.85, dy: 3.8, de: 0.90, revG: 22, profitG: 16, ndEbitda: 1.6, liq: 92, intRatio: 9, nonComp: 3, note: "Telekom" },
    // --- Gayrimenkul ---
    { symbol: "EKGYO", name: "Emlak Konut GYO", type: "Gayrimenkul", sector: "Gayrimenkul", sectors: ["Gayrimenkul"], market: "BIST", indexNote: "Eğitim örneği · GYO", base: 18, vol: 0.02, drift: 0.0001, pe: 8.5, pb: 0.65, dy: 4.5, de: 0.50, revG: 5, profitG: 2, ndEbitda: 2.5, liq: 65, intRatio: 10, nonComp: 4, note: "Konut GYO" },
    { symbol: "GYO-H", name: "Helal GYO (örnek)", type: "Gayrimenkul", sector: "Gayrimenkul", sectors: ["Gayrimenkul"], market: "BIST", indexNote: "Eğitim örneği · GYO", base: 48, vol: 0.015, drift: 0.00018, pe: 10.8, pb: 0.82, dy: 4.2, de: 0.90, revG: 8, profitG: 6, ndEbitda: 2.0, liq: 30, intRatio: 4, nonComp: 2, note: "Kira odaklı örnek" },
    // --- Emtia / sabit benzeri ---
    { symbol: "ALTIN", name: "Gram Altın", type: "Emtia", sector: "Emtia", sectors: ["Emtia"], market: "Emtia", indexNote: "Eğitim örneği · emtia (ballpark Eyl 2026)", base: 6580, vol: 0.012, drift: 0.00035, pe: null, pb: null, dy: null, de: null, revG: null, profitG: null, ndEbitda: null, liq: 99, intRatio: null, nonComp: null, note: "Jeopolitik / enflasyon duyarlı" },
    { symbol: "GUMUS", name: "Gram Gümüş", type: "Emtia", sector: "Emtia", sectors: ["Emtia"], market: "Emtia", indexNote: "Eğitim örneği · emtia", base: 82, vol: 0.018, drift: 0.0002, pe: null, pb: null, dy: null, de: null, revG: null, profitG: null, ndEbitda: null, liq: 70, intRatio: null, nonComp: null, note: "Sanayi + yatırım" },
    { symbol: "SUKUK-TR", name: "Hazine Sukuk (örnek)", type: "Sukuk", sector: "Sabit benzeri", sectors: ["Sabit benzeri"], market: "Sabit", indexNote: "Eğitim örneği · sukuk", base: 103.2, vol: 0.004, drift: 0.00015, pe: null, pb: null, dy: null, de: null, revG: null, profitG: null, ndEbitda: null, liq: 60, intRatio: null, nonComp: null, note: "Dayanak / kâr payı" },
    { symbol: "KTL", name: "Katılım Hesabı TL", type: "Katılım", sector: "Sabit benzeri", sectors: ["Sabit benzeri"], market: "Banka", indexNote: "Eğitim örneği · katılım", base: 100, vol: 0.0015, drift: 0.00012, pe: null, pb: null, dy: null, de: null, revG: null, profitG: null, ndEbitda: null, liq: 50, intRatio: null, nonComp: null, note: "Kâr-zarar ortaklığı" },
    { symbol: "HYF", name: "Helal Hisse Fonu", type: "Fon", sector: "Fon", sectors: ["Fon"], market: "TEFAS örn.", indexNote: "Eğitim örneği · fon", base: 5.35, vol: 0.014, drift: 0.00022, pe: 15.0, pb: null, dy: null, de: null, revG: null, profitG: null, ndEbitda: null, liq: 75, intRatio: null, nonComp: null, note: "Çeşitlendirilmiş hisse" },
    { symbol: "SKF", name: "Sukuk Fonu", type: "Fon", sector: "Fon", sectors: ["Fon"], market: "TEFAS örn.", indexNote: "Eğitim örneği · fon", base: 2.35, vol: 0.005, drift: 0.00014, pe: null, pb: null, dy: null, de: null, revG: null, profitG: null, ndEbitda: null, liq: 55, intRatio: null, nonComp: null, note: "Düşük vol" },
  ];

  const TYPE_COLORS = {
    Emtia: "#f5c542", Sukuk: "#60a5fa", Katılım: "#2dd4a8",
    Hisse: "#a78bfa", Fon: "#34d399", Gayrimenkul: "#fb923c", Nakit: "#8b9bb8",
  };

  const TEMPLATES = [
    {
      id: "muhafazakar",
      badge: "Düşük risk",
      name: "Muhafazakâr öğretici",
      desc: "Sukuk + katılım + altın ağırlıklı. Dalgalanma düşük; getiri de sınırlı kalabilir. Başlangıç psikolojisi için ideal.",
      capital: 100000,
      alloc: [
        { symbol: "SUKUK-TR", weight: 0.35 },
        { symbol: "KTL", weight: 0.30 },
        { symbol: "ALTIN", weight: 0.20 },
        { symbol: "SKF", weight: 0.15 },
      ],
    },
    {
      id: "dengeli",
      badge: "Orta risk",
      name: "Dengeli öğretici",
      desc: "İstikrar katmanı + filtrelenmiş hisse/fon. F/K çeşitliliği ile öğrenme odaklı (ASELS yüksek F/K, KCHOL daha düşük).",
      capital: 100000,
      alloc: [
        { symbol: "SUKUK-TR", weight: 0.20 },
        { symbol: "HYF", weight: 0.20 },
        { symbol: "ALTIN", weight: 0.15 },
        { symbol: "ASELS", weight: 0.15 },
        { symbol: "ASTOR", weight: 0.15 },
        { symbol: "KCHOL", weight: 0.15 },
      ],
    },
    {
      id: "buyume",
      badge: "Yüksek risk",
      name: "Büyüme öğretici",
      desc: "Hisse ağırlıklı. Değer gün içinde belirgin artıp azalabilir — psikolojiyi ve beta’yı görmek için.",
      capital: 100000,
      alloc: [
        { symbol: "BIMAS", weight: 0.20 },
        { symbol: "ASTOR", weight: 0.18 },
        { symbol: "ASELS", weight: 0.17 },
        { symbol: "THYAO", weight: 0.15 },
        { symbol: "SMRTG", weight: 0.10 },
        { symbol: "HYF", weight: 0.10 },
        { symbol: "ALTIN", weight: 0.10 },
      ],
    },
    {
      id: "enerji",
      badge: "Sektör odaklı",
      name: "Enerji branşı öğretici",
      desc: "ASTOR, yenilenebilir ve dağıtım örnekleriyle enerji branşını simüle et. Yüksek volatilite; gerçek para yok.",
      capital: 100000,
      alloc: [
        { symbol: "ASTOR", weight: 0.25 },
        { symbol: "ENJSA", weight: 0.20 },
        { symbol: "AKFYE", weight: 0.15 },
        { symbol: "SMRTG", weight: 0.15 },
        { symbol: "TUPRS", weight: 0.15 },
        { symbol: "ALTIN", weight: 0.10 },
      ],
    },
    {
      id: "katilim-core",
      badge: "Katılım çekirdek",
      name: "Katılım çekirdek öğretici",
      desc: "Sukuk + katılım hesabı + helal hisse fonu + sınırlı altın. Screening ve sabit benzeri ürünleri yan yana görmek için.",
      capital: 100000,
      alloc: [
        { symbol: "SUKUK-TR", weight: 0.28 },
        { symbol: "KTL", weight: 0.22 },
        { symbol: "HYF", weight: 0.25 },
        { symbol: "SKF", weight: 0.10 },
        { symbol: "ALTIN", weight: 0.15 },
      ],
    },
    {
      id: "temettu",
      badge: "Nakit akışı",
      name: "Temettü / nakit öğretici",
      desc: "Örnek temettü verimi yüksek hisseler + GYO + sukuk. DY tek başına al sinyali değildir — sürdürülebilirlik brief’i ile oku.",
      capital: 100000,
      alloc: [
        { symbol: "TUPRS", weight: 0.18 },
        { symbol: "FROTO", weight: 0.16 },
        { symbol: "TCELL", weight: 0.14 },
        { symbol: "KCHOL", weight: 0.14 },
        { symbol: "EKGYO", weight: 0.14 },
        { symbol: "SUKUK-TR", weight: 0.24 },
      ],
    },
    {
      id: "savunma-tech",
      badge: "Tema",
      name: "Savunma & teknoloji öğretici",
      desc: "ASELS + otomasyon/enerji ekipmanı teması. Yüksek F/K ve sipariş haberlerine duyarlılık — kovalama tuzağını simüle et.",
      capital: 100000,
      alloc: [
        { symbol: "ASELS", weight: 0.30 },
        { symbol: "KONTR", weight: 0.20 },
        { symbol: "ASTOR", weight: 0.20 },
        { symbol: "HYF", weight: 0.15 },
        { symbol: "ALTIN", weight: 0.15 },
      ],
    },
    {
      id: "cesitli-sektor",
      badge: "Çeşitlendirme",
      name: "Çok sektör öğretici",
      desc: "Enerji, gıda, sanayi, telekom, emtia ve sukuk — tek temaya yığılmadan branş riskini görmek için.",
      capital: 120000,
      alloc: [
        { symbol: "ENJSA", weight: 0.12 },
        { symbol: "BIMAS", weight: 0.14 },
        { symbol: "EREGL", weight: 0.10 },
        { symbol: "TCELL", weight: 0.12 },
        { symbol: "FROTO", weight: 0.12 },
        { symbol: "SAHOL", weight: 0.12 },
        { symbol: "ALTIN", weight: 0.14 },
        { symbol: "SUKUK-TR", weight: 0.14 },
      ],
    },
  ];

  /** Eğitim senaryoları: geçmiş birim fiyat → bugünkü demo fiyat · horizon: monthly|6m|yearly|multi */
  const SCENARIOS = [
    {
      id: "gold-1m",
      badge: "1 ay",
      horizon: "monthly",
      title: "Kısa vade — altın güvenli liman dalgası",
      context: "Jeopolitik manşetten sonra 1 aylık pencerede gram altın hareketi (simülasyon illüstrasyonu).",
      symbol: "ALTIN",
      entryDate: "2026-08-28",
      entryPrice: 6200,
      unit: "1 gram",
      expertAngle: "Kısa vadede haber beta’sı yüksektir; panik alımı maliyetlidir.",
      metricLink: "Emtialarda F/K yok; volatilite ve portföy ağırlığına bak.",
    },
    {
      id: "astor-1m",
      badge: "1 ay",
      horizon: "monthly",
      title: "Kısa vade — ASTOR haber volatilitesi",
      context: "Sipariş veya itibar manşetinin ardından yüksek beta hisse 1 ayda sert salınabilir (eğitim).",
      symbol: "ASTOR",
      entryDate: "2026-08-25",
      entryPrice: 195,
      unit: "1 lot (örnek)",
      expertAngle: "Lynch: işi anla. Marks: aşırı tepki — haber ertesi kovalama sık hatadır.",
      metricLink: "Yüksek F/K/PD/DD + haber şoku → sert fiyat. Resmî katılım listesi dönemsel.",
    },
    {
      id: "sukuk-6m",
      badge: "6 ay",
      horizon: "6m",
      title: "Orta vade — sukuk / kâr payı ortamı",
      context: "Faiz beklentileri kayarken sukuk fiyat/talep dinamikleri 6 ayda yeniden şekillenir.",
      symbol: "SUKUK-TR",
      entryDate: "2026-03-15",
      entryPrice: 100.8,
      unit: "1 adet (örnek)",
      expertAngle: "Bogle: maliyeti düşük, anlaşılır ürün. El-Erian: rejim değişimini kabul et.",
      metricLink: "Sukuk’ta F/K yerine dayanak, vade ve kâr payı şeffaflığı kritik.",
    },
    {
      id: "enjsa-6m",
      badge: "6 ay",
      horizon: "6m",
      title: "Orta vade — enerji dağıtım + endeks akışı",
      context: "Katılım listesine ekleme anlatısı ve operasyonel sonuçlar 6 aylık pencerede birleşebilir (örnek eğitim).",
      symbol: "ENJSA",
      entryDate: "2026-03-01",
      entryPrice: 55,
      unit: "1 lot (örnek)",
      expertAngle: "Marks: akış kaynaklı yükseliş geçici olabilir. Bogle: sürece bak.",
      metricLink: "F/K ~ sektör medyanı ile karşılaştır; borç/EBITDA ve faiz oranı screening’e girer.",
    },
    {
      id: "bim-1y",
      badge: "1 yıl",
      horizon: "yearly",
      title: "Yıllık — perakende büyüme F/K",
      context: "İstikrarlı perakende büyümesinde yatırımcıların yüksek F/K ödemeyi sürdürdüğü yıllık pencere.",
      symbol: "BIMAS",
      entryDate: "2025-09-15",
      entryPrice: 340,
      unit: "1 lot (örnek)",
      expertAngle: "Lynch: bildiğin işletme. Munger: pahalı büyüme de hata olabilir.",
      metricLink: "Yüksek F/K = büyüme fiyatlanmış; hayal kırıklığında sert düşer. Gelir büyümesi ile çapraz kontrol.",
    },
    {
      id: "thy-1y",
      badge: "1 yıl",
      horizon: "yearly",
      title: "Yıllık — havacılık toparlanma / borç",
      context: "Talep toparlanması anlatısı ile düşük F/K + yüksek kaldıraç tartışması bir arada.",
      symbol: "THYAO",
      entryDate: "2025-09-20",
      entryPrice: 210,
      unit: "1 lot (örnek)",
      expertAngle: "Buffett: iş modelini anla. Graham: düşük F/K tek başına yetmez (borç!).",
      metricLink: "Düşük F/K + yüksek net borç/EBITDA → ‘ucuz’ görünen riskli olabilir.",
    },
    {
      id: "gold-2020",
      badge: "Çok yıllı",
      horizon: "multi",
      title: "Pandemi dönemi — altın güvenli liman anlatısı",
      context: "Merkez bankası genişlemesi ve belirsizlik döneminde altının ‘koruma’ aracı olarak öne çıktığı yıllar.",
      symbol: "ALTIN",
      entryDate: "2020-03-20",
      entryPrice: 320,
      unit: "1 gram",
      expertAngle: "Dalio / çeşitlendirme: rejim değişiminde tek varlık sınıfına bağlı kalmamak.",
      metricLink: "Emtialarda F/K yoktur; fırsat maliyeti ve volatiliteye bakılır.",
    },
    {
      id: "sukuk-2022",
      badge: "Çok yıllı",
      horizon: "multi",
      title: "Enflasyon ortamında sukuk / kâr payı arayışı",
      context: "Faiz ortamı sert değişirken faizsiz sabit getirili benzeri ürünlere ilgi arttı.",
      symbol: "SUKUK-TR",
      entryDate: "2022-06-15",
      entryPrice: 98.5,
      unit: "1 adet (örnek)",
      expertAngle: "Bogle: maliyeti düşük, anlaşılır ürünlerle ilerlemek.",
      metricLink: "Sukuk’ta F/K yerine dayanak, vade ve kâr payı şeffaflığı kritik.",
    },
    {
      id: "thy-2023",
      badge: "Çok yıllı",
      horizon: "multi",
      title: "Seyahat toparlanması — havacılık hissesi örneği",
      context: "Talep toparlanması anlatıları sonrası havacılıkta düşük F/K tartışmaları.",
      symbol: "THYAO",
      entryDate: "2023-01-10",
      entryPrice: 85,
      unit: "1 lot (örnek)",
      expertAngle: "Buffett: iş modelini anla. Graham: güvenlik marjı — düşük F/K tek başına yetmez (borç!).",
      metricLink: "Düşük F/K + yüksek borç/özkaynak → ‘ucuz’ görünen riskli olabilir.",
    },
    {
      id: "bim-2019",
      badge: "Çok yıllı",
      horizon: "multi",
      title: "Perakende büyüme — yüksek F/K toleransı",
      context: "İstikrarlı büyüme hikâyelerinde yatırımcıların daha yüksek F/K ödediği dönemler.",
      symbol: "BIMAS",
      entryDate: "2019-05-02",
      entryPrice: 55,
      unit: "1 lot (örnek)",
      expertAngle: "Lynch: bildiğin işletme. Munger: pahalı büyüme de hata olabilir.",
      metricLink: "Yüksek F/K, büyüme beklentisi fiyatlanmış demektir; hayal kırıklığında sert düşer.",
    },
    {
      id: "eregl-cycle",
      badge: "Çok yıllı",
      horizon: "multi",
      title: "Döngüsel sektör — çelik zirve anlatısı",
      context: "Emtia döngüsünde kârların şiştiği dönemlerde F/K yanıltıcı derecede düşük görünebilir.",
      symbol: "EREGL",
      entryDate: "2021-08-01",
      entryPrice: 18,
      unit: "1 lot (örnek)",
      expertAngle: "Howard Marks: döngü bilinci — ‘bu sefer farklı’ tuzağı.",
      metricLink: "Döngüselde düşük F/K zirvede tuzak olabilir; PD/DD ve marjlara bak.",
    },
    {
      id: "astor-ipo",
      badge: "Çok yıllı",
      horizon: "multi",
      title: "Enerji ekipmanı — halka arz sonrası büyüme anlatısı",
      context: "ASTOR 2023 halka arzından sonra transformatör/enerji ekipmanı talebiyle öne çıktı; 2026’da yüksek volatilite ve dönemsel screening tartışmaları da gündemde. Simülasyon illüstrasyonudur.",
      symbol: "ASTOR",
      entryDate: "2023-01-18",
      entryPrice: 12.5,
      unit: "1 lot (örnek)",
      expertAngle: "Lynch: sektörü tanı. Marks: yüksek beta’da aşırı tepki; tek hisseye aşırı yüklenme.",
      metricLink: "Yüksek F/K veya PD/DD + haber şoku → sert fiyat hareketi. Resmî katılım listesi dönemsel değişir.",
    },
    {
      id: "gold-2026",
      badge: "Çok yıllı",
      horizon: "multi",
      title: "Yüksek ons / TL altın — güvenli liman yeniden fiyatlanır",
      context: "2026 sonbaharinda gram altın ballpark ~6.500+ TL bandı (simülasyon tabanı). Enflasyon ve jeopolitik anlatıları altını portföyde ‘koruma katmanı’ olarak tartıştı.",
      symbol: "ALTIN",
      entryDate: "2024-01-15",
      entryPrice: 2100,
      unit: "1 gram",
      expertAngle: "Dalio: rejim değişiminde çeşitlendir. Bogle: emtia trade’ini abartma.",
      metricLink: "Emtialarda F/K yok; fırsat maliyeti, volatilite ve portföy ağırlığına bak.",
    },
    {
      id: "asels-multi",
      badge: "Çok yıllı",
      horizon: "multi",
      title: "Savunma elektroniği — uzun vade sipariş anlatısı",
      context: "Çok yıllı savunma sipariş defteri ve teknoloji yatırımı teması (eğitim senaryosu).",
      symbol: "ASELS",
      entryDate: "2021-06-01",
      entryPrice: 45,
      unit: "1 lot (örnek)",
      expertAngle: "Buffett: kaliteli iş + uzun ufuk. Ama yüksek F/K’yı büyüme ile gerekçelendirmek gerekir.",
      metricLink: "F/K sektör medyanının üstünde olabilir; gelir/kâr büyümesi ve net borç/EBITDA ile oku.",
    },
  ];

  const NEWS_IMPACTS = [
    {
      id: "war-gold",
      cat: "jeopolitik",
      when: "Tarihsel örüntü · örn. 2022 ve benzeri gerilim dönemleri",
      headline: "Jeopolitik gerilim / savaş riski artarsa",
      summary: "Belirsizlik yükselince yatırımcılar güvenli liman arayışına gider. Altın tarihsel olarak bu dönemlerde talep görür; hisse ve riskli varlıklar baskı altında kalabilir.",
      targets: [
        { symbol: "ALTIN", direction: "up", level: 75, effect: "Genelde güçlenir (güvenli liman)" },
        { symbol: "THYAO", direction: "down", level: 55, effect: "Havacılık / risk iştahı zayıflayabilir" },
        { symbol: "HYF", direction: "down", level: 40, effect: "Hisse fonları riskten kaçışla gerileyebilir" },
      ],
      decide: "Neye göre düşünülür: olayın süresi, riskten kaçışın boyutu, portföyünde altın/hisse ağırlığı. Tek haberle tüm sermayeyi taşımak uzmanların kaçındığı tepkisel hatadır (Marks: döngü/aşırı tepki).",
      expert: "Dalio: rejim değişiminde çeşitlendir. Buffett: panikte anlamadığın şeye koşma.",
      history: "Geçmişte büyük jeopolitik şoklarda altın kısa vadede yükselmiş; hisse endeksleri önce düşüp sonra ayrışmıştır. Her kriz aynı değildir.",
    },
    {
      id: "deal-stock",
      cat: "sirket",
      when: "Şirket özel haber · anlaşma / ihale",
      headline: "Bir şirket büyük anlaşma veya ihale kazandığını açıklarsa",
      summary: "Beklenen nakit akışı artarsa hisse fiyatı genelde olumlu tepki verir. Etki; anlaşmanın boyutu, kâr marjı ve zaten fiyata girip girmediğine bağlıdır.",
      targets: [
        { symbol: "ASELS", direction: "up", level: 70, effect: "Savunma/ihalelerde pozitif örnek tepki" },
        { symbol: "ENKAI", direction: "up", level: 65, effect: "Büyük proje müjdesi fiyatlanabilir" },
        { symbol: "FROTO", direction: "up", level: 50, effect: "İhracat / kapasite anlaşmaları destekler" },
      ],
      decide: "Neye göre: anlaşma tutarı / yıllık kâra oranı, süre, iptal riski, F/K zaten yüksek mi? ‘Alınır alınmaz yükselir’ garantisi yok; çoğu zaman haber kısmen fiyatlanmıştır (Lynch: işi anla, abartıyı tart).",
      expert: "Graham: güvenlik marjı — haber sonrası aşırı yükselişte kovalama. Munger: tek habere aşırı yüklenme.",
      history: "BIST’te ihale/anlaşma günlerinde ilgili hisselerde sert açılışlar görülür; ertesi günlerde kâr realizasyonu sık görülür.",
    },
    {
      id: "rate-sukuk",
      cat: "makro",
      when: "Makro · faiz / enflasyon açıklamaları",
      headline: "Politika faizi veya enflasyon sürprizi olursa",
      summary: "Faiz beklentileri değişince tahvil benzeri ürünler ve büyüme hisseleri etkilenir. Sukuk ve katılım ürünleri de dolaylı fiyatlanır; mekanizma faiz kuponu değil, alternatif getiri ve risk iştahıdır.",
      targets: [
        { symbol: "SUKUK-TR", direction: "mixed", level: 55, effect: "Getiri alternatifleri değişince fiyat/talep kayar" },
        { symbol: "KTL", direction: "mixed", level: 45, effect: "Kâr payı beklentisi banka finansmanına bağlı" },
        { symbol: "BIMAS", direction: "mixed", level: 50, effect: "Büyüme hisseleri iskonto oranına duyarlı" },
      ],
      decide: "Neye göre: sürprizin yönü (sıkılaşma mı gevşeme mi), vade, enflasyonun şirket marjına etkisi. Helal çerçevede ‘faiz yükseldi diye otomatik al/sat’ değil; portföy amacına bakılır (Bogle: sade ve uzun vadeli).",
      expert: "El-Erian: rejim değişimini kabul et. Bogle: gürültüye tepki maliyet doğurur.",
      history: "Sıkılaşma dönemlerinde yüksek F/K’lı büyüme hisseleri baskı görmüş; sabit getirili benzeri ürünlerde yeniden fiyatlama yaşanmıştır.",
    },
    {
      id: "oil-tuprs",
      cat: "emtia",
      when: "Emtia · petrol şoku",
      headline: "Petrol fiyatları sert yükselirse / düşerse",
      summary: "Rafineri ve taşımacılık maliyetleri, enflasyon ve dış ticaret dengesi etkilenir. TUPRS gibi rafineriler marj yapısına göre ayrışır; havacılık maliyet tarafında zorlanır.",
      targets: [
        { symbol: "TUPRS", direction: "mixed", level: 70, effect: "Rafineri payı / stok etkisine göre ±" },
        { symbol: "THYAO", direction: "down", level: 60, effect: "Yakıt maliyeti baskısı (yükselen petrolde)" },
        { symbol: "ALTIN", direction: "up", level: 35, effect: "Enflasyon endişesiyle destek görebilir" },
      ],
      decide: "Neye göre: şok arz mı talep mi, geçici mi kalıcı mı, şirketin hedging’i var mı? Döngüsel F/K’ya aldanma (Marks).",
      expert: "Marks: döngü bilinci. Buffett: anlayamadığın emtia trade’inden uzak dur.",
      history: "Petrol şoklarında ulaşım ve kimya ayrışır; tek yönlü ‘herkese zarar’ varsayımı çoğu zaman yanlıştır.",
    },
    {
      id: "covid-travel",
      cat: "sektor",
      when: "Geçmiş · 2020 pandemi",
      headline: "Seyahat kısıtlaması / pandemi tipi şok",
      summary: "Havacılık ve turizm talebi çökerken gıda perakende ve bazı dijital hizmetler görece dayanıklı kalmıştır. Helal panelde THYAO vs BIMAS ayrışması öğretici örnektir.",
      targets: [
        { symbol: "THYAO", direction: "down", level: 85, effect: "2020’de sert düşüş örüntüsü" },
        { symbol: "BIMAS", direction: "up", level: 45, effect: "Temel tüketim görece dayanıklı" },
        { symbol: "ALTIN", direction: "up", level: 60, effect: "Belirsizlikte talep" },
      ],
      decide: "Neye göre: şokun sektör nakit akışını kesip kesmediği, bilanço gücü (borç), toparlanma süresi. Panikte satmak / zirvede kovalamak sık hatadır.",
      expert: "Buffett: korku varken kaliteli işlere soğukkanlı bak (ama kaldıraçlı bilançoya dikkat). Graham: marj of safety.",
      history: "2020’de havacılık dibe inmiş, sonraki yıllarda toparlanma trade’i oluşmuştur — zamanlama zordur.",
    },
    {
      id: "export-auto",
      cat: "sektor",
      when: "Sektör · ihracat / kur",
      headline: "İhracatçı otomotivde güçlü sipariş veya kur etkisi",
      summary: "Geliri döviz ağırlıklı şirketler kur ve Avrupa talebine duyarlıdır. FROTO / TOASO bu sınıfın BIST örnekleridir.",
      targets: [
        { symbol: "FROTO", direction: "up", level: 60, effect: "Güçlü ihracat / kur + etki" },
        { symbol: "TOASO", direction: "up", level: 55, effect: "Benzer sektör beta’sı" },
        { symbol: "EREGL", direction: "mixed", level: 40, effect: "Sanayi talebi dolaylı etkilenir" },
      ],
      decide: "Neye göre: Avrupa PMI, kur seviyesi, tedarik zinciri. Tek günlük kur hareketine tüm portföyü bağlama.",
      expert: "Lynch: sektörü tanı. Dalio: tek ülke/sektör riskini çeşitlendir.",
      history: "Kur şoklarında ihracatçı hisseler kısa vadede ayrışmış; talep zayıfsa kur yetmemiştir.",
    },
    {
      id: "housing-gyo",
      cat: "makro",
      when: "Makro · konut / kredi",
      headline: "Konut satışları veya kredi koşulları değişirse",
      summary: "GYO ve çimento/inşaat zinciri etkilenir. Helal GYO’larda ek olarak faiz geliri ve kiracı profili screening konusu olur.",
      targets: [
        { symbol: "EKGYO", direction: "mixed", level: 65, effect: "Satış/kredi haberine yüksek beta" },
        { symbol: "CIMSA", direction: "mixed", level: 50, effect: "İnşaat talebi yansıması" },
        { symbol: "GYO-H", direction: "mixed", level: 55, effect: "Kira / doluluk beklentisi" },
      ],
      decide: "Neye göre: faiz/kredi erişimi, stok, PD/DD. ‘Konut hep yükselir’ varsayımı gharar’a yakın aşırı güvendir.",
      expert: "Bogle: basitlik. Munger: aşırı borçlu gayrimenkul yapılarından kaçın.",
      history: "Kredi genişlemesi dönemlerinde GYO’lar ralli yapmış; sıkılaşmada iskonto derinleşmiştir.",
    },
    {
      id: "dividend-day",
      cat: "sirket",
      when: "Şirket · temettü / bilanço",
      headline: "Yüksek temettü veya güçlü bilanço açıklaması",
      summary: "Nakit dağıtımı ve kârlılık sürprizleri fiyatı destekleyebilir. Helal yatırımcı için temettünün kaynağı (faiz geliri payı) da önemlidir.",
      targets: [
        { symbol: "KCHOL", direction: "up", level: 45, effect: "Holding temettü hikâyesi" },
        { symbol: "SISE", direction: "up", level: 40, effect: "Bilanço / temettü tepkisi" },
        { symbol: "TCELL", direction: "up", level: 40, effect: "Nakit yaratımı olumlu algı" },
      ],
      decide: "Neye göre: temettü verimi sürdürülebilir mi, borç azalacak mı, one-off mu? Yüksek DY tek başına al sinyali değildir.",
      expert: "Graham: işin değeri. Buffett: dağıtılmayan kârın nereye gittiği.",
      history: "Temettü günlerinde kısa vadeli alım görülür; uzun vadede iş kalitesi fiyatı belirler.",
    },
    {
      id: "katilim-rebalance-2026",
      cat: "makro",
      when: "Eyl–Eki 2026 · Katılım endeksi dönemsel güncelleme",
      headline: "BIST Katılım listelerinde dönemsel giriş/çıkış açıklanırsa",
      summary: "1 Ekim 2026–30 Nisan 2027 döneminde Katılım 30/50/100 bileşenleri yenilenir. Fonlar ve ‘katılım filtresi’ izleyen yatırımcılar yeniden dengeleme yapabilir; ilgili hisselerde kısa vadeli akış etkisi görülür. Bu site resmî üyelik iddiası taşımaz.",
      targets: [
        { symbol: "ENJSA", direction: "up", level: 55, effect: "Listeye ekleme anlatısı talep yaratabilir" },
        { symbol: "KCAER", direction: "up", level: 50, effect: "Katılım 30’a giriş akışı (örnek)" },
        { symbol: "YEOTK", direction: "down", level: 55, effect: "Listeden çıkışta pasif fon satışı baskısı" },
        { symbol: "HYF", direction: "mixed", level: 40, effect: "Fon portföyleri yeniden ağırlıklandırır" },
      ],
      decide: "Neye göre: resmî BIST duyurusu, fon büyüklüğü, zaten fiyata girip girmediği. ‘Endekse girdi = al’ garantisi değildir; screening üç ayda bir değişir.",
      expert: "Bogle: süreç ve maliyete bak. Marks: akış kaynaklı yükseliş geçici olabilir.",
      history: "Önceki dönemsel güncellemelerde giriş/çıkış hisselerinde açılış volatilitesi artmış; birkaç seans sonra ayrışma azalmıştır.",
    },
    {
      id: "grid-transformer",
      cat: "sektor",
      when: "Sektör · şebeke / enerji ekipmanı (2025–26)",
      headline: "Şebeke yatırımı veya transformatör talebi güçlenirse",
      summary: "Elektrifikasyon, yenilenebilir bağlantı ve şebeke yenileme anlatıları enerji ekipmanı üreticilerini öne çıkarır. ASTOR bu sınıfın BIST’teki popüler eğitim örneklerindendir; fiyat yüksek beta ile hareket eder.",
      targets: [
        { symbol: "ASTOR", direction: "up", level: 70, effect: "Sipariş / kapasite haberine yüksek duyarlılık" },
        { symbol: "GESAN", direction: "up", level: 55, effect: "Elektrik taahhüt zinciri desteklenebilir" },
        { symbol: "EUPWR", direction: "up", level: 50, effect: "Enerji otomasyon talebi" },
        { symbol: "SMRTG", direction: "up", level: 45, effect: "YE ekipmanı ile korelasyon" },
      ],
      decide: "Neye göre: sipariş defteri, marj, ihracat, borçluluk, F/K zaten yüksek mi? Tek günlük taban/tavan kovalamak sık hatadır.",
      expert: "Lynch: işi anla. Graham: güvenlik marjı — haber sonrası aşırı yükselişte kovalama.",
      history: "2023–26’da enerji ekipmanı temasında sert ralliler ve düzeltmeler peş peşe gelmiştir; volatilite eğitim için öğreticidir.",
    },
    {
      id: "astor-governance",
      cat: "sirket",
      when: "Şirket özel · itibar / soruşturma haberleri (ör. Eyl 2026)",
      headline: "Şirket veya yöneticilere dair olumsuz haber / soruşturma çıkarsa",
      summary: "İtibar ve yönetişim şokları likiditeyi ve risk primini anında değiştirir. ASTOR örneğinde 2026 sonbaharinda sert satış dalgaları görülmüştür (simülasyon tabanı ballpark). Helal çerçevede de şeffaflık ve yönetişim brief konusudur.",
      targets: [
        { symbol: "ASTOR", direction: "down", level: 80, effect: "Haber günlerinde taban / yüksek vol olası" },
        { symbol: "HYF", direction: "down", level: 25, effect: "Fonlarda ağırlık varsa dolaylı baskı" },
        { symbol: "ALTIN", direction: "up", level: 30, effect: "Riskten kaçışta sınırlı destek" },
      ],
      decide: "Neye göre: haberin doğrulanabilirliği, bilanço etkisi, portföy ağırlığı. Panikte tüm sermayeyi tek yöne taşımak uzmanların kaçındığı tepkidir.",
      expert: "Munger: aptalca hatalardan kaçın. Buffett: anlamadığın paniğe koşma — ama kaldıraçlı tek hisse riskini de bil.",
      history: "BIST’te soruşturma/itibar haberlerinde ilgili hissede üst üste günlerce satış baskısı görülmesi sık örüntüdür.",
    },
    {
      id: "renewable-policy",
      cat: "sektor",
      when: "Sektör · YE teşvik / ihale",
      headline: "Yenilenebilir enerji ihalesi veya teşvik açıklanırsa",
      summary: "Kapasite ihaleleri ve YE politikaları güneş/rüzgâr ekipmanı ve üretim şirketlerini etkiler. SMRTG, ALFAS, AKFYE bu temanın eğitim örnekleridir.",
      targets: [
        { symbol: "SMRTG", direction: "up", level: 60, effect: "Güneş ekipmanı talebi" },
        { symbol: "ALFAS", direction: "up", level: 58, effect: "Solar tedarik zinciri" },
        { symbol: "AKFYE", direction: "up", level: 55, effect: "Üretim kapasitesi hikâyesi" },
        { symbol: "ENJSA", direction: "mixed", level: 35, effect: "Dağıtım tarafı dolaylı" },
      ],
      decide: "Neye göre: ihale ölçeği, marj, finansman (faiz yükü screening’e de girer), zaten fiyatlanmış mı?",
      expert: "Dalio: tek tema riskini çeşitlendir. Bogle: politika gürültüsüne aşırı tepki maliyet doğurur.",
      history: "YE duyurularında ilgili hisselerde kısa vadeli sıçrama; uygulama gecikince geri verme sık görülür.",
    },
    {
      id: "bist-riskoff-2026",
      cat: "makro",
      when: "Makro · Eyl 2026 riskten kaçış örneği",
      headline: "BIST genelinde risk iştahı zayıflarsa (geniş satış)",
      summary: "Geniş endeks düşüşlerinde yüksek beta hisseler (enerji ekipmanı, büyüme) daha sert geriler; sukuk/katılım ve altın görece dayanıklı kalabilir. Eğitim paneli bu ayrışmayı görmek içindir.",
      targets: [
        { symbol: "ASTOR", direction: "down", level: 65, effect: "Yüksek beta · sert geri çekilme" },
        { symbol: "ASELS", direction: "down", level: 45, effect: "Likit büyük hisse de baskılanır" },
        { symbol: "SUKUK-TR", direction: "up", level: 35, effect: "Göreli sığınak arayışı" },
        { symbol: "ALTIN", direction: "up", level: 50, effect: "Güvenli liman talebi" },
      ],
      decide: "Neye göre: şokun süresi, nakit ihtiyacı, çeşitlendirme. ‘Dip al’ zamanlaması zordur; portföy amacına bak.",
      expert: "Marks: sarkaç. Buffett: kaliteli iş + güvenlik marjı (ama kaldıraçlı bilançoya dikkat).",
      history: "2026 sonbaharinda geniş satış günlerinde beta ayrışması belirginleşmiştir (öğretici örüntü).",
    },
    {
      id: "astor-us-deal",
      cat: "sirket",
      when: "Eğitim senaryosu · ABD / çok milyar $ anlaşma çerçevesi (simülasyon)",
      headline: "ASTOR — ABD’de çok milyar dolarlık anlaşma manşeti (eğitim senaryosu)",
      summary: "Öğretici çerçeve: Bir enerji ekipmanı üreticisinin ABD’de büyük ölçekli (çok milyar $) sipariş/anlaşma açıkladığı varsayılsın. Piyasa genelde beklenen nakit akışı ve kapasite kullanımını yeniden fiyatlar; yüksek beta hisselerde açılışta yukarı yönlü tepki sık örüntüdür. Bu bir simülasyon senaryosudur — gerçek emir, tavsiye veya garanti değildir.",
      targets: [
        { symbol: "ASTOR", direction: "up", level: 78, effect: "Anlaşma boyutu / yıllık kâra oranı yüksekse kısa vadede yukarı tepki olası (eğitim)" },
        { symbol: "GESAN", direction: "up", level: 40, effect: "Aynı tema zincirinde dolaylı pozitif algı" },
        { symbol: "EUPWR", direction: "up", level: 35, effect: "Enerji ekipmanı teması yayılabilir" },
        { symbol: "HYF", direction: "up", level: 25, effect: "Fonlarda ağırlık varsa sınırlı destek" },
      ],
      decide: "Neye göre: tutarın yıllık kâra oranı, süre, iptal/ceza maddeleri, finansman, F/K ve PD/DD zaten yüksek mi, haber kısmen fiyatlanmış mı? ‘Alınır alınmaz yükselir’ garantisi yoktur; çoğu zaman kâr realizasyonu da görülür.",
      expert: "Lynch: işi ve marjı anla. Graham: haber sonrası aşırı yükselişte kovalama. Marks: aşırı tepki.",
      history: "BIST’te büyük ihracat/anlaşma günlerinde ilgili hissede sert açılış + sonraki seanslarda düzeltme sık örüntüdür. ABD ölçeği anlatısı volatiliteyi büyütür — eğitim için öğreticidir.",
    },
    {
      id: "old-taper-2013",
      cat: "makro",
      when: "Tarihsel · 2013 ‘taper tantrum’ örüntüsü",
      headline: "Küresel likidite sıkılaşması sinyali (eski önemli örnek)",
      summary: "2013’te Fed’in tahvil alımını azaltacağı beklentisi gelişmekte olan ülke varlıklarında satış dalgası yaratmıştı. Bugün de ‘likidite rejim değişimi’ manşetleri benzer kanalları hatırlatır — birebir tekrar değildir.",
      targets: [
        { symbol: "THYAO", direction: "down", level: 50, effect: "Risk iştahı zayıflayınca yüksek beta baskılanır" },
        { symbol: "BIMAS", direction: "down", level: 35, effect: "Büyüme F/K’lı hisseler iskonto oranına duyarlı" },
        { symbol: "ALTIN", direction: "mixed", level: 45, effect: "Reel faiz beklentisine göre ±" },
        { symbol: "SUKUK-TR", direction: "mixed", level: 40, effect: "Alternatif getiri yeniden fiyatlanır" },
      ],
      decide: "Neye göre: sürprizin boyutu, yerel enflasyon/faiz, şirket borçluluğu. Eski kriz şablonunu yapıştırma.",
      expert: "El-Erian: rejim. Dalio: çeşitlendir. Bogle: gürültüye aşırı tepki maliyet doğurur.",
      history: "2013’te EM varlıkları ayrıştı; toparlanma süreleri ülkeye göre farklıydı.",
    },
    {
      id: "old-gfc-gold",
      cat: "jeopolitik",
      when: "Tarihsel · 2008–09 kriz örüntüsü",
      headline: "Küresel finansal stres — güvenli liman arayışı (eski önemli)",
      summary: "Sistemik stres dönemlerinde nakit ve altına talep artabilir; hisse ve kaldıraçlı bilançolar baskı görür. Helal çerçevede de likidite ve borçluluk brief konusudur.",
      targets: [
        { symbol: "ALTIN", direction: "up", level: 70, effect: "Güvenli liman talebi (örüntü)" },
        { symbol: "THYAO", direction: "down", level: 75, effect: "Talep + borç baskısı" },
        { symbol: "EREGL", direction: "down", level: 60, effect: "Döngüsel sanayi zayıflar" },
        { symbol: "KTL", direction: "up", level: 30, effect: "Göreli sığınak algısı (sınırlı)" },
      ],
      decide: "Neye göre: stresin bankacılık kanalı mı ticaret kanalı mı, kendi nakit ihtiyacın, çeşitlendirme. Dip zamanlaması zordur.",
      expert: "Buffett: korkuda kaliteli iş (ama kaldıraç!). Graham: marj of safety.",
      history: "2008’de önce her şey satıldı; altın sonraki toparlanmada öne çıktı — sıralama her krizde aynı değildir.",
    },
    {
      id: "liquidity-volume",
      cat: "sirket",
      when: "Piyasa mikro yapısı · 2026",
      headline: "Düşük likiditeli hissede büyük emir / haber olursa",
      summary: "Metrikler sekmesindeki ‘likidite skoru’ düşük olan sembollerde aynı haber daha sert fiyat hareketi üretebilir. Eğitim: hacim olmadan ‘ucuz’ görünen kağıt pahalıya mal olabilir.",
      targets: [
        { symbol: "ALFAS", direction: "mixed", level: 55, effect: "Düşük likidite → geniş spread / sert % " },
        { symbol: "PNSUT", direction: "mixed", level: 50, effect: "Haber + ince defter" },
        { symbol: "ASELS", direction: "mixed", level: 25, effect: "Yüksek likidite şoku emer" },
      ],
      decide: "Neye göre: ortalama hacim, spread, portföy ağırlığı. İnce hisseye aşırı yüklenme çıkışı zorlaştırır.",
      expert: "Munger: aptalca hatalardan kaçın. Bogle: işlem maliyetini unutma.",
      history: "BIST’te düşük hacimli hisselerde tek taraflı emirlerle tavan/taban zinciri görülmesi sık örüntüdür.",
    },

  ];

  const LEARN = [
    {
      id: "fk",
      badge: "Metrik",
      title: "F/K (Fiyat / Kazanç) oranı",
      body: "Şirketin piyasa değerinin yıllık kârına oranı. Düşük F/K ‘ucuz’ görünebilir; yüksek F/K büyüme beklentisi taşır.",
      detail: "BIST deneyimli yatırımcı bakışı (eğitim): F/K’yı sektörel medyan ile karşılaştır; döngüsel kârda (çelik, rafineri) düşük F/K zirvede tuzak olabilir. Helal screening’in yerini tutmaz. Metrikler sekmesinde örnek F/K ve sektör kıyası vardır — simülasyon ballpark’tır, tavsiye değildir.",
      jump: "metrics",
    },
    {
      id: "pddd",
      badge: "Metrik",
      title: "PD/DD (Fiyat / Defter)",
      body: "Piyasa değeri / özkaynak. 1’in altı iskonto gibi durabilir; varlık kalitesi ve getiri kritiktir.",
      detail: "Holding iskontosu (KCHOL/SAHOL) ve GYO’larda PD/DD sık konuşulur. Enflasyon muhasebesi defteri şişirebilir. PD/DD tek başına ‘ucuz’ demek değildir; ROE ve borç ile birlikte okunur.",
      jump: "metrics",
    },
    {
      id: "temettu-dy",
      badge: "Metrik",
      title: "Temettü verimi (DY)",
      body: "Yıllık temettü / fiyat. Yüksek DY cazip görünebilir; sürdürülebilirlik ve kaynak önemlidir.",
      detail: "Helal çerçevede temettünün faiz gelirinden gelip gelmediği de screening konusudur. One-off temettü veya aşırı borçlanarak dağıtım kırmızı bayrak olabilir. Metrikler tablosundaki DY örnek/simülasyondur.",
      jump: "metrics",
    },
    {
      id: "buyume-metrik",
      badge: "Metrik",
      title: "Gelir ve kâr büyümesi",
      body: "Yıllık gelir/kâr büyümesi, F/K’nın ‘haklı olup olmadığını’ tartmak için kullanılır.",
      detail: "Yüksek F/K ancak güçlü ve görünür büyüme ile gerekçelendirilmeye çalışılır; büyüme yavaşlarsa çoklu değerleme daralır. Simülasyondaki % büyüme alanları eğitim ballpark’ıdır.",
      jump: "metrics",
    },
    {
      id: "kaldirac",
      badge: "Metrik · Risk",
      title: "Net borç / EBITDA (kaldıraç)",
      body: "Faiz ve refinansman riskinin özeti. Yüksek kaldıraç + sıkılaşma = kırılganlık.",
      detail: "THYAO gibi örneklerde düşük F/K ile yüksek kaldıraç bir arada görülebilir — ‘ucuz’ yanılsaması. Katılım screening’de faiz yükümlülüğü / faiz oranı eşikleri de bu aileye yakındır (eğitim özeti; resmî eşik için BIST metodolojisi).",
      jump: "metrics",
    },
    {
      id: "likidite",
      badge: "Metrik",
      title: "Likidite / hacim",
      body: "Kolay alıp satabilmek maliyettir. İnce hissede haber şoku daha sert olur.",
      detail: "Metrikler sekmesindeki likidite skoru (0–100) eğitim amaçlıdır. Büyük emri düşük hacimli kağıda yığmak çıkışı zorlaştırır — portföy ağırlığı disiplinidir.",
      jump: "metrics",
    },
    {
      id: "helal-oran",
      badge: "Helal · Eğitim",
      title: "Faiz oranı & uygun olmayan gelir payı",
      body: "Katılım screening’de bilançodaki faiz ve haram/uygun olmayan gelir eşikleri dönemsel kontrol edilir.",
      detail: "Bu sitedeki ‘faiz oranı %’ ve ‘uygun olmayan gelir %’ alanları mock/eğitim ballpark’ıdır; resmî üyelik veya fetva değildir. Liste üç ayda bir değişebilir — Borsa İstanbul duyurusunu takip et.",
      jump: "briefs",
    },
    {
      id: "borc",
      badge: "Metrik · Helal",
      title: "Borç / özkaynak",
      body: "Faiz yükümlülüğü yüksek şirketler hem finansal risk hem şer’i screening açısından daha sıkı incelenir.",
      detail: "Borç/özkaynak ile net borç/EBITDA farklı şeyler söyler: biri sermaye yapısı, diğeri borç ödeme gücü. İkisini birlikte oku.",
      jump: "briefs",
    },
    {
      id: "volatilite",
      badge: "Portföy",
      title: "Neden değer artar ve azalır?",
      body: "Eklediğin her aracın kendi volatilitesi vardır. Hisse ağırlıklı portföy gün içinde daha çok iner-çıkar; sukuk/katılım daha düz seyreder.",
      detail: "‘Simüle hareket üret’ düğmesi ve otomatik tick, fiyat salınımını görmen için vardır. Gerçek para yoktur. Üst bardaki Telefon görünümü ile dar ekranda da dene.",
      jump: "portfolio",
    },
    {
      id: "senaryo",
      badge: "Öğren",
      title: "Geçmiş senaryo ne işe yarar?",
      body: "‘O gün X fiyattan alsaydım’ sorusu, anlatı ile sonuç arasındaki farkı gösterir. Gelecek garantisi değildir.",
      detail: "Artık aylık, 6 aylık, yıllık ve çok yıllı ufuklar var. Kısa ufuk haber beta’sını; uzun ufuk iş kalitesi ve döngüyü öğretir. Illüstrasyondur, backtest değildir.",
      jump: "scenarios",
    },
    {
      id: "cesit",
      badge: "Pratik",
      title: "Öğretici portföy şablonları",
      body: "Muhafazakâr / dengeli / büyüme / enerji / temettü / savunma / çok sektör şablonları risk psikolojisini denemek içindir.",
      detail: "Tek tıkla kopya portföy oluşur; nakit simülasyondan düşülür. Gerçek para yatırma yoktur. Şablonlar ‘ideal portföy’ iddiası taşımaz.",
      jump: "templates",
    },
    {
      id: "haber",
      badge: "Haber",
      title: "Haberler fiyatı nasıl etkiler?",
      body: "Savaş riski → altın; büyük anlaşma → ilgili hisse; faiz sürprizi → sukuk/fon. Eski önemli + yeni senaryolar karışık listelenir.",
      detail: "ASTOR ABD çok milyar $ anlaşma senaryosu eğitim içindir: potansiyel yukarı tepki çerçevesi + kovalama uyarısı. Garanti veya tavsiye değildir.",
      jump: "news",
    },
    {
      id: "bist",
      badge: "BIST",
      title: "Katılım-benzeri eğitim paneli",
      body: "Eğitim amaçlı örnek semboller ve İslami araçlar tek panelde; simüle fiyat ile izlenir.",
      detail: "Panel üstündeki ‘BIST deneyimli yatırımcı özeti’ kartları F/K, kaldıraç, screening ve haber okuma alışkanlığını özetler. Resmi screening veya endeks üyeliği iddiası değildir.",
      jump: "bist",
    },
    {
      id: "sektor",
      badge: "Branş",
      title: "Neden sektör / branş bakılır?",
      body: "Aynı haber farklı branşları ters yönde etkileyebilir. Ana sektör adına tıklayınca yalnız o sektör filtrelenir; Tümü temizler.",
      detail: "Birden fazla branşa yayılan şirketler ‘Çok sektörlü’ grubundadır (holding, taahhüt+enerji vb.). Resmî BIST sektör kodu iddiası yoktur.",
      jump: "sectors",
    },
    {
      id: "astor-learn",
      badge: "Örnek hisse",
      title: "ASTOR neden listede?",
      body: "Astor Enerji, enerji ekipmanı temasında sık izlenen bir BIST örneğidir. Yüksek volatilite eğitimi için uygundur.",
      detail: "Resmî katılım endeksi üyeliği dönemsel değişir. ABD anlaşma senaryosu ve yönetişim haberi briefleri ‘ne düzeyde / neye göre’ çerçevesini göstermek içindir — yatırım tavsiyesi değildir.",
      jump: "sectors",
    },
    {
      id: "screening-2026",
      badge: "Helal · 2026",
      title: "Katılım listeleri neden değişir?",
      body: "Faaliyet alanı + finansal oranlar üç ayda bir gözden geçirilir. Eki 2026 döneminde giriş/çıkışlar duyurulmuştur.",
      detail: "Eşikler (faizli borç, faiz geliri, uygun olmayan gelir) kurum metodolojisine göre değişir. Bu site mock oranlar gösterir; üyelik iddiası yoktur. Resmî kaynak: Borsa İstanbul duyuruları.",
      jump: "news",
    },
    {
      id: "sektor-karsilastir",
      badge: "Pro bakış",
      title: "Sektör kıyası nasıl okunur?",
      body: "Aynı F/K bankada ucuz, yazılımda pahalı görünebilir. Sektör medyanı ile kıyasla.",
      detail: "Metrikler tablosunda ‘sektör F/K medyanı (sim)’ sütunu eğitim içindir. Holding ve çok sektörlülerde kıyas zorlaşır — Çok sektörlü grubuna bak.",
      jump: "metrics",
    },
  ];

  const BRIEFS = [
    {
      who: "Warren Buffett",
      where: "Berkshire mektupları",
      theme: "Anladığın iş",
      metric: "F/K & iş kalitesi",
      quote: "Risk, ne yaptığını bilmemekten gelir.",
      takeaway: "F/K tek başına karar değildir. Helal filtre + iş modeli + borçluluk birlikte okunur. Metrikler sekmesinde THYAO vs BIMAS farkına bak.",
    },
    {
      who: "Benjamin Graham",
      where: "The Intelligent Investor",
      theme: "Güvenlik marjı",
      metric: "Düşük F/K · PD/DD",
      quote: "Fiyat ile değer arasında güvenlik boşluğu bırak.",
      takeaway: "Düşük F/K cazip görünür; döngüsel kârda (EREGL senaryosu) tuzak olabilir. PD/DD ve borç/özkaynak ile çapraz kontrol et.",
    },
    {
      who: "Ray Dalio",
      where: "Principles",
      theme: "Çeşitlendirme",
      metric: "Volatilite karışımı",
      quote: "İyi çeşitlendirilmiş portföy farklı rejimlerde ayakta kalır.",
      takeaway: "Öğretici ‘Dengeli’ şablon: sukuk + fon + hisse + altın. Tek hisse portföyünde günlük K/Z daha sert salınır.",
    },
    {
      who: "John Bogle",
      where: "Vanguard yazıları",
      theme: "Maliyet & sadelik",
      metric: "Fon gideri",
      quote: "Yüksek maliyet uzun vadede getiriyi yer.",
      takeaway: "HYF / SKF gibi fonlarda ‘helal’ etiketi yanında ücret ve şeffaflık da brief konusudur.",
    },
    {
      who: "Howard Marks",
      where: "Oaktree memo’ları",
      theme: "Döngü",
      metric: "F/K döngüde yanıltır",
      quote: "Sarkaç iki uca da gider; ortada sanmak hatadır.",
      takeaway: "2021 çelik senaryosu: kâr zirvedeyken F/K düşük görünür. Geçmiş senaryolar sekmesinde sonucu karşılaştır.",
    },
    {
      who: "Peter Lynch",
      where: "One Up on Wall Street",
      theme: "Bildiklerin",
      metric: "Büyüme F/K",
      quote: "Fikirler günlük hayattan çıkar — araştırmanı yap.",
      takeaway: "BIMAS örneği: tanıdık perakende + yüksek F/K. Büyüme gelmezse pahalı kalırsın.",
    },
    {
      who: "Charlie Munger",
      where: "Berkshire toplantıları",
      theme: "Hatalardan kaçın",
      metric: "Borç & karmaşa",
      quote: "Aptalca hatalardan kaçınmak, parlak fikir bulmaktan değerlidir.",
      takeaway: "Yüksek borç/özkaynak + anlamadığın ürün = kaçınılacak birleşim. Helal screening’de faiz yükü de bu başlığa girer.",
    },
    {
      who: "Katılım screening (özet)",
      where: "BIST metodoloji çerçevesi · eğitim özeti",
      theme: "Dönemsel liste",
      metric: "Borç & faiz geliri oranları",
      quote: "Liste sabit değildir; üç ayda bir güncellenir.",
      takeaway: "Eyl–Eki 2026’da Katılım 30/50/100’de onlarca giriş/çıkış duyuruldu. Bu sitedeki semboller eğitim örneğidir; resmî üyelik için Borsa İstanbul duyurusuna bak. ASTOR gibi popüler hisseler bazen XKTUM dışında kalabilir — branş ≠ otomatik helal onay.",
    },
    {
      who: "Sektör çeşitlendirme brief’i",
      where: "Portföy pratiği · 2026",
      theme: "Branş riski",
      metric: "Tek tema yoğunluğu",
      quote: "Aynı hikâyeye aşırı yığılma, çeşitlendirme değildir.",
      takeaway: "Enerji branşı öğretici şablonunda ASTOR+YE+dağıtım vardır; tamamını tek sipariş haberine bağlama. Sukuk/altın katmanı şablonlarda ‘şok emici’ rolündedir — simülasyon psikolojisini görmek için.",
    },
    {
      who: "Volatilite brief’i — ASTOR örneği",
      where: "Eğitim paneli · Eyl 2026 bağlamı",
      theme: "Yüksek beta",
      metric: "Günlük % salınım",
      quote: "Yüksek getiri vaadi, yüksek geri çekilme kapasitesiyle gelir.",
      takeaway: "ASTOR 2026 sonbaharinda kısa sürede çift haneli günlük hareketler göstermiştir (ballpark). Simülasyonda ‘Simüle hareket üret’ ile volatiliteyi hissederken gerçek para yatırma — bu bir ön izlemedir.",
    },
    {
      who: "Mohamed El-Erian",
      where: "Makro yorumları (özet)",
      theme: "Rejim değişimi",
      metric: "Faiz / enflasyon rejimi",
      quote: "Eski rejim varsayımlarıyla yeni dünyada gezinme.",
      takeaway: "2024–26’da yüksek altın (gram ~6.500+ TL ballpark) ve katılım ürünlerine ilgi aynı ‘rejim’ tartışmasının parçası. Sukuk ≠ faizsiz sihir; alternatif getiri ve risk iştahı fiyatlanır.",
    },
    {
      who: "Yatırımcı psikolojisi brief’i",
      where: "Davranışsal finans · eğitim",
      theme: "FOMO & panik",
      metric: "Haber ertesi işlem",
      quote: "En pahalı cümle: ‘Bu sefer kaçırmayayım.’",
      takeaway: "İhale müjdesi veya endekse giriş haberinde kovalama; soruşturma haberinde dip avı — ikisi de tepkisel. Haber etkileri sekmesindeki ‘ne düzeyde / neye göre’ çerçevesini alışkanlık yap.",
    },
    {
      who: "BIST deneyimli yatırımcı özeti",
      where: "Eğitim paneli · simülasyon",
      theme: "Kontrol listesi",
      metric: "F/K · PD/DD · kaldıraç · DY · büyüme",
      quote: "Önce işi ve bilançoyu oku; sonra manşeti.",
      takeaway: "Sıra (eğitim): (1) Ne iş yapıyor? (2) F/K ve PD/DD sektör medyanına göre nerede? (3) Net borç/EBITDA ve faiz oranı screening’e takılır mı? (4) Likidite çıkışa yeter mi? (5) Haber fiyatlanmış mı? Bu site tavsiye vermez; alışkanlık kazandırır.",
    },
    {
      who: "Katılım screening derin brief",
      where: "Metodoloji çerçevesi · eğitim",
      theme: "Faiz & gelir payı",
      metric: "intRatio · nonComp (mock)",
      quote: "Eşik altı olmak, ‘al’ demek değildir.",
      takeaway: "Mock ‘faiz oranı %’ ve ‘uygun olmayan gelir %’ alanları Metrikler’de görünen eğitim sayılandır. Resmî eşik ve liste için BIST’e bak. Branş ≠ otomatik helal onay; ASTOR gibi temalar bazen listede olmayabilir.",
    },
    {
      who: "Anlaşma manşeti brief’i — ASTOR ABD",
      where: "Haber etkileri · eğitim senaryosu",
      theme: "Büyük deal",
      metric: "Sipariş / kâr oranı",
      quote: "Büyük sayı, büyük beklenti — ve büyük hayal kırıklığı riski.",
      takeaway: "Çok milyar $ ABD anlaşması senaryosunda potansiyel yukarı tepki çerçevesi öğretilir; garanti yoktur. F/K zaten yüksekse haberin bir kısmı fiyattadır. Panik alımı / panik satımı ikisi de tepkiseldir.",
    },
    {
      who: "Ufuk seçimi brief’i",
      where: "Geçmiş senaryolar",
      theme: "Aylık → çok yıllı",
      metric: "Horizon",
      quote: "Kısa ufuk manşeti, uzun ufuk işi ölçer.",
      takeaway: "1 aylık senaryolar haber beta’sını; 6 ay–1 yıl beklenti revizyonunu; çok yıllı döngü ve bileşik getiriyi gösterir. Illüstrasyondur — backtest veya getiri vaadi değildir.",
    },
    {
      who: "Çok sektörlü holding brief’i",
      where: "Branş sekmesi",
      theme: "Holding iskontosu",
      metric: "PD/DD · sektör dağılımı",
      quote: "Tek sektör F/K’sı holdinge yapışmaz.",
      takeaway: "KCHOL/SAHOL/BERA ‘Çok sektörlü’ grubunda toplanır. İskonto, bağlı ortaklık kalitesi ve temettü politikası ile okunur. Eğitim gruplamasıdır; resmî sektör kodu iddiası yoktur.",
    },

  ];

  const money = (n) =>
    "₺" + Number(n || 0).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const pct = (n) =>
    (n >= 0 ? "+" : "") +
    Number(n || 0).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
    "%";
  const num = (n, d = 1) =>
    n == null ? "—" : Number(n).toLocaleString("tr-TR", { minimumFractionDigits: d, maximumFractionDigits: d });

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function showToast(message, title = "Bilgi") {
    const stack = $("#toast-stack");
    if (stack) {
      const el = document.createElement("div");
      el.className = "toast";
      el.textContent = message;
      stack.appendChild(el);
      setTimeout(() => el.remove(), 2800);
      return;
    }
    const dlg = $("#modal-toast");
    if (!dlg) return;
    $("#toast-title").textContent = title;
    $("#toast-message").textContent = message;
    dlg.showModal();
  }

  function showAlert(message, title = "Bilgi") {
    return new Promise((resolve) => {
      const dlg = $("#modal-toast");
      $("#toast-title").textContent = title;
      $("#toast-message").textContent = message;
      const onClose = () => {
        dlg.removeEventListener("close", onClose);
        resolve();
      };
      dlg.addEventListener("close", onClose);
      dlg.showModal();
    });
  }

  function showConfirm(message, title = "Onay") {
    return new Promise((resolve) => {
      const dlg = $("#modal-confirm");
      $("#confirm-title").textContent = title;
      $("#confirm-message").textContent = message;
      let settled = false;
      const finish = (ok) => {
        if (settled) return;
        settled = true;
        form.removeEventListener("submit", onSubmit);
        dlg.removeEventListener("close", onClose);
        resolve(!!ok);
      };
      const form = $("#form-confirm");
      const onSubmit = (e) => {
        const sub = e.submitter;
        finish(sub && sub.value === "ok");
      };
      const onClose = () => finish(false);
      form.addEventListener("submit", onSubmit);
      dlg.addEventListener("close", onClose);
      dlg.showModal();
    });
  }

  function seededRand(seed) {
    // Keep seed in a modest range so Math.sin argument reduction stays precise
    const s = Number(seed) || 0;
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  }

  /** Fold large Date.now()-style ticks into a small int Math.sin can distinguish. */
  function tickSeed(tick, symbol) {
    const t = Math.abs(Math.floor(Number(tick) || 0));
    // Mix low/high bits; result stays << 1e6
    const folded = ((t % 1000000) ^ ((Math.floor(t / 1000) % 100000))) % 100000;
    const c0 = symbol.charCodeAt(0) || 0;
    const c1 = symbol.charCodeAt(1) || 0;
    const c2 = symbol.charCodeAt(2) || 0;
    return (folded * 17 + c0 * 31 + c1 * 13 + c2 * 7) % 1000003;
  }

  /** Deterministik fiyat: gün + opsiyonel tick (yenile ile oynar) */
  function priceFor(symbol, dayOffset = 0, tick = 0) {
    const item = CATALOG.find((c) => c.symbol === symbol);
    if (!item) return 0;
    const day = Math.floor(Date.now() / 86400000) + dayOffset;
    let price = item.base;
    // Geçmişe doğru geri sararken drift/vol uygula
    const steps = Math.abs(dayOffset) + 8;
    for (let i = steps; i >= 0; i--) {
      const d = day - i;
      const r1 = seededRand((d * 19 + symbol.charCodeAt(0) * 7) % 1000003);
      const r2 = seededRand((d * 23 + symbol.length * 11) % 1000003);
      const shock = (r1 - 0.5) * 2 * item.vol;
      const drift = item.drift * (r2 > 0.45 ? 1 : -0.6);
      price = price * (1 + drift + shock);
    }
    // Tick: "Simüle hareket üret" + auto-tick — hash into small int (Date.now * 0.001 broke Math.sin precision)
    if (tick) {
      const t = seededRand(tickSeed(tick, symbol));
      price *= 1 + (t - 0.5) * item.vol * 2.2;
    }
    return +price.toFixed(4);
  }

  function dayChange(symbol, tick) {
    const t = priceFor(symbol, 0, tick);
    const y = priceFor(symbol, -1, tick);
    return ((t - y) / y) * 100;
  }

  function uid() {
    return Math.random().toString(36).slice(2, 10);
  }

  function daysBetween(iso) {
    return Math.max(0, Math.floor((Date.now() - new Date(iso)) / 86400000));
  }

  function catalogItem(symbol) {
    return CATALOG.find((c) => c.symbol === symbol);
  }

  function defaultStore() {
    return { portfolios: [], activeId: null, tick: 0, phoneMode: false };
  }

  function load() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const legacy = localStorage.getItem(STORAGE_KEY_LEGACY) || localStorage.getItem(STORAGE_KEY_LEGACY2);
        if (legacy) {
          localStorage.setItem(STORAGE_KEY, legacy);
          raw = legacy;
        }
      }
      if (!raw) return defaultStore();
      const s = JSON.parse(raw);
      if (!s.portfolios) return defaultStore();
      if (typeof s.phoneMode !== "boolean") s.phoneMode = false;
      if (typeof s.tick !== "number") s.tick = 0;
      return s;
    } catch {
      return defaultStore();
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  let store = load();
  let valueChart, allocChart;
  let bistFilter = "all";
  let newsFilter = "all";
  let sectorFilter = "all";
  let scenarioHorizon = "all";
  let prevPrices = {};

  const $ = (sel) => document.querySelector(sel);
  const active = () => store.portfolios.find((p) => p.id === store.activeId) || null;

  function holdingsValue(p, dayOffset = 0) {
    return p.holdings.reduce((s, h) => s + h.qty * priceFor(h.symbol, dayOffset, store.tick), 0);
  }

  function totalValue(p, dayOffset = 0) {
    return holdingsValue(p, dayOffset) + p.cash;
  }

  function setChg(el, n) {
    el.classList.remove("up", "down");
    if (n > 0) el.classList.add("up");
    if (n < 0) el.classList.add("down");
  }

  function createPortfolio({ name, capital, holdings = [], kind = "custom" }) {
    const p = {
      id: uid(),
      name,
      kind,
      createdAt: new Date().toISOString(),
      startCapital: capital,
      cash: capital,
      holdings: [],
    };
    // Apply holdings by spending cash at current prices (or given buy)
    for (const h of holdings) {
      const buy = h.buy ?? priceFor(h.symbol, 0, store.tick);
      const cost = h.qty * buy;
      if (cost > p.cash) continue;
      p.cash = +(p.cash - cost).toFixed(2);
      p.holdings.push({ id: uid(), symbol: h.symbol, qty: h.qty, buy });
    }
    store.portfolios.push(p);
    store.activeId = p.id;
    save();
    return p;
  }

  function holdingsFromTemplate(tpl) {
    return tpl.alloc.map((a) => {
      const price = priceFor(a.symbol, 0, store.tick);
      const budget = tpl.capital * a.weight;
      const qty = +(budget / price).toFixed(4);
      return { symbol: a.symbol, qty, buy: price };
    });
  }

  function refreshSelect() {
    const sel = $("#portfolio-select");
    if (!store.portfolios.length) {
      sel.innerHTML = `<option value="">Portföy yok</option>`;
      return;
    }
    sel.innerHTML = store.portfolios
      .map(
        (p) =>
          `<option value="${escapeHtml(p.id)}" ${p.id === store.activeId ? "selected" : ""}>${escapeHtml(p.name)}${
            p.kind === "edu" ? " · öğretici" : ""
          }</option>`
      )
      .join("");
  }

  function showLive() {
    const p = active();
    $("#empty-state").hidden = !!p;
    $("#portfolio-live").hidden = !p;
    $("#btn-delete-portfolio").hidden = !p;
  }

  function renderKPIs() {
    const p = active();
    if (!p) return;
    const value = totalValue(p, 0);
    const yValue = totalValue(p, -1);
    const pnl = value - p.startCapital;
    const pnlPct = (pnl / p.startCapital) * 100;
    const day = value - yValue;
    const dayPct = yValue ? (day / yValue) * 100 : 0;
    const age = daysBetween(p.createdAt);

    $("#kpi-value").textContent = money(value);
    $("#kpi-cash").textContent = "Nakit: " + money(p.cash);
    $("#kpi-pnl").textContent = money(pnl);
    $("#kpi-pnl-pct").textContent = pct(pnlPct) + " · başlangıçtan";
    setChg($("#kpi-pnl"), pnl);
    setChg($("#kpi-pnl-pct"), pnlPct);
    $("#kpi-day").textContent = money(day);
    $("#kpi-day-pct").textContent = pct(dayPct);
    setChg($("#kpi-day"), day);
    setChg($("#kpi-day-pct"), dayPct);
    $("#kpi-created").textContent = new Date(p.createdAt).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    $("#kpi-age").textContent = age === 0 ? "Bugün oluşturuldu" : age + " gündür";
    $("#portfolio-name").textContent = p.name + (p.kind === "edu" ? " (öğretici)" : "");
    $("#subtitle").textContent = "Değer, eklediğin araçlara göre artar veya azalır · " + money(p.startCapital) + " ile başladı";
  }

  function renderHoldings() {
    const p = active();
    if (!p) return;
    if (!p.holdings.length) {
      $("#holdings-body").innerHTML = `<tr><td colspan="9" class="muted">Araç yok. Ekle veya öğretici şablon kullan.</td></tr>`;
      return;
    }
    $("#holdings-body").innerHTML = p.holdings
      .map((h) => {
        const c = catalogItem(h.symbol);
        const price = priceFor(h.symbol, 0, store.tick);
        const val = h.qty * price;
        const cost = h.qty * h.buy;
        const pnl = val - cost;
        const pnlPct = cost ? (pnl / cost) * 100 : 0;
        const pe = c?.pe;
        return `<tr>
          <td><div class="asset-cell"><strong>${h.symbol}</strong><small>${c?.name || ""}</small></div></td>
          <td><span class="tag">${c?.type || "—"}</span></td>
          <td class="num">${h.qty}</td>
          <td class="num">${money(h.buy)}</td>
          <td class="num">${money(price)}</td>
          <td class="num">${money(val)}</td>
          <td class="num ${pnl >= 0 ? "up" : "down"}">${money(pnl)} (${pct(pnlPct)})</td>
          <td class="num">${pe == null ? "—" : num(pe, 1)}</td>
          <td><button class="btn btn-sm btn-danger" type="button" data-sell="${h.id}">Sat</button></td>
        </tr>`;
      })
      .join("");
  }

  function historySeries(p) {
    const age = daysBetween(p.createdAt);
    const points = Math.min(Math.max(age, 2), 45);
    const out = [];
    for (let i = points; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      if (d.getTime() < new Date(p.createdAt).getTime() - 86400000) continue;
      out.push({
        label: d.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit" }),
        value: totalValue(p, -i),
      });
    }
    if (out.length < 2) {
      out.unshift({
        label: new Date(p.createdAt).toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit" }),
        value: p.startCapital,
      });
    }
    return out;
  }

  function showChartFallback(show) {
    const fb1 = $("#chart-value-fallback");
    const fb2 = $("#chart-alloc-fallback");
    const c1 = $("#chart-value");
    const c2 = $("#chart-alloc");
    if (fb1) fb1.hidden = !show;
    if (fb2) fb2.hidden = !show;
    if (c1) c1.hidden = !!show;
    if (c2) c2.hidden = !!show;
  }

  function renderCharts() {
    const p = active();
    if (!p) return;
    if (!window.Chart) {
      showChartFallback(true);
      return;
    }
    showChartFallback(false);
    const series = historySeries(p);
    if (valueChart) valueChart.destroy();
    valueChart = new Chart($("#chart-value"), {
      type: "line",
      data: {
        labels: series.map((x) => x.label),
        datasets: [{
          data: series.map((x) => x.value),
          borderColor: "#2dd4a8",
          backgroundColor: "rgba(45,212,168,0.12)",
          fill: true, tension: 0.35, pointRadius: 2,
        }],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "#8b9bb8" }, grid: { color: "#243049" } },
          y: {
            ticks: { color: "#8b9bb8", callback: (v) => "₺" + Number(v).toLocaleString("tr-TR") },
            grid: { color: "#243049" },
          },
        },
      },
    });

    const byType = { Nakit: p.cash };
    for (const h of p.holdings) {
      const t = catalogItem(h.symbol)?.type || "Diğer";
      byType[t] = (byType[t] || 0) + h.qty * priceFor(h.symbol, 0, store.tick);
    }
    const labels = Object.keys(byType).filter((k) => byType[k] > 0.01);
    if (allocChart) allocChart.destroy();
    allocChart = new Chart($("#chart-alloc"), {
      type: "doughnut",
      data: {
        labels,
        datasets: [{
          data: labels.map((k) => byType[k]),
          backgroundColor: labels.map((l) => TYPE_COLORS[l] || "#8b9bb8"),
          borderWidth: 0,
        }],
      },
      options: {
        plugins: { legend: { position: "bottom", labels: { color: "#8b9bb8", boxWidth: 12 } } },
        cutout: "62%",
      },
    });
  }

  function renderBist() {
    const q = ($("#bist-search")?.value || "").trim().toLowerCase();
    const list = CATALOG.filter((c) => {
      if (bistFilter !== "all" && c.type !== bistFilter) return false;
      if (!q) return true;
      return (
        c.symbol.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q) ||
        (c.sector || "").toLowerCase().includes(q)
      );
    });
    const p = active();
    $("#bist-body").innerHTML = list
      .map((c) => {
        const price = priceFor(c.symbol, 0, store.tick);
        const chg = dayChange(c.symbol, store.tick);
        const prev = prevPrices[c.symbol];
        let flash = "";
        if (prev != null) {
          if (price > prev) flash = "price-flash-up";
          else if (price < prev) flash = "price-flash-down";
        }
        prevPrices[c.symbol] = price;
        return `<tr>
          <td><strong>${c.symbol}</strong></td>
          <td>${c.name}</td>
          <td><span class="tag">${c.type}</span></td>
          <td><span class="tag">${c.sector || "—"}</span></td>
          <td><span class="muted">${c.indexNote || c.market || "—"}</span></td>
          <td class="num ${flash}">${money(price)}</td>
          <td class="num ${chg >= 0 ? "up" : "down"}">${pct(chg)}</td>
          <td class="num">${c.pe == null ? "—" : num(c.pe, 1)}</td>
          <td>${
            p
              ? `<button class="btn btn-sm btn-ghost" type="button" data-add-symbol="${c.symbol}">Portföye</button>`
              : `<span class="muted">—</span>`
          }</td>
        </tr>`;
      })
      .join("");
    const clock = $("#live-clock");
    if (clock) clock.textContent = new Date().toLocaleTimeString("tr-TR");
    const edu = $("#bist-edu-summaries");
    if (edu && !edu.dataset.ready) {
      edu.dataset.ready = "1";
      edu.innerHTML = `
        <article class="brief bist-edu">
          <div class="brief-meta"><strong>BIST deneyimli yatırımcı özeti</strong><span class="tag">Eğitim · tavsiye değil</span></div>
          <p class="takeaway"><b>Kontrol listesi:</b> İş modeli → F/K &amp; PD/DD (sektör medyanı) → net borç/EBITDA &amp; borç/özkaynak → temettü sürdürülebilirliği → likidite → katılım mock oranları (faiz / uygun olmayan gelir) → haberin fiyata girip girmediği.</p>
          <p class="takeaway"><b>Yaygın tuzak:</b> Düşük F/K + yüksek kaldıraç (ör. havacılık) veya döngüsel kâr zirvesinde ‘ucuz’ çelik/rafineri. Yüksek F/K yalnız güçlü görünür büyümeyle tartışılır.</p>
        </article>
        <article class="brief bist-edu">
          <div class="brief-meta"><strong>Katılım / helal okuma (özet)</strong><span class="tag">Üyelik iddiası yok</span></div>
          <p class="takeaway">Listeler dönemsel değişir. Bu paneldeki semboller eğitim örneğidir. Mock faiz ve uygun olmayan gelir yüzdeleri Metrikler’dedir — resmî eşik için Borsa İstanbul metodolojisine bak.</p>
        </article>
        <article class="brief bist-edu">
          <div class="brief-meta"><strong>ASTOR &amp; enerji ekipmanı</strong><span class="tag">Yüksek beta</span></div>
          <p class="takeaway">Sipariş/ABD anlaşma senaryoları potansiyel yukarı tepki çerçevesi öğretir; itibar haberleri aşağı. Garanti yoktur. ‘Simüle hareket üret’ ile volatiliteyi gör — gerçek para yok.</p>
        </article>`;
    }
  }

  const SECTOR_ORDER = [
    "Enerji",
    "Teknoloji / Savunma",
    "Gıda / Perakende",
    "Sanayi / Metal",
    "Otomotiv",
    "İnşaat / Çimento",
    "Havacılık",
    "Holding",
    "Telekom",
    "Gayrimenkul",
    "Emtia",
    "Sabit benzeri",
    "Fon",
  ];
  const MULTI_SECTOR_LABEL = "Çok sektörlü";

  function itemSectors(c) {
    if (Array.isArray(c.sectors) && c.sectors.length) return c.sectors;
    return c.sector ? [c.sector] : [];
  }

  function isMultiSector(c) {
    return itemSectors(c).length > 1;
  }

  function sectorsList() {
    const set = new Set();
    for (const c of CATALOG) {
      for (const s of itemSectors(c)) set.add(s);
    }
    const main = SECTOR_ORDER.filter((s) => set.has(s)).concat(
      [...set].filter((s) => !SECTOR_ORDER.includes(s)).sort()
    );
    // Always expose Çok sektörlü if any multi-tag names exist
    if (CATALOG.some(isMultiSector)) main.push(MULTI_SECTOR_LABEL);
    return main;
  }

  function itemsForSectorGroup(sector) {
    if (sector === MULTI_SECTOR_LABEL) return CATALOG.filter(isMultiSector);
    return CATALOG.filter((c) => itemSectors(c).includes(sector) || c.sector === sector);
  }

  function sectorMedianPe(sector) {
    const vals = CATALOG.filter((c) => (c.sector === sector || itemSectors(c).includes(sector)) && c.pe != null).map((c) => c.pe);
    if (!vals.length) return null;
    vals.sort((a, b) => a - b);
    const mid = Math.floor(vals.length / 2);
    return vals.length % 2 ? vals[mid] : (vals[mid - 1] + vals[mid]) / 2;
  }

  function renderSectors() {
    const chips = $("#sector-chips");
    const body = $("#sectors-body");
    if (!chips || !body) return;
    const sectors = sectorsList();
    chips.innerHTML =
      `<button class="chip ${sectorFilter === "all" ? "is-active" : ""}" type="button" data-sector-filter="all">Tümü</button>` +
      sectors
        .map(
          (s) =>
            `<button class="chip ${sectorFilter === s ? "is-active" : ""}" type="button" data-sector-filter="${escapeHtml(s)}">${escapeHtml(s)}</button>`
        )
        .join("");

    const p = active();
    const groups = sectorFilter === "all" ? sectors : sectors.filter((s) => s === sectorFilter);
    body.innerHTML = groups
      .map((sector) => {
        const items = itemsForSectorGroup(sector);
        if (!items.length) return "";
        const rows = items
          .map((c) => {
            const price = priceFor(c.symbol, 0, store.tick);
            const chg = dayChange(c.symbol, store.tick);
            const tags = itemSectors(c).map((s) => `<span class="tag">${escapeHtml(s)}</span>`).join(" ");
            return `<tr>
              <td><strong>${c.symbol}</strong></td>
              <td>${c.name}</td>
              <td><span class="tag">${c.type}</span></td>
              <td>${tags}</td>
              <td class="num">${money(price)}</td>
              <td class="num ${chg >= 0 ? "up" : "down"}">${pct(chg)}</td>
              <td class="num">${c.pe == null ? "—" : num(c.pe, 1)}</td>
              <td><span class="muted small">${c.note || ""}</span></td>
              <td>${
                p
                  ? `<button class="btn btn-sm btn-ghost" type="button" data-add-symbol="${c.symbol}">Portföye</button>`
                  : `<span class="muted">—</span>`
              }</td>
            </tr>`;
          })
          .join("");
        return `<article class="panel sector-panel">
          <div class="panel-head">
            <button type="button" class="sector-title-btn" data-sector-filter="${escapeHtml(sector)}" title="Yalnız bu sektörü göster">
              <h2>${escapeHtml(sector)}</h2>
            </button>
            <span class="tag">${items.length} araç</span>
          </div>
          <p class="muted small sector-hint">Sektör adına tıkla → filtrele · <b>Tümü</b> temizler. ${
            sector === MULTI_SECTOR_LABEL
              ? "Birden fazla branşa yayılan örnekler burada."
              : "Eğitim gruplamasıdır; resmî BIST sektör kodu veya katılım üyeliği iddiası yoktur."
          } Fiyatlar simüle ballpark’tır (Eyl 2026).</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Sembol</th><th>Ad</th><th>Tür</th><th>Branşlar</th>
                  <th class="num">Simüle fiyat</th><th class="num">Günlük %</th>
                  <th class="num">F/K</th><th>Not</th><th></th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </article>`;
      })
      .join("");
  }

  function renderNews() {
    const list = NEWS_IMPACTS.filter((n) => newsFilter === "all" || n.cat === newsFilter);
    $("#news-list").innerHTML = list
      .map((n) => {
        const targets = n.targets
          .map((t) => {
            const dirCls = t.direction === "up" ? "up" : t.direction === "down" ? "down" : "mixed";
            const arrow = t.direction === "up" ? "↑" : t.direction === "down" ? "↓" : "↕";
            return `<div>
              <div class="news-targets"><span class="tag">${t.symbol}</span> <span class="${dirCls}">${arrow} etki ~${t.level}/100</span></div>
              <div class="impact-bar">
                <div class="impact-meter"><i class="${dirCls}" style="width:${t.level}%"></i></div>
                <span class="muted small">${t.effect}</span>
              </div>
            </div>`;
          })
          .join("");
        return `<article class="brief">
          <div class="brief-meta">
            <strong>${n.headline}</strong>
            <span class="tag">${n.cat}</span>
            <span>${n.when}</span>
          </div>
          <p class="takeaway">${n.summary}</p>
          <div style="display:grid;gap:0.65rem">${targets}</div>
          <p class="takeaway"><b>Neye göre karar düşünülür:</b> ${n.decide}</p>
          <p class="takeaway"><b>Uzman çerçevesi:</b> ${n.expert}</p>
          <p class="takeaway"><b>Geçmiş örüntü:</b> ${n.history}</p>
        </article>`;
      })
      .join("");
  }

  function renderTemplates() {
    $("#templates-grid").innerHTML = TEMPLATES.map((t) => {
      const lines = t.alloc
        .map((a) => `<li>${Math.round(a.weight * 100)}% ${a.symbol} — ${catalogItem(a.symbol)?.name || ""}</li>`)
        .join("");
      return `<article class="feature-card">
        <span class="badge">${t.badge}</span>
        <h3>${t.name}</h3>
        <p>${t.desc}</p>
        <ul>${lines}</ul>
        <button class="btn btn-sm" type="button" data-template="${t.id}">Bu öğretici portföyü oluştur</button>
      </article>`;
    }).join("");
  }

  function renderScenarios() {
    const bar = $("#scenario-horizon-chips");
    if (bar) {
      const opts = [
        ["all", "Tümü"],
        ["monthly", "Aylık"],
        ["6m", "6 ay"],
        ["yearly", "Yıllık"],
        ["multi", "Çok yıllı"],
      ];
      bar.innerHTML = opts
        .map(
          ([id, label]) =>
            `<button class="chip ${scenarioHorizon === id ? "is-active" : ""}" type="button" data-scenario-horizon="${id}">${label}</button>`
        )
        .join("");
    }
    const list = SCENARIOS.filter((s) => scenarioHorizon === "all" || s.horizon === scenarioHorizon);
    $("#scenarios-grid").innerHTML = list.map((s) => {
      const now = priceFor(s.symbol, 0, store.tick);
      const pnl = now - s.entryPrice;
      const pnlPct = (pnl / s.entryPrice) * 100;
      const cls = pnl >= 0 ? "up" : "down";
      const hz = s.horizon === "monthly" ? "Aylık ufuk" : s.horizon === "6m" ? "6 aylık ufuk" : s.horizon === "yearly" ? "Yıllık ufuk" : "Çok yıllı ufuk";
      return `<article class="feature-card">
        <span class="badge">${s.badge}</span>
        <span class="tag">${hz}</span>
        <h3>${s.title}</h3>
        <p>${s.context}</p>
        <p class="meta">${s.symbol} · giriş ${s.entryDate} · ${s.unit} @ ${money(s.entryPrice)}</p>
        <div class="result ${cls}">İllüstratif (simülasyon); tarihsel backtest değildir. Bugün: ${money(now)} · K/Z ${money(pnl)} (${pct(pnlPct)})</div>
        <p><b>Uzman açısı:</b> ${s.expertAngle}</p>
        <p><b>Metrik notu:</b> ${s.metricLink}</p>
      </article>`;
    }).join("") || `<p class="muted">Bu ufukta senaryo yok. Tümü’ne dön.</p>`;
  }

  function renderMetrics() {
    $("#metrics-body").innerHTML = CATALOG.map((c) => {
      const price = priceFor(c.symbol, 0, store.tick);
      const med = c.sector ? sectorMedianPe(c.sector) : null;
      const peVs = c.pe != null && med != null ? (c.pe < med * 0.9 ? "sektör altı" : c.pe > med * 1.1 ? "sektör üstü" : "sektör civarı") : "—";
      return `<tr>
        <td><strong>${c.symbol}</strong></td>
        <td>${c.name}<br/><span class="muted small">${c.sector || ""}</span></td>
        <td class="num">${money(price)}</td>
        <td class="num">${c.pe == null ? "—" : num(c.pe, 1)}</td>
        <td class="num">${med == null ? "—" : num(med, 1)}<br/><span class="muted small">${peVs}</span></td>
        <td class="num">${c.pb == null ? "—" : num(c.pb, 2)}</td>
        <td class="num">${c.dy == null ? "—" : num(c.dy, 1) + "%"}</td>
        <td class="num">${c.revG == null ? "—" : num(c.revG, 0) + "%"}</td>
        <td class="num">${c.profitG == null ? "—" : num(c.profitG, 0) + "%"}</td>
        <td class="num">${c.ndEbitda == null ? "—" : num(c.ndEbitda, 1)}</td>
        <td class="num">${c.de == null ? "—" : num(c.de, 2)}</td>
        <td class="num">${c.liq == null ? "—" : num(c.liq, 0)}</td>
        <td class="num">${c.intRatio == null ? "—" : num(c.intRatio, 0) + "%"}</td>
        <td class="num">${c.nonComp == null ? "—" : num(c.nonComp, 0) + "%"}</td>
        <td><span class="muted small">${c.note || ""} · sim örnek</span></td>
      </tr>`;
    }).join("");
  }

  function renderLearn() {
    const grid = $("#learn-grid");
    if (!grid) return;
    grid.innerHTML = LEARN.map(
      (c) => `<article class="learn-card">
        <span class="badge">${c.badge}</span>
        <h3>${c.title}</h3>
        <p>${c.body}</p>
        ${c.detail ? `<details class="learn-detail"><summary>Detayı aç</summary><p>${c.detail}</p></details>` : ""}
        <a class="jump" href="#" data-goto="${c.jump}">İlgili bölüme git →</a>
      </article>`
    ).join("");
  }

  function renderBriefs() {
    $("#briefs-list").innerHTML = BRIEFS.map(
      (b) => `<article class="brief">
        <div class="brief-meta">
          <strong>${b.who}</strong>
          <span>${b.where}</span>
          <span class="tag">${b.theme}</span>
          <span class="tag">${b.metric}</span>
        </div>
        <blockquote>“${b.quote}”</blockquote>
        <p class="takeaway"><b>Öğretici değerlendirme:</b> ${b.takeaway}</p>
      </article>`
    ).join("");
  }


  function applyPhoneMode() {
    const on = !!store.phoneMode;
    document.body.classList.toggle("phone-mode", on);
    const app = document.querySelector(".app");
    if (app) app.classList.toggle("phone-mode", on);
    const btn = $("#btn-phone");
    if (btn) {
      btn.textContent = on ? "Masaüstü görünümü" : "Telefon görünümü";
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  function goView(view) {
    document.querySelectorAll(".nav-item").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.view === view);
    });
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("is-active"));
    const el = $(`#view-${view}`);
    if (el) el.classList.add("is-active");
    const titles = {
      portfolio: "Portföyüm",
      bist: "Katılım-benzeri eğitim paneli (simülasyon)",
      sectors: "Hisseler — branş / sektör",
      news: "Haber etkileri",
      templates: "Öğretici portföyler",
      scenarios: "Geçmiş senaryolar",
      metrics: "Metrikler (pro · sim)",
      learn: "Öğren",
      briefs: "Briefler",
    };
    $("#view-title").textContent = titles[view] || view;
    if (view === "portfolio" && active()) renderCharts();
    if (view === "scenarios") renderScenarios();
    if (view === "bist") renderBist();
    if (view === "sectors") renderSectors();
    if (view === "news") renderNews();
    if (view === "learn") renderLearn();
    if (view === "metrics") renderMetrics();
    if (view === "briefs") renderBriefs();
    if (view === "templates") renderTemplates();
  }

  function renderAll() {
    refreshSelect();
    showLive();
    applyPhoneMode();
    if (active()) {
      renderKPIs();
      renderHoldings();
      renderCharts();
    } else {
      $("#subtitle").textContent = "Değer, eklediğin araçlara göre artar veya azalır";
    }
    renderTemplates();
    renderScenarios();
    renderMetrics();
    renderBist();
    renderSectors();
    renderNews();
    renderLearn();
    renderBriefs();
  }

  function fillAddSelect(pre) {
    const sel = $("#add-symbol");
    sel.innerHTML = CATALOG.map(
      (c) =>
        `<option value="${c.symbol}" ${pre === c.symbol ? "selected" : ""}>${c.symbol} — ${c.name}${c.sector ? " · " + c.sector : ""}</option>`
    ).join("");
    const sym = pre || sel.value;
    $("#form-add [name=buy]").value = priceFor(sym, 0, store.tick).toFixed(2);
    updateCostHint();
  }

  function updateCostHint() {
    const p = active();
    const qty = Number($("#form-add [name=qty]").value || 0);
    const buy = Number($("#form-add [name=buy]").value || 0);
    const cost = qty * buy;
    $("#add-cost-hint").textContent = `Maliyet: ${money(cost)} · Nakit: ${money(p ? p.cash : 0)}`;
  }

  async function openAdd(symbol) {
    if (!active()) {
      await showAlert("Önce bir portföy oluştur veya seç.");
      return;
    }
    fillAddSelect(symbol);
    $("#modal-add").showModal();
  }

  // Events
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => goView(btn.dataset.view));
  });

  $("#portfolio-select").addEventListener("change", (e) => {
    store.activeId = e.target.value || null;
    save();
    renderAll();
  });

  $("#btn-new-portfolio").addEventListener("click", () => $("#modal-create").showModal());
  $("#btn-empty-create").addEventListener("click", () => $("#modal-create").showModal());
  $("#btn-empty-templates").addEventListener("click", () => goView("templates"));

  $("#form-create").addEventListener("submit", (e) => {
    const sub = e.submitter;
    if (!sub || sub.value !== "ok") return;
    e.preventDefault();
    const fd = new FormData($("#form-create"));
    const name = String(fd.get("name")).trim();
    const capital = Number(fd.get("capital"));
    if (!name || !(capital >= 1000)) return;
    createPortfolio({ name, capital, holdings: [], kind: "custom" });
    $("#modal-create").close();
    $("#form-create").reset();
    goView("portfolio");
    renderAll();
    showToast("Portföy oluşturuldu: " + name);
  });

  $("#btn-delete-portfolio").addEventListener("click", async () => {
    const p = active();
    if (!p) return;
    const ok = await showConfirm(`“${p.name}” silinsin mi?`, "Portföyü sil");
    if (!ok) return;
    store.portfolios = store.portfolios.filter((x) => x.id !== p.id);
    store.activeId = store.portfolios[0]?.id || null;
    save();
    renderAll();
    showToast("Portföy silindi");
  });

  $("#btn-refresh").addEventListener("click", () => {
    store.tick = Date.now();
    save();
    renderAll();
    showToast("Simüle hareket üretildi");
  });

  $("#btn-phone")?.addEventListener("click", () => {
    store.phoneMode = !store.phoneMode;
    save();
    applyPhoneMode();
    showToast(store.phoneMode ? "Telefon görünümü açık" : "Masaüstü görünümü");
  });

  $("#btn-add").addEventListener("click", () => openAdd());

  document.body.addEventListener("click", (e) => {
    const tpl = e.target.closest("[data-template]");
    if (tpl) {
      const t = TEMPLATES.find((x) => x.id === tpl.dataset.template);
      if (!t) return;
      createPortfolio({
        name: t.name,
        capital: t.capital,
        holdings: holdingsFromTemplate(t),
        kind: "edu",
      });
      goView("portfolio");
      renderAll();
      showToast("Öğretici portföy oluşturuldu: " + t.name);
      return;
    }
    const goto = e.target.closest("[data-goto]");
    if (goto) {
      e.preventDefault();
      goView(goto.dataset.goto);
      return;
    }
    const sell = e.target.closest("[data-sell]");
    if (sell) {
      e.preventDefault();
      const p = active();
      if (!p) return;
      const h = p.holdings.find((x) => x.id === sell.dataset.sell);
      if (!h) return;
      (async () => {
        const ok = await showConfirm(`${h.symbol} satılsın mı? (simülasyon)`, "Satış");
        if (!ok) return;
        const cur = active();
        if (!cur) return;
        const hold = cur.holdings.find((x) => x.id === h.id);
        if (!hold) return;
        cur.cash = +(cur.cash + hold.qty * priceFor(hold.symbol, 0, store.tick)).toFixed(2);
        cur.holdings = cur.holdings.filter((x) => x.id !== hold.id);
        save();
        renderAll();
        showToast(hold.symbol + " satıldı (simülasyon)");
      })();
      return;
    }
    const add = e.target.closest("[data-add-symbol]");
    if (add) openAdd(add.dataset.addSymbol);
  });

  $("#add-symbol").addEventListener("change", (e) => {
    $("#form-add [name=buy]").value = priceFor(e.target.value, 0, store.tick).toFixed(2);
    updateCostHint();
  });
  $("#form-add [name=qty]").addEventListener("input", updateCostHint);
  $("#form-add [name=buy]").addEventListener("input", updateCostHint);

  $("#form-add").addEventListener("submit", (e) => {
    const sub = e.submitter;
    if (!sub || sub.value !== "ok") return;
    e.preventDefault();
    const p = active();
    if (!p) return;
    const fd = new FormData($("#form-add"));
    const symbol = String(fd.get("symbol"));
    const qty = Number(fd.get("qty"));
    const buy = Number(fd.get("buy"));
    const cost = qty * buy;
    if (!(qty > 0) || cost > p.cash + 0.01) {
      showAlert("Simülasyon nakit yetersiz veya miktar geçersiz.");
      return;
    }
    p.cash = +(p.cash - cost).toFixed(2);
    const existing = p.holdings.find((h) => h.symbol === symbol);
    if (existing) {
      const total = existing.qty * existing.buy + cost;
      existing.qty += qty;
      existing.buy = total / existing.qty;
    } else {
      p.holdings.push({ id: uid(), symbol, qty, buy });
    }
    save();
    $("#modal-add").close();
    $("#form-add").reset();
    renderAll();
    showToast(symbol + " portföye eklendi");
  });

  $("#bist-search")?.addEventListener("input", () => renderBist());

  document.body.addEventListener("click", (e) => {
    const bf = e.target.closest("[data-bist-filter]");
    if (bf) {
      bistFilter = bf.dataset.bistFilter;
      document.querySelectorAll("[data-bist-filter]").forEach((b) =>
        b.classList.toggle("is-active", b === bf)
      );
      renderBist();
      return;
    }
    const nf = e.target.closest("[data-news-filter]");
    if (nf) {
      newsFilter = nf.dataset.newsFilter;
      document.querySelectorAll("[data-news-filter]").forEach((b) =>
        b.classList.toggle("is-active", b === nf)
      );
      renderNews();
      return;
    }
    const sf = e.target.closest("[data-sector-filter]");
    if (sf) {
      sectorFilter = sf.dataset.sectorFilter;
      renderSectors();
      return;
    }
    const hz = e.target.closest("[data-scenario-horizon]");
    if (hz) {
      scenarioHorizon = hz.dataset.scenarioHorizon;
      renderScenarios();
    }
  });

  // Anlık demo fiyat: birkaç saniyede bir tick
  setInterval(() => {
    store.tick = Date.now();
    // localStorage'a her tick yazma — sadece bellek
    const bistView = $("#view-bist");
    if (bistView && bistView.classList.contains("is-active")) renderBist();
    const sectorsView = $("#view-sectors");
    if (sectorsView && sectorsView.classList.contains("is-active")) renderSectors();
    const portView = $("#view-portfolio");
    if (portView && portView.classList.contains("is-active") && active()) {
      renderKPIs();
      renderHoldings();
    }
  }, 4000);

  function boot() {
    if (!window.Chart) showChartFallback(true);
    renderLearn();
    renderBriefs();
    renderAll();
  }
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  // Chart.js may load after defer; retry charts once on window load
  window.addEventListener("load", () => {
    if (window.Chart && active()) renderCharts();
    else if (!window.Chart) showChartFallback(true);
  });
})();
