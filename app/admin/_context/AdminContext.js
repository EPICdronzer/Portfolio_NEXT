"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// ─── Mock Initial Data ────────────────────────────────────────────────────────
const initialServices = [
  { id: "web-dev", title: "Web Development", desc: "Design and develop scalable, responsive web applications using modern web technologies." },
  { id: "app-dev", title: "App Development", desc: "Create high-performance iOS and Android mobile apps with native feels and fluid UI." },
  { id: "ui-design", title: "UI/UX Design", desc: "Craft intuitive, beautiful, and accessible design experiences centered around user needs." },
];

const initialExperiences = [
  { id: "exp-1", period: "2015 - 2016", role: "Junior Visual Designer", company: "Trapeza Group, USA.", companyExtra: "(Remote)", companyColor: "text-rose-400" },
  { id: "exp-2", period: "2017 - 2018", role: "UI/UX Designer", company: "Gallerie Ontario, Canada", companyExtra: "(Remote)", companyColor: "text-blue-400" },
  { id: "exp-3", period: "2019 - 2020", role: "Senior UI/UX Designer", company: "Morson Hybrid, Canada", companyExtra: "", companyColor: "text-green-400" },
];

const initialProjects = [
  { id: "proj-1", title: "DesiCart - Saree & Ethnic Wear E-commerce", category: "E-commerce . UI Design", image: "/portfolio_screenshots.png", href: "#" },
  { id: "proj-2", title: "PayBharat - UPI Payment Dashboard", category: "FinTech . Web App", image: "/portfolio_screenshots.png", href: "#" },
  { id: "proj-3", title: "Mumbai Metro Transit App Concept", category: "UI/UX Design . Mobile", image: "/portfolio_screenshots.png", href: "#" },
];

const initialBlogs = [
  { id: "post-1", date: "January 02, 2025", title: "Have evolved over the years sometimes accident.", image: "/blog_thumbnails.png", href: "#" },
  { id: "post-2", date: "January 03, 2025", title: "The Internet tend to repeat predefined chunks.", image: "/blog_thumbnails.png", href: "#" },
];

const initialMessages = [
  { id: "msg-1", name: "Priya Sharma", email: "priya@example.com", date: "May 28, 2026", message: "Hi Harsh! I love your portfolio. I'm looking to build an e-commerce platform for ethnic wear and would like to hire you. Let me know your availability.", read: false },
  { id: "msg-2", name: "David Miller", email: "david@millermedia.co", date: "May 26, 2026", message: "Hello. We have an opening for a remote Senior Web Developer position. Your UI work is exceptional. Are you interested in a chat?", read: true },
];

// ─── Context ──────────────────────────────────────────────────────────────────
const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  // Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Data
  const [services, setServices] = useState(initialServices);
  const [experiences, setExperiences] = useState(initialExperiences);
  const [projects, setProjects] = useState(initialProjects);
  const [blogs, setBlogs] = useState(initialBlogs);
  const [messages, setMessages] = useState(initialMessages);

  // Toast
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalAction, setModalAction] = useState("add");
  const [editId, setEditId] = useState(null);

  // Form fields
  const [formService, setFormService] = useState({ title: "", desc: "" });
  const [formExp, setFormExp] = useState({ period: "", role: "", company: "", companyExtra: "", companyColor: "text-emerald-400" });
  const [formProj, setFormProj] = useState({ title: "", category: "", image: "/portfolio_screenshots.png", href: "#" });
  const [formBlog, setFormBlog] = useState({ title: "", date: "", image: "/blog_thumbnails.png", href: "#" });

  // Message view
  const [viewMessage, setViewMessage] = useState(null);

  // ── Hydrate auth from localStorage ───────────────────────────────────────
  useEffect(() => {
    const logged = localStorage.getItem("portfolio_admin_logged");
    if (logged === "true") setIsLoggedIn(true);
    setAuthChecked(true);
  }, []);

  // ── Auth Actions ──────────────────────────────────────────────────────────
  const handleLogin = (username, password, onError, onLoading) => {
    onLoading(true);
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        setIsLoggedIn(true);
        localStorage.setItem("portfolio_admin_logged", "true");
        showToast("Logged in successfully!", "success");
      } else {
        onError("Invalid username or password. (Use: admin / admin123)");
      }
      onLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("portfolio_admin_logged");
    showToast("Logged out successfully!", "info");
  };

  // ── Toast ─────────────────────────────────────────────────────────────────
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  // ── Modal Helpers ─────────────────────────────────────────────────────────
  const openAddModal = (type) => {
    setModalType(type);
    setModalAction("add");
    setEditId(null);
    setFormService({ title: "", desc: "" });
    setFormExp({ period: "", role: "", company: "", companyExtra: "", companyColor: "text-emerald-400" });
    setFormProj({ title: "", category: "", image: "/portfolio_screenshots.png", href: "#" });
    setFormBlog({ title: "", date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" }), image: "/blog_thumbnails.png", href: "#" });
    setIsModalOpen(true);
  };

  const openEditModal = (type, item) => {
    setModalType(type);
    setModalAction("edit");
    setEditId(item.id);
    if (type === "services") setFormService({ title: item.title, desc: item.desc });
    if (type === "experience") setFormExp({ period: item.period, role: item.role, company: item.company, companyExtra: item.companyExtra || "", companyColor: item.companyColor || "text-emerald-400" });
    if (type === "portfolio") setFormProj({ title: item.title, category: item.category, image: item.image, href: item.href });
    if (type === "blog") setFormBlog({ title: item.title, date: item.date, image: item.image, href: item.href });
    setIsModalOpen(true);
  };

  // ── CRUD ──────────────────────────────────────────────────────────────────
  const handleSave = (e) => {
    e.preventDefault();
    if (modalType === "services") {
      if (modalAction === "add") {
        setServices(prev => [...prev, { id: `service-${Date.now()}`, ...formService }]);
        showToast("Service added successfully!");
      } else {
        setServices(prev => prev.map(s => s.id === editId ? { ...s, ...formService } : s));
        showToast("Service updated!");
      }
    } else if (modalType === "experience") {
      if (modalAction === "add") {
        setExperiences(prev => [...prev, { id: `exp-${Date.now()}`, ...formExp }]);
        showToast("Experience added!");
      } else {
        setExperiences(prev => prev.map(e => e.id === editId ? { ...e, ...formExp } : e));
        showToast("Experience updated!");
      }
    } else if (modalType === "portfolio") {
      if (modalAction === "add") {
        setProjects(prev => [...prev, { id: `proj-${Date.now()}`, ...formProj }]);
        showToast("Project added!");
      } else {
        setProjects(prev => prev.map(p => p.id === editId ? { ...p, ...formProj } : p));
        showToast("Project updated!");
      }
    } else if (modalType === "blog") {
      if (modalAction === "add") {
        setBlogs(prev => [...prev, { id: `post-${Date.now()}`, ...formBlog }]);
        showToast("Blog post published!");
      } else {
        setBlogs(prev => prev.map(b => b.id === editId ? { ...b, ...formBlog } : b));
        showToast("Blog post updated!");
      }
    }
    setIsModalOpen(false);
  };

  const handleDelete = (type, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    const actions = {
      services: () => { setServices(prev => prev.filter(i => i.id !== id)); showToast("Service deleted", "warning"); },
      experience: () => { setExperiences(prev => prev.filter(i => i.id !== id)); showToast("Experience deleted", "warning"); },
      portfolio: () => { setProjects(prev => prev.filter(i => i.id !== id)); showToast("Project deleted", "warning"); },
      blog: () => { setBlogs(prev => prev.filter(i => i.id !== id)); showToast("Blog post deleted", "warning"); },
      messages: () => { setMessages(prev => prev.filter(i => i.id !== id)); showToast("Message deleted", "warning"); },
    };
    actions[type]?.();
  };

  const toggleReadMessage = (id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: !m.read } : m));
  };

  return (
    <AdminContext.Provider value={{
      // Auth
      isLoggedIn, authChecked, handleLogin, handleLogout,
      // Data
      services, experiences, projects, blogs, messages,
      // Toast
      toast, showToast,
      // Modal
      isModalOpen, setIsModalOpen, modalType, modalAction, editId,
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
