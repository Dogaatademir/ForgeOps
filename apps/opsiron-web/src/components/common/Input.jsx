import React, { forwardRef, useId } from 'react';
import { AlertCircle } from 'lucide-react';

const Input = forwardRef(({ label, name, type = 'text', error, icon: Icon, helperText, required, ...props }, ref) => {
  const inputId = useId();
  
  return (
    <div className="w-full mb-4">
      {label && (
        <label htmlFor={inputId} className={`block mb-2 text-[0.9rem] font-semibold ${error ? 'text-critical' : 'text-dark'}`}>
          {label} {required && <span className="text-critical">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-light pointer-events-none">
            <Icon size={18} />
          </div>
        )}

        <input
          id={inputId}
          type={type}
          ref={ref}
          className={`w-full p-4 bg-white border outline-none transition-colors text-[0.95rem] font-sans
            ${Icon ? 'pl-10' : 'pl-4'}
            ${error ? 'border-critical' : 'border-border-gray focus:border-dark'}
            ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          {...props}
        />

        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-critical">
            <AlertCircle size={18} />
          </div>
        )}
      </div>

      {(error || helperText) && (
        <p className={`mt-2 text-xs flex items-center gap-1 ${error ? 'text-critical' : 'text-light'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

export default Input;