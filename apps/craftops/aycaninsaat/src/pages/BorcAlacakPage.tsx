import { useMemo } from "react";
import { 
  TrendingDown, 
  TrendingUp, 
  CheckCircle2,
  CalendarClock,

} from "lucide-react";
import { useData } from "../context/DataContext";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function BorcAlacakPage() {
  const { islemler, kisiler } = useData();

  const report = useMemo(() => {
    const kisiBakiyeleri = kisiler.map(kisi => {
      const personTransactions = islemler.filter(t => t.kisi_id === kisi.id);

      // Toplam Planlanan Borç
      const topOdenecek = personTransactions
        .filter(t => t.tip === 'odenecek')
        .reduce((sum, t) => sum + t.tutar, 0);

      // Toplam Ödenen (Nakit + Verilen Çekler)
      // Çek verildiği anda borçtan düşer.
      const topOdeme = personTransactions
        .filter(t => t.tip === 'odeme' || t.tip === 'cek')
        .reduce((sum, t) => sum + t.tutar, 0);

      const topAlacak = personTransactions
        .filter(t => t.tip === 'alacak')
        .reduce((sum, t) => sum + t.tutar, 0);
      
      const topTahsilat = personTransactions
        .filter(t => t.tip === 'tahsilat')
        .reduce((sum, t) => sum + t.tutar, 0);

      const kalanBorc = Math.max(0, topOdenecek - topOdeme);
      const kalanAlacak = Math.max(0, topAlacak - topTahsilat);

      const dates = personTransactions
        .filter(t => (t.tip === 'odenecek' || t.tip === 'alacak') && t.tarih)
        .map(t => t.tarih as string)
        .sort();
      
      const sonVade = dates.length > 0 ? dates[dates.length - 1] : null;

      return {
        kisi,
        topOdenecek,
        topOdeme,
        kalanBorc,
        topAlacak,
        topTahsilat,
        kalanAlacak,
        sonVade
      };
    });

    const borcluListesi = kisiBakiyeleri
      .filter(k => k.kalanBorc > 0)
      .sort((a, b) => b.kalanBorc - a.kalanBorc);

    const alacakliListesi = kisiBakiyeleri
      .filter(k => k.kalanAlacak > 0)
      .sort((a, b) => b.kalanAlacak - a.kalanAlacak);

    const totalKalanBorc = borcluListesi.reduce((sum, k) => sum + k.kalanBorc, 0);
    const totalKalanAlacak = alacakliListesi.reduce((sum, k) => sum + k.kalanAlacak, 0);

    return { borcluListesi, alacakliListesi, totalKalanBorc, totalKalanAlacak };
  }, [kisiler, islemler]);

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* HEADER */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-light tracking-tight text-neutral-900">
                BORÇ & ALACAK
              </h1>
              <p className="text-neutral-500 mt-1 font-light text-sm">
                Cari hesap bazlı net bakiye raporu. (Kapanmış borçlar gizlenir)
              </p>
            </div>
            
            <div className="flex items-center gap-6 bg-neutral-50 px-6 py-3 rounded-lg border border-neutral-200">
                <div className="text-right">
                    <div className="text-[10px] uppercase text-neutral-400 font-bold tracking-wider">NET BEKLENTİ</div>
                    <div className={`text-xl font-medium ${report.totalKalanAlacak - report.totalKalanBorc >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(report.totalKalanAlacak - report.totalKalanBorc)}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* --- SOL KOLON: ALACAKLAR --- */}
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-100 p-6 rounded-t-xl flex items-center justify-between">
              <div>
                <h2 className="text-green-900 font-medium flex items-center gap-2">
                  <TrendingUp size={20} /> ALACAK TAKİBİ
                </h2>
                <p className="text-green-700/60 text-xs mt-1">Tahsil edilmemiş net bakiyeler</p>
              </div>
              <div className="text-2xl font-light text-green-700">
                {formatCurrency(report.totalKalanAlacak)}
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-b-xl overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-neutral-50 border-b border-neutral-100 text-xs text-neutral-400 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Kişi / Kurum</th>
                    <th className="px-5 py-3 text-center">Durum</th>
                    <th className="px-5 py-3 text-right">Kalan Tutar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {report.alacakliListesi.map((row) => (
                    <tr key={row.kisi.id} className="hover:bg-green-50/30 transition-colors group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                                {row.kisi.ad.charAt(0)}
                            </div>
                            <div>
                                <div className="text-sm font-medium text-neutral-900">{row.kisi.ad}</div>
                                <div className="text-[10px] text-neutral-400 flex items-center gap-1">
                                    <CalendarClock size={10} /> Son Vade: {row.sonVade ? row.sonVade.split('-').reverse().join('.') : 'Belirtilmedi'}
                                </div>
                            </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center">
                         <div className="flex flex-col items-center justify-center gap-1">
                            <div className="text-[10px] text-neutral-400">
                                {formatCurrency(row.topTahsilat)} / {formatCurrency(row.topAlacak)}
                            </div>
                            <div className="w-16 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-green-400" 
                                    style={{ width: `${Math.min(100, (row.topTahsilat / row.topAlacak) * 100)}%` }}
                                ></div>
                            </div>
                         </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="text-sm font-bold text-green-700">
                          {formatCurrency(row.kalanAlacak)}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {report.alacakliListesi.length === 0 && (
                     <tr><td colSpan={3} className="p-8 text-center text-neutral-400 text-sm flex flex-col items-center gap-2">
                         <CheckCircle2 size={24} className="text-green-200" />
                         <span>Tüm alacaklar tahsil edildi.</span>
                     </td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- SAĞ KOLON: BORÇLAR --- */}
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-100 p-6 rounded-t-xl flex items-center justify-between">
              <div>
                <h2 className="text-red-900 font-medium flex items-center gap-2">
                  <TrendingDown size={20} /> BORÇ TAKİBİ
                </h2>
                <p className="text-red-700/60 text-xs mt-1">Ödenmemiş net bakiyeler</p>
              </div>
              <div className="text-2xl font-light text-red-700">
                {formatCurrency(report.totalKalanBorc)}
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-b-xl overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-neutral-50 border-b border-neutral-100 text-xs text-neutral-400 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Kişi / Kurum</th>
                    <th className="px-5 py-3 text-center">Durum</th>
                    <th className="px-5 py-3 text-right">Kalan Tutar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {report.borcluListesi.map((row) => (
                    <tr key={row.kisi.id} className="hover:bg-red-50/30 transition-colors group">
                       <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold">
                                {row.kisi.ad.charAt(0)}
                            </div>
                            <div>
                                <div className="text-sm font-medium text-neutral-900">{row.kisi.ad}</div>
                                <div className="text-[10px] text-neutral-400 flex items-center gap-1">
                                    <CalendarClock size={10} /> Son Vade: {row.sonVade ? row.sonVade.split('-').reverse().join('.') : 'Belirtilmedi'}
                                </div>
                            </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center">
                         <div className="flex flex-col items-center justify-center gap-1">
                            <div className="text-[10px] text-neutral-400">
                                {formatCurrency(row.topOdeme)} / {formatCurrency(row.topOdenecek)}
                            </div>
                            <div className="w-16 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-red-400" 
                                    style={{ width: `${Math.min(100, (row.topOdeme / row.topOdenecek) * 100)}%` }}
                                ></div>
                            </div>
                         </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="text-sm font-bold text-red-700">
                          {formatCurrency(row.kalanBorc)}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {report.borcluListesi.length === 0 && (
                     <tr><td colSpan={3} className="p-8 text-center text-neutral-400 text-sm flex flex-col items-center gap-2">
                         <CheckCircle2 size={24} className="text-neutral-200" />
                         <span>Ödenecek borç bulunmuyor.</span>
                     </td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}