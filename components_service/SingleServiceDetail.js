"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/app/config";
import { useToast } from "@/app/context/ToastContext";

const allServicesList = [
  { name: "Web Development", id: "web-dev", count: 5 },
  { name: "App Development", id: "app-dev", count: 7 },
  { name: "Software Development", id: "software-dev", count: 3 },
  { name: "Social Media Marketing", id: "social-media", count: 8 },
  { name: "Graphic Design", id: "graphic-design", count: 6 },
  { name: "Brand Identity", id: "brand-identity", count: 2 },
];

const serviceDetailsData = {
  "web-dev": {
    title: "Web Development",
    mainImage: "/aliza_portrait.png", // fallback or nice illustration
    desc1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus dis posuere amet tincidunt commodo, velit. Ipsum, hac nibh fermentum nisi, platea condimentum cursus velit dui. Massa volutpat odio facilisis purus sit elementum. Non, sed velit dictum quam. Id risus pharetra est, at rhoncus, nec ullamcorper tincidunt. Id aliquet duis sollicitudin diam, elit sit. Et nisi in libero facilisis sed est. Elit curabitur amet risus bibendum. Posuere et eget orci, tempor enim.",
    desc2: "Hac nibh fermentum nisi, platea condimentum cursus velit dui. Massa volutpat odio facilisis purus sit elementum. Non, sed velit dictum quam. Id risus pharetra est, at rhoncus, nec ullamcorper tincidunt. Id aliquet duis sollicitudin diam, elit sit.",
    capabilities: [
      "Non saed velit dictum quam risus pharetra esta.",
      "Id risus pharetra est, at rhoncus, nec ullamcorper tincidunt.",
      "Hac nibh fermentum nisi, platea condimentum cursus.",
      "Massa volutpat odio facilisis purus sit elementum.",
      "Elit curabitur amet risus bibendum.",
    ],
    approach: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat suspendisse aenean tellus augue morbi risus. Sit morbi vitae morbi sed urna sed purus. Orci facilisi eros sed pellentesque. Risus id sed tortor sed scelerisque. Vestibulum elit elementum, magna id viverra non, velit. Pretium, eros, porttitor fusce auctor vitae id. Phasellus scelerisque nibh eleifend vel enim mauris purus. Rutrum vel sem adipiscing nisi vulputate molestie scelerisque molestie ultrices. Eu, fusce vulputate diam interdum morbi ac a.",
    process: [
      "Non saed velit dictum quam risus pharetra esta.",
      "Id risus pharetra est, at rhoncus, nec ullamcorper tincidunt.",
      "Hac nibh fermentum nisi, platea condimentum cursus.",
      "Massa volutpat odio facilisis purus sit elementum.",
    ],
    related: [
      { title: "Graphic Design", desc: "Lacus, etiam sed est eu tempus need Temer diam congue laoreet.", icon: "🎨", id: "graphic-design" },
      { title: "Brand Identity", desc: "Lacus, etiam sed est eu tempus need Temer diam congue laoreet.", icon: "🏷️", id: "brand-identity" },
      { title: "UI/UX Design", desc: "Lacus, etiam sed est eu tempus need Temer diam congue laoreet.", icon: "✏️", id: "ui-design" },
    ],
  },
  "app-dev": {
    title: "App Development",
    mainImage: "/aliza_portrait.png",
    desc1: "Transforming ideas into high-performance Android & iOS mobile applications. I design responsive, offline-first mobile systems using native features, ensuring excellent performance and sleek user interfaces.",
    desc2: "With cross-platform frameworks like React Native combined with native optimizations, your apps load instantly and operate securely across all mobile formats.",
    capabilities: [
      "Cross-platform React Native and Flutter frameworks.",
      "Native iOS (Swift) & Android (Kotlin) customizations.",
      "Offline database synching and lightweight data models.",
      "Secure push notification networks and payment modules.",
    ],
    approach: "We begin with comprehensive client flows and storyboards, optimizing user loops before building backend microservices. Automated tests ensure bugs are crushed before any App Store submissions.",
    process: [
      "Discovery & High-Fidelity UI/UX mockups.",
      "Sprint-based front-end & back-end implementation.",
      "Rigorous beta testing on physical testing hardware.",
      "Flawless App Store deployment & analytics setup.",
    ],
    related: [
      { title: "Web Development", desc: "Lacus, etiam sed est eu tempus need Temer diam congue laoreet.", icon: "💻", id: "web-dev" },
      { title: "Software Development", desc: "Lacus, etiam sed est eu tempus need Temer diam congue laoreet.", icon: "⚙️", id: "software-dev" },
      { title: "UI/UX Design", desc: "Lacus, etiam sed est eu tempus need Temer diam congue laoreet.", icon: "✏️", id: "ui-design" },
    ],
  },
  "software-dev": {
    title: "Software Development",
    mainImage: "/aliza_portrait.png",
    desc1: "Designing bulletproof desktop, cloud-native, and backend systems in Java and Python. Focused on modular, test-driven coding architecture, database indexes, and efficient server algorithms.",
    desc2: "I write clean OOP systems equipped with logging, custom errors, and modern security patterns.",
    capabilities: [
      "Clean MVC and Hexagonal architectural styles.",
      "Fast API design using FastAPI, Spring Boot, and Express.",
      "Robust container setups utilizing Docker and Kubernetes.",
      "Relational databases and custom ORM schemas.",
    ],
    approach: "Strict separation of concerns, test-driven engineering, and detailed code reviews. We build scalable pipelines that easily integrate with any existing cloud infrastructure.",
    process: [
      "System design diagramming and DB schemas.",
      "Drafting core business microservices.",
      "Rigorous unit & stress testing runs.",
      "Continuous Integration pipeline setups.",
    ],
    related: [
      { title: "Web Development", desc: "Lacus, etiam sed est eu tempus need Temer diam congue laoreet.", icon: "💻", id: "web-dev" },
      { title: "App Development", desc: "Lacus, etiam sed est eu tempus need Temer diam congue laoreet.", icon: "📱", id: "app-dev" },
      { title: "UI/UX Design", desc: "Lacus, etiam sed est eu tempus need Temer diam congue laoreet.", icon: "✏️", id: "ui-design" },
    ],
  },
};

// Fill in other fallbacks dynamically if they click something else
const defaultFallback = (title) => ({
  title: title || "Service Detail",
  mainImage: "/aliza_portrait.png",
  desc1: "Explore premium custom services curated to deliver excellent visual outcomes, intuitive user interfaces, and modular backend scaling configurations for modern enterprises.",
  desc2: "Built using cutting-edge standards to give you a complete, competitive advantage on search rankings and daily operational tasks.",
  capabilities: [
    "Clean customizable interface blocks.",
    "Integrated analytics and event triggers.",
    "Optimized asset sizes for rapid load cycles.",
  ],
  approach: "We align with your primary business targets, formulating wireframes and layouts that direct visitors smoothly to checkout buttons and lead generation modules.",
  process: [
    "Requirement analysis and goal alignment.",
    "Iterative design revisions.",
    "Production-level build and deploy cycles.",
  ],
  related: [
    { title: "Web Development", desc: "Lacus, etiam sed est eu tempus need Temer diam congue laoreet.", icon: "💻", id: "web-dev" },
    { title: "Brand Identity", desc: "Lacus, etiam sed est eu tempus need Temer diam congue laoreet.", icon: "🏷️", id: "brand-identity" },
    { title: "UI/UX Design", desc: "Lacus, etiam sed est eu tempus need Temer diam congue laoreet.", icon: "✏️", id: "ui-design" },
  ],
});

export default function SingleServiceDetail({ serviceId, initialService, initialAllServices }) {
  const [formData, setFormData] = useState({ name: "", email: "", service: serviceId, message: "" });
  const [newsletterName, setNewsletterName] = useState("");
  const { addToast } = useToast();

  /* ── Only use real DB data ── */
  const currentService = initialService
    ? {
        title: initialService.title,
        mainImage: initialService.image || "",
        images: initialService.images || [],
        desc1: initialService.desc,
        desc2: "Our " + initialService.title + " services are structured to meet high-performance requirements using modern architectural standards.",
        capabilities: [
          "Dynamic extensible setup tailored for " + initialService.title + ".",
          "Secure end-to-end integration and data safety guarantees.",
          "Optimized speed performance scoring and lightweight footprint.",
        ],
        approach: "We analyze target user loops, developing a robust plan to deploy scalable " + initialService.title + " components.",
        process: [
          "Goal analysis and technical alignment.",
          "Clean scalable build execution.",
          "Comprehensive testing and live deployment.",
        ],
        related: [],
      }
    : null;

  let servicesList = [];
  if (initialAllServices && initialAllServices.length > 0) {
    servicesList = initialAllServices.map((s, idx) => ({
      name: s.title,
      id: s.slug || s._id,
      count: 3 + (idx % 4),
    }));
  }

  const handleFormSubmit = (e) => {
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
    if (!formData.message.trim()) {
      addToast("Please enter a message.", "error");
      return;
    }

    addToast("Redirecting to WhatsApp...", "success");

    const messageText = `*New Project Inquiry for ${currentService.title}*
*Name:* ${formData.name}
*Email:* ${formData.email}
*Service:* ${currentService.title}
*Message:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, "_blank");

    setFormData({ name: "", email: "", service: serviceId, message: "" });
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

  /* ── Service not in DB yet ── */
  if (!currentService) {
    return (
      <section className="bg-[#111111] text-[#dddddd] py-20 px-6 md:px-12 lg:px-24 min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8">
            <svg className="w-9 h-9 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Service Not Found</h1>
          <p className="text-gray-400 leading-relaxed mb-8">
            This service hasn&apos;t been added to the database yet. Head back to browse all available services.
          </p>
          <Link
            href="/service"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Services
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#111111] text-[#dddddd] py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* ── LEFT: Main Content (8 Cols) ── */}
          <div className="lg:col-span-8 space-y-10">
            {/* Keyboard main picture */}
            <div className="relative w-full h-[320px] sm:h-[420px] rounded-3xl overflow-hidden border border-white/5">
              {currentService.mainImage && currentService.mainImage !== "" && currentService.mainImage !== "/my.png" ? (
                <img
                  src={currentService.mainImage}
                  alt={currentService.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900/50 flex flex-col items-center justify-center gap-3 border border-white/10 rounded-3xl">
                  <span className="text-4xl text-gray-600">🖼️</span>
                  <span className="text-gray-500 text-sm font-semibold tracking-wide">No photo uploaded</span>
                </div>
              )}
            </div>

            {/* Title & Descriptions */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 tracking-tight">
                {currentService.title}
              </h2>
              <p className="text-[#a0a0a0] text-base leading-relaxed font-light mb-6">
                {currentService.desc1}
              </p>
              <p className="text-[#a0a0a0] text-base leading-relaxed font-light">
                {currentService.desc2}
              </p>
            </div>

            {/* Two Column Extra Illustrations */}
            {currentService.images && currentService.images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentService.images.map((img, idx) => (
                  <div key={idx} className="relative h-64 rounded-2xl overflow-hidden border border-white/5 bg-zinc-900">
                    <img src={img} alt={`Service Gallery Image ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold text-emerald-400">
                      Photo {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative h-64 rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 flex items-center justify-center">
                  <span className="text-6xl">👨‍💻</span>
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold text-emerald-400">
                    Custom Development
                  </div>
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 flex items-center justify-center">
                  <span className="text-6xl">⚙️</span>
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold text-emerald-400">
                    Clean Architecture
                  </div>
                </div>
              </div>
            )}

            {/* Our Capabilities */}
            <div className="space-y-6">
              <h3 className="text-2xl font-extrabold text-white">Our Capabilities</h3>
              <p className="text-[#a0a0a0] text-sm font-light">
                Delivering precise results through modular coding setups and clean visual branding assets.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentService.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-300">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Approach */}
            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold text-white">Our Approach</h3>
              <p className="text-[#a0a0a0] text-base leading-relaxed font-light">
                {currentService.approach}
              </p>
            </div>

            {/* Our Work Process */}
            <div className="space-y-6">
              <h3 className="text-2xl font-extrabold text-white">Our Work Process</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentService.process.map((proc, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-300">{proc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Services — only shown when DB has related entries */}
            {currentService.related && currentService.related.length > 0 && (
              <div className="space-y-6 pt-6">
                <h3 className="text-2xl font-extrabold text-white">Related Service</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {currentService.related.map((rel, idx) => (
                    <Link
                      key={idx}
                      href={`/service/${rel.id}`}
                      className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 hover:bg-white/[0.04] transition-all duration-300"
                    >
                      <span className="text-3xl block mb-4">{rel.icon}</span>
                      <h4 className="text-white font-bold text-sm mb-2 group-hover:text-emerald-400 transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{rel.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Discussion Form */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-xl mt-6 relative">
              <h3 className="text-2xl font-extrabold text-white mb-2">Have project in mind? Let's discuss</h3>
              <p className="text-[#a0a0a0] text-sm mb-6 font-light">
                Get in touch with us to see how we can help you with your project
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Name*"
                    className="w-full bg-[#1c1c1c] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email*"
                    className="w-full bg-[#1c1c1c] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
                <input
                  type="text"
                  value={currentService.title}
                  readOnly
                  className="w-full bg-[#1c1c1c]/50 border border-zinc-800 rounded-xl px-4 py-3 text-gray-500 text-sm cursor-not-allowed"
                />
                <textarea
                  rows={4}
                  required
                  placeholder="Message..."
                  className="w-full bg-[#1c1c1c] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm resize-none"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2 group"
                >
                  Send Massage
                  <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
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

            {/* Services List widget — only when DB has services */}
            {servicesList.length > 0 ? (
              <div className="bg-[#181818] border border-white/5 rounded-2xl p-6">
                <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 relative pb-3">
                  Services
                  <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-emerald-500" />
                </h4>
                <ul className="space-y-3">
                  {servicesList.map((srv) => (
                    <li key={srv.id}>
                      <Link
                        href={`/service/${srv.id}`}
                        className={`flex items-center justify-between text-xs font-semibold py-3 border-b border-zinc-800 last:border-0 hover:text-emerald-400 transition-colors ${
                          serviceId === srv.id ? "text-emerald-400" : "text-[#b0b0b0]"
                        }`}
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
            ) : (
              <div className="bg-[#181818] border border-white/5 rounded-2xl p-6">
                <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 relative pb-3">
                  Browse Services
                  <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-emerald-500" />
                </h4>
                <Link
                  href="/service"
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-xs font-bold transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to All Services
                </Link>
              </div>
            )}

            {/* Newsletter widget */}
            <div className="bg-[#181818] border border-white/5 rounded-2xl p-6">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 relative pb-3">
                Whatsapp Me
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-emerald-500" />
              </h4>
              {/* <p className="text-xs text-[#a0a0a0] leading-relaxed mb-5">
                Join 20,000 Subscribers!
              </p> */}
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
              </form>
              <p className="text-sm text-gray-600 mt-4 leading-normal">
                By click on send you agree to our{" "}
                <Link href="/privacy" className="text-gray-400 hover:underline">
                  Privacy Policy
                </Link>
              </p>
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
          </aside>

        </div>
      </div>
    </section>
  );
}
