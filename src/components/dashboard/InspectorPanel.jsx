import { useEffect, useRef, memo } from 'react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import { useToast } from '../ui/ToastContext';

// --- Subcomponents for Sections ---

const SectionHeader = ({ title }) => (
  <h4 className="text-sm font-semibold text-[var(--warm-gray-300)] uppercase tracking-wider mb-4 border-b border-[var(--glass-border)] pb-2">{title}</h4>
);

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-start py-1.5 border-b border-[var(--glass-border)]/30 last:border-0">
    <span className="text-xs text-[var(--warm-gray-200)] w-1/3">{label}</span>
    <span className="text-xs font-medium text-[var(--warm-gray-300)] w-2/3 text-right break-words">{value}</span>
  </div>
);

const QuickActionButton = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-[var(--glass-border)] hover:bg-[var(--primary-100)]/30 hover:border-[var(--primary-200)] transition-all press-effect btn-ripple text-[var(--primary-300)]"
  >
    <span className="text-lg">{icon}</span>
    <span className="text-[10px] font-semibold text-[var(--warm-gray-300)] whitespace-nowrap">{label}</span>
  </button>
);

// --- Main Inspector Panel Component ---

const InspectorPanel = memo(function InspectorPanel({ process, onClose }) {
  const panelRef = useRef(null);
  const { addToast } = useToast();

  // Focus trapping & Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!process) return null;

  // AI Insight Generator
  const generateInsight = () => {
    if (process.status === 'Failed' || process.failureRate > 5) {
      return `Critical attention required. Failure rate is at ${process.failureRate}% and bottlenecking downstream systems.`;
    }
    if (process.cpu > 80 || process.memory > 12000) {
      return `High resource utilization detected (CPU: ${process.cpu}%, Mem: ${(process.memory/1024).toFixed(1)}GB). Consider horizontal scaling.`;
    }
    if (process.throughput > 300) {
      return `This automation is operating at peak efficiency. Throughput is excellent with minimal latency.`;
    }
    return `This automation is operating normally. Resource usage is stable and execution is tracking within SLA limits.`;
  };

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const handleQuickAction = (action) => {
    addToast({ title: 'Action Executed', message: `Successfully executed: ${action}`, type: 'success' });
  };

  return (
    <>
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 z-40 bg-[var(--warm-gray-300)]/20 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sliding Drawer */}
      <div 
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Inspector for ${process.name}`}
        className="fixed top-0 right-0 bottom-0 z-50 w-full md:w-[80%] lg:w-[520px] bg-white/90 backdrop-blur-xl border-l border-[var(--glass-border)] shadow-[var(--shadow-glass)] rounded-l-2xl overflow-y-auto custom-scrollbar animate-slide-left focus:outline-none"
        tabIndex="-1"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-5 border-b border-[var(--glass-border)] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-[var(--warm-gray-300)]">{process.name}</h2>
              <Badge status={process.status} dot pulse={process.status === 'Running' || process.status === 'Warning'} />
            </div>
            <div className="flex items-center gap-3 text-xs text-[var(--warm-gray-200)] font-mono">
              <span>{process.id}</span>
              <span>•</span>
              <span>{process.botId}</span>
              <span>•</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[var(--very-light-orange)] rounded-full transition-colors text-[var(--warm-gray-200)] hover:text-[var(--warm-gray-300)]"
            aria-label="Close inspector"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-8 stagger-children">
          
          {/* SECTION 5: AI Insights */}
          <div className="bg-gradient-to-br from-[var(--primary-100)]/40 to-[var(--light-beige)] p-4 rounded-xl border border-[var(--primary-200)]/30 relative overflow-hidden group hover-lift shadow-sm">
            <div className="absolute -right-4 -top-4 text-[64px] opacity-10 group-hover:scale-110 transition-transform">✨</div>
            <h4 className="text-xs font-bold text-[var(--primary-300)] uppercase tracking-wider mb-2 flex items-center gap-1">
              <span className="text-sm">✨</span> AI Insight
            </h4>
            <p className="text-sm text-[var(--warm-gray-300)] font-medium leading-relaxed">{generateInsight()}</p>
          </div>

          {/* Quick Actions (Moved up for accessibility) */}
          <div>
            <SectionHeader title="Quick Actions" />
            <div className="grid grid-cols-4 gap-2">
              <QuickActionButton icon="📋" label="Copy ID" onClick={() => handleQuickAction('Copy Project ID')} />
              <QuickActionButton icon="JSON" label="Copy JSON" onClick={() => handleQuickAction('Copy JSON')} />
              <QuickActionButton icon="📥" label="Export" onClick={() => handleQuickAction('Export Details')} />
              <QuickActionButton icon="📊" label="Report" onClick={() => handleQuickAction('Download Report')} />
            </div>
          </div>

          {/* SECTION 1: Project Information */}
          <div>
            <SectionHeader title="Project Information" />
            <div className="bg-[var(--soft-cream)]/50 rounded-xl p-4 border border-[var(--glass-border)]">
              <DetailRow label="Department" value={process.department} />
              <DetailRow label="Region" value={process.region} />
              <DetailRow label="Owner" value={process.owner} />
              <DetailRow label="Bot Type" value={process.botType} />
              <DetailRow label="Priority" value={<Badge priority={process.priority} size="sm" />} />
              <DetailRow label="Environment" value={process.environment} />
              <DetailRow label="Version" value={process.version} />
              <DetailRow label="Description" value={process.description} />
            </div>
          </div>

          {/* SECTION 2: Performance */}
          <div>
            <SectionHeader title="Performance Metrics" />
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 bg-white rounded-xl p-4 border border-[var(--glass-border)] shadow-sm">
                <div className="flex justify-between text-xs mb-1 font-medium text-[var(--warm-gray-300)]">
                  <span>Success Rate</span>
                  <span>{process.successRate}%</span>
                </div>
                <ProgressBar value={process.successRate} size="sm" color="var(--success)" />
                <div className="flex justify-between text-xs mb-1 mt-3 font-medium text-[var(--warm-gray-300)]">
                  <span>CPU Usage</span>
                  <span>{process.cpu}%</span>
                </div>
                <ProgressBar value={process.cpu} size="sm" color={process.cpu > 80 ? 'var(--error)' : 'var(--warning)'} />
                <div className="flex justify-between text-xs mb-1 mt-3 font-medium text-[var(--warm-gray-300)]">
                  <span>Memory Usage</span>
                  <span>{Math.round(process.memory / 1024)} GB</span>
                </div>
                <ProgressBar value={(process.memory / 16000) * 100} size="sm" color="var(--primary-200)" />
              </div>
              
              <div className="bg-[var(--soft-cream)]/50 rounded-xl p-3 border border-[var(--glass-border)] text-center">
                <p className="text-[10px] text-[var(--warm-gray-200)] uppercase tracking-wider mb-1">Throughput</p>
                <p className="text-lg font-bold text-[var(--warm-gray-300)] tabular-nums">{process.throughput} <span className="text-[10px] font-normal text-[var(--warm-gray-100)]">/sec</span></p>
              </div>
              <div className="bg-[var(--soft-cream)]/50 rounded-xl p-3 border border-[var(--glass-border)] text-center">
                <p className="text-[10px] text-[var(--warm-gray-200)] uppercase tracking-wider mb-1">Latency</p>
                <p className="text-lg font-bold text-[var(--warm-gray-300)] tabular-nums">{process.latency} <span className="text-[10px] font-normal text-[var(--warm-gray-100)]">ms</span></p>
              </div>
              <div className="bg-[var(--soft-cream)]/50 rounded-xl p-3 border border-[var(--glass-border)] text-center">
                <p className="text-[10px] text-[var(--warm-gray-200)] uppercase tracking-wider mb-1">Avg Runtime</p>
                <p className="text-lg font-bold text-[var(--warm-gray-300)] tabular-nums">{process.duration} <span className="text-[10px] font-normal text-[var(--warm-gray-100)]">m</span></p>
              </div>
              <div className="bg-[var(--soft-cream)]/50 rounded-xl p-3 border border-[var(--glass-border)] text-center">
                <p className="text-[10px] text-[var(--warm-gray-200)] uppercase tracking-wider mb-1">Queue Length</p>
                <p className="text-lg font-bold text-[var(--warm-gray-300)] tabular-nums">{process.queueLength}</p>
              </div>
            </div>
          </div>

          {/* SECTION 3: Financial */}
          <div>
            <SectionHeader title="Financial Impact" />
            <div className="bg-[var(--soft-cream)]/50 rounded-xl p-4 border border-[var(--glass-border)]">
              <DetailRow label="Revenue Generated" value={<span className="text-[var(--success)] font-bold">{formatCurrency(process.revenue)}</span>} />
              <DetailRow label="Operational Cost" value={<span className="text-[var(--error)] font-semibold">{formatCurrency(process.operationalCost)}</span>} />
              <DetailRow label="Estimated Savings" value={<span className="text-[var(--primary-300)] font-semibold">{formatCurrency(process.estimatedSavings)}</span>} />
              <DetailRow label="Budget Allocation" value={formatCurrency(process.budget)} />
              <DetailRow label="Calculated ROI" value={`${process.roi.toFixed(1)}%`} />
            </div>
          </div>

          {/* SECTION 4: Workflow */}
          <div>
            <SectionHeader title="Workflow Execution" />
            <div className="bg-[var(--soft-cream)]/50 rounded-xl p-4 border border-[var(--glass-border)]">
              <DetailRow label="Workflow Name" value={process.workflowName} />
              <DetailRow label="Execution Trigger" value={process.trigger} />
              <DetailRow label="Retry Count" value={process.retryCount} />
              <DetailRow label="Last Execution" value={new Date(process.lastExecution).toLocaleString()} />
              <DetailRow label="Next Execution" value={new Date(process.nextExecution).toLocaleString()} />
              <DetailRow label="Dependencies" value={process.dependencies.join(', ')} />
              <DetailRow label="Execution Path" value={<span className="font-mono text-[10px]">{process.executionPath}</span>} />
            </div>
          </div>

          {/* SECTION 6: Timeline */}
          <div>
            <SectionHeader title="Execution Timeline" />
            <div className="relative border-l-2 border-[var(--primary-100)] ml-3 pl-4 space-y-6 my-4 py-2">
              {[
                { label: 'Bot Started', status: 'done', time: '-4m 12s' },
                { label: 'Queue Loaded', status: 'done', time: '-3m 45s' },
                { label: 'Validation Passed', status: 'done', time: '-2m 10s' },
                { label: 'AI Analysis Completed', status: process.status === 'Failed' ? 'error' : 'done', time: '-1m 05s' },
                { label: 'Workflow Executed', status: process.status === 'Completed' ? 'done' : (process.status === 'Failed' ? 'pending' : 'current'), time: 'Now' },
                { label: 'Database Updated', status: process.status === 'Completed' ? 'done' : 'pending', time: '--' },
              ].map((step, i) => (
                <div key={i} className="relative flex flex-col group">
                  <div className={`absolute -left-[23px] w-3 h-3 rounded-full border-2 border-white ${
                    step.status === 'done' ? 'bg-[var(--success)]' : 
                    step.status === 'current' ? 'bg-[var(--primary-300)] animate-pulse-dot' : 
                    step.status === 'error' ? 'bg-[var(--error)]' : 'bg-[var(--warm-gray-100)]'
                  }`} />
                  <span className={`text-sm font-medium ${step.status === 'pending' ? 'text-[var(--warm-gray-100)]' : 'text-[var(--warm-gray-300)]'}`}>{step.label}</span>
                  <span className="text-[10px] text-[var(--warm-gray-200)]">{step.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 7: Tags */}
          <div>
            <SectionHeader title="Classification Tags" />
            <div className="flex flex-wrap gap-2">
              {process.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 text-[10px] font-semibold bg-[var(--primary-100)]/40 text-[var(--warm-gray-300)] rounded-md border border-[var(--primary-100)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* SECTION 8: Related Attributes (Dynamic Fallback) */}
          <div>
            <SectionHeader title="Raw Telemetry Attributes" />
            <div className="bg-[var(--warm-gray-300)] text-[var(--warm-white)] rounded-xl p-4 overflow-x-auto text-xs font-mono">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(process, null, 2)}
              </pre>
            </div>
          </div>

        </div>
      </div>
    </>
  );
});

export default InspectorPanel;
