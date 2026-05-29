"use client";

import React from "react";
import { useAdmin } from "../_context/AdminContext";
import AuthGuard from "../_components/AuthGuard";
import AdminHeader from "../_components/AdminHeader";

function InboxContent() {
  const { messages, setViewMessage, toggleReadMessage, handleDelete } = useAdmin();

  return (
    <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
      <AdminHeader
        title="Inboxes & Feedback"
        description="Read and reply to prospective clients."
      />

      <div className="space-y-6">
        <h3 className="font-bold text-lg text-white">Client Inbox</h3>

        <div className="bg-[#0d0d0f] border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-950/80 text-zinc-400 font-bold border-b border-zinc-850">
                  <th className="p-4 uppercase tracking-wider">Sender</th>
                  <th className="p-4 uppercase tracking-wider">Email Address</th>
                  <th className="p-4 uppercase tracking-wider">Date Received</th>
                  <th className="p-4 uppercase tracking-wider">Message Preview</th>
                  <th className="p-4 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map(msg => (
                  <tr
                    key={msg.id}
                    className={`border-b border-zinc-850 hover:bg-zinc-900/30 transition-colors ${
                      !msg.read ? "bg-emerald-500/[0.01] font-semibold text-white" : "text-zinc-400"
                    }`}
                  >
                    <td className="p-4 flex items-center gap-2">
                      {!msg.read && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />}
                      <span>{msg.name}</span>
                    </td>
                    <td className="p-4">{msg.email}</td>
                    <td className="p-4 text-zinc-500">{msg.date}</td>
                    <td className="p-4 truncate max-w-[200px]">{msg.message}</td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <button
                        onClick={() => setViewMessage(msg)}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-3 py-1.5 rounded transition-colors"
                      >
                        Open
                      </button>
                      <button
                        onClick={() => toggleReadMessage(msg.id)}
                        className="text-zinc-400 hover:text-white px-2 py-1.5 rounded transition-colors"
                        title={msg.read ? "Mark Unread" : "Mark Read"}
                      >
                        {msg.read ? "Unread" : "Read"}
                      </button>
                      <button
                        onClick={() => handleDelete("messages", msg.id)}
                        className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 px-2 py-1.5 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
