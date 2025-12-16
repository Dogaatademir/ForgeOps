import { useMemo, useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, PieChart, Wallet, CreditCard, Banknote } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FinanceReportsPage = () => {
  const { ledgerEntries, categories } = useStore();
  const [period, setPeriod] = useState<'Month' | 'Year' | 'All'>('All');

  // --- RAPOR HESAPLAMALARI ---
  const { pnlStats, cashStats, categoryStats } = useMemo(() => {
    const now = new Date();

    // 1) DÖNEM FİLTRESİ
    const filteredEntries = ledgerEntries.filter(l => {
      if (l.status === 'Voided') return false;
      const d = new Date(l.date);
      if (period === 'Month') return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      if (period === 'Year') return d.getFullYear() === now.getFullYear();
      return true;
    });

    // --- HAVUZ 1: TİCARİ PERFORMANS (Kâr / Zarar) ---
    // ✅ DOĞRU MANTIK:
    // - Gelir: Sale + Credit (tercihen CAT-003) - İADELER (Debit)
    // - COGS: Sale + Debit + CAT-COGS - İADE MALİYETİ (Credit)
    const saleEntries = filteredEntries.filter(l => l.sourceType === 'Sale');

    // FIX: Gelir hesaplarken Credit (Satış) pozitif, Debit (İade) negatif alınır.
    const salesRevenue = saleEntries
      .filter(e => (e.categoryId === 'CAT-003' || !e.categoryId))
      .reduce((sum, e) => sum + (e.direction === 'Credit' ? e.amount : -e.amount), 0);

    // FIX: COGS hesaplarken Debit (Gider) pozitif, Credit (İade Düzeltme) negatif alınır.
    const costOfGoods = saleEntries
      .filter(e => e.categoryId === 'CAT-COGS')
      .reduce((sum, e) => sum + (e.direction === 'Debit' ? e.amount : -e.amount), 0);

    const netProfit = salesRevenue - costOfGoods;

    // --- HAVUZ 2: NAKİT AKIŞI (Kasa / Banka) ---
    const paymentEntries = filteredEntries.filter(l => l.sourceType === 'Payment');

    const totalCollection = paymentEntries
      .filter(e => e.direction === 'Credit')
      .reduce((sum, e) => sum + e.amount, 0);

    const totalPayment = paymentEntries
      .filter(e => e.direction === 'Debit')
      .reduce((sum, e) => sum + e.amount, 0);

    const netCashFlow = totalCollection - totalPayment;

    // --- KATEGORİ KIRILIMLARI (GERÇEK GİDERLER) ---
    // Düzeltme: 'Payment' tipi kayıtları gider havuzuna almıyoruz.
    // Çünkü Payment sadece nakit hareketidir veya iptal işlemidir (özellikle Void edilenler).
    // Gerçek gider 'Purchase' (Satın Alma/Fatura) anında oluşur.
    const expensePool = filteredEntries.filter(e =>
      e.direction === 'Debit' &&
      e.categoryId !== 'CAT-COGS' &&
      e.sourceType === 'Purchase' // SADECE FATURALAR/SATIN ALIMLAR GİDERDİR.
    );

    const expenseTotal = expensePool.reduce((s, e) => s + e.amount, 0);

    const expenseCats: Record<string, number> = {};
    expensePool.forEach(e => {
      expenseCats[e.categoryId] = (expenseCats[e.categoryId] || 0) + e.amount;
    });

    const expenseBreakdown = Object.entries(expenseCats)
      .map(([id, amount]) => ({ cat: categories.find(c => c.id === id), amount }))
      .sort((a, b) => b.amount - a.amount);

    return {
      pnlStats: { salesRevenue, costOfGoods, netProfit },
      cashStats: { totalCollection, totalPayment, netCashFlow },
      categoryStats: { expenseBreakdown, expenseTotal }
    };
  }, [ledgerEntries, categories, period]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-light tracking-tight text-neutral-900">FİNANSAL RAPORLAR</h1>
            <p className="text-neutral-500 mt-1 font-light">Gelir/Gider ve Nakit Akışı Analizi</p>
          </div>
          <div className="flex bg-neutral-100 p-1 rounded-lg">
            {['Month', 'Year', 'All'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p as any)}
                className={`px-4 py-2 text-xs font-medium uppercase rounded-md transition-all ${
                  period === p ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500'
                }`}
              >
                {p === 'Month' ? 'Bu Ay' : p === 'Year' ? 'Bu Yıl' : 'Tümü'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* BÖLÜM 1: TİCARİ PERFORMANS (KÂR / ZARAR) */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white">
              <BarChart3 size={16} />
            </div>
            <h2 className="text-lg font-medium text-neutral-900">TİCARİ PERFORMANS (Tahakkuk)</h2>
            <span className="text-xs text-neutral-400 font-light ml-2 border-l pl-2 border-neutral-300">
              Satış gelirleri ve COGS ile kârlılık
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kart: Satış Cirosu */}
            <div className="bg-white p-6 border border-neutral-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <TrendingUp size={64} />
              </div>
              <div className="flex items-center gap-2 mb-1 text-neutral-500 text-xs font-bold uppercase tracking-wider">
                TOPLAM SATIŞ (CİRO)
              </div>
              <div className="text-3xl font-light text-neutral-900">{formatCurrency(pnlStats.salesRevenue)}</div>
              <div className="mt-2 text-[10px] text-neutral-400">Sevk edilen/satılan ürün bedeli</div>
            </div>

            {/* Kart: COGS */}
            <div className="bg-white p-6 border border-neutral-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-red-500">
                <TrendingDown size={64} />
              </div>
              <div className="flex items-center gap-2 mb-1 text-red-600 text-xs font-bold uppercase tracking-wider">
                SATILAN MALIN MALİYETİ (COGS)
              </div>
              <div className="text-3xl font-light text-neutral-900">{formatCurrency(pnlStats.costOfGoods)}</div>
              <div className="mt-2 text-[10px] text-neutral-400">Sadece satışa bağlanan maliyet</div>
            </div>

            {/* Kart: Net Kâr */}
            <div
              className={`bg-white p-6 border border-neutral-200 relative overflow-hidden ${
                pnlStats.netProfit >= 0 ? 'border-b-4 border-b-green-500' : 'border-b-4 border-b-red-500'
              }`}
            >
              <div className="flex items-center gap-2 mb-1 text-neutral-500 text-xs font-bold uppercase tracking-wider">
                TİCARİ NET KÂR
              </div>
              <div className={`text-3xl font-medium ${pnlStats.netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {formatCurrency(pnlStats.netProfit)}
              </div>
              <div className="mt-2 text-[10px] text-neutral-400">(Satışlar - COGS)</div>
            </div>
          </div>
        </section>

        {/* BÖLÜM 2: NAKİT AKIŞI (KASA / BANKA) */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <Wallet size={16} />
            </div>
            <h2 className="text-lg font-medium text-neutral-900">NAKİT AKIŞI (Kasa & Banka)</h2>
            <span className="text-xs text-neutral-400 font-light ml-2 border-l pl-2 border-neutral-300">
              Gerçekleşen para giriş-çıkışları
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kart: Tahsilat */}
            <div className="bg-blue-50 border border-blue-100 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  <Banknote size={14} /> KASAYA GİREN (TAHSİLAT)
                </div>
                <div className="text-2xl font-light text-blue-900">{formatCurrency(cashStats.totalCollection)}</div>
              </div>
            </div>

            {/* Kart: Ödeme */}
            <div className="bg-orange-50 border border-orange-100 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1 text-orange-800 text-xs font-bold uppercase tracking-wider">
                  <CreditCard size={14} /> KASADAN ÇIKAN (ÖDEME)
                </div>
                <div className="text-2xl font-light text-orange-900">{formatCurrency(cashStats.totalPayment)}</div>
              </div>
            </div>

            {/* Kart: Nakit Dengesi */}
            <div className="bg-neutral-50 border border-neutral-200 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1 text-neutral-500 text-xs font-bold uppercase tracking-wider">
                  NAKİT DENGESİ
                </div>
                <div className={`text-2xl font-light ${cashStats.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(cashStats.netCashFlow)}
                </div>
              </div>
              <div className="text-[10px] text-neutral-400 mt-2">Bu dönem kasadaki net değişim</div>
            </div>
          </div>
        </section>

        {/* BÖLÜM 3: GİDER ANALİZİ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 border border-neutral-200">
            <h3 className="text-lg font-light text-neutral-900 mb-6 flex items-center gap-2">
              <PieChart size={18} /> GİDER KIRILIMI (Nerelere Harcadık?)
            </h3>

            <div className="space-y-5">
              {categoryStats.expenseBreakdown.map((item, idx) => {
                const denom = categoryStats.expenseTotal > 0 ? categoryStats.expenseTotal : 1;
                const pct = categoryStats.expenseTotal > 0 ? (item.amount / denom) * 100 : 0;

                return (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-neutral-700 font-medium">{item.cat?.name || 'Diğer'}</span>
                      <span className="text-neutral-900 font-bold">{formatCurrency(item.amount)}</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-1 text-right">% {pct.toFixed(1)}</div>
                  </div>
                );
              })}

              {categoryStats.expenseBreakdown.length === 0 && (
                <div className="text-neutral-400 italic text-sm text-center py-8">Bu dönem için gider kaydı bulunamadı.</div>
              )}
            </div>
          </div>

          {/* Bilgi Kutusu */}
          <div className="bg-neutral-900 text-white p-8 flex flex-col justify-center items-center text-center">
            <div className="p-4 bg-white/10 rounded-full mb-4">
              <TrendingUp size={32} className="text-green-400" />
            </div>
            <h3 className="text-xl font-light tracking-wide mb-2">Finansal Sağlık</h3>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Şu anki tabloya göre ticari kârlılığınız{' '}
              <strong className={pnlStats.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}>
                {pnlStats.netProfit >= 0 ? 'POZİTİF' : 'NEGATİF'}
              </strong>{' '}
              durumda.
              <br />
              <br />
              Nakit akışınız ise{' '}
              <strong className={cashStats.netCashFlow >= 0 ? 'text-blue-400' : 'text-orange-400'}>
                {cashStats.netCashFlow >= 0 ? 'ARTI' : 'EKSİ'}
              </strong>{' '}
              yönde seyrediyor.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};