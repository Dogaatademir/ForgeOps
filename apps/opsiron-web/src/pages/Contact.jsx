import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, CheckCircle, ArrowRight, Clock, 
  MessageSquare, Calendar, AlertCircle, ChevronDown 
} from 'lucide-react';

// Common Components
import SEO from '../components/common/SEO';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';

// Logic & Data
import useForm from '../hooks/useForm';
import { validateContactForm } from '../utils/validation';
import { 
  PAGE_SEO, 
  CONTACT_INFO, 
  CONTACT_PROCESS, 
  LEGAL, 
  CONTACT_FORM_OPTIONS 
} from '../constants/content';

export default function Contact() {
  
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [kvkkError, setKvkkError] = useState(false);

  // Form State
  const { 
    values, 
    errors, 
    handleChange, 
    handleSubmit, 
    isSubmitting, 
    isSuccess,
    resetForm
  } = useForm(
    { 
      name: '', 
      company: '', 
      email: '', 
      phone: '', 
      interest: '', 
      message: '' 
    }, 
    validateContactForm
  );

  // Submit Handler
  const onSubmit = async (formData) => {
    if (!kvkkAccepted) {
      setKvkkError(true);
      return;
    }
    setKvkkError(false);

    console.log("Form Data Submitted:", formData);
    await new Promise(resolve => setTimeout(resolve, 1500)); 
  };

  return (
    <>
      {/* 1. SEO */}
      <SEO 
        title={PAGE_SEO.contact.title}
        description={PAGE_SEO.contact.description}
        keywords={PAGE_SEO.contact.keywords}
      />

      {/* 2. HERO SECTION */}
      <header className="pt-[calc(theme(spacing.header)+4rem)] pb-24 border-b border-border-gray bg-page">
        <div className="container mx-auto px-6">
            <div className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-light tracking-tighter leading-[1.1] mb-6 text-dark">
                  İşletmenizi <span className="italic text-muted">Tanıyalım</span>
                </h1>
                <p className="text-lg text-muted font-light leading-relaxed">
                  Size hazır bir paket satmaya çalışmıyoruz. Operasyonel kör noktalarınızı bulmak ve Opsiron altyapısının size uygun olup olmadığını anlamak için ücretsiz bir keşif görüşmesi planlayalım.
                </p>
            </div>
        </div>
      </header>

      {/* 3. MAIN CONTENT GRID */}
      <section className="py-24 border-b border-border-gray">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                
                {/* SOL: İLETİŞİM FORMU (7/12) */}
                <div className="lg:col-span-7">
                    {!isSuccess ? (
                        <Card variant="default" className="border-t-4 border-t-dark p-8 md:p-12 shadow-xl bg-white">
                            <h3 className="text-2xl font-medium tracking-tight mb-8 text-dark">Keşif Formu</h3>
                            
                            <form onSubmit={(e) => handleSubmit(onSubmit, e)} noValidate className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input 
                                      label="Adınız Soyadınız"
                                      name="name"
                                      placeholder="Ad Soyad"
                                      value={values.name}
                                      onChange={handleChange}
                                      error={errors.name}
                                      required
                                    />
                                    <Input 
                                      label="Şirket / İşletme Adı"
                                      name="company"
                                      placeholder="İşletme Adı"
                                      value={values.company}
                                      onChange={handleChange}
                                      error={errors.company}
                                      required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input 
                                      label="E-posta Adresi"
                                      name="email"
                                      type="email"
                                      placeholder="ornek@sirket.com"
                                      value={values.email}
                                      onChange={handleChange}
                                      error={errors.email}
                                      required
                                    />
                                    <Input 
                                      label="Telefon"
                                      name="phone"
                                      type="tel"
                                      placeholder="05xxxxxxxxx"
                                      value={values.phone}
                                      onChange={handleChange}
                                      error={errors.phone}
                                      required
                                    />
                                </div>

                                {/* Interest Area Select */}
                                <div className="w-full">
                                    <label className="block mb-2 text-[0.9rem] font-semibold text-dark">
                                        İlgi Alanınız <span className="text-critical">*</span>
                                    </label>
                                    <div className="relative group">
                                        <select 
                                            name="interest"
                                            className={`w-full p-4 bg-white border outline-none transition-colors text-[0.95rem] font-sans appearance-none cursor-pointer
                                              ${errors.interest ? 'border-critical' : 'border-border-gray focus:border-dark'}`}
                                            value={values.interest}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>Seçiniz...</option>
                                            {CONTACT_FORM_OPTIONS.interestArea.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-light group-focus-within:text-dark transition-colors">
                                            <ChevronDown size={18} />
                                        </div>
                                    </div>
                                    {errors.interest && (
                                        <p className="mt-2 text-xs flex items-center gap-1 text-critical">
                                            <AlertCircle size={14} /> {errors.interest}
                                        </p>
                                    )}
                                </div>

                                <Input 
                                  label="Operasyonel Zorluklarınız"
                                  name="message"
                                  type="textarea"
                                  rows={4}
                                  placeholder="Örn: Stoklarımız tutmuyor, maliyet hesabında zorlanıyoruz..."
                                  value={values.message}
                                  onChange={handleChange}
                                  error={errors.message}
                                  required
                                />

                                {/* KVKK & Submit */}
                                <div className="pt-4">
                                    <label className="flex items-start gap-4 cursor-pointer mb-6 group">
                                        <input 
                                            type="checkbox" 
                                            className="mt-1 w-5 h-5 accent-dark border-border-gray rounded-sm cursor-pointer"
                                            checked={kvkkAccepted}
                                            onChange={(e) => setKvkkAccepted(e.target.checked)}
                                        />
                                        <span className="text-sm text-muted leading-relaxed font-light group-hover:text-dark transition-colors">
                                            {LEGAL.kvkkText}
                                        </span>
                                    </label>
                                    
                                    {kvkkError && (
                                        <p className="text-critical text-xs mb-6 flex items-center gap-1.5 animate-pulse">
                                            <AlertCircle size={14} /> Lütfen formu göndermek için KVKK metnini onaylayın.
                                        </p>
                                    )}

                                    <Button 
                                      type="submit" 
                                      variant="primary" 
                                      className="w-full"
                                      isLoading={isSubmitting}
                                      icon={ArrowRight}
                                      iconPosition="right"
                                    >
                                        Keşif Görüşmesi Talep Et
                                    </Button>
                                    
                                    <p className="text-[10px] text-light text-center mt-6 uppercase tracking-widest opacity-60">
                                        reCAPTCHA protected &bull; Google Privacy & Terms
                                    </p>
                                </div>
                            </form>
                        </Card>
                    ) : (
                        // SUCCESS STATE
                        <Card className="text-center py-20 px-8 border-t-4 border-t-good shadow-xl bg-white animate-[fadeIn_0.5s_ease-out]">
                            <div className="w-24 h-24 bg-green-50 text-good rounded-full flex items-center justify-center mx-auto mb-8">
                                <CheckCircle size={48} />
                            </div>
                            <h3 className="text-3xl font-medium tracking-tight mb-4 text-dark">Talebini Aldık!</h3>
                            <p className="text-muted font-light mb-10 max-w-md mx-auto leading-relaxed">
                                İşletme profilinizi inceliyoruz. Ekibimiz <strong className="text-dark font-medium">{CONTACT_INFO.responseTime}</strong> size ulaşıp, 
                                30 dakikalık online keşif görüşmesi için takvim önerisi sunacak.
                            </p>
                            <Button 
                                variant="outline" 
                                onClick={() => {
                                    resetForm();
                                    setKvkkAccepted(false);
                                }}
                                className="px-12"
                            >
                                Yeni Form Doldur
                            </Button>
                        </Card>
                    )}
                </div>

                {/* SAĞ: BİLGİLENDİRME & İLETİŞİM (5/12) */}
                <div className="lg:col-span-5 space-y-8">
                    
                    {/* Süreç Bilgilendirmesi */}
                    <Card variant="default" className="bg-page border border-border-gray p-8">
                        <h4 className="text-[0.7rem] uppercase tracking-widest font-bold text-dark mb-8 flex items-center gap-3">
                            <Clock size={18} /> Süreç Nasıl İşler?
                        </h4>
                        <ul className="space-y-8">
                            {CONTACT_PROCESS.map((step, index) => (
                                <li key={index} className="flex gap-5 group">
                                    <div className="bg-white text-dark w-10 h-10 border border-border-gray rounded-full flex items-center justify-center font-bold text-sm shadow-sm shrink-0 transition-transform group-hover:scale-110">
                                        {step.step}
                                    </div>
                                    <div>
                                        <strong className="block text-base font-medium text-dark tracking-tight">{step.title}</strong>
                                        <p className="text-sm text-muted font-light leading-relaxed mt-1.5">{step.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* İletişim Bilgileri */}
                    <Card variant="default" className="p-8 border border-border-gray">
                        <h3 className="text-xl font-medium tracking-tight mb-6 text-dark">Doğrudan Ulaşın</h3>
                        <p className="text-[0.9rem] text-muted font-light mb-8">Acil durumlar veya iş birliği teklifleri için kanallarımız:</p>
                        
                        <div className="space-y-6">
                            <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-4 text-dark group hover:translate-x-1 transition-transform">
                                <div className="w-12 h-12 bg-page border border-border-gray rounded-sm flex items-center justify-center text-light group-hover:text-dark group-hover:border-dark transition-colors">
                                    <Mail size={22} />
                                </div>
                                <span className="font-medium tracking-tight text-lg">{CONTACT_INFO.email}</span>
                            </a>
                            
                            <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="flex items-center gap-4 text-dark group hover:translate-x-1 transition-transform">
                                <div className="w-12 h-12 bg-page border border-border-gray rounded-sm flex items-center justify-center text-light group-hover:text-dark group-hover:border-dark transition-colors">
                                    <Phone size={22} />
                                </div>
                                <span className="font-medium tracking-tight text-lg">{CONTACT_INFO.phone}</span>
                            </a>
                            
                            <div className="flex items-start gap-4 text-dark">
                                <div className="w-12 h-12 bg-page border border-border-gray rounded-sm flex items-center justify-center text-light shrink-0">
                                    <MapPin size={22} />
                                </div>
                                <span className="font-light text-[0.95rem] leading-relaxed mt-1">{CONTACT_INFO.address.full}</span>
                            </div>
                        </div>

                        {/* Alternatif Butonlar */}
                        <div className="mt-10 pt-8 border-t border-border-gray grid grid-cols-2 gap-4">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full" 
                                icon={MessageSquare}
                                href="https://wa.me/905376903333"
                            >
                                WhatsApp
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full" 
                                icon={Calendar}
                                href="#" 
                            >
                                Takvim
                            </Button>
                        </div>
                    </Card>

                   
                </div>

            </div>
        </div>
      </section>
    </>
  );
}