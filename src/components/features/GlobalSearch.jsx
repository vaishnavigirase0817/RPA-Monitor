import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEARCH_CATEGORIES } from '../../data/mockData';
import { useFocusTrap } from '../../hooks/useKeyboardNav';

export default function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useFocusTrap(containerRef, isOpen);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    if (!isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filter results
  const results = useMemo(() => {
    if (!query.trim()) return SEARCH_CATEGORIES;

    const q = query.toLowerCase();
    return SEARCH_CATEGORIES.map(cat => ({
      ...cat,
      items: cat.items.filter(
        item => item.label.toLowerCase().includes(q) || item.sublabel?.toLowerCase().includes(q)
      ),
    })).filter(cat => cat.items.length > 0);
  }, [query]);

  // Flat list for keyboard navigation
  const flatItems = useMemo(() => results.flatMap(cat => cat.items), [results]);

  const handleSelect = (item) => {
    if (item.type === 'page') {
      navigate(item.sublabel);
    } else if (item.type === 'bot') {
      navigate('/bots');
    } else if (item.type === 'process') {
      navigate('/processes');
    }
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, flatItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && flatItems[selectedIndex]) {
      handleSelect(flatItems[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Global search"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[var(--warm-gray-300)]/20 backdrop-blur-sm animate-fade-in" />

      {/* Search container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-xl glass-strong rounded-2xl overflow-hidden animate-scale-up"
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--glass-border)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-300)" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Search bots, processes, pages..."
            className="flex-1 bg-transparent text-[var(--warm-gray-300)] placeholder:text-[var(--warm-gray-100)] text-sm outline-none"
            aria-label="Search input"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] bg-[var(--light-beige)] rounded border border-[var(--glass-border)] text-[var(--warm-gray-100)] font-mono">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto py-2">
          {results.length === 0 ? (
            <div className="py-8 text-center text-sm text-[var(--warm-gray-100)]">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map(category => (
              <div key={category.category}>
                <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--warm-gray-100)]">
                  {category.category}
                </p>
                {category.items.map(item => {
                  const flatIdx = flatItems.indexOf(item);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors
                        ${flatIdx === selectedIndex
                          ? 'bg-[var(--primary-300)]/10 text-[var(--primary-300)]'
                          : 'text-[var(--warm-gray-300)] hover:bg-[var(--very-light-orange)]'
                        }
                      `.trim()}
                      role="option"
                      aria-selected={flatIdx === selectedIndex}
                    >
                      <span className="w-6 h-6 rounded-md bg-[var(--light-beige)] flex items-center justify-center text-xs flex-shrink-0">
                        {item.type === 'bot' ? '🤖' : item.type === 'process' ? '⚡' : '📄'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.label}</p>
                        <p className="text-[10px] text-[var(--warm-gray-100)] truncate">{item.sublabel}</p>
                      </div>
                      {item.type === 'page' && (
                        <span className="text-[10px] text-[var(--warm-gray-100)]">Navigate →</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-[var(--glass-border)] text-[10px] text-[var(--warm-gray-100)]">
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-[var(--light-beige)] rounded border border-[var(--glass-border)] font-mono">↑↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-[var(--light-beige)] rounded border border-[var(--glass-border)] font-mono">↵</kbd>
            Select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-[var(--light-beige)] rounded border border-[var(--glass-border)] font-mono">ESC</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}
