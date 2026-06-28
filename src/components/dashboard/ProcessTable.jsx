import { useState, useMemo, useRef, memo } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import SearchInput from '../ui/SearchInput';
import InspectorPanel from './InspectorPanel';
import { useToast } from '../ui/ToastContext';

// Multi-field fuzzy search logic with highlighting support
function fuzzyMatch(text, query) {
  if (!query) return true;
  return String(text).toLowerCase().includes(query.toLowerCase());
}

function Highlight({ text, query }) {
  if (!query) return <>{text}</>;
  const parts = String(text).split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() 
          ? <mark key={i} className="bg-[var(--primary-100)] text-[var(--warm-gray-300)] rounded-sm px-0.5">{part}</mark> 
          : part
      )}
    </>
  );
}

const ProcessTable = memo(function ProcessTable({ processes, isPaused }) {
  const [search, setSearch] = useState('');
  const [selectedProcess, setSelectedProcess] = useState(null);
  const { addToast } = useToast();
  
  // Multi-column sorting state: array of { field, dir: 'asc'|'desc' }
  const [sortRules, setSortRules] = useState([{ field: 'id', dir: 'asc' }]);
  
  // Dropdown filter state
  const [filters, setFilters] = useState({
    status: 'All',
    department: 'All',
    priority: 'All',
    botType: 'All',
    region: 'All'
  });

  const filterOptions = {
    status: ['All', 'Running', 'Warning', 'Failed', 'Stopped', 'Completed'],
    department: ['All', 'Finance', 'HR', 'IT', 'Operations', 'Sales'],
    priority: ['All', 'Low', 'Medium', 'High', 'Critical'],
    botType: ['All', 'Attended', 'Unattended', 'Hybrid'],
    region: ['All', 'NA', 'EMEA', 'APAC', 'LATAM']
  };

  // Virtualization state
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const rowHeight = 60; // Fixed row height
  const viewportHeight = 600; // Fixed viewport height
  const overscan = 5;

  // Filter & Search
  const filtered = useMemo(() => {
    return processes.filter(p => {
      // Filters
      if (filters.status !== 'All' && p.status !== filters.status) return false;
      if (filters.department !== 'All' && p.department !== filters.department) return false;
      if (filters.priority !== 'All' && p.priority !== filters.priority) return false;
      if (filters.botType !== 'All' && p.botType !== filters.botType) return false;
      if (filters.region !== 'All' && p.region !== filters.region) return false;

      // Fuzzy Search across multiple fields
      if (search) {
        return fuzzyMatch(p.id, search) || 
               fuzzyMatch(p.name, search) || 
               fuzzyMatch(p.department, search) || 
               fuzzyMatch(p.region, search);
      }
      return true;
    });
  }, [processes, filters, search]);

  // Stable Multi-column Sort
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      for (const rule of sortRules) {
        const aVal = a[rule.field];
        const bVal = b[rule.field];
        let comparison = 0;
        
        if (typeof aVal === 'number') {
          comparison = aVal - bVal;
        } else {
          comparison = String(aVal).localeCompare(String(bVal));
        }

        if (comparison !== 0) {
          return rule.dir === 'asc' ? comparison : -comparison;
        }
      }
      return 0; // Stable
    });
  }, [filtered, sortRules]);

  // Virtualization calculations
  const totalRows = sorted.length;
  const innerHeight = totalRows * rowHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const endIndex = Math.min(totalRows, Math.ceil((scrollTop + viewportHeight) / rowHeight) + overscan);
  const visibleRows = sorted.slice(startIndex, endIndex);

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  const handleSort = (field) => {
    setSortRules(prev => {
      const existingIdx = prev.findIndex(r => r.field === field);
      if (existingIdx >= 0) {
        const next = [...prev];
        if (next[existingIdx].dir === 'asc') {
          next[existingIdx].dir = 'desc'; // Toggle dir
        } else {
          next.splice(existingIdx, 1); // Remove if already desc (3rd click removes)
        }
        return next.length ? next : [{ field: 'id', dir: 'asc' }];
      }
      // Add new sort rule (multi-column)
      return [...prev, { field, dir: 'asc' }];
    });
  };

  const getSortDir = (field) => sortRules.find(r => r.field === field)?.dir;

  const handleRowClick = (proc) => {
    if (!isPaused) {
      addToast({
        title: 'Action Denied',
        message: 'Pause the live stream to inspect telemetry details.',
        type: 'warning',
      });
      return;
    }
    setSelectedProcess(proc);
  };

  const handleRowKeyDown = (e, proc) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRowClick(proc);
    }
  };

  const SortIcon = ({ field }) => {
    const dir = getSortDir(field);
    const orderIdx = sortRules.findIndex(r => r.field === field);
    if (!dir) return <span className="w-4" />;
    return (
      <div className="flex items-center text-[var(--primary-300)]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
          className={`transition-transform ${dir === 'desc' ? 'rotate-180' : ''}`}>
          <polyline points="18 15 12 9 6 15" />
        </svg>
        {sortRules.length > 1 && <span className="text-[9px] ml-0.5">{orderIdx + 1}</span>}
      </div>
    );
  };

  const columns = [
    { id: 'id', label: 'ID', width: '90px' },
    { id: 'name', label: 'Process Name', width: '220px' },
    { id: 'status', label: 'Status', width: '100px' },
    { id: 'priority', label: 'Priority', width: '100px' },
    { id: 'progress', label: 'Progress', width: '130px' },
    { id: 'records', label: 'Records', width: '90px' },
    { id: 'revenue', label: 'Revenue', width: '100px' },
  ];

  return (
    <Card padding="none" className="overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="flex flex-col gap-[16px] px-5 py-4 border-b border-[var(--glass-border)]">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-[var(--warm-gray-300)]">Live High-Density Grid</h3>
          <span className="text-xs font-medium bg-[var(--primary-100)] text-[var(--warm-gray-300)] px-2 py-1 rounded-full">
            {totalRows} Rows Rendered
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Fuzzy search across ID, Name, Dept..."
            className="w-full md:w-80"
          />
          
          {/* Dropdown Filters */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(filterOptions).map(([key, options]) => (
              <select
                key={key}
                value={filters[key]}
                onChange={(e) => setFilters(prev => ({ ...prev, [key]: e.target.value }))}
                className="h-10 px-3 py-2 text-sm border border-[var(--glass-border)] rounded-[12px] bg-white text-[var(--warm-gray-300)] focus:outline-none focus:border-[var(--primary-200)] capitalize cursor-pointer"
              >
                <option value="All">{key} (All)</option>
                {options.filter(o => o !== 'All').map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ))}
          </div>
        </div>
      </div>

      {/* Virtualized Table Header */}
      <div className="flex px-4 py-2 bg-[var(--soft-cream)] border-b border-[var(--glass-border)] pr-6">
        {columns.map(col => (
          <div
            key={col.id}
            onClick={() => handleSort(col.id)}
            style={{ width: col.width }}
            className={`flex-shrink-0 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--warm-gray-100)] cursor-pointer hover:text-[var(--warm-gray-300)] select-none ${col.id === 'name' ? 'flex-1' : ''}`}
          >
            {col.label}
            <SortIcon field={col.id} />
          </div>
        ))}
      </div>

      {/* Virtualized Scroll Container */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        style={{ height: viewportHeight, overflowY: 'auto', position: 'relative' }}
        className="w-full bg-white custom-scrollbar"
      >
        <div style={{ height: innerHeight, position: 'relative' }}>
          {visibleRows.map((proc, index) => {
            const absoluteIndex = startIndex + index;
            const top = absoluteIndex * rowHeight;
            
            return (
              <div
                key={proc.id}
                role="button"
                tabIndex={0}
                onClick={() => handleRowClick(proc)}
                onKeyDown={(e) => handleRowKeyDown(e, proc)}
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: rowHeight, 
                  transform: `translateY(${top}px)` 
                }}
                className={`flex items-center px-4 border-b border-[var(--glass-border)]/50 cursor-pointer hover:bg-[var(--very-light-orange)] transition-colors focus:outline-none focus:bg-[var(--very-light-orange)] ${
                  absoluteIndex % 2 === 0 ? '' : 'bg-[var(--soft-cream)]/30'
                }`}
              >
                <div style={{ width: columns[0].width }} className="flex-shrink-0 text-xs font-mono text-[var(--warm-gray-100)]">
                  <Highlight text={proc.id} query={search} />
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-sm font-medium text-[var(--warm-gray-300)] truncate-text">
                    <Highlight text={proc.name} query={search} />
                  </p>
                  <p className="text-[10px] text-[var(--warm-gray-100)]">
                    <Highlight text={proc.department} query={search} /> · <Highlight text={proc.region} query={search} /> · {proc.botType}
                  </p>
                </div>
                <div style={{ width: columns[2].width }} className="flex-shrink-0">
                  <Badge status={proc.status} dot pulse={proc.status === 'Running' || proc.status === 'Warning'} size="sm" />
                </div>
                <div style={{ width: columns[3].width }} className="flex-shrink-0">
                  <Badge priority={proc.priority} size="sm" />
                </div>
                <div style={{ width: columns[4].width }} className="flex-shrink-0 pr-4">
                  <ProgressBar value={proc.progress} showLabel size="sm" />
                </div>
                <div style={{ width: columns[5].width }} className="flex-shrink-0 text-xs tabular-nums text-[var(--warm-gray-300)]">
                  {new Intl.NumberFormat('en-US').format(proc.records)}
                </div>
                <div style={{ width: columns[6].width }} className="flex-shrink-0 text-xs tabular-nums font-semibold text-[var(--success)]">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(proc.revenue)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sliding Inspector Panel */}
      <InspectorPanel process={selectedProcess} onClose={() => setSelectedProcess(null)} />
    </Card>
  );
});

export default ProcessTable;
