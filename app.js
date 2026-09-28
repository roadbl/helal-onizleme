(() => {
  const STORAGE_KEY = "helal-onizleme-v4";
  const STORAGE_KEY_LEGACY = "helal-onizleme-v3";

  /** vol: günlük yaklaşık volatilite; drift: hafif uzun vadeli eğilim */
  const CATALOG = [
    // --- BIST helal / katılım filtre ÖRNEKLERİ (eğitim; resmi endeks listesi değildir) ---
    { symbol: "ASELS", name: "Aselsan", type: "Hisse", market: "BIST", indexNote: "Eğitim amaçlı örnek sembol", base: 86.2, vol: 0.022, drift: 0.0003, pe: 18.4, pb: 3.1, dy: 0.8, de: 0.35, note: "Savunma · orta F/K" },
    { symbol: "BIMAS", name: "BİM Mağazalar", type: "Hisse", market: "BIST", indexNote: "Eğitim amaçlı örnek sembol", base: 520, vol: 0.016, drift: 0.00035, pe: 22.5, pb: 6.8, dy: 1.5, de: 0.4, note: "Perakende · yüksek F/K" },
    { symbol: "EREGL", name: "Ereğli Demir Çelik", type: "Hisse", market: "BIST", indexNote: "Eğitim amaçlı örnek sembol", base: 52.8, vol: 0.025, drift: 0.0001, pe: 9.8, pb: 0.9, dy: 2.1, de: 0.55, note: "Döngüsel sanayi" },
    { symbol: "FROTO", name: "Ford Otosan", type: "Hisse", market: "BIST", indexNote: "Eğitim amaçlı örnek sembol", base: 980, vol: 0.021, drift: 0.00028, pe: 8.4, pb: 2.2, dy: 4.0, de: 0.65, note: "Otomotiv ihracat" },
    { symbol: "TOASO", name: "Tofaş Oto", type: "Hisse", market: "BIST", indexNote: "Eğitim amaçlı örnek sembol", base: 245, vol: 0.023, drift: 0.0002, pe: 7.9, pb: 1.8, dy: 5.2, de: 0.7, note: "Otomotiv" },
    { symbol: "SISE", name: "Şişecam", type: "Hisse", market: "BIST", indexNote: "Eğitim amaçlı örnek sembol", base: 48.6, vol: 0.02, drift: 0.00018, pe: 10.5, pb: 1.0, dy: 2.4, de: 0.8, note: "Cam / kimya" },
    { symbol: "CIMSA", name: "Çimsa", type: "Hisse", market: "BIST", indexNote: "Eğitim amaçlı örnek sembol", base: 36.4, vol: 0.024, drift: 0.00012, pe: 6.8, pb: 1.2, dy: 3.0, de: 0.9, note: "Çimento" },
    { symbol: "ENKAI", name: "Enka İnşaat", type: "Hisse", market: "BIST", indexNote: "Eğitim amaçlı örnek sembol", base: 62.1, vol: 0.019, drift: 0.0002, pe: 12.0, pb: 1.5, dy: 1.8, de: 0.25, note: "Müteahhitlik / enerji" },
    { symbol: "TUPRS", name: "Tüpraş", type: "Hisse", market: "BIST", indexNote: "Eğitim amaçlı örnek sembol · dönemsel", base: 168, vol: 0.026, drift: 0.00015, pe: 5.5, pb: 1.3, dy: 6.0, de: 0.85, note: "Rafineri · emtia duyarlı" },
    { symbol: "THYAO", name: "Türk Hava Yolları", type: "Hisse", market: "BIST", indexNote: "Eğitim amaçlı örnek sembol · dönemsel", base: 298.5, vol: 0.028, drift: 0.00025, pe: 5.2, pb: 1.1, dy: 0, de: 1.85, note: "Havacılık · yüksek borç" },
    { symbol: "KCHOL", name: "Koç Holding", type: "Hisse", market: "BIST", indexNote: "Eğitim amaçlı örnek sembol · holding", base: 178.4, vol: 0.02, drift: 0.0002, pe: 7.6, pb: 1.4, dy: 3.2, de: 0.72, note: "Holding iskontosu" },
    { symbol: "SAHOL", name: "Sabancı Holding", type: "Hisse", market: "BIST", indexNote: "Eğitim amaçlı örnek sembol · holding", base: 92.3, vol: 0.019, drift: 0.00018, pe: 6.9, pb: 1.1, dy: 2.8, de: 0.6, note: "Holding" },
    { symbol: "TCELL", name: "Turkcell", type: "Hisse", market: "BIST", indexNote: "Eğitim amaçlı örnek sembol", base: 95.5, vol: 0.018, drift: 0.00022, pe: 11.8, pb: 1.9, dy: 3.5, de: 0.95, note: "Telekom" },
    { symbol: "EKGYO", name: "Emlak Konut GYO", type: "Gayrimenkul", market: "BIST", indexNote: "Eğitim amaçlı örnek sembol · GYO", base: 9.8, vol: 0.017, drift: 0.0001, pe: 9.0, pb: 0.7, dy: 5.5, de: 0.55, note: "Konut GYO" },
    // --- Diğer İslami araçlar ---
    { symbol: "ALTIN", name: "Gram Altın", type: "Emtia", market: "Emtia", indexNote: "Eğitim amaçlı örnek sembol · emtia", base: 3120, vol: 0.012, drift: 0.0004, pe: null, pb: null, dy: null, de: null, note: "Jeopolitik duyarlı" },
    { symbol: "GUMUS", name: "Gram Gümüş", type: "Emtia", market: "Emtia", indexNote: "Eğitim amaçlı örnek sembol · emtia", base: 38.5, vol: 0.018, drift: 0.0002, pe: null, pb: null, dy: null, de: null, note: "Sanayi + yatırım" },
    { symbol: "SUKUK-TR", name: "Hazine Sukuk (örnek)", type: "Sukuk", market: "Sabit", indexNote: "Eğitim amaçlı örnek sembol · sukuk", base: 102.4, vol: 0.004, drift: 0.00015, pe: null, pb: null, dy: null, de: null, note: "Dayanak / kâr payı" },
    { symbol: "KTL", name: "Katılım Hesabı TL", type: "Katılım", market: "Banka", indexNote: "Eğitim amaçlı örnek sembol · katılım", base: 100, vol: 0.0015, drift: 0.00012, pe: null, pb: null, dy: null, de: null, note: "Kâr-zarar ortaklığı" },
    { symbol: "HYF", name: "Helal Hisse Fonu", type: "Fon", market: "TEFAS örn.", indexNote: "Eğitim amaçlı örnek sembol · fon", base: 4.82, vol: 0.014, drift: 0.00022, pe: 14.0, pb: null, dy: null, de: null, note: "Çeşitlendirilmiş hisse" },
    { symbol: "SKF", name: "Sukuk Fonu", type: "Fon", market: "TEFAS örn.", indexNote: "Eğitim amaçlı örnek sembol · fon", base: 2.15, vol: 0.005, drift: 0.00014, pe: null, pb: null, dy: null, de: null, note: "Düşük vol" },
    { symbol: "GYO-H", name: "Helal GYO (örnek)", type: "Gayrimenkul", market: "BIST", indexNote: "Eğitim amaçlı örnek sembol · GYO", base: 42.6, vol: 0.015, drift: 0.00018, pe: 11.2, pb: 0.85, dy: 4.5, de: 0.95, note: "Kira odaklı" },
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
      desc: "Sukuk + katılım + altın ağırlıklı. Dalgalanma düşük; getiri de sınırlı kalabilir.",
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
      desc: "İstikrar katmanı + filtrelenmiş hisse/fon. F/K çeşitliliği ile öğrenme odaklı.",
      capital: 100000,
      alloc: [
        { symbol: "SUKUK-TR", weight: 0.25 },
        { symbol: "HYF", weight: 0.25 },
        { symbol: "ALTIN", weight: 0.15 },
        { symbol: "ASELS", weight: 0.15 },
        { symbol: "KCHOL", weight: 0.10 },
        { symbol: "GYO-H", weight: 0.10 },
      ],
    },
    {
      id: "buyume",
      badge: "Yüksek risk",
      name: "Büyüme öğretici",
      desc: "Hisse ağırlıklı. Değer gün içinde belirgin artıp azalabilir — psikolojiyi görmek için.",
      capital: 100000,
      alloc: [
        { symbol: "BIMAS", weight: 0.25 },
        { symbol: "THYAO", weight: 0.20 },
        { symbol: "ASELS", weight: 0.20 },
        { symbol: "EREGL", weight: 0.15 },
        { symbol: "HYF", weight: 0.10 },
        { symbol: "ALTIN", weight: 0.10 },
      ],
    },
  ];

  /** Eğitim senaryoları: geçmiş birim fiyat → bugünkü demo fiyat */
  const SCENARIOS = [
    {
      id: "gold-2020",
      badge: "2020",
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
      badge: "2022",
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
      badge: "2023",
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
      badge: "2019",
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
      badge: "2021",
      title: "Döngüsel sektör — çelik zirve anlatısı",
      context: "Emtia döngüsünde kârların şiştiği dönemlerde F/K yanıltıcı derecede düşük görünebilir.",
      symbol: "EREGL",
      entryDate: "2021-08-01",
      entryPrice: 18,
      unit: "1 lot (örnek)",
      expertAngle: "Howard Marks: döngü bilinci — ‘bu sefer farklı’ tuzağı.",
      metricLink: "Döngüselde düşük F/K zirvede tuzak olabilir; PD/DD ve marjlara bak.",
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
  ];

  const LEARN = [
    {
      id: "fk",
      badge: "Metrik",
      title: "F/K (Fiyat / Kazanç) oranı",
      body: "Şirketin piyasa değerinin yıllık kârına oranı. Düşük F/K ‘ucuz’ görünebilir; yüksek F/K büyüme beklentisi taşır. Helal screening’in yerini tutmaz.",
      jump: "metrics",
    },
    {
      id: "pddd",
      badge: "Metrik",
      title: "PD/DD (Fiyat / Defter)",
      body: "Piyasa değeri / özkaynak. 1’in altı iskonto gibi durabilir; varlık kalitesi ve getiri kritiktir.",
      jump: "metrics",
    },
    {
      id: "borc",
      badge: "Metrik · Helal",
      title: "Borç / özkaynak",
      body: "Faiz yükümlülüğü yüksek şirketler hem finansal risk hem şer’i screening açısından daha sıkı incelenir.",
      jump: "briefs",
    },
    {
      id: "volatilite",
      badge: "Portföy",
      title: "Neden değer artar ve azalır?",
      body: "Eklediğin her aracın kendi volatilitesi vardır. Hisse ağırlıklı portföy gün içinde daha çok iner-çıkar; sukuk/katılım daha düz seyreder.",
      jump: "portfolio",
    },
    {
      id: "senaryo",
      badge: "Öğren",
      title: "Geçmiş senaryo ne işe yarar?",
      body: "‘O gün X fiyattan alsaydım’ sorusu, anlatı ile sonuç arasındaki farkı gösterir. Gelecek garantisi değildir.",
      jump: "scenarios",
    },
    {
      id: "cesit",
      badge: "Pratik",
      title: "Öğretici portföy şablonları",
      body: "Muhafazakâr / dengeli / büyüme şablonları risk psikolojisini denemek içindir. Gerçek para yatırma yoktur.",
      jump: "templates",
    },
    {
      id: "haber",
      badge: "Haber",
      title: "Haberler fiyatı nasıl etkiler?",
      body: "Savaş riski → altın; büyük anlaşma → ilgili hisse; faiz sürprizi → sukuk/fon. Haber etkileri sekmesinde düzey ve karar çerçevesi vardır.",
      jump: "news",
    },
    {
      id: "bist",
      badge: "BIST",
      title: "Katılım-benzeri eğitim paneli",
      body: "Eğitim amaçlı örnek semboller ve İslami araçlar tek panelde; simüle fiyat ile izlenir. Resmi screening veya endeks üyeliği iddiası değildir.",
      jump: "bist",
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
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
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
      const r1 = seededRand(d * 19 + symbol.charCodeAt(0) * 7);
      const r2 = seededRand(d * 23 + symbol.length * 11);
      const shock = (r1 - 0.5) * 2 * item.vol;
      const drift = item.drift * (r2 > 0.45 ? 1 : -0.6);
      price = price * (1 + drift + shock);
    }
    // Tick: kullanıcı "yenile" deyince küçük ekstra salınım (↑↓)
    if (tick) {
      const t = seededRand(tick * 0.001 + symbol.charCodeAt(0));
      price *= 1 + (t - 0.5) * item.vol * 1.8;
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
    return { portfolios: [], activeId: null, tick: 0 };
  }

  function load() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const legacy = localStorage.getItem(STORAGE_KEY_LEGACY);
        if (legacy) {
          localStorage.setItem(STORAGE_KEY, legacy);
          raw = legacy;
        }
      }
      if (!raw) return defaultStore();
      const s = JSON.parse(raw);
      if (!s.portfolios) return defaultStore();
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
        c.type.toLowerCase().includes(q)
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
    $("#scenarios-grid").innerHTML = SCENARIOS.map((s) => {
      const now = priceFor(s.symbol, 0, store.tick);
      const pnl = now - s.entryPrice;
      const pnlPct = (pnl / s.entryPrice) * 100;
      const cls = pnl >= 0 ? "up" : "down";
      return `<article class="feature-card">
        <span class="badge">${s.badge}</span>
        <h3>${s.title}</h3>
        <p>${s.context}</p>
        <p class="meta">${s.symbol} · giriş ${s.entryDate} · ${s.unit} @ ${money(s.entryPrice)}</p>
        <div class="result ${cls}">İllüstratif (simülasyon); tarihsel backtest değildir. Bugün: ${money(now)} · K/Z ${money(pnl)} (${pct(pnlPct)})</div>
        <p><b>Uzman açısı:</b> ${s.expertAngle}</p>
        <p><b>Metrik notu:</b> ${s.metricLink}</p>
      </article>`;
    }).join("");
  }

  function renderMetrics() {
    $("#metrics-body").innerHTML = CATALOG.map((c) => {
      const price = priceFor(c.symbol, 0, store.tick);
      return `<tr>
        <td><strong>${c.symbol}</strong></td>
        <td>${c.name}</td>
        <td class="num">${money(price)}</td>
        <td class="num">${c.pe == null ? "—" : num(c.pe, 1)}</td>
        <td class="num">${c.pb == null ? "—" : num(c.pb, 2)}</td>
        <td class="num">${c.dy == null ? "—" : num(c.dy, 1) + "%"}</td>
        <td class="num">${c.de == null ? "—" : num(c.de, 2)}</td>
        <td><span class="muted">${c.note}</span></td>
      </tr>`;
    }).join("");
  }

  function renderLearn() {
    $("#learn-grid").innerHTML = LEARN.map(
      (c) => `<article class="learn-card">
        <span class="badge">${c.badge}</span>
        <h3>${c.title}</h3>
        <p>${c.body}</p>
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


  function goView(view) {
    document.querySelectorAll(".nav-item").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.view === view);
    });
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("is-active"));
    $(`#view-${view}`).classList.add("is-active");
    const titles = {
      portfolio: "Portföyüm",
      bist: "Katılım-benzeri eğitim paneli (simülasyon)",
      news: "Haber etkileri",
      templates: "Öğretici portföyler",
      scenarios: "Geçmiş senaryolar",
      metrics: "Metrikler",
      learn: "Öğren",
      briefs: "Briefler",
    };
    $("#view-title").textContent = titles[view] || view;
    if (view === "portfolio" && active()) renderCharts();
    if (view === "scenarios") renderScenarios();
    if (view === "bist") renderBist();
    if (view === "news") renderNews();
  }

  function renderAll() {
    refreshSelect();
    showLive();
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
    renderNews();
  }

  function fillAddSelect(pre) {
    const sel = $("#add-symbol");
    sel.innerHTML = CATALOG.map(
      (c) =>
        `<option value="${c.symbol}" ${pre === c.symbol ? "selected" : ""}>${c.symbol} — ${c.name}</option>`
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
    }
  });

  // Anlık demo fiyat: birkaç saniyede bir tick
  setInterval(() => {
    store.tick = Date.now();
    // localStorage'a her tick yazma — sadece bellek
    const bistView = $("#view-bist");
    if (bistView && bistView.classList.contains("is-active")) renderBist();
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
