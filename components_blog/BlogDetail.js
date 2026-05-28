"use client";

import React from "react";
import Image from "next/image";

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
    href: "https://github.com/EPICdronzer",
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
    href: "https://github.com/EPICdronzer",
  },
  {
    id: "post-3",
    date: "January 05, 2026",
    readTime: "6 min read",
    author: "Harsh Vashishth",
    category: "Python",
    title: "Setting Up High-Performance Async APIs with FastAPIs and PostgreSQL",
    desc: "Explore clean architecture, connection pooling, and automated schema generation using tortoise-orm for scalable python services.",
    image: "/blog_thumbnails.png",
    imgPos: "object-right",
    href: "https://github.com/EPICdronzer",
  },
  {
    id: "post-4",
    date: "January 08, 2026",
    readTime: "3 min read",
    author: "Harsh Vashishth",
    category: "Java",
    title: "Optimizing JVM Garbage Collection models for High-Throughput Web Servers",
    desc: "Practical advice on tuning Spring Boot memory settings, garbage collectors, and threads for flawless cloud server setups.",
    image: "/blog_thumbnails.png",
    imgPos: "object-left",
    href: "https://github.com/EPICdronzer",
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
    href: "https://github.com/EPICdronzer",
  },
];

export default function BlogDetail() {
  return (
    <section className="bg-[#0a0a0a] py-20 md:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-[-10%] w-[45%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[45%] h-[50%] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="space-y-12">
          {blogsDetailed.map((post) => (
            <article
              key={post.id}
              className="group bg-[#111] border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/20 hover:bg-[#141414] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/55 grid grid-cols-1 md:grid-cols-12 gap-6 p-6 items-center"
            >
              {/* Image box */}
              <div className="relative h-60 md:h-full min-h-[220px] rounded-2xl overflow-hidden md:col-span-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className={`object-cover ${post.imgPos} group-hover:scale-105 transition-transform duration-700`}
                />
                <span className="absolute top-4 left-4 z-20 text-[10px] font-extrabold tracking-widest uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              {/* Text content box */}
              <div className="md:col-span-8 flex flex-col justify-center p-4">
                {/* Meta details */}
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

                {/* Title */}
                <h3 className="text-white font-extrabold text-xl md:text-2xl mb-4 group-hover:text-emerald-400 transition-colors duration-200 leading-snug">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                  {post.desc}
                </p>

                {/* Bottom link */}
                <div>
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider group-hover:underline"
                  >
                    Read Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
