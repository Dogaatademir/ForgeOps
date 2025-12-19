import  { useMemo, useState } from "react";
import { Printer, Search, PieChart, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import { CustomSelect } from "./CustomSelect";
import { useData } from "./DataContext"; // Context Eklendi

export default function HesaplarDemo() {
  const { kisiler, islemler } = useData(); // Global veriyi çekiyoruz
  
  const [seciliKisi, setSeciliKisi] = useState("");
  const [query, setQuery] = useState("");

  const handlePrint = () => window.print();

  const kisiOptions = useMemo(
    () => kisiler.map(k => ({ value: k.id, label: k.ad })),
    [kisiler]
  );

  // Sadece seçili kişiye ait işlemleri filtrele
  const personTransactions = useMemo(() => {
    if (!seciliKisi) return [];
    return islemler.filter(h => h.kisi_id === seciliKisi);
  }, [islemler, seciliKisi]);

  // Arama filtresi uygula
  const filteredRows = useMemo(() => {
    const qText = query.trim().toLocaleLowerCase("tr");
    if (!qText) return personTransactions;
    return personTransactions.filter(r =>
      (r.aciklama || "").toLocaleLowerCase("tr").includes(qText) ||
      (r.tarih || "").includes(qText) ||
      r.tip.includes(qText)
    );
  }, [personTransactions, query]);

  // Toplamları Hesapla
  const toplam = useMemo(() => {
    const sum = (tip: string) =>
      filteredRows
        .filter(h => h.tip === tip)
        .reduce((s, h) => s + Number(h.tutar || 0), 0); // Context'teki 'tutar' zaten TL çevrilmiş hali

    const tahsilat = sum("tahsilat");
    const odeme = sum("odeme");
    const odenecek = sum("odenecek");
    const alacak = sum("alacak");

    return { tahsilat, odeme, odenecek, alacak, net: -odenecek + odeme - tahsilat + alacak };
  }, [filteredRows]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* HEADER */}
      <div className="bg-white border-b border-neutral-200 print:hidden">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-light tracking-tight text-neutral-900">HESAPLAR</h1>
              <p className="text-neutral-500 mt-1 font-light">Cari Hesap Ekstreleri & Raporlar</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center">
              <PieChart className="text-white" size={28} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 print:hidden">

        {/* FİLTRE & SEÇİM */}
        <div className="bg-white p-8 border border-neutral-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-4">
              <CustomSelect
                label="KİŞİ / KURUM SEÇİMİ"
                value={seciliKisi}
                onChange={(val) => setSeciliKisi(val)}
                options={kisiOptions}
                placeholder="Seçiniz..."
                icon={Filter}
              />
            </div>

            <div className="md:col-span-6">
              <label className="block text-xs font-medium text-neutral-500 mb-3 tracking-wider">İŞLEM ARA</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full h-14 pl-12 pr-4 bg-white border border-neutral-300 text-neutral-900 outline-none focus:border-neutral-900 font-light placeholder:text-neutral-300 transition-colors"
                  placeholder="Açıklama, tarih veya tutar..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={!seciliKisi}
                />
                <Search className="absolute left-4 top-4 text-neutral-400" size={20} />
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                onClick={handlePrint}
                disabled={!seciliKisi}
                className="w-full h-14 flex items-center justify-center gap-2 bg-neutral-900 text-white font-light tracking-widest hover:bg-neutral-800 transition-colors disabled:bg-neutral-200 disabled:cursor-not-allowed"
              >
                <Printer size={18} /> YAZDIR
              </button>
            </div>
          </div>
        </div>

        {/* TABLO */}
        <div className="bg-white border border-neutral-200">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left min-w-[900px]">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-medium text-neutral-500 tracking-wider whitespace-nowrap">TARİH</th>
                  <th className="px-6 py-4 text-xs font-medium text-neutral-500 tracking-wider whitespace-nowrap">İŞLEM TİPİ</th>
                  <th className="px-6 py-4 text-xs font-medium text-neutral-500 tracking-wider text-right whitespace-nowrap">TUTAR (TL)</th>
                  <th className="px-6 py-4 text-xs font-medium text-neutral-500 tracking-wider whitespace-nowrap">AÇIKLAMA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredRows.map((r, i) => (
                  <tr key={i} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 font-light text-neutral-600 whitespace-nowrap">
                      {r.is_bitiminde ? (
                        <span className="text-xs bg-neutral-100 px-2 py-1 rounded">İŞ BİTİMİ</span>
                      ) : (
                        r.tarih ? r.tarih.split('-').reverse().join('.') : "—"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2 py-1 tracking-wide uppercase ${
                          r.tip === "tahsilat"
                            ? "text-green-700 bg-green-50"
                            : r.tip === "odeme"
                            ? "text-red-700 bg-red-50"
                            : "text-neutral-700 bg-neutral-100"
                        }`}
                      >
                        {r.tip}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-light text-neutral-900 tracking-wide whitespace-nowrap">
                      {r.tutar?.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺
                      {r.doviz !== "TRY" && <span className="text-xs text-neutral-400 ml-1">({r.doviz})</span>}
                    </td>
                    <td
                      className="px-6 py-4 font-light text-neutral-500 truncate max-w-xs"
                      title={r.aciklama || ""}
                    >
                      {r.aciklama || "—"}
                    </td>
                  </tr>
                ))}
                {filteredRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-12 text-center text-neutral-400 font-light italic"
                    >
                      {seciliKisi
                        ? "Kayıt bulunamadı."
                        : "Lütfen yukarıdan bir kişi seçiniz."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ALT BİLGİ ÖZETİ */}
          {seciliKisi && (
            <div className="bg-neutral-50 border-t border-neutral-200 p-6 grid grid-cols-2 lg:grid-cols-5 gap-6">
              <div>
                <div className="text-xs text-neutral-400 mb-1 tracking-wider uppercase">TAHSİLAT</div>
                <div className="text-lg font-light text-green-600">
                  {toplam.tahsilat.toLocaleString("tr-TR")} ₺
                </div>
              </div>
              <div>
                <div className="text-xs text-neutral-400 mb-1 tracking-wider uppercase">ÖDEME</div>
                <div className="text-lg font-light text-red-600">
                  {toplam.odeme.toLocaleString("tr-TR")} ₺
                </div>
              </div>
              <div>
                <div className="text-xs text-neutral-400 mb-1 tracking-wider uppercase">
                  PLN. ÖDENECEK
                </div>
                <div className="text-lg font-light text-neutral-600">
                  {toplam.odenecek.toLocaleString("tr-TR")} ₺
                </div>
              </div>
              <div>
                <div className="text-xs text-neutral-400 mb-1 tracking-wider uppercase">
                  PLN. ALACAK
                </div>
                <div className="text-lg font-light text-neutral-600">
                  {toplam.alacak.toLocaleString("tr-TR")} ₺
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1 bg-white p-4 border border-neutral-200">
                <div className="flex items-center gap-2 mb-2">
                  {toplam.net >= 0 ? (
                    <TrendingUp size={16} className="text-green-500" />
                  ) : (
                    <TrendingDown size={16} className="text-red-500" />
                  )}
                  <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                    NET DURUM
                  </span>
                </div>
                <div
                  className={`text-2xl font-light ${
                    toplam.net >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {toplam.net.toLocaleString("tr-TR", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  ₺
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- PRINT ONLY AREA --- */}
      <div className="hidden print:block p-10 bg-white">
        <div className="text-center border-b-2 border-neutral-900 pb-4 mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">HESAP EKSTRESİ</h1>
          <div className="text-neutral-600 mt-2">
            {kisiler.find((k) => k.id === seciliKisi)?.ad}
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            {new Date().toLocaleDateString("tr-TR")}
          </div>
        </div>

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-neutral-300">
              <th className="text-left py-2 font-bold text-neutral-900">Tarih</th>
              <th className="text-left py-2 font-bold text-neutral-900">Tip</th>
              <th className="text-right py-2 font-bold text-neutral-900">Tutar</th>
              <th className="text-left py-2 pl-4 font-bold text-neutral-900">Açıklama</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((r, i) => (
              <tr key={i} className="border-b border-neutral-100">
                <td className="py-2 text-neutral-700">
                  {r.is_bitiminde ? "İş Bitimi" : (r.tarih ? r.tarih.split('-').reverse().join('.') : '')}
                </td>
                <td className="py-2 text-neutral-700 capitalize">{r.tip}</td>
                <td className="py-2 text-right font-mono text-neutral-900">
                  {r.tutar?.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
                </td>
                <td className="py-2 pl-4 text-neutral-600">{r.aciklama}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 flex justify-end">
          <div className="w-1/3 border-t border-neutral-300 pt-2 text-right">
            <div className="text-lg font-bold text-neutral-900">
              Net Bakiye: {toplam.net.toLocaleString("tr-TR")} ₺
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}