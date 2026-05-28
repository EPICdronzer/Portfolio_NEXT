"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Service", href: "/service" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black border-b border-white/5 py-3 shadow-xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
        {/* Logo */}
        <a href="https://github.com/EPICdronzer" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 md:gap-3 group cursor-pointer">
          <div className="relative w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-emerald-500/30 group-hover:border-emerald-500 transition-all duration-300 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Harsh Vashishth logo"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          {/* Full name on md+, short on small */}
          <span className="hidden sm:block text-lg md:text-2xl font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-300 leading-none">
            Harsh Vashishth<span className="text-emerald-400">.</span>
          </span>
          <span className="sm:hidden text-base font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-300">
            HV<span className="text-emerald-400">.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-gray-300 font-medium text-sm tracking-wide transition-colors duration-300 hover:text-white group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Resume Button */}
        <a
          href="#resume"
          className="hidden md:inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-5 py-2.5 rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30 transform hover:-translate-y-0.5 transition-all duration-300 group text-sm"
        >
          Resume
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white hover:text-emerald-400 focus:outline-none p-2 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-[#111] border border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 font-medium py-2 hover:text-emerald-400 transition-colors duration-200 border-b border-zinc-800/50 last:border-0"
            >
              {link.name}
            </Link>
          ))}
          <a
            href="#resume"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 bg-emerald-500 text-black font-bold py-3 rounded-full transition-all duration-200"
          >
            Resume
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      )}
    </header>
  );
}
