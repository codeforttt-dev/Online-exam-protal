// src/components/LeaderboardContent.jsx
import { useState, useEffect } from 'react';
import { 
  FaTrophy, 
  FaMedal, 
  FaCrown, 
  FaChartLine, 
  FaFilter, 
  FaSearch, 
  FaCalendarAlt,
  FaSchool,
  FaCity,
  FaUserFriends,
  FaArrowUp,
  FaArrowDown,
  FaStar,
  FaFire,
  FaAward,
  FaEye,
  FaShareAlt,
  FaDownload
} from 'react-icons/fa';

const LeaderboardContent = () => {
  const [timeFilter, setTimeFilter] = useState('overall');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('national');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState('table'); // 'table' or 'card'
  const [currentUserRank, setCurrentUserRank] = useState(15);

  // Leaderboard data
  const leaderboardData = [
    {
      id: 1,
      rank: 1,
      name: 'Alex Johnson',
      school: 'Stanford High',
      city: 'San Francisco, CA',
      avatar: 'AJ',
      score: 298,
      totalScore: 300,
      percentage: 99.3,
      testsCompleted: 25,
      streak: 18,
      subjects: { physics: 99, chemistry: 98, biology: 100, mathematics: 99 },
      improvement: '+2.5%',
      isCurrentUser: false,
    },
    {
      id: 2,
      rank: 2,
      name: 'Michael Chen',
      school: 'MIT Prep School',
      city: 'Boston, MA',
      avatar: 'MC',
      score: 295,
      totalScore: 300,
      percentage: 98.3,
      testsCompleted: 24,
      streak: 15,
      subjects: { physics: 99, chemistry: 97, biology: 98, mathematics: 100 },
      improvement: '+1.8%',
      isCurrentUser: false,
    },
    {
      id: 3,
      rank: 3,
      name: 'Emma Wilson',
      school: 'Cambridge Academy',
      city: 'New York, NY',
      avatar: 'EW',
      score: 292,
      totalScore: 300,
      percentage: 97.3,
      testsCompleted: 23,
      streak: 12,
      subjects: { physics: 98, chemistry: 99, biology: 97, mathematics: 96 },
      improvement: '+3.2%',
      isCurrentUser: false,
    },
    {
      id: 4,
      rank: 4,
      name: 'David Miller',
      school: 'Science Magnet',
      city: 'Chicago, IL',
      avatar: 'DM',
      score: 288,
      totalScore: 300,
      percentage: 96.0,
      testsCompleted: 22,
      streak: 10,
      subjects: { physics: 96, chemistry: 97, biology: 98, mathematics: 95 },
      improvement: '+2.1%',
      isCurrentUser: false,
    },
    {
      id: 5,
      rank: 5,
      name: 'Sophia Garcia',
      school: 'Tech High',
      city: 'Austin, TX',
      avatar: 'SG',
      score: 285,
      totalScore: 300,
      percentage: 95.0,
      testsCompleted: 21,
      streak: 8,
      subjects: { physics: 95, chemistry: 96, biology: 97, mathematics: 94 },
      improvement: '+1.5%',
      isCurrentUser: false,
    },
    {
      id: 6,
      rank: 6,
      name: 'James Brown',
      school: 'Lincoln High',
      city: 'Seattle, WA',
      avatar: 'JB',
      score: 282,
      totalScore: 300,
      percentage: 94.0,
      testsCompleted: 20,
      streak: 7,
      subjects: { physics: 94, chemistry: 95, biology: 96, mathematics: 93 },
      improvement: '+2.8%',
      isCurrentUser: false,
    },
    {
      id: 7,
      rank: 7,
      name: 'Olivia Davis',
      school: 'Newton Academy',
      city: 'Miami, FL',
      avatar: 'OD',
      score: 280,
      totalScore: 300,
      percentage: 93.3,
      testsCompleted: 19,
      streak: 6,
      subjects: { physics: 93, chemistry: 94, biology: 95, mathematics: 92 },
      improvement: '+1.2%',
      isCurrentUser: false,
    },
    {
      id: 8,
      rank: 8,
      name: 'William Taylor',
      school: 'Einstein High',
      city: 'Denver, CO',
      avatar: 'WT',
      score: 278,
      totalScore: 300,
      percentage: 92.7,
      testsCompleted: 18,
      streak: 5,
      subjects: { physics: 92, chemistry: 93, biology: 94, mathematics: 91 },
      improvement: '+0.8%',
      isCurrentUser: false,
    },
    // Current User (highlighted)
    {
      id: 15,
      rank: 15,
      name: 'Sarah Robinson',
      school: 'Lincoln High',
      city: 'Chicago, IL',
      avatar: 'SR',
      score: 275,
      totalScore: 300,
      percentage: 91.7,
      testsCompleted: 18,
      streak: 14,
      subjects: { physics: 92, chemistry: 88, biology: 82, mathematics: 78 },
      improvement: '+12.3%',
      isCurrentUser: true,
    },
  ];

  // Filter options
  const timeFilters = [
    { id: 'overall', label: 'Overall' },
    { id: 'monthly', label: 'This Month' },
    { id: 'weekly', label: 'This Week' },
    { id: 'daily', label: 'Today' },
  ];

  const subjectFilters = [
    { id: 'all', label: 'All Subjects' },
    { id: 'physics', label: 'Physics' },
    { id: 'chemistry', label: 'Chemistry' },
    { id: 'biology', label: 'Biology' },
    { id: 'mathematics', label: 'Mathematics' },
  ];

  const regionFilters = [
    { id: 'national', label: 'National' },
    { id: 'state', label: 'State (IL)' },
    { id: 'school', label: 'School' },
    { id: 'global', label: 'Global' },
  ];

  // Stats
  const leaderboardStats = {
    totalParticipants: 12458,
    yourPercentile: 92,
    averageScore: 84.5,
    topScore: 298,
    activeToday: 3456,
  };

  // Filter data
  const filteredData = leaderboardData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Get rank badge color
  const getRankBadgeColor = (rank) => {
    switch(rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
      case 2: return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
      case 3: return 'bg-gradient-to-r from-amber-700 to-amber-800 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get rank icon
  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <FaCrown className="text-xl" />;
      case 2: return <FaMedal className="text-xl" />;
      case 3: return <FaMedal className="text-xl" />;
      default: return <span className="font-bold">{rank}</span>;
    }
  };

  // Get score color
  const getScoreColor = (score) => {
    if (score >= 290) return 'bg-green-100 text-green-800';
    if (score >= 280) return 'bg-blue-100 text-blue-800';
    if (score >= 270) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  // Handle view profile
  const viewProfile = (student) => {
    alert(`Viewing profile of ${student.name}\nSchool: ${student.school}\nCity: ${student.city}`);
    // In real app, navigate to student profile
  };

  // Handle share
  const shareLeaderboard = () => {
    alert('Share leaderboard link would be generated here');
  };

  // Handle export
  const exportLeaderboard = () => {
    alert('Leaderboard exported as CSV');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">National Leaderboard</h1>
          <p className="text-gray-600 mt-1">Compete with students nationwide and track your ranking</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={shareLeaderboard}
            className="btn-secondary flex items-center"
          >
            <FaShareAlt className="mr-2" />
            Share
          </button>
          <button 
            onClick={exportLeaderboard}
            className="btn-primary flex items-center"
          >
            <FaDownload className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3">
              <FaUserFriends />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Participants</p>
              <h3 className="text-xl font-bold text-gray-800">{leaderboardStats.totalParticipants.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mr-3">
              <FaChartLine />
            </div>
            <div>
              <p className="text-sm text-gray-600">Your Percentile</p>
              <h3 className="text-xl font-bold text-gray-800">Top {leaderboardStats.yourPercentile}%</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
              <FaTrophy />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <h3 className="text-xl font-bold text-gray-800">{leaderboardStats.averageScore}%</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3">
              <FaStar />
            </div>
            <div>
              <p className="text-sm text-gray-600">Top Score</p>
              <h3 className="text-xl font-bold text-gray-800">{leaderboardStats.topScore}/300</h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mr-3">
              <FaFire />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Today</p>
              <h3 className="text-xl font-bold text-gray-800">{leaderboardStats.activeToday.toLocaleString()}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Current User Rank Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-5">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start mb-2">
              <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center text-lg font-bold mr-3">
                SR
              </div>
              <div>
                <h3 className="text-xl font-bold">Sarah Robinson</h3>
                <p className="text-white/90">Lincoln High • Chicago, IL</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-1">#{currentUserRank}</div>
            <p className="text-white/90">Your National Rank</p>
          </div>
          <div className="text-center mt-4 md:mt-0">
            <div className="text-3xl font-bold mb-1">{leaderboardData.find(s => s.isCurrentUser)?.score}/300</div>
            <p className="text-white/90">Total Score</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex justify-between">
            <div className="text-center">
              <div className="text-lg font-bold">91.7%</div>
              <div className="text-sm text-white/80">Average</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold flex items-center justify-center text-green-300">
                <FaArrowUp className="mr-1" />
                +12.3%
              </div>
              <div className="text-sm text-white/80">Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">14</div>
              <div className="text-sm text-white/80">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">18</div>
              <div className="text-sm text-white/80">Tests Taken</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Search */}
          <div className="w-full lg:w-auto lg:flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, school, or city..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              className={`px-4 py-2 ${viewType === 'table' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setViewType('table')}
            >
              Table View
            </button>
            <button
              className={`px-4 py-2 ${viewType === 'card' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setViewType('card')}
            >
              Card View
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Time Period:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {timeFilters.map(filter => (
                  <button
                    key={filter.id}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      timeFilter === filter.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setTimeFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <FaFilter className="text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Subject:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {subjectFilters.map(filter => (
                  <button
                    key={filter.id}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      subjectFilter === filter.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSubjectFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <FaSchool className="text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Region:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {regionFilters.map(filter => (
                  <button
                    key={filter.id}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      regionFilter === filter.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setRegionFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table View */}
      {viewType === 'table' ? (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Rank</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Student</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">School & Location</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Score</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Tests</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Streak</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Subjects</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Improvement</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((student) => (
                  <tr 
                    key={student.id} 
                    className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${
                      student.isCurrentUser ? 'bg-primary/5' : ''
                    }`}
                  >
                    {/* Rank */}
                    <td className="p-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankBadgeColor(student.rank)}`}>
                        {getRankIcon(student.rank)}
                      </div>
                    </td>

                    {/* Student Info */}
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          student.isCurrentUser ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                        }`}>
                          <span className="font-bold">{student.avatar}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{student.name}</div>
                          <div className="text-sm text-gray-600">
                            {student.isCurrentUser && (
                              <span className="text-primary font-medium mr-1">(You)</span>
                            )}
                            ID: NSO{student.id.toString().padStart(4, '0')}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* School & Location */}
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-gray-800 flex items-center">
                          <FaSchool className="mr-2 text-gray-500" size={12} />
                          {student.school}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center mt-1">
                          <FaCity className="mr-2 text-gray-500" size={12} />
                          {student.city}
                        </div>
                      </div>
                    </td>

                    {/* Score */}
                    <td className="p-4">
                      <div>
                        <div className="text-lg font-bold text-gray-800">{student.score}/300</div>
                        <div className="text-sm font-semibold text-primary">{student.percentage}%</div>
                      </div>
                    </td>

                    {/* Tests Completed */}
                    <td className="p-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-800">{student.testsCompleted}</div>
                        <div className="text-xs text-gray-600">tests</div>
                      </div>
                    </td>

                    {/* Streak */}
                    <td className="p-4">
                      <div className="flex items-center justify-center">
                        <FaFire className="text-red-500 mr-1" />
                        <span className="font-bold text-gray-800">{student.streak}</span>
                        <span className="text-xs text-gray-600 ml-1">days</span>
                      </div>
                    </td>

                    {/* Subjects */}
                    <td className="p-4">
                      <div className="flex gap-1">
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">P: {student.subjects.physics}%</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">C: {student.subjects.chemistry}%</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">B: {student.subjects.biology}%</span>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">M: {student.subjects.mathematics}%</span>
                      </div>
                    </td>

                    {/* Improvement */}
                    <td className="p-4">
                      <div className={`flex items-center font-semibold ${
                        student.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {student.improvement.startsWith('+') ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                        {student.improvement}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <button
                        onClick={() => viewProfile(student)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="View Profile"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaTrophy className="text-2xl text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No students found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      ) : (
        /* Leaderboard Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((student) => (
            <div 
              key={student.id} 
              className={`bg-white rounded-xl shadow-md border overflow-hidden transition-all duration-300 hover:shadow-lg ${
                student.isCurrentUser ? 'border-primary ring-2 ring-primary/20' : 'border-gray-100'
              }`}
            >
              {/* Rank Banner */}
              <div className={`h-2 ${getRankBadgeColor(student.rank)}`}></div>

              <div className="p-5">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${
                      student.isCurrentUser ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      <span className="font-bold">{student.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{student.name}</h3>
                      {student.isCurrentUser && (
                        <span className="text-primary text-sm font-medium">(You)</span>
                      )}
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankBadgeColor(student.rank)}`}>
                    {getRankIcon(student.rank)}
                  </div>
                </div>

                {/* School & Location */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <FaSchool className="mr-2" size={12} />
                    {student.school}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCity className="mr-2" size={12} />
                    {student.city}
                  </div>
                </div>

                {/* Score */}
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-800">{student.score}<span className="text-lg text-gray-600">/300</span></div>
                  <div className="text-sm text-gray-600">{student.percentage}% Average</div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">{student.testsCompleted}</div>
                    <div className="text-xs text-gray-600">Tests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800 flex items-center justify-center">
                      <FaFire className="text-red-500 mr-1" />
                      {student.streak}
                    </div>
                    <div className="text-xs text-gray-600">Streak</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold flex items-center justify-center ${
                      student.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {student.improvement.startsWith('+') ? <FaArrowUp /> : <FaArrowDown />}
                      {student.improvement}
                    </div>
                    <div className="text-xs text-gray-600">Growth</div>
                  </div>
                </div>

                {/* Subject Scores */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Subject Scores:</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Physics</span>
                        <span className="font-medium">{student.subjects.physics}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${student.subjects.physics}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Chemistry</span>
                        <span className="font-medium">{student.subjects.chemistry}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${student.subjects.chemistry}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Biology</span>
                        <span className="font-medium">{student.subjects.biology}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${student.subjects.biology}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => viewProfile(student)}
                  className="w-full btn-secondary flex items-center justify-center"
                >
                  <FaEye className="mr-2" />
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {filteredData.length} of {leaderboardData.length} students
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-2 bg-primary text-white rounded-lg">
            1
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {/* Top Performers Highlights */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">🏆 Top Performers Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leaderboardData.slice(0, 3).map((topStudent) => (
            <div key={topStudent.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  topStudent.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                  topStudent.rank === 2 ? 'bg-gray-100 text-gray-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {getRankIcon(topStudent.rank)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{topStudent.name}</h4>
                  <p className="text-sm text-gray-600">{topStudent.school}</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{topStudent.score}/300</div>
                <div className="text-sm text-gray-600">Total Score</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Ranking Progress */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Ranking Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Progress to Top 10</span>
              <span className="text-sm font-semibold text-gray-800">5 ranks to go</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: '66%' }}></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">#15</div>
              <div className="text-sm text-gray-600">Current Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
                <FaArrowUp className="mr-1" />
                +3
              </div>
              <div className="text-sm text-gray-600">Last Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">#10</div>
              <div className="text-sm text-gray-600">Target Rank</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardContent;