"use client";

import React, { useState } from "react";
import { useAdmin } from "../_context/AdminContext";
import AuthGuard from "../_components/AuthGuard";
import AdminHeader from "../_components/AdminHeader";

const CATEGORIES = ["Development", "Design", "Marketing"];
const ICON_OPTIONS = ["code", "mobile", "desktop", "brush", "tag", "chart", "search", "share", "document"];

function ServicesContent() {
  const { services, dataLoading, openAddModal, openEditModal, handleDelete } = useAdmin();
  const [expandedId, setExpandedId] = useState(null);

  return (
    <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
      <AdminHeader
        title="Manage Services"
        description="Configure service cards shown in the homepage services section — grouped by Development, Design, and Marketing tabs."
      />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-white">Services Grid</h3>
          <button
            onClick={() => openAddModal("services")}
            className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md transition-colors"
          >
            + Add Service
          </button>
        </div>

        {dataLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <p className="text-sm">No services yet. Add your first service to display it on the homepage.</p>
          </div>
        ) : (
          /* Group by category */
          CATEGORIES.map(cat => {
            const catServices = services.filter(s => s.category === cat);
            if (!catServices.length) return null;
            return (
              <div key={cat}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">{cat}</h4>
                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catServices.map(s => (
                    <div key={s._id} className="bg-[#0d0d0f] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-zinc-800 text-amber-400 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                          </div>
                          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">{s.category}</span>
                        </div>
                        <h4 className="font-bold text-white text-base mb-2">{s.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-2">{s.desc}</p>
                        <p className="text-xs text-zinc-600">Slug: <code className="text-zinc-500">/service/{s.slug}</code></p>
                      </div>

                      <div className="flex gap-2 border-t border-zinc-800 pt-4 mt-4">
                        <button
                          onClick={() => openEditModal("services", s)}
                          className="flex-1 bg-zinc-800/80 hover:bg-zinc-700/80 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete("services", s._id)}
                          className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Accordion View */}
                <div className="space-y-3 md:hidden">
                  {catServices.map(s => {
                    const isExpanded = expandedId === s._id;
                    return (
                      <div key={s._id} className="bg-[#0d0d0f] border border-zinc-800 rounded-xl overflow-hidden transition-all duration-200">
                        <div 
                          onClick={() => setExpandedId(isExpanded ? null : s._id)}
                          className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-800/20"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 text-amber-400 flex items-center justify-center shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                            </div>
                            <div>
                              <h4 className="font-bold text-white text-sm">{s.title}</h4>
                              <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">{s.category}</span>
                            </div>
                          </div>
                          <svg 
                            className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        {isExpanded && (
                          <div className="p-4 border-t border-zinc-800/60 bg-zinc-950/40 space-y-3">
                            <p className="text-xs text-zinc-400 leading-relaxed">{s.desc}</p>
                            <p className="text-xs text-zinc-600">Slug: <code className="text-zinc-500">/service/{s.slug}</code></p>
                            <div className="flex gap-2 pt-2 border-t border-zinc-800/60">
                              <button
                                onClick={() => openEditModal("services", s)}
                                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete("services", s._id)}
                                className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
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
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}

export default function AdminServicesPage() {
  return (
    <AuthGuard>
      <ServicesContent />
    </AuthGuard>
  );
}
