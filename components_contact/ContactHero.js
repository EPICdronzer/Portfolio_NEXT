"use client";

import React from "react";

export default function ContactHero() {
  return (
    <section className="relative bg-black min-h-[38vh] flex items-center justify-center overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-[-15%] left-[-10%] w-[45%] h-[80%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[80%] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />

      {/* Diagonal grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center px-6 pt-28 pb-16">
        {/* Breadcrumb */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-gray-400 mb-6">
          <a href="/" className="hover:text-emerald-400 transition-colors duration-200">Home</a>
          <span className="text-emerald-400">/</span>
          <span className="text-white font-medium">Contact</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
          Get In <span className="text-emerald-400">Touch</span>
        </h1>
        <p className="mt-4 text-gray-400 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
          Have an idea or a project in mind? Reach out and let's craft something <span className="text-emerald-400 font-semibold">flawless</span> together.
        </p>

        {/* Decorative line */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="w-12 h-[2px] bg-emerald-500/40 rounded-full" />
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <span className="w-12 h-[2px] bg-emerald-500/40 rounded-full" />
        </div>
      </div>

      {/* Bottom angled divider */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
          <path d="M0 60L1440 20V60H0Z" fill="#0a0a0a" />
        </svg>
      </div>
    </section>
  );
}
