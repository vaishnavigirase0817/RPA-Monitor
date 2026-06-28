import { useState, useEffect, useCallback } from 'react';

/**
 * Global keyboard navigation hook.
 * Registers keyboard shortcuts and cleans up on unmount.
 */
export function useKeyboardNav(shortcuts = {}) {
  useEffect(() => {
    const handler = (e) => {
      const key = [];
      if (e.ctrlKey || e.metaKey) key.push('mod');
      if (e.shiftKey) key.push('shift');
      if (e.altKey) key.push('alt');
      key.push(e.key.toLowerCase());

      const combo = key.join('+');

      if (shortcuts[combo]) {
        e.preventDefault();
        e.stopPropagation();
        shortcuts[combo](e);
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [shortcuts]);
}

/**
 * Focus trap hook — keeps focus within a container element.
 */
export function useFocusTrap(ref, isActive) {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const container = ref.current;
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = container.querySelectorAll(focusableSelector);
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    // Focus first element
    if (firstEl) firstEl.focus();

    const trapHandler = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };

    container.addEventListener('keydown', trapHandler);
    return () => container.removeEventListener('keydown', trapHandler);
  }, [ref, isActive]);
}

/**
 * Click outside hook — detects clicks outside a ref element.
 */
export function useClickOutside(ref, callback) {
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [ref, callback]);
}

/**
 * Media query hook for responsive behavior in JS.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
