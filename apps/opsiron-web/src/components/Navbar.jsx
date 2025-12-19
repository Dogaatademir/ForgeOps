import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from "./common/Button";
import { NAVIGATION, SITE_META } from "../constants/content";
import logoImg from "../assets/opsiron.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] h-20 transition-all duration-300 border-b
      ${isScrolled ? 'bg-white/95 backdrop-blur-md border-border-gray' : 'bg-transparent border-transparent'}`}>
      
      <div className="container mx-auto px-6 h-full flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 text-4xl tracking-tighter">
          <img src={logoImg} alt="Logo" className="h-15 w-auto object-contain" />
          <span className="font-normal">{SITE_META.siteName}</span>
        </Link>
        
        {/* DESKTOP */}
        <div className="hidden lg:flex items-center gap-8">
          {NAVIGATION.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`text-[1rem] font-medium transition-colors hover:text-dark 
                ${location.pathname === item.path ? 'text-dark border-b-2 border-dark' : 'text-muted'}`}
            >
              {item.label}
            </Link>
          ))}
       
        </div>

        {/* MOBILE TOGGLE */}
        <button className="lg:hidden text-dark" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 top-20 bg-white z-[90] p-8 flex flex-col gap-6 transition-transform duration-300 lg:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {NAVIGATION.map((item) => (
          <Link key={item.path} to={item.path} className="text-xl font-medium border-b border-page pb-4" onClick={() => setIsOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Button to="/contact" variant="primary" className="mt-4" onClick={() => setIsOpen(false)}>Hemen Başla</Button>
      </div>
    </nav>
  );
}