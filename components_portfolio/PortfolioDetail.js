"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const projectsDetailed = [
  {
    id: "proj-1",
    title: "DesiCart - Saree & Ethnic Wear E-commerce",
    category: "E-commerce . UI Design",
    desc: "A high-conversion fashion e-commerce storefront tailored for Indian ethnic wear with UPI integrated checkouts.",
    image: "/portfolio_screenshots.png",
    aspectRatio: "16/9",
  },
  {
    id: "proj-2",
    title: "PayBharat - UPI Payment Dashboard",
    category: "FinTech . Web App",
    desc: "A comprehensive analytics UI kit for local businesses to track UPI transactions and settlements in real-time.",
    image: "/portfolio_screenshots.png",
    aspectRatio: "3/4",
  },
  {
    id: "proj-3",
    title: "Mumbai Metro Transit App Concept",
    category: "UI/UX Design . Mobile",
    desc: "A conceptual redesign of the Mumbai Metro navigation app featuring Marathi localization and quick ticket booking.",
    image: "/portfolio_screenshots.png",
    aspectRatio: "4/5",
  },
  {
    id: "proj-4",
    title: "Namaste - Indian Social Network",
    category: "Branding . Web Design",
    desc: "A vibrant, localized social platform focusing on regional languages and community building across Tier-2 and Tier-3 cities.",
    image: "/portfolio_screenshots.png",
    aspectRatio: "1/1",
  },
  {
    id: "proj-5",
    title: "Swad - Food Delivery UI Kit",
    category: "Mobile . Art Direction",
    desc: "A premium, award-winning food delivery app concept with custom animations tailored for the busy streets of Delhi.",
    image: "/portfolio_screenshots.png",
    aspectRatio: "16/10",
  },
];

const ITEMS_PER_PAGE = 4;

export default function PortfolioDetail() {
  const [activeFilter, setActiveFilter] = useState("All Product");
  const [tappedCard, setTappedCard] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const categories = ["All Product", "Branding", "UI/UX Design", "E-commerce", "FinTech"];

  const filteredProjects = projectsDetailed.filter((p) => {
    const matchesFilter = activeFilter === "All Product" || p.category.includes(activeFilter);
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginated = filteredProjects.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = (cat) => {
    setActiveFilter(cat);
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCardTap = (id) => {
    setTappedCard((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-[#1c1c1c] py-20 md:py-28 relative overflow-hidden min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── Search Bar ── */}
        <div className="mb-8 flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3 focus-within:border-emerald-500/50 transition-colors duration-300">
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

        {/* Category Filters */}
        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`text-[11px] font-bold tracking-wider transition-colors duration-300 ${
                activeFilter === cat
                  ? "text-emerald-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Project Grid */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-500">No projects found matching &ldquo;{search}&rdquo;</div>
        )}
        <div className="columns-1 md:columns-2 gap-8 space-y-8">
          {filteredProjects.map((project) => {
            const isActive = tappedCard === project.id;
            return (
              <div
                key={project.id}
                onClick={() => handleCardTap(project.id)}
                className="group relative block break-inside-avoid cursor-pointer overflow-hidden"
                style={{ aspectRatio: project.aspectRatio }}
              >
                {/* Image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover opacity-90 transition-all duration-700 ease-out ${
                    isActive
                      ? "scale-110 grayscale-0"
                      : "grayscale group-hover:scale-110 group-hover:grayscale-0"
                  }`}
                />

                {/* Dark gradient base — always visible, subtle */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Overlay — slides up from bottom on hover (desktop) OR on tap (mobile) */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-500 ease-out bg-gradient-to-t from-black/90 via-black/50 to-transparent ${
                    isActive
                      ? "translate-y-0"
                      : "translate-y-full group-hover:translate-y-0"
                  }`}
                >
                  {/* Tap-dismiss hint on mobile */}
                  {isActive && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setTappedCard(null); }}
                      className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white text-xs md:hidden"
                      aria-label="Close"
                    >✕</button>
                  )}

                  {/* Category pill */}
                  <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-400 mb-2">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-white font-extrabold text-lg leading-snug mb-4 tracking-tight">
                    {project.title}
                  </h3>

                  {/* Read More button — stops propagation so click doesn't toggle off */}
                  <Link
                    href={`/portfolio/${project.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-5 py-2.5 rounded-full shadow-lg shadow-emerald-500/30 transition-all duration-300 w-fit group/btn"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 transform group-hover/btn:translate-x-1 transition-transform duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
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
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
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
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        )}
        {search && filteredProjects && (
          <p className="text-center text-gray-600 text-xs mt-6">{filteredProjects.length} result{filteredProjects.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;</p>
        )}
      </div>
    </section>
  );
}
