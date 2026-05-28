"use client";

import React, { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: "t-1",
    name: "Cathi Falcon",
    role: "Software Engineer",
    quote:
      "Many desktop publishing packages and editors now use as their. It is a long established fact that a reader will be distracted by the readable content of page when looking at its layout point of using is that it has more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making look like readable English.",
    avatarIndex: 0,
  },
  {
    id: "t-2",
    name: "Marcus Reid",
    role: "Product Designer",
    quote:
      "Working with Aliza transformed our brand completely. The attention to detail and creative vision brought something truly special to our project. Every pixel was crafted with purpose and the results exceeded all of our expectations.",
    avatarIndex: 1,
  },
  {
    id: "t-3",
    name: "Sophia Chen",
    role: "CEO, Innovate Studio",
    quote:
      "An exceptional designer who blends technical skill with artistic brilliance. The deliverables were always on time, on budget, and beyond what we imagined. I would recommend this portfolio to anyone looking for world-class design work.",
    avatarIndex: 2,
  },
];

// Avatar positions around the central circle
const satellitePositions = [
  { top: "8%", left: "20%", size: "w-12 h-12" },
  { top: "10%", right: "15%", size: "w-11 h-11" },
  { top: "50%", left: "2%", size: "w-12 h-12", transform: "translateY(-50%)" },
  { bottom: "15%", left: "18%", size: "w-11 h-11" },
  { bottom: "8%", right: "20%", size: "w-10 h-10" },
];

const avatarColors = [
  "bg-amber-100",
  "bg-rose-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-purple-100",
];

const AvatarIcons = [
  // Smiling person 1
  () => (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="16" r="7" fill="#f97316" opacity="0.8"/>
      <path d="M6 36c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="#f97316" opacity="0.6"/>
    </svg>
  ),
  () => (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="16" r="7" fill="#a855f7" opacity="0.8"/>
      <path d="M6 36c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="#a855f7" opacity="0.6"/>
    </svg>
  ),
  () => (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="16" r="7" fill="#3b82f6" opacity="0.8"/>
      <path d="M6 36c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="#3b82f6" opacity="0.6"/>
    </svg>
  ),
  () => (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="16" r="7" fill="#22c55e" opacity="0.8"/>
      <path d="M6 36c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="#22c55e" opacity="0.6"/>
    </svg>
  ),
  () => (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="16" r="7" fill="#ec4899" opacity="0.8"/>
      <path d="M6 36c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="#ec4899" opacity="0.6"/>
    </svg>
  ),
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const testimonial = testimonials[current];

  return (
    <section className="bg-[#181818] py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Diagonal decorative lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute border-t border-gray-500"
            style={{
              width: "200%",
              top: `${10 + i * 18}%`,
              left: "-50%",
              transform: "rotate(-15deg)",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left - Avatar Cluster */}
          <div className="relative w-full max-w-sm mx-auto aspect-square hidden md:block">
            {/* Pulsing rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-emerald-500/20 animate-ping opacity-20" style={{ animationDuration: "3s" }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border border-emerald-500/10" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full border border-emerald-500/5" />
            </div>

            {/* Central Avatar (main testimonial person) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-amber-300 border-4 border-white/20 flex items-center justify-center overflow-hidden shadow-2xl">
                <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="32" r="14" fill="#1d4ed8" opacity="0.9"/>
                  <path d="M12 72c0-15.5 12.5-28 28-28s28 12.5 28 28" fill="#1d4ed8" opacity="0.7"/>
                </svg>
              </div>
            </div>

            {/* Satellite Avatars */}
            {satellitePositions.map((pos, i) => {
              const AvatarIcon = AvatarIcons[i];
              const { size, transform, ...posStyle } = pos;
              return (
                <div
                  key={i}
                  className={`absolute ${size} rounded-full border-2 border-white/10 overflow-hidden bg-zinc-700 shadow-lg`}
                  style={{ ...posStyle, transform }}
                >
                  <AvatarIcon />
                </div>
              );
            })}
          </div>

          {/* Right - Testimonial Content */}
          <div className="flex flex-col justify-center">
            <blockquote className="text-white text-xl md:text-2xl font-semibold leading-snug mb-6 tracking-tight">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-lg">
              It is a long established fact that a reader will be distracted by the readable content
              of page when looking at its layout point of using is that it has more-or-less normal
              distribution of letters.
            </p>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-bold text-lg">{testimonial.name}, </span>
                <span className="text-gray-400 text-sm">{testimonial.role}</span>
              </div>

              {/* Nav buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                  disabled={current === 0}
                  className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Previous testimonial"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrent((c) => Math.min(testimonials.length - 1, c + 1))}
                  disabled={current === testimonials.length - 1}
                  className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Next testimonial"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-emerald-400" : "w-1.5 bg-zinc-600"}`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
