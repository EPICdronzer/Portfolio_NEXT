"use client";

import React, { useState } from "react";

const servicesDetailed = [
  {
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

export default function ServiceDetail() {
  const [activeCat, setActiveCat] = useState("Development");

  return (
    <section className="bg-[#0a0a0a] py-20 md:py-28 relative overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute top-0 right-[-10%] w-[40%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[45%] h-[50%] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {["Development", "Design", "Marketing"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 ${
                activeCat === cat
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                  : "bg-white/[0.03] text-gray-300 hover:bg-white/[0.06] hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Detailed Service Show */}
        {servicesDetailed
          .filter((item) => item.category === activeCat)
          .map((item) => (
            <div key={item.title} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-fadeIn">
              {/* Card visual details left */}
              <div className="lg:col-span-5">
                <div className={`relative p-10 rounded-3xl bg-gradient-to-br ${item.color} shadow-2xl overflow-hidden group`}>
                  {/* Decorative mesh */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                  <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                  <div className="relative z-10 flex flex-col h-full text-white">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-10 shadow-inner group-hover:scale-105 transition-transform duration-500">
                      {item.icon}
                    </div>

                    <h3 className="text-3xl font-extrabold tracking-tight mb-2">{item.title}</h3>
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
                <h4 className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-4">Service Details</h4>
                <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">{item.title}</h2>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">{item.desc}</p>

                <h5 className="text-white font-bold text-base mb-4 tracking-wide">Key Features & Deliverables:</h5>
                <ul className="space-y-4">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-300 text-sm leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
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
