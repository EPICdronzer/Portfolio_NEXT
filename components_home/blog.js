"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    id: "post-1",
    date: "January 02, 2025",
    title: "Have evolved over the years sometimes accident.",
    image: "/blog_thumbnails.png",
    imgPos: "object-left",
    href: "#",
  },
  {
    id: "post-2",
    date: "January 03, 2025",
    title: "The Internet tend to repeat predefined chunks.",
    image: "/blog_thumbnails.png",
    imgPos: "object-center",
    href: "#",
  },
  {
    id: "post-3",
    date: "January 05, 2025",
    title: "The standard chunk of used since the interested.",
    image: "/blog_thumbnails.png",
    imgPos: "object-right",
    href: "#",
  },
  {
    id: "post-4",
    date: "January 08, 2025",
    title: "How modern design principles are shaping the web.",
    image: "/blog_thumbnails.png",
    imgPos: "object-left",
    href: "#",
  },
  {
    id: "post-5",
    date: "January 12, 2025",
    title: "A complete guide to mastering UI/UX design.",
    image: "/blog_thumbnails.png",
    imgPos: "object-center",
    href: "#",
  },
];

export default function Blog({ initialBlogs }) {
  const hasData = initialBlogs && initialBlogs.length > 0;
  const displayBlogs = hasData ? initialBlogs : [];

  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(displayBlogs.length / perPage);
  const visible = displayBlogs.slice(current * perPage, current * perPage + perPage);

  return (
    <section id="blog" className="bg-[#111] py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Latest News
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-base leading-relaxed">
            Must explain to you how all this mistaken idea pleasure born
            and give you a complete account.
          </p>
        </div>

        {!hasData ? (
          <div className="w-full max-w-2xl mx-auto my-12 text-center p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500 animate-fadeIn">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4a2 2 0 00-2 2v3m2-7a2 2 0 012-2h1a2 2 0 012 2v7a2 2 0 01-2 2h-1a2 2 0 01-2-2V9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">No Dynamic Blogs Found</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed mb-6 font-light">
                Our administrator hasn't added any blog posts in the backend database yet. Please check back later or get in touch directly!
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25">
                Get in Touch
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Mobile: horizontal scroll carousel */}
            <div className="flex md:hidden gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
              {displayBlogs.map((post) => (
                <Link
                  key={post._id || post.id}
                  href={post.href || `/blog/${post.slug || post._id || post.id}`}
                  className="snap-start flex-shrink-0 w-[75vw] max-w-[280px] group block bg-[#1a1a1a] border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className={`object-cover ${post.imgPos} group-hover:scale-105 transition-transform duration-500`} />
                  </div>
                  <div className="p-4">
                    <span className="inline-block text-sm text-gray-500 border border-zinc-700 px-2 py-0.5 rounded-full mb-2 font-medium">{post.date}</span>
                    <h3 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2">{post.title}</h3>
                    <span className="inline-flex items-center gap-1 text-gray-500 text-xs font-semibold">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      Read
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop: grid with side arrows */}
            <div className="hidden md:block">
              <div className="relative flex items-center gap-4">
                <button
                  onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                  disabled={current === 0}
                  className="flex w-10 h-10 rounded-full border border-zinc-700 items-center justify-center text-gray-400 hover:text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
                  aria-label="Previous posts"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="grid grid-cols-3 gap-6 flex-grow">
                  {visible.map((post) => (
                    <Link
                      key={post._id || post.id}
                      href={post.href || `/blog/${post.slug || post._id || post.id}`}
                      className="group block bg-[#1a1a1a] border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <Image src={post.image} alt={post.title} fill className={`object-cover ${post.imgPos} group-hover:scale-105 transition-transform duration-500`} />
                      </div>
                      <div className="p-6">
                        <span className="inline-block text-xs text-gray-500 border border-zinc-700 px-3 py-1 rounded-full mb-4 font-medium">{post.date}</span>
                        <h3 className="text-white font-bold text-base leading-snug mb-4 group-hover:text-emerald-400 transition-colors duration-200">{post.title}</h3>
                        <span className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm font-semibold transition-colors duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                          Post Details
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                <button
                  onClick={() => setCurrent((c) => Math.min(totalPages - 1, c + 1))}
                  disabled={current === totalPages - 1}
                  className="flex w-10 h-10 rounded-full border border-zinc-700 items-center justify-center text-gray-400 hover:text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
                  aria-label="Next posts"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </section>
  );
}
