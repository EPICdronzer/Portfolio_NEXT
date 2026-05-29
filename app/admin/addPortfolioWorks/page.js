"use client";

import React from "react";
import { useAdmin } from "../_context/AdminContext";
import AuthGuard from "../_components/AuthGuard";
import AdminHeader from "../_components/AdminHeader";

function PortfolioContent() {
  const { projects, openAddModal, openEditModal, handleDelete } = useAdmin();

  return (
    <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
      <AdminHeader
        title="Manage Portfolio"
        description="Review, add, or customize showcase projects."
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <div key={p.id} className="bg-[#0d0d0f] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between">
              <div className="relative aspect-video w-full bg-zinc-900 flex items-center justify-center text-zinc-600 border-b border-zinc-850">
                <div className="text-center p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-zinc-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="text-sm uppercase font-bold text-zinc-500 tracking-wider">Project Snapshot</span>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-sm text-emerald-400 uppercase tracking-wider font-bold mb-1 block">{p.category}</span>
                  <h4 className="font-bold text-white text-sm mb-4 leading-snug">{p.title}</h4>
                </div>

                <div className="flex gap-2 pt-4 border-t border-zinc-850 mt-auto">
                  <button
                    onClick={() => openEditModal("portfolio", p)}
                    className="flex-1 bg-zinc-800/80 hover:bg-zinc-700/80 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete("portfolio", p.id)}
                    className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
