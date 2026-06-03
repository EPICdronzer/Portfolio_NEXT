"use client";

import React from "react";
import { siteConfig } from "@/app/config";

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

      {/* Right-aligned Full-Height Hero Image */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[48%] xl:w-[45%] h-full pointer-events-none z-0 overflow-hidden">
        {/* Left fade gradient: Blends image into solid black on the left */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black via-black/85 lg:via-black/50 to-transparent z-10" />
        {/* Bottom fade: Blends into the bottom section content / divider */}
        <div className="absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-black to-transparent z-10" />
        {/* Top fade: Blends behind the transparent navbar */}
        <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-black to-transparent z-10" />
        
        <img
          src="/my.png"
          alt="Harsh Vashishth"
          className="img-slow-grow w-full h-full object-cover object-center contrast-[1.05] opacity-90"
        />
      </div>

      {/* Hero Content */}
      <div className="flex-grow max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 flex items-center pt-28 pb-16 md:pt-36 md:pb-24 lg:pb-32 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">

          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left relative z-20">
            <span className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-wider text-amber-400 animate-float">
              Hello,
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mt-3 mb-4 leading-[1.1] tracking-tight">
              I am Harsh<span className="text-emerald-400">.</span>
            </h1>
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold tracking-widest text-emerald-400 uppercase">
              Web Developer
            </h2>

            <p className="text-zinc-200 md:text-gray-400 text-base md:text-lg leading-relaxed mt-6 mb-10 max-w-lg font-normal md:font-light bg-black/40 backdrop-blur-md md:bg-transparent md:backdrop-blur-none p-4 md:p-0 rounded-2xl border border-white/5 md:border-none shadow-xl md:shadow-none">
              Building refined digital experiences from Delhi where culture, ambition, and technology collide. Creating scalable products with modern engineering and a distinctly Indian design sensibility for millions of users.
            </p>

            <div>
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi Harsh, I would like to hire you for a project!")}`}
                target="_blank"
                rel="noopener noreferrer"
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
