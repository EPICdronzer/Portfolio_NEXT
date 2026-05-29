"use client";

import React from "react";
import { useAdmin } from "../_context/AdminContext";

export default function AdminToast() {
  const { toast } = useAdmin();

  if (!toast.show) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl border shadow-2xl flex items-center gap-3 z-50 animate-bounce ${
        toast.type === "success" &&
        "bg-zinc-900 border-emerald-500/30 text-emerald-400 shadow-emerald-500/5"
      } ${
        toast.type === "warning" &&
        "bg-zinc-900 border-rose-500/30 text-rose-400 shadow-rose-500/5"
      } ${
        toast.type === "info" &&
        "bg-zinc-900 border-blue-500/30 text-blue-400 shadow-blue-500/5"
      }`}
    >
      <span className="text-xs font-extrabold">{toast.message}</span>
    </div>
  );
}
