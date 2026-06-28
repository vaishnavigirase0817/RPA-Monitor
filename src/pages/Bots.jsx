import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import Modal from '../components/ui/Modal';
import { BOTS } from '../data/mockData';
import { useToast } from '../components/ui/ToastContext';

export default function Bots() {
  const [bots] = useState(BOTS);
  const [selectedBot, setSelectedBot] = useState(null);
  const { addToast } = useToast();

  const handleAction = (action, botName = '') => {
    addToast({
      title: 'Action Triggered',
      message: `${action} initiated${botName ? ` for ${botName}` : ''}.`,
      type: 'info'
    });
    if (botName) setSelectedBot(null);
  };

  const toolbar = (
    <div className="flex items-center justify-end">
      <Button variant="primary" icon={<span>+</span>} onClick={() => handleAction('Deploy New Bot')}>
        Deploy New Bot
      </Button>
    </div>
  );

  return (
    <PageLayout
      title="Bot Management"
      subtitle="Monitor and control all RPA bots"
      toolbar={toolbar}
      className="page-section-gap"
    >
      {/* Bot grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {bots.map(bot => (
          <Card
            key={bot.id}
            hover
            onClick={() => setSelectedBot(bot)}
            className="cursor-pointer"
            aria-label={`${bot.name} — ${bot.status}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary-100)] to-[var(--primary-200)] flex items-center justify-center text-sm">
                  🤖
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--warm-gray-300)]">{bot.name}</p>
                  <p className="text-[10px] text-[var(--warm-gray-100)]">{bot.id} · {bot.type}</p>
                </div>
              </div>
              <Badge status={bot.status} dot pulse={bot.status === 'Running'} size="sm" />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-[10px] text-[var(--warm-gray-100)]">CPU</p>
                <ProgressBar value={bot.cpu} size="sm" />
                <p className="text-[10px] text-[var(--warm-gray-200)] tabular-nums mt-0.5">{bot.cpu}%</p>
              </div>
              <div>
                <p className="text-[10px] text-[var(--warm-gray-100)]">Memory</p>
                <ProgressBar value={bot.memory} size="sm" />
                <p className="text-[10px] text-[var(--warm-gray-200)] tabular-nums mt-0.5">{bot.memory}%</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-[10px] text-[var(--warm-gray-100)] pt-2 border-t border-[var(--glass-border)]/50">
              <span>{bot.tasksCompleted.toLocaleString()} tasks</span>
              <span>{bot.successRate}% success</span>
              <span>{bot.department}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Bot detail modal */}
      <Modal
        isOpen={!!selectedBot}
        onClose={() => setSelectedBot(null)}
        title={selectedBot?.name}
        size="md"
      >
        {selectedBot && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge status={selectedBot.status} dot pulse={selectedBot.status === 'Running'}>
                {selectedBot.status}
              </Badge>
              <span className="text-sm text-[var(--warm-gray-100)]">{selectedBot.type} · {selectedBot.department}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-[var(--very-light-orange)]">
                <p className="text-[10px] text-[var(--warm-gray-100)] mb-1">CPU Usage</p>
                <p className="text-lg font-bold text-[var(--warm-gray-300)] tabular-nums">{selectedBot.cpu}%</p>
                <ProgressBar value={selectedBot.cpu} size="sm" />
              </div>
              <div className="p-3 rounded-lg bg-[var(--very-light-orange)]">
                <p className="text-[10px] text-[var(--warm-gray-100)] mb-1">Memory Usage</p>
                <p className="text-lg font-bold text-[var(--warm-gray-300)] tabular-nums">{selectedBot.memory}%</p>
                <ProgressBar value={selectedBot.memory} size="sm" />
              </div>
              <div className="p-3 rounded-lg bg-[var(--very-light-orange)]">
                <p className="text-[10px] text-[var(--warm-gray-100)] mb-1">Tasks Completed</p>
                <p className="text-lg font-bold text-[var(--warm-gray-300)] tabular-nums">{selectedBot.tasksCompleted.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-[var(--very-light-orange)]">
                <p className="text-[10px] text-[var(--warm-gray-100)] mb-1">Success Rate</p>
                <p className="text-lg font-bold text-[var(--success)] tabular-nums">{selectedBot.successRate}%</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <p className="text-xs text-[var(--warm-gray-100)]">Uptime: <span className="font-medium text-[var(--warm-gray-300)]">{selectedBot.uptime}</span></p>
              <p className="text-xs text-[var(--warm-gray-100)]">Last Run: <span className="font-medium text-[var(--warm-gray-300)]">{selectedBot.lastRun}</span></p>
            </div>

            <div className="flex gap-2 pt-2">
              {selectedBot.status === 'Running' && (
                <Button variant="secondary" onClick={() => handleAction('Pause Bot', selectedBot.name)}>Pause Bot</Button>
              )}
              {(selectedBot.status === 'Idle' || selectedBot.status === 'Paused') && (
                <Button variant="primary" onClick={() => handleAction('Start Bot', selectedBot.name)}>Start Bot</Button>
              )}
              {selectedBot.status === 'Error' && (
                <Button variant="danger" onClick={() => handleAction('Restart Bot', selectedBot.name)}>Restart Bot</Button>
              )}
              <Button variant="ghost" onClick={() => handleAction('View Logs', selectedBot.name)}>View Logs</Button>
            </div>
          </div>
        )}
      </Modal>
    </PageLayout>
  );
}
