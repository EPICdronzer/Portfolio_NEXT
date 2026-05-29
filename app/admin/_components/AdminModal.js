"use client";

import React, { useState } from "react";
import { useAdmin } from "../_context/AdminContext";

const MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CATEGORIES = ["Development", "Design", "Marketing"];
const IMG_POSITIONS = ["object-center", "object-left", "object-right", "object-top", "object-bottom"];

const inputCls = "w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors duration-200";
const labelCls = "block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2";

function FieldRow({ children }) {
  return <div className="grid grid-cols-2 gap-4">{children}</div>;
}

export default function AdminModal() {
  const {
    isModalOpen, setIsModalOpen,
    modalType, modalAction,
    formService, setFormService,
    formExp, setFormExp,
    formProj, setFormProj,
    formBlog, setFormBlog,
    handleSave,
    showAlert,
  } = useAdmin();

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const { uploadToCloudinary } = await import("@/backend/actions/cloudinary");
        const res = await uploadToCloudinary(reader.result);
        if (res.success && res.url) {
          if (type === "portfolio") setFormProj(prev => ({ ...prev, image: res.url }));
          else if (type === "blog") setFormBlog(prev => ({ ...prev, image: res.url }));
        } else {
          showAlert("Upload failed: " + (res.error || "Unknown error"), "Upload Failed", "danger");
        }
      } catch (err) {
        console.error(err);
        showAlert("An unexpected error occurred during image upload.", "Upload Error", "danger");
      } finally {
        setUploading(false);
      }
    };
  };

  if (!isModalOpen) return null;

  const titles = {
    services: `${modalAction === "add" ? "Add New" : "Edit"} Service`,
    experience: `${modalAction === "add" ? "Add New" : "Edit"} Experience`,
    portfolio: `${modalAction === "add" ? "Add New" : "Edit"} Portfolio Project`,
    blog: `${modalAction === "add" ? "Publish New" : "Edit"} Blog Post`,
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50"
      onClick={e => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
    >
      <div className="bg-[#0e0e11] border border-zinc-800 rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-800 sticky top-0 bg-[#0e0e11] z-10">
          <h3 className="font-extrabold text-white text-lg">{titles[modalType]}</h3>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSave} className="p-8 space-y-5">

          {/* ── Service Fields ─────────────────────────────────────── */}
          {modalType === "services" && (
            <>
              <div>
                <label className={labelCls}>Category Tab</label>
                <select
                  value={formService.category}
                  onChange={e => setFormService({ ...formService, category: e.target.value })}
                  className={inputCls}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <FieldRow>
                <div>
                  <label className={labelCls}>Service Title *</label>
                  <input
                    type="text" required
                    value={formService.title}
                    onChange={e => setFormService({ ...formService, title: e.target.value })}
                    className={inputCls} placeholder="e.g. Web Development"
                  />
                </div>
                <div>
                  <label className={labelCls}>URL Slug *</label>
                  <input
                    type="text" required
                    value={formService.slug}
                    onChange={e => setFormService({ ...formService, slug: e.target.value })}
                    className={inputCls} placeholder="e.g. web-dev"
                  />
                </div>
              </FieldRow>
              <div>
                <label className={labelCls}>Description *</label>
                <textarea
                  required rows={3}
                  value={formService.desc}
                  onChange={e => setFormService({ ...formService, desc: e.target.value })}
                  className={inputCls} placeholder="Short description shown on the service card..."
                />
              </div>
            </>
          )}

          {/* ── Experience Fields ──────────────────────────────────── */}
          {modalType === "experience" && (
            <>
              {/* Start period */}
              <div>
                <label className={labelCls}>Start Period</label>
                <FieldRow>
                  <div>
                    <select
                      value={formExp.startMonth}
                      onChange={e => setFormExp({ ...formExp, startMonth: e.target.value })}
                      className={inputCls}
                    >
                      <option value="">No Month (year only)</option>
                      {MONTHS.filter(Boolean).map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <p className="text-zinc-600 text-xs mt-1">Start Month (optional)</p>
                  </div>
                  <div>
                    <input
                      type="text" required
                      value={formExp.startYear}
                      onChange={e => setFormExp({ ...formExp, startYear: e.target.value })}
                      className={inputCls} placeholder="e.g. 2022"
                    />
                    <p className="text-zinc-600 text-xs mt-1">Start Year *</p>
                  </div>
                </FieldRow>
              </div>

              {/* End period */}
              <div>
                <label className={labelCls}>End Period</label>
                <FieldRow>
                  <div>
                    <select
                      value={formExp.endMonth}
                      onChange={e => setFormExp({ ...formExp, endMonth: e.target.value })}
                      className={inputCls}
                    >
                      <option value="">No Month (year only)</option>
                      {MONTHS.filter(Boolean).map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <p className="text-zinc-600 text-xs mt-1">End Month (optional)</p>
                  </div>
                  <div>
                    <input
                      type="text" required
                      value={formExp.endYear}
                      onChange={e => setFormExp({ ...formExp, endYear: e.target.value })}
                      className={inputCls} placeholder="e.g. 2023 or Present"
                    />
                    <p className="text-zinc-600 text-xs mt-1">End Year *</p>
                  </div>
                </FieldRow>
              </div>

              <div>
                <label className={labelCls}>Role / Position *</label>
                <input
                  type="text" required
                  value={formExp.role}
                  onChange={e => setFormExp({ ...formExp, role: e.target.value })}
                  className={inputCls} placeholder="e.g. Senior UI/UX Designer"
                />
              </div>
              <FieldRow>
                <div>
                  <label className={labelCls}>Company Name *</label>
                  <input
                    type="text" required
                    value={formExp.company}
                    onChange={e => setFormExp({ ...formExp, company: e.target.value })}
                    className={inputCls} placeholder="e.g. Morson Hybrid, Canada"
                  />
                </div>
                <div>
                  <label className={labelCls}>Extra Note</label>
                  <input
                    type="text"
                    value={formExp.companyExtra}
                    onChange={e => setFormExp({ ...formExp, companyExtra: e.target.value })}
                    className={inputCls} placeholder="e.g. (Remote)"
                  />
                </div>
              </FieldRow>
              <div>
                <label className={labelCls}>Company Website (Go to website link)</label>
                <input
                  type="text"
                  value={formExp.href}
                  onChange={e => setFormExp({ ...formExp, href: e.target.value })}
                  className={inputCls} placeholder="https://..."
                />
              </div>
            </>
          )}

          {/* ── Portfolio Fields ───────────────────────────────────── */}
          {modalType === "portfolio" && (
            <>
              <div>
                <label className={labelCls}>Project Title *</label>
                <input
                  type="text" required
                  value={formProj.title}
                  onChange={e => setFormProj({ ...formProj, title: e.target.value })}
                  className={inputCls} placeholder="e.g. DesiCart — Saree E-commerce"
                />
              </div>
              <FieldRow>
                <div>
                  <label className={labelCls}>Category *</label>
                  <input
                    type="text" required
                    value={formProj.category}
                    onChange={e => setFormProj({ ...formProj, category: e.target.value })}
                    className={inputCls} placeholder="e.g. E-commerce . UI Design"
                  />
                </div>
                <div>
                  <label className={labelCls}>URL Slug *</label>
                  <input
                    type="text" required
                    value={formProj.slug}
                    onChange={e => setFormProj({ ...formProj, slug: e.target.value })}
                    className={inputCls} placeholder="e.g. desicart"
                  />
                </div>
              </FieldRow>
              <div>
                <label className={labelCls}>Screenshot Image URL or Upload</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={formProj.image}
                    onChange={e => setFormProj({ ...formProj, image: e.target.value })}
                    className={`${inputCls} flex-1`} placeholder="Paste Cloudinary URL or upload →"
                  />
                  <div className="flex-shrink-0">
                    <input type="file" accept="image/*" onChange={e => handleImageUpload(e, "portfolio")} className="hidden" id="portfolio-upload" disabled={uploading} />
                    <label htmlFor="portfolio-upload" className={`flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 py-3 rounded-xl cursor-pointer transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                      {uploading ? <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" /> : <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        Upload
                      </>}
                    </label>
                  </div>
                </div>
              </div>
              <FieldRow>
                <div>
                  <label className={labelCls}>Image Position</label>
                  <select value={formProj.imgPos} onChange={e => setFormProj({ ...formProj, imgPos: e.target.value })} className={inputCls}>
                    {IMG_POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Live / Detail Link</label>
                  <input type="text" value={formProj.href} onChange={e => setFormProj({ ...formProj, href: e.target.value })} className={inputCls} placeholder="https://..." />
                </div>
              </FieldRow>
            </>
          )}

          {/* ── Blog Fields ────────────────────────────────────────── */}
          {modalType === "blog" && (
            <>
              <div>
                <label className={labelCls}>Article Title *</label>
                <input
                  type="text" required
                  value={formBlog.title}
                  onChange={e => setFormBlog({ ...formBlog, title: e.target.value })}
                  className={inputCls} placeholder="e.g. Mastering UI Design in 2025"
                />
              </div>
              <FieldRow>
                <div>
                  <label className={labelCls}>URL Slug *</label>
                  <input
                    type="text" required
                    value={formBlog.slug}
                    onChange={e => setFormBlog({ ...formBlog, slug: e.target.value })}
                    className={inputCls} placeholder="e.g. mastering-ui-design"
                  />
                </div>
                <div>
                  <label className={labelCls}>Publication Date *</label>
                  <input
                    type="text" required
                    value={formBlog.date}
                    onChange={e => setFormBlog({ ...formBlog, date: e.target.value })}
                    className={inputCls} placeholder="e.g. January 02, 2025"
                  />
                </div>
              </FieldRow>
              <div>
                <label className={labelCls}>Thumbnail Image URL or Upload</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={formBlog.image}
                    onChange={e => setFormBlog({ ...formBlog, image: e.target.value })}
                    className={`${inputCls} flex-1`} placeholder="Paste Cloudinary URL or upload →"
                  />
                  <div className="flex-shrink-0">
                    <input type="file" accept="image/*" onChange={e => handleImageUpload(e, "blog")} className="hidden" id="blog-upload" disabled={uploading} />
                    <label htmlFor="blog-upload" className={`flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 py-3 rounded-xl cursor-pointer transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                      {uploading ? <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" /> : <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        Upload
                      </>}
                    </label>
                  </div>
                </div>
              </div>
              <FieldRow>
                <div>
                  <label className={labelCls}>Image Position</label>
                  <select value={formBlog.imgPos} onChange={e => setFormBlog({ ...formBlog, imgPos: e.target.value })} className={inputCls}>
                    {IMG_POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </FieldRow>
              <div>
                <label className={labelCls}>Article Content</label>
                <textarea
                  rows={5}
                  value={formBlog.content}
                  onChange={e => setFormBlog({ ...formBlog, content: e.target.value })}
                  className={inputCls} placeholder="Full blog content (Markdown or plain text)..."
                />
              </div>
            </>
          )}

          {/* ── Submit ─────────────────────────────────────────────── */}
          <div className="flex gap-3 justify-end pt-6 border-t border-zinc-800 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black text-xs font-extrabold px-8 py-3 rounded-xl shadow-lg transition-colors"
            >
              {modalAction === "add" ? "Save & Publish" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
