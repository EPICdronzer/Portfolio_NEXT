"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// For demo purposes, we will mock the detailed data for a portfolio project
// In a real application, you might fetch this from an API or a local data store
const getPortfolioData = (id) => {
  const data = {
    "proj-1": {
      title: "Arkio - Architecture & Interior WordPress Theme",
      category: "WordPress",
      desc: "A fully responsive, high-performance interior design and architectural WordPress theme featuring custom page-builders.",
      image: "/portfolio_screenshots.png",
      imgPos: "object-left",
      href: "https://github.com/EPICdronzer",
      details: "This theme was built with custom post types and advanced custom fields to provide maximum flexibility for architecture firms. It includes a custom drag-and-drop builder, optimized asset delivery, and SEO-friendly markup.",
      tech: ["WordPress", "PHP", "React", "SCSS", "MySQL"],
    },
    "proj-2": {
      title: "Follio - Multipurpose Portfolio HTML5 Template",
      category: "Web Design",
      desc: "A state-of-the-art multipage portfolio template designed with fluid micro-interactions and HSL customizable themes.",
      image: "/portfolio_screenshots.png",
      imgPos: "object-center",
      href: "https://github.com/EPICdronzer",
      details: "Follio was created to offer a premium, agency-level portfolio experience out of the box. It features a unique navigation system, canvas-based distortions, and an easily customizable CSS variable system.",
      tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "Three.js"],
    },
    "proj-3": {
      title: "Harsh Vashishth - Creative Portfolio HTML5 Template",
      category: "Creative",
      desc: "A premium, award-winning creative developer portfolio with custom canvas animations and smooth page transitions.",
      image: "/portfolio_screenshots.png",
      imgPos: "object-right",
      href: "https://github.com/EPICdronzer",
      details: "Designed as a personal showcase, this project pushes the boundaries of web GL and creative coding. It features a custom WebGL pipeline for image transitions and a robust PJAX routing system.",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "WebGL"],
    },
    "proj-4": {
      title: "Nexus - SaaS Dashboard UI Kit",
      category: "UI/UX Design",
      desc: "A comprehensive dashboard analytics UI kit with over 150 reusable layout components and dark mode systems.",
      image: "/portfolio_screenshots.png",
      imgPos: "object-left",
      href: "https://github.com/EPICdronzer",
      details: "Nexus solves the problem of repetitive dashboard building by providing a massive, cohesive component library. Every element is meticulously crafted in Figma and perfectly translated into React components.",
      tech: ["Figma", "React", "Tailwind CSS", "Chart.js"],
    },
    "proj-5": {
      title: "Bloom - E-commerce Fashion Template",
      category: "E-commerce",
      desc: "A high-conversion fashion e-commerce storefront with optimized checkouts and fluid layout grids.",
      image: "/portfolio_screenshots.png",
      imgPos: "object-center",
      href: "https://github.com/EPICdronzer",
      details: "Bloom is designed to maximize conversion rates with a frictionless checkout process and visually stunning product displays. It integrates seamlessly with headless CMS solutions.",
      tech: ["Next.js", "Shopify", "GraphQL", "Tailwind CSS"],
    }
  };

  return data[id] || {
    title: "Project Not Found",
    category: "Unknown",
    desc: "The project you are looking for does not exist or has been removed.",
    image: "/portfolio_screenshots.png",
    imgPos: "object-center",
    href: "#",
    details: "No additional details available.",
    tech: [],
  };
};

export default function SinglePortfolioDetail() {
  const params = useParams();
  const projectId = params?.id || "proj-1";
  const project = getPortfolioData(projectId);

  return (
    <section className="bg-[#0a0a0a] min-h-screen py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-1/2 h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-[50%] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold mb-10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Portfolio
        </Link>

        {/* Hero Image */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-black/50 border border-white/5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover ${project.imgPos}`}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
        </div>

        {/* Header Info */}
        <div className="mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            {project.title}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
            {project.desc}
          </p>
        </div>

        {/* Project Details Content */}
        <div className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Project Overview</h2>
          <div className="prose prose-invert prose-emerald max-w-none">
            <p className="text-gray-400 leading-loose text-lg">
              {project.details}
            </p>
          </div>
          
          <div className="mt-10 pt-10 border-t border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.tech && project.tech.map((tech) => (
                <span key={tech} className="bg-white/5 border border-white/10 text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full font-bold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30"
          >
            View Live Project
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
