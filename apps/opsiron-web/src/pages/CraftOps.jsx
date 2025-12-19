import React from 'react';
import { 
  Box, ClipboardList, FileText, QrCode, PieChart, Users, X, Wallet, 
  ArrowRightLeft, ShieldCheck, Check, Package, Layers, AlertCircle 
} from 'lucide-react';

// Common Components
import SEO from '../components/common/SEO';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

// Data
import { 
  PAGE_SEO, 
  CRAFTOPS_FEATURES, 
  PRICING_PLANS, 
  CTA_MESSAGES 
} from '../constants/content';

// Icon Mapping
const iconMap = {
  Box, Wallet, FileText, ArrowRightLeft, PieChart, Users, 
  Package, Layers, ClipboardList, QrCode
};

export default function CraftOps() {

  // Google Analytics Tracking
  const trackConversion = (label) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🎯 Conversion Tracked: ${label}`);
    }
  };

  return (
    <>
      {/* 1. SEO */}
      <SEO 
        title={PAGE_SEO.craftops.title}
        description={PAGE_SEO.craftops.description}
        keywords={PAGE_SEO.craftops.keywords}
      />

      {/* 2. HERO SECTION */}
      <header className="pt-[calc(theme(spacing.header)+4rem)] pb-24 border-b border-border-gray">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-light tracking-tighter leading-[1.1] mb-6">
                CraftOps: İşletmenize Göre <span className="italic text-muted">Şekillenen</span> Yönetim Sistemi
              </h1>
              <p className="text-lg text-muted font-light mb-8 leading-relaxed">
                Sadece stok saymak yetmez. CraftOps; üretimi, stoğu ve finansı "Tek Doğruluk Kaynağı"nda birleştirir. 
                Görünmeyen zararları tespit eder, işletmenizi veriye dayalı yönetmenizi sağlar.
              </p>
              
              
            </div>

            {/* Visual: Live Data Mock */}
            <div className="bg-card border border-border-gray shadow-2xl rounded-sm overflow-hidden" role="region" aria-label="Canlı Veri Önizlemesi">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[0.65rem] uppercase tracking-[0.15em] font-semibold text-light">Canlı Operasyon Özeti</span>
                  <span className="text-[10px] bg-page px-2 py-0.5 border border-border-gray text-muted uppercase">Anlık Veri</span>
                </div>
                
                {/* Stok Barı */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-dark font-medium">Stok: <span className="font-light text-muted ml-1">Çelik Levha</span></span>
                    <span className="text-dark font-medium">%85 Dolu</span>
                  </div>
                  <div className="h-1 w-full bg-page overflow-hidden">
                    <div 
                      className="h-full bg-dark transition-all duration-1000" 
                      style={{ width: '85%' }}
                      role="progressbar"
                      aria-valuenow="85"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>

                {/* Finans Barı */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-dark font-medium">Finans: <span className="font-light text-muted ml-1">Tahsilat Bekleyen</span></span>
                    <span className="text-dark font-bold">145.000 ₺</span>
                  </div>
                  <div className="h-1 w-full bg-page overflow-hidden">
                    <div 
                      className="h-full bg-dark" 
                      style={{ width: '60%' }}
                      role="progressbar"
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>

                {/* Kritik Uyarı */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-dark font-medium">Uyarı: <span className="font-light text-muted ml-1">Plastik Granül</span></span>
                    <span className="text-critical font-bold flex items-center gap-1.5 animate-pulse">
                      <AlertCircle size={14} /> Kritik Seviye
                    </span>
                  </div>
                  <div className="h-1 w-full bg-page overflow-hidden">
                    <div 
                      className="h-full bg-critical" 
                      style={{ width: '12%' }}
                      role="progressbar"
                      aria-valuenow="12"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* 3. MODÜLER YAPI (Pricing Plans) */}
      <section className="py-24 bg-page border-b border-border-gray">
        <div className="container mx-auto px-6">
             <div className="max-w-3xl mb-16">
                <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-4">Gerçek İhtiyacınıza Göre Kurulum</h2>
                <p className="text-muted font-light leading-relaxed text-lg">CraftOps bir "paket program" dayatması değildir. İşletmenizin ölçeğine ve ihtiyacına göre yapılandırılır.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PRICING_PLANS.craftops.modules.map((module, index) => {
                const isRecommended = module.recommended;
                
                return (
                  <Card 
                    key={module.id} 
                    variant={isRecommended ? 'elevated' : 'default'}
                    className={`border-t-4 transition-all duration-300 ${isRecommended ? 'border-t-dark scale-[1.02]' : 'border-t-muted opacity-90'}`}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-medium tracking-tight m-0">{index + 1}. {module.name}</h3>
                      {isRecommended && (
                        <span className="bg-dark text-white text-[10px] uppercase tracking-widest px-3 py-1">Önerilen</span>
                      )}
                    </div>
                    
                    <p className="text-muted font-light text-[0.95rem] mb-8 min-h-[48px] leading-relaxed">
                      {module.subtitle}
                    </p>
                    
                    <ul className="space-y-4 mb-8">
                      {module.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-[0.9rem] text-dark font-light">
                          <Check size={18} className="text-good shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
        </div>
      </section>

      {/* 4. DETAYLI ÖZELLİKLER */}
      <section className="py-24 border-b border-border-gray">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
                <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-4">Altyapı Yetenekleri</h2>
                <p className="text-muted font-light">İhtiyaç duyduğunuzda devreye alınabilecek güçlü modüller.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CRAFTOPS_FEATURES.detailedFeatures.map((feature, index) => {
                const Icon = iconMap[feature.icon] || Box;
                return (
                  <Card key={index} hoverable className="p-10 border border-border-gray hover:border-dark transition-colors group">
                    <Icon className="mb-6 text-dark opacity-30 group-hover:opacity-100 transition-opacity" size={32} />
                    <h3 className="text-xl font-medium tracking-tight mb-4">{feature.title}</h3>
                    <p className="text-muted font-light text-[0.95rem] leading-relaxed">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
        </div>
      </section>

      {/* 5. KARŞILAŞTIRMA (Comparison Table) */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                
                {/* Sol: Karşılaştırma Tablosu */}
                <div className="w-full">
                    <h3 className="text-2xl md:text-3xl font-light tracking-tighter mb-10">Neden Geçiş Yapmalısınız?</h3>
                    <div className="overflow-x-auto border border-border-gray">
                      <table className="w-full text-left border-collapse bg-white">
                        <thead>
                          <tr className="bg-page">
                            <th className="p-5 border-b border-border-gray text-muted font-semibold text-[0.7rem] uppercase tracking-widest">Problem (Geleneksel)</th>
                            <th className="p-5 border-b border-border-gray text-dark font-bold text-[0.7rem] uppercase tracking-widest">CraftOps Çözümü</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-gray">
                          {CRAFTOPS_FEATURES.problems.map((problem, index) => (
                            <tr key={index} className="group hover:bg-page transition-colors">
                              <td className="p-5 text-[0.9rem] text-muted font-light align-top">
                                <div className="flex gap-3">
                                  <X className="text-critical shrink-0 mt-1" size={16} />
                                  <span>{problem}</span>
                                </div>
                              </td>
                              <td className="p-5 text-[0.9rem] text-dark font-medium align-top">
                                <div className="flex gap-3">
                                  <Check className="text-good shrink-0 mt-1" size={16} />
                                  <span>Otomatize edilmiş, hatasız veri akışı.</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                </div>

                {/* Sağ: Çözüm Kartı (CTA) */}
                <Card variant="flat" className="bg-page p-12 border border-border-gray flex flex-col justify-center h-full">
                    <h3 className="text-2xl font-medium tracking-tight mb-6">CraftOps Güvencesi</h3>
                    <p className="mb-10 text-muted font-light leading-relaxed italic">
                      "{CTA_MESSAGES.craftops.description}"
                    </p>
                    
                    <div className="mb-10 p-6 bg-white border border-border-gray rounded-sm">
                        <h4 className="flex items-center gap-3 text-sm font-semibold mb-4 text-dark uppercase tracking-widest">
                            <ShieldCheck size={20} className="text-good" /> Güvenli Geçiş Süreci
                        </h4>
                        <p className="text-sm text-muted font-light leading-relaxed m-0">
                            Size sadece yazılım değil, danışmanlık veriyoruz. Mevcut verilerinizi içeri aktarıyor ve ekibinizi uçtan uca eğitiyoruz.
                        </p>
                    </div>

                    <Button 
                      to="/contact" 
                      variant="primary" 
                      className="w-full"
                      onClick={() => trackConversion('CraftOps Analiz Talebi')}
                    >
                        Sizin İçin Analiz Yapalım
                    </Button>
                </Card>

            </div>
        </div>
      </section>
    </>
  );
}