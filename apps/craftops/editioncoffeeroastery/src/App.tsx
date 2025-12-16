// apps/craftops/editioncoffeeroastery/src/App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { GreenCoffeePage } from './pages/GreenCoffeePage';
import { RoastingPage } from './pages/RoastingPage';
import { PackagingPage } from './pages/PackagingPage';
import { ProductionPage } from './pages/ProductionPage';
import { OverviewPage } from './pages/OverviewPage';
import { FinishedProductPage } from './pages/FinishedProductPage';
import { OrdersPage } from './pages/OrdersPage';
import { PurchasesPage } from './pages/PurchasesPage';
import { SettingsPage } from './pages/Settings';
import { PaymentsPage } from './pages/PaymentsPage'; // YENİ
import { FinanceReportsPage } from './pages/FinanceReportsPage'; // YENİ
import LoginPage from './pages/LoginPage';
import { StoreProvider } from './context/StoreContext';

// ProtectedRoute: Sadece giriş yapmış kullanıcıları içeri alır
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    // Giriş yoksa Login sayfasına yönlendir
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <StoreProvider>
      <BrowserRouter basename="/craftops/editioncoffeeroastery">
        <Routes>
          {/* Login Sayfası (Korumasız, herkese açık) */}
          <Route path="/login" element={<LoginPage />} />

          {/* Ana Uygulama (Korumalı Alan) */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<OverviewPage />} />
            
            <Route path="purchases" element={<PurchasesPage />} /> 
            <Route path="green-coffee" element={<GreenCoffeePage />} />
            <Route path="packaging-materials" element={<PackagingPage />} />
            <Route path="finished-products" element={<FinishedProductPage />} />
            
            <Route path="roasting" element={<RoastingPage />} />
            <Route path="production" element={<ProductionPage />} />
            
            <Route path="orders" element={<OrdersPage />} />
            
            {/* YENİ FİNANS ROTALARI */}
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="finance-reports" element={<FinanceReportsPage />} />

            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;