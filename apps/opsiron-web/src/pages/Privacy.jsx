import React from 'react';
import SEO from '../components/common/SEO';
import { PAGE_SEO, SITE_META, CONTACT_INFO } from '../constants/content';

export default function Privacy() {
  return (
    <>
      <SEO 
        title={PAGE_SEO.privacy.title}
        description={PAGE_SEO.privacy.description}
        keywords={PAGE_SEO.privacy.keywords}
      />

      {/* Header */}
      <header className="pt-[calc(theme(spacing.header)+4rem)] pb-12 border-b border-border-gray bg-page">
        <div className="container mx-auto px-6">
            <h1 className="text-3xl md:text-5xl font-light tracking-tighter mb-4 text-dark">
              Gizlilik Politikası
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
              {SITE_META.siteName} ("biz", "bizim" veya "Şirket") olarak, gizliliğinize ve kişisel verilerinizin güvenliğine büyük önem veriyoruz. 
              Bu Gizlilik Politikası, web sitemizi ({SITE_META.siteUrl}) ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda verilerinizin nasıl toplandığını, 
              kullanıldığını ve korunduğunu açıklar.
            </p>

            <h2 className="text-2xl font-medium text-dark mt-12 mb-6 tracking-tight">1. Topladığımız Bilgiler</h2>
            <p className="mb-4">Hizmetlerimizi sunmak ve geliştirmek amacıyla aşağıdaki türde bilgileri toplayabiliriz:</p>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li><strong>Kişisel Bilgiler:</strong> İletişim formları veya kayıt işlemleri sırasında sağladığınız ad, e-posta adresi, telefon numarası ve şirket bilgileri.</li>
              <li><strong>Kullanım Verileri:</strong> Tarayıcı türü, ziyaret süresi, görüntülenen sayfalar ve IP adresi gibi sitemizle etkileşiminize dair teknik veriler.</li>
              <li><strong>Çerezler (Cookies):</strong> Site deneyimini iyileştirmek için kullanılan küçük veri dosyaları.</li>
            </ul>

            <h2 className="text-2xl font-medium text-dark mt-12 mb-6 tracking-tight">2. Bilgilerin Kullanımı</h2>
            <p className="mb-4">Topladığımız verileri şu amaçlarla kullanırız:</p>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li>Hizmetlerimizi sağlamak, sürdürmek ve iyileştirmek.</li>
              <li>Sizinle iletişime geçmek, taleplerinizi yanıtlamak.</li>
              <li>Yasal yükümlülüklere uymak ve güvenliği sağlamak.</li>
              <li>Size özel teklifler ve güncellemeler sunmak (onayınız dahilinde).</li>
            </ul>

            <h2 className="text-2xl font-medium text-dark mt-12 mb-6 tracking-tight">3. Bilgi Paylaşımı</h2>
            <p className="mb-8">
              Kişisel verilerinizi asla üçüncü taraflara satmayız. Ancak, hizmet sağlayıcılarımızla (hosting, analiz araçları vb.) 
              veya yasal bir zorunluluk olması durumunda resmi makamlarla verilerinizi paylaşabiliriz.
            </p>

            <h2 className="text-2xl font-medium text-dark mt-12 mb-6 tracking-tight">4. Veri Güvenliği</h2>
            <p className="mb-8">
              Verilerinizi yetkisiz erişime, değiştirmeye veya silinmeye karşı korumak için endüstri standardı güvenlik önlemleri (SSL şifreleme, güvenlik duvarları vb.) uyguluyoruz.
              Ancak internet üzerinden yapılan hiçbir veri iletiminin %100 güvenli olmadığını hatırlatırız.
            </p>

            <h2 className="text-2xl font-medium text-dark mt-12 mb-6 tracking-tight">5. İletişim</h2>
            <p className="mb-8">
              Bu politika hakkında sorularınız varsa veya verilerinizle ilgili bir talepte bulunmak isterseniz bizimle iletişime geçebilirsiniz:
            </p>
            <div className="bg-page p-6 border border-border-gray rounded-sm">
              <p className="mb-2"><strong className="text-dark">E-posta:</strong> {CONTACT_INFO.email}</p>
              <p className="mb-0"><strong className="text-dark">Adres:</strong> {CONTACT_INFO.address.full}</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}