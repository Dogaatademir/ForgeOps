import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ArrowRightLeft, 
  Menu, 
  X, 
  Settings,
  PieChart,
  Scale 
} from 'lucide-react';

// Sayfa Bileşenleri
import OverviewPage from './pages/OverviewPage';
import HesaplarDemo from './pages/HesaplarDemo';
import KisilerDemo from './pages/KisilerDemo';
import IslemlerDemo from './pages/IslemlerDemo';
import BorcAlacakPage from './pages/BorcAlacakPage'; 
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import { DataProvider } from './context/DataContext';

interface SidebarItemProps {
  to: string;
  icon: any;
  label: string;
  onClick?: () => void;
}

const SidebarItem = ({ to, icon: Icon, label, onClick }: SidebarItemProps) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-4 transition-all duration-200 group ${
        isActive
          ? 'bg-neutral-900 text-white'
          : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
      }`
    }
  >
    <Icon size={20} className="shrink-0" strokeWidth={1.5} />
    <span className="font-light text-sm tracking-wide uppercase">{label}</span>
  </NavLink>
);

export default function App() {
  // NOT: Yönlendirme kodu kaldırıldı. Artık direkt açılacak.

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- GİRİŞ KONTROLÜ ---
  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  // --- ANA UYGULAMA ---
  return (
    <BrowserRouter basename="/craftops/aycaninsaat">
      <DataProvider>
        <div className="flex h-screen bg-neutral-50 font-sans overflow-hidden">
          
          {/* MOBILE OVERLAY */}
          {isSidebarOpen && (
            <div 
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-20 md:hidden transition-opacity"
            />
          )}

          {/* SIDEBAR */}
          <aside 
            className={`
              fixed md:relative z-30 h-full w-64 bg-white border-r border-neutral-200 flex flex-col transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}
          >
            <div className="p-8 border-b border-neutral-200 flex justify-between items-start">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-neutral-900 tracking-tight leading-none">
                    Aycan<br/>İnşaat
                </h1>
                <div className="mt-4 pt-3 border-t border-neutral-100 w-full">
                   <p className="text-[9px] text-neutral-400 font-medium tracking-wide">
                     Powered by <span className="text-neutral-600 font-bold">CraftOps</span>
                   </p>
                </div>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1 text-neutral-400 hover:bg-neutral-100">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
              <SidebarItem to="/" icon={LayoutDashboard} label="GENEL BAKIŞ" onClick={() => setIsSidebarOpen(false)} />
              <SidebarItem to="/borc-alacak" icon={Scale} label="BORÇ & ALACAK" onClick={() => setIsSidebarOpen(false)} />
              <SidebarItem to="/hesaplar" icon={PieChart} label="HESAPLAR" onClick={() => setIsSidebarOpen(false)} />
              <SidebarItem to="/kisiler" icon={Users} label="KİŞİLER" onClick={() => setIsSidebarOpen(false)} />
              <SidebarItem to="/islemler" icon={ArrowRightLeft} label="İŞLEMLER" onClick={() => setIsSidebarOpen(false)} />
            </nav>

            <div className="p-4 border-t border-neutral-200">
               <SidebarItem to="/settings" icon={Settings} label="AYARLAR" onClick={() => setIsSidebarOpen(false)} />
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            <header className="md:hidden bg-white border-b border-neutral-200 p-4 flex items-start justify-between shrink-0 z-10">
              <div className="flex items-start gap-3">
                 <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-neutral-600 hover:bg-neutral-100 transition-colors mt-1">
                   <Menu size={24} strokeWidth={1.5} />
                 </button>
                 <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-neutral-900 tracking-tight leading-none">
                    Aycan<br/>İnşaat
                </h1>
                <div className="mt-4 pt-3 border-t border-neutral-100 w-full">
                   <p className="text-[9px] text-neutral-400 font-medium tracking-wide">
                     Powered by <span className="text-neutral-600 font-bold">CraftOps</span>
                   </p>
                </div>  </div>
              </div>
            </header>

            <main className="flex-1 overflow-auto p-4 md:p-8">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<OverviewPage />} />
                  <Route path="/borc-alacak" element={<BorcAlacakPage />} />
                  <Route path="/hesaplar" element={<HesaplarDemo />} />
                  <Route path="/kisiler" element={<KisilerDemo />} />
                  <Route path="/islemler" element={<IslemlerDemo />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </DataProvider>
    </BrowserRouter>
  );
}