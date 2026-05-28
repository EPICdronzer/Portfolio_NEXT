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

export default function Blog() {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(posts.length / perPage);
  const visible = posts.slice(current * perPage, current * perPage + perPage);

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

        {/* Blog Cards with side nav */}
        <div className="relative flex items-center gap-4">
          {/* Left Arrow */}
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="hidden md:flex w-10 h-10 rounded-full border border-zinc-700 items-center justify-center text-gray-400 hover:text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
            aria-label="Previous posts"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
            {visible.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group block bg-[#1a1a1a] border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className={`object-cover ${post.imgPos} group-hover:scale-105 transition-transform duration-500`}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="inline-block text-xs text-gray-500 border border-zinc-700 px-3 py-1 rounded-full mb-4 font-medium">
                    {post.date}
                  </span>
                  <h3 className="text-white font-bold text-base leading-snug mb-4 group-hover:text-emerald-400 transition-colors duration-200">
                    {post.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm font-semibold transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    Post Details
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => setCurrent((c) => Math.min(totalPages - 1, c + 1))}
            disabled={current === totalPages - 1}
            className="hidden md:flex w-10 h-10 rounded-full border border-zinc-700 items-center justify-center text-gray-400 hover:text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
            aria-label="Next posts"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden justify-center gap-3 mt-8">
          <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}
            className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={() => setCurrent((c) => Math.min(totalPages - 1, c + 1))} disabled={current === totalPages - 1}
            className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
