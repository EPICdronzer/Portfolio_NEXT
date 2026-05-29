"use client";

import React from "react";
import { useAdmin } from "../_context/AdminContext";
import AuthGuard from "../_components/AuthGuard";
import AdminHeader from "../_components/AdminHeader";

function ServicesContent() {
  const { services, openAddModal, openEditModal, handleDelete } = useAdmin();

  return (
    <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
      <AdminHeader
        title="Manage Services"
        description="Configure cards shown in the services section."
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s => (
            <div key={s.id} className="bg-[#0d0d0f] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-zinc-800 text-emerald-400 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <h4 className="font-bold text-white text-base mb-2">{s.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">{s.desc}</p>
              </div>

              <div className="flex gap-2 border-t border-zinc-800 pt-4 mt-auto">
                <button
                  onClick={() => openEditModal("services", s)}
                  className="flex-1 bg-zinc-800/80 hover:bg-zinc-700/80 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete("services", s.id)}
                  className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
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
