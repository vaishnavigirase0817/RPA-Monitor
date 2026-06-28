import { forwardRef } from 'react';

const Card = forwardRef(({
  children,
  className = '',
  hover = false,
  padding = 'default',
  onClick,
  role,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  // We use card-enterprise from CSS which provides default padding (24px).
  // These options allow overriding padding for specific cases (like tables).
  const paddingStyle = padding === 'none' ? 'p-0' : padding === 'sm' ? 'p-[var(--space-2)]' : '';

  return (
    <div
      ref={ref}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); } } : undefined}
      className={`
        card-enterprise
        ${paddingStyle}
        ${hover ? 'hover-lift cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
export default Card;
