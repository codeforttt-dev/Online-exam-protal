// src/components/LeaderboardContent.jsx
import { useState } from 'react';
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
  const [currentUserRank] = useState(15);

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

  // Filter data (currently only search; can extend for time/subject/region)
  const filteredData = leaderboardData.filter((student) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      student.name.toLowerCase().includes(q) ||
      student.school.toLowerCase().includes(q) ||
      student.city.toLowerCase().includes(q);
    return matchesSearch;
  });

  // Rank badge color
  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-700 to-amber-800 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Rank icon
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <FaCrown className="text-xl" />;
      case 2:
      case 3:
        return <FaMedal className="text-xl" />;
      default:
        return <span className="font-bold">{rank}</span>;
    }
  };

  const viewProfile = (student) => {
    alert(`Viewing profile of ${student.name}\nSchool: ${student.school}\nCity: ${student.city}`);
  };

  const shareLeaderboard = () => {
    alert('Share leaderboard link would be generated here');
  };

  const exportLeaderboard = () => {
    alert('Leaderboard exported as CSV');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">National Leaderboard</h1>
          <p className="text-gray-600 mt-1">
            Compete with students nationwide and track your ranking
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={shareLeaderboard}
            className="flex items-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium"
          >
            <FaShareAlt className="mr-2" />
            Share
          </button>
          <button
            onClick={exportLeaderboard}
            className="flex items-center px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-sm"
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
            <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center mr-3">
              <FaUserFriends />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Participants</p>
              <h3 className="text-xl font-bold text-gray-800">
                {leaderboardStats.totalParticipants.toLocaleString()}
              </h3>
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
              <h3 className="text-xl font-bold text-gray-800">
                Top {leaderboardStats.yourPercentile}%
              </h3>
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
              <h3 className="text-xl font-bold text-gray-800">
                {leaderboardStats.averageScore}%
              </h3>
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
              <h3 className="text-xl font-bold text-gray-800">
                {leaderboardStats.topScore}/300
              </h3>
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
              <h3 className="text-xl font-bold text-gray-800">
                {leaderboardStats.activeToday.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Current User Rank Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start mb-2">
              <div className="w-12 h-12 rounded-full bg-white text-orange-500 flex items-center justify-center text-lg font-bold mr-3">
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
            <div className="text-3xl font-bold mb-1">
              {leaderboardData.find((s) => s.isCurrentUser)?.score}/300
            </div>
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
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
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
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                viewType === 'table'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700'
              }`}
              onClick={() => setViewType('table')}
            >
              Table View
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                viewType === 'card'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700'
              }`}
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
                {timeFilters.map((filter) => (
                  <button
                    key={filter.id}
                    className={`px-3 py-1.5 rounded-full text-xs md:text-sm transition-colors ${
                      timeFilter === filter.id
                        ? 'bg-orange-500 text-white'
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
                {subjectFilters.map((filter) => (
                  <button
                    key={filter.id}
                    className={`px-3 py-1.5 rounded-full text-xs md:text-sm transition-colors ${
                      subjectFilter === filter.id
                        ? 'bg-orange-500 text-white'
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
                {regionFilters.map((filter) => (
                  <button
                    key={filter.id}
                    className={`px-3 py-1.5 rounded-full text-xs md:text-sm transition-colors ${
                      regionFilter === filter.id
                        ? 'bg-orange-500 text-white'
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
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Rank
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Student
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    School & Location
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Score
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Tests
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Streak
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Subjects
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Improvement
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((student, idx) => (
                  <tr
                    key={student.id}
                    className={`transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
                    } hover:bg-orange-50 ${
                      student.isCurrentUser ? 'bg-orange-50' : ''
                    }`}
                  >
                    {/* Rank */}
                    <td className="px-4 py-3 align-middle">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs ${getRankBadgeColor(
                          student.rank
                        )}`}
                      >
                        {getRankIcon(student.rank)}
                      </div>
                    </td>

                    {/* Student Info */}
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center mr-3 text-xs font-semibold ${
                            student.isCurrentUser
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {student.avatar}
                        </div>
                        <div className="space-y-0.5">
                          <div className="font-semibold text-gray-800 leading-tight">
                            {student.name}
                          </div>
                          <div className="text-[11px] text-gray-500">
                            {student.isCurrentUser && (
                              <span className="text-orange-500 font-medium mr-1">
                                (You)
                              </span>
                            )}
                            ID: NSO{student.id.toString().padStart(4, '0')}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* School & Location */}
                    <td className="px-4 py-3 align-middle">
                      <div className="space-y-0.5">
                        <div className="flex items-center text-xs font-medium text-gray-800">
                          <FaSchool className="mr-1.5 text-gray-500" size={11} />
                          <span className="truncate max-w-[180px] md:max-w-[220px]">
                            {student.school}
                          </span>
                        </div>
                        <div className="flex items-center text-[11px] text-gray-500">
                          <FaCity className="mr-1.5 text-gray-500" size={11} />
                          <span className="truncate max-w-[180px] md:max-w-[220px]">
                            {student.city}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Score */}
                    <td className="px-4 py-3 align-middle">
                      <div className="space-y-0.5">
                        <div className="text-sm font-bold text-gray-800">
                          {student.score}/300
                        </div>
                        <div className="text-xs font-semibold text-orange-500">
                          {student.percentage}%
                        </div>
                      </div>
                    </td>

                    {/* Tests Completed */}
                    <td className="px-4 py-3 align-middle text-center">
                      <div className="text-sm font-semibold text-gray-800">
                        {student.testsCompleted}
                      </div>
                      <div className="text-[11px] text-gray-500">tests</div>
                    </td>

                    {/* Streak */}
                    <td className="px-4 py-3 align-middle text-center">
                      <div className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-red-50 text-[11px] text-red-600 font-semibold">
                        <FaFire className="mr-1" />
                        {student.streak}d
                      </div>
                    </td>

                    {/* Subjects */}
                    <td className="px-4 py-3 align-middle">
                      <div className="flex flex-wrap gap-1">
                        <span className="text-[11px] bg-red-50 text-red-700 px-2 py-0.5 rounded-full">
                          P: {student.subjects.physics}%
                        </span>
                        <span className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                          C: {student.subjects.chemistry}%
                        </span>
                        <span className="text-[11px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                          B: {student.subjects.biology}%
                        </span>
                        <span className="text-[11px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                          M: {student.subjects.mathematics}%
                        </span>
                      </div>
                    </td>

                    {/* Improvement */}
                    <td className="px-4 py-3 align-middle">
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          student.improvement.startsWith('+')
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {student.improvement.startsWith('+') ? (
                          <FaArrowUp className="mr-1" />
                        ) : (
                          <FaArrowDown className="mr-1" />
                        )}
                        {student.improvement}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 align-middle text-right">
                      <button
                        onClick={() => viewProfile(student)}
                        className="inline-flex items-center justify-center p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                        title="View Profile"
                      >
                        <FaEye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaTrophy className="text-2xl text-gray-400" />
              </div>
              <h3 className="text-base font-semibold text-gray-700 mb-1">
                No students found
              </h3>
              <p className="text-sm text-gray-500">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Leaderboard Card View – compact cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filteredData.map((student) => (
            <div
              key={student.id}
              className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                student.isCurrentUser
                  ? 'border-orange-500 ring-1 ring-orange-200'
                  : 'border-gray-100'
              }`}
            >
              {/* Rank Banner (thin) */}
              <div className={`h-1.5 ${getRankBadgeColor(student.rank)}`}></div>

              <div className="p-4 space-y-3">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 text-xs font-semibold ${
                        student.isCurrentUser
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {student.avatar}
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                        {student.name}
                      </h3>
                      {student.isCurrentUser && (
                        <span className="text-orange-500 text-[11px] font-medium">
                          (You)
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${getRankBadgeColor(
                      student.rank
                    )}`}
                  >
                    {getRankIcon(student.rank)}
                  </div>
                </div>

                {/* School & Location */}
                <div className="space-y-1">
                  <div className="flex items-center text-[11px] text-gray-600">
                    <FaSchool className="mr-1.5" size={11} />
                    <span className="truncate">{student.school}</span>
                  </div>
                  <div className="flex items-center text-[11px] text-gray-500">
                    <FaCity className="mr-1.5" size={11} />
                    <span className="truncate">{student.city}</span>
                  </div>
                </div>

                {/* Score */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold text-gray-800 leading-tight">
                      {student.score}
                      <span className="text-xs text-gray-500">/300</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {student.percentage}% Average
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <span className="font-semibold text-orange-500">
                      #{student.rank}
                    </span>{' '}
                    overall
                  </div>
                </div>

                {/* Small stats row */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-800">
                      {student.testsCompleted}
                    </div>
                    <div className="text-[11px] text-gray-500">Tests</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-sm font-semibold text-gray-800">
                      <FaFire className="text-red-500 mr-1" />
                      {student.streak}
                    </div>
                    <div className="text-[11px] text-gray-500">Streak</div>
                  </div>
                  <div className="text-center">
                    <div
                      className={`flex items-center justify-center text-sm font-semibold ${
                        student.improvement.startsWith('+')
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {student.improvement.startsWith('+') ? (
                        <FaArrowUp className="mr-0.5" />
                      ) : (
                        <FaArrowDown className="mr-0.5" />
                      )}
                      {student.improvement}
                    </div>
                    <div className="text-[11px] text-gray-500">Growth</div>
                  </div>
                </div>

                {/* Subject Scores – compact bars */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-gray-600">
                    <span>Physics</span>
                    <span className="font-medium">
                      {student.subjects.physics}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-red-500 h-1.5 rounded-full"
                      style={{ width: `${student.subjects.physics}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[11px] text-gray-600">
                    <span>Chemistry</span>
                    <span className="font-medium">
                      {student.subjects.chemistry}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full"
                      style={{ width: `${student.subjects.chemistry}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Button – subtle */}
                <button
                  onClick={() => viewProfile(student)}
                  className="w-full mt-1 flex items-center justify-center px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FaEye className="mr-1.5" size={12} />
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
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
            Previous
          </button>
          <button className="px-3 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold">
            1
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
            2
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
            3
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
            Next
          </button>
        </div>
      </div>

      {/* Top Performers Highlights */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          🏆 Top Performers Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leaderboardData.slice(0, 3).map((topStudent) => (
            <div
              key={topStudent.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center mb-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    topStudent.rank === 1
                      ? 'bg-yellow-100 text-yellow-800'
                      : topStudent.rank === 2
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {getRankIcon(topStudent.rank)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">
                    {topStudent.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {topStudent.school}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {topStudent.score}/300
                </div>
                <div className="text-sm text-gray-600">Total Score</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Ranking Progress */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Your Ranking Progress
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                Progress to Top 10
              </span>
              <span className="text-sm font-semibold text-gray-800">
                5 ranks to go
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-orange-500 h-2.5 rounded-full"
                style={{ width: '66%' }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                #15
              </div>
              <div className="text-sm text-gray-600">
                Current Rank
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
                <FaArrowUp className="mr-1" />
                +3
              </div>
              <div className="text-sm text-gray-600">
                Last Month
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                #10
              </div>
              <div className="text-sm text-gray-600">
                Target Rank
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardContent;
