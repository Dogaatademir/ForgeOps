import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, HelpCircle, ArrowRight, Package, PieChart, Layers, 
  Sparkles, ShieldCheck, Minus, Plus, Calculator 
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// Common Components
import SEO from '../components/common/SEO';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

// Data
import { 
  PAGE_SEO, 
  PRICING_PLANS, 
  FAQ_DATA, 
  CTA_MESSAGES 
} from '../constants/content';

// ==========================================
// Sub-Component: FAQ Accordion
// ==========================================
const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-border-gray last:border-0">
      <button 
        className="w-full flex justify-between items-center py-5 text-left focus:outline-none group cursor-pointer"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className={`font-medium text-lg transition-colors duration-200 ${isOpen ? 'text-dark' : 'text-muted group-hover:text-dark'}`}>
          {question}
        </span>
        <span className="ml-4 flex-shrink-0 text-light transition-transform duration-300">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-muted font-light text-base leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

// ==========================================
// Sub-Component: Plan Calculator
// ==========================================


// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function Pricing() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <SEO 
        title={PAGE_SEO.pricing.title}
        description={PAGE_SEO.pricing.description}
        keywords={PAGE_SEO.pricing.keywords}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* HERO SECTION */}
<header className="pt-[calc(theme(spacing.header)+4rem)] pb-24 border-b border-border-gray bg-page">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      {/* Sol Taraf: Text Content */}
      <div className="max-w-2xl text-left">
        <h1 className="text-4xl md:text-6xl font-light tracking-tighter leading-[1.1] mb-6">
          İşletmenize <span className="italic text-muted">Değer Katan</span> Model
        </h1>
        <p className="text-lg text-muted font-light mb-10 leading-relaxed">
          Opsiron çözümleri, işletmenizin ihtiyacına göre modüler olarak yapılandırılır. 
          İhtiyacınız olmayan özelliklere para ödemez, kullandıkça büyütürsünüz.
        </p>
 
      </div>

      {/* Sağ Taraf: Hero Visual veya Dekoratif Alan (Diğer sayfalarla uyum için) */}
      <div className="hidden lg:flex justify-center items-center" aria-hidden="true">
        <div className="relative">
          <div className="absolute -inset-4 bg-dark/5 rounded-full blur-3xl"></div>
         
        </div>
      </div>

    </div>
  </div>
</header>



      {/* PRICING CARDS */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-4 flex items-center gap-4">
              CraftOps Paketleri <span className="px-3 py-1 bg-page border border-border-gray text-[10px] font-bold uppercase tracking-widest text-muted">Üretim & Stok</span>
            </h2>
            <p className="text-muted font-light text-lg">Üretim atölyeleri ve imalatçılar için ölçeklenebilir yapılar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_PLANS.craftops.modules.map((plan, index) => {
              const isRecommended = plan.recommended;
              const Icon = index === 0 ? Package : index === 1 ? PieChart : Layers;

              return (
                <Card 
                  key={plan.id}
                  variant={isRecommended ? 'elevated' : 'default'}
                  className={`flex flex-col border-t-4 transition-all duration-300 ${isRecommended ? 'border-t-dark scale-[1.03] md:-translate-y-4' : 'border-t-muted'}`}
                >
                  {isRecommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-dark text-white text-[9px] font-bold px-4 py-1 tracking-[0.2em] uppercase">
                      En Popüler
                    </div>
                  )}

                  <div className="mb-10 text-center">
                    <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-6 ${isRecommended ? 'bg-page text-dark' : 'bg-page/50 text-light'}`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-2xl font-medium tracking-tight mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted font-light">{plan.subtitle}</p>
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-[0.9rem] text-dark font-light">
                        <Check size={18} className="text-good shrink-0 mt-0.5" />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    to="/contact"
                    variant={isRecommended ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    {plan.ctaText}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-24 bg-page border-y border-border-gray overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tighter">Detaylı Karşılaştırma</h2>
          </div>
          
          <div className="overflow-x-auto border border-border-gray rounded-sm">
            <table className="w-full bg-white border-collapse text-left">
              <thead>
                <tr className="bg-white border-b border-border-gray">
                  <th className="p-6 text-[0.7rem] uppercase tracking-widest font-semibold text-light w-1/3">Özellikler</th>
                  <th className="p-6 text-center text-[0.7rem] uppercase tracking-widest font-bold text-dark w-1/5">Stok Modülü</th>
                  <th className="p-6 text-center text-[0.7rem] uppercase tracking-widest font-bold text-dark w-1/5">Finans Modülü</th>
                  <th className="p-6 text-center text-[0.7rem] uppercase tracking-widest font-bold text-dark w-1/5 bg-page/30">Tam Entegre</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-gray">
                {[
                  { name: 'Stok Giriş/Çıkış', s: true, f: false, t: true },
                  { name: 'Reçete (BOM)', s: true, f: true, t: true },
                  { name: 'Cari Hesaplar', s: false, f: true, t: true },
                  { name: 'Fatura/İrsaliye', s: false, f: true, t: true },
                  { name: 'Maliyet Analizi', s: false, f: true, t: true },
                  { name: 'SSOT (Tek Doğruluk)', s: false, f: false, t: true },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-page transition-colors duration-150">
                    <td className="p-6 text-[0.95rem] font-medium text-dark">{row.name}</td>
                    <td className="p-6 text-center">
                      {row.s ? <Check size={20} className="mx-auto text-good" /> : <Minus size={20} className="mx-auto text-border-gray" />}
                    </td>
                    <td className="p-6 text-center">
                      {row.f ? <Check size={20} className="mx-auto text-good" /> : <Minus size={20} className="mx-auto text-border-gray" />}
                    </td>
                    <td className="p-6 text-center bg-page/20">
                      {row.t ? <Check size={20} className="mx-auto text-dark" /> : <Minus size={20} className="mx-auto text-border-gray" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ & GUARANTEE */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16">
          
          {/* FAQ Column */}
          <div className="md:col-span-8">
            <h3 className="text-2xl font-medium tracking-tight mb-10 flex items-center gap-3 text-dark">
              <HelpCircle className="text-light" size={28} /> Sıkça Sorulan Sorular
            </h3>
            <div className="divide-y divide-border-gray border-y border-border-gray">
              {FAQ_DATA.map((item, index) => (
                <AccordionItem 
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFaqIndex === index}
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>

          {/* Guarantee Column */}
          <div className="md:col-span-4">
            <Card variant="default" className="bg-page border border-border-gray p-8 h-full sticky top-24">
              <ShieldCheck size={48} className="text-dark mb-6 opacity-20" />
              <h4 className="text-xl font-medium tracking-tight mb-4 text-dark">Memnuniyet Garantisi</h4>
              <p className="text-sm text-muted font-light mb-8 leading-relaxed">
                Kurulum süreci boyunca sistemin işletmenize uymadığını düşünürseniz, süreç başlamadan iade hakkınız saklıdır. Biz sadece çalışan sistem teslim ederiz.
              </p>
              
              <div className="border-t border-border-gray pt-8 mt-4">
                <h5 className="text-[0.7rem] font-bold uppercase tracking-widest mb-4 text-dark">Diğer Sorularınız İçin</h5>
                <Link to="/contact" className="group flex items-center gap-2 text-dark font-semibold text-sm hover:translate-x-1 transition-transform">
                  Ekibimizle Görüşün <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Card>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-dark py-24 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tighter">{CTA_MESSAGES.pricing.title}</h2>
          <p className="text-white/70 font-light mb-12 max-w-2xl mx-auto text-lg leading-relaxed">{CTA_MESSAGES.pricing.subtitle}</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <Button to="/contact" variant="white" size="lg" icon={ArrowRight} iconPosition="right">
              Teklif İsteyin
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}