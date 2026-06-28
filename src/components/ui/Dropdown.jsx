import { useState, useRef, useEffect } from 'react';
import { useClickOutside } from '../../hooks/useKeyboardNav';

export default function Dropdown({
  trigger,
  children,
  align = 'right',
  className = '',
  'aria-label': ariaLabel,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useClickOutside(ref, () => setIsOpen(false));

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div ref={ref} className={`relative inline-flex ${className}`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsOpen(!isOpen); } }}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={ariaLabel}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`
            absolute top-full mt-2 z-40 min-w-[200px]
            glass-strong rounded-xl py-1
            animate-slide-down
            ${alignClasses[align]}
          `.trim()}
          role="menu"
        >
          {typeof children === 'function' ? children(() => setIsOpen(false)) : children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ children, onClick, icon, danger = false, className = '' }) {
  return (
    <button
      onClick={onClick}
      role="menuitem"
      className={`
        w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left
        transition-colors
        ${danger
          ? 'text-[var(--error)] hover:bg-red-50'
          : 'text-[var(--warm-gray-300)] hover:bg-[var(--very-light-orange)]'
        }
        ${className}
      `.trim()}
    >
      {icon && <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  );
}
