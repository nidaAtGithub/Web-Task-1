"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils/helpers";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const remove = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const icons = {
    success: <CheckCircle className="w-4 h-4 text-green-400" />,
    error: <XCircle className="w-4 h-4 text-red-400" />,
    info: <AlertCircle className="w-4 h-4 text-blue-400" />,
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      <div className="fixed bottom-6 right-6 z-50 space-y-2 max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-xl animate-slide-up",
              t.type === "success" && "bg-green-500/10 border-green-500/30 text-green-200",
              t.type === "error" && "bg-red-500/10 border-red-500/30 text-red-200",
              t.type === "info" && "bg-blue-500/10 border-blue-500/30 text-blue-200"
            )}
          >
            {icons[t.type]}
            <span className="text-sm font-medium flex-1">{t.message}</span>
            <button onClick={() => remove(t.id)} className="text-slate-500 hover:text-slate-300">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
