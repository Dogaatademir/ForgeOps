import React, { useEffect, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from "./common/SEO";
import Loading from "./common/Loading";

export default function Layout() {
  const location = useLocation();

  // Analytics Page View Tracking
  useEffect(() => {
    // Google Analytics 4 (GA4) entegrasyonu buraya gelecek.
    // Şimdilik console'a basıyoruz, production'da window.gtag(...) olacak.
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Page View Tracked: ${location.pathname}`);
    }
    
    // Opsiyonel: Her sayfa değişiminde focus'u resetle (A11y)
    // document.body.focus(); 
  }, [location]);

  return (
    <>
      {/* 1. Global SEO Fallback */}
      {/* Sayfalar kendi SEO'sunu tanımlamazsa buradaki default değerler geçerli olur */}
      <SEO />




      {/* 3. Navigation */}
      <Navbar />

      {/* 4. Main Content Area */}
      {/* Navbar fixed olduğu için üstten padding bırakıyoruz */}
      <main 
        id="main-content" 
        role="main" 
        style={{ 
          minHeight: '80vh', // Footer'ı aşağı itmek için
          paddingTop: '80px', // Navbar yüksekliği kadar boşluk (Sticky header için)
          position: 'relative'
        }}
      >
        {/* Route geçişlerinde içerik yüklenirken inline loading göster */}
        <Suspense fallback={
          <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loading variant="inline" size="lg" text="Yükleniyor..." />
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>

      {/* 5. Footer */}
      <Footer />
    </>
  );
}