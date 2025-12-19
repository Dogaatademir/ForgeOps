import React from 'react';
import { 
  TrendingUp, AlertCircle, Receipt, ArrowRight, 
  Lock, CheckCircle 
} from 'lucide-react';

// Common Components
import SEO from '../components/common/SEO';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';

// Logic & Data
import useForm from '../hooks/useForm';
import { validateServeOpsForm } from '../utils/validation';
import { PAGE_SEO, SERVEOPS_FEATURES } from '../constants/content';

export default function ServeOps() {
  
  // Form State Yönetimi
  const { 
    values, 
    errors, 
    handleChange, 
    handleSubmit, 
    isSubmitting, 
    isSuccess 
  } = useForm(
    { 
      name: '', 
      businessName: '', 
      posSystem: '', 
      problem: '' 
    }, 
    validateServeOpsForm
  );

  // API Submit Handler
  const onSubmit = async (formData) => {
    // Demo amaçlı 1 saniye bekletiyoruz
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form Gönderildi:", formData);
  };

  return (
    <>
      {/* 1. SEO */}
      <SEO 
        title={PAGE_SEO.serveops.title}
        description={PAGE_SEO.serveops.description}
        keywords={PAGE_SEO.serveops.keywords}
      />

      {/* 2. HERO SECTION */}
      <header className="pt-[calc(theme(spacing.header)+4rem)] pb-24 border-b border-border-gray">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Text Content */}
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-light tracking-tighter leading-[1.1] mb-6">
                        ServeOps: Kasanız ciro yazar, biz <span className="italic text-muted">kârınızı</span> hesaplarız.
                    </h1>
                    <p className="text-lg text-muted font-light mb-8 leading-relaxed">
                      POS sisteminiz satışları takip eder, peki maliyetleri? ServeOps, reçete bazlı stok takibi ve POS entegrasyonu ile 
                      restoranınızın "görünmeyen zararlarını" ortaya çıkarır.
                    </p>
                    
                    {/* Beta Badge */}
                    <div className="inline-flex items-center gap-3 mt-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-lg">
                        <div className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                        </div>
                        <span className="text-sm font-semibold">Geliştirme Aşamasında / Early Access</span>
                    </div>
                </div>

                {/* Hero Visual: POS vs Real Data Concept */}
                <div className="flex items-center justify-center min-h-[300px]" aria-hidden="true">
                   <div className="text-center w-full max-w-sm">
                        <div className="text-6xl font-black opacity-10 leading-none mb-2 select-none text-dark">POS</div>
                        <div className="text-xl font-medium mb-4 text-dark">Verisi + Reçete</div>
                        
                        <ArrowRight size={32} className="mx-auto mb-4 opacity-50 animate-bounce text-dark" />
                        
                        <Card variant="elevated" className="bg-white p-6 transform hover:scale-105 transition-transform duration-300">
                            <div className="text-sm text-muted mb-2">Latte (Tek Bardak)</div>
                            <div className="flex justify-between items-center px-4">
                                <div className="text-left">
                                    <span className="block text-xs text-muted uppercase tracking-wider mb-1">Satış</span>
                                    <span className="text-xl font-bold text-dark">120 ₺</span>
                                </div>
                                <div className="h-8 w-px bg-border-gray"></div>
                                <div className="text-left">
                                    <span className="block text-xs text-muted uppercase tracking-wider mb-1">Gerçek Maliyet</span>
                                    <span className="text-xl font-bold text-critical">42 ₺</span>
                                </div>
                            </div>
                        </Card>
                   </div>
                </div>

            </div>
        </div>
      </header>

      {/* 3. PROBLEM / SOLUTION & WAITLIST FORM */}
      <section className="py-24 bg-page border-b border-border-gray">
        <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-16">
                <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-4">Restoran İşletmeciliğindeki "Kör Nokta"</h2>
                <p className="text-muted font-light leading-relaxed">Ürün satılır, para kasaya girer. Ama arka tarafta ne kadar ziyan oldu, reçeteye uyuldu mu, hangisi gerçekten kârlı?</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                
                {/* SOL: ÖZELLİKLER */}
                <div>
                    <h3 className="mb-6 flex items-center gap-2 text-xl font-medium tracking-tight">
                      <Lock size={20} className="text-muted" /> Gelecek Özellik Seti
                    </h3>
                    <p className="mb-8 text-muted font-light">
                      Şu an pilot kullanıcılarımızla birlikte geliştirdiğimiz modüller:
                    </p>
                    
                    <div className="space-y-6">
                      {SERVEOPS_FEATURES.upcoming.map((feature, index) => (
                        <Card 
                          key={index} 
                          // variant="flat" yerine bg-white'ı zorluyoruz
                          className="bg-white border-l-4 border-l-dark p-6 shadow-sm border border-border-gray/50"
                        >
                          <div className="flex gap-4 items-start">
                             <div className="mt-1 opacity-100 text-dark">
                                {index === 0 && <Receipt size={24} />}
                                {index === 1 && <TrendingUp size={24} />}
                                {index === 2 && <AlertCircle size={24} />}
                             </div>
                             <div>
                                <h4 className="text-base font-bold mb-1 text-dark">{feature.title}</h4>
                                <p className="text-sm text-muted font-light m-0">{feature.description}</p>
                             </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                </div>

                {/* SAĞ: BAŞVURU FORMU */}
                <div>
                  <Card variant="elevated" className="border-t-4 border-t-dark relative overflow-hidden p-8 bg-white">
                    
                    {!isSuccess ? (
                      <>
                        <div className="mb-8">
                            <span className="inline-block bg-dark text-white text-[10px] uppercase tracking-widest px-3 py-1 mb-3">
                              PİLOT PROGRAM
                            </span>
                            <h3 className="text-2xl font-medium tracking-tight mb-2">ServeOps'u İlk Kullanan Siz Olun</h3>
                            <p className="text-sm text-muted font-light">
                              Restoran veya kafeniz için pilot işletme olmak ister misiniz? Ürün çıktığında ömür boyu özel fiyattan yararlanın.
                            </p>
                        </div>
                        
                        <form onSubmit={(e) => handleSubmit(onSubmit, e)} noValidate className="space-y-5">
                            <Input 
                              label="Ad Soyad"
                              name="name"
                              placeholder="Örn: Ahmet Yılmaz"
                              value={values.name}
                              onChange={handleChange}
                              error={errors.name}
                              required
                            />
                            
                            <Input 
                              label="İşletme Adı"
                              name="businessName"
                              placeholder="Örn: Luna Coffee Co."
                              value={values.businessName}
                              onChange={handleChange}
                              error={errors.businessName}
                              required
                            />

                            <Input 
                              label="Kullandığınız POS Sistemi"
                              name="posSystem"
                              placeholder="Örn: Omni, SambaPOS, Adisyon vb."
                              value={values.posSystem}
                              onChange={handleChange}
                              error={errors.posSystem}
                              helperText="Entegrasyon önceliği için bu bilgi önemlidir."
                              required
                            />
                            
                            <Input 
                              label="En Büyük Operasyonel Sorununuz?"
                              name="problem"
                              type="textarea"
                              placeholder="Örn: Stok tutmuyor, maliyetleri hesaplayamıyorum..."
                              value={values.problem}
                              onChange={handleChange}
                              error={errors.problem}
                              required
                            />
                            
                            <Button 
                              type="submit" 
                              variant="primary" 
                              className="w-full mt-4"
                              isLoading={isSubmitting}
                              // ArrowRight import edilmemiş olabilir uyarısı almamak için yukarıda import'u kontrol ettim.
                              icon={ArrowRight}
                              iconPosition="right"
                            >
                              Pilot Programına Başvur
                            </Button>
                        </form>
                        <p className="text-xs text-muted mt-6 text-center opacity-70">
                            *Başvurular editör onayından geçmektedir.
                        </p>
                      </>
                    ) : (
                      // SUCCESS STATE
                      <div className="text-center py-12 px-4 animate-[fadeIn_0.5s_ease-out]">
                        <div className="w-16 h-16 bg-green-100 text-good rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-dark">Başvurunuz Alındı!</h3>
                        <p className="text-muted font-light mb-8">
                          ServeOps pilot programına gösterdiğiniz ilgi için teşekkürler. Ekibimiz işletme profilinizi inceleyip size e-posta yoluyla dönüş yapacaktır.
                        </p>
                        <Button variant="outline" to="/" className="w-full">
                          Ana Sayfaya Dön
                        </Button>
                      </div>
                    )}
                  </Card>
                </div>

            </div>
        </div>
      </section>
    </>
  );
}