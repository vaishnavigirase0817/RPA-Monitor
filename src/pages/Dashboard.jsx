import { useState, useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import KPIGrid from '../components/dashboard/KPIGrid';
import PerformanceSummary from '../components/dashboard/PerformanceSummary';
import ProcessTable from '../components/dashboard/ProcessTable';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import SystemHealth from '../components/dashboard/SystemHealth';
import Button from '../components/ui/Button';
import Toggle from '../components/ui/Toggle';
import Dropdown from '../components/ui/Dropdown';
import { useLiveData } from '../hooks/useLiveData';
import { ACTIVITY_EVENTS, SYSTEM_HEALTH } from '../data/mockData'; // Mock data for unmigrated components

const DEFAULT_LAYOUT = {
  kpis: true,
  charts: true,
  table: true,
  feed: true,
  health: true
};

export default function Dashboard() {
  const { data, kpis, isPaused, togglePause } = useLiveData();
  
  // Layout Persistence
  const [layout, setLayout] = useState(() => {
    const saved = localStorage.getItem('dashboard_layout');
    return saved ? JSON.parse(saved) : DEFAULT_LAYOUT;
  });

  useEffect(() => {
    localStorage.setItem('dashboard_layout', JSON.stringify(layout));
  }, [layout]);

  const toggleWidget = (widget) => {
    setLayout(prev => ({ ...prev, [widget]: !prev[widget] }));
  };

  const toolbar = (
    <div className="flex items-center gap-4">
      <Button 
        variant={isPaused ? 'primary' : 'secondary'}
        onClick={togglePause}
        icon={isPaused ? '▶' : '⏸'}
      >
        {isPaused ? 'Resume Stream' : 'Pause Stream'}
      </Button>
      
      <Dropdown
        trigger={
          <Button variant="secondary" icon="⚙">
            Customize Layout
          </Button>
        }
        align="right"
        className="w-56 p-2"
      >
        <div className="flex flex-col gap-3 p-2">
          <span className="text-xs font-semibold uppercase text-[var(--warm-gray-200)] px-1">Visible Widgets</span>
          <Toggle label="KPI Grid" checked={layout.kpis} onChange={() => toggleWidget('kpis')} />
          <Toggle label="Performance Charts" checked={layout.charts} onChange={() => toggleWidget('charts')} />
          <Toggle label="Process Table" checked={layout.table} onChange={() => toggleWidget('table')} />
          <Toggle label="Activity Feed" checked={layout.feed} onChange={() => toggleWidget('feed')} />
          <Toggle label="System Health" checked={layout.health} onChange={() => toggleWidget('health')} />
        </div>
      </Dropdown>
    </div>
  );

  return (
    <PageLayout
      title="Dashboard"
      subtitle="Real-time RPA monitoring and performance overview"
      toolbar={toolbar}
      className="page-section-gap"
    >
      <div className="flex flex-col gap-[24px]">
        {layout.kpis && <KPIGrid kpis={kpis} />}
        {layout.charts && <PerformanceSummary />}
        {layout.table && <ProcessTable processes={data} isPaused={isPaused} />}
        {layout.feed && <ActivityFeed events={ACTIVITY_EVENTS} />}
        {layout.health && <SystemHealth health={SYSTEM_HEALTH} />}
      </div>
    </PageLayout>
  );
}
