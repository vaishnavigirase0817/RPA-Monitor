import { useState } from 'react';
import IconButton from '../ui/IconButton';
import Avatar from '../ui/Avatar';
import NotificationPanel from '../features/NotificationPanel';
import ProfileMenu from '../features/ProfileMenu';
import { USER_PROFILE, NAV_ITEMS } from '../../data/mockData';

export default function TopNav({ onMenuClick, onSearchOpen, notificationCount = 0 }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header
      className="w-full h-full glass-strong border-b border-[var(--glass-border)] flex items-center justify-between px-4 lg:px-6 gap-4"
      role="banner"
    >
      {/* Left: Menu button + Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--very-light-orange)] text-[var(--warm-gray-200)] transition-colors press-effect"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div
          className="w-full cursor-pointer hover-lift"
          onClick={onSearchOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSearchOpen(); } }}
          aria-label="Open global search (Ctrl+K)"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 border border-[var(--glass-border)] hover:border-[var(--primary-200)] transition-colors text-sm text-[var(--warm-gray-200)] shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="truncate">Search bots, processes, pages...</span>
            <kbd className="ml-auto flex-shrink-0 px-1.5 py-0.5 text-[10px] bg-white rounded-md border border-[var(--glass-border)] font-mono text-[var(--warm-gray-300)]">Ctrl+K</kbd>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Mobile search */}
        <IconButton
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
          }
          tooltip="Search"
          className="md:hidden"
          onClick={onSearchOpen}
          aria-label="Open search"
        />

        {/* Notifications */}
        <div className="relative">
          <IconButton
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            }
            badge={notificationCount || undefined}
            tooltip="Notifications"
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            aria-label={`Notifications${notificationCount ? ` (${notificationCount} unread)` : ''}`}
          />
          {showNotifications && (
            <NotificationPanel onClose={() => setShowNotifications(false)} />
          )}
        </div>

        {/* Profile */}
        <div className="relative ml-2">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-[var(--very-light-orange)] transition-colors press-effect border border-transparent hover:border-[var(--glass-border)]"
            aria-label="Profile menu"
            aria-expanded={showProfile}
            aria-haspopup="true"
          >
            <Avatar name={USER_PROFILE.name} initials={USER_PROFILE.initials} size="sm" status="online" />
            <span className="hidden xl:block text-sm font-semibold text-[var(--warm-gray-300)]">
              {USER_PROFILE.name.split(' ')[0]}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`hidden xl:block text-[var(--warm-gray-200)] transition-transform ${showProfile ? 'rotate-180' : ''}`}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {showProfile && (
            <ProfileMenu onClose={() => setShowProfile(false)} />
          )}
        </div>
      </div>
    </header>
  );
}
