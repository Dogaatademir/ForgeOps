import React from 'react';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import Button from '../components/common/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="404 - Sayfa Bulunamadı" 
        description="Aradığınız sayfa mevcut değil veya taşınmış olabilir." 
      />
      
      <section className="min-h-[70vh] flex items-center justify-center bg-white border-b border-border-gray">
        <div className="container mx-auto px-6 text-center">
          
          {/* İkon Alanı */}
          <div className="inline-flex p-6 bg-page rounded-full mb-8 text-light animate-pulse">
            <FileQuestion size={64} strokeWidth={1.5} />
          </div>
          
          {/* Metin Alanı */}
          <div className="max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-light tracking-tighter leading-tight mb-6 text-dark">
              404 - Sayfa <span className="italic text-muted">Kayıp</span>
            </h1>
            <p className="text-lg text-muted font-light leading-relaxed">
              Aradığınız sayfayı bulamıyoruz. Operasyonel bir taşınma olmuş olabilir veya bağlantı adresi hatalıdır. 
              Endişelenmeyin, verileriniz güvende.
            </p>
          </div>
          
          {/* Aksiyon Butonları */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => navigate(-1)} 
              variant="outline" 
              icon={ArrowLeft}
            >
              Geri Dön
            </Button>
            
            <Button 
              to="/" 
              variant="primary" 
              icon={Home}
            >
              Ana Sayfaya Dön
            </Button>
          </div>

          {/* Yardımcı Bilgi */}
          <div className="mt-16 pt-8 border-t border-border-gray/50 max-w-sm mx-auto">
            <p className="text-xs text-light uppercase tracking-widest leading-loose">
              Hata Kodu: ERR_NOT_FOUND_404 <br />
              Opsiron Sistem Operasyonu
            </p>
          </div>

        </div>
      </section>
    </>
  );
}