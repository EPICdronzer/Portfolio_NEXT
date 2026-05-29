"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "../_context/AdminContext";
import AdminSidebar from "./AdminSidebar";
import AdminModal from "./AdminModal";
import AdminToast from "./AdminToast";
import MessageModal from "./MessageModal";
import CustomDialog from "./CustomDialog";

export default function AuthGuard({ children }) {
  const { isLoggedIn, authChecked } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && !isLoggedIn) {
      router.replace("/admin");
    }
  }, [isLoggedIn, authChecked, router]);

  if (!authChecked || !isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070708] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100 flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-grow flex flex-col min-w-0">
        {children}
      </div>

      {/* Global Admin Overlays & Overrides */}
      <AdminModal />
      <AdminToast />
      <MessageModal />
      <CustomDialog />
    </div>
  );
}
