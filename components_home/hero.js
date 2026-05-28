"use client";

import React from "react";

const slowGrowStyle = `
  @keyframes slowGrow {
    0%   { transform: scale(1.0); }
    100% { transform: scale(1.15); }
  }
  .img-slow-grow {
    animation: slowGrow 12s ease-in-out infinite alternate;
  }
`;

export default function Hero() {
  return (
    <section id="home" className="relative bg-black min-h-screen flex flex-col justify-between overflow-hidden">
      <style>{slowGrowStyle}</style>

      {/* Glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />

      {/* Hero Content */}
      <div className="flex-grow max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 flex items-center pt-28 pb-16 md:pt-36 md:pb-24  lg:pb-32 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <span className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-wider text-amber-400 animate-float">
              Hello,
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mt-3 mb-4 leading-[1.1] tracking-tight">
              I Am Harsh<span className="text-emerald-400">.</span>
            </h1>
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold tracking-widest text-emerald-400 uppercase">
              Web Developer
            </h2>

            <p className="text-gray-400 text-base md:text-lg leading-relaxed mt-6 mb-10 max-w-lg font-light">
              Must explain to how all this mistaken idea denouncing pleasure pain the system and expound the actua.
            </p>

            <div>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-300 group"
              >
                Hire Me
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - Portrait */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
            <div className="relative w-full aspect-4/5 overflow-hidden group max-w-[260px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[520px] xl:max-w-[620px] max-h-[340px] sm:max-h-[420px] md:max-h-[520px] lg:max-h-none">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-60 z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />
              <img
                src="/my.png"
                alt="Harsh Vashishth"
                className="img-slow-grow w-full h-full object-cover z-0 contrast-[1.05] opacity-90"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Angled Bottom Divider */}
      <div className="w-full relative z-20 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
          <path d="M0 80L1440 30V80H0Z" fill="#121212" />
        </svg>
      </div>
    </section>
  );
}
