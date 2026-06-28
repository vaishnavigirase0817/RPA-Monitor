import { useState } from 'react';
import { QUICK_ACTIONS } from '../../data/mockData';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useToast } from '../ui/ToastContext';

export default function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAction, setActiveAction] = useState(null);
  const { addToast } = useToast();

  const handleAction = (action) => {
    setActiveAction(action.action);
    // Simulate action being performed
    setTimeout(() => {
      setActiveAction(null);
      setIsOpen(false);
      addToast({
        title: 'Action Triggered',
        message: `Successfully executed: ${action.label}`,
        type: 'success'
      });
    }, 800);
  };

  return (
    <>
      {/* Floating action button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--primary-200)] to-[var(--primary-300)] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center press-effect"
        aria-label="Quick actions"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Quick actions modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Quick Actions" size="sm">
        <div className="grid grid-cols-2 gap-3">
          {QUICK_ACTIONS.map(action => (
            <button
              key={action.id}
              onClick={() => handleAction(action)}
              disabled={activeAction === action.action}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-xl
                border border-[var(--glass-border)]
                transition-all duration-200
                hover:bg-[var(--very-light-orange)] hover:border-[var(--primary-100)]
                hover:shadow-sm
                focus-visible:outline-2 focus-visible:outline-[var(--primary-200)]
                disabled:opacity-50
                press-effect
                ${activeAction === action.action ? 'bg-[var(--primary-300)]/10 border-[var(--primary-200)]' : 'bg-white/50'}
              `.trim()}
              aria-label={action.label}
            >
              <span className="text-2xl">
                {activeAction === action.action ? '✓' : action.icon}
              </span>
              <span className="text-xs font-medium text-[var(--warm-gray-300)]">{action.label}</span>
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
