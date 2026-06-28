import Card from '../ui/Card';

export default function SystemHealth({ health }) {
  const metrics = Object.entries(health);

  return (
    <Card>
      <h3 className="text-base font-semibold text-[var(--warm-gray-300)] mb-4">System Health</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {metrics.map(([key, metric]) => {
          const pct = (metric.value / metric.max) * 100;
          const statusColor = metric.status === 'critical'
            ? 'var(--error)'
            : metric.status === 'warning'
            ? 'var(--warning)'
            : 'var(--success)';

          return (
            <div key={key} className="relative">
              {/* Circular gauge */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    {/* Background ring */}
                    <circle
                      cx="18" cy="18" r="15"
                      fill="none"
                      stroke="var(--light-beige)"
                      strokeWidth="3"
                    />
                    {/* Value ring */}
                    <circle
                      cx="18" cy="18" r="15"
                      fill="none"
                      stroke={statusColor}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${pct * 0.942} 100`}
                      className="transition-all duration-700"
                    />
                  </svg>
                  {/* Center value */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-[var(--warm-gray-300)] tabular-nums">
                      {Math.round(pct)}%
                    </span>
                  </div>
                </div>

                <div className="text-center mt-2">
                  <p className="text-[10px] font-medium text-[var(--warm-gray-200)]">{metric.label}</p>
                  <p className="text-[10px] text-[var(--warm-gray-100)] tabular-nums">
                    {metric.value}{metric.unit} / {metric.max}{metric.unit}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
