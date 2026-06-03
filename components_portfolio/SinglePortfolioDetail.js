"use client";

import React from "react";
import Link from "next/link"; // Wait, Next.js link should be import Link from "next/link" (let's keep existing)
import ImageSlideshow from "@/components/ImageSlideshow";
import { parseMarkdownToJSX } from "@/backend/lib/markdown";

export default function SinglePortfolioDetail({ initialPortfolio }) {
  const project = initialPortfolio || null;

  if (!project) {
    return (
      <section className="bg-[#0a0a0a] min-h-screen py-32 flex items-center justify-center">
        <div className="relative z-10 max-w-lg mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8">
            <svg className="w-9 h-9 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 leading-relaxed mb-8">This project hasn&apos;t been added to the database yet.</p>
          <Link href="/portfolio" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full transition-all duration-300">
            ← Back to Portfolio
          </Link>
        </div>
      </section>
    );
  }

  const title    = project.title    || "Untitled Project";
  const category = project.category || "Uncategorized";
  const href     = project.href     || "#";
  const desc     = project.desc     || "";
  const details  = project.details  || "";
  const tech     = Array.isArray(project.tech) ? project.tech : (project.tech ? [project.tech] : []);

  // Merge all images: cover image + images array, deduplicated
  const allImages = Array.isArray(project.images) && project.images.length > 0 ? project.images : (project.image ? [project.image] : []);

  return (
    <section className="bg-[#0a0a0a] min-h-screen py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-[50%] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold mb-10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Portfolio
        </Link>

        {/* Hero — auto slideshow if multiple images */}
        <div className="mb-12 shadow-2xl shadow-black/50">
          <ImageSlideshow
            images={allImages}
            alt={title}
            className="w-full h-[340px] md:h-[480px] rounded-3xl"
            interval={4000}
            showDots={true}
            showArrows={true}
          />
        </div>

        {/* Header */}
        <div className="mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            {category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">{title}</h1>
          {desc && <div className="text-xl text-gray-300 leading-relaxed max-w-3xl">{parseMarkdownToJSX(desc)}</div>}
        </div>

        {/* Details card */}
        {(details || tech.length > 0) && (
          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12 mb-12">
            {details && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">Project Overview</h2>
                <div className="text-gray-400 leading-loose text-lg">{parseMarkdownToJSX(details)}</div>
              </>
            )}
            {tech.length > 0 && (
              <div className={details ? "mt-10 pt-10 border-t border-white/10" : ""}>
                <h3 className="text-lg font-bold text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {tech.map((t) => (
                    <span key={t} className="bg-white/5 border border-white/10 text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {href && href !== "#" && (
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full font-bold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30">
              View Live Project
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          <Link href="/portfolio"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/10 hover:border-emerald-500/40 text-white hover:text-emerald-400 rounded-full font-bold transition-all duration-300">
            ← Browse All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
