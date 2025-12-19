import React from 'react';
import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

/**
 * Opsiron Loading Component
 * * Hem sayfa içi (inline) hem de tüm ekranı kaplayan (fullscreen) yükleme animasyonu.
 * * Lucide 'Loader2' ikonunu kullanır.
 */
// Fonksiyon girişi:
export default function Loading({ 
  variant = 'inline',
  size = 'md',
  text = null,
  className = '',
  style = {} // <-- Buraya style ekleyin
}) {


  // Boyutlandırma Map'i
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48
  };
  
  const iconSize = sizeMap[size] || 24;

  // Fullscreen Overlay Stilleri
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(4px)', // Modern blur efekti
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-main)',
  };

const inlineStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    color: 'var(--text-light)',
    width: '100%',
    // Hatalı props.style yerine sadece boş obje veya style parametresi kullanın
  };

  // Container Seçimi
  const containerStyle = variant === 'fullscreen' ? overlayStyle : inlineStyle;

  return (
    <div 
      role="status" 
      aria-live="polite" 
      className={`loading-container ${className}`} 
      style={containerStyle}
    >
      <Loader2 
        className="animate-spin" 
        size={iconSize} 
        style={{ 
          color: 'var(--text-main)', 
          animation: 'spin 1s linear infinite' // CSS'te yoksa diye garanti
        }} 
      />
      
      {text && (
        <span style={{ 
          marginTop: '0.8rem', 
          fontSize: '0.9rem', 
          fontWeight: 500,
          opacity: 0.8 
        }}>
          {text}
        </span>
      )}
      
      {/* Screen Reader Only Text */}
      <span className="sr-only" style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        border: 0
      }}>
        {text || 'Yükleniyor...'}
      </span>
    </div>
  );
}

Loading.propTypes = {
  variant: PropTypes.oneOf(['inline', 'fullscreen']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  text: PropTypes.string,
  className: PropTypes.string,
};