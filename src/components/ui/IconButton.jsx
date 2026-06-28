import { forwardRef } from 'react';
import Tooltip from './Tooltip';

const IconButton = forwardRef(({
  icon,
  onClick,
  tooltip,
  size = 'md',
  variant = 'ghost',
  badge,
  className = '',
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const sizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const variants = {
    ghost: 'hover:bg-[var(--very-light-orange)] text-[var(--warm-gray-200)] hover:text-[var(--warm-gray-300)]',
    filled: 'bg-[var(--light-beige)] hover:bg-[var(--primary-100)] text-[var(--warm-gray-300)]',
    primary: 'bg-[var(--primary-300)] hover:bg-[var(--primary-200)] text-white',
  };

  const button = (
    <button
      ref={ref}
      onClick={onClick}
      aria-label={ariaLabel || tooltip}
      className={`
        relative inline-flex items-center justify-center rounded-lg
        transition-all duration-200
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-200)]
        press-effect
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `.trim()}
      {...props}
    >
      {icon}
      {badge !== undefined && badge !== null && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center text-[10px] font-bold text-white bg-[var(--error)] rounded-full">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  );

  if (tooltip) {
    return <Tooltip content={tooltip}>{button}</Tooltip>;
  }

  return button;
});

IconButton.displayName = 'IconButton';
export default IconButton;
