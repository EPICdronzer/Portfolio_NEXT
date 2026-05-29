"use client";

import React from "react";
import { useAdmin } from "../_context/AdminContext";
import AuthGuard from "../_components/AuthGuard";
import AdminHeader from "../_components/AdminHeader";

function DashboardOverview() {
  const { projects, services, experiences, blogs, messages, setViewMessage } = useAdmin();

  const kpis = [
    { title: "Total Projects", count: projects.length, color: "text-amber-400", bg: "bg-amber-400/5", border: "border-amber-400/10" },
    { title: "Services Offered", count: services.length, color: "text-emerald-400", bg: "bg-emerald-400/5", border: "border-emerald-400/10" },
    { title: "Timeline Milestones", count: experiences.length, color: "text-blue-400", bg: "bg-blue-400/5", border: "border-blue-400/10" },
    { title: "Blog Articles", count: blogs.length, color: "text-purple-400", bg: "bg-purple-400/5", border: "border-purple-400/10" },
  ];

  const unreadMessages = messages.filter(m => !m.read);

  const activities = [
    { text: "Published ethnic wear project Mumbai Metro", time: "2 hours ago", icon: <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" /> },
    { text: "Received message from Priya Sharma", time: "5 hours ago", icon: <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" /> },
    { text: "Modified Junior Visual Designer timeline description", time: "1 day ago", icon: <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" /> },
    { text: "Updated Web Development service category", time: "2 days ago", icon: <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shrink-0" /> },
  ];

  return (
    <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
      <AdminHeader
        title="Portfolio Dashboard"
        description="Quick overview and recent activities."
      />

      <div className="space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => (
            <div key={idx} className={`p-6 rounded-2xl bg-[#0d0d0f] border ${kpi.border} flex flex-col justify-between`}>
              <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">{kpi.title}</span>
              <span className={`text-4xl font-black ${kpi.color} mt-4`}>{kpi.count}</span>
            </div>
          ))}
        </div>

        {/* Middle Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Quick Messages */}
          <div className="lg:col-span-7 bg-[#0d0d0f] border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-white text-base">Unread Inbox</h3>
            </div>

            <div className="space-y-4">
              {unreadMessages.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-zinc-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  All caught up! No unread messages.
                </div>
              ) : (
                unreadMessages.map(msg => (
                  <div
                    key={msg.id}
                    onClick={() => setViewMessage(msg)}
                    className="p-4 rounded-xl bg-[#141417] hover:bg-zinc-800/40 border border-zinc-800/50 cursor-pointer transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-white">{msg.name}</span>
                      <span className="text-sm text-zinc-500">{msg.date}</span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate leading-relaxed">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Activity Log */}
          <div className="lg:col-span-5 bg-[#0d0d0f] border border-zinc-800 rounded-2xl p-6">
            <h3 className="font-extrabold text-white text-base mb-6">Recent Activity</h3>
            <div className="space-y-5">
              {activities.map((act, idx) => (
                <div key={idx} className="flex gap-3 text-xs">
                  {act.icon}
                  <div className="flex flex-col gap-0.5">
                    <p className="text-zinc-300 leading-relaxed">{act.text}</p>
                    <span className="text-sm text-zinc-500">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AdminDashboardPage() {
  return (
    <AuthGuard>
      <DashboardOverview />
    </AuthGuard>
  );
}
