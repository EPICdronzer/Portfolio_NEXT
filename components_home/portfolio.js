"use client";

import React, { useState } from "react";
import Link from "next/link";
import ImageSlideshow from "@/components/ImageSlideshow";

export default function Portfolio({ initialPortfolios }) {
  const hasData = initialPortfolios && initialPortfolios.length > 0;
  const displayProjects = hasData ? initialPortfolios : [];

  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(displayProjects.length / perPage);
  const visible = displayProjects.slice(current * perPage, current * perPage + perPage);

  return (
    <section
      id="portfolio"
      className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f1a10 0%, #121212 50%, #1a1200 100%)" }}
    >
      <div className="absolute top-0 left-0 w-1/2 h-full bg-emerald-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-amber-900/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              Recent Work<span className="text-emerald-400">.</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              Must explain to you how all this mistaken idea denouncing pleasure born and give you a complete account.
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400 flex-shrink-0 self-start md:self-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
        </div>

        {!hasData ? (
          <div className="w-full max-w-2xl mx-auto my-12 text-center p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">No Dynamic Portfolios Found</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed mb-6 font-light">
                No portfolios added yet. Please check back later!
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
            <div className="flex md:hidden gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide mb-6">
              {displayProjects.map((project) => {
                const allImages = Array.isArray(project.images) && project.images.length > 0 ? project.images : (project.image ? [project.image] : []);
                return (
                  <Link
                    key={project._id || project.id}
                    href={`/portfolio/${project.slug || project._id || project.id}`}
                    className="snap-start flex-shrink-0 w-[75vw] max-w-[280px] group block bg-[#1a1a1a] border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300"
                  >
                    <ImageSlideshow
                      images={allImages}
                      alt={project.title}
                      className="w-full h-44 rounded-none"
                      showDots={allImages.length > 1}
                      showArrows={false}
                    />
                    <div className="p-4">
                      <h3 className="text-white font-bold text-sm leading-snug mb-1 group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2">{project.title}</h3>
                      <p className="text-gray-500 text-xs">{project.category}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Desktop: 3-column grid */}
            <div className="hidden md:block">
              <div className="grid grid-cols-3 gap-6 mb-10">
                {visible.map((project) => {
                  const allImages = Array.isArray(project.images) && project.images.length > 0 ? project.images : (project.image ? [project.image] : []);
                  return (
                    <Link
                      key={project._id || project.id}
                      href={`/portfolio/${project.slug || project._id || project.id}`}
                      className="group block bg-[#1a1a1a] border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
                    >
                      <ImageSlideshow
                        images={allImages}
                        alt={project.title}
                        className="w-full h-72 rounded-none"
                        showDots={allImages.length > 1}
                      />
                      <div className="p-6">
                        <h3 className="text-white font-bold text-base leading-snug mb-1 group-hover:text-emerald-400 transition-colors duration-200">{project.title}</h3>
                        <p className="text-gray-500 text-sm">{project.category}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center gap-3">
                  <button onClick={() => setCurrent((p) => Math.max(0, p - 1))} disabled={current === 0} className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={() => setCurrent((p) => Math.min(totalPages - 1, p + 1))} disabled={current === totalPages - 1} className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              )}
            </div>

            {/* View All Projects Button */}
            {hasData && (
              <div className="flex justify-center mt-12">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 bg-transparent hover:bg-emerald-500 border border-emerald-500/40 text-emerald-400 hover:text-black font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg text-xs tracking-wider uppercase"
                >
                  View All Projects
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
