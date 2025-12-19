import React from 'react';
import PropTypes from 'prop-types';

/**
 * Opsiron Card Component
 * İçerik gruplama, özellik listeleme ve interaktif alanlar için temel kapsayıcı.
 */
export default function Card({
  children,
  variant = 'default', // 'default' | 'bordered' | 'elevated' | 'flat'
  padding = 'md',      // 'none' | 'sm' | 'md' | 'lg'
  hoverable = false,   // true ise hover efektlerini açar
  className = '',
  onClick,
  as: Component = 'div', // Semantik HTML için ('article', 'section', 'li' vb.)
  ...props
}) {
  
  // Stil Sınıfları Mapping - App.css'teki değişkenleri kullanır
  const variants = {
    default: 'bg-card border border-border-gray shadow-sm',
    bordered: 'bg-transparent border border-border-gray',
    elevated: 'bg-card border border-border-gray shadow-xl',
    flat: 'bg-page border-transparent', 
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4', 
    md: 'p-8', // App.css'teki standart kart padding'i
    lg: 'p-10', 
  };

  // Base Class Oluşturma
  const baseClasses = 'relative h-full flex flex-col transition-all duration-200';
  const interactiveClasses = (hoverable || onClick) 
    ? 'cursor-pointer hover:border-light hover:-translate-y-1' 
    : 'cursor-default';
  
  const combinedClassName = `
    ${baseClasses} 
    ${variants[variant]} 
    ${paddings[padding]} 
    ${interactiveClasses} 
    ${className}
  `.trim();

  // Tıklanabilirlik ve Erişilebilirlik Ayarları
  const isInteractive = !!onClick;
  const a11yProps = isInteractive ? {
    role: 'button',
    tabIndex: 0,
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(e);
      }
    }
  } : {};

  return (
    <Component
      className={combinedClassName}
      onClick={onClick}
      {...a11yProps}
      {...props}
    >
      {children}
    </Component>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'bordered', 'elevated', 'flat']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  hoverable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  as: PropTypes.elementType,
};