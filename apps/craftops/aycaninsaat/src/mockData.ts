// mockData.ts

export const MOCK_KISILER = [
  // MÜŞTERİLER
  { id: "1", ad: "Ahmet Yılmaz", rol: "musteri", notu: "A Blok Daire 4 Alıcısı", telefon: "0532 100 0001" },
  { id: "2", ad: "Selin Kaya (Diş Hekimi)", rol: "musteri", notu: "Villa Projesi Müşterisi", telefon: "0533 200 0002" },
  { id: "3", ad: "Global Tekstil A.Ş.", rol: "musteri", notu: "Fabrika Yenileme İşi", telefon: "0212 300 0003" },
  
  // TEDARİKÇİLER
  { id: "4", ad: "BetonSA Hazır Beton", rol: "tedarikci", notu: "C30 Beton Tedariği", telefon: "0216 400 0004" },
  { id: "5", ad: "Demir Çelik Dünyası", rol: "tedarikci", notu: "İnşaat Demiri (Ø12-Ø16)", telefon: "0212 500 0005" },
  { id: "6", ad: "Vitra Seramik Bayi", rol: "tedarikci", notu: "Islak Zemin Malzemeleri", telefon: "0216 600 0006" },
  { id: "7", ad: "Lumber Kereste", rol: "tedarikci", notu: "Kalıp Malzemeleri", telefon: "0542 700 0007" },
  
  // TAŞERONLAR & HİZMET
  { id: "8", ad: "Mimar Sinem Vural", rol: "taseron", notu: "Proje Çizim ve Ruhsat", telefon: "0535 800 0008" },
  { id: "9", ad: "Elektrikçi Erol Usta", rol: "taseron", notu: "Tüm elektrik tesisatı", telefon: "0555 900 0009" },
  { id: "10", ad: "Tesisatçı Kemal", rol: "taseron", notu: "Sıhhi Tesisat Ekibi", telefon: "0536 111 2233" },
  { id: "11", ad: "Hafriyatçı Rıza", rol: "taseron", notu: "Temel Kazı İşleri", telefon: "0537 222 3344" },
  
  // DİĞER
  { id: "12", ad: "Ofis Genel Giderler", rol: "sahis", notu: "Mutfak, Kira, Aidat vb.", telefon: "" },
];

export const MOCK_ISLEMLER = [
  // --- EKİM 2025 ---
  { 
    id: "101", kisi_id: "1", tarih: "2025-10-01", tip: "tahsilat", 
    tutar: 500000, tutar_raw: 500000, doviz: "TRY", 
    aciklama: "Daire Satış Peşinatı (Ahmet Y.)", is_bitiminde: 0 
  },
  { 
    id: "102", kisi_id: "8", tarih: "2025-10-02", tip: "odeme", 
    tutar: 25000, tutar_raw: 25000, doviz: "TRY", 
    aciklama: "Proje Çizim Avansı", is_bitiminde: 0 
  },
  { 
    id: "103", kisi_id: "4", tarih: "2025-10-05", tip: "odenecek", 
    tutar: 120000, tutar_raw: 120000, doviz: "TRY", 
    aciklama: "C30 Beton Dökümü (Temel)", is_bitiminde: 0 
  },
  
  // --- KASIM 2025 ---
  { 
    id: "104", kisi_id: "5", tarih: "2025-11-01", tip: "odenecek", 
    tutar: 345000, tutar_raw: 10000, doviz: "USD", 
    aciklama: "20 Ton Demir Alımı (Kur Tahmini)", is_bitiminde: 0 
  },
  { 
    id: "105", kisi_id: "11", tarih: "2025-11-03", tip: "odeme", 
    tutar: 40000, tutar_raw: 40000, doviz: "TRY", 
    aciklama: "Hafriyat Kamyon Ödemeleri", is_bitiminde: 0 
  },
  { 
    id: "106", kisi_id: "2", tarih: "2025-11-10", tip: "tahsilat", 
    tutar: 1500000, tutar_raw: 1500000, doviz: "TRY", 
    aciklama: "Villa Kaba İnşaat Hakedişi", is_bitiminde: 0 
  },
  
  // --- ARALIK 2025 ---
  { 
    id: "107", kisi_id: "6", tarih: "2025-12-01", tip: "alacak", 
    tutar: 50000, tutar_raw: 50000, doviz: "TRY", 
    aciklama: "İade Edilen Kırık Fayanslar", is_bitiminde: 0 
  },
  { 
    id: "108", kisi_id: "12", tarih: "2025-12-05", tip: "odeme", 
    tutar: 15000, tutar_raw: 15000, doviz: "TRY", 
    aciklama: "Ofis Kirası ve Aidat", is_bitiminde: 0 
  },
  { 
    id: "109", kisi_id: "9", tarih: "2025-12-12", tip: "odeme", 
    tutar: 10000, tutar_raw: 10000, doviz: "TRY", 
    aciklama: "Elektrik Borulama İşçilik", is_bitiminde: 0 
  },

  // --- İŞ BİTİMİ / VADELİ İŞLEMLER ---
  { 
    id: "201", kisi_id: "3", tarih: null, tip: "alacak", 
    tutar: 2500000, tutar_raw: 2500000, doviz: "TRY", 
    aciklama: "Fabrika Teslimi Kesin Hakediş", is_bitiminde: 1 
  },
  { 
    id: "202", kisi_id: "8", tarih: null, tip: "odenecek", 
    tutar: 15000, tutar_raw: 15000, doviz: "TRY", 
    aciklama: "İskan Alındığında Ödenecek Bakiye", is_bitiminde: 1 
  },
  
  // --- DÖVİZLİ İŞLEMLER ---
  { 
    id: "301", kisi_id: "7", tarih: "2025-11-20", tip: "odeme", 
    tutar: 74400, tutar_raw: 2000, doviz: "EUR", 
    aciklama: "İthal Plywood Kalıp (2000 EUR)", is_bitiminde: 0 
  },
  { 
    id: "302", kisi_id: "1", tarih: "2025-10-15", tip: "tahsilat", 
    tutar: 295000, tutar_raw: 100, doviz: "ALTIN", 
    aciklama: "Ödeme Karşılığı 100 Gr Altın Tahsilatı", is_bitiminde: 0 
  }
];