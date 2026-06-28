import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '../../hooks/useKeyboardNav';
import { USER_PROFILE } from '../../data/mockData';
import Avatar from '../ui/Avatar';

export default function ProfileMenu({ onClose }) {
  const ref = useRef(null);
  const navigate = useNavigate();

  useClickOutside(ref, onClose);

  const menuItems = [
    {
      label: 'My Profile',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      ),
      action: () => { onClose(); },
    },
    {
      label: 'Settings',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ),
      action: () => { navigate('/settings'); onClose(); },
    },
    {
      label: 'Activity Logs',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" />
        </svg>
      ),
      action: () => { navigate('/logs'); onClose(); },
    },
    {
      label: 'Help & Docs',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      action: () => { onClose(); },
    },
  ];

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-[260px] glass-strong rounded-2xl overflow-hidden animate-slide-down z-50"
      role="menu"
      aria-label="Profile menu"
    >
      {/* User info */}
      <div className="px-4 py-4 border-b border-[var(--glass-border)]">
        <div className="flex items-center gap-3">
          <Avatar name={USER_PROFILE.name} initials={USER_PROFILE.initials} size="lg" status="online" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[var(--warm-gray-300)] truncate">{USER_PROFILE.name}</p>
            <p className="text-xs text-[var(--warm-gray-100)] truncate">{USER_PROFILE.email}</p>
            <p className="text-[10px] text-[var(--primary-300)] font-medium mt-0.5">{USER_PROFILE.role}</p>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="py-1">
        {menuItems.map(item => (
          <button
            key={item.label}
            role="menuitem"
            onClick={item.action}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--warm-gray-300)] hover:bg-[var(--very-light-orange)] transition-colors text-left"
          >
            <span className="text-[var(--warm-gray-100)]">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="border-t border-[var(--glass-border)] py-1">
        <button
          role="menuitem"
          onClick={onClose}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--error)] hover:bg-red-50 transition-colors text-left"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
}
