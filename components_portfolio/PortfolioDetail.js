"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const projectsDetailed = [
  {
    id: "proj-1",
    title: "Arkio - Architecture & Interior WordPress Theme",
    category: "WordPress",
    desc: "A fully responsive, high-performance interior design and architectural WordPress theme featuring custom page-builders.",
    image: "/portfolio_screenshots.png",
    imgPos: "object-left",
    href: "https://github.com/EPICdronzer",
  },
  {
    id: "proj-2",
    title: "Follio - Multipurpose Portfolio HTML5 Template",
    category: "Web Design",
    desc: "A state-of-the-art multipage portfolio template designed with fluid micro-interactions and HSL customizable themes.",
    image: "/portfolio_screenshots.png",
    imgPos: "object-center",
    href: "https://github.com/EPICdronzer",
  },
  {
    id: "proj-3",
    title: "Harsh Vashishth - Creative Portfolio HTML5 Template",
    category: "Creative",
    desc: "A premium, award-winning creative developer portfolio with custom canvas animations and smooth page transitions.",
    image: "/portfolio_screenshots.png",
    imgPos: "object-right",
    href: "https://github.com/EPICdronzer",
  },
  {
    id: "proj-4",
    title: "Nexus - SaaS Dashboard UI Kit",
    category: "UI/UX Design",
    desc: "A comprehensive dashboard analytics UI kit with over 150 reusable layout components and dark mode systems.",
    image: "/portfolio_screenshots.png",
    imgPos: "object-left",
    href: "https://github.com/EPICdronzer",
  },
  {
    id: "proj-5",
    title: "Bloom - E-commerce Fashion Template",
    category: "E-commerce",
    desc: "A high-conversion fashion e-commerce storefront with optimized checkouts and fluid layout grids.",
    image: "/portfolio_screenshots.png",
    imgPos: "object-center",
    href: "https://github.com/EPICdronzer",
  },
];

export default function PortfolioDetail() {
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", "WordPress", "Web Design", "Creative", "UI/UX Design", "E-commerce"];

  const filteredProjects = projectsDetailed.filter((p) => {
    if (activeFilter === "All") return true;
    return p.category === activeFilter;
  });

  return (
    <section className="bg-[#0a0a0a] py-20 md:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-[-10%] w-[45%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[45%] h-[50%] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Category Filters */}
        <div className="flex justify-center gap-3 mb-16 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                  : "bg-white/[0.03] text-gray-300 hover:bg-white/[0.06] hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.id}`}
              className="group block bg-[#111] border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/30 hover:bg-[#151515] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/60 cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover ${project.imgPos} group-hover:scale-105 transition-transform duration-700`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80" />

                {/* Pill overlay */}
                <span className="absolute top-4 left-4 z-20 text-[10px] font-extrabold tracking-widest uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              {/* Info Frame */}
              <div className="p-8">
                <h3 className="text-white font-extrabold text-lg leading-snug mb-3 group-hover:text-emerald-400 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {project.desc}
                </p>

                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider group-hover:underline">
                  View Project
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-base">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
