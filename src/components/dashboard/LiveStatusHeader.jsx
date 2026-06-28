import Badge from '../ui/Badge';

export default function LiveStatusHeader({ bots }) {
  const running = bots.filter(b => b.status === 'Running').length;
  const idle = bots.filter(b => b.status === 'Idle').length;
  const error = bots.filter(b => b.status === 'Error').length;
  const paused = bots.filter(b => b.status === 'Paused').length;
  const totalTasks = bots.reduce((sum, b) => sum + b.tasksCompleted, 0);

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <section
      className="glass rounded-xl px-5 py-3 flex flex-wrap items-center justify-between gap-4"
      aria-label="Live system status"
      role="status"
    >
      {/* Left: Live indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-sm font-semibold text-[var(--warm-gray-300)]">Live Monitor</span>
        </div>
        <span className="text-xs text-[var(--warm-gray-100)] tabular-nums">{timeStr}</span>
      </div>

      {/* Center: Status counts */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Badge status="Running" dot pulse size="sm">{running} Running</Badge>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge status="Idle" dot size="sm">{idle} Idle</Badge>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge status="Paused" dot size="sm">{paused} Paused</Badge>
        </div>
        {error > 0 && (
          <div className="flex items-center gap-1.5">
            <Badge status="Error" dot pulse size="sm">{error} Error</Badge>
          </div>
        )}
      </div>

      {/* Right: Total tasks */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-[var(--warm-gray-100)]">Total Tasks:</span>
        <span className="font-bold text-[var(--warm-gray-300)] tabular-nums">{totalTasks.toLocaleString()}</span>
      </div>
    </section>
  );
}
