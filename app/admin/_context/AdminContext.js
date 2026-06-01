"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getSettings, updateSettings, loginAdmin } from "@/backend/actions/settings";
import { getServices, addService, updateService, deleteService } from "@/backend/actions/service";
import { getPortfolios, addPortfolio, updatePortfolio, deletePortfolio } from "@/backend/actions/portfolio";
import { getExperiences, addExperience, updateExperience, deleteExperience } from "@/backend/actions/experience";
import { getBlogs, addBlog, updateBlog, deleteBlog } from "@/backend/actions/blog";
import { getMessages, toggleMessageRead, deleteMessage } from "@/backend/actions/messages";

// ─── Context ──────────────────────────────────────────────────────────────────
const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  // Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // System Settings (DB-backed statistics counts)
  const [systemSettings, setSystemSettings] = useState({
    projectsDone: 50,
    yearsExperience: 3,
    experienceMonths: 0,
    happyClients: 30,
    technologies: 12,
  });

  // Data state — loaded from MongoDB
  const [services, setServices] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Toast
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalAction, setModalAction] = useState("add");
  const [editItem, setEditItem] = useState(null);

  // Form fields — each section has its own form state
  const defaultFormService = { category: "Development", title: "", desc: "", iconName: "code", slug: "", images: [], imageMode: "replace" };
  const defaultFormExp = { startMonth: "", startYear: "", endMonth: "", endYear: "", role: "", company: "", companyExtra: "", logo: "", href: "#" };
  const defaultFormProj = { title: "", category: "", desc: "", details: "", tech: "", images: [], imgPos: "object-center", href: "#", slug: "", imageMode: "replace" };
  const defaultFormBlog = { title: "", date: "", category: "Development", author: "Harsh Vashishth", readTime: "4 min read", images: [], imgPos: "object-center", content: "", slug: "", imageMode: "replace" };

  const [formService, setFormService] = useState(defaultFormService);
  const [formExp, setFormExp] = useState(defaultFormExp);
  const [formProj, setFormProj] = useState(defaultFormProj);
  const [formBlog, setFormBlog] = useState(defaultFormBlog);

  // Message view
  const [viewMessage, setViewMessage] = useState(null);

  // ── Toast helper ──────────────────────────────────────────────────────────
  const showToast = useCallback((message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  }, []);

  // ── Custom Alert/Confirm Dialog ───────────────────────────────────────────
  const [dialog, setDialog] = useState({
    show: false,
    title: "",
    message: "",
    type: "info",
    isConfirm: false,
    onConfirm: null,
    onCancel: null
  });

  const showAlert = useCallback((message, title = "Alert", type = "info") => {
    setDialog({
      show: true,
      title,
      message,
      type,
      isConfirm: false,
      onConfirm: null,
      onCancel: null
    });
  }, []);

  const showConfirm = useCallback((message, onConfirm, title = "Are you sure?", type = "warning") => {
    setDialog({
      show: true,
      title,
      message,
      type,
      isConfirm: true,
      onConfirm: () => {
        onConfirm();
        setDialog(prev => ({ ...prev, show: false }));
      },
      onCancel: () => {
        setDialog(prev => ({ ...prev, show: false }));
      }
    });
  }, []);

  // ── Load all data from MongoDB ────────────────────────────────────────────
  const loadAllData = useCallback(async () => {
    setDataLoading(true);
    try {
      const [settingsRes, servicesRes, portfolioRes, expRes, blogsRes, msgsRes] = await Promise.all([
        getSettings(),
        getServices(),
        getPortfolios(),
        getExperiences(),
        getBlogs(),
        getMessages(),
      ]);

      if (settingsRes.success && settingsRes.settings) setSystemSettings(settingsRes.settings);
      if (servicesRes.success) setServices(servicesRes.services || []);
      if (portfolioRes.success) setProjects(portfolioRes.portfolios || []);
      if (expRes.success) setExperiences(expRes.experiences || []);
      if (blogsRes.success) setBlogs(blogsRes.blogs || []);
      if (msgsRes.success) setMessages(msgsRes.messages || []);
    } catch (err) {
      console.error("Error loading data:", err);
    }
    setDataLoading(false);
  }, []);

  // ── Hydrate auth on mount ─────────────────────────────────────────────────
  useEffect(() => {
    const logged = localStorage.getItem("portfolio_admin_logged");
    if (logged === "true") setIsLoggedIn(true);
    setAuthChecked(true);
    loadAllData();
  }, [loadAllData]);

  // ── Auth Actions ──────────────────────────────────────────────────────────
  const handleLogin = async (username, password, onError, onLoading) => {
    onLoading(true);
    onError("");
    try {
      const res = await loginAdmin(username, password);
      if (res.success) {
        setIsLoggedIn(true);
        localStorage.setItem("portfolio_admin_logged", "true");
        showToast("Logged in successfully!", "success");
      } else {
        onError(res.error || "Invalid username or password.");
      }
    } catch (err) {
      console.error("Login call failed:", err);
      onError("Database or server connection error.");
    } finally {
      onLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("portfolio_admin_logged");
    showToast("Logged out successfully!", "info");
  };

  // ── Settings Save Action ──────────────────────────────────────────────────
  const updateSystemSettings = async (settingsData) => {
    try {
      const res = await updateSettings(settingsData);
      if (res.success && res.settings) {
        setSystemSettings(res.settings);
        showToast("Settings updated successfully!");
        return true;
      } else {
        showToast(res.error || "Failed to update settings.", "warning");
        return false;
      }
    } catch (err) {
      console.error("Failed to update settings:", err);
      showToast("Server connection error.", "warning");
      return false;
    }
  };

  // ── Modal Helpers ─────────────────────────────────────────────────────────
  const openAddModal = (type) => {
    setModalType(type);
    setModalAction("add");
    setEditItem(null);
    setFormService({ ...defaultFormService });
    setFormExp({ ...defaultFormExp });
    setFormProj({ ...defaultFormProj });
    setFormBlog({
      ...defaultFormBlog,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" }),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (type, item) => {
    setModalType(type);
    setModalAction("edit");
    setEditItem(item);
    if (type === "services") {
      setFormService({
        category: item.category || "Development",
        title:    item.title,
        desc:     item.desc,
        iconName: item.iconName || "code",
        slug:     item.slug    || "",
        images:   item.images  || (item.image ? [item.image] : []),
        imageMode: "replace",
      });
    }
    if (type === "experience") {
      setFormExp({
        startMonth:   item.startMonth   || "",
        startYear:    item.startYear    || "",
        endMonth:     item.endMonth     || "",
        endYear:      item.endYear      || "",
        role:         item.role         || "",
        company:      item.company      || "",
        companyExtra: item.companyExtra || "",
        logo:         item.logo         || "",
        href:         item.href         || "#",
      });
    }
    if (type === "portfolio") {
      setFormProj({
        title:    item.title,
        category: item.category,
        desc:     item.desc     || "",
        details:  item.details  || "",
        tech:     Array.isArray(item.tech) ? item.tech.join(", ") : (item.tech || ""),
        images:   item.images   || (item.image && item.image !== "/portfolio_screenshots.png" ? [item.image] : []),
        imgPos:   item.imgPos   || "object-center",
        href:     item.href     || "#",
        slug:     item.slug     || "",
        imageMode: "replace",
      });
    }
    if (type === "blog") {
      setFormBlog({
        title:    item.title,
        date:     item.date,
        category: item.category || "Development",
        author:   item.author   || "Harsh Vashishth",
        readTime: item.readTime || "4 min read",
        images:   item.images   || (item.image && item.image !== "/blog_thumbnails.png" ? [item.image] : []),
        imgPos:   item.imgPos   || "object-center",
        content:  item.content  || "",
        slug:     item.slug     || "",
        imageMode: "replace",
      });
    }
    setIsModalOpen(true);
  };

  // ── CRUD — all connected to MongoDB ──────────────────────────────────────
  const handleSave = async (e) => {
    e.preventDefault();
    setIsModalOpen(false);

    if (modalType === "services") {
      if (modalAction === "add") {
        const res = await addService(formService);
        if (res.success) {
          setServices(prev => [...prev, res.service]);
          showToast("Service added successfully!");
        } else {
          showToast(res.error || "Failed to add service.", "warning");
        }
      } else {
        const res = await updateService(editItem._id, formService);
        if (res.success) {
          setServices(prev => prev.map(s => s._id === editItem._id ? res.service : s));
          showToast("Service updated!");
        } else {
          showToast(res.error || "Failed to update service.", "warning");
        }
      }
    }

    if (modalType === "experience") {
      if (modalAction === "add") {
        console.log("📋 [Frontend] Adding experience with formExp:", JSON.stringify(formExp, null, 2));
        console.log("🎯 Logo in formExp?:", formExp.logo);
        const res = await addExperience(formExp);
        if (res.success) {
          setExperiences(prev => [...prev, res.experience]);
          showToast("Experience added!");
        } else {
          showToast(res.error || "Failed to add experience.", "warning");
        }
      } else {
        console.log("📋 [Frontend] Updating experience with formExp:", JSON.stringify(formExp, null, 2));
        console.log("🎯 Logo in formExp?:", formExp.logo);
        const res = await updateExperience(editItem._id, formExp);
        if (res.success) {
          setExperiences(prev => prev.map(e => e._id === editItem._id ? res.experience : e));
          showToast("Experience updated!");
        } else {
          showToast(res.error || "Failed to update experience.", "warning");
        }
      }
    }

    if (modalType === "portfolio") {
      if (modalAction === "add") {
        const res = await addPortfolio(formProj);
        if (res.success) {
          setProjects(prev => [...prev, res.portfolio]);
          showToast("Project added!");
        } else {
          showToast(res.error || "Failed to add project.", "warning");
        }
      } else {
        const res = await updatePortfolio(editItem._id, formProj);
        if (res.success) {
          setProjects(prev => prev.map(p => p._id === editItem._id ? res.portfolio : p));
          showToast("Project updated!");
        } else {
          showToast(res.error || "Failed to update project.", "warning");
        }
      }
    }

    if (modalType === "blog") {
      if (modalAction === "add") {
        const res = await addBlog(formBlog);
        if (res.success) {
          setBlogs(prev => [res.blog, ...prev]);
          showToast("Blog post published!");
        } else {
          showToast(res.error || "Failed to publish blog.", "warning");
        }
      } else {
        const res = await updateBlog(editItem._id, formBlog);
        if (res.success) {
          setBlogs(prev => prev.map(b => b._id === editItem._id ? res.blog : b));
          showToast("Blog post updated!");
        } else {
          showToast(res.error || "Failed to update blog.", "warning");
        }
      }
    }
  };

  const handleDelete = async (type, id) => {
    showConfirm(
      `Are you sure you want to delete this ${type.slice(0, -1) || 'item'}? This action cannot be undone.`,
      async () => {
        const actions = {
          services:   async () => { const r = await deleteService(id);    if (r.success) { setServices(prev => prev.filter(i => i._id !== id));    showToast("Service deleted", "warning"); }   },
          experience: async () => { const r = await deleteExperience(id); if (r.success) { setExperiences(prev => prev.filter(i => i._id !== id)); showToast("Experience deleted", "warning"); } },
          portfolio:  async () => { const r = await deletePortfolio(id);  if (r.success) { setProjects(prev => prev.filter(i => i._id !== id));   showToast("Project deleted", "warning"); }   },
          blog:       async () => { const r = await deleteBlog(id);       if (r.success) { setBlogs(prev => prev.filter(i => i._id !== id));       showToast("Blog deleted", "warning"); }       },
          messages:   async () => { const r = await deleteMessage(id);    if (r.success) { setMessages(prev => prev.filter(i => i._id !== id));   showToast("Message deleted", "warning"); }   },
        };
        if (actions[type]) await actions[type]();
      },
      "Delete Item",
      "danger"
    );
  };

  const toggleReadMessage = async (id) => {
    const res = await toggleMessageRead(id);
    if (res.success) {
      setMessages(prev => prev.map(m => m._id === id ? { ...m, read: res.message.read } : m));
    }
  };

  return (
    <AdminContext.Provider value={{
      // Auth
      isLoggedIn, authChecked, handleLogin, handleLogout,
      // System Settings
      systemSettings, updateSystemSettings,
      // Data
      services, experiences, projects, blogs, messages, dataLoading,
      // Refresh
      loadAllData,
      // Toast
      toast, showToast,
      // Dialog
      dialog, setDialog, showAlert, showConfirm,
      // Modal
      isModalOpen, setIsModalOpen, modalType, modalAction, editItem,
      openAddModal, openEditModal, handleSave, handleDelete,
      // Forms
      formService, setFormService,
      formExp, setFormExp,
      formProj, setFormProj,
      formBlog, setFormBlog,
      // Message view
      viewMessage, setViewMessage, toggleReadMessage,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
