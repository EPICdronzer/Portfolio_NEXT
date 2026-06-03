"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/app/config";
import { useToast } from "@/app/context/ToastContext";

/* ─── Fallback sidebar services (shown when DB has none) ─── */
const FALLBACK_SERVICES = [
  { name: "Web Development",       id: "web-dev" },
  { name: "App Development",       id: "app-dev" },
  { name: "Software Development",  id: "software-dev" },
  { name: "Social Media Marketing",id: "social-media" },
  { name: "Graphic Design",        id: "graphic-design" },
  { name: "Brand Identity",        id: "brand-identity" },
];

export default function SingleBlogDetail({ initialBlog, initialAllServices }) {
  const [formData, setFormData]   = useState({ name: "", email: "", comment: "" });
  const [newsletterName, setNewsletterName] = useState("");
  const { addToast } = useToast();

  /* ── Sidebar services ── */
  const sidebarServices =
    initialAllServices && initialAllServices.length > 0
      ? initialAllServices.map((s) => ({ name: s.title, id: s.slug || s._id }))
      : FALLBACK_SERVICES;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim()) {
      addToast("Please enter your name.", "error");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      addToast("Please enter a valid email address.", "error");
      return;
    }
    if (!formData.comment.trim()) {
      addToast("Please enter a comment.", "error");
      return;
    }

    addToast("Redirecting to WhatsApp...", "success");

    const messageText = `*New Blog Comment on ${title}*
*Name:* ${formData.name}
*Email:* ${formData.email}
*Comment:* ${formData.comment}`;

    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, "_blank");

    setFormData({ name: "", email: "", comment: "" });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterName.trim()) {
      addToast("Please enter your name.", "error");
      return;
    }

    addToast("Redirecting to WhatsApp...", "success");
    const msg = `Hi Harsh, I would like to subscribe to your newsletter. My name is ${newsletterName}.`;
    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, "_blank");
    setNewsletterName("");
  };

  /* ═══════════════════════════════════════
      NO DATA / POST NOT FOUND UI
  ═══════════════════════════════════════ */
  if (!initialBlog) {
    return (
      <section className="bg-[#111111] text-[#dddddd] py-20 px-6 md:px-12 lg:px-24 min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8">
            <svg className="w-9 h-9 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Post Not Found</h1>
          <p className="text-gray-400 leading-relaxed mb-8">
            This blog article hasn&apos;t been published to the database yet, or the link may be incorrect. Head back to browse all available articles.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  /* ═══════════════════════════════════════
      NORMALISE FIELDS FROM MONGODB DOC
  ═══════════════════════════════════════ */
  const title    = initialBlog.title   || "Untitled Post";
  const date     = initialBlog.date    || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" });
  const image    = initialBlog.image;
  const hasImage = image && image !== "" && image !== "/my.png" && image !== "/blog_thumbnails.png";
  const category = initialBlog.category|| "Development";
  const author   = initialBlog.author  || "Harsh Vashishth";
  const readTime = initialBlog.readTime|| "4 min read";

  /* content can be a string (rich text) or array of paragraphs */
  const paragraphs = Array.isArray(initialBlog.content)
    ? initialBlog.content
    : typeof initialBlog.content === "string" && initialBlog.content.trim()
      ? initialBlog.content.split(/\n{2,}/).filter(Boolean)
      : [
          "This article explores modern development practices and engineering principles.",
          "Stay tuned as the full content is published through the administrator dashboard.",
        ];

  /* ═══════════════════════════════════════
      FULL BLOG POST UI
  ═══════════════════════════════════════ */
  return (
    <section className="bg-[#111111] text-[#dddddd] py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* ── LEFT: Main Content (8 cols) ── */}
          <div className="lg:col-span-8 space-y-10">

            {/* Banner image */}
            <div className="relative w-full h-[320px] sm:h-[420px] rounded-3xl overflow-hidden border border-white/5">
              {hasImage ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900/50 flex flex-col items-center justify-center gap-3 border border-white/10 rounded-3xl">
                  <span className="text-4xl text-gray-600">🖼️</span>
                  <span className="text-gray-500 text-sm font-semibold tracking-wide">No photo uploaded</span>
                </div>
              )}
            </div>

            {/* Meta tags */}
            <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
              <span className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
                📅 {date}
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
                ⏱️ {readTime}
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full text-emerald-400">
                🏷️ {category}
              </span>
              <span>By {author}</span>
            </div>

            {/* Title & paragraphs */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 tracking-tight leading-snug">
                {title}
              </h1>
              <div className="space-y-6 text-[#a0a0a0] text-base leading-relaxed font-light">
                {paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Additional Blog Images Gallery */}
            {initialBlog.images && initialBlog.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {initialBlog.images.map((img, idx) => (
                  <div key={idx} className="relative h-60 rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 shadow-md">
                    <img src={img} alt={`Blog additional-${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Code snippet block */}
            <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 font-mono text-xs overflow-x-auto text-emerald-400">
              <span className="text-gray-500">// Example next.js Server Component</span><br />
              <span className="text-purple-400">export async function</span> <span className="text-blue-400">generateMetadata</span>({`{ params }`}) &#123;<br />
              &nbsp;&nbsp;<span className="text-purple-400">const</span> id = <span className="text-purple-400">await</span> params.id;<br />
              &nbsp;&nbsp;<span className="text-purple-400">return</span> &#123; title: <span className="text-amber-300">{"`${id} - Creative Blog`"}</span> &#125;;<br />
              &#125;
            </div>

            {/* Comment form */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-xl mt-6 relative">
              <h2 className="text-2xl font-extrabold text-white mb-2">Leave a Comment</h2>
              <p className="text-[#a0a0a0] text-sm mb-6 font-light">
                Your email address will not be published. Required fields are marked *
              </p>

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

          {/* ── RIGHT: Sidebar (4 cols) ── */}
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

            {/* Services list widget — dynamic from DB */}
            <div className="bg-[#181818] border border-white/5 rounded-2xl p-6">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 relative pb-3">
                Services
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-emerald-500" />
              </h4>
              <ul className="space-y-3">
                {sidebarServices.map((srv) => (
                  <li key={srv.id}>
                    <Link
                      href={`/service/${srv.id}`}
                      className="flex items-center justify-between text-xs font-semibold py-3 border-b border-zinc-800 last:border-0 hover:text-emerald-400 transition-colors text-[#b0b0b0]"
                    >
                      <span>{srv.name}</span>
                      <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter widget */}
            <div className="bg-[#181818] border border-white/5 rounded-2xl p-6">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 relative pb-3">
                Whatsapp Me
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-emerald-500" />
              </h4>
              
              <form
                onSubmit={handleNewsletterSubmit}
                className="space-y-3"
              >
                <input
                  type="text"
                  required
                  value={newsletterName}
                  onChange={(e) => setNewsletterName(e.target.value)}
                  placeholder="Enter Name"
                  className="w-full bg-[#111] border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500 text-white"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl text-xs transition-colors"
                >
                  Send
                </button>
                <p className="text-sm text-gray-600 mt-4 leading-normal">
                By click on send you agree to our{" "}
                <Link href="/privacy" className="text-gray-400 hover:underline">
                  Privacy Policy
                </Link>
              </p>
              </form>
            </div>

            {/* Social Media widget */}
            <div className="bg-[#181818] border border-white/5 rounded-2xl p-6">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 relative pb-3">
                Follow Me
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-emerald-500" />
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {siteConfig.socialLinks.linkedin && siteConfig.socialLinks.linkedin !== "#" && (
                  <a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/30 hover:bg-zinc-800 transition-all text-xs font-semibold text-gray-300 hover:text-white">
                    <span className="text-sky-400">🔗</span> LinkedIn
                  </a>
                )}
                {siteConfig.socialLinks.github && siteConfig.socialLinks.github !== "#" && (
                  <a href={siteConfig.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/30 hover:bg-zinc-800 transition-all text-xs font-semibold text-gray-300 hover:text-white">
                    <span className="text-white">💻</span> GitHub
                  </a>
                )}
                {siteConfig.socialLinks.facebook && siteConfig.socialLinks.facebook !== "#" && (
                  <a href={siteConfig.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/30 hover:bg-zinc-800 transition-all text-xs font-semibold text-gray-300 hover:text-white">
                    <span className="text-blue-500">📘</span> Facebook
                  </a>
                )}
                {siteConfig.socialLinks.pinterest && siteConfig.socialLinks.pinterest !== "#" && (
                  <a href={siteConfig.socialLinks.pinterest} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/30 hover:bg-zinc-800 transition-all text-xs font-semibold text-gray-300 hover:text-white">
                    <span className="text-red-500">📌</span> Pinterest
                  </a>
                )}
                {siteConfig.whatsapp && (
                  <a href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/30 hover:bg-zinc-800 transition-all text-xs font-semibold text-gray-300 hover:text-white col-span-2 justify-center">
                    <span className="text-emerald-400">💬</span> WhatsApp Me
                  </a>
                )}
              </div>
            </div>

            {/* Recent posts widget */}
            <div className="bg-[#181818] border border-white/5 rounded-2xl p-6">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 relative pb-3">
                Back to Blog
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-emerald-500" />
              </h4>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-xs font-bold transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Browse All Articles
              </Link>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}
