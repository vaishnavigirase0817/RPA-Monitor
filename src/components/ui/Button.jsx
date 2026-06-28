import { forwardRef } from 'react';

const variants = {
  primary: 'bg-[var(--primary-300)] text-white hover:bg-[var(--primary-200)] shadow-sm',
  secondary: 'bg-[var(--light-beige)] text-[var(--warm-gray-300)] hover:bg-[var(--primary-100)] border border-[var(--glass-border)]',
  ghost: 'bg-transparent text-[var(--warm-gray-200)] hover:bg-[var(--very-light-orange)] hover:text-[var(--warm-gray-300)]',
  danger: 'bg-[var(--error)] text-white hover:opacity-90 shadow-sm',
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
