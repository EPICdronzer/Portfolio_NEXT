"use client";

import React from "react";
import Image from "next/image";
import { useAdmin } from "../_context/AdminContext";
import AuthGuard from "../_components/AuthGuard";
import AdminHeader from "../_components/AdminHeader";

function BlogsContent() {
  const { blogs, dataLoading, openAddModal, openEditModal, handleDelete } = useAdmin();

  return (
    <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
      <AdminHeader
        title="Manage Blog Posts"
        description="Publish articles shown in the homepage Latest News section — title, date, thumbnail image, content, and slug."
      />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-white">Published Articles</h3>
          <button
            onClick={() => openAddModal("blog")}
            className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md transition-colors"
          >
            + Write Post
          </button>
        </div>

        {dataLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 text-sm">No blog posts yet. Write your first article!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(b => (
              <div key={b._id} className="bg-[#0d0d0f] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col">
                {/* Thumbnail */}
                <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden border-b border-zinc-800">
                  {b.image && b.image !== "/blog_thumbnails.png" ? (
                    <Image src={b.image} alt={b.title} fill className={`object-cover ${b.imgPos || "object-center"}`} />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 11h4m-4 4h4m-6-8h6" /></svg>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-zinc-500 font-semibold mb-1.5 block">{b.date}</span>
                    <h4 className="font-bold text-white text-sm mb-2 leading-snug">{b.title}</h4>
                    <p className="text-xs text-zinc-600">Slug: <code className="text-zinc-500">/blog/{b.slug}</code></p>
                    {b.content && (
                      <p className="text-xs text-zinc-600 mt-1 line-clamp-2">{b.content.substring(0, 80)}...</p>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-zinc-800 mt-4">
                    <button
                      onClick={() => openEditModal("blog", b)}
                      className="flex-1 bg-zinc-800/80 hover:bg-zinc-700/80 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete("blog", b._id)}
                      className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function AdminBlogsPage() {
  return (
    <AuthGuard>
      <BlogsContent />
    </AuthGuard>
  );
}
