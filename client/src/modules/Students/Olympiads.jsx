// src/modules/Students/Olympiads.jsx
import { useState, useEffect } from "react";
import { FaPlus, FaFilter } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import OlympiadCard from "./OlympiadCard";
import { fetchStudentDashboard } from "../../redux/thunks/studentThunk";

const Olympiads = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.user);
  const examState = useSelector((state) => state.exam);
  const dashboard = examState?.dashboard || {};
  const dashLoading = examState?.loading;
  const dashError = examState?.error;

  const [activeCategory, setActiveCategory] = useState("All Olympiads");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (token && user && !dashboard.registrations) {
      dispatch(fetchStudentDashboard());
    }
  }, [token, user, dashboard.registrations, dispatch]);

  const registrations = dashboard.registrations || [];
  const upcomingExams = dashboard.upcomingExams || [];
  const results = dashboard.results || [];

  // Real olympiads data ko create karo:
  // - Jo exams student ne register kiye (registrations)
  // - Jo upcoming exams hai (upcomingExams)
  const olympiads = [
    // Registered exams -> Active/Completed
    ...registrations.map((reg) => {
      const exam = reg.exam || {};
      const resultForExam = results.find(
        (r) => r.exam && r.exam._id === exam._id
      );

      let status = "Active";
      if (resultForExam) status = "Completed";

      return {
        id: reg._id,
        examId: exam._id,
        title: exam.title || "Exam",
        subtitle: resultForExam
          ? "Completed • Result available"
          : "Registered • Awaiting exam",
        status, // Active/Completed
        testsCompleted: resultForExam
          ? "1/1"
          : "0/1",
        currentScore: resultForExam
          ? `${resultForExam.score}/${resultForExam.total}`
          : "Not Attempted",
        progress: resultForExam ? 100 : 20,
        color: resultForExam ? "green" : "orange",
        detailed: true,
        showRank: false,
        // future fields ke liye placeholders:
        fee: exam.price ? `₹${exam.price}` : undefined,
        showFee: !!exam.price,
        paymentStatus: reg.paymentStatus,
      };
    }),

    // Upcoming exams jisme abhi registration nahi hai -> Upcoming list
    ...upcomingExams
      .filter(
        (exam) =>
          !registrations.some(
            (reg) => reg.exam && reg.exam._id === exam._id
          )
      )
      .map((exam) => ({
        id: exam._id,
        examId: exam._id,
        title: exam.title || "Exam",
        subtitle: "Upcoming exam",
        status: "Upcoming",
        testsCompleted: "0/1",
        currentScore: "Not Started",
        progress: 0,
        color: "blue",
        detailed: true,
        showFee: !!exam.price,
        fee: exam.price ? `₹${exam.price}` : undefined,
        paymentStatus: "Not registered",
      })),
  ];

  const categories = ["All Olympiads", "Active", "Upcoming", "Completed"];

  const filteredOlympiads = olympiads.filter((olympiad) => {
    const matchesCategory =
      activeCategory === "All Olympiads" ||
      olympiad.status === activeCategory;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      olympiad.title.toLowerCase().includes(q) ||
      (olympiad.subtitle && olympiad.subtitle.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const handleRegister = () => {
    navigate("/exams"); // ya jo bhi exam listing route hai
  };

  if (!token) {
    navigate("/login");
    return null;
  }

  if (dashLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p>Loading your olympiads...</p>
      </div>
    );
  }

  if (dashError) {
    return (
      <div className="p-6 text-center text-red-600">
        {dashError}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            My Olympiads
          </h1>
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
                ? "bg-orange-500 border-orange-500 text-white"
                : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
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

      {/* Olympiads Grid */}
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
              {olympiads.filter((o) => o.status === "Active").length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {olympiads.filter((o) => o.status === "Upcoming").length}
            </div>
            <div className="text-sm text-gray-600">Upcoming</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {olympiads.filter((o) => o.status === "Completed").length}
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
