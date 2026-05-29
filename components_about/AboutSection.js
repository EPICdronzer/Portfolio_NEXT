"use client";

import React, { useEffect, useRef, useState } from "react";

/* ─── Floating tech logos (SVG inline) ─── */
const techLogos = [
  {
    id: "mongodb",
    label: "MongoDB",
    color: "#47A248",
    pos: "top-[-18px] left-[-22px]",
    size: 52,
    delay: "0s",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#001E2B" />
        <path d="M20 6c0 0-8 8.5-8 15a8 8 0 0016 0C28 14.5 20 6 20 6zm0 22.5a1.5 1.5 0 010-3 1.5 1.5 0 010 3z" fill="#47A248" />
      </svg>
    ),
  },
  {
    id: "express",
    label: "Express",
    color: "#888",
    pos: "top-[-18px] right-[-22px]",
    size: 52,
    delay: "0.4s",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#1a1a1a" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="11" fill="#fff" fontFamily="monospace" fontWeight="bold">ex</text>
      </svg>
    ),
  },
  {
    id: "react",
    label: "React",
    color: "#61DAFB",
    pos: "bottom-[-18px] left-[-22px]",
    size: 52,
    delay: "0.8s",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#1a2332" />
        <ellipse cx="20" cy="20" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(0 20 20)" />
        <ellipse cx="20" cy="20" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 20 20)" />
        <ellipse cx="20" cy="20" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 20 20)" />
        <circle cx="20" cy="20" r="2" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    id: "nextjs",
    label: "Next.js",
    color: "#fff",
    pos: "bottom-[-18px] right-[-22px]",
    size: 52,
    delay: "1.2s",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#000" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Arial" fontWeight="bold">N→</text>
      </svg>
    ),
  },
  {
    id: "python",
    label: "Python",
    color: "#FFD43B",
    pos: "top-[40%] left-[-34px]",
    size: 44,
    delay: "1.6s",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#1a1a2e" />
        <path d="M14 12h6a4 4 0 014 4v2h-6a4 4 0 00-4 4v4a4 4 0 004 4h6a4 4 0 004-4v-6a4 4 0 00-4-4h-2v-2a4 4 0 00-4-4h-4" fill="none" stroke="#4B8BBE" strokeWidth="1.5" />
        <path d="M26 28h-6a4 4 0 01-4-4v-2h6a4 4 0 004-4v-4a4 4 0 00-4-4h-6a4 4 0 00-4 4v6a4 4 0 004 4h2v2a4 4 0 004 4h4" fill="none" stroke="#FFD43B" strokeWidth="1.5" />
        <circle cx="16.5" cy="16" r="1" fill="#4B8BBE" />
        <circle cx="23.5" cy="24" r="1" fill="#FFD43B" />
      </svg>
    ),
  },
  {
    id: "java",
    label: "Java",
    color: "#f89820",
    pos: "top-[40%] right-[-34px]",
    size: 44,
    delay: "2s",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#1a1a1a" />
        <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="#f89820" fontFamily="serif" fontWeight="bold">☕</text>
      </svg>
    ),
  },
  {
    id: "node",
    label: "Node.js",
    color: "#339933",
    pos: "top-[15%] left-[-34px]",
    size: 44,
    delay: "2.4s",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#1a2e1a" />
        <polygon points="20,10 30,16 30,26 20,32 10,26 10,16" stroke="#339933" strokeWidth="1.5" fill="none" />
        <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="8" fill="#339933" fontFamily="monospace" fontWeight="bold">N</text>
      </svg>
    ),
  },
];

/* ─── Stat counters ─── */
const stats = [
  { id: "projects", label: "Projects Done", value: 50, suffix: "+", color: "#10b981", border: "#10b981" },
  { id: "experience", label: "Years Experience", value: 3, suffix: "+", color: "#f59e0b", border: "#f59e0b" },
  { id: "clients", label: "Happy Clients", value: 30, suffix: "+", color: "#6366f1", border: "#6366f1" },
  { id: "skills", label: "Technologies", value: 12, suffix: "+", color: "#ec4899", border: "#ec4899" },
];

/* ─── Animated counter hook ─── */
function useCountUp(target, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(duration / target);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return count;
}

/* ─── Single stat card ─── */
function StatCard({ stat, started }) {
  const count = useCountUp(stat.value, 1600, started);
  return (
    <div
      className="relative flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border transition-all duration-300 hover:scale-[1.04] hover:bg-white/[0.06] cursor-default group"
      style={{ borderColor: stat.border + "55" }}
    >
      {/* Corner accent */}
      <span
        className="absolute top-0 left-0 w-8 h-8 rounded-tl-2xl border-t-2 border-l-2 transition-all duration-300 group-hover:w-12 group-hover:h-12"
        style={{ borderColor: stat.color }}
      />
      <span
        className="absolute bottom-0 right-0 w-8 h-8 rounded-br-2xl border-b-2 border-r-2 transition-all duration-300 group-hover:w-12 group-hover:h-12"
        style={{ borderColor: stat.color }}
      />

      <span className="text-4xl md:text-5xl font-extrabold" style={{ color: stat.color }}>
        {count}
        <span className="text-2xl">{stat.suffix}</span>
      </span>
      <span className="mt-2 text-sm text-gray-400 font-medium tracking-wide text-center">{stat.label}</span>
    </div>
  );
}

/* ─── Main component ─── */
export default function AboutSection() {
  const sectionRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-detail"
      className="relative bg-[#0a0a0a] py-20 md:py-28 overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute top-0 left-[-15%] w-[45%] h-[60%] rounded-full bg-emerald-500/8 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-15%] w-[50%] h-[60%] rounded-full bg-indigo-500/6 blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── LEFT: Photo + floating logos ── */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative inline-block">
              {/* Photo frame */}
              <div className="relative w-[260px] sm:w-[300px] md:w-[340px] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
                {/* gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />
                <img
                  src="/my.png"
                  alt="Harsh Vashishth"
                  className="w-full h-full object-cover contrast-[1.05]"
                />

                {/* Badge at bottom */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-sm border border-emerald-500/30 rounded-xl px-3 py-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-white text-xs font-bold leading-none">50+</p>
                    <p className="text-gray-400 text-sm leading-none mt-0.5">Projects Done</p>
                  </div>
                </div>
              </div>

              {/* Floating tech logos */}
              {techLogos.map((logo) => (
                <div
                  key={logo.id}
                  className={`absolute ${logo.pos} z-20`}
                  style={{
                    animation: `floatLogo 3.5s ease-in-out infinite alternate`,
                    animationDelay: logo.delay,
                  }}
                >
                  <div
                    className="rounded-xl shadow-lg bg-[#111] border border-white/10 p-1.5 flex items-center justify-center"
                    style={{ width: logo.size, height: logo.size }}
                    title={logo.label}
                  >
                    <div style={{ width: logo.size - 12, height: logo.size - 12 }}>
                      {logo.svg}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Info + counters ── */}
          <div className="flex flex-col">
            {/* Tag */}
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-4">
              <span className="w-6 h-[2px] bg-emerald-400 rounded" />
              About Me
            </span>

            {/* Name */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-1">
              Harsh <span className="text-emerald-400">Vashishth</span>
            </h2>

            {/* Role badge */}
            <span className="inline-block text-sm font-bold tracking-widest uppercase text-amber-400 mb-5">
              Web Developer
            </span>

            {/* Description */}
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-5">
              I'm a full-stack web developer from Bengaluru, specializing in the <span className="text-emerald-400 font-semibold">MERN stack</span> and{" "}
              <span className="text-emerald-400 font-semibold">Next.js</span>. I love turning complex problems into elegant, fast,
              and user-friendly solutions tailored for the Indian market. With a solid grip on{" "}
              <span className="text-amber-400 font-semibold">Java</span> and{" "}
              <span className="text-amber-400 font-semibold">Python</span>, I build scalable, high-performance software with clean architecture.
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {["MongoDB", "Express", "React", "Node.js", "Next.js", "Java", "Python"].map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/15 transition-colors duration-200 cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* ── Stat counters grid ── */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <StatCard key={stat.id} stat={stat} started={statsVisible} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes injected inline */}
      <style>{`
        @keyframes floatLogo {
          0%   { transform: translateY(0px) rotate(-2deg); }
          100% { transform: translateY(-10px) rotate(2deg); }
        }
      `}</style>
    </section>
  );
}
