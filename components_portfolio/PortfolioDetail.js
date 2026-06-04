"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── Animated Number Count-Up ─── */
function CountUp({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.ceil(target / 30);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
          }, 30);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}</span>;
}

/* ─── Category icon map ─── */
const CAT_ICONS = {
  Design:      "✦",
  Development: "⟨⟩",
  Marketing:   "◎",
  Branding:    "◈",
  Photography: "⬡",
  Video:       "▷",
};
function getCatIcon(cat) {
  const key = Object.keys(CAT_ICONS).find((k) =>
    cat.toLowerCase().includes(k.toLowerCase())
  );
  return key ? CAT_ICONS[key] : "◆";
}

/* ─── Colour strip per category ─── */
function getCatColor(cat) {
  const c = cat.toLowerCase();
  if (c.includes("design"))      return "#a78bfa";
  if (c.includes("develop"))     return "#34d399";
  if (c.includes("market"))      return "#fb923c";
  if (c.includes("brand"))       return "#f472b6";
  if (c.includes("photo"))       return "#60a5fa";
  if (c.includes("video"))       return "#facc15";
  return "#34d399";
}

/* ─── Hero Feature Card (first / highlighted project) ─── */
function HeroCard({ project }) {
  const hasImage = project.image && project.image !== "" && project.image !== "/portfolio_screenshots.png";
  const color = getCatColor(project.category);

  return (
    <Link
      href={`/portfolio/${project.id}`}
      className="group relative block w-full rounded-3xl overflow-hidden border border-white/5 cursor-pointer"
      style={{ minHeight: "420px" }}
    >
      {/* Background */}
      {hasImage ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950" />
      )}

      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />

      {/* Corner glow — top-left */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top left, rgba(52,211,153,0.18) 0%, rgba(255,255,255,0.06) 30%, transparent 60%)" }} />
      {/* Corner glow — top-right */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(255,255,255,0.10) 0%, rgba(52,211,153,0.08) 25%, transparent 55%)" }} />
      {/* Corner glow — bottom-right */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at bottom right, rgba(52,211,153,0.14) 0%, rgba(255,255,255,0.05) 30%, transparent 60%)" }} />
      {/* Corner glow — bottom-left (strongest — content side) */}
      <div className="absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at bottom left, rgba(52,211,153,0.22) 0%, rgba(255,255,255,0.08) 25%, transparent 55%)` }} />

      {/* FEATURED badge */}
      <div className="absolute top-5 left-5 z-10">
        <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
          Featured Work
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-10">
        {/* Category pill */}
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest mb-3 w-fit px-3 py-1 rounded-full border"
          style={{ color, borderColor: `${color}40`, background: `${color}15` }}
        >
          {getCatIcon(project.category)} {project.category}
        </span>

        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4 max-w-3xl">
          {project.title}
        </h2>

        <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl line-clamp-2 mb-6">
          {project.desc}
        </p>

        <div className="inline-flex items-center gap-2 bg-white text-black font-black text-xs px-6 py-3 rounded-full w-fit group-hover:gap-3 transition-all duration-300 shadow-xl">
          View Case Study
          <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/* ─── Standard Bento Card ─── */
function BentoCard({ project, tall }) {
  const hasImage = project.image && project.image !== "" && project.image !== "/portfolio_screenshots.png";
  const color = getCatColor(project.category);

  return (
    <Link
      href={`/portfolio/${project.id}`}
      className="group relative block rounded-2xl overflow-hidden border border-white/5 cursor-pointer w-full h-full"
    >
      {/* Background image */}
      {hasImage ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Corner glow — top-left */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top left, rgba(52,211,153,0.20) 0%, rgba(255,255,255,0.07) 28%, transparent 55%)" }} />
      {/* Corner glow — top-right */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(255,255,255,0.10) 0%, rgba(52,211,153,0.07) 25%, transparent 52%)" }} />
      {/* Corner glow — bottom-right */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at bottom right, rgba(52,211,153,0.16) 0%, rgba(255,255,255,0.06) 28%, transparent 55%)" }} />
      {/* Corner glow — bottom-left */}
      <div className="absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at bottom left, rgba(52,211,153,0.25) 0%, rgba(255,255,255,0.08) 25%, transparent 52%)` }} />

      {/* Content — always visible */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
        {/* Category pill */}
        <span
          className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border w-fit mb-3"
          style={{ color, borderColor: `${color}40`, background: `${color}15` }}
        >
          {getCatIcon(project.category)} {project.category}
        </span>

        {/* Title */}
        <h3 className="text-white font-black text-base md:text-lg leading-snug tracking-tight line-clamp-2 mb-2">
          {project.title}
        </h3>

        {/* 2-line description */}
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
          {project.desc}
        </p>

        {/* White pill CTA */}
        <div className="inline-flex items-center gap-2 bg-white text-black font-black text-[11px] px-4 py-2 rounded-full w-fit group-hover:gap-3 transition-all duration-300 shadow-lg">
          View Case Study
          <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/* ─── Mobile Swipe Card ─── */
function SwipeCard({ project }) {
  const hasImage = project.image && project.image !== "" && project.image !== "/portfolio_screenshots.png";
  const color = getCatColor(project.category);

  return (
    <Link
      href={`/portfolio/${project.id}`}
      className="relative flex-shrink-0 block rounded-2xl overflow-hidden border border-white/5"
      style={{ width: "78vw", maxWidth: "320px", height: "260px" }}
    >
      {hasImage ? (
        <Image src={project.image} alt={project.title} fill sizes="320px" className="object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center">
          <span className="text-4xl opacity-20">{getCatIcon(project.category)}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <span
          className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border mb-2"
          style={{ color, borderColor: `${color}40`, background: `${color}15` }}
        >
          {project.category}
        </span>
        <h3 className="text-white font-extrabold text-sm leading-snug line-clamp-2">{project.title}</h3>
      </div>
    </Link>
  );
}

/* ══════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════ */
export default function PortfolioDetail({ initialPortfolios }) {
  const hasData = initialPortfolios && initialPortfolios.length > 0;

  const displayProjects = hasData
    ? initialPortfolios.map((item) => ({
        id: item.slug || item._id,
        title: item.title,
        category: item.category || "Project",
        desc: item.desc || `${item.title} — a premium, thoughtfully crafted project.`,
        image: item.image || "",
        images: Array.isArray(item.images) && item.images.length > 0 ? item.images : item.image ? [item.image] : [],
        imgPos: item.imgPos || "object-center",
        href: item.href || "#",
      }))
    : [];

  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null); // mobile accordion
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [page, setPage] = useState(1);
  const [fading, setFading] = useState(false);
  const ITEMS_PER_PAGE = 7; // 1 hero + 6 bento

  // Categories are visible when search is focused OR has text
  const showCategories = searchFocused || search.length > 0;

  const dynamicCats = hasData
    ? ["All", ...Array.from(new Set(displayProjects.map((p) => p.category.split(/[.·,]/)[0].trim())))]
    : ["All"];

  const filteredProjects = displayProjects.filter((p) => {
    const matchesFilter = activeFilter === "All" || p.category.toLowerCase().includes(activeFilter.toLowerCase());
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginated = filteredProjects.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const heroProject = paginated[0] || null;
  const bentoProjects = paginated.slice(1);

  /* Smooth page-change: fade out → update → fade in */
  const goToPage = useCallback((nextPage) => {
    if (nextPage === page) return;
    setFading(true);
    setTimeout(() => {
      setPage(nextPage);
      setFading(false);
      window.scrollTo({ top: document.getElementById("portfolio-grid")?.offsetTop - 80 || 0, behavior: "smooth" });
    }, 300);
  }, [page]);

  const handleFilterChange = (cat) => { setFading(true); setTimeout(() => { setActiveFilter(cat); setPage(1); setExpandedId(null); setFading(false); }, 250); };
  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); setExpandedId(null); };

  /* ───────── No Data UI ───────── */
  if (!hasData) {
    return (
      <section className="bg-[#0d0d0f] py-20 md:py-28 relative overflow-hidden min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="w-full max-w-2xl mx-auto my-12 text-center p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">No Portfolio Projects Yet</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed mb-6 font-light">
                Projects will appear here once added through the administrator dashboard. Check back soon!
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-6 py-3 rounded-full transition-all duration-300 shadow-lg"
              >
                Get in Touch
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ───────── Main Layout ───────── */
  return (
    <section className="bg-[#0d0d0f] py-16 md:py-24 relative overflow-hidden min-h-screen">

      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">

        {/* ── Stats bar ── */}
        <div className="flex flex-wrap gap-6 justify-start mb-10">
          {[
            { label: "Total Projects", value: displayProjects.length, icon: "◆" },
            { label: "Categories",    value: dynamicCats.length - 1, icon: "◈" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 bg-white/[0.03] border border-white/8 rounded-2xl px-5 py-3"
            >
              <span className="text-emerald-400 text-base font-black">{stat.icon}</span>
              <div>
                <p className="text-white text-xl font-black leading-none">
                  <CountUp target={stat.value} />
                </p>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Search + Filters ── */}
        <div className="mb-8">
          {/* Search bar */}
          <div className="flex items-center gap-3 bg-white/[0.04] border border-white/8 rounded-2xl px-4 py-2.5 transition-all duration-300 w-full max-w-sm"
            style={{ borderColor: searchFocused ? "rgba(52,211,153,0.5)" : undefined }}
          >
            <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search projects or click to filter by category…"
              className="flex-grow bg-transparent text-white text-sm placeholder-gray-600 focus:outline-none"
            />
            {search && (
              <button
                onClick={() => { setSearch(""); setPage(1); }}
                className="text-gray-500 hover:text-white transition-colors text-xs"
              >
                ✕
              </button>
            )}
            {/* Filter icon hint */}
            {!search && (
              <svg
                className="w-4 h-4 flex-shrink-0 transition-opacity duration-300"
                style={{ color: searchFocused ? "#34d399" : "#4b5563" }}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
            )}
          </div>

          {/* Category filter pills — revealed on search focus */}
          <div
            style={{
              maxHeight: showCategories ? "300px" : "0px",
              opacity: showCategories ? 1 : 0,
              transform: showCategories ? "translateY(0)" : "translateY(-8px)",
              overflow: "hidden",
              transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <div className="flex gap-2 flex-wrap pt-3">
              {dynamicCats.map((cat) => {
                const color = cat === "All" ? "#34d399" : getCatColor(cat);
                const count = cat === "All" ? displayProjects.length : displayProjects.filter(p => p.category.toLowerCase().includes(cat.toLowerCase())).length;
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    onMouseDown={(e) => e.preventDefault()} // keep focus on input
                    onClick={() => handleFilterChange(cat)}
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-full border transition-all duration-300"
                    style={{
                      color: isActive ? "#0d0d0f" : color,
                      borderColor: isActive ? color : `${color}40`,
                      background: isActive ? color : `${color}10`,
                    }}
                  >
                    {getCatIcon(cat)} {cat}
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded-full font-black"
                      style={{ background: isActive ? "rgba(0,0,0,0.2)" : `${color}20`, color: isActive ? "#0d0d0f" : color }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Empty state ── */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No projects found matching &ldquo;{search}&rdquo;
          </div>
        )}

        {/* ════════════════════════════════════
            MOBILE: Accordion expand-on-tap cards
        ════════════════════════════════════ */}
        {filteredProjects.length > 0 && (
          <div
            id="portfolio-grid"
            className="md:hidden flex flex-col gap-4"
            style={{
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(12px)" : "translateY(0)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            {paginated.map((project) => {
              const isOpen = expandedId === project.id;
              const hasImage = project.image && project.image !== "" && project.image !== "/portfolio_screenshots.png";
              const color = getCatColor(project.category);
              return (
                <div
                  key={project.id}
                  className="rounded-2xl overflow-hidden border border-white/5 bg-[#141414] transition-all duration-500"
                >
                  {/* Compact header — always visible */}
                  <button
                    onClick={() => setExpandedId(isOpen ? null : project.id)}
                    className="w-full flex items-center gap-4 p-4 text-left group"
                    aria-expanded={isOpen}
                  >
                    {/* Thumbnail */}
                    <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-white/10">
                      {hasImage ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="64px"
                          className={`object-cover ${project.imgPos} transition-transform duration-500 group-hover:scale-110`}
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-900/50 flex items-center justify-center text-lg">
                          {getCatIcon(project.category)}
                        </div>
                      )}
                    </div>

                    {/* Title + category */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[10px] font-bold uppercase tracking-widest mb-0.5 truncate"
                        style={{ color }}
                      >
                        {getCatIcon(project.category)} {project.category}
                      </p>
                      <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                        {project.title}
                      </h3>
                    </div>

                    {/* Chevron */}
                    <svg
                      className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      style={{ color: isOpen ? color : "#6b7280" }}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Expanded body */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 pb-5 space-y-4">
                      {/* Full image */}
                      <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-white/5">
                        {hasImage ? (
                          <>
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw"
                              className={`object-cover ${project.imgPos}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </>
                        ) : (
                          <div className="w-full h-full bg-zinc-900/50 flex flex-col items-center justify-center gap-2">
                            <span className="text-3xl opacity-20">{getCatIcon(project.category)}</span>
                            <span className="text-gray-600 text-xs font-semibold">No photo uploaded</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-400 leading-relaxed">{project.desc}</p>

                      {/* CTA */}
                      <Link
                        href={`/portfolio/${project.id}`}
                        className="inline-flex items-center gap-2 text-black font-bold text-xs px-5 py-2.5 rounded-full shadow-lg transition-all duration-300"
                        style={{ background: color, boxShadow: `0 4px 20px ${color}40` }}
                      >
                        View Project
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ════════════════════════════════════
            DESKTOP: Hero + Bento Grid
        ════════════════════════════════════ */}
        {filteredProjects.length > 0 && (
          <div
            className="hidden md:block space-y-6"
            style={{
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(16px)" : "translateY(0)",
              transition: "opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {/* Hero feature */}
            {heroProject && <HeroCard project={heroProject} />}

            {/* Bento grid */}
            {bentoProjects.length > 0 && (
              <div className="grid grid-cols-3 auto-rows-[360px] gap-6">
                {bentoProjects.map((project, i) => {
                  // Alternate tall/normal cards for visual rhythm
                  // Positions 0,3 → wide (span 2 cols, normal height)
                  // Others → single col, alternating tall
                  const isWide = i === 0 || i === 3;
                  const isTall = i === 1 || i === 5;

                  return (
                    <div
                      key={project.id}
                      className={isWide ? "col-span-2" : "col-span-1"}
                    >
                      <BentoCard project={project} tall={isTall} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-14 flex-wrap">
            {/* Prev arrow */}
            <button
              onClick={() => goToPage(Math.max(1, page - 1))}
              disabled={page === 1 || fading}
              className="group w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-emerald-500/60 hover:bg-emerald-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Previous page"
            >
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page dots / numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                disabled={fading}
                className="w-9 h-9 rounded-full text-xs font-bold transition-all duration-300"
                style={{
                  background: page === p ? "#34d399" : "transparent",
                  color: page === p ? "#000" : "#9ca3af",
                  border: page === p ? "2px solid #34d399" : "1px solid rgba(255,255,255,0.1)",
                  boxShadow: page === p ? "0 0 16px #34d39940" : "none",
                  transform: page === p ? "scale(1.12)" : "scale(1)",
                }}
              >
                {p}
              </button>
            ))}

            {/* Next arrow */}
            <button
              onClick={() => goToPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages || fading}
              className="group w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-emerald-500/60 hover:bg-emerald-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Next page"
            >
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Search result count */}
        {search && filteredProjects.length > 0 && (
          <p className="text-center text-gray-600 text-xs mt-6">
            {filteredProjects.length} result{filteredProjects.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
          </p>
        )}
      </div>
    </section>
  );
}
