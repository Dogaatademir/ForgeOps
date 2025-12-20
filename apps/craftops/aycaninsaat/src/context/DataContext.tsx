import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { MOCK_KISILER, MOCK_ISLEMLER } from "./mockData"; // Mock verileri import ettik

// --- SUPABASE AYARLARI ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON as string;
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnon);

// --- TİPLER ---
export interface Kisi {
  id: string;
  ad: string;
  rol?: string | null;
  telefon?: string | null;
  notu?: string | null;
  created_at?: string;
}

export interface Islem {
  id: string;
  tarih: string | null;
  tutar: number;
  tutar_raw: number | null;
  tip: "tahsilat" | "odeme" | "odenecek" | "alacak" | "cek";
  is_bitiminde: number | null;
  kisi_id: string | null;
  aciklama: string | null;
  doviz: "TRY" | "USD" | "EUR" | "ALTIN" | null;
  created_at?: string;
}

interface DataContextType {
  kisiler: Kisi[];
  islemler: Islem[];
  loading: boolean;
  isMock: boolean; // Mock modunda mıyız?
  toggleDataSource: () => void; // Mod değiştirme fonksiyonu
  loadBackup: (data: { kisiler: Kisi[], islemler: Islem[] }) => void; // Yedek yükleme
  addKisi: (kisi: Kisi) => Promise<void>;
  removeKisi: (id: string) => Promise<void>;
  addIslem: (islem: Islem) => Promise<void>;
  updateIslem: (islem: Islem) => Promise<void>;
  removeIslem: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  // Varsayılan olarak localStorage'dan tercihi oku, yoksa false (Supabase)
  const [isMock, setIsMock] = useState<boolean>(() => {
    const saved = localStorage.getItem("app_data_source");
    return saved === "mock";
  });
  
  const [kisiler, setKisiler] = useState<Kisi[]>([]);
  const [islemler, setIslemler] = useState<Islem[]>([]);
  const [loading, setLoading] = useState(true);

  // Mod değiştiğinde veya ilk açılışta veriyi çek
  useEffect(() => {
    fetchData();
    localStorage.setItem("app_data_source", isMock ? "mock" : "supabase");
  }, [isMock]);

  // Mod değiştirici
  const toggleDataSource = () => {
    setIsMock((prev) => !prev);
  };

  // Yedek Yükleyici
  const loadBackup = (data: { kisiler: Kisi[], islemler: Islem[] }) => {
    // Gelen veriyi state'e yükle (Supabase'i ezmez, sadece anlık görünümü değiştirir)
    // Eğer Supabase modundaysanız ve veritabanını da güncellemek isterseniz,
    // burada bir döngü ile insert işlemi yapılması gerekir ancak bu riskli olabilir.
    // Bu fonksiyon şu an sadece "Görüntüleme" amaçlı yükler.
    setKisiler(data.kisiler || []);
    setIslemler(data.islemler || []);
    alert("Yedek başarıyla yüklendi. (Not: Realtime modundaysanız bu veriler veritabanına işlenmedi, sadece ekranda güncellendi.)");
  };

  async function fetchData() {
    setLoading(true);
    try {
      if (isMock) {
        // --- MOCK MODU ---
        // Biraz gecikme simüle edelim ki yükleniyor görünsün
        setTimeout(() => {
          setKisiler(MOCK_KISILER);
          setIslemler(MOCK_ISLEMLER as Islem[]);
          setLoading(false);
        }, 500);
      } else {
        // --- SUPABASE MODU ---
        const { data: kisilerData, error: kError } = await supabase
          .from("kisiler")
          .select("*")
          .order("ad", { ascending: true });
        if (kError) throw kError;

        const { data: islemlerData, error: iError } = await supabase
          .from("islemler")
          .select("*")
          .order("created_at", { ascending: false })
          .order("tarih", { ascending: false, nullsFirst: false });
        if (iError) throw iError;

        setKisiler(kisilerData || []);
        setIslemler(islemlerData || []);
        setLoading(false);
      }
    } catch (error) {
      console.error("Veri çekme hatası:", error);
      setLoading(false);
    }
  }

  // --- CRUD WRAPPERS ---
  // Mock modundaysa sadece state günceller, değilse DB'ye yazar.

  const addKisi = async (kisi: Kisi) => {
    if (!isMock) {
      const { created_at, ...kisiData } = kisi; 
      const { error } = await supabase.from("kisiler").insert(kisiData);
      if (error) throw error;
    }
    setKisiler((prev) => [kisi, ...prev]);
  };

  const removeKisi = async (id: string) => {
    if (!isMock) {
      const { error } = await supabase.from("kisiler").delete().eq("id", id);
      if (error) throw error;
    }
    setKisiler((prev) => prev.filter((k) => k.id !== id));
  };

  const addIslem = async (islem: Islem) => {
    if (!isMock) {
      const { created_at, ...islemData } = islem;
      const { error } = await supabase.from("islemler").insert(islemData);
      if (error) throw error;
    }
    setIslemler((prev) => [islem, ...prev]);
  };

  const updateIslem = async (islem: Islem) => {
    if (!isMock) {
      const { created_at, ...islemData } = islem;
      const { error } = await supabase.from("islemler").update(islemData).eq("id", islem.id);
      if (error) throw error;
    }
    setIslemler((prev) => prev.map((i) => (i.id === islem.id ? islem : i)));
  };

  const removeIslem = async (id: string) => {
    if (!isMock) {
      const { error } = await supabase.from("islemler").delete().eq("id", id);
      if (error) throw error;
    }
    setIslemler((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <DataContext.Provider
      value={{ 
        kisiler, 
        islemler, 
        loading, 
        isMock, 
        toggleDataSource, 
        loadBackup,
        addKisi, 
        removeKisi, 
        addIslem, 
        updateIslem, 
        removeIslem 
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
}