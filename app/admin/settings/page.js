"use client";

import React, { useState, useEffect } from "react";
import { useAdmin } from "../_context/AdminContext";
import AuthGuard from "../_components/AuthGuard";
import AdminHeader from "../_components/AdminHeader";

function SettingsPageContent() {
  const { systemSettings, updateSystemSettings } = useAdmin();

  // Account States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Statistics States
  const [projectsDone, setProjectsDone] = useState(50);
  const [yearsExperience, setYearsExperience] = useState(3);
  const [experienceMonths, setExperienceMonths] = useState(0);
  const [happyClients, setHappyClients] = useState(30);
  const [technologies, setTechnologies] = useState(12);

  const [savingAccount, setSavingAccount] = useState(false);
  const [savingStats, setSavingStats] = useState(false);
  const [accountError, setAccountError] = useState("");

  // Load existing settings into form states
  useEffect(() => {
    if (systemSettings) {
      setProjectsDone(systemSettings.projectsDone ?? 50);
      setYearsExperience(systemSettings.yearsExperience ?? 3);
      setExperienceMonths(systemSettings.experienceMonths ?? 0);
      setHappyClients(systemSettings.happyClients ?? 30);
      setTechnologies(systemSettings.technologies ?? 12);
      if (systemSettings.username) {
        setUsername(systemSettings.username);
      }
    }
  }, [systemSettings]);

  const handleSaveAccount = async (e) => {
    e.preventDefault();
    setAccountError("");

    if (password && password !== confirmPassword) {
      setAccountError("Passwords do not match!");
      return;
    }

    setSavingAccount(true);
    const dataToUpdate = { username };
    if (password) {
      dataToUpdate.password = password;
    }

    const success = await updateSystemSettings(dataToUpdate);
    if (success) {
      setPassword("");
      setConfirmPassword("");
    }
    setSavingAccount(false);
  };

  const handleSaveStats = async (e) => {
    e.preventDefault();
    setSavingStats(true);
    
    await updateSystemSettings({
      projectsDone,
      yearsExperience,
      experienceMonths,
      happyClients,
      technologies,
    });

    setSavingStats(false);
  };

  return (
    <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
      <AdminHeader
        title="Admin Settings"
        description="Configure admin credentials and customize about section statistical metrics."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Account Credentials */}
        <div className="bg-[#0d0d0f] border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Security & Credentials
          </h3>
          <p className="text-zinc-500 text-xs mb-6">Modify portal login username and change security password.</p>

          {accountError && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-3 rounded-xl text-xs mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>{accountError}</span>
            </div>
          )}

          <form onSubmit={handleSaveAccount} className="space-y-5">
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors duration-200"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">New Password (Leave blank to keep current)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors duration-200"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors duration-200"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={savingAccount}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-200 text-xs flex items-center justify-center gap-2 mt-4"
            >
              {savingAccount ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Update Account Credentials</span>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Portfolio Metric Counts */}
        <div className="bg-[#0d0d0f] border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            About Section Metrics
          </h3>
          <p className="text-zinc-500 text-xs mb-6">Dynamically change work stats displayed on about pages.</p>

          <form onSubmit={handleSaveStats} className="space-y-5">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Projects Done</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={projectsDone}
                  onChange={(e) => setProjectsDone(Number(e.target.value))}
                  className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Experience (Years)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(Number(e.target.value))}
                  className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Experience (Months)</label>
                <input
                  type="number"
                  required
                  min="0"
                  max="11"
                  value={experienceMonths}
                  onChange={(e) => setExperienceMonths(Number(e.target.value))}
                  className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Happy Clients</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={happyClients}
                  onChange={(e) => setHappyClients(Number(e.target.value))}
                  className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Technologies</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={technologies}
                  onChange={(e) => setTechnologies(Number(e.target.value))}
                  className="w-full bg-[#161619] border border-zinc-800 focus:border-emerald-500/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingStats}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-200 text-xs flex items-center justify-center gap-2 mt-4"
            >
              {savingStats ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Update Dashboard Metrics</span>
              )}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}

export default function AdminSettingsPage() {
  return (
    <AuthGuard>
      <SettingsPageContent />
    </AuthGuard>
  );
}
