"use client";

import React, { useState } from "react";
import Link from "next/link";

const allServicesList = [
  { name: "Web Development", id: "web-dev", count: 5 },
  { name: "App Development", id: "app-dev", count: 7 },
  { name: "Software Development", id: "software-dev", count: 3 },
  { name: "Social Media Marketing", id: "social-media", count: 8 },
  { name: "Graphic Design", id: "graphic-design", count: 6 },
  { name: "Brand Identity", id: "brand-identity", count: 2 },
];

const blogPostsData = {
  "post-1": {
    title: "How Next.js App Router Evolves Full-Stack Development Systems",
    date: "January 02, 2026",
    readTime: "5 min read",
    category: "Next.js",
    author: "Harsh Vashishth",
    content: [
      "The web development landscape has transformed dramatically since the introduction of Server Components. With Next.js leading the way, developers are now able to leverage server-side logic and hybrid page rendering structures right inside standard React configurations.",
      "By moving heavy queries directly into async Server Components, we eliminate unnecessary REST layers and API overheads. Client bundles are drastically optimized since the parsing code stays entirely on the server side.",
      "Furthermore, the new Next.js partial pre-rendering (PPR) pipelines allow static sections to load instantly while dynamic modules stream asynchronously. It marks a massive leap forward in both user performance scores and total search rank optimizations.",
    ],
  },
  "post-2": {
    title: "Mastering Tailwind CSS 4.0 Theme Variables for Dark Mode",
    date: "January 03, 2026",
    readTime: "4 min read",
    category: "CSS / Design",
    author: "Harsh Vashishth",
    content: [
      "Tailwind CSS v4.0 introduces native CSS variable engine integration. Instead of massive config objects, styling systems are declared directly in modern CSS themes using simple standard variables.",
      "This architecture enables dynamic HSL customization on client machines. You can shift branding colors or responsive grid schemes instantly without triggering complex rebuild processes.",
      "Adding custom micro-interactions like floating icons or glassmorphic cards is now incredibly seamless, granting web portfolios premium aesthetics that immediately charm daily visitors.",
    ],
  },
};

const defaultBlogFallback = (title) => ({
  title: title || "Blog Details",
  date: "May 28, 2026",
  readTime: "4 min read",
  category: "Development",
  author: "Harsh Vashishth",
  content: [
    "Exploring modern technologies allows us to solve complex challenges with clean solutions. Standard design structures combined with efficient backend systems grant businesses ultimate load speed capabilities.",
    "By writing test-driven code, implementing secure data indexes, and structuring modular functions, we ensure code stays maintainable through multiple growth phases.",
    "Stay tuned to this section as we continue to post details regarding cloud hosting, API design paradigms, and responsive design solutions.",
  ],
});

export default function SingleBlogDetail({ postId }) {
  const [formData, setFormData] = useState({ name: "", email: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const formatTitle = (id) => {
    return id
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const currentPost = blogPostsData[postId] || defaultBlogFallback(formatTitle(postId));

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", comment: "" });
    setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <section className="bg-[#111111] text-[#dddddd] py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* ── LEFT: Main Content (8 Cols) ── */}
          <div className="lg:col-span-8 space-y-10">
            {/* Banner picture */}
            <div className="relative w-full h-[320px] sm:h-[420px] rounded-3xl overflow-hidden border border-white/5">
              <img
                src="/my.png"
                alt={currentPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Meta Tags */}
            <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
              <span className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
                📅 {currentPost.date}
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
                ⏱️ {currentPost.readTime}
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full text-emerald-400">
                🏷️ {currentPost.category}
              </span>
              <span>By {currentPost.author}</span>
            </div>

            {/* Title & Blog Paragraphs */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 tracking-tight leading-snug">
                {currentPost.title}
              </h2>
              <div className="space-y-6 text-[#a0a0a0] text-base leading-relaxed font-light">
                {currentPost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Code Block Snippet (Highly Technical & Authentic) */}
            <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 font-mono text-xs overflow-x-auto text-emerald-400">
              <span className="text-gray-500">// Example next.js Server Component</span><br />
              <span className="text-purple-400">export async function</span> <span className="text-blue-400">generateMetadata</span>({`{ params }`}) &#123;<br />
              &nbsp;&nbsp;<span className="text-purple-400">const</span> id = <span className="text-purple-400">await</span> params.id;<br />
              &nbsp;&nbsp;<span className="text-purple-400">return</span> &#123; title: <span className="text-amber-300">`$&#123;id&#125; - Creative Blog`</span> &#125;;<br />
              &#125;
            </div>

            {/* Leave a Comment form */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-xl mt-6 relative">
              <h3 className="text-2xl font-extrabold text-white mb-2">Leave a Comment</h3>
              <p className="text-[#a0a0a0] text-sm mb-6 font-light">
                Your email address will not be published. Required fields are marked *
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold">
                  ✓ Comment submitted! It will appear once approved by the administrator.
                </div>
              )}

              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name*"
                    className="w-full bg-[#1c1c1c] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm"
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your Email*"
                    className="w-full bg-[#1c1c1c] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
                <textarea
                  rows={4}
                  required
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Comment..."
                  className="w-full bg-[#1c1c1c] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm resize-none"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2 group"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>

          {/* ── RIGHT: Sidebar (4 Cols) ── */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Search widget */}
            <div className="bg-[#181818] border border-white/5 rounded-2xl p-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search Post.."
                  className="flex-grow bg-[#111111] border border-zinc-800 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500"
                />
                <button className="w-10 h-10 bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-black rounded-xl transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Services List widget */}
            <div className="bg-[#181818] border border-white/5 rounded-2xl p-6">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 relative pb-3">
                Services
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-emerald-500" />
              </h4>
              <ul className="space-y-3">
                {allServicesList.map((srv) => (
                  <li key={srv.id}>
                    <Link
                      href={`/service/${srv.id}`}
                      className="flex items-center justify-between text-xs font-semibold py-3 border-b border-zinc-800 last:border-0 hover:text-emerald-400 transition-colors text-[#b0b0b0]"
                    >
                      <span>{srv.name}</span>
                      <span className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] text-gray-500 flex items-center justify-center font-bold">
                        {srv.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter widget */}
            <div className="bg-[#181818] border border-white/5 rounded-2xl p-6">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 relative pb-3">
                Newsletter
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-emerald-500" />
              </h4>
              <p className="text-xs text-[#a0a0a0] leading-relaxed mb-5">
                Join 20,000 Subscribers!
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Successfully signed up!");
                }}
                className="space-y-3"
              >
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full bg-[#111] border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500 text-white"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl text-xs transition-colors"
                >
                  Sign Up
                </button>
              </form>
            </div>

            {/* Instagram Grid widget */}
            <div className="bg-[#181818] border border-white/5 rounded-2xl p-6">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 relative pb-3">
                Instagram
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-emerald-500" />
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((imgIdx) => (
                  <div key={imgIdx} className="relative aspect-square rounded-lg overflow-hidden border border-zinc-800 group cursor-pointer bg-zinc-900 flex items-center justify-center text-sm">
                    💻
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}
