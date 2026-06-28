import PageLayout from '../components/layout/PageLayout';
import Card from '../components/ui/Card';
import { useState } from 'react';
import PerformanceSummary from '../components/dashboard/PerformanceSummary';
import SystemHealth from '../components/dashboard/SystemHealth';
import { SYSTEM_HEALTH, BOTS } from '../data/mockData';

export default function Analytics() {
  const [health] = useState(SYSTEM_HEALTH);

  // Compute some analytics
  const totalTasks = BOTS.reduce((sum, b) => sum + b.tasksCompleted, 0);
  const avgSuccessRate = (BOTS.reduce((sum, b) => sum + b.successRate, 0) / BOTS.length).toFixed(1);
  const activeBots = BOTS.filter(b => b.status === 'Running').length;

  const summaryCards = [
    { label: 'Total Tasks Today', value: totalTasks.toLocaleString(), icon: '📊', color: 'from-blue-50 to-blue-100' },
    { label: 'Avg Success Rate', value: `${avgSuccessRate}%`, icon: '🎯', color: 'from-green-50 to-green-100' },
    { label: 'Active Bots', value: activeBots, icon: '🤖', color: 'from-orange-50 to-orange-100' },
    { label: 'Peak Hour', value: '9 AM', icon: '⏰', color: 'from-purple-50 to-purple-100' },
  ];

  return (
    <PageLayout
      title="Analytics"
      subtitle="Performance analytics and trends"
      className="page-section-gap"
    >
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
        {summaryCards.map(card => (
          <Card key={card.label} hover>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-lg mb-3`}>
              {card.icon}
            </div>
            <p className="text-xs text-[var(--warm-gray-100)] mb-1">{card.label}</p>
            <p className="text-xl font-bold text-[var(--warm-gray-300)]">{card.value}</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <PerformanceSummary />
        </div>
        <div>
          <SystemHealth health={health} />
        </div>
      </div>

      {/* Department breakdown */}
      <Card>
        <h3 className="text-base font-semibold text-[var(--warm-gray-300)] mb-4">Department Performance</h3>
        <div className="space-y-3">
          {['Finance', 'HR', 'Operations', 'IT', 'Sales', 'Legal', 'Support', 'Analytics'].map((dept, i) => {
            const tasks = Math.floor(Math.random() * 3000 + 500);
            const successRate = (95 + Math.random() * 5).toFixed(1);
            const width = (tasks / 3500) * 100;
            return (
              <div key={dept} className="flex items-center gap-4">
                <span className="w-24 text-sm text-[var(--warm-gray-200)] truncate">{dept}</span>
                <div className="flex-1 h-3 rounded-full bg-[var(--light-beige)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--primary-200)] to-[var(--primary-300)] transition-all duration-700"
                    style={{ width: `${width}%`, animationDelay: `${i * 0.1}s` }}
                  />
                </div>
                <span className="w-16 text-xs text-[var(--warm-gray-300)] tabular-nums text-right">{tasks.toLocaleString()}</span>
                <span className="w-14 text-xs text-[var(--success)] font-medium tabular-nums">{successRate}%</span>
              </div>
            );
          })}
        </div>
      </Card>
    </PageLayout>
  );
}
