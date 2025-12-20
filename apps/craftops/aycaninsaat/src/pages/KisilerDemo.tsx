import { useState, useMemo } from "react";
import { Users, UserPlus, Trash2, Briefcase } from "lucide-react";
import { CustomSelect } from "../components/CustomSelect";
import { useData } from "../context/DataContext";

const ROLE_LABEL: Record<string, string> = {
  musteri: "Müşteri",
  tedarikci: "Tedarikçi",
  banka: "Banka",
  taseron: "Taşeron",
  sahis: "Şahıs",
};

const ROLE_OPTIONS = Object.entries(ROLE_LABEL).map(([value, label]) => ({
  value,
  label,
}));

export default function KisilerDemo() {
  const { kisiler, addKisi, removeKisi } = useData();
  
  const [form, setForm] = useState({ ad: "", rol: "", telefon: "", notu: "" });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // --- KİŞİ EKLEME ---
  async function add() {
    if (!form.ad.trim()) return alert("Ad giriniz");
    
    try {
      await addKisi({ 
        id: crypto.randomUUID(), 
        ad: form.ad, 
        rol: form.rol, 
        telefon: form.telefon, 
        notu: form.notu 
      });
      
      setForm({ ad: "", rol: "", telefon: "", notu: "" });
    } catch (error) {
      console.error("Kişi ekleme hatası:", error);
      alert("Kişi eklenirken hata oluştu.");
    }
  }

  // --- KİŞİ SİLME ---
  async function del(id: string) {
    if(!confirm("Bu kişiyi ve kişiye ait tüm işlemleri silmek istediğinize emin misiniz?")) return;

    try {
      setDeletingId(id);
      await removeKisi(id);
    } catch (error) {
      console.error("Silme hatası:", error);
      alert("Silme işlemi başarısız.");
    } finally {
      setDeletingId(null);
    }
  }

  // --- SIRALAMA (A-Z) ---
  const sortedKisiler = useMemo(() => {
    // Türkçe karakter duyarlı sıralama (a.ad ile b.ad karşılaştırılır)
    return [...kisiler].sort((a, b) => a.ad.localeCompare(b.ad, "tr"));
  }, [kisiler]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* HEADER */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-light tracking-tight text-neutral-900">
                KİŞİLER
              </h1>
              <p className="text-neutral-500 mt-1 font-light">
                Müşteri & Tedarikçi Yönetimi
              </p>
            </div>
            <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center">
              <Users className="text-white" size={28} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* EKLEME FORMU */}
        <div className="bg-white p-8 border border-neutral-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center">
              <UserPlus className="text-white" size={16} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-light tracking-tight text-neutral-900">
              YENİ KİŞİ EKLE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-4">
              <label className="block text-xs font-medium text-neutral-500 mb-3 tracking-wider">
                AD / ÜNVAN
              </label>
              <input
                placeholder="Örn: Ahmet Yılmaz"
                value={form.ad}
                onChange={(e) => setForm({ ...form, ad: e.target.value })}
                className="w-full p-4 bg-white border border-neutral-300 text-neutral-900 outline-none focus:border-neutral-900 font-light placeholder:text-neutral-300 transition-colors"
              />
            </div>

            <div className="md:col-span-3">
              <CustomSelect
                label="ROL"
                value={form.rol}
                onChange={(val) => setForm({ ...form, rol: val })}
                options={ROLE_OPTIONS}
                placeholder="Seçiniz"
                icon={Briefcase}
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-neutral-500 mb-3 tracking-wider">
                TELEFON / NOT
              </label>
              <input
                placeholder="İsteğe bağlı not..."
                value={form.notu}
                onChange={(e) => setForm({ ...form, notu: e.target.value })}
                className="w-full p-4 bg-white border border-neutral-300 text-neutral-900 outline-none focus:border-neutral-900 font-light placeholder:text-neutral-300 transition-colors"
              />
            </div>

            <div className="md:col-span-2">
              <button
                onClick={add}
                className="w-full py-4 bg-neutral-900 text-white font-light tracking-widest hover:bg-neutral-800 transition-all active:scale-[0.99]"
              >
                KAYDET
              </button>
            </div>
          </div>
        </div>

        {/* LİSTE */}
        <div className="bg-white border border-neutral-200">
          
          {/* SCROLL WRAPPER BAŞLANGIÇ */}
          <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]"> {/* min-w eklendi */}
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-medium text-neutral-500 tracking-wider">
                      AD / ÜNVAN
                    </th>
                    <th className="px-6 py-4 text-xs font-medium text-neutral-500 tracking-wider">
                      ROL
                    </th>
                    <th className="px-6 py-4 text-xs font-medium text-neutral-500 tracking-wider">
                      NOTLAR
                    </th>
                    <th className="px-6 py-4 text-right w-24 text-xs font-medium text-neutral-500 tracking-wider">
                      İŞLEM
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {/* sortedKisiler kullanılıyor */}
                  {sortedKisiler.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-neutral-50 group transition-colors"
                    >
                      <td className="px-6 py-5 font-light text-neutral-900 text-lg">
                        {r.ad}
                      </td>
                      <td className="px-6 py-5">
                        {r.rol ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 tracking-wide border border-neutral-200">
                            {ROLE_LABEL[r.rol]}
                          </span>
                        ) : (
                          <span className="text-neutral-300">—</span>
                        )}
                      </td>
                      <td className="px-6 py-5 font-light text-neutral-500 italic">
                        {r.notu || "—"}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => del(r.id)}
                          disabled={deletingId === r.id}
                          className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={18} strokeWidth={1.5} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {sortedKisiler.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="p-12 text-center text-neutral-400 font-light"
                      >
                        Henüz kişi eklenmedi.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
          </div>
          {/* SCROLL WRAPPER BİTİŞ */}
          
        </div>
      </div>
    </div>
  );
}