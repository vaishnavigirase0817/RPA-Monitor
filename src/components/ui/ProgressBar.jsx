import { useEffect, useRef, useState } from 'react';

export default function ProgressBar({
  value = 0,
  max = 100,
  size = 'md',
  color,
  showLabel = false,
  animated = true,
  className = '',
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const barRef = useRef(null);

  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  useEffect(() => {
    if (animated && barRef.current) {
      barRef.current.animate(
        [{ width: `${displayValue}%` }, { width: `${pct}%` }],
        { duration: 600, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' }
      );
    }
    setDisplayValue(pct);
  }, [pct]);

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const getColor = () => {
    if (color) return color;
    if (pct >= 90) return 'var(--success)';
    if (pct >= 60) return 'var(--primary-300)';
    if (pct >= 30) return 'var(--primary-200)';
    return 'var(--primary-100)';
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className={`flex-1 rounded-full bg-[var(--light-beige)] overflow-hidden ${sizes[size]}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`Progress: ${Math.round(pct)}%`}
      >
        <div
          ref={barRef}
          className={`${sizes[size]} rounded-full transition-all duration-500`}
          style={{
            width: animated ? undefined : `${pct}%`,
            backgroundColor: getColor(),
          }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-[var(--warm-gray-200)] tabular-nums min-w-[3ch] text-right">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}
