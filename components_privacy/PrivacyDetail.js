"use client";

import React from "react";
import { siteConfig } from "@/app/config";

export default function PrivacyDetail() {
  return (
    <section className="bg-[#0a0a0a] py-20 md:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-[-10%] w-[45%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[45%] h-[50%] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-gray-300">
        <div className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl">
          <div className="border-b border-white/10 pb-6">
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">Last updated: May 2026</p>
            <h2 className="text-2xl font-extrabold text-white">Your Privacy Matters</h2>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">1. Information Collection</h3>
            <p className="text-sm leading-relaxed">
              We gather limited personal information voluntarily submitted by you via the contact modules, subscription fields, and direct email interfaces. This information includes your name, email address, topic parameters, and message content.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">2. Use of Information</h3>
            <p className="text-sm leading-relaxed">
              Any personal details collected are utilized exclusively to respond to your specific inquiries, organize development project quotes, or dispatch authorized newsletter releases. We will never sell, rent, or distribute your email address to commercial marketing firms.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">3. Third-Party Integrations & Cookies</h3>
            <p className="text-sm leading-relaxed">
              This portfolio may use third-party analytics APIs (such as Google Analytics or Vercel Web Analytics) to review browsing patterns and load performance metrics. These utilities may store standard tracking cookies to assess site interactions.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">4. Data Security</h3>
            <p className="text-sm leading-relaxed">
              We implement industry-standard encryption, SSL transport pathways, and firewalls to keep your submitted information protected. However, no digital transport standard over the public internet can be guaranteed as 100% impenetrable.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">5. Access Rights & Deletion</h3>
            <p className="text-sm leading-relaxed">
              You maintain full legal authority to request a copy of the specific details you have submitted to us, or request the immediate and total deletion of all logs from our messaging databases.
            </p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h4 className="text-white font-bold text-sm mb-2">Inquiries & Opt-out</h4>
            <p className="text-xs text-gray-500">
              For any privacy questions or data removal requests, please submit an email request to <span className="text-emerald-400">{siteConfig.email}</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
