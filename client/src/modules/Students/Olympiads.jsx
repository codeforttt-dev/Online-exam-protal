// src/modules/Students/Olympiads.jsx
import { useState } from 'react';
import { FaPlus, FaFilter } from 'react-icons/fa';
import OlympiadCard from './OlympiadCard';

const Olympiads = () => {
  const [activeCategory, setActiveCategory] = useState('All Olympiads');
  const [searchQuery, setSearchQuery] = useState('');

  const olympiads = [
    { 
      id: 1, 
      title: 'NSO 2026 - National Round', 
      subtitle: 'Active • Feb 15 - Mar 30, 2026',
      status: 'Active',
      testsCompleted: '3/5',
      currentScore: '275/300',
      progress: 60,
      color: 'orange',          // dashboard primary
      detailed: true,
      showRank: true,
      rank: '#15'
    },
    { 
      id: 2, 
      title: 'Physics Olympiad 2026', 
      subtitle: 'Upcoming • Apr 10 - May 15, 2026',
      status: 'Upcoming',
      testsCompleted: '0/4',
      currentScore: 'Not Started',
      progress: 0,
      color: 'blue',
      detailed: true,
      showFee: true,
      fee: '$45.00',
      paymentStatus: 'Paid'
    },
    { 
      id: 3, 
      title: 'Chemistry Challenge 2025', 
      subtitle: 'Completed • Nov 1 - Dec 15, 2025',
      status: 'Completed',
      testsCompleted: '4/4',
      currentScore: '285/300',
      progress: 95,
      color: 'green',
      detailed: true,
      showRank: true,
      rank: '#24',
      certificate: 'Issued',
      performance: 'Top 5%'
    },
  ];

  const categories = ['All Olympiads', 'Active', 'Upcoming', 'Completed'];

  const filteredOlympiads = olympiads.filter((olympiad) => {
    // category filter
    const matchesCategory =
      activeCategory === 'All Olympiads' ||
      olympiad.status === activeCategory;

    // search filter (title + subtitle)
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      olympiad.title.toLowerCase().includes(q) ||
      olympiad.subtitle.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const handleRegister = () => {
    alert('Registration modal would open here');
  };

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Olympiads</h1>
          <p className="text-gray-600 mt-1">
            Manage your registered olympiads and track progress
          </p>
        </div>
        <button
          onClick={handleRegister}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors duration-300 flex items-center text-sm"
        >
          <FaPlus className="mr-2" />
          Register for New Olympiad
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-5 py-2.5 rounded-full border-2 text-sm transition-colors ${
              activeCategory === category
                ? 'bg-orange-500 border-orange-500 text-white'
                : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaFilter className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search olympiads..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Olympiads Grid – compact cards handled inside OlympiadCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {filteredOlympiads.map((olympiad) => (
          <OlympiadCard key={olympiad.id} {...olympiad} />
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">
              {olympiads.length}
            </div>
            <div className="text-sm text-gray-600">Total Olympiads</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {olympiads.filter((o) => o.status === 'Active').length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {olympiads.filter((o) => o.status === 'Upcoming').length}
            </div>
            <div className="text-sm text-gray-600">Upcoming</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {olympiads.filter((o) => o.status === 'Completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>
      </div>

      {/* No Results Message */}
      {filteredOlympiads.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FaPlus className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No olympiads found
          </h3>
          <p className="text-gray-600 mb-6">
            Try a different category or register for a new olympiad
          </p>
          <button
            onClick={handleRegister}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors duration-300 text-sm"
          >
            Register Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Olympiads;
