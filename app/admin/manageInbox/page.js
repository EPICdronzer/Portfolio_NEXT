"use client";

import React from "react";
import { useAdmin } from "../_context/AdminContext";
import AuthGuard from "../_components/AuthGuard";
import AdminHeader from "../_components/AdminHeader";

function InboxContent() {
  const { messages, dataLoading, setViewMessage, toggleReadMessage, handleDelete } = useAdmin();

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
      <AdminHeader
        title="Manage Inbox"
        description="Read and manage messages submitted via the contact form."
      />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-lg text-white">Client Inbox</h3>
          {unreadCount > 0 && (
            <span className="bg-emerald-500 text-black text-xs font-bold px-2.5 py-0.5 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>

        {dataLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-zinc-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            All caught up! No messages received yet.
          </div>
        ) : (
          <div className="bg-[#0d0d0f] border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-950/80 text-zinc-400 font-bold border-b border-zinc-800">
                    <th className="p-4 uppercase tracking-wider">Sender</th>
                    <th className="p-4 uppercase tracking-wider">Email</th>
                    <th className="p-4 uppercase tracking-wider hidden md:table-cell">Phone</th>
                    <th className="p-4 uppercase tracking-wider hidden lg:table-cell">Subject</th>
                    <th className="p-4 uppercase tracking-wider">Date</th>
                    <th className="p-4 uppercase tracking-wider">Preview</th>
                    <th className="p-4 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map(msg => (
                    <tr
                      key={msg._id}
                      className={`border-b border-zinc-900 hover:bg-zinc-900/30 transition-colors ${
                        !msg.read ? "bg-emerald-500/[0.01] font-semibold text-white" : "text-zinc-400"
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {!msg.read && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />}
                          <span>{msg.name}</span>
                        </div>
                      </td>
                      <td className="p-4">{msg.email}</td>
                      <td className="p-4 hidden md:table-cell text-zinc-500">{msg.phone || "—"}</td>
                      <td className="p-4 hidden lg:table-cell text-zinc-500">{msg.subject || "—"}</td>
                      <td className="p-4 text-zinc-500 whitespace-nowrap">{msg.date}</td>
                      <td className="p-4 truncate max-w-[160px]">{msg.message}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setViewMessage(msg)}
                            className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-3 py-1.5 rounded transition-colors text-xs"
                          >
                            Open
                          </button>
                          <button
                            onClick={() => toggleReadMessage(msg._id)}
                            className="text-zinc-400 hover:text-white px-2 py-1.5 rounded transition-colors text-xs"
                            title={msg.read ? "Mark Unread" : "Mark Read"}
                          >
                            {msg.read ? "Unread" : "Read"}
                          </button>
                          <button
                            onClick={() => handleDelete("messages", msg._id)}
                            className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 px-2 py-1.5 rounded transition-colors text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function AdminInboxPage() {
  return (
    <AuthGuard>
      <InboxContent />
    </AuthGuard>
  );
}
