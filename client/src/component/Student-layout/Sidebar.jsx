// src/Student-layout/Sidebar.jsx
import { 
  FaTachometerAlt, FaTrophy, FaClipboardList, FaChartLine, 
  FaBook, FaAward, FaCog, FaQuestionCircle, FaSignOutAlt,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

const Sidebar = ({ 
  currentPage, 
  setCurrentPage, 
  sidebarOpen, 
  setSidebarOpen,
  isCollapsed,
  setIsCollapsed,
}) => {

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { id: 'olympiads', label: 'My Olympiads', icon: <FaTrophy />, badge: 3 },
    { id: 'practice-tests', label: 'Practice Tests', icon: <FaClipboardList />, badge: 5 },
    { id: 'results', label: 'Results', icon: <FaChartLine /> },
    { id: 'study-materials', label: 'Study Materials', icon: <FaBook /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <FaAward /> },
  ];
  
  const bottomMenuItems = [
    { id: 'settings', label: 'Settings', icon: <FaCog /> },
    { id: 'help', label: 'Help & Support', icon: <FaQuestionCircle /> },
    { id: 'logout', label: 'Logout', icon: <FaSignOutAlt /> },
  ];

  // Page change करने पर sidebar close (mobile पर)
  const handlePageClick = (pageId) => {
    setCurrentPage(pageId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Collapse/Expand Toggle Button (Desktop) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`
          fixed top-4 z-50 hidden lg:flex items-center justify-center
          w-9 h-9 rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] 
          text-white shadow-xl transition-all duration-300 border border-white/20
          hover:scale-110 hover:shadow-[0_0_20px_rgba(30,64,175,0.7)]
          ${isCollapsed ? 'left-4' : 'left-[16.5rem]'}
        `}
      >
        {isCollapsed ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen 
          bg-gradient-to-b from-[#0f172a] via-[#1e3a8a] to-[#1e40af]
          text-white z-40 flex flex-col
          transition-all duration-300 ease-in-out
          border-r border-white/10 shadow-2xl shadow-black/30
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${isCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        {/* Header Section */}
        <div
          className={`
            relative p-5 border-b border-white/10 
            bg-gradient-to-r from-[#1e3a8a]/80 to-[#1e40af]/80
            backdrop-blur-md
            ${isCollapsed ? 'px-4' : ''}
          `}
        >
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shadow-inner">
                <span className="text-lg font-extrabold tracking-tight">NS</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold leading-tight tracking-tight">
                  NSO Student
                </h2>
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">
                  Student Dashboard
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shadow-inner">
                <span className="text-base font-extrabold tracking-tight">NS</span>
              </div>
            </div>
          )}

          <div className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
        
        {/* User Profile Section */}
        <div
          className={`
            px-4 py-3 border-b border-white/10 
            bg-white/5 backdrop-blur-sm
            ${isCollapsed ? 'px-3 py-4' : ''}
          `}
        >
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-white text-[#1e3a8a] flex items-center justify-center font-bold text-sm shadow-md">
                SR
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#1e3a8a] shadow-sm" />
            </div>

            {!isCollapsed && (
              <div className="ml-3">
                <h4 className="font-semibold text-sm leading-tight">Sarah Robinson</h4>
                <p className="text-xs text-white/70">Grade 11 · Liceum High</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Main Navigation - Scrollable Section */}
        <div className="flex-1 overflow-y-auto py-3">
          <nav className={`px-3 ${isCollapsed ? 'px-2' : ''}`}>
            {!isCollapsed && (
              <p className="px-2 mb-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/50">
                Main Navigation
              </p>
            )}

            {menuItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  className={`
                    group flex items-center w-full rounded-xl transition-all mb-1
                    ${active
                      ? 'bg-white/15 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.2)]'
                      : 'hover:bg-white/5 text-white/80'
                    }
                    ${isCollapsed ? 'p-3 justify-center' : 'px-3 py-2.5'}
                  `}
                  onClick={() => handlePageClick(item.id)}
                  title={isCollapsed ? item.label : ''}
                >
                  <span
                    className={`
                      text-lg transition-transform duration-200 
                      ${isCollapsed ? '' : 'mr-3'}
                      group-hover:scale-110
                    `}
                  >
                    {item.icon}
                  </span>

                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          className={`
                            text-[11px] px-2 py-[2px] rounded-full font-semibold
                            border
                            ${active
                              ? 'bg-white text-[#1e3a8a] border-white/80'
                              : 'bg-white/10 text-white border-white/30'
                            }
                          `}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}

            <div className={`h-px bg-white/10 my-3 ${isCollapsed ? 'mx-2' : ''}`} />

            {!isCollapsed && (
              <p className="px-2 mb-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/50">
                Account
              </p>
            )}

            {bottomMenuItems.map((item) => (
              <button
                key={item.id}
                className={`
                  group flex items-center w-full rounded-xl transition-all mb-1
                  hover:bg-white/5 text-white/80
                  ${isCollapsed ? 'p-3 justify-center' : 'px-3 py-2.5'}
                `}
                onClick={() => {
                  if (item.id === 'logout') {
                    alert('Logout functionality would be implemented here.');
                  } else {
                    handlePageClick(item.id);
                  }
                }}
                title={isCollapsed ? item.label : ''}
              >
                <span
                  className={`
                    text-lg opacity-90 
                    ${isCollapsed ? '' : 'mr-3'}
                    group-hover:scale-110 transition-transform duration-200
                  `}
                >
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="flex-1 text-left text-sm font-medium">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Footer */}
        <div
          className={`
            p-4 border-t border-white/10 
            bg-white/5 backdrop-blur-sm
            text-center text-[11px]
            ${isCollapsed ? 'px-2' : ''}
          `}
        >
          {!isCollapsed ? (
            <div className="space-y-1">
              <p className="font-medium tracking-tight">
                NSO Student Portal <span className="text-[10px] text-white/60">v2.1</span>
              </p>
              <p className="text-white/60">
                © 2026 National Science Olympiad
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center leading-tight">
              <span className="text-[11px] font-medium">v2.1</span>
              <span className="text-[10px] text-white/60 mt-1">© 2026</span>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Close Button */}
      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg"
        >
          ✕
        </button>
      )}
    </>
  );
};

export default Sidebar;
