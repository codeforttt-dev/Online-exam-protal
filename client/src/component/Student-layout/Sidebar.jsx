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

const Sidebar = ({
  currentPage,
  setCurrentPage,
  sidebarOpen,
  setSidebarOpen,
  isCollapsed,
  setIsCollapsed,
}) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { id: "olympiads", label: "My Olympiads", icon: <FaTrophy /> },
    { id: "practice-tests", label: "Practice Tests", icon: <FaClipboardList /> },
    { id: "results", label: "Results", icon: <FaChartLine /> },
    { id: "study-materials", label: "Study Materials", icon: <FaBook /> },
    { id: "leaderboard", label: "Leaderboard", icon: <FaAward /> },
  ];

  const bottomMenuItems = [
    { id: "settings", label: "Settings", icon: <FaCog /> },
    { id: "help", label: "Help & Support", icon: <FaQuestionCircle /> },
    { id: "logout", label: "Logout", icon: <FaSignOutAlt /> },
  ];

  const handleClick = (id) => {
    setCurrentPage(id);
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
          bg-gradient-to-b from-[#0f172a] via-[#1e3a8a] to-[#1e40af]
          text-white transition-all duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${isCollapsed ? "w-20" : "w-64"}
        `}
      >
        {/* ===== HEADER / BRAND ===== */}
        {/* ===== USER PROFILE (ONLY ONE HEADING) ===== */}
<div className="p-4 border-b border-white/10 flex items-center justify-between">
  <div className="flex items-center">
    <div className="w-10 h-10 rounded-full bg-white text-[#1e3a8a] flex items-center justify-center font-bold">
      SR
    </div>

    {!isCollapsed && (
      <div className="ml-3">
        <p className="text-sm font-semibold">Sarah Robinson</p>
        <p className="text-xs text-white/70">Grade 11</p>
      </div>
    )}
  </div>

  {/* Collapse button INSIDE profile */}
  <button
    onClick={() => setIsCollapsed(!isCollapsed)}
    className="hidden lg:flex w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center"
  >
    {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
  </button>
</div>


        {/* ===== USER ===== */} 
        {/* <div className="p-4 border-b border-white/10 flex items-center justify-center">
          {/* <div className="w-10 h-10 rounded-full bg-white text-[#1e3a8a] flex items-center justify-center font-bold">
            SR
          </div>
          {!isCollapsed && (
            <div className="ml-3">
              <p className="text-sm font-semibold">Sarah Robinson</p>
              <p className="text-xs text-white/70">Grade 11</p>
            </div>
          )}
        </div> */}

        {/* ===== NAVIGATION ===== */}
        <nav className="flex-1 px-2 py-3">
          {menuItems.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`
                  w-full flex items-center rounded-xl mb-1 transition
                  ${active ? "bg-white/20" : "hover:bg-white/10"}
                  ${isCollapsed ? "justify-center p-3" : "px-3 py-2.5"}
                `}
              >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && (
                  <span className="ml-3 text-sm">{item.label}</span>
                )}
              </button>
            );
          })}

          <div className="h-px bg-white/10 my-3" />

          {bottomMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                item.id === "logout"
                  ? alert("Logout")
                  : handleClick(item.id)
              }
              className={`
                w-full flex items-center rounded-xl mb-1 hover:bg-white/10
                ${isCollapsed ? "justify-center p-3" : "px-3 py-2.5"}
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {!isCollapsed && (
                <span className="ml-3 text-sm">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* ===== FOOTER ===== */}
        <div className="p-3 text-center text-xs text-white/60 border-t border-white/10">
          © 2026 NSO
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
