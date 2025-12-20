// src/constants/content.js

/**
 * Opsiron Web Sitesi - Merkezi İçerik Yönetimi
 * Tüm hardcoded içerikler bu dosyada toplanmıştır.
 */

// ============================================
// SITE META BİLGİLERİ
// ============================================
export const SITE_META = {
  siteName: "Opsiron",
  tagline: "Operasyonel Netlik",
  domain: "opsiron.com",
  siteUrl: "https://opsiron.com",
  author: "Opsiron",
  foundedYear: 2025,
  
  // Default SEO
  defaultTitle: "Opsiron - İşletme Yönetim Sistemleri",
  defaultDescription: "Üretim atölyelerinden hizmet noktalarına kadar uzanan karmaşık süreçlerde, işletmelerin kârlılığını sessizce eriten 'görünmeyen kayıpları' tespit edip görünür kılan stratejik teknoloji ortağınızdır.",
  defaultKeywords: ["ERP", "Üretim Yönetimi", "Stok Takibi", "Restoran Yönetim Sistemi", "İşletme Yazılımı", "CraftOps", "ServeOps"],
  
  // Social Media
  social: {
    twitter: "@opsiron",
    linkedin: "opsiron",
    facebook: "opsiron",
  },
  
  // Open Graph Defaults
  ogImage: "/og-image.png", // 1200x630
  ogType: "website",
};

// ============================================
// SAYFA BAZLI SEO BİLGİLERİ
// ============================================
export const PAGE_SEO = {
  home: {
    title: "Opsiron - Sezgisel Kararların Yerini Veriye Dayalı Netlik Alsın",
    description: "Üretim ve hizmet odaklı işletmelerin operasyonlarını tek bir doğruluk kaynağında birleştiren, sürdürülebilir çözümler.",
    keywords: ["operasyonel yönetim", "üretim yazılımı", "stok yönetim sistemi", "ERP Türkiye"],
  },
  about: {
    title: "Hakkımızda - Operasyonel Netlik Sağlayan Teknoloji Ortağınız | Opsiron",
    description: "2025 yılında işletmelerin operasyonel kör noktalarını aydınlatmak için kurulmuş yeni nesil teknoloji şirketi. Tek doğruluk kaynağı felsefesiyle çalışıyoruz.",
    keywords: ["opsiron hakkında", "şirket vizyon", "teknoloji ortağı"],
  },
  craftops: {
    title: "CraftOps - Üretim ve Stok Yönetim Sistemi | Opsiron",
    description: "Üretim atölyeleri için stok, reçete ve finansal yönetimi tek platformda birleştiren modüler sistem. Görünmeyen zararları tespit edin.",
    keywords: ["üretim yönetimi", "stok takibi", "reçete yönetimi", "maliyet analizi", "craftops"],
  },
  serveops: {
    title: "ServeOps - Restoran ve Kafe Yönetim Sistemi | Opsiron",
    description: "POS entegrasyonlu, reçete bazlı stok takibi ve kârlılık analizi. Restoranınızın görünmeyen zararlarını ortaya çıkarın.",
    keywords: ["restoran yönetimi", "pos entegrasyonu", "kafe yazılımı", "menü mühendisliği", "serveops"],
  },
  pricing: {
    title: "Fiyatlandırma - İşletmenize Değer Katan Model | Opsiron",
    description: "Modüler fiyatlandırma yapısı. İhtiyacınız olmayan özelliklere para ödemeyin. Stok, finans veya tam entegrasyon paketleri.",
    keywords: ["erp fiyatları", "yazılım abonelik", "işletme yazılımı maliyet"],
  },
  contact: {
    title: "İletişim - İşletmenizi Tanıyalım | Opsiron",
    description: "Ücretsiz keşif görüşmesi için iletişime geçin. Operasyonel kör noktalarınızı tespit edelim ve size özel çözüm oluşturalım.",
    keywords: ["opsiron iletişim", "demo talebi", "teklif al"],
  },
privacy: {
    title: "Gizlilik Politikası | Opsiron",
    description: "Opsiron olarak kişisel verilerinizi nasıl topladığımız, kullandığımız ve koruduğumuz hakkında bilgiler.",
    keywords: ["gizlilik politikası", "veri güvenliği", "opsiron gizlilik"],
  },
  terms: {
    title: "Kullanım Koşulları | Opsiron",
    description: "Opsiron web sitesi ve hizmetlerinin kullanımına dair yasal şartlar ve hükümler.",
    keywords: ["kullanım koşulları", "hizmet şartları", "yasal uyarı"],
  },
  kvkk: {
    title: "KVKK Aydınlatma Metni | Opsiron",
    description: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında haklarınız ve veri işleme süreçlerimiz.",
    keywords: ["kvkk", "kişisel verilerin korunması", "aydınlatma metni"],
  },
};

// ============================================
// İLETİŞİM BİLGİLERİ
// ============================================
export const CONTACT_INFO = {
  email: "hello@opsiron.com",
  phone: "+90 (537) 690 33 33",
  phoneRaw: "+905376903333", // tel: link için
  address: {
    city: "Ankara",
    country: "Türkiye",
    full: "Ankara / Türkiye",
  },
  
  // Çalışma Saatleri
  workingHours: {
    weekdays: "09:00 - 18:00",
    weekend: "Kapalı",
  },
  
  // SLA
  responseTime: "24 saat içinde yanıt",
};

// ============================================
// CRAFTOPS ÖZELLİKLERİ
// ============================================
export const CRAFTOPS_FEATURES = {
  // Modül 1: Sadece Stok
  stock: [
    "Hammadde Giriş/Çıkış",
    "Anlık Stok Sayımı",
    "Kritik Seviye Uyarıları",
    "Tedarikçi Takibi",
  ],
  
  // Modül 2: Sadece Finans
  financial: [
    "Reçete Bazlı Maliyet",
    "Üretim Fire Analizi",
    "Satın alma & Satış",
    "Kârlılık Raporları",
  ],
  
  // Modül 3: Tam Entegrasyon
  full: [
    "Tüm Stok Özellikleri",
    "Tüm Finansal Özellikler",
    "Uçtan Uca İzlenebilirlik",
    "Rol Bazlı Yetkilendirme",
  ],
  
  // Detaylı Özellikler (Grid Section)
  detailedFeatures: [
    {
      icon: "Box",
      title: "Akıllı Stok Yönetimi",
      description: "Kritik stok uyarıları, raf takibi ve mobil barkodlu sayım imkanı.",
    },
    {
      icon: "Wallet",
      title: "Finansal Hareketler",
      description: "Tedarikçi ödemeleri, müşteri tahsilatları ve vadesi gelen borç takibi.",
    },
    {
      icon: "FileText",
      title: "Dinamik Reçeteler",
      description: "Ürün reçetelerini tanımlayın, hammadde fiyatı değişince maliyetiniz otomatik güncellensin.",
    },
    {
      icon: "ArrowRightLeft",
      title: "Satın alma & Satış",
      description: "Tekliften siparişe, siparişten faturaya dönüşen entegre süreç yönetimi.",
    },
    {
      icon: "PieChart",
      title: "Görünmeyen Kayıp Analizi",
      description: "Sistemdeki teorik stok ile sayım arasındaki farkı (fire/kayıp) finansal değeriyle raporlayın.",
    },
    {
      icon: "Users",
      title: "Rol Bazlı Yetkilendirme",
      description: "Satın almacı fiyatları görsün, depo personeli sadece miktarları. Kim neyi görmeli siz karar verin.",
    },
  ],
  
  // Mevcut Durum vs Çözüm
  problems: [
    "Excel'de unutulan siparişler ve hatalı formüller.",
    "Stokta var sanılan ama rafta olmayan ürünler.",
    "Tahmini maliyetle fiyat verip zarar etmek.",
    "Satış yaparken kâr mı zarar mı ettiğini ay sonunda öğrenmek.",
  ],
};

// ============================================
// SERVEOPS ÖZELLİKLERİ
// ============================================
export const SERVEOPS_FEATURES = {
  upcoming: [
    {
      icon: "Receipt",
      title: "POS Entegrasyonu",
      description: "Satılan her ürün, anında stoktan reçetesiyle birlikte düşer. Manuel stok girmek yok.",
    },
    {
      icon: "TrendingUp",
      title: "Canlı Kârlılık Analizi",
      description: "Hangi ürün ciro yapıyor, hangisi gerçekten kâr bırakıyor? Menü mühendisliği için net veri.",
    },
    {
      icon: "AlertCircle",
      title: "Kayıp & Kaçak Takibi",
      description: "Teorik stok ile gerçek sayım arasındaki farkı (waste/zayi) TL cinsinden raporlayın.",
    },
  ],
  
  status: {
    label: "Yakında",
    phase: "Early Access / Pilot Program",
    description: "Şu an pilot kullanıcılarımızla birlikte geliştirdiğimiz modüller",
  },
};

// ============================================
// FİYATLANDIRMA
// ============================================
export const PRICING_PLANS = {
  craftops: {
    modules: [
      {
        id: "stock",
        name: "Stok Modülü",
        subtitle: "Depo düzeni ve sayım kontrolü isteyenler için",
        icon: "Package",
        features: CRAFTOPS_FEATURES.stock,
        ctaText: "Teklif İste",
        ctaLink: "/contact",
      },
      {
        id: "financial",
        name: "Finans Modülü",
        subtitle: "Maliyet, reçete ve kârlılığı görmek isteyenler için",
        icon: "PieChart",
        features: CRAFTOPS_FEATURES.financial,
        ctaText: "Teklif İste",
        ctaLink: "/contact",
      },
      {
        id: "full",
        name: "Tam Entegre Modül",
        subtitle: "Stok ve finansın tek ekranda yönetildiği yapı",
        icon: "Layers",
        features: CRAFTOPS_FEATURES.full,
        recommended: true,
        ctaText: "Analiz Talep Et",
        ctaLink: "/contact",
      },
    ],
  },
  
  // Hizmet Modeli
  serviceModel: {
    setup: {
      title: "Kurulum & Onboarding (Tek Seferlik)",
      description: "Sistemin teknik kurulumu, veri aktarımı (reçeteler, cariler, stoklar) ve personel eğitimi bu aşamada yapılır.",
    },
    subscription: {
      title: "Hizmet Aboneliği (Aylık/Yıllık)",
      description: "Sunucu barındırma, güvenlik, yedekleme ve sürekli teknik destek hizmetini kapsar.",
      includes: [
        "Sunucu maliyetleri ve veri yedekleme",
        "SSL sertifikası ve güvenlik güncellemeleri",
        "Yeni özellikler ve versiyon yükseltmeleri",
        "Öncelikli teknik destek kanalı",
        "Hata düzeltmeleri ve bakım",
      ],
    },
    whySetupFee: {
      title: "Neden Kurulum Ücreti Var?",
      reason: "Çoğu ERP projesinin başarısız olma sebebi, yanlış veri girişi ve yetersiz eğitimdir. Biz size sadece bir 'kullanıcı adı' satmıyoruz. İşleyen, verileri temizlenmiş ve personelin kullanabildiği çalışan bir sistem teslim ediyoruz. Bu efor, projenin başarısı için kritiktir.",
    },
  },
};

// ============================================
// FAQ VERİLERİ
// ============================================
export const FAQ_DATA = [
  {
    id: 1,
    question: "Neden web sitesinde sabit bir fiyat listesi yok?",
    answer: "Çünkü 'kullanıcı başı lisans' satan bir SaaS değiliz. İşletmenizin ölçeği, şube sayısı ve ihtiyaç duyduğu modüllere (sadece stok, finans veya entegre) göre size özel, sürdürülebilir bir teklif oluşturuyoruz.",
    category: "pricing",
  },
  {
    id: 2,
    question: "ServeOps ürününü hemen satın alabilir miyim?",
    answer: "ServeOps şu an 'Early Access' (Erken Erişim) dönemindedir. Sadece seçili pilot işletmelerle çalışıyoruz. Başvuru formunu doldurarak bekleme listesine katılabilirsiniz.",
    category: "serveops",
  },
  {
    id: 3,
    question: "Sistemi denemek için demo hesabı açabilir miyim?",
    answer: "Size boş bir ekran verip 'inceleyin' demek yerine; süreçlerinizi dinlediğimiz 30 dakikalık bir online görüşme yapıyoruz. Size uygunsa, verilerinizle oluşturulmuş bir pilot ortam sunuyoruz.",
    category: "demo",
  },
  {
    id: 4,
    question: "Kurulum ücreti ödemek zorunda mıyım?",
    answer: "Evet. Biz sadece yazılım vermiyoruz; verilerinizi temizliyor, reçetelerinizi sisteme giriyor ve ekibinizi eğitiyoruz. Sistemin gerçekten çalışması için bu kurulum süreci zorunludur.",
    category: "pricing",
  },
  {
    id: 5,
    question: "Küçük bir atölyeyim, yine de kullanabilir miyim?",
    answer: "Kesinlikle. CraftOps'un 'Sadece Stok' modülü ile başlayıp, işler büyüdükçe finansal modülleri devreye alabilirsiniz. İhtiyacınız olmayan özelliklere para ödemezsiniz.",
    category: "craftops",
  },
  {
    id: 6,
    question: "Verilerim güvende mi? Yedekleme nasıl yapılıyor?",
    answer: "Verileriniz şifrelenmiş olarak bulut sunucularımızda saklanır. Günlük otomatik yedekleme yapılır ve 30 günlük yedek geçmişi tutulur. ISO 27001 standartlarına uygun güvenlik protokolleri uygularız.",
    category: "security",
  },
  {
    id: 7,
    question: "Mevcut Excel tablolarımı aktarabilir miyim?",
    answer: "Evet. Kurulum sürecinde Excel, CSV veya diğer formatlardan veri aktarımı yapılır. Verileriniz temizlenir, standardize edilir ve sisteme doğru şekilde girilir.",
    category: "migration",
  },
  {
    id: 8,
    question: "Mobil uygulama var mı?",
    answer: "Web tabanlı sistemimiz responsive tasarıma sahip ve mobil cihazlardan kullanılabilir. Native mobil uygulama 2025 roadmap'inde planlanmıştır.",
    category: "technical",
  },
];

// ============================================
// NEDEN OPSİRON (Home Page)
// ============================================
export const WHY_OPSIRON = [
  {
    icon: "LayoutGrid",
    title: "Modüler Mimari",
    description: "İster sadece stok takibi yapın, ister kapsamlı finansal analizleri ekleyin. İhtiyacınız olmayan özelliklere para ödemezsiniz. Bir modülle başlayıp, işletme büyüdükçe genişletin.",
  },
  {
    icon: "Zap",
    title: "İşletmeye Özel Yapılandırma",
    description: "Herkes için aynı şablon değil. Sizin reçete mantığınıza, üretim firelerinize ve tahsilat döngünüze göre özelleştirilmiş, yaşayan bir sistem.",
  },
  {
    icon: "LineChart",
    title: "Görünmeyen Kayıpları Görünür Kılın",
    description: "Excel ve WhatsApp karmaşasında kaybolan stok hataları, unutulan ödemeler ve maliyet sızıntılarını tespit edin. 'Tahmini' değil 'Gerçek' kârlılığı görün.",
  },
];

// ============================================
// OPSİRON FARKI (About Page)
// ============================================
export const OPSIRON_DIFFERENCE = [
  "Sahada personeli yormayan arayüzler",
  "Ürün altyapısı üzerine terzi işi kurulum",
  "Operasyonel yükü azaltan otomasyonlar",
  "Sadece veri giren değil, karar aldıran sistem",
  "İşletmeyle birlikte büyüyen modüler yapı",
];

// ============================================
// ÇALIŞMA MODELİ (About & Home Pages)
// ============================================
export const WORKING_MODEL = [
  {
    step: "01",
    title: "Süreç Analizi",
    description: "İşletmenizi ziyaret ediyor veya online toplantı ile operasyonunuzu, stok mantığınızı ve finans döngünüze hakim oluyoruz.",
  },
  {
    step: "02",
    title: "Kapsam Belirleme",
    description: "Sadece stok mu, sadece finansal takip mi, yoksa tam entegrasyon mu? CraftOps veya ServeOps modüllerinden hangilerine ihtiyacınız olduğunu seçiyoruz.",
  },
  {
    step: "03",
    title: "Konfigürasyon",
    description: "Sıfırdan yazmıyoruz, ayarlıyoruz. Alanlar, raporlar ve akışlar işletmenizin diline göre uyarlanıyor.",
  },
  {
    step: "04",
    title: "Devreye Alma & Eğitim",
    description: "Geçmiş verilerinizi aktarıyor, ekibinize pratik kullanım eğitimi veriyor ve sistemi 'canlı'ya alıyoruz.",
  },
  {
    step: "05",
    title: "Pilot Kullanım",
    description: "İlk haftalarda yanınızdayız. Gerçek saha kullanımında ortaya çıkan ihtiyaçlara göre ince ayarlar yapıyoruz.",
  },
  {
    step: "06",
    title: "Süreklilik",
    description: "Abonelik modeliyle düzenli güncellemeler, veri güvenliği ve teknik destek hizmetimiz devam ediyor.",
  },
];

// ============================================
// NİHAİ HEDEFLER (About Page)
// ============================================
export const COMPANY_GOALS = [
  "Operasyonel karmaşayı %80 oranında azaltmak",
  "Stok kaçaklarını ve görünmez maliyetleri sıfırlamak",
  "İşletme sahibine 'sürprizsiz' bir finansal tablo sunmak",
  "Teknolojiyle büyüyen, sürdürülebilir işletmeler yaratmak",
];

// ============================================
// SOSYAL KANIT (Social Proof)
// ============================================
export const BRAND_LOGOS = [
  "KAVURHANELER",
  "BUTİK ÜRETİCİLER",
  "RESTORAN ZİNCİRLERİ",
  "KAFELER",
];

// ============================================
// İLETİŞİM FORM SEÇENEKLERİ
// ============================================
export const CONTACT_FORM_OPTIONS = {
  interestArea: [
    { value: "craftops", label: "CraftOps (Üretim & Stok)" },
    { value: "serveops", label: "ServeOps (Restoran & Hizmet)" },
    { value: "consulting", label: "Genel Danışmanlık / Emin Değilim" },
  ],
};

// ============================================
// SÜREÇ BİLGİLENDİRMESİ (Contact Page)
// ============================================
export const CONTACT_PROCESS = [
  {
    step: "1",
    title: "Ön İnceleme",
    description: "Formdaki verilerinize göre işletmenizin yapısını analiz ederiz.",
  },
  {
    step: "2",
    title: "Keşif Toplantısı",
    description: "30 dakikalık online görüşmede sorunlarınızı dinler, çözüm haritası çıkarırız.",
  },
  {
    step: "3",
    title: "Teklif & Demo",
    description: "Size özel yapılandırılmış demo ortamı ve fiyat teklifini sunarız.",
  },
];

// ============================================
// MOCK DATA (Demo Purposes)
// ============================================
export const MOCK_DASHBOARD_DATA = {
  craftops: {
    productionWaste: "8.2%",
    criticalStock: 3,
    workshop: "Atölye A",
  },
  serveops: {
    status: "Geliştiriliyor",
    dailySales: "POS Entegre",
  },
};

// ============================================
// KVKK & YASAL
// ============================================
export const LEGAL = {
  kvkkText: "Formu göndererek KVKK aydınlatma metnini kabul etmiş olursunuz.",
  copyright: `© ${new Date().getFullYear()} Opsiron. Tüm hakları saklıdır.`,
};

// ============================================
// CTA MESSAGES
// ============================================
export const CTA_MESSAGES = {
  home: {
    title: "Excel karmaşasına son verin.",
    subtitle: "CraftOps ile üretimi, ServeOps ile geleceği planlayın. İşletmenize özel çözüm için hemen tanışalım.",
  },
  about: {
    title: "İşletmenize uygun çözümü birlikte kuralım.",
    subtitle: "İhtiyaç analizi için görüşelim. CraftOps veya ServeOps'un işletmenize neler katabileceğini konuşalım.",
  },
  craftops: {
    title: "Sizin İçin Analiz Yapalım",
    description: "Dağınık veriyi 'Tek Doğruluk Kaynağı'na dönüştürürüz.",
  },
  pricing: {
    title: "Size uygun planı oluşturalım.",
    subtitle: "İşletmenizin ölçeğine ve ihtiyacına göre en doğru maliyeti çıkarmak için tanışalım.",
  },
};

// ============================================
// NAVIGATION MENU
// ============================================
export const NAVIGATION = [
  { path: "/", label: "Ana Sayfa" },
  { path: "/about", label: "Hakkımızda" },
  { path: "/craftops", label: "CraftOps" },
  { path: "/serveops", label: "ServeOps" },
  { path: "/pricing", label: "Fiyatlandırma" },
  { path: "/contact", label: "İletişim" },
];

// ============================================
// FOOTER LINKS
// ============================================
export const FOOTER_LINKS = {
  products: [
    { path: "/craftops", label: "CraftOps (Üretim)" },
    { path: "/serveops", label: "ServeOps (Hizmet)" },
  ],
  corporate: [
    { path: "/about", label: "Hakkımızda & Vizyon" },
    { path: "/contact", label: "İletişim" },
  ],
  legal: [
    { path: "/privacy", label: "Gizlilik Politikası" },
    { path: "/terms", label: "Kullanım Koşulları" },
    { path: "/kvkk", label: "KVKK" },
  ],
};

// ============================================
// EXPORT DEFAULT (Tüm içeriği tek objede)
// ============================================
export default {
  SITE_META,
  PAGE_SEO,
  CONTACT_INFO,
  CRAFTOPS_FEATURES,
  SERVEOPS_FEATURES,
  PRICING_PLANS,
  FAQ_DATA,
  WHY_OPSIRON,
  OPSIRON_DIFFERENCE,
  WORKING_MODEL,
  COMPANY_GOALS,
  BRAND_LOGOS,
  CONTACT_FORM_OPTIONS,
  CONTACT_PROCESS,
  MOCK_DASHBOARD_DATA,
  LEGAL,
  CTA_MESSAGES,
  NAVIGATION,
  FOOTER_LINKS,
};