"use client";

import React from "react";
import { useAdmin } from "../_context/AdminContext";

export default function CustomDialog() {
  const { dialog, setDialog } = useAdmin();

  if (!dialog.show) return null;

  const typeStyles = {
    info: {
      border: "border-blue-500/20",
      accent: "bg-blue-500",
      text: "text-blue-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    warning: {
      border: "border-amber-500/20",
      accent: "bg-amber-500",
      text: "text-amber-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    danger: {
      border: "border-rose-500/20",
      accent: "bg-rose-500",
      text: "text-rose-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    success: {
      border: "border-emerald-500/20",
      accent: "bg-emerald-500",
      text: "text-emerald-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  };

  const style = typeStyles[dialog.type] || typeStyles.info;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className={`w-full max-w-md bg-zinc-950 border ${style.border} rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-scale-up`}>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-zinc-900 rounded-xl flex items-center justify-center flex-shrink-0">
            {style.icon}
          </div>
          <div className="flex-grow">
            <h3 className="text-white font-extrabold text-lg tracking-tight mb-1">{dialog.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light">{dialog.message}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          {dialog.isConfirm ? (
            <>
              <button
                onClick={dialog.onCancel}
                className="px-5 py-2.5 rounded-xl border border-zinc-800 text-gray-400 hover:text-white hover:bg-zinc-900 font-semibold text-sm transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={dialog.onConfirm}
                className="px-6 py-2.5 rounded-xl text-black font-bold text-sm transition-all duration-200 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-400/20"
              >
                Confirm
              </button>
            </>
          ) : (
            <button
              onClick={() => setDialog(prev => ({ ...prev, show: false }))}
              className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-semibold text-sm transition-all duration-200"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
