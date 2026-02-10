// src/component/layout/StudentSidebar.jsx
import React, { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaTrophy,
  FaClipboardList,
  FaChartLine,
  FaBook,
  FaAward,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function StudentSidebar({ onWidthChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const expandedWidth = 256;
  const collapsedWidth = 80;

  useEffect(() => {
    onWidthChange && onWidthChange(isCollapsed ? collapsedWidth : expandedWidth);
  }, [isCollapsed, onWidthChange]);

  const menuItems = [
    { id: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { id: "/olympiads", label: "My Olympiads", icon: <FaTrophy /> },
    { id: "/practice-tests", label: "Practice Tests", icon: <FaClipboardList /> },
    { id: "/results", label: "Results", icon: <FaChartLine /> },
    { id: "/study-materials", label: "Study Materials", icon: <FaBook /> },
    { id: "/leaderboard", label: "Leaderboard", icon: <FaAward /> },
  ];

  const bottomMenuItems = [
    { id: "settings", label: "Settings", icon: <FaCog /> },
    { id: "help", label: "Help & Support", icon: <FaQuestionCircle /> },
    { id: "logout", label: "Logout", icon: <FaSignOutAlt /> },
  ];

  const currentPath = location.pathname;

  const handleClick = (id) => {
    if (id.startsWith("/")) {
      navigate(id);
    } else if (id === "logout") {
      alert("Logout");
    }
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen z-40 flex flex-col
          bg-white/95 text-gray-800
          border-r border-[#FFE6A3]
          shadow-lg
          transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${isCollapsed ? "w-20" : "w-64"}
        `}
      >
        <div className="p-4 border-b border-[#FFE6A3] bg-[#FFF9E6]/80 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFCD2C] to-[#E0AC00] text-gray-900 flex items-center justify-center font-bold shadow">
              SR
            </div>

            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-900">
                  Sarah Robinson
                </p>
                <p className="text-xs text-gray-500">Grade 11</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-8 h-8 rounded-lg hover:bg-[#FFF3C4] text-gray-600 items-center justify-center text-xs transition-colors"
          >
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        <nav className="mt-3 px-2 space-y-1 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const active = currentPath.startsWith(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`group w-full flex items-center rounded-md mb-1 transition-all duration-200
                  ${isCollapsed ? "justify-center p-3" : "px-2.5 py-2"}
                  ${
                    active
                      ? "bg-gradient-to-r from-[#FFEBB5] to-[#FFDF85] text-gray-900 shadow-sm"
                      : "text-gray-600 hover:bg-[#FFF3C4] hover:text-gray-900"
                  }
                `}
              >
                <span className="w-6 flex justify-center text-base group-hover:scale-110 transform transition-transform duration-200">
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="ml-2.5 text-xs font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}

          <div className="h-px bg-[#FFE6A3] my-3" />

          {bottomMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`group w-full flex items-center rounded-md mb-1 transition-all duration-200
                ${isCollapsed ? "justify-center p-3" : "px-2.5 py-2"}
                text-gray-600 hover:bg-[#FFF3C4] hover:text-gray-900
              `}
            >
              <span className="w-6 flex justify-center text-base group-hover:scale-110 transform transition-transform duration-200">
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="ml-2.5 text-xs font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 text-center text-[11px] text-gray-500 border-t border-[#FFE6A3] bg-[#FFF9E6]/70">
          © 2026 NSO
        </div>
      </aside>
    </>
  );
}
