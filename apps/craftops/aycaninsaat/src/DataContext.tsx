// DataContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
// YENİ: Mock dataları import ediyoruz
import { MOCK_KISILER, MOCK_ISLEMLER } from "./mockData";

// --- TİPLER (Ortak Tipler) ---
export interface Kisi {
  id: string;
  ad: string;
  rol?: string;
  telefon?: string;
  notu?: string;
}

export interface Islem {
  id: string;
  tarih: string | null;
  tutar: number; // TL Karşılığı (Hesaplamalar için)
  tutar_raw: number; // Orijinal para birimi tutarı
  tip: "tahsilat" | "odeme" | "odenecek" | "alacak";
  is_bitiminde: number; // 0 veya 1
  kisi_id: string;
  aciklama: string | null;
  doviz: "TRY" | "USD" | "EUR" | "ALTIN";
}

interface DataContextType {
  kisiler: Kisi[];
  islemler: Islem[];
  addKisi: (kisi: Kisi) => void;
  removeKisi: (id: string) => void;
  addIslem: (islem: Islem) => void;
  updateIslem: (islem: Islem) => void;
  removeIslem: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  // Başlangıç değerlerini mockData.ts'den alıyoruz
  const [kisiler, setKisiler] = useState<Kisi[]>(MOCK_KISILER);
  // TypeScript'in "as Islem[]" dönüşümüne ihtiyacı olabilir çünkü mock dosyasında tip belirtmedik
  const [islemler, setIslemler] = useState<Islem[]>(MOCK_ISLEMLER as Islem[]);

  const addKisi = (kisi: Kisi) => setKisiler((prev) => [kisi, ...prev]);
  const removeKisi = (id: string) => setKisiler((prev) => prev.filter((k) => k.id !== id));

  const addIslem = (islem: Islem) => setIslemler((prev) => [islem, ...prev]);
  const updateIslem = (updated: Islem) =>
    setIslemler((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  const removeIslem = (id: string) => setIslemler((prev) => prev.filter((i) => i.id !== id));

  return (
    <DataContext.Provider
      value={{ kisiler, islemler, addKisi, removeKisi, addIslem, updateIslem, removeIslem }}
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