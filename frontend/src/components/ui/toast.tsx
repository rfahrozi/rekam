import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type Toast = {
  id: number;
  title: string;
  description: string;
  tone: 'success' | 'error' | 'warning' | 'neutral';
};

type ToastContextValue = {
  pushToast: (toast: Omit<Toast, 'id'>) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, ...toast }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 2800);
  };

  const value = useMemo(() => ({ pushToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-80 flex-col gap-2">
        {toasts.map((toast) => (
          <div key={toast.id} className={`rounded-xl border px-4 py-3 shadow-lg ${
            toast.tone === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' :
            toast.tone === 'warning' ? 'border-amber-200 bg-amber-50 text-amber-800' :
            toast.tone === 'neutral' ? 'border-blue-200 bg-blue-50 text-blue-800' :
            'border-rose-200 bg-rose-50 text-rose-800'
          }`}>
            <p className="font-semibold">{toast.title}</p>
            <p className="mt-1 text-sm">{toast.description}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
