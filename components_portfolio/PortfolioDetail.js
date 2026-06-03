"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const ITEMS_PER_PAGE = 6;

/* ─── Slideshow image for desktop cards ─── */
function SlideshowCard({ images, imgPos, title, isActive }) {
  const [idx, setIdx] = useState(0);
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [images.length, next]);

  const src = images[idx];
  return (
    <>
      {src ? (
        <>
          <Image
            src={src}
            alt={title}
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className={`object-cover opacity-90 transition-all duration-700 ease-out ${
              isActive ? "scale-110" : "grayscale group-hover:scale-110 group-hover:grayscale-0"
            } ${imgPos}`}
          />
          {/* Subtle base gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          {/* Slide dots for multiple images */}
          {images.length > 1 && (
            <div className="absolute top-3 right-3 z-10 flex gap-1">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`block rounded-full transition-all duration-300 ${
                    i === idx ? "w-3 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full bg-[#111] flex flex-col items-center justify-center gap-3">
          <span className="text-3xl text-gray-700">🖼️</span>
          <span className="text-gray-600 text-sm font-semibold">No photo uploaded</span>
        </div>
      )}
    </>
  );
}

export default function PortfolioDetail({ initialPortfolios }) {
  const hasData = initialPortfolios && initialPortfolios.length > 0;

  const displayProjects = hasData
    ? initialPortfolios.map((item) => ({
        id: item.slug || item._id,
        title: item.title,
        category: item.category || "Project",
        desc: item.desc || `${item.title} — a premium, thoughtfully crafted project.`,
        image: item.image || "/portfolio_screenshots.png",
        images: Array.isArray(item.images) && item.images.length > 0 ? item.images : (item.image ? [item.image] : []),
        imgPos: item.imgPos || "object-center",
        href: item.href || "#",
      }))
    : [];

  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null); // accordion on mobile
  const [tappedCard, setTappedCard] = useState(null);  // overlay reveal on desktop
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  /* Build category list dynamically from data */
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

  const handleFilterChange = (cat) => { setActiveFilter(cat); setPage(1); setExpandedId(null); };
  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); setExpandedId(null); };

  /* ───────── No Data UI ───────── */
  if (!hasData) {
    return (
      <section className="bg-[#1c1c1c] py-20 md:py-28 relative overflow-hidden min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="w-full max-w-2xl mx-auto my-12 text-center p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

  /* ───────── Main Grid ───────── */
  return (
    <section className="bg-[#1c1c1c] py-20 md:py-28 relative overflow-hidden min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">

        {/* ── Search Bar ── */}
        <div className="mb-6 flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3 focus-within:border-emerald-500/50 transition-colors duration-300">
          <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search projects by title or category…"
            className="flex-grow bg-transparent text-white text-sm placeholder-gray-600 focus:outline-none"
          />
          {search && (
            <button onClick={() => { setSearch(""); setPage(1); }} className="text-gray-500 hover:text-white transition-colors text-xs">✕ Clear</button>
          )}
        </div>

        {/* ── Category Filters ── */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {dynamicCats.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-300 border ${
                activeFilter === cat
                  ? "bg-emerald-500 text-black border-emerald-500 shadow-lg shadow-emerald-500/25"
                  : "border-white/10 text-gray-400 hover:text-white hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Empty search result ── */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No projects found matching &ldquo;{search}&rdquo;
          </div>
        )}

        {/* ══════════════════════════════════════════
            MOBILE: Accordion expand-on-tap cards
            DESKTOP: Masonry grid with overlay reveal
        ══════════════════════════════════════════ */}

        {/* ── MOBILE accordion list (hidden on md+) ── */}
        <div className="flex flex-col gap-4 md:hidden">
          {paginated.map((project) => {
            const isOpen = expandedId === project.id;
            const hasImage = project.image && project.image !== "" && project.image !== "/portfolio_screenshots.png";
            return (
              <div
                key={project.id}
                className="rounded-2xl overflow-hidden border border-white/5 bg-[#141414] transition-all duration-500"
              >
                {/* Compact header row — always visible */}
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
                      <div className="w-full h-full bg-zinc-900/50 flex items-center justify-center text-[10px]">
                        🖼️
                      </div>
                    )}
                  </div>

                  {/* Title + category */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-0.5 truncate">
                      {project.category}
                    </p>
                    <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                      {project.title}
                    </h3>
                  </div>

                  {/* Chevron */}
                  <svg
                    className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-emerald-400" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 pb-5 space-y-4">
                    {/* Full-size image */}
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
                          <span className="text-2xl text-gray-700">🖼️</span>
                          <span className="text-gray-600 text-xs font-semibold">No photo uploaded</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed">{project.desc}</p>

                    {/* CTA */}
                    <Link
                      href={`/portfolio/${project.id}`}
                      className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-5 py-2.5 rounded-full shadow-lg shadow-emerald-500/20 transition-all duration-300"
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

        {/* ── DESKTOP Masonry grid (hidden below md) ── */}
        <div className="hidden md:block columns-2 lg:columns-3 gap-6 space-y-6">
          {paginated.map((project) => {
            const isActive = tappedCard === project.id;
            const hasImage = project.image && project.image !== "" && project.image !== "/portfolio_screenshots.png";
            return (
              <div
                key={project.id}
                onClick={() => setTappedCard((prev) => (prev === project.id ? null : project.id))}
                className="group relative block break-inside-avoid cursor-pointer overflow-hidden rounded-2xl border border-white/5"
                style={{ aspectRatio: "4/3" }}
              >
                {/* Image */}
                {hasImage ? (
                  <>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className={`object-cover opacity-90 transition-all duration-700 ease-out ${
                        isActive ? "scale-110 grayscale-0" : "grayscale group-hover:scale-110 group-hover:grayscale-0"
                      } ${project.imgPos}`}
                    />
                    {/* Subtle base gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full bg-[#111] flex flex-col items-center justify-center gap-3">
                    <span className="text-3xl text-gray-700">🖼️</span>
                    <span className="text-gray-600 text-sm font-semibold">No photo uploaded</span>
                  </div>
                )}

                {/* Always-visible bottom overlay: only title + View Project */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black/90 via-black/50 to-black/10">
                  <h3 className="text-white font-extrabold text-sm md:text-base leading-snug mb-3 tracking-tight drop-shadow-lg">
                    {project.title}
                  </h3>
                  <Link
                    href={`/portfolio/${project.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-5 py-2.5 rounded-full shadow-lg shadow-emerald-500/30 transition-all duration-300 w-fit group/btn"
                  >
                    View Project
                    <svg className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-14 flex-wrap">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-full text-xs font-bold transition-all duration-200 ${
                  page === p
                    ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30"
                    : "border border-white/10 text-gray-400 hover:text-white hover:border-white"
                }`}
              >{p}</button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {search && filteredProjects && (
          <p className="text-center text-gray-600 text-xs mt-6">
            {filteredProjects.length} result{filteredProjects.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
          </p>
        )}
      </div>
    </section>
  );
}
