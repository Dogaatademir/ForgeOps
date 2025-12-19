import React from 'react';
import SEO from '../components/common/SEO';
import { PAGE_SEO, SITE_META } from '../constants/content';

export default function Terms() {
  return (
    <>
      <SEO 
        title={PAGE_SEO.terms.title}
        description={PAGE_SEO.terms.description}
        keywords={PAGE_SEO.terms.keywords}
      />

      {/* Header */}
      <header className="pt-[calc(theme(spacing.header)+4rem)] pb-12 border-b border-border-gray bg-page">
        <div className="container mx-auto px-6">
            <h1 className="text-3xl md:text-5xl font-light tracking-tighter mb-4 text-dark">
              Kullanım Koşulları
            </h1>
            <p className="text-muted font-light">
              Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>
        </div>
      </header>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg text-muted font-light leading-relaxed">
            
            <p className="mb-8 text-lg">
              Lütfen {SITE_META.siteName} ("Web Sitesi") kullanmadan önce bu Kullanım Koşullarını dikkatlice okuyunuz. 
              Siteye erişerek veya siteyi kullanarak, bu koşulları kabul etmiş sayılırsınız.
            </p>

            <h2 className="text-2xl font-medium text-dark mt-12 mb-6 tracking-tight">1. Hizmetin Kapsamı</h2>
            <p className="mb-8">
              Opsiron, işletmelere yönelik yazılım çözümleri (CraftOps, ServeOps vb.) ve danışmanlık hizmetleri sunar. 
              Web sitemizdeki içerikler genel bilgilendirme amaçlıdır ve profesyonel tavsiye niteliği taşımaz.
            </p>

            <h2 className="text-2xl font-medium text-dark mt-12 mb-6 tracking-tight">2. Fikri Mülkiyet</h2>
            <p className="mb-8">
              Bu sitede yer alan tüm metinler, grafikler, logolar, görseller ve yazılımlar {SITE_META.siteName}'a aittir ve 
              fikri mülkiyet kanunları ile korunmaktadır. İzinsiz kopyalanması, çoğaltılması veya dağıtılması yasaktır.
            </p>

            <h2 className="text-2xl font-medium text-dark mt-12 mb-6 tracking-tight">3. Kullanıcı Sorumlulukları</h2>
            <p className="mb-4">Siteyi kullanırken şunları taahhüt edersiniz:</p>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li>Siteyi yasalara aykırı amaçlar için kullanmamak.</li>
              <li>Sitenin güvenliğini veya işleyişini bozacak girişimlerde bulunmamak.</li>
              <li>Üçüncü şahısların haklarına zarar verecek içerik paylaşmamak.</li>
            </ul>

            <h2 className="text-2xl font-medium text-dark mt-12 mb-6 tracking-tight">4. Sorumluluk Reddi</h2>
            <p className="mb-8">
              Web sitesi ve içerikleri "olduğu gibi" sunulmaktadır. Opsiron, sitenin kesintisiz veya hatasız çalışacağını garanti etmez. 
              Sitenin kullanımından doğabilecek doğrudan veya dolaylı zararlardan sorumlu tutulamaz.
            </p>

            <h2 className="text-2xl font-medium text-dark mt-12 mb-6 tracking-tight">5. Değişiklikler</h2>
            <p className="mb-8">
              Opsiron, bu kullanım koşullarını dilediği zaman değiştirme hakkını saklı tutar. Değişiklikler sitede yayınlandığı tarihte yürürlüğe girer.
            </p>

          </div>
        </div>
      </section>
    </>
  );
}