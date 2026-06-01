"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/app/config";
import { useToast } from "@/app/context/ToastContext";

const socialLinks = [
  {
    id: "fb", href: siteConfig.socialLinks.facebook, label: "Facebook",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  },
  {
    id: "tw", href: siteConfig.socialLinks.twitter, label: "Twitter",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>,
  },
  {
    id: "li", href: siteConfig.socialLinks.linkedin, label: "LinkedIn",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    id: "pi", href: siteConfig.socialLinks.pinterest, label: "Pinterest",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>,
  },
  {
    id: "vk", href: siteConfig.socialLinks.vk, label: "VK",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.701 18.771H12.957C12.957 18.771 13.35 18.726 13.55 18.509C13.735 18.308 13.729 17.932 13.729 17.932C13.729 17.932 13.703 16.153 14.555 15.889C15.393 15.628 16.48 17.607 17.633 18.372C18.51 18.95 19.18 18.818 19.18 18.818L22.132 18.771C22.132 18.771 23.676 18.677 22.956 17.477C22.895 17.374 22.521 16.566 20.632 14.817C18.656 12.987 18.919 13.284 21.281 10.111C22.697 8.22 23.268 7.078 23.094 6.577C22.929 6.1 21.894 6.224 21.894 6.224L18.574 6.244C18.574 6.244 18.331 6.212 18.152 6.323C17.977 6.432 17.865 6.683 17.865 6.683C17.865 6.683 17.31 8.143 16.561 9.393C14.979 12.032 14.329 12.173 14.067 11.999C13.46 11.597 13.609 10.463 13.609 9.66C13.609 7.113 13.996 6.051 12.85 5.779C12.461 5.686 12.178 5.625 11.156 5.615C9.852 5.601 8.748 5.619 8.124 5.934C7.714 6.14 7.396 6.6 7.596 6.625C7.844 6.656 8.403 6.771 8.7 7.181C9.084 7.71 9.071 8.897 9.071 8.897C9.071 8.897 9.284 11.617 8.588 12.01C8.116 12.271 7.472 11.738 6.063 9.362C5.342 8.1 4.802 6.7 4.802 6.7C4.802 6.7 4.706 6.458 4.534 6.328C4.325 6.171 4.032 6.12 4.032 6.12L0.878 6.14C0.878 6.14 0.411 6.153 0.236 6.356C0.08 6.537 0.224 6.912 0.224 6.912C0.224 6.912 2.762 12.953 5.633 15.999C8.272 18.802 11.271 18.771 11.271 18.771H11.701Z"/></svg>,
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
        className="w-full px-6 md:px-24 py-14 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)" }}
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
          className="relative z-10 inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-zinc-800 text-white font-bold px-7 py-3.5 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl whitespace-nowrap group"
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
                  className="w-8 h-8 bg-zinc-800 border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-200"
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
                className="flex-grow bg-zinc-800 border border-zinc-700 text-white placeholder-gray-500 text-sm px-4 py-2.5 focus:outline-none focus:border-emerald-500 transition-colors duration-200"
              />
              <button
                type="submit"
                className="flex-shrink-0 w-10 h-10 bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-black transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/20"
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