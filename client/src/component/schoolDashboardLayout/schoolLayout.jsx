// src/component/schoolDashboardLayout/SchoolLayout.jsx
import { Outlet } from "react-router-dom";
import SchoolSidebar from "./SchoolSidebar";

function SchoolLayout() {
  return (
    <div className="flex min-h-screen max-h-screen">

      {/* Sidebar */}
      <SchoolSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </div>

    </div>
  );
}

export default SchoolLayout;