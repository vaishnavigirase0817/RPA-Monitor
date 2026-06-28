import { forwardRef } from 'react';

const variants = {
  primary: 'bg-gradient-to-r from-[var(--primary-300)] to-[var(--primary-200)] text-white shadow-md hover:shadow-lg border-transparent glass-shine',
  secondary: 'bg-[var(--glass-bg)] backdrop-blur-md border-[var(--glass-border)] text-[var(--warm-gray-300)] shadow-sm hover:bg-white/80',
  ghost: 'bg-transparent border-transparent text-[var(--warm-gray-200)] hover:bg-[var(--very-light-orange)] hover:text-[var(--warm-gray-300)]',
  danger: 'bg-white border-[var(--error)] text-[var(--error)] hover:bg-[var(--error-light)]',
  success: 'bg-[var(--success)] text-white hover:opacity-90 shadow-sm',
};

const standardSize = 'h-10 px-4 text-[14px] rounded-[12px]';
const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        transition-all duration-200 cursor-pointer
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-200)]
        disabled:opacity-50 disabled:cursor-not-allowed
        press-effect btn-ripple
        ${variants[variant]}
        ${standardSize}
        ${className}
      `.trim()}
      {...props}
    >
      {loading && (
        <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" role="status" aria-label="Loading" />
      )}
      {!loading && icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {!loading && icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
