"use client";

import React, { useState, useEffect, useCallback } from "react";

// SVG fallback icons per slot
const CompanyIcon = ({ index }) => {
  const icons = [
    <svg key="lotus" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.2 5.4-5.4 7.8-9 9 3.6 1.2 7.8 3.6 9 9 1.2-5.4 5.4-7.8 9-9-3.6-1.2-7.8-3.6-9-9z" />
    </svg>,
    <svg key="code" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>,
    <svg key="leaf" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C7 3 3 7 3 12c0 2.5 1 4.8 2.6 6.4C7.2 20 9.5 21 12 21c5 0 9-4 9-9S17 3 12 3z" />
    </svg>,
  ];
  const colors = ["text-purple-300", "text-blue-300", "text-emerald-300"];
  const bgColors = ["bg-purple-400/20", "bg-blue-400/20", "bg-emerald-400/20"];
  return (
    <div className={`w-10 h-10 rounded-full ${bgColors[index % 3]} flex items-center justify-center ${colors[index % 3]} border border-white/10`}>
      {icons[index % 3]}
    </div>
  );
};

/* ─── Background slideshow hook ─── */
function useBgSlideshow(images, interval = 4000) {
  const [idx, setIdx] = useState(0);
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [images.length, next, interval]);
  return images[idx] || null;
}

/* ─── Single experience card ─── */
function ExperienceCard({ exp, index }) {
  const bgImages = Array.isArray(exp.images) && exp.images.length > 0 ? exp.images : [];
  const currentBg = useBgSlideshow(bgImages);
  const hasBg = !!currentBg;
  const period = exp.period || `${exp.startMonth ? exp.startMonth + " " : ""}${exp.startYear} – ${exp.endMonth ? exp.endMonth + " " : ""}${exp.endYear || "Present"}`;

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 flex flex-col h-full">

      {/* ── Background image / overlay ── */}
      {hasBg ? (
        <>
          {/* BG image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: `url(${currentBg})` }}
          />
          {/* Heavy dark overlay so text is always readable */}
          <div className="absolute inset-0 bg-black/65" />
          {/* Subtle gradient from top + bottom for extra contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
          {/* Slide indicator dots (only when multiple) */}
          {bgImages.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1">
              {bgImages.map((_, i) => (
                <span
                  key={i}
                  className={`block rounded-full transition-all duration-300 ${
                    i === (bgImages.indexOf(currentBg)) ? "w-3 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        /* No images — solid dark card */
        <div className="absolute inset-0 bg-[#1a1a1a] group-hover:bg-[#1e1e1e] transition-colors duration-300" />
      )}

      {/* ── Content (always above overlays) ── */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center h-full">

        {/* Logo / Icon */}
        <div className="mb-5">
          {exp.logo ? (
            <img
              src={exp.logo}
              alt={exp.company}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-lg shadow-black/40"
            />
          ) : (
            <CompanyIcon index={index} />
          )}
        </div>

        {/* Period */}
        <p className="text-white font-extrabold text-xl md:text-2xl mb-2 tracking-tight drop-shadow-md">
          {period}
        </p>

        {/* Role */}
        <h3 className="text-white font-bold text-sm md:text-base mb-3 drop-shadow-md leading-snug">
          {exp.role}
        </h3>

        {/* Company */}
        <p className="text-emerald-400 text-sm font-semibold drop-shadow-md">
          {exp.company}
          {exp.companyExtra && (
            <span className="text-gray-300 font-normal"> {exp.companyExtra}</span>
          )}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Link */}
        <a
          href={exp.href || "#"}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-xs font-semibold transition-colors duration-200 mt-5 group/link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Go to website
        </a>

      </div>
    </div>
  );
}

export default function Experience({ initialExperiences }) {
  const hasData = initialExperiences && initialExperiences.length > 0;
  const displayExperiences = hasData ? initialExperiences : [];

  return (
    <section id="about" className="bg-[#0f0f0f] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            My Work Experience
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            A journey through roles, companies, and skills that shaped my craft.
          </p>
        </div>

        {!hasData ? (
          <div className="w-full max-w-2xl mx-auto my-12 text-center p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">No Work Experience Added Yet</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed mb-6 font-light">
                Experiences will appear here once added through the administrator dashboard.
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-6 py-3 rounded-full transition-all duration-300 shadow-lg">
                Get in Touch
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Mobile: horizontal scroll */}
            <div className="flex md:hidden gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
              {displayExperiences.map((exp, index) => (
                <div
                  key={exp._id || exp.id}
                  className="snap-start flex-shrink-0 w-[75vw] max-w-[300px]"
                  style={{ minHeight: "280px" }}
                >
                  <ExperienceCard exp={exp} index={index} />
                </div>
              ))}
            </div>

            {/* Desktop: equal-height grid */}
            <div
              className="hidden md:grid gap-6"
              style={{ gridTemplateColumns: `repeat(${Math.min(displayExperiences.length, 3)}, 1fr)` }}
            >
              {displayExperiences.map((exp, index) => (
                <ExperienceCard key={exp._id || exp.id} exp={exp} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
