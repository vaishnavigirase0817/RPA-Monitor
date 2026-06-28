import { useState, useMemo } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import SearchInput from '../components/ui/SearchInput';
import { LOG_ENTRIES } from '../data/mockData';

const levelStyles = {
  INFO: { bg: 'bg-blue-50', text: 'text-blue-700' },
  WARN: { bg: 'bg-amber-50', text: 'text-amber-700' },
  ERROR: { bg: 'bg-red-50', text: 'text-red-700' },
};

export default function Logs() {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');

  const filtered = useMemo(() => {
    return LOG_ENTRIES.filter(log => {
      const matchesSearch = !search || 
        log.message.toLowerCase().includes(search.toLowerCase()) ||
        log.source.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = levelFilter === 'All' || log.level === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [search, levelFilter]);

  const toolbar = (
    <div className="flex flex-col gap-[16px]">
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search logs..."
        className="w-full"
        aria-label="Search logs"
      />
      <div className="flex items-center justify-between">
        <div className="flex gap-1 p-0.5 rounded-lg bg-[var(--light-beige)]/60">
        {['All', 'INFO', 'WARN', 'ERROR'].map(level => (
          <button
            key={level}
            onClick={() => setLevelFilter(level)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              levelFilter === level ? 'bg-white text-[var(--primary-300)] shadow-sm' : 'text-[var(--warm-gray-200)]'
            }`}
            aria-pressed={levelFilter === level}
          >
            {level}
          </button>
        ))}
        </div>
        <span className="text-xs text-[var(--warm-gray-100)]">{filtered.length} entries</span>
      </div>
    </div>
  );

  return (
    <PageLayout
      title="Activity Logs"
      subtitle="System and bot activity audit trail"
      toolbar={toolbar}
      className="page-section-gap"
    >
      {/* Log entries */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table" aria-label="Activity logs">
            <thead>
              <tr className="border-b border-[var(--glass-border)]">
                <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-[var(--warm-gray-100)] w-[160px]" scope="col">Timestamp</th>
                <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-[var(--warm-gray-100)] w-[70px]" scope="col">Level</th>
                <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-[var(--warm-gray-100)] w-[90px]" scope="col">Source</th>
                <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-[var(--warm-gray-100)]" scope="col">Message</th>
                <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-[var(--warm-gray-100)] w-[200px]" scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, idx) => {
                const style = levelStyles[log.level] || levelStyles.INFO;
                return (
                  <tr
                    key={log.id}
                    className={`border-b border-[var(--glass-border)]/50 hover:bg-[var(--very-light-orange)]/50 transition-colors ${
                      idx % 2 === 0 ? '' : 'bg-[var(--soft-cream)]/30'
                    }`}
                  >
                    <td className="px-4 py-2.5 text-xs font-mono text-[var(--warm-gray-100)] tabular-nums">{log.timestamp}</td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${style.bg} ${style.text}`}>
                        {log.level}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-xs font-mono text-[var(--primary-300)]">{log.source}</td>
                    <td className="px-4 py-2.5 text-sm text-[var(--warm-gray-300)]">{log.message}</td>
                    <td className="px-4 py-2.5 text-xs text-[var(--warm-gray-100)]">{log.details}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-[var(--warm-gray-100)]">
            No log entries match your filters
          </div>
        )}
      </Card>
    </PageLayout>
  );
}
