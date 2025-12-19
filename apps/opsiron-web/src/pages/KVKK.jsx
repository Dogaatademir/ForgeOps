import React from 'react';
import SEO from '../components/common/SEO';
import { PAGE_SEO, SITE_META, CONTACT_INFO } from '../constants/content';

export default function KVKK() {
  return (
    <>
      <SEO 
        title={PAGE_SEO.kvkk.title}
        description={PAGE_SEO.kvkk.description}
        keywords={PAGE_SEO.kvkk.keywords}
      />

      {/* Header */}
      <header className="pt-[calc(theme(spacing.header)+4rem)] pb-12 border-b border-border-gray bg-page">
        <div className="container mx-auto px-6">
            <h1 className="text-3xl md:text-5xl font-light tracking-tighter mb-4 text-dark">
              KVKK Aydınlatma Metni
            </h1>
            <p className="text-muted font-light">
              Kişisel Verilerin Korunması Kanunu Kapsamında Bilgilendirme
            </p>
        </div>
      </header>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg text-muted font-light leading-relaxed">
            
            <p className="mb-8 text-lg">
              {SITE_META.siteName} ("Veri Sorumlusu") olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, 
              kişisel verilerinizin güvenliğine en üst düzeyde önem veriyoruz. Bu metin, verilerinizin toplanma şekli, 
              işlenme amaçları ve haklarınız konusunda sizi aydınlatmak amacıyla hazırlanmıştır.
            </p>

            <h2 className="text-2xl font-medium text-dark mt-12 mb-6 tracking-tight">1. Veri Sorumlusu</h2>
            <p className="mb-8">
              KVKK uyarınca, kişisel verileriniz; veri sorumlusu olarak {SITE_META.siteName} tarafından aşağıda açıklanan kapsamda işlenebilecektir.
            </p>

            <h2 className="text-2xl font-medium text-dark mt-12 mb-6 tracking-tight">2. Kişisel Verilerin İşlenme Amacı</h2>
            <p className="mb-4">Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li>Ürün ve hizmetlerimizin sizlere sunulabilmesi.</li>
              <li>Müşteri ilişkileri yönetimi süreçlerinin yürütülmesi.</li>
              <li>Talep ve şikayetlerin takibi.</li>
              <li>İş faaliyetlerinin yürütülmesi ve denetimi.</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi.</li>
            </ul>

            <h2 className="text-2xl font-medium text-dark mt-12 mb-6 tracking-tight">3. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h2>
            <p className="mb-8">
              Kişisel verileriniz; web sitemiz, e-posta, iletişim formları ve sosyal medya kanalları aracılığıyla elektronik ortamda toplanmaktadır. 
              Bu veriler, KVKK'nın 5. ve 6. maddelerinde belirtilen "sözleşmenin kurulması veya ifası", "hukuki yükümlülüklerin yerine getirilmesi" 
              ve "ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaatleri" hukuki sebeplerine dayanarak işlenmektedir.
            </p>

            <h2 className="text-2xl font-medium text-dark mt-12 mb-6 tracking-tight">4. İlgili Kişinin Hakları (Madde 11)</h2>
            <p className="mb-4">KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme.</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme.</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme.</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme.</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme.</li>
              <li>KVKK şartları çerçevesinde silinmesini veya yok edilmesini isteme.</li>
            </ul>

            <h2 className="text-2xl font-medium text-dark mt-12 mb-6 tracking-tight">5. Başvuru</h2>
            <p className="mb-8">
              Yukarıda belirtilen haklarınızı kullanmak için taleplerinizi yazılı olarak veya kayıtlı elektronik posta (KEP) adresi, 
              güvenli elektronik imza, mobil imza ya da bize daha önce bildirdiğiniz e-posta adresini kullanarak aşağıdaki adrese iletebilirsiniz.
            </p>

            <div className="bg-page p-6 border border-border-gray rounded-sm">
              <p className="mb-2"><strong className="text-dark">E-posta:</strong> {CONTACT_INFO.email}</p>
              <p className="mb-0"><strong className="text-dark">Posta Adresi:</strong> {CONTACT_INFO.address.full}</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}