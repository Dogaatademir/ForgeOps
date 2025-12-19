import { useState } from 'react';
import { 
  Settings, 
  Building, 
  Save, 
  Download, 
  RefreshCw, 
  Bell, 
  Globe, 
  Moon,
  CheckCircle2
} from 'lucide-react';
import { useData } from './DataContext';

export default function SettingsPage() {
  const { kisiler, islemler } = useData();
  
  // Local State simülasyonları
  const [companyName, setCompanyName] = useState("Aycan İnşaat");
  const [footerText, setFooterText] = useState("Powered by CraftOps");
  const [currency, setCurrency] = useState("TRY");
  const [isSaved, setIsSaved] = useState(false);

  // --- ACTIONS ---

  // 1. Verileri JSON olarak indir
  const handleExportData = () => {
    const data = {
      date: new Date().toISOString(),
      summary: {
        total_transactions: islemler.length,
        total_contacts: kisiler.length
      },
      kisiler,
      islemler
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aycan-insaat-yedek-${new Date().toLocaleDateString('tr-TR').replace(/\./g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. Ayarları Kaydet (Simülasyon)
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // 3. Sayfayı Yenile (Reset Simülasyonu)
  const handleReset = () => {
    if(window.confirm("Tüm, kaydedilmemiş veriler silinecek ve varsayılan verilere dönülecektir. Emin misiniz?")) {
        window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* HEADER */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-light tracking-tight text-neutral-900">
                AYARLAR
              </h1>
              <p className="text-neutral-500 mt-1 font-light">
                Sistem Tercihleri & Veri Yönetimi
              </p>
            </div>
            <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center">
              <Settings className="text-white" size={28} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- SOL KOLON: FİRMA AYARLARI --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Firma Bilgileri Kartı */}
            <div className="bg-white border border-neutral-200 p-8 relative overflow-hidden">
               <div className="flex items-center gap-3 mb-6 border-b border-neutral-100 pb-4">
                  <Building className="text-neutral-400" size={20} />
                  <h2 className="text-lg font-light text-neutral-900 tracking-tight">FİRMA PROFİLİ</h2>
               </div>

               <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-2 tracking-wider">FİRMA ADI / BAŞLIK</label>
                    <input 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full p-4 bg-neutral-50 border border-neutral-200 text-neutral-900 outline-none focus:border-neutral-900 font-light transition-colors"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-medium text-neutral-500 mb-2 tracking-wider">PARA BİRİMİ</label>
                        <select 
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className="w-full p-4 bg-neutral-50 border border-neutral-200 text-neutral-900 outline-none focus:border-neutral-900 font-light appearance-none"
                        >
                            <option value="TRY">Türk Lirası (₺)</option>
                            <option value="USD">Amerikan Doları ($)</option>
                            <option value="EUR">Euro (€)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-neutral-500 mb-2 tracking-wider">ALT BİLGİ METNİ</label>
                        <input 
                          value={footerText}
                          onChange={(e) => setFooterText(e.target.value)}
                          className="w-full p-4 bg-neutral-50 border border-neutral-200 text-neutral-900 outline-none focus:border-neutral-900 font-light transition-colors"
                        />
                    </div>
                  </div>
               </div>

               <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-end">
                  <button 
                    onClick={handleSave}
                    className={`
                        px-8 py-3 flex items-center gap-2 transition-all duration-300
                        ${isSaved ? 'bg-green-600 text-white' : 'bg-neutral-900 text-white hover:bg-neutral-800'}
                    `}
                  >
                    {isSaved ? <CheckCircle2 size={18} /> : <Save size={18} />}
                    <span className="font-light tracking-widest text-sm">
                        {isSaved ? 'KAYDEDİLDİ' : 'KAYDET'}
                    </span>
                  </button>
               </div>
            </div>

            {/* Uygulama Tercihleri */}
            <div className="bg-white border border-neutral-200 p-8">
               <div className="flex items-center gap-3 mb-6 border-b border-neutral-100 pb-4">
                  <Globe className="text-neutral-400" size={20} />
                  <h2 className="text-lg font-light text-neutral-900 tracking-tight">UYGULAMA TERCİHLERİ</h2>
               </div>

               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 border border-neutral-100">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-full border border-neutral-200 text-neutral-500">
                            <Moon size={16} />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-neutral-900">Karanlık Mod</div>
                            <div className="text-xs text-neutral-500">Arayüzü koyu renklere çevirir.</div>
                        </div>
                     </div>
                     <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-neutral-300"/>
                        <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-neutral-300 cursor-pointer"></label>
                     </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-neutral-50 border border-neutral-100">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-full border border-neutral-200 text-neutral-500">
                            <Bell size={16} />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-neutral-900">Bildirimler</div>
                            <div className="text-xs text-neutral-500">Vadesi gelen ödemeler için uyarı göster.</div>
                        </div>
                     </div>
                     <div className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Açık</div>
                  </div>
               </div>
            </div>

          </div>

          {/* --- SAĞ KOLON: VERİ YÖNETİMİ --- */}
          <div className="space-y-8">
             
             {/* Veri Durumu Özeti */}
             <div className="bg-neutral-900 text-white p-8 relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-lg font-light mb-1">Sistem Durumu</h3>
                    <p className="text-neutral-400 text-xs mb-6">Mevcut veri setinin özeti.</p>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                            <span className="text-sm text-neutral-400">Kayıtlı Kişi</span>
                            <span className="text-xl font-light">{kisiler.length}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                            <span className="text-sm text-neutral-400">İşlem Hareketi</span>
                            <span className="text-xl font-light">{islemler.length}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                            <span className="text-sm text-neutral-400">Versiyon</span>
                            <span className="text-xl font-light">v1.2.4</span>
                        </div>
                    </div>
                </div>
                {/* Dekoratif */}
                <div className="absolute -bottom-10 -right-10 text-neutral-800 opacity-20">
                    <Settings size={200} />
                </div>
             </div>

             {/* İşlem Butonları */}
             <div className="bg-white border border-neutral-200 p-6 space-y-4">
                <h3 className="text-xs font-bold text-neutral-400 tracking-wider uppercase mb-4">VERİ YÖNETİMİ</h3>
                
                <button 
                  onClick={handleExportData}
                  className="w-full py-4 px-4 bg-neutral-50 border border-neutral-200 text-neutral-900 hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 group"
                >
                    <Download size={18} className="text-neutral-500 group-hover:text-neutral-900 transition-colors" />
                    <span className="font-light text-sm">YEDEK AL (.JSON)</span>
                </button>

                <button 
                  onClick={handleReset}
                  className="w-full py-4 px-4 bg-white border border-red-100 text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-2 group"
                >
                    <RefreshCw size={18} className="text-red-400 group-hover:text-red-600 transition-colors" />
                    <span className="font-light text-sm">VARSAYILANA DÖN</span>
                </button>
                
                <p className="text-[10px] text-neutral-400 text-center pt-2">
                    Not: "Varsayılana Dön" işlemi tüm geçici verileri siler ve demo verilerini geri yükler.
                </p>
             </div>

          </div>

        </div>
      </div>
    </div>
  );
}