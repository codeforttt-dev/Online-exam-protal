// Layout.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import {
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ChevronDownIcon,
  UsersIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  ClockIcon,
  DocumentPlusIcon,
  CloudArrowUpIcon,
  DocumentArrowDownIcon,
  TrophyIcon,
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  BuildingLibraryIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";
import { Sidebar } from 'lucide-react';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get current active tab from path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/adminDashboard')) return 'Dashboard';
    if (path.includes('/olympiad-management')) return 'Olympiad Management';
    if (path.includes('/question-bank')) return 'Question Bank';
    if (path.includes('/participants')) return 'Participants';
    if (path.includes('/schools')) return 'Schools';
    if (path.includes('/tests')) return 'Tests';
    if (path.includes('/results')) return 'Results & Analytics';
    if (path.includes('/payments')) return 'Payments';
    if (path.includes('/settings')) return 'Settings';
    if (path.includes('/administrators')) return 'Administrators';
    return 'Dashboard';
  };

  const activeTab = getActiveTab();

  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/adminDashboard' },
    { name: 'Olympiad Management', icon: TrophyIcon, path: '/olympiad-management' },
    { name: 'Question Bank', icon: QuestionMarkCircleIcon, path: '/question-bank' },
    { name: 'Participants', icon: UsersIcon, path: '/participants' },
    { name: 'Schools', icon: BuildingLibraryIcon, path: '/schools' },
    { name: 'Tests', icon: DocumentPlusIcon, path: '/tests' },
    { name: 'Results & Analytics', icon: ChartBarIcon, path: '/results' },
    { name: 'Payments', icon: CurrencyDollarIcon, path: '/payments' },
    { name: 'Settings', icon: Cog6ToothIcon, path: '/settings' },
    { name: 'Administrators', icon: UsersIcon, path: '/administrators' }
  ];

  const Sidebar = () => (
    <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
    md:translate-x-0 fixed md:relative inset-y-0 left-0 
    transform transition-transform duration-300 ease-in-out 
    z-30 w-64 
    bg-gradient-to-b from-[#fbbf24] via-[#f59e0b] to-[#d97706] 
    text-white shadow-xl flex flex-col`}>
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center">
          <div className="bg-white text-orange-600 p-2 rounded-lg">
            <AcademicCapIcon className="h-8 w-8" />
          </div>
          <div className="ml-3">
            <h1 className="text-xl font-bold text-white">NSO Admin</h1>
            <p className="text-sm text-white/80">National Science Olympiad (USA)</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold">A D</span>
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-white">Admin</h3>
            <p className="text-xs text-white/80">Super Administrator</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              navigate(item.path);
              setSidebarOpen(false); // Close sidebar on mobile
            }}
            className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-all duration-200 ${
              activeTab === item.name 
                ? 'bg-white/20 text-white shadow-md' 
                : 'text-white/90 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className={`mr-3 p-1.5 rounded-md ${
              activeTab === item.name 
                ? 'bg-white/30' 
                : 'bg-white/10'
            }`}>
              <item.icon className={`h-5 w-5 ${activeTab === item.name ? 'text-white' : 'text-white/80'}`} />
            </div>
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );

  const Header = () => (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="ml-4 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
              {activeTab === 'Dashboard' ? 'Dashboard Overview' : activeTab}
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-md">
              {activeTab === 'Dashboard' 
                ? "Here's what's happening with NSO today." 
                : `Manage ${activeTab.toLowerCase()} for NSO`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
              placeholder="Search..."
            />
          </div>
          
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="flex items-center text-gray-700 hover:text-gray-900">
            <UserCircleIcon className="h-8 w-8" />
            <ChevronDownIcon className="h-5 w-5 ml-1" />
          </button>
        </div>
      </div>
    </header>
  );

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar />
      
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-gradient-to-r from-orange-500 to-amber-500 text-white p-3 rounded-full shadow-lg"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <main className="flex-1 overflow-y-auto">
        <Header />
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;