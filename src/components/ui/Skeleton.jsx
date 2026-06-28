export default function Skeleton({ width, height = '1rem', rounded = 'md', className = '' }) {
  const roundedMap = {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  return (
    <div
      className={`animate-shimmer bg-[var(--light-beige)] ${roundedMap[rounded]} ${className}`}
      style={{ width, height }}
      role="status"
      aria-label="Loading"
    />
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`glass rounded-xl p-5 space-y-3 ${className}`}>
      <Skeleton width="40%" height="0.75rem" />
      <Skeleton width="60%" height="1.75rem" />
      <Skeleton width="80%" height="0.625rem" />
    </div>
  );
}
