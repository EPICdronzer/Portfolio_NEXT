"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/app/config";
import { useToast } from "@/app/context/ToastContext";

const socialLinks = [
  
  {
    id: "li",
    href: siteConfig.socialLinks.linkedin,
    label: "LinkedIn",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },

  {
    id: "gh",
    href: siteConfig.socialLinks.github,
    label: "GitHub",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 .5C5.65.5.5 5.65.5 12A11.5 11.5 0 008.35 22.93c.6.11.82-.26.82-.58v-2.17c-3.19.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.52-2.55-.29-5.24-1.27-5.24-5.67 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.14 1.17a10.9 10.9 0 015.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.38-5.25 5.66.41.35.77 1.03.77 2.08v3.09c0 .32.22.69.83.58A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  },

  {
    id: "wa",
    href: siteConfig.socialLinks.whatsapp,
    label: "WhatsApp",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.52 3.48A11.88 11.88 0 0012.06 0C5.5 0 .17 5.33.17 11.89c0 2.09.55 4.13 1.59 5.93L0 24l6.35-1.67a11.9 11.9 0 005.71 1.46h.01c6.56 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.17-3.44-8.42zM12.07 21.76h-.01a9.85 9.85 0 01-5.01-1.37l-.36-.21-3.77.99 1.01-3.68-.23-.38a9.82 9.82 0 01-1.5-5.22c0-5.43 4.42-9.85 9.86-9.85 2.63 0 5.11 1.03 6.96 2.89a9.79 9.79 0 012.89 6.96c0 5.43-4.42 9.86-9.84 9.86zm5.4-7.38c-.29-.14-1.72-.85-1.99-.95-.27-.1-.46-.14-.66.14-.19.29-.75.95-.92 1.14-.17.19-.34.22-.63.08-.29-.14-1.21-.45-2.31-1.44-.85-.76-1.42-1.7-1.58-1.99-.17-.29-.02-.44.12-.58.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.08-.14-.66-1.58-.9-2.17-.24-.57-.49-.49-.66-.5h-.56c-.19 0-.51.07-.77.36-.27.29-1.02 1-1.02 2.43s1.05 2.81 1.2 3c.14.19 2.06 3.15 5 4.42.7.3 1.25.48 1.68.61.71.22 1.36.19 1.87.12.57-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.19-.56-.33z" />
      </svg>
    ),
  },

  
];

export default function Footer() {
  const [name, setName] = useState("");
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast("Please enter your name.", "error");
      return;
    }
    
    addToast("Redirecting to WhatsApp...", "success");
    const message = `Hi Harsh, I would like to subscribe to your newsletter. My name is ${name}.`;
    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setName("");
  };

  return (
    <footer id="contact" className="bg-[#121212]">

      {/* ── Full-bleed CTA Banner ── */}
      <div
        className="mx-4 md:mx-10 lg:mx-16 mt-8 px-6 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden rounded-3xl"
        style={{ background: "linear-gradient(135deg, #059669 0%, #047857 100%)" }}
      >
        {/* Concentric circle rings pattern overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          style={{ opacity: 0.12 }}
        >
          {/* Left cluster */}
          <circle cx="15%" cy="50%" r="80"  stroke="white" strokeWidth="1.5" fill="none" />
          <circle cx="15%" cy="50%" r="140" stroke="white" strokeWidth="1.5" fill="none" />
          <circle cx="15%" cy="50%" r="200" stroke="white" strokeWidth="1.5" fill="none" />
          <circle cx="15%" cy="50%" r="260" stroke="white" strokeWidth="1.5" fill="none" />
          <circle cx="15%" cy="50%" r="320" stroke="white" strokeWidth="1.5" fill="none" />
          {/* Right cluster */}
          <circle cx="85%" cy="50%" r="80"  stroke="white" strokeWidth="1.5" fill="none" />
          <circle cx="85%" cy="50%" r="140" stroke="white" strokeWidth="1.5" fill="none" />
          <circle cx="85%" cy="50%" r="200" stroke="white" strokeWidth="1.5" fill="none" />
          <circle cx="85%" cy="50%" r="260" stroke="white" strokeWidth="1.5" fill="none" />
          <circle cx="85%" cy="50%" r="320" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>

        <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-extrabold max-w-sm leading-tight relative z-10">
          Send me a message and make something together.
        </h3>
        <a
          href="/contact"
          className="relative z-10 inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-zinc-800 text-white font-bold px-7 py-3.5 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl whitespace-nowrap group"
        >
          Contact Us
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      {/* ── Footer Body ── */}
      <div className="px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <a href={siteConfig.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group mb-5">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500/30 group-hover:border-emerald-500 transition-all duration-300">
                <Image src="/logo.png" alt="Harsh Vashishth logo" fill sizes="44px" className="object-cover" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Harsh Vashishth<span className="text-emerald-400">.</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Welcome and open yourself to your truest love this year with us! With the Release Process
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 tracking-wide">Navigation</h4>
            <ul className="space-y-3">
              {[
                { name: "About Me", href: "/about" },
                { name: "My Services", href: "/service" },
                { name: "My Work", href: "/portfolio" },
                { name: "Latest Insights", href: "/blog" },
                { name: "Contact Me", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-400 text-sm hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-emerald-400 transition-colors duration-200 flex-shrink-0" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Policy */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 tracking-wide">Policies & Legal</h4>
            <ul className="space-y-3">
              {[
                { name: "Terms of Service", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-400 text-sm hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-emerald-400 transition-colors duration-200 flex-shrink-0" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 tracking-wide">Ping Me</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              From concept to deployment, creating fast, secure, and user-focused digital experiences powered by modern technologies.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name *"
                required
                className="flex-grow bg-zinc-800 border border-zinc-700 text-white placeholder-gray-500 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors duration-200"
              />
              <button
                type="submit"
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-black transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/20"
                aria-label="Subscribe"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-zinc-800 px-6 md:px-12 lg:px-24 py-5 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <p className="text-gray-500 text-xs text-center">
            Copyright © 2026{" "}
            <span className="text-white font-semibold">Harsh Vashishth</span>
            . All rights reserved.
          </p>
        </div>
        {/* Scroll to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute right-6 md:right-12 lg:right-24 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-black shadow-lg hover:shadow-emerald-500/30 transition-all duration-200"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>

    </footer>
  );
}