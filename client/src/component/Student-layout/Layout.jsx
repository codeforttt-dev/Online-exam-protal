import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentNavbar from "../Student-layout/StudentNavbar";
import StudentSidebar from "../Student-layout/Sidebar";

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
        <main className="flex-1 w-full px-2 md:px-3 lg:px-4 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
