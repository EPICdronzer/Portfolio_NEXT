"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Preloaded mock data matching the database structure
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

export default function AdminPage() {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard Data State
  const [services, setServices] = useState(initialServices);
  const [experiences, setExperiences] = useState(initialExperiences);
  const [projects, setProjects] = useState(initialProjects);
  const [blogs, setBlogs] = useState(initialBlogs);
  const [messages, setMessages] = useState(initialMessages);

  // Active Tab State
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toast notification
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Modal forms management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "services" | "experience" | "portfolio" | "blog"
  const [modalAction, setModalAction] = useState("add"); // "add" | "edit"
  const [editId, setEditId] = useState(null);

  // Form Fields State
  const [formService, setFormService] = useState({ title: "", desc: "" });
  const [formExp, setFormExp] = useState({ period: "", role: "", company: "", companyExtra: "", companyColor: "text-emerald-400" });
  const [formProj, setFormProj] = useState({ title: "", category: "", image: "/portfolio_screenshots.png", href: "#" });
  const [formBlog, setFormBlog] = useState({ title: "", date: "", image: "/blog_thumbnails.png", href: "#" });

  // Message View Modal State
  const [viewMessage, setViewMessage] = useState(null);

  // LocalStorage check for persistence
  useEffect(() => {
    const logged = localStorage.getItem("portfolio_admin_logged");
    if (logged === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        setIsLoggedIn(true);
        localStorage.setItem("portfolio_admin_logged", "true");
        showToast("Logged in successfully!", "success");
      } else {
        setLoginError("Invalid username or password. (Use: admin / admin123)");
      }
      setLoginLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("portfolio_admin_logged");
    showToast("Logged out successfully!", "info");
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // Open Modal Helpers
  const openAddModal = (type) => {
    setModalType(type);
    setModalAction("add");
    setEditId(null);
    // Reset fields
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

  // CRUD Actions
  const handleSave = (e) => {
    e.preventDefault();
    if (modalType === "services") {
      if (modalAction === "add") {
        const newItem = { id: `service-${Date.now()}`, ...formService };
        setServices([...services, newItem]);
        showToast("Service added successfully!");
      } else {
        setServices(services.map(s => s.id === editId ? { ...s, ...formService } : s));
        showToast("Service updated successfully!");
      }
    } else if (modalType === "experience") {
      if (modalAction === "add") {
        const newItem = { id: `exp-${Date.now()}`, ...formExp };
        setExperiences([...experiences, newItem]);
        showToast("Experience item added!");
      } else {
        setExperiences(experiences.map(e => e.id === editId ? { ...e, ...formExp } : e));
        showToast("Experience item updated!");
      }
    } else if (modalType === "portfolio") {
      if (modalAction === "add") {
        const newItem = { id: `proj-${Date.now()}`, ...formProj };
        setProjects([...projects, newItem]);
        showToast("Project added!");
      } else {
        setProjects(projects.map(p => p.id === editId ? { ...p, ...formProj } : p));
        showToast("Project updated!");
      }
    } else if (modalType === "blog") {
      if (modalAction === "add") {
        const newItem = { id: `post-${Date.now()}`, ...formBlog };
        setBlogs([...blogs, newItem]);
        showToast("Blog post published!");
      } else {
        setBlogs(blogs.map(b => b.id === editId ? { ...b, ...formBlog } : b));
        showToast("Blog post updated!");
      }
    }
    setIsModalOpen(false);
  };

  const handleDelete = (type, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    if (type === "services") {
      setServices(services.filter(item => item.id !== id));
      showToast("Service deleted", "warning");
    } else if (type === "experience") {
      setExperiences(experiences.filter(item => item.id !== id));
      showToast("Experience item deleted", "warning");
    } else if (type === "portfolio") {
      setProjects(projects.filter(item => item.id !== id));
      showToast("Project deleted", "warning");
    } else if (type === "blog") {
      setBlogs(blogs.filter(item => item.id !== id));
      showToast("Blog post deleted", "warning");
    } else if (type === "messages") {
      setMessages(messages.filter(item => item.id !== id));
      showToast("Message deleted", "warning");
    }
  };

  const toggleReadMessage = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: !m.read } : m));
  };

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen bg-[#070708] text-white flex items-center justify-center p-6 overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />

        {/* Diagonal grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative w-full max-w-md bg-[#111113]/90 border border-zinc-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-2xl font-extrabold shadow-lg shadow-emerald-500/10">
              HV
            </div>
            <h1 className="text-2xl font-extrabold text-white">Portfolio Admin Portal</h1>
            <p className="text-gray-400 text-sm mt-2">Sign in to manage services, projects, experience, and messages.</p>
          </div>

          {loginError && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-3 rounded-xl text-xs mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors duration-200"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors duration-200"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 text-sm flex items-center justify-center gap-2 mt-8 disabled:opacity-70"
            >
              {loginLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center">
            <span className="text-xs text-zinc-500">
              Demo Credentials: <code className="text-amber-400 bg-amber-500/5 px-1.5 py-0.5 rounded border border-amber-500/10">admin</code> / <code className="text-amber-400 bg-amber-500/5 px-1.5 py-0.5 rounded border border-amber-500/10">admin123</code>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD LAYOUT
  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar for Desktop / Header for Mobile */}
      <aside className="w-full md:w-64 bg-[#0d0d0f] border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col justify-between shrink-0 z-20">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-lg font-black shadow-md shadow-emerald-500/5">
                HV
              </div>
              <div>
                <h2 className="font-extrabold text-white text-sm tracking-tight">Harsh V.</h2>
                <span className="text-emerald-400 text-[10px] uppercase font-semibold tracking-wider">Admin Dashboard</span>
              </div>
            </div>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className={`mt-8 space-y-1.5 ${mobileMenuOpen ? "block" : "hidden"} md:block`}>
            {[
              { id: "dashboard", label: "Overview", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg> },
              { id: "services", label: "Services", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg> },
              { id: "experience", label: "Experience Timeline", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              { id: "portfolio", label: "Portfolio Items", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
              { id: "blogs", label: "Blog Posts", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 01-2-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 11h4m-4 4h4m-6-8h6" /></svg> },
              {
                id: "messages",
                label: "Inbox Messages",
                icon: (
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    {messages.some(m => !m.read) && (
                      <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-rose-500 rounded-full border border-[#0d0d0f]" />
                    )}
                  </div>
                )
              },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/10 font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className={`p-6 border-t border-zinc-800/80 ${mobileMenuOpen ? "block" : "hidden"} md:block`}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 01-3-3h4a3 3 0 013 3v1" /></svg>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        
        {/* Top greeting bar */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-zinc-850 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {activeTab === "dashboard" && "Portfolio Dashboard"}
              {activeTab === "services" && "Manage Services"}
              {activeTab === "experience" && "Manage Timeline"}
              {activeTab === "portfolio" && "Manage Portfolio"}
              {activeTab === "blogs" && "Manage Blog Posts"}
              {activeTab === "messages" && "Inboxes & Feedback"}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              {activeTab === "dashboard" && "Quick overview and recent activities."}
              {activeTab === "services" && "Configure cards shown in the services section."}
              {activeTab === "experience" && "Set timeline entries for work achievements."}
              {activeTab === "portfolio" && "Review, add, or customize showcase projects."}
              {activeTab === "blogs" && "Publish and draft your articles."}
              {activeTab === "messages" && "Read and reply to prospective clients."}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center">
            {/* Sync Indicators */}
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              DB Synced
            </span>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors duration-200"
            >
              View Site
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </Link>
          </div>
        </header>

        {/* 1. OVERVIEW (DASHBOARD) TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Total Projects", count: projects.length, color: "text-amber-400", bg: "bg-amber-400/5", border: "border-amber-400/10" },
                { title: "Services Offered", count: services.length, color: "text-emerald-400", bg: "bg-emerald-400/5", border: "border-emerald-400/10" },
                { title: "Timeline Milestones", count: experiences.length, color: "text-blue-400", bg: "bg-blue-400/5", border: "border-blue-400/10" },
                { title: "Blog Articles", count: blogs.length, color: "text-purple-400", bg: "bg-purple-400/5", border: "border-purple-400/10" },
              ].map((kpi, idx) => (
                <div key={idx} className={`p-6 rounded-2xl bg-[#0d0d0f] border ${kpi.border} flex flex-col justify-between`}>
                  <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">{kpi.title}</span>
                  <span className={`text-4xl font-black ${kpi.color} mt-4`}>{kpi.count}</span>
                </div>
              ))}
            </div>

            {/* Middle Section grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Quick Messages */}
              <div className="lg:col-span-7 bg-[#0d0d0f] border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-extrabold text-white text-base">Unread Inbox</h3>
                  <button onClick={() => setActiveTab("messages")} className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold">View All</button>
                </div>

                <div className="space-y-4">
                  {messages.filter(m => !m.read).length === 0 ? (
                    <div className="text-center py-8 text-zinc-500 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-zinc-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      All caught up! No unread messages.
                    </div>
                  ) : (
                    messages.filter(m => !m.read).map(msg => (
                      <div
                        key={msg.id}
                        onClick={() => setViewMessage(msg)}
                        className="p-4 rounded-xl bg-[#141417] hover:bg-zinc-800/40 border border-zinc-800/50 cursor-pointer transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-sm text-white">{msg.name}</span>
                          <span className="text-[10px] text-zinc-500">{msg.date}</span>
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
                  {[
                    { text: "Published ethnic wear project Mumbai Metro", time: "2 hours ago", icon: <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" /> },
                    { text: "Received message from Priya Sharma", time: "5 hours ago", icon: <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" /> },
                    { text: "Modified Junior Visual Designer timeline description", time: "1 day ago", icon: <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" /> },
                    { text: "Updated Web Development service category", time: "2 days ago", icon: <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shrink-0" /> },
                  ].map((act, idx) => (
                    <div key={idx} className="flex gap-3 text-xs">
                      {act.icon}
                      <div className="flex flex-col gap-0.5">
                        <p className="text-zinc-300 leading-relaxed">{act.text}</p>
                        <span className="text-[10px] text-zinc-500">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. SERVICES TAB */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-white">Services Grid</h3>
              <button
                onClick={() => openAddModal("services")}
                className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md transition-colors"
              >
                + Add Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(s => (
                <div key={s.id} className="bg-[#0d0d0f] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-zinc-800 text-emerald-400 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <h4 className="font-bold text-white text-base mb-2">{s.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-6">{s.desc}</p>
                  </div>

                  <div className="flex gap-2 border-t border-zinc-800 pt-4 mt-auto">
                    <button
                      onClick={() => openEditModal("services", s)}
                      className="flex-1 bg-zinc-800/80 hover:bg-zinc-700/80 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete("services", s.id)}
                      className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. EXPERIENCE TAB */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-white">Timeline Entries</h3>
              <button
                onClick={() => openAddModal("experience")}
                className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md transition-colors"
              >
                + Add Milestone
              </button>
            </div>

            <div className="bg-[#0d0d0f] border border-zinc-800 rounded-2xl p-6 space-y-6">
              {experiences.map(exp => (
                <div key={exp.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-xl bg-[#141417] border border-zinc-850 hover:border-zinc-800 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-850 flex items-center justify-center font-bold text-emerald-400 text-sm border border-zinc-800 shrink-0">
                      {exp.role.substring(0, 1)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-white text-sm">{exp.role}</h4>
                        <span className="text-[10px] text-zinc-500 font-medium">| {exp.period}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 font-medium">
                        {exp.company} <span className="text-[10px] text-zinc-500">{exp.companyExtra}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center w-full sm:w-auto">
                    <button
                      onClick={() => openEditModal("experience", exp)}
                      className="flex-1 sm:flex-none bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete("experience", exp.id)}
                      className="bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border border-rose-500/20 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. PORTFOLIO TAB */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-white">Projects Grid</h3>
              <button
                onClick={() => openAddModal("portfolio")}
                className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md transition-colors"
              >
                + Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(p => (
                <div key={p.id} className="bg-[#0d0d0f] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                  <div className="relative aspect-video w-full bg-zinc-900 flex items-center justify-center text-zinc-600 border-b border-zinc-850">
                    {/* SVG placeholder representation */}
                    <div className="text-center p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-zinc-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Project Snapshot</span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold mb-1 block">{p.category}</span>
                      <h4 className="font-bold text-white text-sm mb-4 leading-snug">{p.title}</h4>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-zinc-850 mt-auto">
                      <button
                        onClick={() => openEditModal("portfolio", p)}
                        className="flex-1 bg-zinc-800/80 hover:bg-zinc-700/80 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete("portfolio", p.id)}
                        className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. BLOGS TAB */}
        {activeTab === "blogs" && (
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map(b => (
                <div key={b.id} className="bg-[#0d0d0f] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                  <div className="relative aspect-video w-full bg-zinc-900 flex items-center justify-center text-zinc-650 border-b border-zinc-850">
                    <div className="text-center p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-zinc-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 01-2-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
                      <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Thumbnail Image</span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-500 font-semibold mb-1.5 block">{b.date}</span>
                      <h4 className="font-bold text-white text-sm mb-4 leading-snug">{b.title}</h4>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-zinc-850 mt-auto">
                      <button
                        onClick={() => openEditModal("blog", b)}
                        className="flex-1 bg-zinc-800/80 hover:bg-zinc-700/80 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete("blog", b.id)}
                        className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. MESSAGES TAB */}
        {activeTab === "messages" && (
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
        )}
      </main>

      {/* FLOAT NOTIFICATION (TOAST) */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl border shadow-2xl flex items-center gap-3 z-50 animate-bounce ${
          toast.type === "success" && "bg-zinc-900 border-emerald-500/30 text-emerald-400 shadow-emerald-500/5"
        } ${
          toast.type === "warning" && "bg-zinc-900 border-rose-500/30 text-rose-400 shadow-rose-500/5"
        } ${
          toast.type === "info" && "bg-zinc-900 border-blue-500/30 text-blue-400 shadow-blue-500/5"
        }`}>
          <span className="text-xs font-extrabold">{toast.message}</span>
        </div>
      )}

      {/* CRUD ACTION MODAL (FOR SERVICES, TIMELINE, PORTFOLIO, BLOGS) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-[#0e0e11] border border-zinc-800 rounded-3xl w-full max-w-lg p-8 shadow-2xl animate-fade-in relative">
            <h3 className="font-extrabold text-white text-lg mb-6">
              {modalAction === "add" ? "Add New" : "Edit"} {modalType === "services" && "Service"}
              {modalType === "experience" && "Milestone"} {modalType === "portfolio" && "Project"}
              {modalType === "blog" && "Blog Post"}
            </h3>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Conditional Fields based on Modal Type */}
              {modalType === "services" && (
                <>
                  <div>
                    <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Service Title</label>
                    <input
                      type="text"
                      required
                      value={formService.title}
                      onChange={(e) => setFormService({ ...formService, title: e.target.value })}
                      className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      placeholder="e.g. Full-Stack Web Apps"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Description</label>
                    <textarea
                      required
                      rows={4}
                      value={formService.desc}
                      onChange={(e) => setFormService({ ...formService, desc: e.target.value })}
                      className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      placeholder="Give a descriptive summary..."
                    />
                  </div>
                </>
              )}

              {modalType === "experience" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Period</label>
                      <input
                        type="text"
                        required
                        value={formExp.period}
                        onChange={(e) => setFormExp({ ...formExp, period: e.target.value })}
                        className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                        placeholder="e.g. 2021 - 2023"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Timeline Color</label>
                      <select
                        value={formExp.companyColor}
                        onChange={(e) => setFormExp({ ...formExp, companyColor: e.target.value })}
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
                    <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Role/Position</label>
                    <input
                      type="text"
                      required
                      value={formExp.role}
                      onChange={(e) => setFormExp({ ...formExp, role: e.target.value })}
                      className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      placeholder="e.g. Lead Designer"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Company Name</label>
                      <input
                        type="text"
                        required
                        value={formExp.company}
                        onChange={(e) => setFormExp({ ...formExp, company: e.target.value })}
                        className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                        placeholder="e.g. Mumbai Transit Corp"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Extra (e.g. Remote)</label>
                      <input
                        type="text"
                        value={formExp.companyExtra}
                        onChange={(e) => setFormExp({ ...formExp, companyExtra: e.target.value })}
                        className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                        placeholder="e.g. (Remote)"
                      />
                    </div>
                  </div>
                </>
              )}

              {modalType === "portfolio" && (
                <>
                  <div>
                    <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Project Title</label>
                    <input
                      type="text"
                      required
                      value={formProj.title}
                      onChange={(e) => setFormProj({ ...formProj, title: e.target.value })}
                      className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      placeholder="e.g. Mumbai Metro UI"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Category</label>
                    <input
                      type="text"
                      required
                      value={formProj.category}
                      onChange={(e) => setFormProj({ ...formProj, category: e.target.value })}
                      className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      placeholder="e.g. Mobile App . UI/UX"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Asset/Screenshot Link</label>
                      <input
                        type="text"
                        required
                        value={formProj.image}
                        onChange={(e) => setFormProj({ ...formProj, image: e.target.value })}
                        className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Live/Details Link</label>
                      <input
                        type="text"
                        value={formProj.href}
                        onChange={(e) => setFormProj({ ...formProj, href: e.target.value })}
                        className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </>
              )}

              {modalType === "blog" && (
                <>
                  <div>
                    <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Article Title</label>
                    <input
                      type="text"
                      required
                      value={formBlog.title}
                      onChange={(e) => setFormBlog({ ...formBlog, title: e.target.value })}
                      className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      placeholder="e.g. Mastering Tailwind CSS v4 in Next.js"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Publication Date</label>
                      <input
                        type="text"
                        required
                        value={formBlog.date}
                        onChange={(e) => setFormBlog({ ...formBlog, date: e.target.value })}
                        className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Article Link URL</label>
                      <input
                        type="text"
                        value={formBlog.href}
                        onChange={(e) => setFormBlog({ ...formBlog, href: e.target.value })}
                        className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                        placeholder="#"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Thumbnail Asset Link</label>
                    <input
                      type="text"
                      required
                      value={formBlog.image}
                      onChange={(e) => setFormBlog({ ...formBlog, image: e.target.value })}
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
      )}

      {/* MESSAGE DETAILS VIEW MODAL */}
      {viewMessage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-[#0e0e11] border border-zinc-850 rounded-3xl w-full max-w-lg p-8 shadow-2xl relative">
            <button
              onClick={() => {
                // Auto mark as read on close
                if (!viewMessage.read) toggleReadMessage(viewMessage.id);
                setViewMessage(null);
              }}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-extrabold mb-2 block">Client Query</span>
            <h3 className="font-extrabold text-white text-lg mb-6">From {viewMessage.name}</h3>

            <div className="space-y-4 bg-[#141417] p-5 rounded-2xl border border-zinc-850">
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>Email: <strong className="text-zinc-200">{viewMessage.email}</strong></span>
                <span>{viewMessage.date}</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed pt-2 border-t border-zinc-850">{viewMessage.message}</p>
            </div>

            <div className="flex gap-3 justify-end mt-8">
              <a
                href={`mailto:${viewMessage.email}?subject=Regarding your query from Portfolio`}
                className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold px-6 py-3 rounded-xl shadow-lg transition-colors flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" /></svg>
                Send Email Reply
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
