"use client";

import React from "react";
import Image from "next/image";

const experiences = [
  {
    id: "exp-1",
    period: "2015 - 2016",
    role: "Junior Visual Designer",
    company: "Trapeza Group, USA.",
    companyColor: "text-rose-400",
    logo: "/company_logos.png",
    logoPos: "left-0",
    logoStyle: { objectPosition: "0% center" },
    href: "#",
  },
  {
    id: "exp-2",
    period: "2017 - 2018",
    role: "UI/UX Designer",
    company: "Gallerie Ontario, Canada",
    companyExtra: "(Remote)",
    companyColor: "text-rose-400",
    logo: "/company_logos.png",
    logoPos: "center",
    logoStyle: { objectPosition: "50% center" },
    href: "#",
  },
  {
    id: "exp-3",
    period: "2019 - 2020",
    role: "Senior UI/UX Designer",
    company: "Morson Hybrid, Canada",
    companyColor: "text-rose-400",
    logo: "/company_logos.png",
    logoPos: "right-0",
    logoStyle: { objectPosition: "100% center" },
    href: "#",
  },
];

// SVG icon components representing each company
const CompanyIcon = ({ index }) => {
  const icons = [
    // Lotus/flower - Trapeza Group
    <svg key="lotus" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.2 5.4-5.4 7.8-9 9 3.6 1.2 7.8 3.6 9 9 1.2-5.4 5.4-7.8 9-9-3.6-1.2-7.8-3.6-9-9z" />
    </svg>,
    // F letter - Gallerie Ontario
    <svg key="f-logo" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 3h10v2H8v5h7v2H8v7H6V3z" />
    </svg>,
    // Leaf - Morson Hybrid
    <svg key="leaf" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C7 3 3 7 3 12c0 2.5 1 4.8 2.6 6.4C7.2 20 9.5 21 12 21c5 0 9-4 9-9S17 3 12 3zm0 0c0 0-2 6-2 9s2 9 2 9" />
    </svg>,
  ];
  const colors = ["text-purple-400", "text-blue-400", "text-green-400"];
  const bgColors = ["bg-purple-400/10", "bg-blue-400/10", "bg-green-400/10"];

  return (
    <div className={`w-14 h-14 rounded-full ${bgColors[index]} flex items-center justify-center ${colors[index]}`}>
      {icons[index]}
    </div>
  );
};

export default function Experience({ initialExperiences }) {
  const hasData = initialExperiences && initialExperiences.length > 0;
  const displayExperiences = hasData ? initialExperiences : [];

  return (
    <section id="about" className="bg-[#0f0f0f] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            My Work Experience
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            Must explain to you how all this mistaken idea of denouncing pleasure
            born and give you a complete account the system
          </p>
        </div>

        {!hasData ? (
          <div className="w-full max-w-2xl mx-auto my-12 text-center p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500 animate-fadeIn">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">No Work Experience Added Yet</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed mb-6 font-light">
                Our administrator hasn't added any work experiences in the backend yet. Please check back later or get in touch directly!
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25">
                Get in Touch
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Mobile horizontal scroll */}
            <div className="flex md:hidden gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
              {displayExperiences.map((exp, index) => (
                <div
                  key={exp._id || exp.id}
                  className="snap-start flex-shrink-0 w-[75vw] max-w-[300px] group bg-[#1a1a1a] border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center hover:border-zinc-600 transition-all duration-300"
                >
                  {/* Company Logo Icon */}
                  <div className="mb-5">
                    <CompanyIcon index={index % 3} />
                  </div>

                  {/* Period */}
                  <p className="text-white font-extrabold text-2xl mb-2 tracking-tight">
                    {exp.period || `${exp.startMonth} ${exp.startYear} - ${exp.endMonth || 'Present'} ${exp.endYear || ''}`}
                  </p>

                  {/* Role */}
                  <h3 className="text-white font-bold text-base mb-2">{exp.role}</h3>

                  {/* Company */}
                  <p className={`${exp.companyColor || "text-emerald-400"} text-sm font-medium mb-1`}>
                    {exp.company}
                    {exp.companyExtra && (
                      <span className="text-gray-500 font-normal"> {exp.companyExtra}</span>
                    )}
                  </p>

                  {/* Link */}
                  <a
                    href={exp.href || "#"}
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm font-semibold transition-colors duration-200 mt-5 group/link"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    Go to website
                  </a>
                </div>
              ))}
            </div>

            {/* Desktop grid */}
            <div className="hidden md:grid grid-cols-3 gap-6">
              {displayExperiences.map((exp, index) => (
                <div
                  key={exp._id || exp.id}
                  className="group bg-[#1a1a1a] border border-zinc-800 rounded-2xl p-8 flex flex-col items-center text-center hover:border-zinc-600 hover:bg-[#1e1e1e] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
                >
                  {/* Company Logo Icon */}
                  <div className="mb-5">
                    <CompanyIcon index={index % 3} />
                  </div>

                  {/* Period */}
                  <p className="text-white font-extrabold text-2xl mb-2 tracking-tight">
                    {exp.period || `${exp.startMonth} ${exp.startYear} - ${exp.endMonth || 'Present'} ${exp.endYear || ''}`}
                  </p>

                  {/* Role */}
                  <h3 className="text-white font-bold text-base mb-2">{exp.role}</h3>

                  {/* Company */}
                  <p className={`${exp.companyColor || "text-emerald-400"} text-sm font-medium mb-1`}>
                    {exp.company}
                    {exp.companyExtra && (
                      <span className="text-gray-500 font-normal"> {exp.companyExtra}</span>
                    )}
                  </p>

                  {/* Link */}
                  <a
                    href={exp.href || "#"}
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm font-semibold transition-colors duration-200 mt-5 group/link"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    Go to website
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
