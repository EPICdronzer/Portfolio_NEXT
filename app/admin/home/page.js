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

  // Helper function to calculate relative time
  const timeAgo = (dateInput) => {
    if (!dateInput) return "some time ago";
    const date = new Date(dateInput);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 0) return "just now";
    
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 }
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  };

  // Helper function to get descriptive verb & noun
  const getVerbAndNoun = (item, type) => {
    const created = new Date(item.createdAt || item.date).getTime();
    const updated = new Date(item.updatedAt || item.createdAt || item.date).getTime();
    const isUpdate = Math.abs(updated - created) > 5000; // > 5 seconds difference

    if (type === "project") {
      return isUpdate ? `Modified portfolio project "${item.title}"` : `Published portfolio project "${item.title}"`;
    }
    if (type === "service") {
      return isUpdate ? `Updated "${item.title}" service details` : `Added new service category "${item.title}"`;
    }
    if (type === "experience") {
      return isUpdate ? `Modified "${item.role}" experience details` : `Added "${item.role}" to timeline milestones`;
    }
    if (type === "blog") {
      return isUpdate ? `Updated blog article "${item.title}"` : `Published new blog article "${item.title}"`;
    }
    if (type === "message") {
      return `Received message from ${item.name}`;
    }
    return "";
  };

  // Construct dynamic activities
  const allActivities = [
    ...projects.map(p => ({
      text: getVerbAndNoun(p, "project"),
      time: p.updatedAt || p.createdAt,
      color: "bg-amber-400"
    })),
    ...services.map(s => ({
      text: getVerbAndNoun(s, "service"),
      time: s.updatedAt || s.createdAt,
      color: "bg-emerald-400"
    })),
    ...experiences.map(e => ({
      text: getVerbAndNoun(e, "experience"),
      time: e.updatedAt || e.createdAt,
      color: "bg-blue-400"
    })),
    ...blogs.map(b => ({
      text: getVerbAndNoun(b, "blog"),
      time: b.updatedAt || b.createdAt,
      color: "bg-purple-400"
    })),
    ...messages.map(m => ({
      text: getVerbAndNoun(m, "message"),
      time: m.createdAt,
      color: "bg-pink-500"
    }))
  ];

  // Sort activities by date descending and take top 5
  const sortedActivities = allActivities
    .filter(act => act.time)
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 5);

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
                    key={msg._id}
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
              {sortedActivities.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 text-sm">
                  No recent activities recorded.
                </div>
              ) : (
                sortedActivities.map((act, idx) => (
                  <div key={idx} className="flex gap-3 text-xs">
                    <span className={`w-2.5 h-2.5 rounded-full ${act.color} shrink-0 mt-1`} />
                    <div className="flex flex-col gap-0.5">
                      <p className="text-zinc-300 leading-relaxed">{act.text}</p>
                      <span className="text-sm text-zinc-500">{timeAgo(act.time)}</span>
                    </div>
                  </div>
                ))
              )}
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
