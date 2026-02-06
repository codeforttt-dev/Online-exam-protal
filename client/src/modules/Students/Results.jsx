// src/components/ResultsContent.jsx
import { useState, useEffect } from 'react';
import {
  FaChartLine,
  FaTrophy,
  FaCalendarAlt,
  FaFilter,
  FaDownload,
  FaShareAlt,
  FaArrowUp,
  FaArrowDown,
  FaAward,
  FaStar,
  FaChartBar,
  FaClock,
  FaPercent,
  FaMedal,
  FaEye,
} from 'react-icons/fa';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

// Simple count-up hook (0 → target over duration ms)
const useCountUp = (target, duration = 1200) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(target) || 0;
    if (end === 0) {
      setValue(0);
      return;
    }

    const stepTime = 16; // ~60fps
    const totalSteps = Math.round(duration / stepTime);
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const progress = currentStep / totalSteps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out
      const currentValue =
        Math.round((start + (end - start) * eased) * 10) / 10; // 1 decimal
      setValue(currentValue);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setValue(end);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return value;
};

const ResultsContent = () => {
  const [timeFilter, setTimeFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [viewMode, setViewMode] = useState('detailed'); // 'detailed' or 'summary'

  // Table pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  // Performance summary data
  const performanceSummary = {
    averageScore: 88.5,
    totalTests: 24,
    testsCompleted: 18,
    improvement: 12.3,
    nationalRank: 15,
    percentile: 92,
  };

  // Count-up values
  const avgScoreCount = useCountUp(performanceSummary.averageScore);
  const testsCompletedCount = useCountUp(performanceSummary.testsCompleted);
  const totalTestsCount = useCountUp(performanceSummary.totalTests);
  const improvementCount = useCountUp(performanceSummary.improvement);
  const rankCount = useCountUp(performanceSummary.nationalRank);
  const percentileCount = useCountUp(performanceSummary.percentile);
  const bestScoreCount = useCountUp(96);
  const avgTimeCount = useCountUp(42);
  const accuracyCount = useCountUp(87);

  // Recent results data
  const recentResults = [
    {
      id: 1,
      testName: 'Physics - Mechanics',
      date: 'Feb 15, 2026',
      subject: 'Physics',
      score: 96,
      totalScore: 100,
      percentage: 96,
      timeTaken: '38/45 min',
      accuracy: 94,
      rank: 12,
      difficulty: 'medium',
      status: 'excellent',
    },
    {
      id: 2,
      testName: 'Chemistry - Stoichiometry',
      date: 'Feb 10, 2026',
      subject: 'Chemistry',
      score: 88,
      totalScore: 100,
      percentage: 88,
      timeTaken: '42/50 min',
      accuracy: 86,
      rank: 25,
      difficulty: 'hard',
      status: 'good',
    },
    {
      id: 3,
      testName: 'Biology - Cell Biology',
      date: 'Feb 5, 2026',
      subject: 'Biology',
      score: 82,
      totalScore: 100,
      percentage: 82,
      timeTaken: '35/40 min',
      accuracy: 80,
      rank: 42,
      difficulty: 'medium',
      status: 'average',
    },
    {
      id: 4,
      testName: 'NSO Mock Test - Full',
      date: 'Jan 30, 2026',
      subject: 'Mixed',
      score: 275,
      totalScore: 300,
      percentage: 91.7,
      timeTaken: '115/120 min',
      accuracy: 90,
      rank: 18,
      difficulty: 'hard',
      status: 'excellent',
    },
    {
      id: 5,
      testName: 'Mathematics - Calculus',
      date: 'Jan 25, 2026',
      subject: 'Mathematics',
      score: 78,
      totalScore: 100,
      percentage: 78,
      timeTaken: '50/55 min',
      accuracy: 76,
      rank: 56,
      difficulty: 'hard',
      status: 'average',
    },
    {
      id: 6,
      testName: 'Physics - Thermodynamics',
      date: 'Jan 20, 2026',
      subject: 'Physics',
      score: 92,
      totalScore: 100,
      percentage: 92,
      timeTaken: '40/45 min',
      accuracy: 91,
      rank: 22,
      difficulty: 'medium',
      status: 'good',
    },
  ];

  // Performance over time chart data
  const performanceChartData = {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    datasets: [
      {
        label: 'Average Score',
        data: [75, 82, 85, 87, 88.5],
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Subject-wise performance data
  const subjectChartData = {
    labels: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Mixed'],
    datasets: [
      {
        label: 'Average Score',
        data: [92, 86, 84, 78, 91],
        backgroundColor: [
          'rgba(249, 115, 22, 0.9)',
          'rgba(59, 130, 246, 0.9)',
          'rgba(34, 197, 94, 0.9)',
          'rgba(168, 85, 247, 0.9)',
          'rgba(249, 115, 22, 0.7)',
        ],
        borderColor: [
          'rgba(249, 115, 22, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(249, 115, 22, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Accuracy breakdown data
  const accuracyChartData = {
    labels: ['Correct', 'Incorrect', 'Skipped'],
    datasets: [
      {
        data: [78, 15, 7],
        backgroundColor: [
          'rgba(34, 197, 94, 0.9)',
          'rgba(239, 68, 68, 0.9)',
          'rgba(148, 163, 184, 0.9)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(148, 163, 184, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Performance Trend',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 60,
        max: 100,
        title: {
          display: true,
          text: 'Score (%)',
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Subject-wise Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score (%)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Accuracy Breakdown',
      },
    },
  };

  // Filter results based on selected filters
  const filteredResults = recentResults.filter((result) => {
    const timeMatch =
      timeFilter === 'all' ||
      (timeFilter === 'recent' && result.id <= 3) ||
      (timeFilter === 'month' && result.date.includes('Feb'));
    const subjectMatch =
      subjectFilter === 'all' ||
      result.subject.toLowerCase() === subjectFilter.toLowerCase();
    return timeMatch && subjectMatch;
  });

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [timeFilter, subjectFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredResults.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPageRows = filteredResults.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'average':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
        return <FaAward className="text-green-600" />;
      case 'good':
        return <FaStar className="text-blue-600" />;
      case 'average':
        return <FaChartLine className="text-yellow-600" />;
      default:
        return <FaChartBar className="text-gray-600" />;
    }
  };

  const exportResults = () => {
    alert('Results exported successfully!');
  };

  const shareResults = () => {
    alert('Share functionality would open here');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Results & Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Track your performance, analyze strengths, and identify areas for improvement
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportResults}
            className="flex items-center px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium"
          >
            <FaDownload className="mr-2" />
            Export
          </button>
          <button
            onClick={shareResults}
            className="flex items-center px-4 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-sm"
          >
            <FaShareAlt className="mr-2" />
            Share Progress
          </button>
        </div>
      </div>

      {/* Performance Summary Cards (with left color accent + count-up) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-orange-500" />
          <div className="flex items-center mb-1.5">
            <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center mr-3">
              <FaPercent />
            </div>
            <div>
              <p className="text-xs text-gray-600">Avg. Score</p>
              <h3 className="text-xl font-bold text-gray-800">
                {avgScoreCount.toFixed(1)}%
              </h3>
            </div>
          </div>
          <div className="text-[11px] text-green-600 flex items-center">
            <FaArrowUp className="mr-1" />
            +{improvementCount.toFixed(1)}% from last month
          </div>
        </div>

        <div className="relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-blue-500" />
          <div className="flex items-center mb-1.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mr-3">
              <FaChartLine />
            </div>
            <div>
              <p className="text-xs text-gray-600">Tests Taken</p>
              <h3 className="text-xl font-bold text-gray-800">
                {testsCompletedCount}/{totalTestsCount}
              </h3>
            </div>
          </div>
          <div className="text-[11px] text-gray-600">75% completion rate</div>
        </div>

        <div className="relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-green-500" />
          <div className="flex items-center mb-1.5">
            <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center mr-3">
              <FaTrophy />
            </div>
            <div>
              <p className="text-xs text-gray-600">National Rank</p>
              <h3 className="text-xl font-bold text-gray-800">
                #{rankCount.toFixed(0)}
              </h3>
            </div>
          </div>
          <div className="text-[11px] text-gray-600">
            Top {percentileCount.toFixed(0)}%
          </div>
        </div>

        <div className="relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-purple-500" />
          <div className="flex items-center mb-1.5">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mr-3">
              <FaMedal />
            </div>
            <div>
              <p className="text-xs text-gray-600">Best Score</p>
              <h3 className="text-xl font-bold text-gray-800">
                {bestScoreCount.toFixed(0)}%
              </h3>
            </div>
          </div>
          <div className="text-[11px] text-gray-600">Physics - Mechanics</div>
        </div>

        <div className="relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-yellow-500" />
          <div className="flex items-center mb-1.5">
            <div className="w-10 h-10 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center mr-3">
              <FaClock />
            </div>
            <div>
              <p className="text-xs text-gray-600">Avg. Time</p>
              <h3 className="text-xl font-bold text-gray-800">
                {avgTimeCount.toFixed(0)} min
              </h3>
            </div>
          </div>
          <div className="text-[11px] text-gray-600">Per test</div>
        </div>

        <div className="relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-red-500" />
          <div className="flex items-center mb-1.5">
            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mr-3">
              <FaChartBar />
            </div>
            <div>
              <p className="text-xs text-gray-600">Accuracy</p>
              <h3 className="text-xl font-bold text-gray-800">
                {accuracyCount.toFixed(0)}%
              </h3>
            </div>
          </div>
          <div className="text-[11px] text-gray-600">Question-wise</div>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center">
            <FaFilter className="text-gray-500 mr-2" />
            <span className="font-medium text-gray-700 text-sm">
              Filter Results:
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              className="border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="recent">Recent (Last 7 days)</option>
              <option value="month">This Month</option>
              <option value="quarter">Last 3 Months</option>
            </select>

            <select
              className="border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="all">All Subjects</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
              <option value="mathematics">Mathematics</option>
              <option value="mixed">Mixed</option>
            </select>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden text-xs md:text-sm">
              <button
                className={`px-3.5 py-2 font-medium ${
                  viewMode === 'detailed'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700'
                }`}
                onClick={() => setViewMode('detailed')}
              >
                Detailed View
              </button>
              <button
                className={`px-3.5 py-2 font-medium ${
                  viewMode === 'summary'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700'
                }`}
                onClick={() => setViewMode('summary')}
              >
                Summary View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Trend Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 lg:col-span-2">
          <div className="h-64">
            <Line data={performanceChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Accuracy Breakdown Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="h-64">
            <Doughnut data={accuracyChartData} options={doughnutOptions} />
          </div>
        </div>

        {/* Subject-wise Performance Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 lg:col-span-3">
          <div className="h-64">
            <Bar data={subjectChartData} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* Recent Results Table – 3 rows per page + pagination */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Test Results
            </h3>
            <p className="text-sm text-gray-600">
              Showing {currentPageRows.length} of {filteredResults.length} tests
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-xs md:text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  Test
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  Date
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  Score
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  Accuracy
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  Time
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  Rank
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  Status
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentPageRows.map((result, idx) => (
                <tr
                  key={result.id}
                  className={`transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
                  } hover:bg-orange-50`}
                >
                  {/* Test name + subject */}
                  <td className="px-4 py-3 align-middle">
                    <div>
                      <div className="font-semibold text-gray-800 text-sm leading-snug">
                        {result.testName}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {result.subject}
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 align-middle">
                    <div className="flex items-center text-xs text-gray-700">
                      <FaCalendarAlt className="mr-1.5 text-gray-400" />
                      <span>{result.date}</span>
                    </div>
                  </td>

                  {/* Score */}
                  <td className="px-4 py-3 align-middle">
                    <div className="space-y-0.5">
                      <div className="text-sm font-bold text-gray-800">
                        {result.score}/{result.totalScore}
                      </div>
                      <div className="text-xs font-semibold text-orange-500">
                        {result.percentage}%
                      </div>
                    </div>
                  </td>

                  {/* Accuracy bar */}
                  <td className="px-4 py-3 align-middle">
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-1.5 mr-2">
                        <div
                          className="h-1.5 rounded-full bg-green-500"
                          style={{ width: `${result.accuracy}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">
                        {result.accuracy}%
                      </span>
                    </div>
                  </td>

                  {/* Time */}
                  <td className="px-4 py-3 align-middle">
                    <div className="text-xs text-gray-700">
                      {result.timeTaken}
                    </div>
                  </td>

                  {/* Rank */}
                  <td className="px-4 py-3 align-middle">
                    <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-yellow-50 text-[11px] text-yellow-700 font-semibold">
                      <FaMedal className="mr-1" />
                      #{result.rank}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 align-middle">
                    <div
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${getStatusColor(
                        result.status,
                      )}`}
                    >
                      {getStatusIcon(result.status)}
                      <span className="ml-1.5 capitalize">
                        {result.status}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 align-middle text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                        onClick={() =>
                          alert(
                            `Viewing detailed analysis for ${result.testName}`,
                          )
                        }
                      >
                        <FaEye size={14} />
                      </button>
                      <button
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() =>
                          alert(
                            `Downloading report for ${result.testName}`,
                          )
                        }
                      >
                        <FaDownload size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-xs md:text-sm">
          <div className="text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={`px-3 py-1.5 rounded-lg border text-xs md:text-sm ${
                currentPage === 1
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              className={`px-3 py-1.5 rounded-lg border text-xs md:text-sm ${
                currentPage === totalPages
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaChartLine className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
            <FaAward className="mr-2" />
            Your Strengths
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-green-700">
                Excellent in Physics (92% average)
              </span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-green-700">
                Strong time management skills
              </span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-green-700">
                Consistent improvement trend
              </span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-green-700">
                High accuracy in conceptual questions
              </span>
            </li>
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <FaChartLine className="mr-2" />
            Areas for Improvement
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-blue-700">
                Mathematics scores need improvement (78% average)
              </span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-blue-700">
                Work on organic chemistry reactions
              </span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-blue-700">
                Increase speed in calculation-based problems
              </span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-blue-700">
                Practice more advanced biology concepts
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          📈 Recommended Next Steps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-2">
              Focus on Mathematics
            </h4>
            <p className="text-gray-600 mb-3">
              Complete 3 calculus practice tests this week.
            </p>
            <button className="text-orange-500 text-sm font-semibold">
              Start Practice →
            </button>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-2">
              Review Weak Topics
            </h4>
            <p className="text-gray-600 mb-3">
              Organic chemistry & thermodynamics revision.
            </p>
            <button className="text-orange-500 text-sm font-semibold">
              View Materials →
            </button>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-2">Mock Test</h4>
            <p className="text-gray-600 mb-3">
              Take full NSO mock test to assess overall progress.
            </p>
            <button className="text-orange-500 text-sm font-semibold">
              Start Test →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsContent;
