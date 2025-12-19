import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUp, Linkedin, Twitter, Facebook } from 'lucide-react';
import { FOOTER_LINKS, CONTACT_INFO, SITE_META } from "../constants/content";

export default function Footer() {
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const safeLinkPath = (link, groupName) => {
    const hasValidPath = link && typeof link.path === 'string' && link.path.trim() !== '';
    if (!hasValidPath) {
      console.warn(`[Footer] ${groupName} link path eksik veya geçersiz:`, link);
    }
    return hasValidPath ? link.path : '#';
  };

  return (
    <footer className="bg-page py-20 mt-auto border-t border-border-gray" role="contentinfo">
      <div className="container mx-auto px-6">
        
        {/* ÜST KISIM: GRID YAPISI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 1. Kolon: Marka ve Vizyon */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-2xl tracking-tighter text-dark hover:opacity-80 transition-opacity" aria-label="Ana Sayfaya Dön">
              {SITE_META.siteName}
            </Link>
            <p className="text-[0.9rem] leading-relaxed text-muted max-w-[300px]">
              Üretim ve servis işletmelerinin görünmeyen ama en güçlü operasyonel altyapısı.
            </p>
            
            {/* Sosyal Medya İkonları */}
            <div className="flex gap-4 mt-2">
              {[
                { icon: Twitter, label: 'Twitter', key: SITE_META.social.twitter, url: 'twitter.com' },
                { icon: Linkedin, label: 'LinkedIn', key: SITE_META.social.linkedin, url: 'linkedin.com/company' },
                { icon: Facebook, label: 'Facebook', key: SITE_META.social.facebook, url: 'facebook.com' }
              ].map((social) => (
                <a 
                  key={social.label}
                  href={`https://${social.url}/${social.key}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.label}
                  className="text-light hover:text-dark transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Kolon: Ürünler */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[0.85rem] font-semibold uppercase tracking-widest text-dark">Ürünler</h4>
            <nav aria-label="Ürün Linkleri">
              <ul className="flex flex-col gap-3">
                {FOOTER_LINKS.products.map((link, index) => (
                  <li key={link?.path || index}>
                    <Link to={safeLinkPath(link, 'products')} className="text-[0.9rem] text-muted hover:text-dark transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* 3. Kolon: Kurumsal */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[0.85rem] font-semibold uppercase tracking-widest text-dark">Kurumsal</h4>
            <nav aria-label="Kurumsal Linkler">
              <ul className="flex flex-col gap-3">
                {FOOTER_LINKS.corporate.map((link, index) => (
                  <li key={link?.path || index}>
                    <Link to={safeLinkPath(link, 'corporate')} className="text-[0.9rem] text-muted hover:text-dark transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* 4. Kolon: İletişim Bilgileri */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[0.85rem] font-semibold uppercase tracking-widest text-dark">Bize Ulaşın</h4>
            <address className="not-italic">
              <ul className="flex flex-col gap-4">
                <li>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-center gap-2 text-[0.9rem] text-muted hover:text-dark transition-colors"
                  >
                    <Mail size={16} /> {CONTACT_INFO.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT_INFO.phoneRaw}`}
                    className="flex items-center gap-2 text-[0.9rem] text-muted hover:text-dark transition-colors"
                  >
                    <Phone size={16} /> {CONTACT_INFO.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2 text-[0.9rem] text-muted">
                  <MapPin size={16} className="mt-1 shrink-0" /> 
                  <span>{CONTACT_INFO.address.full}</span>
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* ALT KISIM: TELİF VE YASAL */}
        <div className="mt-16 pt-8 border-t border-border-gray flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[0.85rem] text-light order-2 md:order-1">
            &copy; {currentYear} {SITE_META.siteName}. Tüm hakları saklıdır.
          </div>

          <div className="flex items-center gap-8 order-1 md:order-2">
            <nav aria-label="Yasal Linkler">
              <ul className="flex gap-6">
                {FOOTER_LINKS.legal.map((link, index) => (
                  <li key={link?.path || index}>
                    <Link
                      to={safeLinkPath(link, 'legal')}
                      className="text-[0.85rem] text-light hover:text-dark transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}