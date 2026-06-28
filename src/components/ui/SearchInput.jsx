import { useState, useRef, forwardRef } from 'react';

const SearchInput = forwardRef(({
  placeholder = 'Search...',
  value: controlledValue,
  onChange,
  onFocus,
  onBlur,
  size = 'md',
  className = '',
  'aria-label': ariaLabel = 'Search',
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = ref || useRef(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e) => {
    const val = e.target.value;
    if (controlledValue === undefined) setInternalValue(val);
    onChange?.(val, e);
  };

  const sizes = {
    sm: 'h-8 px-3 pl-8 text-xs',
    md: 'h-10 px-4 pl-10 text-[14px]',
    lg: 'h-12 px-5 pl-11 text-base',
  };

  const iconSizes = {
    sm: 'left-2.5 w-3.5 h-3.5',
    md: 'left-3 w-4 h-4',
    lg: 'left-3.5 w-5 h-5',
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search icon */}
      <svg
        className={`absolute top-1/2 -translate-y-1/2 ${iconSizes[size]} transition-colors ${
          isFocused ? 'text-[var(--primary-300)]' : 'text-[var(--warm-gray-100)]'
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>

      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={handleChange}
        onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
        onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={`
          w-full rounded-[12px]
          bg-white shadow-sm
          border border-[var(--glass-border)]
          text-[var(--warm-gray-300)]
          placeholder:text-[var(--warm-gray-100)]
          transition-all duration-200
          focus:border-[var(--primary-200)] focus:ring-2 focus:ring-[var(--primary-100)]
          focus:outline-none
          ${sizes[size]}
        `.trim()}
        {...props}
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => {
            if (controlledValue === undefined) setInternalValue('');
            onChange?.('');
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-[var(--primary-100)]/50 text-[var(--warm-gray-100)] transition-colors"
          aria-label="Clear search"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
});

SearchInput.displayName = 'SearchInput';
export default SearchInput;
