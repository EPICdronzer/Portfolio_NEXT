"use client";

import React from "react";
import Link from "next/link";

export default function AdminHeader({ title, description }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-zinc-850 mb-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          {title}
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-3 self-start sm:self-center">
        {/* Sync Indicators */}
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          DB Synced
        </span>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors duration-200"
        >
          View Site
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </Link>
      </div>
    </header>
  );
}
