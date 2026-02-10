// src/component/Student-layout/Layout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import StudentSidebar from "./Sidebar";

export default function StudentLayout() {
  const [sidebarWidth, setSidebarWidth] = useState(256); // 256 = w-64

  const mockUser = {
    name: "Aman Kumar",
    email: "aman@student.com",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <StudentSidebar onWidthChange={setSidebarWidth} />

      <div
        className="flex flex-col min-h-screen transition-[margin-left] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
        style={{ marginLeft: sidebarWidth }}
      >
        <StudentNavbar user={mockUser} />
        <main className="flex-1 p-3 md:p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
