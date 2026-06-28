import { useState, useCallback, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import AnimatedBackground from './AnimatedBackground';
import GlobalSearch from '../features/GlobalSearch';
import QuickActions from '../features/QuickActions';
import { useKeyboardNav, useMediaQuery } from '../../hooks/useKeyboardNav';
import { NOTIFICATIONS } from '../../data/mockData';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Close sidebar on mobile by default
  const effectiveSidebarOpen = isMobile ? sidebarOpen : sidebarOpen;

  const unreadCount = useMemo(() => NOTIFICATIONS.filter(n => !n.read).length, []);

  // Global keyboard shortcuts
  const shortcuts = useMemo(() => ({
    'mod+k': () => setSearchOpen(true),
    'escape': () => {
      setSearchOpen(false);
    },
  }), []);

  useKeyboardNav(shortcuts);

  const handleMenuClick = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className={`app-shell ${!sidebarOpen && !isMobile ? 'app-shell--collapsed' : ''}`}>
      {/* Skip to content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Animated background - stays behind everything */}
      <AnimatedBackground />

      {/* Top navigation - CSS Grid area 'navbar' */}
      <div className="app-navbar">
        <TopNav
          onMenuClick={handleMenuClick}
          onSearchOpen={() => setSearchOpen(true)}
          notificationCount={unreadCount}
        />
      </div>

      {/* Sidebar - CSS Grid area 'sidebar' for desktop, independent for mobile drawer */}
      {!isMobile ? (
        <div className="app-sidebar">
          <Sidebar
            isOpen={effectiveSidebarOpen}
            onToggle={() => setSidebarOpen(prev => !prev)}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      ) : (
        <Sidebar
          isOpen={effectiveSidebarOpen}
          onToggle={() => setSidebarOpen(prev => !prev)}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area - CSS Grid area 'content' */}
      <div className="app-content">
        <main id="main-content" className="app-content-inner animate-fade-in-page" role="main">
          <Outlet />
        </main>
      </div>

      {/* Global search overlay */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Quick actions FAB */}
      <div className="fab-container">
        <QuickActions />
      </div>
    </div>
  );
}
