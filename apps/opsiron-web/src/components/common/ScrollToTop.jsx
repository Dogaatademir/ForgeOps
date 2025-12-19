import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const location = useLocation(); // Önce objeyi al

  useEffect(() => {
    // Sadece location varsa ve pathname varsa işlem yap
    if (location && location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}