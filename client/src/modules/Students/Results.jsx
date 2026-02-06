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
  FaEye
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
  Legend
);

const ResultsContent = () => {
  const [timeFilter, setTimeFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [viewMode, setViewMode] = useState('detailed'); // 'detailed' or 'summary'

  // Performance summary data
  const performanceSummary = {
    averageScore: 88.5,
    totalTests: 24,
    testsCompleted: 18,
    improvement: 12.3,
    nationalRank: 15,
    percentile: 92,
  };

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
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
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
          'rgba(255, 152, 0, 0.8)',
          'rgba(33, 150, 243, 0.8)',
          'rgba(76, 175, 80, 0.8)',
          'rgba(156, 39, 176, 0.8)',
          'rgba(255, 87, 34, 0.8)',
        ],
        borderColor: [
          'rgba(255, 152, 0, 1)',
          'rgba(33, 150, 243, 1)',
          'rgba(76, 175, 80, 1)',
          'rgba(156, 39, 176, 1)',
          'rgba(255, 87, 34, 1)',
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
          'rgba(76, 175, 80, 0.8)',
          'rgba(244, 67, 54, 0.8)',
          'rgba(158, 158, 158, 0.8)',
        ],
        borderColor: [
          'rgba(76, 175, 80, 1)',
          'rgba(244, 67, 54, 1)',
          'rgba(158, 158, 158, 1)',
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
  const filteredResults = recentResults.filter(result => {
    const timeMatch = timeFilter === 'all' || 
      (timeFilter === 'recent' && result.id <= 3) ||
      (timeFilter === 'month' && result.date.includes('Feb'));
    
    const subjectMatch = subjectFilter === 'all' || 
      result.subject.toLowerCase() === subjectFilter.toLowerCase();
    
    return timeMatch && subjectMatch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'excellent': return <FaAward className="text-green-600" />;
      case 'good': return <FaStar className="text-blue-600" />;
      case 'average': return <FaChartLine className="text-yellow-600" />;
      default: return <FaChartBar className="text-gray-600" />;
    }
  };

  const exportResults = () => {
    alert('Results exported successfully!');
    // In real app, implement CSV/PDF export
  };

  const shareResults = () => {
    alert('Share functionality would open here');
    // In real app, implement social sharing
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Results & Analytics</h1>
          <p className="text-gray-600 mt-1">Track your performance, analyze strengths, and identify areas for improvement</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={exportResults}
            className="btn-secondary flex items-center"
          >
            <FaDownload className="mr-2" />
            Export
          </button>
          <button 
            onClick={shareResults}
            className="btn-primary flex items-center"
          >
            <FaShareAlt className="mr-2" />
            Share Progress
          </button>
        </div>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3">
              <FaPercent />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Score</p>
              <h3 className="text-xl font-bold text-gray-800">{performanceSummary.averageScore}%</h3>
            </div>
          </div>
          <div className="text-xs text-green-600 flex items-center">
            <FaArrowUp className="mr-1" />
            +{performanceSummary.improvement}% from last month
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
              <FaChartLine />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tests Taken</p>
              <h3 className="text-xl font-bold text-gray-800">{performanceSummary.testsCompleted}/{performanceSummary.totalTests}</h3>
            </div>
          </div>
          <div className="text-xs text-gray-600">75% completion rate</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mr-3">
              <FaTrophy />
            </div>
            <div>
              <p className="text-sm text-gray-600">National Rank</p>
              <h3 className="text-xl font-bold text-gray-800">#{performanceSummary.nationalRank}</h3>
            </div>
          </div>
          <div className="text-xs text-gray-600">Top {performanceSummary.percentile}%</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
              <FaMedal />
            </div>
            <div>
              <p className="text-sm text-gray-600">Best Score</p>
              <h3 className="text-xl font-bold text-gray-800">96%</h3>
            </div>
          </div>
          <div className="text-xs text-gray-600">Physics - Mechanics</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3">
              <FaClock />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Time</p>
              <h3 className="text-xl font-bold text-gray-800">42 min</h3>
            </div>
          </div>
          <div className="text-xs text-gray-600">Per test</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mr-3">
              <FaChartBar />
            </div>
            <div>
              <p className="text-sm text-gray-600">Accuracy</p>
              <h3 className="text-xl font-bold text-gray-800">87%</h3>
            </div>
          </div>
          <div className="text-xs text-gray-600">Question-wise</div>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center">
            <FaFilter className="text-gray-500 mr-2" />
            <span className="font-medium text-gray-700">Filter Results:</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="recent">Recent (Last 7 days)</option>
              <option value="month">This Month</option>
              <option value="quarter">Last 3 Months</option>
            </select>
            
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
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
            
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                className={`px-4 py-2 text-sm ${viewMode === 'detailed' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setViewMode('detailed')}
              >
                Detailed View
              </button>
              <button
                className={`px-4 py-2 text-sm ${viewMode === 'summary' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
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
        <div className="bg-white rounded-xl p-5 shadow-sm lg:col-span-2">
          <div className="h-64">
            <Line data={performanceChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Accuracy Breakdown Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="h-64">
            <Doughnut data={accuracyChartData} options={doughnutOptions} />
          </div>
        </div>

        {/* Subject-wise Performance Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm lg:col-span-3">
          <div className="h-64">
            <Bar data={subjectChartData} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* Recent Results Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Recent Test Results</h3>
          <p className="text-sm text-gray-600">Showing {filteredResults.length} of {recentResults.length} tests</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Test Name</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Score</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Accuracy</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Time</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Rank</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => (
                <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-800">{result.testName}</div>
                      <div className="text-sm text-gray-600">{result.subject}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-gray-400" />
                      <span className="text-sm">{result.date}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="text-lg font-bold text-gray-800">{result.score}/{result.totalScore}</div>
                      <div className="text-sm font-semibold text-primary">{result.percentage}%</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="h-2 rounded-full bg-green-500" 
                          style={{ width: `${result.accuracy}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{result.accuracy}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-700">{result.timeTaken}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <FaMedal className="mr-2 text-yellow-500" />
                      <span className="font-semibold">#{result.rank}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                      {getStatusIcon(result.status)}
                      <span className="ml-2 capitalize">{result.status}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button 
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        onClick={() => alert(`Viewing detailed analysis for ${result.testName}`)}
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => alert(`Downloading report for ${result.testName}`)}
                      >
                        <FaDownload />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaChartLine className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No results found</h3>
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
          <ul className="space-y-3">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-green-700">Excellent in Physics (92% average)</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-green-700">Strong time management skills</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-green-700">Consistent improvement trend</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-green-700">High accuracy in conceptual questions</span>
            </li>
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <FaChartLine className="mr-2" />
            Areas for Improvement
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-blue-700">Mathematics scores need improvement (78% average)</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-blue-700">Work on organic chemistry reactions</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-blue-700">Increase speed in calculation-based problems</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-blue-700">Practice more advanced biology concepts</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 Recommended Next Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Focus on Mathematics</h4>
            <p className="text-sm text-gray-600 mb-3">Complete 3 calculus practice tests this week</p>
            <button className="text-primary text-sm font-semibold">Start Practice →</button>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Review Weak Topics</h4>
            <p className="text-sm text-gray-600 mb-3">Organic chemistry & thermodynamics revision</p>
            <button className="text-primary text-sm font-semibold">View Materials →</button>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Mock Test</h4>
            <p className="text-sm text-gray-600 mb-3">Take full NSO mock test to assess overall progress</p>
            <button className="text-primary text-sm font-semibold">Start Test →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsContent;