// src/App.tsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout ve Provider
import Layout from './components/Layout'; // Dosya yolunu oluşturduğunuz yere göre ayarlayın
import { DataProvider } from './context/DataContext';

// Sayfa Bileşenleri
import OverviewPage from './pages/OverviewPage';
import HesaplarDemo from './pages/HesaplarDemo';
import KisilerDemo from './pages/KisilerDemo';
import IslemlerDemo from './pages/IslemlerDemo';
import BorcAlacakPage from './pages/BorcAlacakPage'; 
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // --- GİRİŞ KONTROLÜ ---
  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  // --- ANA UYGULAMA ---
  return (
    <BrowserRouter basename="/craftops/aycaninsaat">
      <DataProvider>
        <Routes>
          {/* Layout tüm sayfaları kapsayan ana kapsayıcıdır */}
          <Route element={<Layout />}>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/borc-alacak" element={<BorcAlacakPage />} />
            <Route path="/hesaplar" element={<HesaplarDemo />} />
            <Route path="/kisiler" element={<KisilerDemo />} />
            <Route path="/islemler" element={<IslemlerDemo />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}