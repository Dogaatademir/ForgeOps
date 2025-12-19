import React from 'react';
import { 
  Check, Target, Layers, Settings, Database, 
  TrendingUp, Lightbulb, ArrowRight 
} from 'lucide-react';

// Common Components
import SEO from '../components/common/SEO';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

// Data
import { 
  PAGE_SEO, 
  OPSIRON_DIFFERENCE, 
  WORKING_MODEL, 
  COMPANY_GOALS, 
  CTA_MESSAGES 
} from '../constants/content';

export default function About() {
  return (
    <>
      {/* 1. SEO */}
      <SEO 
        title={PAGE_SEO.about.title}
        description={PAGE_SEO.about.description}
        keywords={PAGE_SEO.about.keywords}
      />

      {/* 2. HERO SECTION */}
      <header className="pt-[calc(theme(spacing.header)+4rem)] pb-24 border-b border-border-gray">
        <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-light tracking-tighter leading-[1.1] mb-6">
              Operasyonel <span className="italic text-muted">Netlik</span>
            </h1>
            <p className="text-lg text-muted font-light max-w-3xl leading-relaxed">
              Opsiron; üretim atölyelerinden hizmet noktalarına kadar uzanan karmaşık süreçlerde, 
              işletmelerin kârlılığını sessizce eriten 'görünmeyen kayıpları' tespit edip görünür kılan 
              stratejik teknoloji ortağınızdır. Kararlarınızı varsayımlara değil, somut verilere dayandırmanızı sağlıyoruz.
            </p>
        </div>
      </header>

      {/* 3. BİZ KİMİZ & VİZYON */}
      <section className="py-24 border-b border-border-gray">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                
                {/* Sol: Metin */}
                <article>
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-light tracking-tighter">Biz Kimiz?</h2>
                    </div>
                    <div className="text-muted font-light text-lg leading-relaxed space-y-6">
                        <p>
                            Opsiron, 2025 yılında işletmelerin operasyonel kör noktalarını aydınlatmak için kurulmuş yeni nesil bir teknoloji şirketidir.
                        </p>
                        <p>
                            <strong className="text-dark font-medium">Biz bir "özel yazılım" ajansı değiliz.</strong> Her müşteri için sıfırdan kod yazmayız. 
                            Kendi geliştirdiğimiz güçlü ürün altyapılarını (CraftOps & ServeOps), işletmenizin reçetesine, 
                            üretim hattına ve finansal döngüsüne göre <em className="italic">yapılandırırız.</em>
                        </p>
                        <p>
                            Böylece "hazır paket" yazılımların katılığından kurtulurken, "özel yazılım" projelerinin yüksek maliyet ve belirsizlik riskini taşımazsınız.
                        </p>
                    </div>
                </article>
                
                {/* Sağ: Vizyon Kartı */}
                <Card 
                  variant="bordered" 
                  className="bg-page border-l-4 border-l-dark p-10" 
                  role="complementary"
                >
                    <div className="flex items-center gap-4 mb-6 text-dark">
                        <Lightbulb size={28} aria-hidden="true" />
                        <h3 className="text-2xl font-medium tracking-tight m-0">Gelecek Vizyonumuz</h3>
                    </div>
                    <div className="space-y-4 text-muted font-light leading-relaxed">
                      <p>
                          Bugün <strong className="text-dark font-medium">CraftOps</strong> ile üretim sahasındaki maliyet ve stok kaçaklarını kontrol altına alıyoruz.
                      </p>
                      <p>
                          Yakın gelecekte ise geliştirme süreci devam eden <strong className="text-dark font-medium">ServeOps</strong> ile restoran ve kafe sektöründe 
                          POS verisini iş zekâsına dönüştüren, "ne satmalı, neyi stoklamalı" sorularına yanıt veren akıllı bir ekosistem kurmayı hedefliyoruz.
                      </p>
                    </div>
                </Card>
            </div>
        </div>
      </section>

      {/* 4. YAKLAŞIMIMIZ (Core Messages) */}
      <section className="py-24 bg-page border-b border-border-gray">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                {/* Sol: Sorun Tespiti */}
                <div className="space-y-10">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-4">Neyi Değiştiriyoruz?</h2>
                      <p className="text-muted font-light leading-relaxed mb-6">
                          Geleneksel işletmelerde veri; Excel dosyalarında, WhatsApp gruplarında ve defter kenarlarında kaybolur. 
                          Bu da "tahmini" kararlara ve görünmeyen zararlara yol açar.
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-6">
                        <div className="p-3 bg-white border border-border-gray rounded-sm shadow-sm shrink-0">
                          <Database className="text-dark" size={24} aria-hidden="true" />
                        </div>
                        <div>
                            <h4 className="text-xl font-medium tracking-tight mb-2">Tek Doğruluk Kaynağı (SSOT)</h4>
                            <p className="text-muted font-light text-[0.95rem]">Stok, finans ve üretim verisi tek bir merkezde konuşur. Birim maliyetiniz ile kasa durumunuz birbiriyle çelişmez.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6">
                        <div className="p-3 bg-white border border-border-gray rounded-sm shadow-sm shrink-0">
                          <TrendingUp className="text-dark" size={24} aria-hidden="true" />
                        </div>
                        <div>
                            <h4 className="text-xl font-medium tracking-tight mb-2">Görünür Kârlılık</h4>
                            <p className="text-muted font-light text-[0.95rem]">Ay sonunda "neden kasada para yok" demek yerine, hangi ürünün size kaybettirdiğini anlık olarak görürsünüz.</p>
                        </div>
                    </div>
                </div>
                
                {/* Sağ: Opsiron Farkı Listesi */}
                <Card variant="default" className="p-10 border border-border-gray shadow-xl">
                    <h3 className="text-2xl font-medium tracking-tight mb-8">Opsiron Farkı</h3>
                    <ul className="space-y-5">
                        {OPSIRON_DIFFERENCE.map((item, index) => (
                            <li key={index} className="flex items-start gap-4">
                                <div className="mt-1 bg-dark text-white p-0.5 rounded-full flex items-center justify-center shrink-0">
                                    <Check size={14} aria-hidden="true" />
                                </div>
                                <span className="text-dark font-light text-[0.95rem] leading-snug">{item}</span>
                            </li>
                        ))}
                    </ul>
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

  

      {/* 7. NİHAİ HEDEF */}
      <section className="py-24 border-b border-border-gray">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-4">Nihai Hedefimiz</h2>
                <p className="text-muted font-light">İşletmeleri "sezgisel" yönetimden, "verisel" yönetime taşımak.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {COMPANY_GOALS.map((goal, index) => (
                    <Card key={index} className="flex items-center gap-4 p-6 border border-border-gray hover:bg-page transition-colors">
                        <Target size={24} className="text-dark opacity-40 shrink-0" aria-hidden="true" />
                        <h4 className="text-[0.95rem] font-medium tracking-tight leading-snug">{goal}</h4>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="bg-dark py-24 text-center">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tighter">{CTA_MESSAGES.about.title}</h2>
            <p className="text-white/70 font-light mb-12 max-w-2xl mx-auto text-lg leading-relaxed">{CTA_MESSAGES.about.subtitle}</p>
            <div className="flex justify-center gap-6 flex-wrap">
                <Button to="/contact" variant="white" size="lg" icon={ArrowRight} iconPosition="right">
                    İletişime Geçin
                </Button>
                <Button to="/pricing" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-dark">
                    Fiyatlandırmayı İncele
                </Button>
            </div>
        </div>
      </section>
    </>
  );
}