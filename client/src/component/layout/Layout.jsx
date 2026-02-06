// src/layouts/MainLayout.jsx
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Student-layout/Sidebar";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  
  // Current page निकालने के लिए location pathname use करें
  const getCurrentPageFromPath = () => {
    const path = location.pathname;
    if (path.includes("/dashboard")) return "dashboard";
    if (path.includes("/olympiads")) return "olympiads";
    if (path.includes("/practice-tests")) return "practice-tests";
    if (path.includes("/results")) return "results";
    if (path.includes("/study-materials")) return "study-materials";
    if (path.includes("/leaderboard")) return "leaderboard";
    if (path.includes("/settings")) return "settings";
    if (path.includes("/help")) return "help";
    return "dashboard";
  };

  const [currentPage, setCurrentPage] = useState(getCurrentPageFromPath());

  // URL change hone par currentPage sync rakho
  useEffect(() => {
    setCurrentPage(getCurrentPageFromPath());
  }, [location.pathname]);

  // Sidebar से page change करने के लिए function
  const handlePageChange = (pageId) => {
    setCurrentPage(pageId);
    
    switch(pageId) {
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar Component */}
      <Sidebar 
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      
      {/* Main Content Area */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300
          ml-0
          ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
        `}
      >
        {/* Mobile Header with Menu Button */}
        <header className="lg:hidden bg-white shadow-sm border-b">
          <div className="px-4 py-3 flex items-center justify-between">
            <button 
              className="p-2 rounded-md bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] text-white flex items-center"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="text-xl">☰</span>
              <span className="ml-2 text-sm font-medium">Menu</span>
            </button>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] flex items-center justify-center text-white font-bold mr-3">
                SR
              </div>
              <div>
                <h4 className="font-semibold text-sm">Sarah Robinson</h4>
                <p className="text-xs text-gray-500">Grade 11 - Liceum High</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Optional Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t p-3 text-center text-xs text-gray-600">
          <p>NSO Student Portal • © 2026 National Science Olympiad</p>
        </footer>
      </div>
    </div>
  );
}

export default MainLayout;
