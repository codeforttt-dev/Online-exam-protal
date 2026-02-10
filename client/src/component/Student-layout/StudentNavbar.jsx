import { useLocation } from "react-router-dom";
import { FaBell, FaMoon, FaSun, FaChevronDown, FaSearch } from "react-icons/fa";
import { useState } from "react";

const pageTitles = {
  "/student/dashboard": "Dashboard",
  "/student/olympiads": "Olympiads",
  "/student/practice-tests": "Practice Tests",
  "/student/results": "Results",
  "/student/study-materials": "Study Materials",
  "/student/leaderboard": "Leaderboard",
};

export default function StudentNavbar({ user }) {
  const location = useLocation();
  const [darkMode] = useState(false);

  const currentPath = location.pathname;
  const basePath = currentPath.split("/").slice(0, 3).join("/") || "/";
  const title =
    pageTitles[basePath] ||
    (currentPath.includes("/student/practice-tests/") ? "Practice Test" : "Student Panel");

  const displayName = user?.name || "Student";
  const email = user?.email || "student@example.com";
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 bg-[#FEECD5]/90 backdrop-blur-xl border-b border-[#FFE6A3] shadow-sm">
      <div className="h-16 w-full px-2 md:px-3 lg:px-4 flex items-center justify-between gap-4">
        <div className="flex flex-col min-w-0">
          <span className="text-sm md:text-base font-bold text-gray-900 truncate">
            {title}
          </span>
          <span className="hidden md:inline text-[11px] text-gray-600 truncate">
            Welcome back, {displayName.split(" ")[0]}
          </span>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              placeholder="Search tests, results, materials..."
              className="w-full pl-8 pr-3 py-1.5 rounded-full border border-[#FFE6A3] bg-white/80 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFCD2C] focus:border-[#FFCD2C]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/90 border border-[#FFE6A3] rounded-xl shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[11px] font-medium text-gray-700">
              Student Online
            </span>
          </div>

          <button
            type="button"
            className="relative inline-flex items-center justify-center h-8 w-8 rounded-full border border-[#FFE6A3] bg-white/90 text-gray-600 hover:bg-[#FFF9E6] hover:text-gray-900 transition-colors"
          >
            <FaBell className="text-xs" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-[9px] text-white flex items-center justify-center">
              3
            </span>
          </button>

          <button
            type="button"
            className="hidden sm:inline-flex items-center justify-center h-8 w-8 rounded-full border border-[#FFE6A3] bg-white/90 text-gray-600 hover:bg-[#FFF9E6] hover:text-gray-900 transition-colors"
          >
            {darkMode ? (
              <FaSun className="text-xs" />
            ) : (
              <FaMoon className="text-xs" />
            )}
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-gradient-to-r from-[#FFCD2C] to-[#E0AC00] text-gray-900 text-xs font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <span className="h-7 w-7 rounded-full bg-white/80 flex items-center justify-center text-[11px] font-semibold text-gray-900">
              {avatarLetter}
            </span>
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-[11px] truncate max-w-[120px]">
                {displayName}
              </span>
              <span className="text-[9px] text-gray-700 truncate max-w-[120px]">
                {email}
              </span>
            </div>
            <FaChevronDown className="hidden sm:block text-[9px] text-gray-800" />
          </button>
        </div>
      </div>
    </header>
  );
}
