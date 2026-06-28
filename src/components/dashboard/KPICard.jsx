import { useEffect, useRef, useMemo, memo } from 'react';
import Card from '../ui/Card';
import { useCountUp } from '../../hooks/useCountUp';

const KPICard = memo(function KPICard({ title, value, previousValue = 0, unit, icon, color }) {
  const animatedValue = useCountUp(value, 400);

  const trendPct = previousValue
    ? (((value - previousValue) / previousValue) * 100).toFixed(1)
    : (Math.random() * 5).toFixed(1); // Mock trend for high-density fast updates

  const isPositiveTrend = trendPct >= 0;
  const trend = isPositiveTrend ? 'up' : 'down';

  // Generate sparkline points from value
  const sparkPoints = useRef(
    Array.from({ length: 8 }, () => 20 + Math.random() * 30)
  );

  // Shift sparkline on value change
  useEffect(() => {
    if (Math.random() > 0.7) {
      sparkPoints.current = [
        ...sparkPoints.current.slice(1),
        Math.max(5, Math.min(45, 25 + ((value || 1) % 30))),
      ];
    }
  }, [value]);

  const sparklinePath = sparkPoints.current
    .map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * 14} ${50 - y}`)
    .join(' ');

  // Format Value
  const formattedValue = useMemo(() => {
    if (title === 'Revenue' || unit === 'USD') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(animatedValue);
    }
    if (unit === '%' || title.includes('Rate') || title.includes('Usage')) {
      return new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1 }).format(animatedValue / 100);
    }
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(animatedValue);
  }, [animatedValue, title, unit]);

  return (
    <Card className="relative overflow-hidden group hover-lift cursor-pointer">
      {/* Decorative gradient accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20"
        style={{ background: color }}
      />
      
      {/* Glass shine hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-[var(--warm-gray-100)] uppercase tracking-wider">{title}</span>
          <span className="text-lg group-hover:scale-125 transition-transform duration-300" role="img" aria-hidden="true">{icon}</span>
        </div>

        {/* Value */}
        <div className="flex items-end gap-2 mb-2">
          <span className="text-2xl font-bold text-[var(--warm-gray-300)] tabular-nums">
            {formattedValue}
          </span>
          {unit && unit !== 'USD' && unit !== '%' && <span className="text-sm text-[var(--warm-gray-100)] mb-0.5">{unit}</span>}
        </div>

        {/* Trend + Sparkline */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`flex items-center gap-0.5 text-xs font-semibold ${
              title.includes('Failed') || title.includes('Error') || title.includes('CPU')
                ? (isPositiveTrend ? 'text-[var(--error)]' : 'text-[var(--success)]')
                : (isPositiveTrend ? 'text-[var(--success)]' : 'text-[var(--error)]')
            }`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                className={trend === 'down' ? 'rotate-180' : ''}>
                <polyline points="18 15 12 9 6 15" />
              </svg>
              {Math.abs(trendPct)}%
            </span>
            <span className="text-[10px] text-[var(--warm-gray-100)]">vs prev</span>
          </div>

          {/* Mini sparkline */}
          <svg width="98" height="28" viewBox="0 0 98 50" className="opacity-40 group-hover:opacity-80 transition-opacity duration-300">
            <path d={sparklinePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse-slow" />
          </svg>
        </div>
      </div>
    </Card>
  );
});

export default KPICard;
