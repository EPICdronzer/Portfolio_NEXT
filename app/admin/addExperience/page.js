"use client";

import React from "react";
import { useAdmin } from "../_context/AdminContext";
import AuthGuard from "../_components/AuthGuard";
import AdminHeader from "../_components/AdminHeader";

const MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function ExperienceContent() {
  const { experiences, dataLoading, openAddModal, openEditModal, handleDelete } = useAdmin();

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
          <div className="bg-[#0d0d0f] border border-zinc-800 rounded-2xl p-6 space-y-4">
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
