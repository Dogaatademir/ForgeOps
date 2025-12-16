import { useState, useMemo } from 'react';
import { Truck, ShoppingCart, Plus, CheckCircle2, AlertTriangle, ArrowRight, Ban, UserPlus, Coins, TrendingUp, TrendingDown, Trash2, Calculator, Receipt, Info, ChefHat, RefreshCw, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Modal } from '../components/Modal';
import type { Order } from '../context/StoreContext';

// --- TİPLER ---
interface OrderItemRow {
  sku: string; 
  quantity: number;
}

interface SimulatorRow {
  id: string;
  type: 'Product' | 'Recipe';
  productId?: string;
  recipeId?: string;
  packSize?: number; 
  bagId?: string;
  frontLabelId?: string;
  backLabelId?: string;
  quantity: number;
}

export const OrdersPage = () => {
  const { 
    orders, sales, addOrder, shipOrder, cancelOrder, voidSale,
    packagingItems, parties, addParty,
    inventoryMovements, recipes, roastStocks
  } = useStore();

  // Tab: 'Orders' = Bekleyen Siparişler, 'Sales' = Tamamlanan Satışlar/Sevkler
  const [activeTab, setActiveTab] = useState<'Orders' | 'Sales'>('Orders');

  // --- STOK VE MALİYET HESAPLAMALARI (C1: Via Movements) ---
  const { inventoryMap, availableInventory } = useMemo(() => {
    const inventory: Record<string, { 
      id: string; name: string; brand: string; size: number; current: number;
      averageUnitCost: number; totalProducedCost: number; totalProducedCount: number;
    }> = {};

    const finishedMovements = inventoryMovements.filter(m => m.itemType === 'FinishedProduct' && m.status === 'Active');

    finishedMovements.forEach(move => {
        const key = move.itemId; 
        const parts = key.split('-');
        if(parts.length < 3) return;
        const brand = parts[0];
        const packSize = parseInt(parts[parts.length - 1]);
        const productName = parts.slice(1, parts.length - 1).join('-');

        if (!inventory[key]) {
             inventory[key] = { 
                 id: key, name: productName, brand: brand, size: packSize, current: 0, 
                 averageUnitCost: 0, totalProducedCost: 0, totalProducedCount: 0 
            };
        }

        inventory[key].current += move.qtyDelta;

        if (move.reason === 'Production' && move.qtyDelta > 0) {
            const cost = move.totalCost ? move.totalCost : (move.unitCost || 0) * move.qtyDelta;
            inventory[key].totalProducedCost += cost;
            inventory[key].totalProducedCount += move.qtyDelta;
        }
    });

    Object.values(inventory).forEach(item => {
        if (item.totalProducedCount > 0) item.averageUnitCost = item.totalProducedCost / item.totalProducedCount;
    });

    return { inventoryMap: inventory, availableInventory: Object.values(inventory).filter(i => i.current > 0 || i.totalProducedCount > 0) };
  }, [inventoryMovements]);

  // --- FİLTRELER (AMBALAJLAR - SİMÜLATÖR İÇİN) ---
  const bags = useMemo(() => packagingItems.filter(p => p.category === 'Bag'), [packagingItems]);
  const frontLabels = useMemo(() => packagingItems.filter(p => p.category === 'Label' && p.labelType === 'Front'), [packagingItems]);
  const backLabels = useMemo(() => packagingItems.filter(p => p.category === 'Label' && p.labelType === 'Back'), [packagingItems]);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isShipmentModalOpen, setIsShipmentModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Form States (Sipariş)
  const [customerId, setCustomerId] = useState(''); 
  const [newCustomerName, setNewCustomerName] = useState('');
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [deliveryDate, setDeliveryDate] = useState(''); 
  const [totalAmount, setTotalAmount] = useState<number>(0); 
  const [note, setNote] = useState('');
  const [rows, setRows] = useState<OrderItemRow[]>([{ sku: '', quantity: 1 }]);

  // Form States (Simülatör)
  const [simRows, setSimRows] = useState<SimulatorRow[]>([
    { id: '1', type: 'Product', quantity: 1 }
  ]);
  const [simTotalOffer, setSimTotalOffer] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(0);
  
  const customers = parties.filter(p => (p.type === 'Customer' || p.type === 'Both') && p.status === 'Active');

  // --- YARDIMCI FONKSİYONLAR ---
  function getOrderStockStatus(order: Order) {
    let totalMissing = 0;
    order.items.forEach(item => {
      const key = `${item.brand}-${item.productName}-${item.packSize}`;
      const stock = inventoryMap[key]?.current ?? 0;
      const missing = item.quantity - stock;
      if (missing > 0) totalMissing += missing;
    });
    return { totalMissing, allInStock: totalMissing === 0 };
  }

  function calculateFinancials(items: any[], totalRevenue: number) {
      let totalCost = 0;
      items.forEach(item => {
          const key = `${item.brand}-${item.productName}-${item.packSize}`;
          const unitCost = inventoryMap[key]?.averageUnitCost || 0;
          totalCost += (unitCost * item.quantity);
      });
      const revenue = totalRevenue || 0;
      const profit = revenue - totalCost;
      return { totalCost, revenue, profit };
  }

  // --- SİMÜLATÖR MANTIĞI ---
  const calculateRowCost = (row: SimulatorRow) => {
    let unitCost = 0;

    if (row.type === 'Product' && row.productId) {
        // Hazır ürün seçildiyse mevcut stok maliyetini kullan
        const product = availableInventory.find(p => p.id === row.productId);
        if (product) unitCost = product.averageUnitCost;
    } 
    else if (row.type === 'Recipe' && row.recipeId && row.packSize) {
        // Reçete seçildiyse: Kahve + Ambalaj maliyeti hesapla
        
        // 1. Kahve Maliyeti
        let coffeeCostPerKg = 0;
        const recipe = recipes.find(r => r.id === row.recipeId);
        if (recipe) {
            recipe.ingredients.forEach(ing => {
                const roast = roastStocks.find(r => r.id === ing.roastId);
                if (roast && roast.unitCost) {
                    coffeeCostPerKg += (roast.unitCost * (ing.ratio / 100));
                }
            });
        }
        const coffeeCost = coffeeCostPerKg * (row.packSize / 1000);

        // 2. Ambalaj Maliyeti
        let packCost = 0;
        const getCost = (id?: string) => packagingItems.find(p => p.id === id)?.averageCost || 0;
        packCost += getCost(row.bagId);
        packCost += getCost(row.frontLabelId);
        packCost += getCost(row.backLabelId);

        unitCost = coffeeCost + packCost;
    }
    return unitCost;
  };

  const calculatedSimData = useMemo(() => {
    let totalRowCost = 0;
    simRows.forEach(row => {
        const unitCost = calculateRowCost(row);
        totalRowCost += (unitCost * row.quantity);
    });
    
    // Toplam Maliyet = Ürün Maliyetleri + Nakliye
    const totalCost = totalRowCost + shippingCost;
    
    const profit = simTotalOffer - totalCost;
    const margin = simTotalOffer > 0 ? (profit / simTotalOffer) * 100 : 0;
    
    return { totalCost, profit, margin };
  }, [simRows, simTotalOffer, shippingCost, availableInventory, recipes, roastStocks, packagingItems]);

  const filterByPackSize = (items: typeof packagingItems, packSize?: number) => {
    if (!packSize) return items;
    return items.filter(i => 
      i.variant === 'Genel' || 
      i.variant?.includes(packSize.toString())
    );
  };

  // --- HANDLERS (Sipariş & Müşteri) ---
  const addRow = () => setRows([...rows, { sku: '', quantity: 1 }]);
  const removeRow = (index: number) => { if (rows.length > 1) { const newRows = [...rows]; newRows.splice(index, 1); setRows(newRows); } };
  const updateRow = (index: number, field: keyof OrderItemRow, value: any) => { const newRows = [...rows]; newRows[index] = { ...newRows[index], [field]: value }; setRows(newRows); };

  const handleCreateCustomer = () => {
    if(!newCustomerName) return alert("Müşteri adı giriniz.");
    addParty({
        id: `PRT-${Date.now()}`,
        type: 'Customer',
        name: newCustomerName,
        status: 'Active'
    });
    setIsCustomerModalOpen(false);
    setNewCustomerName('');
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return alert("Müşteri seçiniz.");

    const items = rows.map(row => {
      const product = availableInventory.find(p => p.id === row.sku);
      if (!product) return null;
      return { sku: row.sku, productName: product.name, brand: product.brand, packSize: product.size, quantity: row.quantity };
    }).filter(i => i !== null) as any[];

    if (items.length === 0) return alert("Ürün seçiniz.");

    addOrder({
      id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
      customerId: customer.id,
      customerName: customer.name,
      createDate: orderDate, 
      deliveryDate: deliveryDate || undefined, 
      totalAmount: totalAmount,
      status: 'Pending', 
      items, 
      note, 
      totalQuantity: items.reduce((sum, i) => sum + i.quantity, 0)
    });
    
    setCustomerId(''); setTotalAmount(0); setRows([{ sku: '', quantity: 1 }]); setNote(''); setOrderDate(new Date().toISOString().split('T')[0]);
    setIsOrderModalOpen(false);
  };

  const handleCancelOrder = (id: string) => {
      if(window.confirm("Bu sipariş kalıcı olarak İPTAL edilecek. Onaylıyor musunuz?")) {
          cancelOrder(id, "Kullanıcı tarafından iptal edildi.");
      }
  };

  const handleVoidSale = (id: string) => {
      if(window.confirm("Bu Satış İşlemi İADE alınacak (Stoklar geri yüklenir, Gelir iptal edilir). Onaylıyor musunuz?")) {
          voidSale(id, "Kullanıcı tarafından iade alındı.");
      }
  };

  // --- HANDLERS (Simülatör) ---
  const addSimRow = () => setSimRows([...simRows, { id: Date.now().toString(), type: 'Product', quantity: 1 }]);
  const removeSimRow = (index: number) => { const newRows = [...simRows]; newRows.splice(index, 1); setSimRows(newRows); };
  const updateSimRow = (index: number, field: keyof SimulatorRow, value: any) => { 
      const newRows = [...simRows]; 
      newRows[index] = { ...newRows[index], [field]: value };
      
      // Tip değişirse temizlik yap
      if (field === 'type') {
          newRows[index].productId = '';
          newRows[index].recipeId = '';
          newRows[index].packSize = 250; // default
          newRows[index].bagId = '';
          newRows[index].frontLabelId = '';
          newRows[index].backLabelId = '';
      }
      setSimRows(newRows); 
  };
  
  const resetSimForm = () => { 
      setSimRows([{ id: '1', type: 'Product', quantity: 1 }]); 
      setSimTotalOffer(0);
      setShippingCost(0);
  };

  const openShipmentModal = (order: Order) => { setSelectedOrder(order); setIsShipmentModalOpen(true); };
  
  const confirmShipment = () => {
    if (!selectedOrder) return;
    const status = getOrderStockStatus(selectedOrder);
    if (!status.allInStock) return alert(`Yetersiz stok! ${status.totalMissing} paket eksik.`);
    shipOrder(selectedOrder.id, new Date().toISOString().split('T')[0]);
    setIsShipmentModalOpen(false); setSelectedOrder(null);
  };

  // Listeleri Hazırla
  const pendingOrders = orders.filter(o => o.status === 'Pending').sort((a,b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
  const activeSales = sales.filter(s => s.status === 'Active').sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatCurrency = (amount: number) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-4xl font-light tracking-tight text-neutral-900">SİPARİŞ & SEVKİYAT</h1>
              <p className="text-neutral-500 mt-1 font-light">Müşteri siparişleri ve gerçekleşen satışlar</p>
            </div>
            <div className="flex gap-3">
                <button onClick={() => {resetSimForm(); setIsCalculatorOpen(true);}} className="flex items-center justify-center gap-2 bg-white border border-neutral-300 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-400 hover:text-neutral-900 px-6 py-4 transition-all font-medium tracking-wide">
                    <Calculator size={18} strokeWidth={1.5} /> <span>FİYAT SİMÜLATÖRÜ</span>
                </button>
                <button onClick={() => { setIsOrderModalOpen(true);}} className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-4 transition-all font-light tracking-wide">
                    <Plus size={18} strokeWidth={1.5} /> <span>YENİ SİPARİŞ</span>
                </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="flex border-b border-neutral-200">
          <button onClick={() => setActiveTab('Orders')} className={`px-8 py-4 text-sm font-medium tracking-wide transition-colors border-b-2 ${activeTab === 'Orders' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-400 hover:text-neutral-600'}`}>
            BEKLEYEN ({pendingOrders.length})
          </button>
          <button onClick={() => setActiveTab('Sales')} className={`px-8 py-4 text-sm font-medium tracking-wide transition-colors border-b-2 ${activeTab === 'Sales' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-400 hover:text-neutral-600'}`}>
            TAMAMLANAN SATIŞLAR
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* --- VIEW: ORDERS (Bekleyenler) --- */}
          {activeTab === 'Orders' && pendingOrders.map(order => {
            const stockStatus = getOrderStockStatus(order);
            const financials = calculateFinancials(order.items, order.totalAmount || 0);

            return (
              <div key={order.id} className="bg-white p-6 border border-neutral-200 hover:border-neutral-400 transition-colors flex flex-col justify-between group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 rounded-full bg-amber-50 text-amber-600">
                      <ShoppingCart size={20} strokeWidth={1.5}/>
                    </div>
                    <div>
                      <h3 className="text-lg font-normal text-neutral-900 leading-tight">{order.customerName}</h3>
                      <div className="text-xs text-neutral-400 font-light mt-1 flex flex-col gap-0.5">
                          <span>Sipariş Tarihi: {new Date(order.createDate).toLocaleDateString('tr-TR')}</span>
                          {order.deliveryDate && <span className="text-neutral-600">Teslim: {new Date(order.deliveryDate).toLocaleDateString('tr-TR')}</span>}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleCancelOrder(order.id)} className="text-neutral-300 hover:text-red-500 transition-colors p-1" title="Siparişi İptal Et">
                      <Ban size={18}/>
                  </button>
                </div>

                <div className="mb-3">
                    {stockStatus.allInStock ? 
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide px-3 py-1 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle2 size={14} /> Hazır – Sevk Edilebilir</span> : 
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide px-3 py-1 rounded-sm bg-red-50 text-red-700 border border-red-200"><AlertTriangle size={14} /> Stok Yetersiz ({stockStatus.totalMissing} eksik)</span>
                    }
                </div>

                <div className="flex-1 bg-neutral-50 p-4 mb-4 border border-neutral-100 space-y-3">
                  {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm items-center">
                        <div className="flex-1"><span className="font-medium text-neutral-700">{item.productName}</span><div className="text-xs text-neutral-400">{item.brand} · {item.packSize}g</div></div>
                        <span className="font-light text-neutral-900 whitespace-nowrap">x {item.quantity}</span>
                      </div>
                  ))}
                  {order.note && <div className="pt-2 mt-2 border-t border-neutral-200 text-xs text-neutral-500 italic">Not: {order.note}</div>}
                </div>

                <div className="mb-4 pt-3 border-t border-neutral-100 grid grid-cols-2 gap-4">
                    <div><span className="text-[10px] uppercase text-neutral-400 tracking-wider block">Sipariş Tutarı</span><span className="text-sm font-medium text-neutral-900 flex items-center gap-1"><Coins size={14} className="text-neutral-400"/> {formatCurrency(financials.revenue)}</span></div>
                    <div className="text-right"><span className="text-[10px] uppercase text-neutral-400 tracking-wider block">Tahmini Kar</span><div className={`text-sm font-medium flex items-center justify-end gap-1 ${financials.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{financials.profit >= 0 ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}{formatCurrency(financials.profit)}</div></div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                  <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Top. {order.totalQuantity} Paket</div>
                  <button onClick={() => openShipmentModal(order)} className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 text-sm font-light hover:bg-neutral-800 transition-colors">SEVK ET <ArrowRight size={14}/></button>
                </div>
              </div>
            );
          })}

          {/* --- VIEW: SALES (Tamamlanan) --- */}
          {activeTab === 'Sales' && activeSales.map(sale => {
            const financials = calculateFinancials(sale.items, sale.totalAmount);
            return (
                <div key={sale.id} className="bg-white p-6 border border-neutral-200 flex flex-col justify-between group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-50 to-transparent pointer-events-none"></div>
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 p-2 rounded-full bg-green-50 text-green-700"><Receipt size={20} strokeWidth={1.5}/></div>
                            <div>
                                <h3 className="text-lg font-normal text-neutral-900 leading-tight">{sale.customerName}</h3>
                                <div className="text-xs text-neutral-400 font-light mt-1 flex flex-col gap-0.5">
                                    <span className="font-medium text-neutral-600">Belge No: {sale.id}</span>
                                    <span>Tarih: {new Date(sale.date).toLocaleDateString('tr-TR')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-neutral-50 p-4 mb-4 border border-neutral-100 space-y-2 opacity-80 hover:opacity-100 transition-opacity">
                        {sale.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm items-center">
                                <span className="text-neutral-600">{item.productName} <span className="text-xs text-neutral-400">({item.packSize}g)</span></span>
                                <span className="font-medium text-neutral-900">x {item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mb-4 pt-3 border-t border-neutral-100 grid grid-cols-2 gap-4">
                        <div><span className="text-[10px] uppercase text-neutral-400 tracking-wider block">Satış Tutarı</span><span className="text-sm font-medium text-neutral-900">{formatCurrency(sale.totalAmount)}</span></div>
                        <div className="text-right"><span className="text-[10px] uppercase text-neutral-400 tracking-wider block">Gerçekleşen Kar</span><span className={`text-sm font-medium ${financials.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(financials.profit)}</span></div>
                    </div>

                    <div className="flex justify-end pt-2 border-t border-neutral-100">
                        <button onClick={() => handleVoidSale(sale.id)} className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded transition-colors">
                            <Ban size={14}/> <span>SATIŞI İPTAL ET / İADE AL</span>
                        </button>
                    </div>
                </div>
            )
          })}

          {((activeTab === 'Orders' && pendingOrders.length === 0) || (activeTab === 'Sales' && activeSales.length === 0)) && (
             <div className="col-span-full py-24 text-center border-2 border-dashed border-neutral-200 rounded-lg">
                 <p className="text-neutral-400 font-light">Kayıt bulunamadı.</p>
             </div>
          )}
        </div>
      </div>

      {/* --- SİPARİŞ OLUŞTURMA MODALI --- */}
      <Modal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} title="YENİ SİPARİŞ OLUŞTUR">
        <form onSubmit={handleCreateOrder} className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Müşteri</label>
                <button type="button" onClick={() => setIsCustomerModalOpen(true)} className="text-xs text-neutral-900 underline flex items-center gap-1"><UserPlus size={12}/> Yeni Ekle</button>
            </div>
            <select required value={customerId} onChange={e => setCustomerId(e.target.value)} className="w-full px-4 py-3 bg-white border border-neutral-300 outline-none font-light appearance-none focus:border-neutral-900">
                <option value="">Seçiniz...</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div><label className="block text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wider">Sipariş Tutarı (TL)</label><input required type="number" min="0" value={totalAmount} onChange={e => setTotalAmount(Number(e.target.value))} className="w-full px-4 py-3 border border-neutral-300 outline-none font-light focus:border-neutral-900" placeholder="0.00"/></div>
             <div><label className="block text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wider">Sipariş Tarihi</label><input required type="date" value={orderDate} onChange={e => setOrderDate(e.target.value)} className="w-full px-4 py-3 border border-neutral-300 outline-none font-light focus:border-neutral-900"/></div>
          </div>
          <div><label className="block text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wider">Teslim Tarihi</label><input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} className="w-full px-4 py-3 border border-neutral-300 outline-none font-light focus:border-neutral-900"/></div>

          <div>
            <div className="flex justify-between items-end mb-2"><label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider">Hazır Ürünler</label><button type="button" onClick={addRow} className="text-xs text-neutral-900 font-medium hover:underline">+ Satır Ekle</button></div>
            <div className="space-y-3 bg-neutral-50 p-4 border border-neutral-200 max-h-[250px] overflow-y-auto">
              {rows.map((row, index) => {
                const product = availableInventory.find((p: any) => p.id === row.sku);
                const isStockLow = product && row.quantity > product.current;
                return (
                  <div key={index} className="flex gap-2 items-start group">
                    <div className="flex-1">
                      <select required value={row.sku} onChange={e => updateRow(index, 'sku', e.target.value)} className={`w-full px-3 py-2 text-sm border outline-none font-light focus:border-neutral-900 bg-white ${isStockLow ? 'border-red-300 text-red-600' : 'border-neutral-300'}`}>
                        <option value="">Ürün Seçiniz...</option>
                        {availableInventory.map((p: any) => (<option key={p.id} value={p.id}>{p.name} ({p.brand} - {p.size}g) - Stok: {p.current}</option>))}
                      </select>
                      {isStockLow && <span className="text-[10px] text-red-500 flex items-center gap-1 mt-1"><AlertTriangle size={10}/> Yetersiz Stok (Max: {product.current})</span>}
                    </div>
                    <input type="number" min="1" required value={row.quantity} onChange={e => updateRow(index, 'quantity', Number(e.target.value))} className="w-20 px-3 py-2 text-sm border border-neutral-300 outline-none font-light focus:border-neutral-900 text-center" placeholder="Adet"/>
                    {rows.length > 1 && <button type="button" onClick={() => removeRow(index)} className="p-2 text-neutral-400 hover:text-red-600"><Trash2 size={16}/></button>}
                  </div>
                );
              })}
            </div>
          </div>
          <div><label className="block text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wider">Not</label><input type="text" value={note} onChange={e => setNote(e.target.value)} className="w-full px-4 py-3 border border-neutral-300 outline-none font-light focus:border-neutral-900"/></div>
          <button type="submit" className="w-full bg-neutral-900 text-white py-4 font-light tracking-wide hover:bg-neutral-800 transition-all active:scale-[0.99]">SİPARİŞİ OLUŞTUR</button>
        </form>
      </Modal>

      {/* MÜŞTERİ EKLEME MODALI */}
      <Modal isOpen={isCustomerModalOpen} onClose={() => setIsCustomerModalOpen(false)} title="YENİ MÜŞTERİ EKLE">
            <div className="space-y-4">
            <div><label className="block text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wider">Müşteri Adı</label><input type="text" value={newCustomerName} onChange={e => setNewCustomerName(e.target.value)} className="w-full px-4 py-3 border border-neutral-300 outline-none focus:border-neutral-900" /></div>
            <button onClick={handleCreateCustomer} className="w-full bg-neutral-900 text-white py-3 font-light hover:bg-neutral-800">KAYDET</button>
        </div>
      </Modal>

      {/* Shipment Modal */}
      {selectedOrder && (
        <Modal isOpen={isShipmentModalOpen} onClose={() => setIsShipmentModalOpen(false)} title="SEVKİYAT ONAYI">
          <div className="space-y-4">
              <div className="p-6 bg-neutral-50 border border-neutral-200 text-center">
                  <p className="text-sm text-neutral-600">Bu işlem sonucunda stoktan <strong>{selectedOrder.totalQuantity} adet</strong> ürün düşülecek ve finansal satış kaydı oluşturulacaktır.</p>
                  <div className="mt-4 font-medium text-lg text-neutral-900">{selectedOrder.customerName}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setIsShipmentModalOpen(false)} className="py-3 border border-neutral-300 text-neutral-600 hover:bg-neutral-50 transition-colors">İptal</button>
                  <button onClick={confirmShipment} className="py-3 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors">Onayla ve Sevk Et</button>
              </div>
          </div>
        </Modal>
      )}

      {/* FİYAT & KAR SİMÜLATÖRÜ MODALI */}
      <Modal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} title="FİYAT & KAR SİMÜLATÖRÜ">
        <div className="space-y-6">
            <div className="bg-neutral-50 p-4 border border-neutral-200 text-neutral-600 text-xs font-light flex gap-2 items-start">
                <Info size={16} className="shrink-0 text-neutral-400 mt-0.5"/>
                <span>Bu araç, stoktaki hazır ürünleri VEYA reçetelere dayalı potansiyel üretim maliyetlerini hesaplar. Kayıt edilmez.</span>
            </div>

            {/* Ürün Seçimi Listesi */}
            <div className="max-h-[400px] overflow-y-auto space-y-4 pr-1">
                {simRows.map((row, index) => {
                    const rowUnitCost = calculateRowCost(row);
                    return (
                    <div key={row.id} className="bg-white border border-neutral-200 p-5 relative group shadow-sm">
                        <button onClick={() => removeSimRow(index)} className="absolute top-2 right-2 text-neutral-300 hover:text-red-500 transition-colors"><X size={16}/></button>
                        
                        {/* 1. Tip Seçimi */}
                        <div className="flex gap-4 mb-4 border-b border-neutral-100 pb-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" checked={row.type === 'Product'} onChange={() => updateSimRow(index, 'type', 'Product')} className="accent-neutral-900 w-4 h-4"/>
                                <span className="text-xs font-medium uppercase tracking-wide">Hazır Ürün (Stok)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" checked={row.type === 'Recipe'} onChange={() => updateSimRow(index, 'type', 'Recipe')} className="accent-neutral-900 w-4 h-4"/>
                                <span className="text-xs font-medium uppercase tracking-wide">Reçete (Üretim)</span>
                            </label>
                        </div>

                        {/* 2. İçerik Seçimi */}
                        {row.type === 'Product' ? (
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="block text-[10px] text-neutral-400 mb-1 uppercase">Hazır Ürün Seçimi</label>
                                    <select value={row.productId} onChange={e => updateSimRow(index, 'productId', e.target.value)} className="w-full px-3 py-2 text-sm border border-neutral-300 outline-none font-light focus:border-neutral-900 bg-neutral-50">
                                        <option value="">Seçiniz...</option>
                                        {availableInventory.map(p => (<option key={p.id} value={p.id}>{p.name} ({p.size}g)</option>))}
                                    </select>
                                </div>
                                <div className="w-24">
                                    <label className="block text-[10px] text-neutral-400 mb-1 uppercase">Adet</label>
                                    <input type="number" min="1" value={row.quantity} onChange={e => updateSimRow(index, 'quantity', Number(e.target.value))} className="w-full px-3 py-2 text-sm border border-neutral-300 outline-none text-center font-light focus:border-neutral-900"/>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-12 gap-3">
                                    <div className="col-span-6">
                                        <label className="block text-[10px] text-neutral-400 mb-1 uppercase flex items-center gap-1"><ChefHat size={10}/> Reçete</label>
                                        <select value={row.recipeId} onChange={e => updateSimRow(index, 'recipeId', e.target.value)} className="w-full px-3 py-2 text-sm border border-neutral-300 outline-none font-light focus:border-neutral-900 bg-neutral-50">
                                            <option value="">Seçiniz...</option>
                                            {recipes.map(r => (<option key={r.id} value={r.id}>{r.name}</option>))}
                                        </select>
                                    </div>
                                    <div className="col-span-3">
                                        <label className="block text-[10px] text-neutral-400 mb-1 uppercase">Paket</label>
                                        <select value={row.packSize} onChange={e => updateSimRow(index, 'packSize', Number(e.target.value))} className="w-full px-3 py-2 text-sm border border-neutral-300 outline-none font-light focus:border-neutral-900 bg-neutral-50">
                                            <option value={250}>250g</option>
                                            <option value={1000}>1000g</option>
                                        </select>
                                    </div>
                                    <div className="col-span-3">
                                        <label className="block text-[10px] text-neutral-400 mb-1 uppercase">Adet</label>
                                        <input type="number" min="1" value={row.quantity} onChange={e => updateSimRow(index, 'quantity', Number(e.target.value))} className="w-full px-3 py-2 text-sm border border-neutral-300 outline-none text-center font-light focus:border-neutral-900"/>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-3 p-4 bg-neutral-50/50 border border-neutral-100">
                                    <div>
                                        <label className="block text-[10px] text-neutral-400 mb-1 uppercase">Torba</label>
                                        <select value={row.bagId} onChange={e => updateSimRow(index, 'bagId', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-neutral-200 outline-none bg-white focus:border-neutral-400">
                                            <option value="">Seçiniz...</option>
                                            {filterByPackSize(bags, row.packSize).map(b => <option key={b.id} value={b.id}>{b.name} ({b.color})</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-neutral-400 mb-1 uppercase">Ön Etiket</label>
                                        <select value={row.frontLabelId} onChange={e => updateSimRow(index, 'frontLabelId', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-neutral-200 outline-none bg-white focus:border-neutral-400">
                                            <option value="">Yok</option>
                                            {filterByPackSize(frontLabels, row.packSize).map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-neutral-400 mb-1 uppercase">Arka Etiket</label>
                                        <select value={row.backLabelId} onChange={e => updateSimRow(index, 'backLabelId', e.target.value)} className="w-full px-2 py-1.5 text-xs border border-neutral-200 outline-none bg-white focus:border-neutral-400">
                                            <option value="">Yok</option>
                                            {filterByPackSize(backLabels, row.packSize).map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Satır Özeti */}
                        <div className="mt-3 pt-2 border-t border-neutral-50 flex justify-end">
                            <span className="text-xs text-neutral-500 font-light flex items-center gap-1">
                                Birim Mal: <span className="font-medium text-neutral-900">{formatCurrency(rowUnitCost)}</span>
                            </span>
                        </div>
                    </div>
                )})}
                
                <button onClick={addSimRow} className="w-full py-4 border border-dashed border-neutral-300 text-neutral-500 text-xs font-medium uppercase tracking-wide hover:border-neutral-900 hover:text-neutral-900 transition-colors">
                    + Satır Ekle
                </button>
            </div>

            {/* Nakliye ve Toplam Teklif Tutarı (ALT ALTA) */}
            <div className="space-y-4">
                 <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wider flex items-center gap-1"><Truck size={14}/> Nakliye / Kargo (TL)</label>
                    <input type="number" min="0" value={shippingCost} onChange={e => setShippingCost(Number(e.target.value))} className="w-full px-4 py-4 border border-neutral-300 outline-none text-lg font-light focus:border-neutral-900" placeholder="0.00"/>
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wider">Teklif Edilecek Toplam Tutar (TL)</label>
                    <input type="number" min="0" value={simTotalOffer} onChange={e => setSimTotalOffer(Number(e.target.value))} className="w-full px-4 py-4 border border-neutral-300 outline-none text-lg font-light focus:border-neutral-900" placeholder="0.00"/>
                 </div>
            </div>

            {/* CANLI HESAPLAMA KARTI */}
            <div className={`p-6 border flex items-center justify-between transition-colors ${calculatedSimData.profit >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${calculatedSimData.profit >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{calculatedSimData.profit >= 0 ? <TrendingUp size={24}/> : <TrendingDown size={24}/>}</div>
                    <div>
                        <div className={`text-sm font-bold uppercase tracking-wide ${calculatedSimData.profit >= 0 ? 'text-green-800' : 'text-red-800'}`}>{calculatedSimData.profit >= 0 ? 'NET KAR' : 'NET ZARAR'}</div>
                        <div className="text-xs text-neutral-500 font-light mt-1">Toplam Maliyet: {formatCurrency(calculatedSimData.totalCost)}</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className={`text-3xl font-light tracking-tight ${calculatedSimData.profit >= 0 ? 'text-green-700' : 'text-red-700'}`}>{formatCurrency(calculatedSimData.profit)}</div>
                    <div className={`text-sm font-medium mt-1 ${calculatedSimData.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{calculatedSimData.profit >= 0 ? '+' : ''}%{calculatedSimData.margin.toFixed(1)} Marj</div>
                </div>
            </div>

            <div className="flex justify-end">
                <button onClick={resetSimForm} className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 text-sm font-medium px-4 py-2"><RefreshCw size={14}/> Temizle</button>
            </div>
        </div>
      </Modal>
    </div>
  );
};