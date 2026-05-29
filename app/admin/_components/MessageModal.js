"use client";

import React from "react";
import { useAdmin } from "../_context/AdminContext";

export default function MessageModal() {
  const { viewMessage, setViewMessage, toggleReadMessage } = useAdmin();

  if (!viewMessage) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
      <div className="bg-[#0e0e11] border border-zinc-850 rounded-3xl w-full max-w-lg p-8 shadow-2xl relative">
        <button
          onClick={() => {
            if (!viewMessage.read) toggleReadMessage(viewMessage.id);
            setViewMessage(null);
          }}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <span className="text-sm text-emerald-400 uppercase tracking-widest font-extrabold mb-2 block">
          Client Query
        </span>
        <h3 className="font-extrabold text-white text-lg mb-6">
          From {viewMessage.name}
        </h3>

        <div className="space-y-4 bg-[#141417] p-5 rounded-2xl border border-zinc-850">
          <div className="flex justify-between items-center text-xs text-zinc-400">
            <span>
              Email: <strong className="text-zinc-200">{viewMessage.email}</strong>
            </span>
            <span>{viewMessage.date}</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed pt-2 border-t border-zinc-850">
            {viewMessage.message}
          </p>
        </div>

        <div className="flex gap-3 justify-end mt-8">
          <a
            href={`mailto:${viewMessage.email}?subject=Regarding your query from Portfolio`}
            className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold px-6 py-3 rounded-xl shadow-lg transition-colors flex items-center gap-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
              />
            </svg>
            Send Email Reply
          </a>
        </div>
      </div>
    </div>
  );
}
