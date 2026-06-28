export default function Avatar({ name, initials, size = 'md', status, className = '' }) {
  const sizes = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-11 h-11 text-sm',
    xl: 'w-14 h-14 text-base',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-amber-500',
  };

  const displayInitials = initials || (name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?');

  return (
    <div className={`relative inline-flex ${className}`}>
      <div
        className={`
          ${sizes[size]}
          rounded-full flex items-center justify-center
          bg-gradient-to-br from-[var(--primary-200)] to-[var(--primary-300)]
          text-white font-semibold
          shadow-sm
        `.trim()}
        role="img"
        aria-label={name || 'User avatar'}
      >
        {displayInitials}
      </div>
      {status && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${statusColors[status] || statusColors.offline}`}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}
