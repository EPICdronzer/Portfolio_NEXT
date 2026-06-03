"use client";

import React, { useState, useEffect, useCallback } from "react";

/**
 * ImageSlideshow
 * Props:
 *   images   – string[] of URLs (Cloudinary or any https URL)
 *   alt      – alt text prefix
 *   className – outer wrapper class (controls height/shape)
 *   objectFit – "object-cover" | "object-contain"  (default: "object-cover")
 *   autoPlay  – bool (default: true when images.length > 1)
 *   interval  – ms between slides (default: 3500)
 *   showDots  – bool (default: true)
 *   showArrows– bool (default: true)
 */
export default function ImageSlideshow({
  images = [],
  alt = "Image",
  className = "w-full h-64 rounded-2xl",
  objectFit = "object-cover",
  autoPlay = true,
  interval = 3500,
  showDots = true,
  showArrows = true,
}) {
  const valid = images.filter(Boolean);
  const [idx, setIdx] = useState(0);

  const next = useCallback(() => setIdx((i) => (i + 1) % valid.length), [valid.length]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + valid.length) % valid.length), [valid.length]);

  useEffect(() => {
    if (!autoPlay || valid.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, valid.length, next, interval]);

  // No images — show placeholder
  if (valid.length === 0) {
    return (
      <div className={`${className} bg-zinc-900/60 border border-white/5 flex flex-col items-center justify-center gap-2 overflow-hidden`}>
        <span className="text-3xl text-gray-700">🖼️</span>
        <span className="text-gray-600 text-xs font-semibold">No photo uploaded</span>
      </div>
    );
  }

  // Single image — no controls needed
  if (valid.length === 1) {
    return (
      <div className={`${className} overflow-hidden relative`}>
        <img
          src={valid[0]}
          alt={alt}
          className={`w-full h-full ${objectFit} transition-transform duration-500`}
        />
      </div>
    );
  }

  // Multiple images — auto slideshow
  return (
    <div className={`${className} overflow-hidden relative group`}>
      {/* Slides */}
      {valid.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${alt} ${i + 1}`}
          className={`absolute inset-0 w-full h-full ${objectFit} transition-opacity duration-700 ${
            i === idx ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Gradient overlay bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none" />

      {/* Arrows */}
      {showArrows && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Previous image"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Next image"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {showDots && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
          {valid.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIdx(i); }}
              className={`rounded-full transition-all duration-300 ${
                i === idx ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image counter badge */}
      <div className="absolute top-2 right-2 z-30 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-[10px] font-bold">
        {idx + 1}/{valid.length}
      </div>
    </div>
  );
}
