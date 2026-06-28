import { useEffect, useRef, memo } from 'react';
import Card from '../ui/Card';

const typeStyles = {
  task_complete: { icon: '✓', color: 'text-green-600', bg: 'bg-green-50' },
  process_start: { icon: '▶', color: 'text-blue-600', bg: 'bg-blue-50' },
  process_complete: { icon: '✓', color: 'text-green-600', bg: 'bg-green-50' },
  error: { icon: '✕', color: 'text-red-600', bg: 'bg-red-50' },
  warning: { icon: '!', color: 'text-amber-600', bg: 'bg-amber-50' },
  bot_status: { icon: '⏸', color: 'text-gray-600', bg: 'bg-gray-100' },
};

const ActivityFeed = memo(function ActivityFeed({ events }) {
  const feedRef = useRef(null);

  // Auto-scroll to top on new events
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [events?.[0]?.id]);

  return (
    <Card padding="none" className="flex flex-col h-full">
      <div className="px-5 py-3 border-b border-[var(--glass-border)]">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-[var(--warm-gray-300)]">Activity Feed</h3>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[10px] text-[var(--warm-gray-100)]">Live</span>
          </div>
        </div>
      </div>

      <div
        ref={feedRef}
        className="flex-1 overflow-y-auto max-h-[360px]"
        role="log"
        aria-label="Live activity feed"
        aria-live="polite"
      >
        {events.map((event, idx) => {
          const style = typeStyles[event.type] || typeStyles.task_complete;
          return (
            <div
              key={event.id}
              className={`
                flex items-start gap-3 px-5 py-3 transition-colors hover:bg-[var(--very-light-orange)]/50
                ${idx < events.length - 1 ? 'border-b border-[var(--glass-border)]/50' : ''}
                ${idx === 0 ? 'animate-fade-in' : ''}
              `.trim()}
            >
              {/* Icon */}
              <div className={`w-6 h-6 rounded-full ${style.bg} flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${style.color}`}>
                {style.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--warm-gray-300)]">{event.message}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-medium text-[var(--primary-300)]">{event.bot}</span>
                  <span className="text-[10px] text-[var(--warm-gray-100)]">{event.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
});

export default ActivityFeed;
