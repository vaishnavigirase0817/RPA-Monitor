import { useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../data/mockData';
import { useMediaQuery } from '../../hooks/useKeyboardNav';

// SVG icons for nav
const icons = {
  dashboard: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  processes: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  bots: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  ),
  analytics: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  logs: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
};

export default function Sidebar({ isOpen, onToggle, onClose }) {
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleNavClick = useCallback(() => {
    if (isMobile) onClose?.();
  }, [isMobile, onClose]);

  // Sidebar content (used for both desktop grid column and mobile drawer)
  const sidebarContent = (
    <div className="flex flex-col h-full w-full glass-strong">
      {/* Logo area */}
      <div className="flex items-center gap-3 px-4 h-[var(--topnav-height)] border-b border-[var(--glass-border)] flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--primary-200)] to-[var(--primary-300)] flex items-center justify-center flex-shrink-0 shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        {(isOpen || isMobile) && (
          <div className="overflow-hidden animate-fade-in">
            <h1 className="text-base font-bold text-[var(--warm-gray-300)] whitespace-nowrap">RPA Monitor</h1>
            <p className="text-[10px] text-[var(--warm-gray-100)] whitespace-nowrap">Enterprise Edition</p>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.id}
            to={item.path}
            onClick={handleNavClick}
            className={({ isActive }) => `
              sidebar-nav-item
              ${isActive ? 'sidebar-nav-item--active' : ''}
              ${!isOpen && !isMobile ? 'justify-center px-0' : ''}
            `.trim()}
            title={!isOpen && !isMobile ? item.label : undefined}
            aria-label={item.label}
            aria-current={location.pathname === item.path ? 'page' : undefined}
          >
            <span className="sidebar-nav-icon">
              {icons[item.icon]}
            </span>
            {(isOpen || isMobile) && (
              <span className="truncate-text">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar footer — collapse toggle */}
      {!isMobile && (
        <div className="px-2 py-3 border-t border-[var(--glass-border)] mt-auto">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--warm-gray-200)] hover:bg-[var(--very-light-orange)] hover:text-[var(--warm-gray-300)] transition-colors press-effect"
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={`transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}
            >
              <polyline points="11 17 6 12 11 7" />
              <polyline points="18 17 13 12 18 7" />
            </svg>
            {isOpen && <span>Collapse</span>}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile overlay and drawer */}
      {isMobile && (
        <>
          {isOpen && (
            <div
              className="mobile-drawer-overlay animate-fade-in"
              onClick={onClose}
              aria-hidden="true"
            />
          )}
          <aside
            className={`mobile-drawer ${isOpen ? 'mobile-drawer--open' : 'mobile-drawer--closed'}`}
            role="navigation"
            aria-label="Main navigation"
          >
            {sidebarContent}
          </aside>
        </>
      )}

      {/* Desktop layout uses the grid column directly */}
      {!isMobile && (
        <aside
          className="h-full w-full"
          role="navigation"
          aria-label="Main navigation"
        >
          {sidebarContent}
        </aside>
      )}
    </>
  );
}
