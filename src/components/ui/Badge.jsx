const statusColors = {
  Running: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  Warning: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  Failed: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  Stopped: { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' },
  Completed: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  success: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  warning: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  error: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  info: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  healthy: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  critical: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};

const priorityColors = {
  Critical: { bg: 'bg-red-50', text: 'text-red-700' },
  High: { bg: 'bg-orange-50', text: 'text-orange-700' },
  Medium: { bg: 'bg-blue-50', text: 'text-blue-700' },
  Low: { bg: 'bg-gray-100', text: 'text-gray-600' },
};

const sizes = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export default function Badge({
  children,
  status,
  priority,
  size = 'md',
  dot = false,
  pulse = false,
  className = '',
}) {
  const colors = status
    ? statusColors[status] || statusColors.info
    : priority
    ? priorityColors[priority] || priorityColors.Medium
    : { bg: 'bg-[var(--very-light-orange)]', text: 'text-[var(--warm-gray-300)]' };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-semibold rounded-full whitespace-nowrap
        ${colors.bg} ${colors.text}
        ${sizes[size]}
        ${className}
      `.trim()}
      role="status"
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot || ''} ${pulse ? 'animate-pulse-dot' : ''}`} />
      )}
      {children || status || priority}
    </span>
  );
}
