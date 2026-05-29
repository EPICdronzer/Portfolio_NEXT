"use client";

import React from "react";
import { useAdmin } from "../_context/AdminContext";

export default function AdminModal() {
  const {
    isModalOpen,
    setIsModalOpen,
    modalType,
    modalAction,
    formService,
    setFormService,
    formExp,
    setFormExp,
    formProj,
    setFormProj,
    formBlog,
    setFormBlog,
    handleSave,
  } = useAdmin();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
      <div className="bg-[#0e0e11] border border-zinc-800 rounded-3xl w-full max-w-lg p-8 shadow-2xl relative">
        <h3 className="font-extrabold text-white text-lg mb-6">
          {modalAction === "add" ? "Add New" : "Edit"}{" "}
          {modalType === "services" && "Service"}
          {modalType === "experience" && "Milestone"}
          {modalType === "portfolio" && "Project"}
          {modalType === "blog" && "Blog Post"}
        </h3>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Service Fields */}
          {modalType === "services" && (
            <>
              <div>
                <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Service Title
                </label>
                <input
                  type="text"
                  required
                  value={formService.title}
                  onChange={(e) =>
                    setFormService({ ...formService, title: e.target.value })
                  }
                  className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  placeholder="e.g. Full-Stack Web Apps"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={formService.desc}
                  onChange={(e) =>
                    setFormService({ ...formService, desc: e.target.value })
                  }
                  className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  placeholder="Give a descriptive summary..."
                />
              </div>
            </>
          )}

          {/* Experience Fields */}
          {modalType === "experience" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Period
                  </label>
                  <input
                    type="text"
                    required
                    value={formExp.period}
                    onChange={(e) =>
                      setFormExp({ ...formExp, period: e.target.value })
                    }
                    className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    placeholder="e.g. 2024 - Present"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Accent Color
                  </label>
                  <select
                    value={formExp.companyColor}
                    onChange={(e) =>
                      setFormExp({ ...formExp, companyColor: e.target.value })
                    }
                    className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  >
                    <option value="text-rose-400">Rose/Red Accent</option>
                    <option value="text-blue-400">Blue Accent</option>
                    <option value="text-green-400">Green Accent</option>
                    <option value="text-amber-400">Gold/Amber Accent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Role/Position
                </label>
                <input
                  type="text"
                  required
                  value={formExp.role}
                  onChange={(e) =>
                    setFormExp({ ...formExp, role: e.target.value })
                  }
                  className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  placeholder="e.g. Lead Designer"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formExp.company}
                    onChange={(e) =>
                      setFormExp({ ...formExp, company: e.target.value })
                    }
                    className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    placeholder="e.g. Mumbai Transit Corp"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Extra (e.g. Remote)
                  </label>
                  <input
                    type="text"
                    value={formExp.companyExtra}
                    onChange={(e) =>
                      setFormExp({ ...formExp, companyExtra: e.target.value })
                    }
                    className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    placeholder="e.g. (Remote)"
                  />
                </div>
              </div>
            </>
          )}

          {/* Portfolio Fields */}
          {modalType === "portfolio" && (
            <>
              <div>
                <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={formProj.title}
                  onChange={(e) =>
                    setFormProj({ ...formProj, title: e.target.value })
                  }
                  className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  placeholder="e.g. Mumbai Metro UI"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Category
                </label>
                <input
                  type="text"
                  required
                  value={formProj.category}
                  onChange={(e) =>
                    setFormProj({ ...formProj, category: e.target.value })
                  }
                  className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  placeholder="e.g. Mobile App . UI/UX"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Asset/Screenshot Link
                  </label>
                  <input
                    type="text"
                    required
                    value={formProj.image}
                    onChange={(e) =>
                      setFormProj({ ...formProj, image: e.target.value })
                    }
                    className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Live/Details Link
                  </label>
                  <input
                    type="text"
                    value={formProj.href}
                    onChange={(e) =>
                      setFormProj({ ...formProj, href: e.target.value })
                    }
                    className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </>
          )}

          {/* Blog Fields */}
          {modalType === "blog" && (
            <>
              <div>
                <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={formBlog.title}
                  onChange={(e) =>
                    setFormBlog({ ...formBlog, title: e.target.value })
                  }
                  className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  placeholder="e.g. Mastering Tailwind CSS v4 in Next.js"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Publication Date
                  </label>
                  <input
                    type="text"
                    required
                    value={formBlog.date}
                    onChange={(e) =>
                      setFormBlog({ ...formBlog, date: e.target.value })
                    }
                    className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Article Link URL
                  </label>
                  <input
                    type="text"
                    value={formBlog.href}
                    onChange={(e) =>
                      setFormBlog({ ...formBlog, href: e.target.value })
                    }
                    className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    placeholder="#"
                  />
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Thumbnail Asset Link
                </label>
                <input
                  type="text"
                  required
                  value={formBlog.image}
                  onChange={(e) =>
                    setFormBlog({ ...formBlog, image: e.target.value })
                  }
                  className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-6 border-t border-zinc-850 mt-8">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white text-xs font-bold px-5 py-3 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold px-6 py-3 rounded-xl shadow-lg transition-colors"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
