// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  FaTrophy,
  FaClock,
  FaChartLine,
  FaCalendarCheck,
  FaBook,
  FaVideo,
  FaFileAlt,
  FaChartBar,
  FaFlask,
  FaAtom,
  FaDna,
  FaAward,
  FaStar,
  FaPlayCircle,
  FaCalendar,
  FaDownload,
  FaHeadset,
} from "react-icons/fa";

/* ---------- Small UI components ---------- */

const StatCard = ({ title, value, icon, color = "primary" }) => {
  const colorClasses = {
    primary: "bg-orange-100 text-orange-600",
    success: "bg-green-100 text-green-600",
    info: "bg-blue-100 text-blue-600",
    warning: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center text-lg`}
        >
          {icon}
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 leading-tight">
            {value}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 leading-snug">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

const OlympiadCard = ({
  title,
  subtitle,
  status,
  testsCompleted,
  currentScore,
  progress,
  color = "from-orange-500 to-orange-600",
}) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500";
      case "upcoming":
        return "bg-yellow-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className={`bg-gradient-to-r ${color} text-white px-4 py-3`}>
        <div className="flex justify-between items-start gap-3">
          <div className="flex flex-col">
            <h4 className="text-base font-semibold leading-tight">{title}</h4>
            <p className="text-xs opacity-90 mt-1">{subtitle}</p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 bg-white/20">
            <span
              className={`inline-block w-2 h-2 rounded-full ${getStatusColor(
                status
              )}`}
            ></span>
            {status}
          </span>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm py-1 border-b border-gray-100">
            <span className="text-gray-600">Tests Completed</span>
            <span className="font-semibold text-gray-800">
              {testsCompleted}
            </span>
          </div>

          <div className="flex justify-between text-sm py-1">
            <span className="text-gray-600">Current Score</span>
            <span className="font-semibold text-gray-800">
              {currentScore}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold text-gray-800">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-700"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <button className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg text-sm transition-colors duration-200">
          {status === "Active" ? "Continue" : "View Details"}
        </button>
      </div>
    </div>
  );
};

/* ---------- Main Dashboard Component ---------- */

const Dashboard = () => {
  const [profile, setProfile] = useState(null); // real backend user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Redux se token lo (store me: user: userReducer)
  const { token } = useSelector((state) => state.user);

  // Static demo data (UI ke liye, backend se related nahi)
  const stats = [
    {
      id: 1,
      title: "Active Olympiads",
      value: "3",
      icon: <FaTrophy />,
      color: "primary",
    },
    {
      id: 2,
      title: "Study Time This Week",
      value: "24h",
      icon: <FaClock />,
      color: "success",
    },
    {
      id: 3,
      title: "Performance Improvement",
      value: "+12%",
      icon: <FaChartLine />,
      color: "info",
    },
    {
      id: 4,
      title: "Upcoming Deadlines",
      value: "2",
      icon: <FaCalendarCheck />,
      color: "warning",
    },
  ];

  const olympiads = [
    {
      id: 1,
      title: "NSO 2026 - National Round",
      subtitle: "Ends: March 30, 2026",
      status: "Active",
      testsCompleted: "3/5",
      currentScore: "275/300",
      progress: 60,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 2,
      title: "Physics Olympiad 2026",
      subtitle: "Starts: April 10, 2026",
      status: "Upcoming",
      testsCompleted: "0/4",
      currentScore: "Not Started",
      progress: 0,
      color: "from-blue-500 to-blue-600",
    },
  ];

  const resources = [
    {
      id: 1,
      title: "Physics Textbook",
      description: "Advanced concepts and practice problems",
      icon: <FaBook />,
    },
    {
      id: 2,
      title: "Video Lectures",
      description: "50+ hours of expert instruction",
      icon: <FaVideo />,
    },
    {
      id: 3,
      title: "Practice Papers",
      description: "Previous years question papers",
      icon: <FaFileAlt />,
    },
    {
      id: 4,
      title: "Analytics Report",
      description: "Your performance analysis",
      icon: <FaChartBar />,
    },
  ];

  const upcomingTests = [
    {
      id: 1,
      title: "Chemistry - Organic Compounds",
      subtitle: "NSO 2026 • Test #4",
      time: "Feb 9, 10:00 AM",
      icon: <FaFlask />,
    },
    {
      id: 2,
      title: "Physics - Thermodynamics",
      subtitle: "NSO 2026 • Test #5",
      time: "Feb 11, 2:00 PM",
      icon: <FaAtom />,
    },
    {
      id: 3,
      title: "Biology - Genetics",
      subtitle: "Practice Test",
      time: "Feb 12, 11:00 AM",
      icon: <FaDna />,
    },
  ];

  const recentResults = [
    {
      id: 1,
      title: "Physics - Mechanics",
      subtitle: "NSO 2026 • Feb 3, 2026",
      score: "96%",
      icon: <FaAward />,
      color: "bg-green-500",
    },
    {
      id: 2,
      title: "Chemistry - Stoichiometry",
      subtitle: "NSO 2026 • Jan 28, 2026",
      score: "88%",
      icon: <FaStar />,
      color: "bg-blue-500",
    },
    {
      id: 3,
      title: "Biology - Cell Biology",
      subtitle: "NSO 2026 • Jan 21, 2026",
      score: "82%",
      icon: <FaChartLine />,
      color: "bg-yellow-500",
    },
  ];

  // user ko leaderboard me highlight karne ke liye
  const leaderboardData = profile
    ? [
        { rank: 1, name: "Alex Johnson", initials: "AJ", score: 295, highlight: false },
        { rank: 2, name: "Michael Chen", initials: "MC", score: 290, highlight: false },
        { rank: 3, name: "Emma Wilson", initials: "EW", score: 288, highlight: false },
        {
          rank: 15,
          name: profile.name,
          initials:
            profile.name[0] +
            (profile.name.split(" ")[1]?.[0] || ""),
          score: 275,
          highlight: true,
        },
      ]
    : [];

  const quickActions = [
    {
      id: 1,
      title: "Start Practice Test",
      description: "Take a timed practice test",
      icon: <FaPlayCircle />,
    },
    {
      id: 2,
      title: "View Study Plan",
      description: "Your personalized schedule",
      icon: <FaCalendar />,
    },
    {
      id: 3,
      title: "Download Materials",
      description: "Get study materials offline",
      icon: <FaDownload />,
    },
    {
      id: 4,
      title: "Get Help",
      description: "Contact support or mentor",
      icon: <FaHeadset />,
    },
  ];

  // REAL backend data fetch
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const t = token || localStorage.getItem("token");
        if (!t) {
          setProfile(null);
          setError("Token missing. Please login again.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${t}`,
            },
          }
        );

        // backend getUserProfile response:
        // { _id, name, username, email, role, createdAt, updatedAt }
        setProfile(res.data);
        setError("");
      } catch (err) {
        console.error("Profile fetch error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to load profile");
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6 text-center text-red-600">
        {error || "Please login to view dashboard"}
      </div>
    );
  }

  const user = profile;

  return (
    <div className="space-y-5 p-4 md:p-5 lg:p-6">
      {/* Welcome Banner - REAL BACKEND USER */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-2xl px-5 py-5 md:px-6 md:py-6 shadow-md">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-1">
              Welcome back, {user.name}! 👋
            </h2>
            <p className="text-sm md:text-base text-white/90 max-w-xl">
              Username:{" "}
              <span className="font-semibold">
                {user.username}
              </span>{" "}
              | Role: {user.role}
            </p>
            <p className="text-xs text-white/80 mt-1">
              Member since: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex space-x-6">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold">
                #{Math.floor(Math.random() * 100) + 1}
              </h3>
              <p className="text-xs md:text-sm opacity-90">Rank</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold">
                {user._id.slice(-4)}
              </h3>
              <p className="text-xs md:text-sm opacity-90">User ID</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* My Olympiads */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">My Olympiads</h3>
              <span className="text-xs md:text-sm text-gray-600">
                Active Registrations
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {olympiads.map((olympiad) => (
                <OlympiadCard key={olympiad.id} {...olympiad} />
              ))}
            </div>
          </div>

          {/* Study Resources + Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">
                Study Resources
              </h3>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-1.5 px-3 rounded-lg text-xs md:text-sm transition-colors">
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex flex-col h-full bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-sm text-white">
                        {resource.icon}
                      </div>
                      <h4 className="text-sm font-semibold text-white leading-tight">
                        {resource.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col p-4 text-xs md:text-sm">
                    <p className="text-gray-700 mb-3 leading-snug">
                      {resource.description}
                    </p>

                    <div className="flex-1" />

                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                      <button
                        className="flex-1 inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 py-2 text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => alert(`Viewing ${resource.title}`)}
                      >
                        View
                      </button>
                      <button
                        className="flex-1 inline-flex items-center justify-center rounded-lg bg-blue-500 px-3 py-2 text-xs md:text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
                        onClick={() => alert(`Reading ${resource.title}`)}
                      >
                        Read
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="text-sm font-semibold text-gray-800 mb-3">
              Quick Actions
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <div
                  key={action.id}
                  className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-3 flex items-start gap-3 hover:bg-orange-50 transition-colors cursor-pointer"
                  onClick={() => alert(`Action: ${action.title}`)}
                >
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm mt-0.5">
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 leading-snug">
                      {action.title}
                    </p>
                    <p className="text-xs text-gray-600 leading-snug">
                      {action.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Upcoming Tests */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">
                Upcoming Tests
              </h3>
              <span className="text-xs md:text-sm text-gray-600">
                Next 7 Days
              </span>
            </div>
            <div className="space-y-3">
              {upcomingTests.map((test) => (
                <div
                  key={test.id}
                  className="flex items-center p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mr-3">
                    {test.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-gray-800 leading-tight">
                      {test.title}
                    </h4>
                    <p className="text-xs text-gray-600">{test.subtitle}</p>
                  </div>
                  <div className="text-xs font-semibold text-orange-600">
                    {test.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Results */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">
                Recent Results
              </h3>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-1.5 px-3 rounded-lg text-xs md:text-sm transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${result.color} text-white flex items-center justify-center mr-3`}
                  >
                    {result.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-gray-800 leading-tight">
                      {result.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {result.subtitle}
                    </p>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {result.score}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">
                National Leaderboard
              </h3>
              <span className="text-xs md:text-sm text-gray-600">
                NSO 2026
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left pb-2 text-gray-600 font-semibold">
                      Rank
                    </th>
                    <th className="text-left pb-2 text-gray-600 font-semibold">
                      Student
                    </th>
                    <th className="text-left pb-2 text-gray-600 font-semibold">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((student) => (
                    <tr
                      key={student.rank}
                      className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        student.highlight ? "bg-orange-50" : ""
                      }`}
                    >
                      <td className="py-2.5">
                        <span
                          className={`font-bold ${
                            student.rank <= 3
                              ? "text-yellow-500"
                              : "text-orange-500"
                          }`}
                        >
                          {student.rank}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center mr-2.5 ${
                              student.highlight
                                ? "bg-orange-500 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {student.initials}
                          </div>
                          <span
                            className={
                              student.highlight ? "font-semibold" : ""
                            }
                          >
                            {student.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            student.score >= 290
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
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
    </div>
  );
};

export default Dashboard;
