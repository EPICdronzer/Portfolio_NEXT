"use client";

import React, { useState } from "react";
import { useAdmin } from "../_context/AdminContext";
import AuthGuard from "../_components/AuthGuard";
import AdminHeader from "../_components/AdminHeader";

const MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function ExperienceContent() {
  const { experiences, dataLoading, openAddModal, openEditModal, handleDelete } = useAdmin();
  const [expandedId, setExpandedId] = useState(null);

  return (
    <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
      <AdminHeader
        title="Manage Work Experience"
        description="Timeline entries shown in the Experience section — role, company, period (year or month+year)."
      />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-white">Timeline Entries</h3>
          <button
            onClick={() => openAddModal("experience")}
            className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md transition-colors"
          >
            + Add Experience
          </button>
        </div>

        {dataLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 text-sm">No experience entries yet.</div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden md:block bg-[#0d0d0f] border border-zinc-800 rounded-2xl p-6 space-y-4">
              {experiences.map((exp, idx) => (
                <div key={exp._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-xl bg-[#141417] border border-zinc-800 hover:border-zinc-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-emerald-400 text-sm border border-zinc-700 shrink-0">
                      {exp.role?.charAt(0) || idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-white text-sm">{exp.role}</h4>
                        <span className="text-xs text-zinc-500 font-medium">| {exp.period}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">
                        {exp.company}
                        {exp.companyExtra && <span className="text-zinc-600 ml-1">{exp.companyExtra}</span>}
                      </p>
                      {exp.href && exp.href !== "#" && (
                        <a href={exp.href} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline mt-0.5 block">{exp.href}</a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center w-full sm:w-auto">
                    <button
                      onClick={() => openEditModal("experience", exp)}
                      className="flex-1 sm:flex-none bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete("experience", exp._id)}
                      className="bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border border-rose-500/20 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Accordion View */}
            <div className="space-y-3 md:hidden">
              {experiences.map((exp, idx) => {
                const isExpanded = expandedId === exp._id;
                return (
                  <div key={exp._id} className="bg-[#0d0d0f] border border-zinc-800 rounded-xl overflow-hidden transition-all duration-200">
                    <div 
                      onClick={() => setExpandedId(isExpanded ? null : exp._id)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-800/20"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-emerald-400 text-xs border border-zinc-700 shrink-0">
                          {exp.role?.charAt(0) || idx + 1}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-white text-sm truncate">{exp.role}</h4>
                          <span className="text-[10px] text-zinc-500 font-semibold">{exp.period}</span>
                        </div>
                      </div>
                      <svg 
                        className={`w-4 h-4 text-zinc-500 transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {isExpanded && (
                      <div className="p-4 border-t border-zinc-800/60 bg-zinc-950/40 space-y-3">
                        <p className="text-xs text-zinc-300">
                          Company: <span className="text-white font-medium">{exp.company}</span>
                          {exp.companyExtra && <span className="text-zinc-500 ml-1">{exp.companyExtra}</span>}
                        </p>
                        {exp.href && exp.href !== "#" && (
                          <a href={exp.href} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline block truncate">{exp.href}</a>
                        )}
                        <div className="flex gap-2 pt-2 border-t border-zinc-800/60">
                          <button
                            onClick={() => openEditModal("experience", exp)}
                            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete("experience", exp._id)}
                            className="bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border border-rose-500/20 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function AdminExperiencePage() {
  return (
    <AuthGuard>
      <ExperienceContent />
    </AuthGuard>
  );
}
