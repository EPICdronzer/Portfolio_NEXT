"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAdmin } from "../_context/AdminContext";
import AuthGuard from "../_components/AuthGuard";
import AdminHeader from "../_components/AdminHeader";

function PortfolioContent() {
  const { projects, dataLoading, openAddModal, openEditModal, handleDelete } = useAdmin();
  const [expandedId, setExpandedId] = useState(null);

  return (
    <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
      <AdminHeader
        title="Manage Portfolio"
        description="Add and manage projects shown in the homepage portfolio section — title, category, image, and project link."
      />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-white">Projects Grid</h3>
          <button
            onClick={() => openAddModal("portfolio")}
            className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md transition-colors"
          >
            + Add Project
          </button>
        </div>

        {dataLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 text-sm">No portfolio projects yet. Add your first project!</div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(p => (
                <div key={p._id} className="bg-[#0d0d0f] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col">
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden border-b border-zinc-800">
                    {p.image && p.image !== "/portfolio_screenshots.png" ? (
                      <Image src={p.image} alt={p.title} fill className={`object-cover ${p.imgPos || "object-center"}`} />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-emerald-400 uppercase tracking-wider font-bold mb-1 block">{p.category}</span>
                      <h4 className="font-bold text-white text-sm mb-2 leading-snug">{p.title}</h4>
                      <p className="text-xs text-zinc-600">Slug: <code className="text-zinc-500">/portfolio/{p.slug}</code></p>
                      {p.href && p.href !== "#" && (
                        <a href={p.href} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline mt-1 block truncate">{p.href}</a>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-zinc-800 mt-4">
                      <button
                        onClick={() => openEditModal("portfolio", p)}
                        className="flex-1 bg-zinc-800/80 hover:bg-zinc-700/80 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete("portfolio", p._id)}
                        className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Accordion View */}
            <div className="space-y-3 md:hidden">
              {projects.map(p => {
                const isExpanded = expandedId === p._id;
                return (
                  <div key={p._id} className="bg-[#0d0d0f] border border-zinc-800 rounded-xl overflow-hidden transition-all duration-200">
                    <div 
                      onClick={() => setExpandedId(isExpanded ? null : p._id)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-800/20"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-7 rounded bg-zinc-900 border border-zinc-800 relative overflow-hidden shrink-0">
                          {p.image && p.image !== "/portfolio_screenshots.png" ? (
                            <Image src={p.image} alt={p.title} fill className="object-cover" />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-white text-sm truncate">{p.title}</h4>
                          <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">{p.category}</span>
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
                        {p.desc && <p className="text-xs text-zinc-400 leading-relaxed">{p.desc}</p>}
                        <p className="text-xs text-zinc-600">Slug: <code className="text-zinc-500">/portfolio/{p.slug}</code></p>
                        {p.href && p.href !== "#" && (
                          <a href={p.href} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline block truncate">{p.href}</a>
                        )}
                        <div className="flex gap-2 pt-2 border-t border-zinc-800/60">
                          <button
                            onClick={() => openEditModal("portfolio", p)}
                            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete("portfolio", p._id)}
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
          </>
        )}
      </div>
    </main>
  );
}

export default function AdminPortfolioPage() {
  return (
    <AuthGuard>
      <PortfolioContent />
    </AuthGuard>
  );
}
