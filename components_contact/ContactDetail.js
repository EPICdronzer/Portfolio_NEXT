"use client";

import React, { useState } from "react";
import { siteConfig } from "@/app/config";

export default function ContactDetail() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-[#0a0a0a] py-20 md:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-[-10%] w-[45%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[45%] h-[50%] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Info cards left */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-2">Contact Info</h3>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-8">
              Let's build a new product <span className="text-emerald-400">together.</span>
            </h2>

            {/* Email Card */}
            <a href={`mailto:${siteConfig.email}`} className="flex gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Email Me</h4>
                <p className="text-gray-400 text-sm group-hover:text-sky-400 transition-colors">
                  {siteConfig.email}
                </p>
              </div>
            </a>

            {/* Phone Card */}
            <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`} className="flex gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Call Me</h4>
                <p className="text-gray-400 text-sm group-hover:text-amber-400 transition-colors">
                  {siteConfig.phone}
                </p>
              </div>
            </a>

            {/* WhatsApp Card */}
            <a href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.47l-6.256 1.648zM5.84 19.479c1.696.993 3.522 1.547 5.414 1.548l.004.001c5.441-.001 9.866-4.426 9.869-9.87.001-2.637-1.03-5.112-2.905-6.985A9.799 9.799 0 0 0 11.233 1.34c-5.438 0-9.867 4.425-9.87 9.871-.001 1.992.518 3.94 1.511 5.66l-.991 3.616 3.957-.991-.001-.017zM18.17 14.88c-.3-.149-1.772-.874-2.046-.974-.275-.1-.475-.149-.675.15-.2.299-.774.974-.949 1.173-.174.199-.349.224-.649.075-.3-.15-1.266-.467-2.41-1.485-.89-.792-1.49-1.77-1.665-2.07-.174-.3-.019-.462.13-.611.135-.134.3-.349.45-.524.149-.174.199-.299.299-.498.1-.2.05-.374-.025-.524-.075-.15-.675-1.623-.925-2.221-.244-.588-.492-.507-.675-.516-.174-.008-.374-.01-.574-.01-.2 0-.525.075-.8.374-.275.299-1.05 1.023-1.05 2.494s1.075 2.893 1.225 3.093c.15.2 2.11 3.224 5.116 4.522.715.309 1.273.494 1.707.632.717.228 1.37.196 1.885.119.574-.085 1.772-.724 2.022-1.422.25-.698.25-1.297.175-1.422-.075-.125-.275-.2-.575-.349z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">WhatsApp Me</h4>
                <p className="text-gray-400 text-sm group-hover:text-emerald-400 transition-colors">
                  {siteConfig.whatsapp}
                </p>
              </div>
            </a>

            {/* Location Card */}
            <div className="flex gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Location</h4>
                <p className="text-gray-400 text-sm">
                  {siteConfig.location}
                </p>
              </div>
            </div>
          </div>

          {/* Form right */}
          <div className="lg:col-span-7 bg-[#111] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl relative">
            <h3 className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-2">Message Me</h3>
            <h2 className="text-3xl font-extrabold text-white mb-8">Send A Message</h2>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Thank you! Your message was sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm transition-colors duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm transition-colors duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm transition-colors duration-200"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm transition-colors duration-200 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
