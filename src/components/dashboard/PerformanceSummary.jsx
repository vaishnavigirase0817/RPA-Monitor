import { useState, memo } from 'react';
import Card from '../ui/Card';
import { PERFORMANCE_DATA } from '../../data/mockData';

const PerformanceSummary = memo(function PerformanceSummary() {
  const [view, setView] = useState('hourly');
  const data = view === 'hourly' ? PERFORMANCE_DATA.hourly : PERFORMANCE_DATA.daily;

  const maxTasks = Math.max(...data.map(d => d.tasks));

  return (
    <Card className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-[var(--warm-gray-300)]">Performance Overview</h3>
          <p className="text-xs text-[var(--warm-gray-100)] mt-0.5">Tasks processed over time</p>
        </div>
        <div className="flex gap-1 p-0.5 rounded-lg bg-[var(--light-beige)]/60">
          <button
            onClick={() => setView('hourly')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              view === 'hourly' ? 'bg-white text-[var(--primary-300)] shadow-sm' : 'text-[var(--warm-gray-200)]'
            }`}
            aria-pressed={view === 'hourly'}
          >
            Hourly
          </button>
          <button
            onClick={() => setView('daily')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              view === 'daily' ? 'bg-white text-[var(--primary-300)] shadow-sm' : 'text-[var(--warm-gray-200)]'
            }`}
            aria-pressed={view === 'daily'}
          >
            Daily
          </button>
        </div>
      </div>

      {/* CSS Bar Chart */}
      <div className="relative" role="img" aria-label="Performance bar chart">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-[var(--warm-gray-100)] tabular-nums pr-2">
          <span>{maxTasks.toLocaleString()}</span>
          <span>{Math.round(maxTasks / 2).toLocaleString()}</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-10">
          {/* Grid lines */}
          <div className="relative h-48">
            <div className="absolute inset-0 flex flex-col justify-between">
              <div className="border-t border-dashed border-[var(--primary-100)]/30" />
              <div className="border-t border-dashed border-[var(--primary-100)]/30" />
              <div className="border-t border-dashed border-[var(--primary-100)]/30" />
            </div>

            {/* Bars */}
            <div className="relative h-full flex items-end gap-2 sm:gap-3">
              {data.map((item, idx) => {
                const height = (item.tasks / maxTasks) * 100;
                const errorHeight = (item.errors / maxTasks) * 100;
                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center gap-1 group"
                  >
                    {/* Tooltip on hover */}
                    <div className="hidden group-hover:block absolute -top-8 bg-[var(--warm-gray-300)] text-white text-[10px] px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-10">
                      {item.tasks.toLocaleString()} tasks, {item.errors} errors
                    </div>

                    <div className="w-full relative" style={{ height: `${height}%` }}>
                      {/* Main bar */}
                      <div
                        className="absolute inset-0 rounded-t-md bg-gradient-to-t from-[var(--primary-300)] to-[var(--primary-200)] opacity-80 group-hover:opacity-100 transition-opacity"
                        style={{ animation: `progressFill 0.8s ease-out ${idx * 0.05}s both` }}
                      />
                      {/* Error overlay */}
                      {errorHeight > 0 && (
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-[var(--error)]/60 rounded-t-sm"
                          style={{ height: `${(item.errors / item.tasks) * 100}%` }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex gap-2 sm:gap-3 mt-2">
            {data.map((item, idx) => (
              <div key={idx} className="flex-1 text-center text-[10px] text-[var(--warm-gray-100)]">
                {item.hour || item.day}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-[10px] text-[var(--warm-gray-100)]">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-[var(--primary-300)] to-[var(--primary-200)]" />
          Tasks
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[var(--error)]/60" />
          Errors
        </span>
      </div>
    </Card>
  );
});

export default PerformanceSummary;
