import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      bg: 'bg-emerald-600',
      icon: CheckCircle,
      shadow: 'shadow-emerald-500/20'
    },
    error: {
      bg: 'bg-red-600',
      icon: XCircle,
      shadow: 'shadow-red-500/20'
    },
    info: {
      bg: 'bg-blue-600',
      icon: Info,
      shadow: 'shadow-blue-500/20'
    }
  }[type];

  const Icon = config.icon;

  return (
    <div className={`fixed bottom-8 right-8 z-[100] animate-in slide-in-from-right-8 fade-in-0 duration-500`}>
      <div className={`${config.bg} ${config.shadow} text-white px-6 py-4 rounded-[1.5rem] shadow-2xl flex items-center gap-4 min-w-[320px] max-w-md border border-white/10 backdrop-blur-md`}>
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-black tracking-tight">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
