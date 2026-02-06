// src/components/TopHeader.jsx
import { useState, useEffect } from 'react';
import { FaBars, FaSearch, FaBell, FaCalendarAlt } from 'react-icons/fa';

const TopHeader = ({ title, subtitle, sidebarOpen, setSidebarOpen }) => {
  const [currentDate, setCurrentDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="px-4 py-4 md:px-6 flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <button 
            className="lg:hidden mr-4 text-primary text-xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-gray-600 text-sm">{subtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tests, materials..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button className="relative p-2">
            <FaBell className="text-gray-600 text-xl" />
            <span className="absolute top-0 right-0 bg-danger text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="bg-light text-gray-700 px-4 py-2 rounded-full flex items-center">
            <FaCalendarAlt className="mr-2" />
            <span className="text-sm font-medium">{currentDate}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;