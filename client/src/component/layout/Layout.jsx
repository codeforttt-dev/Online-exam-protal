<<<<<<< HEAD
import { Outlet } from "react-router-dom";
=======
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Student-layout/Sidebar";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // current page detect from URL
  const getCurrentPage = () => {
    if (location.pathname.includes("olympiads")) return "olympiads";
    if (location.pathname.includes("practice-tests")) return "practice-tests";
    if (location.pathname.includes("results")) return "results";
    if (location.pathname.includes("study-materials")) return "study-materials";
    if (location.pathname.includes("leaderboard")) return "leaderboard";
    return "dashboard";
  };

  const currentPage = getCurrentPage();

  // 🔥 sidebar click handler (THIS WAS MISSING)
  const handleSidebarNavigation = (pageId) => {
    switch (pageId) {
      case "dashboard":
        navigate("/dashboard");
        break;
      case "olympiads":
        navigate("/olympiads");
        break;
      case "practice-tests":
        navigate("/practice-tests");
        break;
      case "results":
        navigate("/results");
        break;
      case "study-materials":
        navigate("/study-materials");
        break;
      case "leaderboard":
        navigate("/leaderboard");
        break;
      case "settings":
        navigate("/settings");
        break;
      case "help":
        navigate("/help");
        break;
      default:
        navigate("/dashboard");
    }
  };
>>>>>>> afzal

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      {/* yahan public top navbar / banner chaho to add karo */}
      <Outlet />
      {/* yahan public footer wagaira */}
    </div>
  );
}
