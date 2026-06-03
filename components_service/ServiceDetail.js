"use client";

import React, { useState } from "react";
import Link from "next/link";
import { stripMarkdown, parseInline } from "@/backend/lib/markdown";


const servicesDetailed = [
  {
    id: "web-dev",
    category: "Development",
    title: "Full-Stack Development",
    subtitle: "Scalable, Secure, and Blazing Fast Web Applications",
    desc: "I build robust and highly scalable backends combined with incredibly responsive frontends. Using cutting-edge technologies like Next.js, Node.js, and Java, I write production-ready code optimized for speed and reliability.",
    tech: ["Next.js", "React", "Node.js", "Express", "Java", "Python", "MongoDB", "PostgreSQL"],
    features: [
      "Custom API architecture & seamless third-party integrations.",
      "Optimized database indexing and robust serverless endpoints.",
      "Bulletproof authentication and role-based access control.",
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "ui-ux",
    category: "Design",
    title: "UI/UX & Brand Design",
    subtitle: "Crafting Stunning and Delightful User Experiences",
    desc: "Good design is more than just aesthetics; it's about usability and emotion. I create high-fidelity, interactive prototypes and premium branding materials that stand out and connect deeply with users.",
    tech: ["Figma", "Sketch", "Photoshop", "Illustrator", "Tailwind CSS", "Framer Motion"],
    features: [
      "Intuitive wireframes and interactive web/app user flows.",
      "Cohesive brand color palettes, styling tokens, and modern typography.",
      "Subtle micro-animations that breathe life into interfaces.",
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "seo",
    category: "Marketing",
    title: "Digital Marketing & SEO",
    subtitle: "Organic Traffic Growth & Data-Driven Brand Authority",
    desc: "Your product deserves to be seen. I implement advanced on-page, off-page, and technical SEO strategies along with targeted growth campaigns that position your business at the top of search rankings.",
    tech: ["Google Analytics", "SEMrush", "SEO Audits", "Content Strategy", "Speed Optimization"],
    features: [
      "Technical SEO auditing, rapid page loading speeds, and perfect Core Web Vitals.",
      "High-converting landing page layouts and search intent optimization.",
      "Social media integration and analytics tracking models.",
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    color: "from-indigo-500 to-purple-600",
  },
];

const getServiceIcon = (name) => {
  switch (name) {
    case "phone":
    case "app":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3" />
        </svg>
      );
    case "software":
    case "code":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
        </svg>
      );
    case "design":
    case "ui":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      );
    case "brand":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
      );
    case "seo":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      );
  }
};

export default function ServiceDetail({ initialServices }) {
  const hasData = initialServices && initialServices.length > 0;
  const [activeCat, setActiveCat] = useState("Development");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const SERVICES_PER_PAGE = 3;

  const toggleAccordion = (id) => setExpandedId(prev => prev === id ? null : id);

  const displayData = hasData
    ? initialServices.map((item) => ({
        id: item.slug || item._id,
        category: item.category || "Development",
        title: item.title,
        subtitle: item.title + " Solutions",
        desc: item.desc,
        tech: item.category === "Development" ? ["React", "Next.js", "Node.js", "MongoDB"] : (item.category === "Design" ? ["Figma", "UI/UX", "Branding"] : ["SEO", "AdWords", "Analytics"]),
        features: [item.desc],
        icon: getServiceIcon(item.iconName || "code"),
        color: item.category === "Development" ? "from-emerald-500 to-teal-600" : (item.category === "Design" ? "from-amber-400 to-orange-500" : "from-indigo-500 to-purple-600"),
      }))
    : [];

  const filtered = displayData.filter((item) => {
    const matchesCat = item.category === activeCat;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.tech.some((t) => t.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / SERVICES_PER_PAGE);
  const paginated = filtered.slice((page - 1) * SERVICES_PER_PAGE, page * SERVICES_PER_PAGE);

  return (
    <section className="bg-[#0a0a0a] py-20 md:py-28 relative overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute top-0 right-[-10%] w-[40%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[45%] h-[50%] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">

        {/* ── NO DATA UI ── */}
        {!hasData ? (
          <div className="w-full max-w-2xl mx-auto my-12 text-center p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">No Services Added Yet</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed mb-6 font-light">
                Services will appear here once added through the administrator dashboard. Check back soon or get in touch directly!
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-6 py-3 rounded-full transition-all duration-300 shadow-lg">
                Get in Touch
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </div>
        ) : (
          <>
        {/* Search Bar */}
        <div className="mb-8 flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3 focus-within:border-emerald-500/50 transition-colors duration-300">
          <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search services by name or technology…"
            className="flex-grow bg-transparent text-white text-sm placeholder-gray-600 focus:outline-none"
          />
          {search && (
            <button onClick={() => { setSearch(""); setPage(1); }} className="text-gray-500 hover:text-white transition-colors text-xs">✕ Clear</button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {["Development", "Design", "Marketing"].map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCat(cat); setPage(1); setExpandedId(null); }}
              className={`px-6 py-2.5 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 ${
                activeCat === cat
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                  : "bg-white/[0.03] text-gray-300 hover:bg-white/[0.06] hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-16 text-gray-500">No services found for &ldquo;{search}&rdquo;</p>
        )}

        {/* ── MOBILE: Blog-style accordion list ── */}
        <div className="flex md:hidden flex-col gap-2 mb-8">
          {paginated.map((item) => {
            const isOpen = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? "border-emerald-500/40 bg-[#131313]" : "border-white/5 bg-[#111111]"
                }`}
              >
                {/* Collapsed row */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                >
                  {/* Icon thumbnail */}
                  <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${item.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 text-white scale-75">{item.icon}</div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">
                      {item.category}
                    </p>
                    <p className={`font-bold text-sm leading-tight line-clamp-2 transition-colors duration-200 ${
                      isOpen ? "text-emerald-400" : "text-white"
                    }`}>
                      {item.title}
                    </p>
                  </div>

                  {/* Chevron */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 flex-shrink-0 transition-all duration-300 ${
                      isOpen ? "rotate-180 text-emerald-400" : "text-zinc-500"
                    }`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded panel */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-56 opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <div className="px-4 pb-4 pt-0 space-y-3 border-t border-white/5">
                    <p className="text-gray-400 text-xs leading-relaxed pt-3">{stripMarkdown(item.desc)}</p>
                    <a
                      href={`/service/${item.id}`}
                      className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-4 py-2 rounded-full transition-colors duration-200"
                    >
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── DESKTOP: Detailed split-card layout ── */}
        <div className="hidden md:block space-y-20">
        {paginated.map((item) => (
            <a href={`/service/${item.id}`} key={item.title} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-fadeIn cursor-pointer group/link block">
              {/* Card visual details left */}
              <div className="lg:col-span-5">
                <div className={`relative p-10 rounded-3xl bg-gradient-to-br ${item.color} shadow-2xl overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-${item.color.split('-')[1]}-500/20`}>
                  {/* Decorative mesh */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                  <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                  <div className="relative z-10 flex flex-col h-full text-white">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-10 shadow-inner group-hover:scale-105 transition-transform duration-500">
                      {item.icon}
                    </div>

                    <h3 className="text-3xl font-extrabold tracking-tight mb-2 group-link-hover:text-emerald-400 transition-colors">{item.title}</h3>
                    <p className="text-white/80 text-sm font-semibold mb-6">{item.subtitle}</p>

                    <div className="w-12 h-1 bg-white/20 rounded-full mb-6" />

                    <div className="space-y-3">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="inline-block text-xs font-bold tracking-wider px-3 py-1.5 rounded-lg bg-white/10 border border-white/5 mr-2 mb-2 hover:bg-white/20 transition-colors duration-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Text explanations right */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <h4 className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-4 group-hover/link:text-emerald-300 transition-colors">Service Details</h4>
                <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight group-hover/link:text-gray-200 transition-colors">{item.title}</h2>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">{stripMarkdown(item.desc)}</p>

                <h5 className="text-white font-bold text-base mb-4 tracking-wide">Key Features & Deliverables:</h5>
                <ul className="space-y-4">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-300 text-sm leading-relaxed">{parseInline(feat)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </a>
        ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16 flex-wrap">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-full text-xs font-bold transition-all duration-200 ${
                  page === p ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30" : "border border-white/10 text-gray-400 hover:text-white hover:border-white"
                }`}>{p}</button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        )}
          </>
        )}
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}
