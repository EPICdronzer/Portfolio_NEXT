"use client";

import React from "react";
import { AdminProvider } from "./_context/AdminContext";

export default function AdminLayout({ children }) {
  return (
    <AdminProvider>
      {children}
    </AdminProvider>
  );
}
