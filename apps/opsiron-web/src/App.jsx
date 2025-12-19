import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout & Common Components
import Layout from './components/Layout';
import Loading from './components/common/Loading';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy Loaded Pages (Ana Sayfalar)
const Home = lazy(() => import('./pages/Home'));
const CraftOps = lazy(() => import('./pages/CraftOps'));
const ServeOps = lazy(() => import('./pages/ServeOps'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Pricing = lazy(() => import('./pages/Pricing'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const KVKK = lazy(() => import('./pages/KVKK'));

import './App.css';

function App() {
  return (
    <>
      {/* Route değişiminde sayfa başı yap */}
      <ScrollToTop />
      
      {/* Sayfalar yüklenirken gösterilecek Loading bileşeni */}
      <Suspense fallback={<Loading variant="fullscreen" text="Opsiron Yükleniyor..." />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Ana Rotalar */}
            <Route index element={<Home />} />
            <Route path="craftops" element={<CraftOps />} />
            <Route path="serveops" element={<ServeOps />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="pricing" element={<Pricing />} />
            
            {/* Yasal Rotalar - YENİ */}
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="kvkk" element={<KVKK />} />
            
            {/* 404 Catch-All Route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;