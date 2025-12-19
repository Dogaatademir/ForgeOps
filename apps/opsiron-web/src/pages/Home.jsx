import React from 'react';
import { 
  Activity, LayoutGrid, LineChart, LifeBuoy, Package, Coffee, 
  Check, Zap, Clock, ArrowRight 
} from 'lucide-react';

// Bileşenler ve Veriler
import SEO from '../components/common/SEO';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { 
  PAGE_SEO, 
  WHY_OPSIRON, 
  WORKING_MODEL, 
  CTA_MESSAGES, 
  MOCK_DASHBOARD_DATA, 
  BRAND_LOGOS 
} from '../constants/content';

// İkon haritası
const iconMap = {
  LayoutGrid,
  Zap,
  LineChart,
  LifeBuoy
};

export default function Home() {

  const trackEvent = (action, label) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Track Event: ${action} - ${label}`);
    }
  };

  return (
    <>
      <SEO 
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        keywords={PAGE_SEO.home.keywords}
      />

      {/* HERO SECTION */}
      <header className="pt-[calc(theme(spacing.header)+4rem)] pb-24 border-b border-border-gray">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Sol Taraf: Metin */}
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-light tracking-tighter leading-[1.1] mb-6">
                Sezgisel kararların yerini <span className="italic text-muted">veriye dayalı netlik</span> alsın
              </h1>
              <p className="text-lg text-muted font-light mb-10 leading-relaxed">
                Opsiron; üretim ve hizmet odaklı işletmelerin operasyonlarını "tek bir doğruluk kaynağında" birleştirir. 
                Hazır paket sistemlerin dayatmalarıyla değil, işletmenizin gerçek ihtiyaçlarına göre şekillenen sürdürülebilir çözümler sunuyoruz.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  to="/craftops" 
                  variant="primary" 
                  size="lg"
                  onClick={() => trackEvent('Click', 'Hero CTA Primary')}
                >
                  Çözümleri İncele
                </Button>
                <Button 
                  to="/contact" 
                  variant="outline" 
                  size="lg"
                  onClick={() => trackEvent('Click', 'Hero CTA Secondary')}
                >
                  Bizimle Tanışın
                </Button>
              </div>
            </div>
            
            {/* Sağ Taraf: Mock Dashboard */}
            <div className="bg-card border border-border-gray shadow-2xl overflow-hidden rounded-sm">
              <div className="p-6 border-b border-border-gray flex justify-between items-center">
                <span className="text-[0.65rem] uppercase tracking-[0.15em] font-semibold text-light">Operasyon Özeti</span>
                <Activity size={20} className="text-light" />
              </div>
              
              <div className="divide-y divide-page">
                {/* Row 1 */}
                <div className="flex p-4 px-6 items-center text-sm">
                  <div className="flex-[2] text-dark font-medium">CraftOps: <span className="font-light text-muted ml-1">Üretim Fire Oranı</span></div>
                  <div className="flex-1 text-muted text-center">{MOCK_DASHBOARD_DATA.craftops.workshop}</div>
                  <div className="flex-1 text-right">
                    <span className="px-3 py-1 border border-border-gray text-[0.7rem] uppercase tracking-widest text-muted">%8.2</span>
                  </div>
                </div>
                
                {/* Row 2 */}
                <div className="flex p-4 px-6 items-center text-sm">
                  <div className="flex-[2] text-dark font-medium">CraftOps: <span className="font-light text-muted ml-1">Kritik Stok Seviyesi</span></div>
                  <div className="flex-1 text-muted text-center">Hammadde</div>
                  <div className="flex-1 text-right">
                    <span className="px-3 py-1 border border-border-gray text-[0.7rem] uppercase tracking-widest text-muted">{MOCK_DASHBOARD_DATA.craftops.criticalStock} Ürün</span>
                  </div>
                </div>
                
                {/* Row 3 */}
                <div className="flex p-4 px-6 items-center text-sm bg-page/30 opacity-60">
                  <div className="flex-[2] text-dark font-medium">ServeOps: <span className="font-light text-muted ml-1">Günlük Satış Trendi</span></div>
                  <div className="flex-1 text-muted text-center">{MOCK_DASHBOARD_DATA.serveops.dailySales}</div>
                  <div className="flex-1 text-right">
                    <span className="px-3 py-1 border border-border-gray text-[0.7rem] uppercase tracking-widest text-muted">{MOCK_DASHBOARD_DATA.serveops.status}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* WHY US SECTION */}
      <section className="py-24 border-b border-border-gray" id="why-opsiron">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-tighter">Neden Opsiron?</h2>
            <p className="text-muted font-light leading-relaxed">İşletmenizi kalıplara sokan hantal yazılımlar yerine, gerçek sorun noktalarınıza odaklanan modüler bir yaklaşım.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_OPSIRON.map((item, index) => {
              const IconComponent = iconMap[item.icon] || LayoutGrid;
              return (
                <Card key={index} padding="lg" hoverable className="border border-border-gray hover:border-light transition-colors group">
                  <IconComponent className="mb-6 text-dark group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="text-xl font-medium mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-muted text-[0.95rem] font-light leading-relaxed">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="py-24 bg-page border-b border-border-gray">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-tighter">Ürünlerimiz</h2>
            <p className="text-muted font-light leading-relaxed">Farklı sektörler, ortak yaklaşım: Template değil, işletmenize özel çözüm.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* CRAFTOPS CARD */}
            <Card className="bg-card border-l-4 border-dark p-10 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[0.65rem] uppercase tracking-[0.15em] font-semibold text-light">Üretim & İmalat</span>
                <Package className="text-dark opacity-10" size={40} />
              </div>
              
              <h3 className="text-2xl font-medium mb-4">CraftOps</h3>
              <p className="text-muted font-light mb-8">Üretim atölyeleri, kahve kavurhaneleri ve gıda üreticileri için uçtan uca yönetim sistemi.</p>
              
              <div className="space-y-4 mb-10">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-light">Öne Çıkan Özellikler:</h4>
                <ul className="space-y-3">
                  {[
                    { label: "Stok & Reçete", desc: "Hammadde ve üretim takibi." },
                    { label: "Gelişmiş Finans", desc: "Satın alma ve cari hesaplar." },
                    { label: "Maliyet Analizi", desc: "Gerçek kârlılık raporları." }
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-[0.9rem] text-muted">
                      <Check size={18} className="text-good shrink-0 mt-0.5" /> 
                      <span><strong className="text-dark font-medium">{f.label}:</strong> {f.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button to="/craftops" variant="primary" className="w-full mt-auto">
                CraftOps'u İncele
              </Button>
            </Card>

            {/* SERVEOPS CARD */}
            <Card className="bg-card border-l-4 border-light p-10 opacity-90 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[0.65rem] uppercase tracking-[0.15em] font-semibold text-light">Restoran & Kafe</span>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-page border border-border-gray text-[0.7rem] uppercase tracking-widest text-muted flex items-center gap-2">
                    <Clock size={12}/> Yakında
                  </span>
                  <Coffee className="text-dark opacity-10" size={40} />
                </div>
              </div>
              
              <h3 className="text-2xl font-medium mb-4">ServeOps</h3>
              <p className="text-muted font-light mb-8">Restoran, kafe ve barlar için POS entegrasyonlu iş zekası ve kârlılık yönetimi.</p>
              
              <div className="space-y-4 mb-10">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-light">Gelecek Özellikler:</h4>
                <ul className="space-y-3">
                  {[
                    { label: "İş Zekası (BI)", desc: "Satış trendleri ve yoğunluk haritası." },
                    { label: "Kayıp Analizi", desc: "Out-of-stock ciro kayıpları." },
                    { label: "Tam Entegrasyon", desc: "POS verisiyle otomatik stok düşümü." }
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-[0.9rem] text-muted">
                      <Check size={18} className="text-light shrink-0 mt-0.5" /> 
                      <span><strong className="text-dark font-medium">{f.label}:</strong> {f.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-auto cursor-not-allowed opacity-50" 
                isDisabled={true}
              >
                Geliştirme Aşamasında
              </Button>
            </Card>

          </div>
        </div>
      </section>

  {/* 5. NASIL ÇALIŞIRIZ (Process - Boxes) */}
        <section className="py-24 border-b border-border-gray">
          <div className="container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-4">Çalışma Modelimiz</h2>
                  <p className="text-muted font-light leading-relaxed">Ürünlerimizi "indir ve kullan" şeklinde değil, bir çözüm ortaklığı süreciyle sunarız.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {WORKING_MODEL.map((step, index) => (
                      <Card 
                        key={index} 
                        variant="default" 
                        className="text-center p-10 border border-border-gray hover:border-dark transition-all group"
                      >
                          <div className="text-5xl font-extralight text-light mb-6 group-hover:text-dark transition-colors" aria-hidden="true">
                              {step.step}
                          </div>
                          <h3 className="text-xl font-medium tracking-tight mb-4">{step.title}</h3>
                          <p className="text-muted font-light text-[0.95rem] leading-relaxed">{step.description}</p>
                      </Card>
                  ))}
              </div>
          </div>
        </section>
  

      {/* SOCIAL PROOF */}
      <section className="py-20 bg-page border-b border-border-gray overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.15em] font-semibold text-light mb-10">Güvenle büyüyen işletmelerin tercihi</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60">
            {BRAND_LOGOS.map((brand, index) => (
              <span key={index} className="text-lg md:text-xl font-semibold text-light tracking-tight grayscale hover:grayscale-0 transition-all cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-dark py-24 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tighter">{CTA_MESSAGES.home.title}</h2>
          <p className="text-white/70 font-light mb-12 max-w-2xl mx-auto text-lg leading-relaxed">{CTA_MESSAGES.home.subtitle}</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <Button to="/contact" variant="white" icon={ArrowRight} iconPosition="right" size="lg">
              Hemen İletişime Geçin
            </Button>
            <Button 
              to="/pricing" 
              variant="outline" 
              size="lg" 
              className="border-white/20 text-white hover:bg-white hover:text-dark"
            >
              Fiyatlandırmayı İncele
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}