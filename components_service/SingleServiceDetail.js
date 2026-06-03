"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/app/config";
import { useToast } from "@/app/context/ToastContext";
import ImageSlideshow from "@/components/ImageSlideshow";
import { parseMarkdownToJSX, parseInline } from "@/backend/lib/markdown";
import { submitMessage } from "@/backend/actions/messages";

export default function SingleServiceDetail({ serviceId, initialService, initialAllServices }) {
  const [formData, setFormData] = useState({ name: "", email: "", service: serviceId, message: "" });
  const [newsletterName, setNewsletterName] = useState("");
  const { addToast } = useToast();

  /* ── Build service data from DB ── */
  const currentService = initialService
    ? {
        title: initialService.title,
        allImages: Array.isArray(initialService.images) && initialService.images.length > 0 ? initialService.images : (initialService.image ? [initialService.image] : []),
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim()) { addToast("Please enter your name.", "error"); return; }
    if (!emailRegex.test(formData.email)) { addToast("Please enter a valid email address.", "error"); return; }
    if (!formData.message.trim()) { addToast("Please enter a message.", "error"); return; }
    addToast("Redirecting to WhatsApp...", "success");

    // Asynchronously submit inquiry to DB
    submitMessage({
      name: formData.name,
      email: formData.email,
      subject: `Project Inquiry: ${currentService.title}`,
      message: formData.message,
    }).catch(err => {
      console.error("Failed to submit inquiry to DB:", err);
    });

    const messageText = `*New Project Inquiry for ${currentService.title}*\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Service:* ${currentService.title}\n*Message:* ${formData.message}`;
    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, "_blank");
    setFormData({ name: "", email: "", service: serviceId, message: "" });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterName.trim()) { addToast("Please enter your name.", "error"); return; }
    addToast("Redirecting to WhatsApp...", "success");

    // Asynchronously submit newsletter sub to DB
    submitMessage({
      name: newsletterName,
      email: "subscribed@via.whatsapp",
      subject: "Newsletter Subscription Request",
      message: `Hi Harsh, I would like to subscribe to your newsletter. My name is ${newsletterName}.`,
    }).catch(err => {
      console.error("Failed to submit newsletter sub to DB:", err);
    });

    const msg = `Hi Harsh, I would like to subscribe to your newsletter. My name is ${newsletterName}.`;
    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, "_blank");
    setNewsletterName("");
  };

  /* ── Service not found ── */
  if (!currentService) {
    return (
      <section className="bg-[#111111] text-[#dddddd] py-20 px-6 md:px-12 lg:px-24 min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8">
            <svg className="w-9 h-9 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Service Not Found</h1>
          <p className="text-gray-400 leading-relaxed mb-8">
            This service hasn&apos;t been added to the database yet. Head back to browse all available services.
          </p>
          <Link href="/service" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/20">
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

            {/* Hero Slideshow */}
            <div className="rounded-3xl overflow-hidden border border-white/5 shadow-xl">
              <ImageSlideshow
                images={currentService.allImages}
                alt={currentService.title}
                className="w-full h-[320px] sm:h-[420px] rounded-3xl"
                interval={4000}
                showDots={true}
                showArrows={true}
              />
            </div>

            {/* Title & Descriptions */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 tracking-tight">
                {currentService.title}
              </h2>
              <div className="text-[#a0a0a0] text-base leading-relaxed font-light mb-6">
                {parseMarkdownToJSX(currentService.desc1)}
              </div>
              <div className="text-[#a0a0a0] text-base leading-relaxed font-light">
                {parseMarkdownToJSX(currentService.desc2)}
              </div>
            </div>

            {/* Our Capabilities */}
            <div className="space-y-6">
              <h3 className="text-2xl font-extrabold text-white">Our Capabilities</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentService.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-300">{parseInline(cap)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Approach */}
            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold text-white">Our Approach</h3>
              <div className="text-[#a0a0a0] text-base leading-relaxed font-light">
                {parseMarkdownToJSX(currentService.approach)}
              </div>
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
                    <span className="text-sm text-gray-300">{parseInline(proc)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Discussion Form */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-xl mt-6">
              <h3 className="text-2xl font-extrabold text-white mb-2">Have project in mind? Let&apos;s discuss</h3>
              <p className="text-[#a0a0a0] text-sm mb-6 font-light">Get in touch with us to see how we can help you with your project</p>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" required placeholder="Your Name*" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1c1c1c] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm" />
                  <input type="email" required placeholder="Your Email*" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1c1c1c] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm" />
                </div>
                <input type="text" value={currentService.title} readOnly
                  className="w-full bg-[#1c1c1c]/50 border border-zinc-800 rounded-xl px-4 py-3 text-gray-500 text-sm cursor-not-allowed" />
                <textarea rows={4} required placeholder="Message..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#1c1c1c] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm resize-none" />
                <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2 group">
                  Send Message
                  <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* ── RIGHT: Sidebar (4 Cols) ── */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Search */}
            <div className="bg-[#181818] border border-white/5 rounded-2xl p-6">
              <div className="flex gap-2">
                <input type="text" placeholder="Search Post.." className="flex-grow bg-[#111111] border border-zinc-800 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500" />
                <button className="w-10 h-10 bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-black rounded-xl transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Services List */}
            {servicesList.length > 0 ? (
              <div className="bg-[#181818] border border-white/5 rounded-2xl p-6">
                <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 relative pb-3">
                  Services
                  <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-emerald-500" />
                </h4>
                <ul className="space-y-3">
                  {servicesList.map((srv) => (
                    <li key={srv.id}>
                      <Link href={`/service/${srv.id}`}
                        className={`flex items-center justify-between text-xs font-semibold py-3 border-b border-zinc-800 last:border-0 hover:text-emerald-400 transition-colors ${serviceId === srv.id ? "text-emerald-400" : "text-[#b0b0b0]"}`}>
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
                <Link href="/service" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-xs font-bold transition-colors">
                  ← Back to All Services
                </Link>
              </div>
            )}

            {/* WhatsApp Me */}
            <div className="bg-[#181818] border border-white/5 rounded-2xl p-6">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 relative pb-3">
                Whatsapp Me
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-emerald-500" />
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input type="text" required value={newsletterName} onChange={(e) => setNewsletterName(e.target.value)} placeholder="Enter Name"
                  className="w-full bg-[#111] border border-zinc-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500 text-white" />
                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl text-xs transition-colors">Send</button>
              </form>
              <p className="text-sm text-gray-600 mt-4 leading-normal">
                By clicking send you agree to our{" "}
                <Link href="/privacy" className="text-gray-400 hover:underline">Privacy Policy</Link>
              </p>
            </div>

            {/* Social */}
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
