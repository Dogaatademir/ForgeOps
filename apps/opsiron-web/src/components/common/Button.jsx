import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  icon: Icon,
  iconPosition = 'left',
  to,
  href,
  className = '',
  onClick,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center gap-3 font-medium uppercase tracking-widest transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border outline-none';
  
  const variants = {
    primary: 'bg-dark text-white border-transparent hover:bg-dark-hover hover:-translate-y-px',
    outline: 'bg-transparent border-border-gray text-dark hover:bg-white hover:border-dark',
    white: 'bg-white text-dark border-transparent hover:bg-gray-100',
    ghost: 'bg-transparent border-transparent text-muted hover:text-dark'
  };

  const sizes = {
    sm: 'px-4 py-2 text-[0.65rem]',
    md: 'px-8 py-4 text-[0.75rem]',
    lg: 'px-10 py-5 text-[0.85rem]'
  };

  const combinedClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  const content = (
    <>
      {isLoading ? <Loader2 className="animate-spin" size={18} /> : (Icon && iconPosition === 'left' && <Icon size={18} />)}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === 'right' && <Icon size={18} />}
    </>
  );

  if (to && !isDisabled) return <Link to={to} className={combinedClasses} {...props}>{content}</Link>;
  if (href && !isDisabled) return <a href={href} className={combinedClasses} target="_blank" rel="noopener" {...props}>{content}</a>;

  return (
    <button onClick={onClick} disabled={isDisabled || isLoading} className={combinedClasses} {...props}>
      {content}
    </button>
  );
}