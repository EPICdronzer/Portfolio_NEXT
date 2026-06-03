"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-md shadow-2xl transition-all duration-300 transform translate-y-0 animate-slide-in ${
              toast.type === "error"
                ? "bg-red-500/10 border-red-500/30 text-red-200"
                : toast.type === "warning"
                ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
                : "bg-[#181818]/90 border-emerald-500/20 text-emerald-400"
            }`}
          >
            {toast.type === "error" ? (
              <span className="text-red-400 text-lg">⚠️</span>
            ) : toast.type === "warning" ? (
              <span className="text-amber-400 text-lg">⚠️</span>
            ) : (
              <span className="text-emerald-400 text-lg">✓</span>
            )}
            <span className="text-xs font-bold tracking-wide">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return { addToast: () => {} };
  }
  return context;
}
