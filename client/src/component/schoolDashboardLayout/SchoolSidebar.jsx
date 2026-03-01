// src/component/schoolDashboardLayout/SchoolSidebar.jsx

import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Trophy, FileText, Home, School } from "lucide-react";

function SchoolSidebar() {
  const navigate = useNavigate();

  // Later this will come from backend / redux
  const schoolName = "Green Valley School";
  const schoolLogo = "https://i.pravatar.cc/100?img=15";
    // Check login
  const token = localStorage.getItem("schoolToken");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("schoolToken");
    navigate("/school/login");
  };
  return (
    <div className="h-screen w-64 bg-[#F4F1E8] flex flex-col justify-between border-r">

      {/* ================= TOP PROFILE SECTION ================= */}
      <div>
        <div className="p-6 border-b flex items-center gap-3">

          {/* Profile Logo */}
          <img
            src={schoolLogo}
            alt="School Logo"
            className="w-12 h-12 rounded-full object-cover border"
          />

          {/* Name + Role */}
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              {schoolName}
            </h2>
            <p className="text-xs text-gray-500">
              School Admin
            </p>
          </div>

        </div>

        {/* ================= MENU ================= */}
        <div className="p-4 space-y-2">

          <NavLink
            to="/school/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm ${
                isActive
                  ? "bg-yellow-200 text-gray-800 font-medium"
                  : "text-gray-600 hover:bg-yellow-100"
              }`
            }
          >
            <LayoutDashboard size={16} />
            Dashboard
          </NavLink>

          <NavLink
            to="/school/my-school"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm ${
                isActive
                  ? "bg-yellow-200 text-gray-800 font-medium"
                  : "text-gray-600 hover:bg-yellow-100"
              }`
            }
          >
            <School size={16} />
            My School
          </NavLink>

          <NavLink
            to="/school/leaderboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm ${
                isActive
                  ? "bg-yellow-200 text-gray-800 font-medium"
                  : "text-gray-600 hover:bg-yellow-100"
              }`
            }
          >
            <Trophy size={16} />
            Leaderboard
          </NavLink>

          <NavLink
            to="/school/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm ${
                isActive
                  ? "bg-yellow-200 text-gray-800 font-medium"
                  : "text-gray-600 hover:bg-yellow-100"
              }`
            }
          >
            <FileText size={16} />
            Reports
          </NavLink>
        </div>
      </div>

      {/* ================= BOTTOM SECTION ================= */}
            {/* LOGIN / LOGOUT BUTTON */}
      <div className="p-4 border-t">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded text-sm hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/school/login")}
            className="w-full bg-indigo-600 text-white py-2 rounded text-sm hover:bg-indigo-700 transition"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default SchoolSidebar;