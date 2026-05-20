import { useEffect } from 'react';
import { X } from 'lucide-react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const bgColors = {
    success: 'bg-gradient-to-r from-emerald-900/95 to-emerald-800/95 border-emerald-500/30',
    error: 'bg-gradient-to-r from-red-900/95 to-red-800/95 border-red-500/30',
    info: 'bg-gradient-to-r from-amber-900/95 to-amber-800/95 border-amber-500/30',
  };

  const textColors = {
    success: 'text-emerald-300',
    error: 'text-red-300',
    info: 'text-amber-300',
  };

  return (
    <div
      className={`${bgColors[toast.type]} border backdrop-blur-md rounded-xl px-5 py-3.5 shadow-2xl shadow-black/30 flex items-center gap-3 min-w-[280px] max-w-[380px] animate-in slide-in-from-right-4 fade-in duration-300`}
    >
      <span className={`${textColors[toast.type]} text-sm font-medium flex-1`}>{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-white/40 hover:text-white/80 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
