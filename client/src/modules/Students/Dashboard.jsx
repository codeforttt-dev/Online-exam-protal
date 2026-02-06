// src/components/Dashboard.jsx
import { useState } from 'react';
import { FaTrophy, FaClock, FaChartLine, FaCalendarCheck, FaBook, FaVideo, FaFileAlt, FaChartBar, FaFlask, FaAtom, FaDna, FaAward, FaStar, FaPlayCircle, FaCalendar, FaDownload, FaHeadset, FaSchool, FaCity, FaMedal, FaFire, FaEye, FaArrowUp } from 'react-icons/fa';

// Simple StatCard component
const StatCard = ({ title, value, icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-orange-100 text-orange-600',
    success: 'bg-green-100 text-green-600',
    info: 'bg-blue-100 text-blue-600',
    warning: 'bg-yellow-100 text-yellow-600',
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-orange-500">
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mr-4 text-xl`}>
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
          <p className="text-gray-600">{title}</p>
        </div>
      </div>
    </div>
  );
};

// Simple OlympiadCard component
const OlympiadCard = ({ 
  title, 
  subtitle, 
  status, 
  testsCompleted, 
  currentScore, 
  progress, 
  color = 'from-orange-500 to-orange-600'
}) => {
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return 'text-green-600';
      case 'upcoming': return 'text-yellow-600';
      case 'completed': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className={`bg-gradient-to-r ${color} text-white p-5`}>
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="text-sm opacity-90 mt-1">{subtitle}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20`}>
            {status}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="space-y-3 mb-4">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Tests Completed:</span>
            <span className="font-semibold">{testsCompleted}</span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Current Score:</span>
            <span className="font-semibold">{currentScore}</span>
          </div>
        </div>
        
        <div className="mb-5">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors duration-300">
          {status === 'Active' ? 'Continue' : 'View Details'}
        </button>
      </div>
    </div>
  );
};

// Simple ResourceCard component
const ResourceCard = ({ title, description, icon, clickable = true, onClick }) => {
  return (
    <div 
      className={`bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg cursor-pointer ${
        clickable ? 'hover:bg-orange-500 hover:text-white' : ''
      }`}
      onClick={onClick}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl ${
        clickable ? 'bg-orange-100 text-orange-600 group-hover:bg-white group-hover:text-orange-500' : 'bg-gray-100 text-gray-600'
      }`}>
        {icon}
      </div>
      <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const stats = [
    { id: 1, title: 'Active Olympiads', value: '3', icon: <FaTrophy />, color: 'primary' },
    { id: 2, title: 'Study Time This Week', value: '24h', icon: <FaClock />, color: 'success' },
    { id: 3, title: 'Performance Improvement', value: '+12%', icon: <FaChartLine />, color: 'info' },
    { id: 4, title: 'Upcoming Deadlines', value: '2', icon: <FaCalendarCheck />, color: 'warning' },
  ];

  const olympiads = [
    { 
      id: 1, 
      title: 'NSO 2026 - National Round', 
      subtitle: 'Ends: March 30, 2026',
      status: 'Active',
      testsCompleted: '3/5',
      currentScore: '275/300',
      progress: 60,
      color: 'from-orange-500 to-orange-600'
    },
    { 
      id: 2, 
      title: 'Physics Olympiad 2026', 
      subtitle: 'Starts: April 10, 2026',
      status: 'Upcoming',
      testsCompleted: '0/4',
      currentScore: 'Not Started',
      progress: 0,
      color: 'from-blue-500 to-blue-600'
    },
  ];

  const resources = [
    { id: 1, title: 'Physics Textbook', description: 'Advanced concepts and practice problems', icon: <FaBook /> },
    { id: 2, title: 'Video Lectures', description: '50+ hours of expert instruction', icon: <FaVideo /> },
    { id: 3, title: 'Practice Papers', description: 'Previous years question papers', icon: <FaFileAlt /> },
    { id: 4, title: 'Analytics Report', description: 'Your performance analysis', icon: <FaChartBar /> },
  ];

  const upcomingTests = [
    { id: 1, title: 'Chemistry - Organic Compounds', subtitle: 'NSO 2026 • Test #4', time: 'Feb 9, 10:00 AM', icon: <FaFlask /> },
    { id: 2, title: 'Physics - Thermodynamics', subtitle: 'NSO 2026 • Test #5', time: 'Feb 11, 2:00 PM', icon: <FaAtom /> },
    { id: 3, title: 'Biology - Genetics', subtitle: 'Practice Test', time: 'Feb 12, 11:00 AM', icon: <FaDna /> },
  ];

  const recentResults = [
    { id: 1, title: 'Physics - Mechanics', subtitle: 'NSO 2026 • Feb 3, 2026', score: '96%', icon: <FaAward />, color: 'bg-green-500' },
    { id: 2, title: 'Chemistry - Stoichiometry', subtitle: 'NSO 2026 • Jan 28, 2026', score: '88%', icon: <FaStar />, color: 'bg-blue-500' },
    { id: 3, title: 'Biology - Cell Biology', subtitle: 'NSO 2026 • Jan 21, 2026', score: '82%', icon: <FaChartLine />, color: 'bg-yellow-500' },
  ];

  const leaderboardData = [
    { rank: 1, name: 'Alex Johnson', initials: 'AJ', score: 295, highlight: false },
    { rank: 2, name: 'Michael Chen', initials: 'MC', score: 290, highlight: false },
    { rank: 3, name: 'Emma Wilson', initials: 'EW', score: 288, highlight: false },
    { rank: 15, name: 'Sarah Robinson', initials: 'SR', score: 275, highlight: true },
  ];

  const quickActions = [
    { id: 1, title: 'Start Practice Test', description: 'Take a timed practice test', icon: <FaPlayCircle /> },
    { id: 2, title: 'View Study Plan', description: 'Your personalized schedule', icon: <FaCalendar /> },
    { id: 3, title: 'Download Materials', description: 'Get study materials offline', icon: <FaDownload /> },
    { id: 4, title: 'Get Help', description: 'Contact support or mentor', icon: <FaHeadset /> },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="mb-6 lg:mb-0 lg:mr-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Sarah! 👋</h2>
            <p className="text-white/90 max-w-2xl">
              You're doing great! Keep up the momentum. Your next test is in 3 days. 
              Don't forget to check the new study materials added this week.
            </p>
          </div>
          <div className="flex space-x-8">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold">92%</h3>
              <p className="text-sm opacity-90">Average Score</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold">8</h3>
              <p className="text-sm opacity-90">Tests Completed</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold">#15</h3>
              <p className="text-sm opacity-90">National Rank</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Olympiads */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">My Olympiads</h3>
              <span className="text-gray-600">Active Registrations</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {olympiads.map((olympiad) => (
                <OlympiadCard key={olympiad.id} {...olympiad} />
              ))}
            </div>
          </div>

          {/* Study Resources */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Study Resources</h3>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource) => (
                <ResourceCard 
                  key={resource.id} 
                  {...resource}
                  onClick={() => alert(`Opening ${resource.title}`)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Tests */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Upcoming Tests</h3>
              <span className="text-gray-600 text-sm">Next 7 Days</span>
            </div>
            <div className="space-y-4">
              {upcomingTests.map((test) => (
                <div key={test.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mr-4">
                    {test.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{test.title}</h4>
                    <p className="text-sm text-gray-600">{test.subtitle}</p>
                  </div>
                  <div className="text-orange-600 font-semibold text-sm">{test.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Results */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Recent Results</h3>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentResults.map((result) => (
                <div key={result.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className={`w-12 h-12 rounded-lg ${result.color} text-white flex items-center justify-center mr-4`}>
                    {result.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{result.title}</h4>
                    <p className="text-sm text-gray-600">{result.subtitle}</p>
                  </div>
                  <div className="text-xl font-bold text-gray-800">{result.score}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">National Leaderboard</h3>
              <span className="text-gray-600 text-sm">NSO 2026</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left pb-3 text-gray-600 font-semibold">Rank</th>
                    <th className="text-left pb-3 text-gray-600 font-semibold">Student</th>
                    <th className="text-left pb-3 text-gray-600 font-semibold">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((student) => (
                    <tr 
                      key={student.rank} 
                      className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${student.highlight ? 'bg-orange-50' : ''}`}
                    >
                      <td className="py-3">
                        <span className={`font-bold ${student.rank <= 3 ? 'text-yellow-500' : 'text-orange-500'}`}>
                          {student.rank}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${student.highlight ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                            {student.initials}
                          </div>
                          <span className={`${student.highlight ? 'font-semibold' : ''}`}>{student.name}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          student.score >= 290 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {student.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => (
          <ResourceCard 
            key={action.id}
            title={action.title}
            description={action.description}
            icon={action.icon}
            clickable={true}
            onClick={() => alert(`Action: ${action.title}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;