export default function Toggle({ checked, onChange, label, description, id, disabled = false, className = '' }) {
  const toggleId = id || `toggle-${label?.replace(/\s/g, '-').toLowerCase()}`;

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <label htmlFor={toggleId} className="text-sm font-medium text-[var(--warm-gray-300)] cursor-pointer">
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-[var(--warm-gray-100)] mt-0.5">{description}</p>
          )}
        </div>
      )}

      <button
        id={toggleId}
        role="switch"
        aria-checked={checked}
        aria-label={label || 'Toggle'}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full
          transition-colors duration-200 cursor-pointer
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-200)]
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${checked ? 'bg-[var(--primary-300)]' : 'bg-[var(--warm-gray-100)]/50'}
        `.trim()}
      >
        <span
          className={`
            inline-block h-4 w-4 rounded-full bg-white shadow-sm
            transition-transform duration-200
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `.trim()}
        />
      </button>
    </div>
  );
}
