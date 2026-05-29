"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const blogsDetailed = [
  {
    id: "post-1",
    date: "January 02, 2026",
    readTime: "5 min read",
    author: "Harsh Vashishth",
    category: "Next.js",
    title: "How Next.js App Router Evolves Full-Stack Development Systems",
    desc: "A deep dive into server actions, partial pre-rendering, and fluid React Server Component setups that are changing the digital web.",
    image: "/blog_thumbnails.png",
    imgPos: "object-left",
  },
  {
    id: "post-2",
    date: "January 03, 2026",
    readTime: "4 min read",
    author: "Harsh Vashishth",
    category: "CSS / Design",
    title: "Mastering Tailwind CSS 4.0 Theme Variables for Dark Mode",
    desc: "Learn how the new Tailwind v4 @theme directive allows native HSL CSS custom variable customization for sleek micro-interactions.",
    image: "/blog_thumbnails.png",
    imgPos: "object-center",
  },
  {
    id: "post-3",
    date: "January 05, 2026",
    readTime: "6 min read",
    author: "Harsh Vashishth",
    category: "Python",
    title: "Setting Up High-Performance Async APIs with FastAPI and PostgreSQL",
    desc: "Explore clean architecture, connection pooling, and automated schema generation using tortoise-orm for scalable python services.",
    image: "/blog_thumbnails.png",
    imgPos: "object-right",
  },
  {
    id: "post-4",
    date: "January 08, 2026",
    readTime: "3 min read",
    author: "Harsh Vashishth",
    category: "Java",
    title: "Optimizing JVM Garbage Collection for High-Throughput Spring Boot Servers",
    desc: "Practical advice on tuning Spring Boot memory settings, garbage collectors, and threads for flawless cloud server setups.",
    image: "/blog_thumbnails.png",
    imgPos: "object-left",
  },
  {
    id: "post-5",
    date: "January 12, 2026",
    readTime: "4 min read",
    author: "Harsh Vashishth",
    category: "UI/UX",
    title: "The Subtle Art of Micro-Animations in High-Converting Storefronts",
    desc: "How custom timing curves, spring values, and interactive scaling cards elevate design aesthetics and conversion metrics.",
    image: "/blog_thumbnails.png",
    imgPos: "object-center",
  },
  {
    id: "post-6",
    date: "February 04, 2026",
    readTime: "5 min read",
    author: "Harsh Vashishth",
    category: "FinTech",
    title: "The Rise of UPI 2.0 and What It Means for Indian Developers",
    desc: "Understanding how NPCI's UPI 2.0 stack opens new opportunities for fintech startups and payment app integrations in Bharat.",
    image: "/blog_thumbnails.png",
    imgPos: "object-right",
  },
];

const POSTS_PER_PAGE = 4;

export default function BlogDetail() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);

  // Filter by search
  const filtered = blogsDetailed.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // reset to page 1 on new search
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-[#0a0a0a] py-20 md:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-[-10%] w-[45%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[45%] h-[50%] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

        {/* ── Search Bar ── */}
        <div className="mb-10 flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3 focus-within:border-emerald-500/50 transition-colors duration-300">
          <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search blogs by title, category, author…"
            className="flex-grow bg-transparent text-white text-sm placeholder-gray-600 focus:outline-none"
          />
          {search && (
            <button onClick={() => { setSearch(""); setPage(1); }} className="text-gray-500 hover:text-white transition-colors text-xs">
              ✕ Clear
            </button>
          )}
        </div>

        {/* ── Blog Cards ── */}
        <div className="space-y-5 md:space-y-8">
          {paginated.length === 0 && (
            <div className="text-center py-20 text-gray-500">No blogs found matching "{search}"</div>
          )}

          {paginated.map((post) => {
            const isExpanded = expandedId === post.id;
            return (
              <article
                key={post.id}
                onClick={() => toggleExpand(post.id)}
                className={`group bg-[#111] border rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer
                  ${isExpanded
                    ? "border-emerald-500/30 bg-[#141414] shadow-2xl shadow-black/55"
                    : "border-white/5 hover:border-emerald-500/20 hover:bg-[#141414] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40"
                  }`}
              >
                {/* ── Mobile: compact collapsed header ── */}
                <div className="flex items-center gap-4 p-4 md:hidden">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={post.image} alt={post.title} fill className={`object-cover ${post.imgPos}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold tracking-widest uppercase text-emerald-400">{post.category}</span>
                    <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 mt-0.5">{post.title}</h3>
                  </div>
                  {/* Chevron */}
                  <svg
                    className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* ── Mobile: expanded content ── */}
                <div
                  className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 pb-5" onClick={(e) => e.stopPropagation()}>
                    <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4">
                      <Image src={post.image} alt={post.title} fill className={`object-cover ${post.imgPos}`} />
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3 flex-wrap">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-700" />
                      <span>{post.readTime}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-700" />
                      <span>By {post.author}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.desc}</p>
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-5 py-2.5 rounded-full transition-all duration-300"
                    >
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* ── Desktop: full card (always visible) ── */}
                <div className="hidden md:grid grid-cols-12 gap-6 p-6 items-center">
                  {/* Image */}
                  <div className="relative h-60 min-h-[220px] rounded-2xl overflow-hidden col-span-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className={`object-cover ${post.imgPos} group-hover:scale-105 transition-transform duration-700`}
                    />
                    <span className="absolute top-4 left-4 z-20 text-sm font-extrabold tracking-widest uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="col-span-8 flex flex-col justify-center p-4">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {post.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-zinc-700" />
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.readTime}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-zinc-700" />
                      <span>By {post.author}</span>
                    </div>

                    <h3 className="text-white font-extrabold text-xl md:text-2xl mb-4 group-hover:text-emerald-400 transition-colors duration-200 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">{post.desc}</p>

                    <div>
                      <Link
                        href={`/blog/${post.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-5 py-2.5 rounded-full shadow-lg shadow-emerald-500/20 transition-all duration-300"
                      >
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
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
              >
                {p}
              </button>
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

        {/* ── Results count ── */}
        {search && (
          <p className="text-center text-gray-600 text-xs mt-6">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
          </p>
        )}
      </div>
    </section>
  );
}
