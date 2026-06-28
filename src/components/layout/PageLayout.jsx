import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../data/mockData';

/**
 * Standardized Page Layout for all dashboard pages.
 * Enforces strict vertical spacing using the 8px system:
 * - Breadcrumb (margin-bottom: 16px)
 * - Title (margin-bottom: 8px)
 * - Subtitle (margin-bottom: 32px)
 * - Toolbar (margin-bottom: 24px)
 * - Bottom padding (64px)
 */
export default function PageLayout({ title, subtitle, toolbar, children, className = '' }) {
  const location = useLocation();

  // Build breadcrumb from current route
  const breadcrumb = useMemo(() => {
    const current = NAV_ITEMS.find(item => item.path === location.pathname);
    return current ? current.label : 'Dashboard';
  }, [location.pathname]);

  return (
    <div className={`pb-[64px] ${className}`}>
      {/* Breadcrumb - mb-[16px] */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-[16px]">
        <span className="text-[var(--warm-gray-100)]">Home</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--warm-gray-100)]">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span className="font-semibold text-[var(--warm-gray-300)]">{breadcrumb}</span>
      </nav>

      <header>
        {/* Title - mb-[8px] */}
        <h1 className="text-[32px] leading-tight font-bold text-[var(--warm-gray-300)] mb-[8px]">
          {title}
        </h1>
        
        {/* Subtitle - mb-[32px] */}
        {subtitle && (
          <p className="text-[14px] text-[var(--warm-gray-100)] mb-[32px]">
            {subtitle}
          </p>
        )}
      </header>

      {/* Toolbar - mb-[24px] */}
      {toolbar && (
        <div className="mb-[24px]">
          {toolbar}
        </div>
      )}

      {/* Main Content */}
      <div className="stagger-children">
        {children}
      </div>
    </div>
  );
}
