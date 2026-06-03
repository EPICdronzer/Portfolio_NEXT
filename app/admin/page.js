"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "./_context/AdminContext";

export default function AdminLoginPage() {
  const { isLoggedIn, authChecked, handleLogin } = useAdmin();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // opposite redirect: if logged in, push to dashboard home
  useEffect(() => {
    if (authChecked && isLoggedIn) {
      router.replace("/admin/home");
    }
  }, [isLoggedIn, authChecked, router]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    handleLogin(username, password, setLoginError, setLoginLoading);
  };

  if (!authChecked || isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070708] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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

        <form onSubmit={onSubmit} className="space-y-5">
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

        {/* <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center">
          <span className="text-xs text-zinc-500">
            Demo Credentials: <code className="text-amber-400 bg-amber-500/5 px-1.5 py-0.5 rounded border border-amber-500/10">admin</code> / <code className="text-amber-400 bg-amber-500/5 px-1.5 py-0.5 rounded border border-amber-500/10">admin123</code>
          </span>
        </div> */}
      </div>
    </div>
  );
}
