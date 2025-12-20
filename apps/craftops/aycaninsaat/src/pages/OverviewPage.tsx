import  { useMemo } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  AlertCircle, 
  ArrowRight, 
  Users, 
  Briefcase, 
  Building2 
} from "lucide-react";
import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function OverviewPage() {
  const { islemler, kisiler } = useData();

  const stats = useMemo(() => {
    // 1. GERÇEKLEŞEN NAKİT AKIŞI (Kasa Durumu)
    // Tahsilat: Kasaya giren para
    const tahsilat = islemler
      .filter((i) => i.tip === "tahsilat")
      .reduce((acc, curr) => acc + curr.tutar, 0);

    // Ödeme: Kasadan çıkan para (Normal ödemeler + Günü gelmiş ve ÖDENDİ işaretlenmiş çekler)
    const odeme = islemler
      .filter((i) => i.tip === "odeme" || (i.tip === "cek" && i.is_bitiminde === 1))
      .reduce((acc, curr) => acc + curr.tutar, 0);

    const netDurum = tahsilat - odeme;

    // 2. BEKLEYEN BAKİYELER (Cari Hesap Mantığı)
    let totalKalanBorc = 0;
    let totalKalanAlacak = 0;

    kisiler.forEach((kisi) => {
      const kisiIslemleri = islemler.filter((t) => t.kisi_id === kisi.id);

      // Borç Hesabı (Planlanan Ödemeler)
      const topOdenecek = kisiIslemleri
        .filter((t) => t.tip === "odenecek")
        .reduce((sum, t) => sum + t.tutar, 0);
      
      // Yapılan Ödeme (Nakit Ödemeler + Verilen Çekler)
      // Çeki verdiğimiz an, cari hesaptan borç düşmelidir. Kasadan çıkıp çıkmaması önemli değil.
      const topOdeme = kisiIslemleri
        .filter((t) => t.tip === "odeme" || t.tip === "cek")
        .reduce((sum, t) => sum + t.tutar, 0);
      
      // Alacak Hesabı
      const topAlacak = kisiIslemleri
        .filter((t) => t.tip === "alacak")
        .reduce((sum, t) => sum + t.tutar, 0);
      const topTahsilat = kisiIslemleri
        .filter((t) => t.tip === "tahsilat")
        .reduce((sum, t) => sum + t.tutar, 0);

      totalKalanBorc += Math.max(0, topOdenecek - topOdeme);
      totalKalanAlacak += Math.max(0, topAlacak - topTahsilat);
    });

    return { 
      tahsilat, 
      odeme, 
      netDurum, 
      odenecek: totalKalanBorc, 
      alacak: totalKalanAlacak 
    };
  }, [islemler, kisiler]);

  // Son 5 İşlem
  const sonIslemler = useMemo(() => {
    return [...islemler]
      .sort((a, b) => (b.tarih || "").localeCompare(a.tarih || ""))
      .slice(0, 5);
  }, [islemler]);

  const kisiStats = useMemo(() => {
    return {
      toplam: kisiler.length,
      musteri: kisiler.filter((k) => k.rol === "musteri").length,
      tedarikci: kisiler.filter((k) => k.rol === "tedarikci").length,
      taseron: kisiler.filter((k) => k.rol === "taseron").length,
    };
  }, [kisiler]);

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* HEADER */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-light tracking-tight text-neutral-900">
            GENEL BAKIŞ
          </h1>
          <p className="text-neutral-500 mt-1 font-light">
            {new Date().toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' })} itibarıyla finansal durum özeti.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* --- 1. FİNANSAL KARTLAR --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* NET DURUM (Kasa) */}
          <div className="bg-white p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-neutral-400 tracking-wider uppercase">NET NAKİT DURUMU</span>
              <div className={`p-2 rounded-full ${stats.netDurum >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                <Wallet size={20} />
              </div>
            </div>
            <div>
              <div className={`text-2xl font-light ${stats.netDurum >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {formatCurrency(stats.netDurum)}
              </div>
              <p className="text-xs text-neutral-400 mt-2 font-light">Kasa ve Banka Mevcudu</p>
            </div>
          </div>

          {/* TAHSİLAT (Kasa Giriş) */}
          <div className="bg-white p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-neutral-400 tracking-wider uppercase">TOPLAM GİRİŞ</span>
              <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                <TrendingUp size={20} />
              </div>
            </div>
            <div>
              <div className="text-2xl font-light text-neutral-900">
                {formatCurrency(stats.tahsilat)}
              </div>
              <p className="text-xs text-neutral-400 mt-2 font-light">Toplam yapılan tahsilat</p>
            </div>
          </div>

          {/* ÖDEME (Kasa Çıkış) */}
          <div className="bg-white p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-neutral-400 tracking-wider uppercase">TOPLAM ÇIKIŞ</span>
              <div className="p-2 rounded-full bg-orange-50 text-orange-600">
                <TrendingDown size={20} />
              </div>
            </div>
            <div>
              <div className="text-2xl font-light text-neutral-900">
                {formatCurrency(stats.odeme)}
              </div>
              <p className="text-xs text-neutral-400 mt-2 font-light">Nakit + Ödenen Çekler</p>
            </div>
          </div>

          {/* BEKLEYEN ÖDEMELER (Net Borçlar) */}
          <div className="bg-white p-6 border border-neutral-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1 h-full bg-red-500"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-neutral-400 tracking-wider uppercase">ÖDENECEK (NET)</span>
              <div className="p-2 rounded-full bg-red-50 text-red-600">
                <AlertCircle size={20} />
              </div>
            </div>
            <div>
              <div className="text-2xl font-light text-neutral-900">
                {formatCurrency(stats.odenecek)}
              </div>
              <p className="text-xs text-neutral-400 mt-2 font-light">Kalan net borç bakiyesi</p>
            </div>
          </div>
        </div>

        {/* --- 2. ALT BÖLÜM (Grid Split) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SOL: SON İŞLEMLER TABLOSU */}
          <div className="lg:col-span-2 bg-white border border-neutral-200 shadow-sm">
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="text-lg font-light text-neutral-900">Son Hareketler</h2>
              <Link to="/islemler" className="text-xs font-medium text-neutral-500 hover:text-neutral-900 flex items-center gap-1">
                TÜMÜNÜ GÖR <ArrowRight size={14} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-neutral-50 text-xs text-neutral-500 font-medium">
                  <tr>
                    <th className="px-6 py-3 tracking-wider">TARİH</th>
                    <th className="px-6 py-3 tracking-wider">AÇIKLAMA</th>
                    <th className="px-6 py-3 tracking-wider text-right">TUTAR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {sonIslemler.map((islem) => (
                    <tr key={islem.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-neutral-600 font-light whitespace-nowrap">
                        {islem.tip === 'cek' ? (
                          <div className="flex flex-col">
                             <span>{islem.tarih ? islem.tarih.split('-').reverse().join('.') : '-'}</span>
                             <span className={`text-[9px] px-1.5 py-0.5 rounded w-fit mt-1 ${islem.is_bitiminde ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                               {islem.is_bitiminde ? 'ÇEK ÖDENDİ' : 'ÇEK BEKLİYOR'}
                             </span>
                          </div>
                        ) : (
                          islem.tarih ? islem.tarih.split('-').reverse().join('.') : (islem.is_bitiminde ? 'İŞ BİTİMİ' : '-')
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-800 font-light truncate max-w-xs">
                        {islem.aciklama}
                        <div className="text-[10px] text-neutral-400 uppercase tracking-wide mt-0.5">
                           {kisiler.find(k => k.id === islem.kisi_id)?.ad}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <span className={
                          islem.tip === 'tahsilat' ? 'text-green-600' :
                          (islem.tip === 'odeme' || islem.tip === 'cek') ? 'text-red-600' :
                          'text-neutral-600'
                        }>
                          {(islem.tip === 'odeme' || islem.tip === 'cek') ? '-' : islem.tip === 'tahsilat' ? '+' : ''}
                          {formatCurrency(islem.tutar)}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {sonIslemler.length === 0 && (
                    <tr><td colSpan={3} className="p-6 text-center text-neutral-400 text-sm">Henüz işlem yok.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* SAĞ: ÖZET BİLGİLER */}
          <div className="space-y-6">
            <div className="bg-neutral-900 text-white p-6 shadow-lg relative overflow-hidden">
               <div className="absolute -right-6 -top-6 text-neutral-800 opacity-20">
                 <Users size={140} />
               </div>
               <h3 className="text-lg font-light mb-6 relative z-10">Kişi & Kurumlar</h3>
               <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <div className="flex items-center gap-2 text-neutral-400 text-sm">
                      <Users size={16} /> Müşteriler
                    </div>
                    <span className="text-xl font-light">{kisiStats.musteri}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <div className="flex items-center gap-2 text-neutral-400 text-sm">
                      <Building2 size={16} /> Tedarikçiler
                    </div>
                    <span className="text-xl font-light">{kisiStats.tedarikci}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <div className="flex items-center gap-2 text-neutral-400 text-sm">
                      <Briefcase size={16} /> Taşeronlar
                    </div>
                    <span className="text-xl font-light">{kisiStats.taseron}</span>
                  </div>
                  <div className="pt-2 text-right">
                    <span className="text-xs text-neutral-500 uppercase tracking-widest">TOPLAM: {kisiStats.toplam} KAYIT</span>
                  </div>
               </div>
            </div>

            <div className="bg-white border border-neutral-200 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-neutral-400 tracking-wider uppercase mb-2">BEKLENEN ALACAKLAR</h3>
              <div className="text-3xl font-light text-neutral-800 mb-1">
                {formatCurrency(stats.alacak)}
              </div>
              <p className="text-xs text-neutral-500 font-light mb-4">
                Tahsil edilmemiş toplam net alacak bakiyesi.
              </p>
              <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-2/3 opacity-50"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}