// dummyDataGenerator.ts

import type { 
  GreenCoffee, RoastStock, PackagingItem, BlendRecipe, Party, 
  PurchaseLog, ProductionLog, Order, Sale, LedgerEntry, 
  InventoryMovement, Payment, Category, Quote 
} from './StoreContext';
// --- YARDIMCI FONKSİYONLAR ---
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// --- SABİT VERİLER ---

const SEED_GREENS: GreenCoffee[] = [
  { id: 'GC-001', name: 'Brazil Rio Brilhante', origin: 'Brazil', process: 'Natural', stockKg: 0, entryDate: '2025-01-10', averageCost: 285.50 },
  { id: 'GC-002', name: 'Ethiopia Yirgacheffe', origin: 'Ethiopia', process: 'Washed', stockKg: 0, entryDate: '2025-01-15', averageCost: 460.00 },
  { id: 'GC-003', name: 'Colombia Supremo', origin: 'Colombia', process: 'Washed', stockKg: 0, entryDate: '2025-02-01', averageCost: 340.00 },
  { id: 'GC-004', name: 'Guatemala Antigua', origin: 'Guatemala', process: 'Washed', stockKg: 0, entryDate: '2025-03-10', averageCost: 390.00 },
];

const SEED_PACKAGING: PackagingItem[] = [
  { id: 'PKG-BAG-01', category: 'Bag', brand: 'Edition', name: 'Beyaz Valfli Torba', variant: '250g', color: 'White', stockQuantity: 0, minThreshold: 200, averageCost: 8.50 },
  { id: 'PKG-BAG-02', category: 'Bag', brand: 'Edition', name: 'Siyah Valfli Torba', variant: '1kg', color: 'Black', stockQuantity: 0, minThreshold: 100, averageCost: 12.00 },
  { id: 'PKG-LBL-01', category: 'Label', brand: 'Edition', name: 'Ön Etiket (Std)', variant: 'Tümü', labelType: 'Front', stockQuantity: 0, minThreshold: 500, averageCost: 2.25 },
  { id: 'PKG-LBL-02', category: 'Label', brand: 'Edition', name: 'Arka Etiket (Bilgi)', variant: 'Tümü', labelType: 'Back', stockQuantity: 0, minThreshold: 500, averageCost: 1.50 },
  { id: 'PKG-BOX-01', category: 'Box', brand: 'Edition', name: 'Kargo Kutusu', variant: 'Küçük', stockQuantity: 0, minThreshold: 50, averageCost: 15.00 },
];

const SEED_RECIPES: BlendRecipe[] = [
  { id: 'BLD-ESP-01', name: 'Signature Espresso', description: 'Yoğun gövdeli', ingredients: [{ roastId: 'RST-BRA', ratio: 70 }, { roastId: 'RST-COL', ratio: 30 }] },
  { id: 'BLD-FIL-01', name: 'Morning Filter', description: 'Yumuşak içim', ingredients: [{ roastId: 'RST-ETH', ratio: 60 }, { roastId: 'RST-GUA', ratio: 40 }] },
];

const SEED_PARTIES: Party[] = [
  // Tedarikçiler
  { id: 'SUP-001', type: 'Supplier', name: 'Global Kahve İthalat A.Ş.', note: 'Ana çekirdek tedarikçisi', status: 'Active' },
  { id: 'SUP-002', type: 'Supplier', name: 'PackMaster Ambalaj', note: 'Torba ve kutular', status: 'Active' },
  { id: 'SUP-003', type: 'Supplier', name: 'Etiket Dünyası', note: 'Etiket işleri', status: 'Active' },
  // Müşteriler
  { id: 'CUST-001', type: 'Customer', name: 'Coffeetopia Kadıköy', note: 'Haftalık düzenli alım', status: 'Active' },
  { id: 'CUST-002', type: 'Customer', name: 'Books & Coffee', note: 'Filtre kahve ağırlıklı', status: 'Active' },
  { id: 'CUST-003', type: 'Customer', name: 'Hotel Marmara', note: 'Kurumsal', status: 'Active' },
  { id: 'CUST-004', type: 'Customer', name: 'Bireysel: Ahmet Yılmaz', note: 'Web sitesi müşterisi', status: 'Active' },
  { id: 'CUST-005', type: 'Customer', name: 'Zeynep Demir', note: 'Sadık müşteri', status: 'Active' },
];

const SEED_CATEGORIES: Category[] = [
  { id: 'CAT-001', type: 'Expense', name: 'Hammadde (Yeşil Çekirdek)', status: 'Active' },
  { id: 'CAT-002', type: 'Expense', name: 'Ambalaj & Paketleme', status: 'Active' },
  { id: 'CAT-003', type: 'Income', name: 'Ürün Satışı', status: 'Active' },
  { id: 'CAT-004', type: 'Expense', name: 'Kargo & Lojistik', status: 'Active' },
  { id: 'CAT-005', type: 'Expense', name: 'Genel Giderler', status: 'Active' },
  { id: 'CAT-006', type: 'Income', name: 'Tahsilat / Ödeme', status: 'Active' },
  { id: 'CAT-COGS', type: 'Expense', name: 'Satılan Malın Maliyeti (COGS)', status: 'Active' },
];

// --- GENERATOR FONKSİYONU ---

export const generateDummyData = () => {
  // Veri Havuzları
  let purchases: PurchaseLog[] = [];
  let productionLogs: ProductionLog[] = [];
  let orders: Order[] = [];
  let sales: Sale[] = [];
  let ledgerEntries: LedgerEntry[] = [];
  let payments: Payment[] = [];
  let inventoryMovements: InventoryMovement[] = [];
  let roastStocks: RoastStock[] = [];
  let quotes: Quote[] = [];

  // Geçici Stok Takibi (ID bazlı basit sayaçlar)
  const tempStock: Record<string, number> = {}; 
  const getStock = (id: string) => tempStock[id] || 0;
  const updateStock = (id: string, delta: number) => { tempStock[id] = (tempStock[id] || 0) + delta; };

  // Roast Stock ID map (Green ID -> Roast ID)

  // Simülasyon Tarih Aralığı: 1 Ocak 2025 - 16 Aralık 2025
  const startDate = new Date('2025-01-01');
  const endDate = new Date('2025-12-16');
  
  let currentDate = new Date(startDate);
  
  // Döngü
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    
    // 1. SATIN ALMA (Ayda 2-3 kez)
    if (Math.random() > 0.9 && !isWeekend) {
      // Yeşil Çekirdek Alımı
      const green = getRandomItem(SEED_GREENS);
      const qty = getRandomInt(60, 300); // kg
      const cost = qty * (green.averageCost || 300);
      const logId = `PUR-GRN-${dateStr}-${getRandomInt(100,999)}`;
      
      purchases.push({
        id: logId, date: dateStr, supplierId: 'SUP-001', supplier: 'Global Kahve',
        categoryId: 'CAT-001', category: 'GreenCoffee', itemId: green.id, itemName: green.name,
        quantity: qty, cost, unitCost: green.averageCost, status: 'Active'
      });
      
      ledgerEntries.push({
        id: `LED-PUR-${logId}`, date: dateStr, partyId: 'SUP-001', categoryId: 'CAT-001',
        direction: 'Debit', amount: cost, currency: 'TRY', sourceType: 'Purchase', sourceId: logId, status: 'Active',
        note: `Alım: ${green.name}`
      });

      inventoryMovements.push({
        id: `MOV-PUR-${logId}`, date: dateStr, itemType: 'GreenCoffee', itemId: green.id,
        qtyDelta: qty, uom: 'kg', reason: 'Purchase', sourceType: 'PurchaseLog', sourceId: logId,
        unitCost: green.averageCost, totalCost: cost, status: 'Active'
      });
      
      updateStock(green.id, qty);
    }

    if (Math.random() > 0.92 && !isWeekend) {
        // Ambalaj Alımı
        const pkg = getRandomItem(SEED_PACKAGING);
        const qty = getRandomInt(500, 2000);
        const cost = qty * (pkg.averageCost || 5);
        const logId = `PUR-PKG-${dateStr}-${getRandomInt(100,999)}`;

        purchases.push({
             id: logId, date: dateStr, supplierId: 'SUP-002', supplier: 'PackMaster',
             categoryId: 'CAT-002', category: 'Packaging', itemId: pkg.id, itemName: pkg.name,
             quantity: qty, cost, unitCost: pkg.averageCost, status: 'Active'
        });

        ledgerEntries.push({
            id: `LED-PUR-${logId}`, date: dateStr, partyId: 'SUP-002', categoryId: 'CAT-002',
            direction: 'Debit', amount: cost, currency: 'TRY', sourceType: 'Purchase', sourceId: logId, status: 'Active',
            note: `Alım: ${pkg.name}`
        });

        inventoryMovements.push({
             id: `MOV-PUR-${logId}`, date: dateStr, itemType: 'Packaging', itemId: pkg.id,
             qtyDelta: qty, uom: 'qty', reason: 'Purchase', sourceType: 'PurchaseLog', sourceId: logId,
             unitCost: pkg.averageCost, totalCost: cost, status: 'Active'
        });
        updateStock(pkg.id, qty);
    }

    // 2. ÜRETİM (Haftada 2-3 kez)
    if (Math.random() > 0.7 && !isWeekend) {
        // Hangi kahveden/reçeteden üretilecek?
        const isBlend = Math.random() > 0.5;
        const packCount = getRandomInt(10, 50);
        const packSize = Math.random() > 0.8 ? 1000 : 250;
        const totalCoffeeNeeded = (packSize * packCount) / 1000;
        
        // Basitlik için: Üretim anında kavrulduğunu ve paketlendiğini varsayıyoruz.
        // Hammadde düşüşü
        const green = getRandomItem(SEED_GREENS);
        // Stok kontrolü yapmıyorum, negatife düşerse düşsün (gerçek hayatta olur).
        
        const prdId = `PRD-${dateStr}-${getRandomInt(1000,9999)}`;
        const productName = isBlend ? SEED_RECIPES[0].name : green.name;
        
        // Üretim Logu
        productionLogs.push({
            id: prdId, status: 'Active', date: dateStr, productName, brand: 'Edition',
            packSize: packSize as 250 | 1000, packCount, totalCoffeeKg: totalCoffeeNeeded,
            unitCost: 150, totalCost: 150 * packCount // Basit maliyet
        });

        // Mamul Girişi
        const itemId = `Edition-${productName}-${packSize}`;
        inventoryMovements.push({
            id: `MOV-PRD-FIN-${prdId}`, date: dateStr, itemType: 'FinishedProduct', itemId,
            qtyDelta: packCount, uom: 'qty', reason: 'Production', sourceType: 'ProductionLog', sourceId: prdId,
            unitCost: 150, totalCost: 150 * packCount, status: 'Active'
        });
        updateStock(itemId, packCount);
    }

    // 3. SATIŞ (Her gün olabilir)
    if (Math.random() > 0.6) {
        const customer = getRandomItem(SEED_PARTIES.filter(p => p.type === 'Customer'));
        const orderId = `ORD-${dateStr.replace(/-/g,'')}-${getRandomInt(10,99)}`;
        const saleId = `SALE-${orderId}`;
        
        // Sepet oluştur
        const items: any[] = [];
        const numItems = getRandomInt(1, 4);
        let totalAmount = 0;
        let totalCOGS = 0;

        for (let i=0; i<numItems; i++) {
            const green = getRandomItem(SEED_GREENS);
            const isBlend = Math.random() > 0.7;
            const pName = isBlend ? SEED_RECIPES[0].name : green.name;
            const size = Math.random() > 0.8 ? 1000 : 250;
            const qty = getRandomInt(1, 5);
            const price = size === 250 ? getRandomInt(250, 350) : getRandomInt(800, 1100);
            const cogs = size === 250 ? 120 : 450; // Tahmini maliyet

            items.push({ sku: `SKU-${getRandomInt(100,999)}`, productName: pName, brand: 'Edition', packSize: size, quantity: qty });
            totalAmount += price * qty;
            totalCOGS += cogs * qty;

            // Stoktan düş (Inventory Move)
            const itemId = `Edition-${pName}-${size}`;
            inventoryMovements.push({
                id: `MOV-SALE-${saleId}-${i}`, date: dateStr, itemType: 'FinishedProduct', itemId,
                qtyDelta: -qty, uom: 'qty', reason: 'Sale', sourceType: 'Sale', sourceId: saleId,
                unitCost: cogs, totalCost: cogs * qty, status: 'Active'
            });
            updateStock(itemId, -qty);
        }

        // Order
        orders.push({
            id: orderId, customerId: customer.id, customerName: customer.name, createDate: dateStr,
            status: 'Shipped', shipDate: dateStr, linkedSaleId: saleId, totalQuantity: items.reduce((a,b)=>a+b.quantity,0),
            totalAmount, items
        });

        // Sale
        sales.push({
            id: saleId, orderId, customerId: customer.id, customerName: customer.name, date: dateStr,
            items, totalAmount, status: 'Active'
        });

        // Ledger: Gelir
        ledgerEntries.push({
            id: `LED-SALE-${saleId}`, date: dateStr, partyId: customer.id, categoryId: 'CAT-003',
            direction: 'Credit', amount: totalAmount, currency: 'TRY', sourceType: 'Sale', sourceId: saleId, status: 'Active',
            note: `Satış: #${orderId}`
        });

        // Ledger: COGS
        ledgerEntries.push({
            id: `LED-COGS-${saleId}`, date: dateStr, partyId: undefined, categoryId: 'CAT-COGS',
            direction: 'Debit', amount: totalCOGS, currency: 'TRY', sourceType: 'Sale', sourceId: saleId, status: 'Active',
            note: `Maliyet: #${orderId}`
        });
    }

    // 4. ÖDEMELER (Haftada 1-2 kez)
    // Tedarikçiye ödeme (Outbound)
    if (Math.random() > 0.9 && !isWeekend) {
        const supplier = getRandomItem(SEED_PARTIES.filter(p => p.type === 'Supplier'));
        const amount = getRandomInt(5000, 20000);
        const payId = `PAY-OUT-${dateStr}-${getRandomInt(10,99)}`;
        
        payments.push({
            id: payId, date: dateStr, partyId: supplier.id, type: 'Outbound', method: 'Bank',
            amount, currency: 'TRY', status: 'Active', note: 'Fatura ödemesi'
        });
        
        ledgerEntries.push({
            id: `LED-PAY-${payId}`, date: dateStr, partyId: supplier.id, categoryId: 'CAT-006',
            direction: 'Debit', amount, currency: 'TRY', sourceType: 'Payment', sourceId: payId, status: 'Active',
            note: 'Tedarikçi Ödemesi'
        });
    }

    // Müşteriden Tahsilat (Inbound)
    if (Math.random() > 0.85 && !isWeekend) {
        const customer = getRandomItem(SEED_PARTIES.filter(p => p.type === 'Customer'));
        const amount = getRandomInt(1000, 5000);
        const payId = `PAY-IN-${dateStr}-${getRandomInt(10,99)}`;
        
        payments.push({
            id: payId, date: dateStr, partyId: customer.id, type: 'Inbound', method: 'Card',
            amount, currency: 'TRY', status: 'Active', note: 'Kredi Kartı Tahsilat'
        });
        
        ledgerEntries.push({
            id: `LED-PAY-${payId}`, date: dateStr, partyId: customer.id, categoryId: 'CAT-006',
            direction: 'Credit', amount, currency: 'TRY', sourceType: 'Payment', sourceId: payId, status: 'Active',
            note: 'Müşteri Ödemesi'
        });
    }

    // Bir sonraki gün
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Final Stok Durumlarını Güncelle (GreenCoffee & Packaging)
  // Simülasyon sonunda kalan bakiye stokları context state'ine yazmak için
  const finalGreenCoffees = SEED_GREENS.map(g => ({
      ...g, stockKg: getStock(g.id) > 0 ? getStock(g.id) : 0
  }));
  
  const finalPackaging = SEED_PACKAGING.map(p => ({
      ...p, stockQuantity: getStock(p.id) > 0 ? getStock(p.id) : 0
  }));

  // Roast Stocklar (Yapay olarak biraz ekleyelim, üretimden kalanlar)
  roastStocks = [
      { id: 'RST-BRA', name: 'Brazil Roast', roastLevel: 'Medium', stockKg: 12.5, roastDate: '2025-12-14', sourceGreenId: 'GC-001', unitCost: 350 },
      { id: 'RST-ETH', name: 'Ethiopia Roast', roastLevel: 'Light', stockKg: 5.0, roastDate: '2025-12-15', sourceGreenId: 'GC-002', unitCost: 520 },
  ];

  // Sıralamaları Tersine Çevir (En yeni en üstte)
  return {
    greenCoffees: finalGreenCoffees,
    roastStocks,
    recipes: SEED_RECIPES,
    packagingItems: finalPackaging,
    productionLogs: productionLogs.reverse(),
    orders: orders.reverse(),
    sales: sales.reverse(),
    quotes: quotes,
    purchases: purchases.reverse(),
    settings: { 
        companyName: 'Edition Coffee Roastery', currency: 'TRY', 
        thresholds: { greenCoffee: { critical: 50, low: 100 }, roastStock: { critical: 10, low: 20 }, bag: { critical: 100, low: 300 }, label: { critical: 200, low: 500 }, box: { critical: 50, low: 100 }, finishedProduct: { critical: 20, low: 50 } } 
    },
    parties: SEED_PARTIES,
    categories: SEED_CATEGORIES,
    ledgerEntries: ledgerEntries.reverse(),
    payments: payments.reverse(),
    inventoryMovements: inventoryMovements.reverse(),
  };
};