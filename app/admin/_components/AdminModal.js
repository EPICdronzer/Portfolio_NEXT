"use client";

import React, { useState } from "react";
import { useAdmin } from "../_context/AdminContext";

const MONTHS      = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CATEGORIES  = ["Development", "Design", "Marketing"];
const IMG_POSITIONS = ["object-center", "object-left", "object-right", "object-top", "object-bottom"];

const inputCls = "w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors duration-200";
const labelCls = "block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2";

function FieldRow({ children }) {
  return <div className="grid grid-cols-2 gap-4">{children}</div>;
}

/* ────────────────────────────────────────────────────
   Multi-image uploader widget
   Props:
     images      — current array of URLs
     setImages   — updater for images array
     imageMode   — "replace" | "append"  (only shown on edit)
     setImageMode
     isEdit      — boolean
     uploading   — boolean
     setUploading
     showAlert
     uploadId    — unique id for the hidden file input
──────────────────────────────────────────────────── */
function MultiImageUploader({ images, setImages, imageMode, setImageMode, isEdit, uploading, setUploading, showAlert, uploadId }) {
  const safeImages = Array.isArray(images) ? images : [];

  const handleFilesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      const { uploadToCloudinary } = await import("@/backend/actions/cloudinary");
      const results = await Promise.all(
        files.map(file => new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = async () => {
            const res = await uploadToCloudinary(reader.result);
            resolve(res.success ? res.url : null);
          };
        }))
      );
      const uploaded = results.filter(Boolean);
      if (uploaded.length < files.length) {
        showAlert(`${files.length - uploaded.length} image(s) failed to upload.`, "Upload Warning", "warning");
      }
      
      const safePrev = Array.isArray(images) ? images : [];
      if (imageMode === "replace") {
        setImages(uploaded);
      } else {
        setImages([...safePrev, ...uploaded]);
      }
    } catch (err) {
      console.error(err);
      showAlert("Upload error occurred.", "Upload Error", "danger");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (idx) => {
    const safePrev = Array.isArray(images) ? images : [];
    setImages(safePrev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      <label className={labelCls}>
        Images {isEdit ? "(Replace or Add More)" : ""}
      </label>

      {/* Replace / Append toggle — edit only */}
      {isEdit && (
        <div className="flex gap-3 mb-3">
          {["replace", "append"].map(mode => (
            <button
              key={mode}
              type="button"
              onClick={() => setImageMode(mode)}
              className={`text-xs font-bold px-4 py-2 rounded-lg border transition-colors ${
                imageMode === mode
                  ? "bg-emerald-500 border-emerald-500 text-black"
                  : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-white"
              }`}
            >
              {mode === "replace" ? "🔄 Replace All" : "➕ Add More"}
            </button>
          ))}
          <span className="text-zinc-600 text-xs self-center">
            {imageMode === "replace" ? "New uploads will replace all current images" : "New uploads will be added alongside current ones"}
          </span>
        </div>
      )}

      {/* Current image thumbnails */}
      {safeImages.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
          {safeImages.map((url, idx) => (
            <div key={idx} className="relative group">
              <img
                src={url}
                alt={`img-${idx}`}
                className="w-20 h-16 object-cover rounded-lg border border-zinc-700"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-600 hover:bg-rose-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
              >✕</button>
              {idx === 0 && (
                <span className="absolute bottom-0 left-0 right-0 bg-emerald-600/80 text-white text-[9px] font-bold text-center rounded-b-lg py-0.5">
                  COVER
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
          className="hidden"
          id={uploadId}
          disabled={uploading}
        />
        <label
          htmlFor={uploadId}
          className={`inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-colors border border-zinc-700 ${uploading ? "opacity-50 pointer-events-none" : ""}`}
        >
          {uploading ? (
            <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          )}
          {uploading ? "Uploading…" : `Upload Image${safeImages.length > 0 ? "s" : ""} to Cloudinary`}
        </label>
        <p className="text-zinc-600 text-[11px] mt-1.5">Select multiple files at once. The first image will be used as the cover/thumbnail.</p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────
   Single-image uploader widget (for company logos)
   Props:
     image       — current image URL
     setImage    — updater for image
     uploading   — boolean
     setUploading
     showAlert
     uploadId    — unique id for the hidden file input
     label       — label text (default: "Logo")
──────────────────────────────────────────────────── */
function SingleImageUploader({ image, setImage, uploading, setUploading, showAlert, uploadId, label = "Logo" }) {
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          try {
            const { uploadToCloudinary } = await import("@/backend/actions/cloudinary");
            const res = await uploadToCloudinary(reader.result);
            if (res.success) {
              resolve(res.url);
            } else {
              reject(new Error("Failed to upload image."));
            }
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = () => reject(new Error("File reading failed."));
      });
      setImage(url);
    } catch (err) {
      console.error(err);
      showAlert(err.message || "Upload error occurred.", "Upload Error", "danger");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = () => setImage("");

  return (
    <div className="space-y-3">
      <label className={labelCls}>{label}</label>

      {/* Current image thumbnail */}
      {image && (
        <div className="relative group inline-block">
          <img
            src={image}
            alt={label}
            className="w-24 h-24 object-cover rounded-lg border border-zinc-700"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 w-6 h-6 bg-rose-600 hover:bg-rose-500 rounded-full flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
          >✕</button>
        </div>
      )}

      {/* Upload button */}
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id={uploadId}
          disabled={uploading}
        />
        <label
          htmlFor={uploadId}
          className={`inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-colors border border-zinc-700 ${uploading ? "opacity-50 pointer-events-none" : ""}`}
        >
          {uploading ? (
            <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          )}
          {uploading ? "Uploading…" : `Upload ${label}`}
        </label>
      </div>
    </div>
  );
}

/* ─────────────────────── Main Modal ─────────────────────── */
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
  const isEdit = modalAction === "edit";

  if (!isModalOpen) return null;

  const titles = {
    services:   `${isEdit ? "Edit" : "Add New"} Service`,
    experience: `${isEdit ? "Edit" : "Add New"} Experience`,
    portfolio:  `${isEdit ? "Edit" : "Add New"} Portfolio Project`,
    blog:       `${isEdit ? "Edit" : "Publish New"} Blog Post`,
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

          {/* ── Service Fields ─────────────────────────────────── */}
          {modalType === "services" && (
            <>
              <div>
                <label className={labelCls}>Category Tab</label>
                <select value={formService.category} onChange={e => setFormService({ ...formService, category: e.target.value })} className={inputCls}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <FieldRow>
                <div>
                  <label className={labelCls}>Service Title *</label>
                  <input type="text" required value={formService.title} onChange={e => setFormService({ ...formService, title: e.target.value })} className={inputCls} placeholder="e.g. Web Development" />
                </div>
                <div>
                  <label className={labelCls}>URL Slug *</label>
                  <input type="text" required value={formService.slug} onChange={e => setFormService({ ...formService, slug: e.target.value })} className={inputCls} placeholder="e.g. web-dev" />
                </div>
              </FieldRow>
              <div>
                <label className={labelCls}>Description *</label>
                <textarea required rows={3} value={formService.desc} onChange={e => setFormService({ ...formService, desc: e.target.value })} className={inputCls} placeholder="Short description shown on the service card..." />
              </div>
              <MultiImageUploader
                images={formService.images || []}
                setImages={imgs => setFormService(prev => ({ ...prev, images: imgs }))}
                imageMode={formService.imageMode || "replace"}
                setImageMode={mode => setFormService(prev => ({ ...prev, imageMode: mode }))}
                isEdit={isEdit}
                uploading={uploading}
                setUploading={setUploading}
                showAlert={showAlert}
                uploadId="service-upload"
              />
            </>
          )}

          {/* ── Experience Fields ──────────────────────────────── */}
          {modalType === "experience" && (
            <>
              <div>
                <label className={labelCls}>Start Period</label>
                <FieldRow>
                  <div>
                    <select value={formExp.startMonth} onChange={e => setFormExp({ ...formExp, startMonth: e.target.value })} className={inputCls}>
                      <option value="">No Month (year only)</option>
                      {MONTHS.filter(Boolean).map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <p className="text-zinc-600 text-xs mt-1">Start Month (optional)</p>
                  </div>
                  <div>
                    <input type="text" required value={formExp.startYear} onChange={e => setFormExp({ ...formExp, startYear: e.target.value })} className={inputCls} placeholder="e.g. 2022" />
                    <p className="text-zinc-600 text-xs mt-1">Start Year *</p>
                  </div>
                </FieldRow>
              </div>
              <div>
                <label className={labelCls}>End Period</label>
                <FieldRow>
                  <div>
                    <select value={formExp.endMonth} onChange={e => setFormExp({ ...formExp, endMonth: e.target.value })} className={inputCls}>
                      <option value="">No Month (year only)</option>
                      {MONTHS.filter(Boolean).map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <p className="text-zinc-600 text-xs mt-1">End Month (optional)</p>
                  </div>
                  <div>
                    <input type="text" required value={formExp.endYear} onChange={e => setFormExp({ ...formExp, endYear: e.target.value })} className={inputCls} placeholder="e.g. 2023 or Present" />
                    <p className="text-zinc-600 text-xs mt-1">End Year *</p>
                  </div>
                </FieldRow>
              </div>
              <div>
                <label className={labelCls}>Role / Position *</label>
                <input type="text" required value={formExp.role} onChange={e => setFormExp({ ...formExp, role: e.target.value })} className={inputCls} placeholder="e.g. Senior UI/UX Designer" />
              </div>
              <FieldRow>
                <div>
                  <label className={labelCls}>Company Name *</label>
                  <input type="text" required value={formExp.company} onChange={e => setFormExp({ ...formExp, company: e.target.value })} className={inputCls} placeholder="e.g. Morson Hybrid, Canada" />
                </div>
                <div>
                  <label className={labelCls}>Extra Note</label>
                  <input type="text" value={formExp.companyExtra} onChange={e => setFormExp({ ...formExp, companyExtra: e.target.value })} className={inputCls} placeholder="e.g. (Remote)" />
                </div>
              </FieldRow>
              <div>
                <label className={labelCls}>Company Website</label>
                <input type="text" value={formExp.href} onChange={e => setFormExp({ ...formExp, href: e.target.value })} className={inputCls} placeholder="https://..." />
              </div>
              <FieldRow>
                <SingleImageUploader
                  image={formExp.logo || ""}
                  setImage={url => setFormExp({ ...formExp, logo: url })}
                  uploading={uploading}
                  setUploading={setUploading}
                  showAlert={showAlert}
                  uploadId="exp-logo-upload"
                  label="Company Logo"
                />
              </FieldRow>
              <MultiImageUploader
                images={formExp.images || []}
                setImages={imgs => setFormExp(prev => ({ ...prev, images: imgs }))}
                imageMode={formExp.imageMode || "replace"}
                setImageMode={mode => setFormExp(prev => ({ ...prev, imageMode: mode }))}
                isEdit={isEdit}
                uploading={uploading}
                setUploading={setUploading}
                showAlert={showAlert}
                uploadId="experience-upload"
              />
            </>
          )}

          {/* ── Portfolio Fields ───────────────────────────────── */}
          {modalType === "portfolio" && (
            <>
              <div>
                <label className={labelCls}>Project Title *</label>
                <input type="text" required value={formProj.title} onChange={e => setFormProj({ ...formProj, title: e.target.value })} className={inputCls} placeholder="e.g. DesiCart — Saree E-commerce" />
              </div>
              <FieldRow>
                <div>
                  <label className={labelCls}>Category *</label>
                  <input type="text" required value={formProj.category} onChange={e => setFormProj({ ...formProj, category: e.target.value })} className={inputCls} placeholder="e.g. E-commerce . UI Design" />
                </div>
                <div>
                  <label className={labelCls}>URL Slug *</label>
                  <input type="text" required value={formProj.slug} onChange={e => setFormProj({ ...formProj, slug: e.target.value })} className={inputCls} placeholder="e.g. desicart" />
                </div>
              </FieldRow>
              <div>
                <label className={labelCls}>Short Description (card overlay)</label>
                <input type="text" value={formProj.desc} onChange={e => setFormProj({ ...formProj, desc: e.target.value })} className={inputCls} placeholder="One-line description shown on portfolio grid..." />
              </div>
              <div>
                <label className={labelCls}>Full Project Details (detail page)</label>
                <textarea rows={4} value={formProj.details} onChange={e => setFormProj({ ...formProj, details: e.target.value })} className={inputCls} placeholder="Detailed project overview shown on /portfolio/[slug] page..." />
              </div>
              <div>
                <label className={labelCls}>Technologies Used (comma-separated)</label>
                <input type="text" value={formProj.tech} onChange={e => setFormProj({ ...formProj, tech: e.target.value })} className={inputCls} placeholder="e.g. Next.js, React, MongoDB, Tailwind CSS" />
              </div>
              <MultiImageUploader
                images={formProj.images || []}
                setImages={imgs => setFormProj(prev => ({ ...prev, images: imgs }))}
                imageMode={formProj.imageMode || "replace"}
                setImageMode={mode => setFormProj(prev => ({ ...prev, imageMode: mode }))}
                isEdit={isEdit}
                uploading={uploading}
                setUploading={setUploading}
                showAlert={showAlert}
                uploadId="portfolio-upload"
              />
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

          {/* ── Blog Fields ────────────────────────────────────── */}
          {modalType === "blog" && (
            <>
              <div>
                <label className={labelCls}>Article Title *</label>
                <input type="text" required value={formBlog.title} onChange={e => setFormBlog({ ...formBlog, title: e.target.value })} className={inputCls} placeholder="e.g. Mastering UI Design in 2025" />
              </div>
              <FieldRow>
                <div>
                  <label className={labelCls}>URL Slug *</label>
                  <input type="text" required value={formBlog.slug} onChange={e => setFormBlog({ ...formBlog, slug: e.target.value })} className={inputCls} placeholder="e.g. mastering-ui-design" />
                </div>
                <div>
                  <label className={labelCls}>Publication Date *</label>
                  <input type="text" required value={formBlog.date} onChange={e => setFormBlog({ ...formBlog, date: e.target.value })} className={inputCls} placeholder="e.g. January 02, 2025" />
                </div>
              </FieldRow>
              <FieldRow>
                <div>
                  <label className={labelCls}>Category</label>
                  <input type="text" value={formBlog.category} onChange={e => setFormBlog({ ...formBlog, category: e.target.value })} className={inputCls} placeholder="e.g. Next.js, CSS, Development" />
                </div>
                <div>
                  <label className={labelCls}>Read Time</label>
                  <input type="text" value={formBlog.readTime} onChange={e => setFormBlog({ ...formBlog, readTime: e.target.value })} className={inputCls} placeholder="e.g. 5 min read" />
                </div>
              </FieldRow>
              <MultiImageUploader
                images={formBlog.images || []}
                setImages={imgs => setFormBlog(prev => ({ ...prev, images: imgs }))}
                imageMode={formBlog.imageMode || "replace"}
                setImageMode={mode => setFormBlog(prev => ({ ...prev, imageMode: mode }))}
                isEdit={isEdit}
                uploading={uploading}
                setUploading={setUploading}
                showAlert={showAlert}
                uploadId="blog-upload"
              />
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
                <textarea rows={6} value={formBlog.content} onChange={e => setFormBlog({ ...formBlog, content: e.target.value })} className={inputCls} placeholder="Full blog content. Separate paragraphs with a blank line..." />
              </div>
            </>
          )}

          {/* Submit */}
          <div className="flex gap-3 justify-end pt-6 border-t border-zinc-800 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={uploading} className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black text-xs font-extrabold px-8 py-3 rounded-xl shadow-lg transition-colors">
              {isEdit ? "Save Changes" : "Save & Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
