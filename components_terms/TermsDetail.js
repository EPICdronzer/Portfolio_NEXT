"use client";

import React from "react";
import { siteConfig } from "@/app/config";

export default function TermsDetail() {
  return (
    <section className="bg-[#0a0a0a] py-20 md:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-[-10%] w-[45%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[45%] h-[50%] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-gray-300">
        <div className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl">
          <div className="border-b border-white/10 pb-6">
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">Last updated: May 2026</p>
            <h2 className="text-2xl font-extrabold text-white">Agreement of Terms</h2>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">1. Acceptance of Terms</h3>
            <p className="text-sm leading-relaxed">
              By accessing and browsing this portfolio website, you acknowledge and agree, without limitation or qualification, to be bound by these Terms of Service. If you do not agree to these terms, please do not use this site.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">2. Intellectual Property Rights</h3>
            <p className="text-sm leading-relaxed">
              All materials, original code, UI assets, logos, design templates, and texts exhibited on this portfolio are the intellectual property of Harsh Vashishth. Unauthorized replication, redistribution, or modification of these properties is strictly prohibited without explicit written consent.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">3. Use of Services & Contact Forms</h3>
            <p className="text-sm leading-relaxed">
              The contact and subscription modules are designed exclusively for legitimate professional engagements, projects, and queries. Submission of malicious payloads, commercial spam, automated crawl scripts, or unsolicited marketing queries is strictly prohibited.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">4. Disclaimer of Warranties</h3>
            <p className="text-sm leading-relaxed">
              The project templates, code showcases, and details provided on this portfolio are delivered "as is" and "as available". While we strive for accuracy, no representations or warranties of any kind, express or implied, are offered regarding completeness or service uptime.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">5. Governing Law</h3>
            <p className="text-sm leading-relaxed">
              Any claims or legal disputes arising from or pertaining to the use of this website shall be governed and interpreted under the exclusive jurisdiction of the competent judicial authorities in Delhi, India.
            </p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h4 className="text-white font-bold text-sm mb-2">Contact Details</h4>
            <p className="text-xs text-gray-500">
              For any clarification regarding these terms, please send an inquiry to <span className="text-emerald-400">{siteConfig.email}</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
