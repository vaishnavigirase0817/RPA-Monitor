import { useState, useRef } from 'react';
import { NOTIFICATIONS } from '../../data/mockData';
import { useClickOutside } from '../../hooks/useKeyboardNav';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function NotificationPanel({ onClose }) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const ref = useRef(null);

  useClickOutside(ref, onClose);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const typeIcons = {
    error: (
      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </div>
    ),
    warning: (
      <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
    ),
    success: (
      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
    ),
    info: (
      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--info)" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </div>
    ),
  };

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-[380px] max-h-[480px] glass-strong rounded-2xl overflow-hidden animate-slide-down z-50"
      role="dialog"
      aria-label="Notifications"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--glass-border)]">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-[var(--warm-gray-300)]">Notifications</h3>
          {unreadCount > 0 && (
            <Badge status="error" size="sm">{unreadCount} new</Badge>
          )}
        </div>
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" onClick={markAllRead} aria-label="Mark all as read">
            Mark all read
          </Button>
          <Button size="sm" variant="ghost" onClick={clearAll} aria-label="Clear all notifications">
            Clear
          </Button>
        </div>
      </div>

      {/* Notification list */}
      <div className="overflow-y-auto max-h-[380px]">
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-sm text-[var(--warm-gray-100)]">
            <p>🔔</p>
            <p className="mt-2">No notifications</p>
          </div>
        ) : (
          notifications.map((notif, idx) => (
            <button
              key={notif.id}
              onClick={() => markRead(notif.id)}
              className={`
                w-full flex items-start gap-3 px-4 py-3 text-left transition-colors
                hover:bg-[var(--very-light-orange)]
                ${!notif.read ? 'bg-[var(--very-light-orange)]/50' : ''}
                ${idx < notifications.length - 1 ? 'border-b border-[var(--glass-border)]/50' : ''}
              `.trim()}
              aria-label={`${notif.read ? '' : 'Unread: '}${notif.title}`}
            >
              {typeIcons[notif.type]}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm ${notif.read ? 'text-[var(--warm-gray-200)]' : 'text-[var(--warm-gray-300)] font-medium'}`}>
                    {notif.title}
                  </p>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-[var(--primary-300)] flex-shrink-0" />}
                </div>
                <p className="text-xs text-[var(--warm-gray-100)] mt-0.5 line-clamp-2">{notif.message}</p>
                <p className="text-[10px] text-[var(--warm-gray-100)] mt-1">{notif.time}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
