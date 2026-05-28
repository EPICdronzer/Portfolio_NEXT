"use client";

import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#050505] text-white">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      {/* Glassmorphic card containing the logo */}
      <div className="relative flex flex-col items-center p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl shadow-2xl animate-pulse">
        {/* Pulsing outer ring */}
        <div className="absolute inset-0 rounded-3xl border border-emerald-500/20 scale-105 animate-ping opacity-30" />

        {/* Logo container */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500/30 flex items-center justify-center bg-black/40">
          <Image
            src="/logo.png"
            alt="Loading..."
            width={96}
            height={96}
            className="object-cover animate-spin-slow"
            priority
          />
        </div>

        {/* Brand Name */}
        <h2 className="mt-5 text-xl font-extrabold tracking-widest uppercase text-white">
          Harsh Vashishth<span className="text-emerald-400">.</span>
        </h2>
        <p className="mt-1 text-xs tracking-wider text-emerald-400 font-semibold uppercase">
          Web Developer
        </p>

        {/* Sleek loading bar */}
        <div className="w-36 h-[3px] bg-zinc-800 rounded-full mt-6 overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full animate-loading-bar" />
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { left: -50%; }
          100% { left: 100%; }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s infinite linear;
        }
        .animate-spin-slow {
          animation: spin-slow 8s infinite linear;
        }
      `}</style>
    </div>
  );
}
