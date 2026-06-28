import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

const ToastContext = createContext(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, message, type = 'info', duration = 3000 }) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const newToast = { id, title, message, type };
    
    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
          {toasts.map(toast => (
            <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

function Toast({ title, message, type, onClose }) {
  const typeStyles = {
    success: 'bg-[var(--success-light)] border-[var(--success)] text-[var(--success)]',
    error: 'bg-[var(--error-light)] border-[var(--error)] text-[var(--error)]',
    info: 'bg-[var(--info-light)] border-[var(--info)] text-[var(--info)]',
    warning: 'bg-[var(--warning-light)] border-[var(--warning)] text-[var(--warning)]',
  };

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
  };

  return (
    <div 
      className={`animate-slide-up pointer-events-auto flex items-start gap-3 p-4 min-w-[300px] max-w-sm rounded-xl border shadow-lg glass-strong ${typeStyles[type]}`}
      role="alert"
    >
      <span className="text-xl" aria-hidden="true">{icons[type]}</span>
      <div className="flex-1 pt-0.5">
        <h4 className="text-sm font-bold text-[var(--warm-gray-300)]">{title}</h4>
        {message && <p className="text-xs text-[var(--warm-gray-200)] mt-0.5">{message}</p>}
      </div>
      <button 
        onClick={onClose}
        className="text-[var(--warm-gray-200)] hover:text-[var(--warm-gray-300)] transition-colors p-1"
        aria-label="Close notification"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
