"use client";

import React, { useState } from "react";
import Image from "next/image";

const projects = [
  {
    id: "proj-1",
    title: "Arkio - Architecture & Interior WordPress Theme",
    category: "Architecture / Business",
    image: "/portfolio_screenshots.png",
    imgPos: "object-left",
    href: "#",
  },
  {
    id: "proj-2",
    title: "Follio - Multipurpose Portfolio HTML5 Template",
    category: "Web Design",
    image: "/portfolio_screenshots.png",
    imgPos: "object-center",
    href: "#",
  },
  {
    id: "proj-3",
    title: "Elito - Creative Portfolio HTML5 Template",
    category: "Website / Creative",
    image: "/portfolio_screenshots.png",
    imgPos: "object-right",
    href: "#",
  },
  {
    id: "proj-4",
    title: "Nexus - SaaS Dashboard UI Kit",
    category: "UI/UX Design",
    image: "/portfolio_screenshots.png",
    imgPos: "object-left",
    href: "#",
  },
  {
    id: "proj-5",
    title: "Bloom - E-commerce Fashion Template",
    category: "E-commerce / Fashion",
    image: "/portfolio_screenshots.png",
    imgPos: "object-center",
    href: "#",
  },
];

export default function Portfolio() {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(projects.length / perPage);
  const visible = projects.slice(current * perPage, current * perPage + perPage);

  return (
    <section id="portfolio" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f1a10 0%, #121212 50%, #1a1200 100%)" }}>

      {/* Decorative background glow */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-emerald-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-amber-900/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
          {/* Heading left-aligned */}
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              Recent Work<span className="text-emerald-400">.</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              Must explain to you how all this mistaken idea denouncing pleasure born and give you a complete account.
            </p>
          </div>

          {/* Decorative icon top right */}
          <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400 flex-shrink-0 self-start md:self-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {visible.map((project) => (
            <a
              key={project.id}
              href={project.href}
              className="group block bg-[#1a1a1a] border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover ${project.imgPos} group-hover:scale-105 transition-transform duration-500`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-70" />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-white font-bold text-base leading-snug mb-1 group-hover:text-emerald-400 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm">{project.category}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Carousel Nav */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setCurrent((p) => Math.max(0, p - 1))}
            disabled={current === 0}
            className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrent((p) => Math.min(totalPages - 1, p + 1))}
            disabled={current === totalPages - 1}
            className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
