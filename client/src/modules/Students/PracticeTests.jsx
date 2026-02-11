import { useState, useEffect, useMemo } from "react";
import {
  FaPlay, FaChartLine, FaFlask, FaAtom, FaDna, FaBook, FaCalculator, FaEye,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchPracticeTests } from "../../redux/thunks/practiceTestThunk";
import { useNavigate } from "react-router-dom";

const PracticeTestsContent = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState("card");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: apiTests, loading, error } = useSelector((state) => state.practiceTests);

  useEffect(() => {
    dispatch(fetchPracticeTests());
  }, [dispatch]);

  const categories = [
    { id: "all", label: "All Tests" },
    { id: "mixed", label: "Mixed" },
  ];

  // 🔥 FIXED: SHOW ALL 3 TESTS USING _id (NO DUPLICATE REMOVAL)
  const tests = useMemo(() => {
    console.log("🔍 RAW API TESTS (3 items):", apiTests.map(t => ({
      _id: t._id?.slice(-8),
      title: t.title,
      examCode: t.examCode || t.exam?.examCode
    })));

    return apiTests.map((t, index) => {
      const examCode = t.examCode || t.exam?.examCode;
      
      return {
        key: t._id,                           // ✅ MONGO _id = ALWAYS UNIQUE
        id: t._id,                            // ✅ Use _id for navigation
        examCode: examCode || t._id.slice(0,8), // ✅ Fallback examCode
        title: t.title || `Test ${index + 1}`,
        description: t.description || `Practice test ${index + 1}`,
        category: "mixed",
        questions: t.totalQuestions || 20,
        duration: t.duration ? `${t.duration} min` : "—",
        difficulty: "medium",
        index: index,                         // For icons
        taken: 0,
        rating: 0,
        isNew: index < 3,
      };
    }).filter(test => test.id);  // Only valid tests
  }, [apiTests]);

  const filteredTests = tests.filter((test) => {
    const matchesCategory = activeCategory === "all" || test.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = test.title.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    if (difficulty === "easy") return "bg-green-100 text-green-800";
    if (difficulty === "hard") return "bg-red-100 text-red-800";
    return "bg-[#FFEDD5] text-[#9A3412]";
  };

  const getTestIcon = (index) => {
    const icons = [FaFlask, FaAtom, FaDna, FaBook, FaCalculator, FaChartLine];
    const Icon = icons[index % icons.length];
    return <Icon className="text-lg" />;
  };

  // 🔥 FIXED: Navigate with _id (WORKS FOR ALL TESTS)
  const startTest = (testId) => {
    console.log("🚀 Starting test with testId (_id):", testId.slice(-8));
    // Route must match AppRoutes: /student/practice-tests/:id
    navigate(`/student/practice-tests/${testId}`);
  };

  const startRandomTest = () => {
    if (!tests.length) return;
    const randomTest = tests[Math.floor(Math.random() * tests.length)];
    startTest(randomTest.id);
  };

  const viewDetails = () => {
    alert("Details page coming soon 🙂");
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FFCD2C] mx-auto mb-3"></div>
        <p className="text-gray-700 text-sm">Loading practice tests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">{error}</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Practice Tests</h1>
          <p className="text-sm text-gray-600">All available tests ({tests.length} total)</p>
        </div>
        <div className="flex gap-2 md:gap-3 items-center">
          <div className="flex border border-[#FFE6A3] rounded-lg overflow-hidden text-[11px] bg-white">
            <button className={`px-2.5 py-1.5 md:px-3 md:py-1.5 leading-none transition ${
              viewType === "card" ? "bg-gradient-to-r from-[#FFCD2C] to-[#E0AC00] text-gray-900 font-semibold" : "text-gray-700 hover:bg-[#FFF9E6]"
            }`} onClick={() => setViewType("card")}>
              Cards
            </button>
            <button className={`px-2.5 py-1.5 md:px-3 md:py-1.5 leading-none transition ${
              viewType === "table" ? "bg-gradient-to-r from-[#FFCD2C] to-[#E0AC00] text-gray-900 font-semibold" : "text-gray-700 hover:bg-[#FFF9E6]"
            }`} onClick={() => setViewType("table")}>
              Table
            </button>
          </div>
          {tests.length > 0 && (
            <button onClick={startRandomTest} className="px-3 md:px-3.5 py-1.5 bg-gradient-to-r from-[#FFCD2C] to-[#E0AC00] text-gray-900 rounded-lg text-xs md:text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition inline-flex items-center">
              <FaPlay className="mr-1.5 text-[10px]" /> Random Test
            </button>
          )}
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-1.5 md:gap-2 flex-wrap">
        {categories.map((c) => (
          <button key={c.id} onClick={() => setActiveCategory(c.id)} className={`px-2.5 md:px-3 py-1.5 rounded-full text-[11px] font-medium border transition ${
            activeCategory === c.id ? "bg-[#FFEBB5] border-[#FFDF85] text-gray-900" : "bg-white border-[#FFE6A3] text-gray-600 hover:bg-[#FFF9E6]"
          }`}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search tests..."
        className="w-full px-3.5 py-2 border border-[#FFE6A3] rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFCD2C]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Cards View - SHOW ALL 3 TESTS */}
      {viewType === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredTests.map((test) => (
            <div key={test.key} className="bg-white/95 rounded-2xl shadow-md border border-[#FFE6A3] p-3.5 hover:shadow-lg hover:-translate-y-0.5 transition">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="text-[#EA580C] bg-[#FFEDD5] rounded-lg p-1.5 text-sm">
                    {getTestIcon(test.index)}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                    {test.title}
                  </h3>
                </div>
                {test.isNew && (
                  <span className="text-[9px] bg-[#FFEBB5] text-[#9A3412] px-1.5 py-0.5 rounded-full uppercase tracking-wide">NEW</span>
                )}
              </div>

              <p className="text-xs text-gray-600 mb-2.5 line-clamp-2">{test.description}</p>

              <div className="flex justify-between text-[11px] mb-2.5 text-gray-700">
                <span>{test.questions} Qs</span>
                <span>{test.duration}</span>
              </div>

              <span className={`inline-block text-[10px] px-2 py-1 rounded-full mb-2 capitalize ${getDifficultyColor(test.difficulty)}`}>
                {test.difficulty}
              </span>

              <div className="flex gap-1.5 mt-1">
                <button
                  onClick={() => startTest(test.id)}
                  className="flex-1 bg-gradient-to-r from-[#FFCD2C] to-[#E0AC00] text-gray-900 py-1.5 rounded-lg text-xs font-semibold shadow hover:shadow-md transition inline-flex items-center justify-center"
                >
                  <FaPlay className="mr-1 text-[9px]" /> Start
                </button>
                <button
                  onClick={viewDetails}
                  className="px-2.5 py-1.5 border border-[#FFE6A3] rounded-lg text-xs text-gray-700 bg-[#FFF9E6] hover:bg-[#FFEBD0] transition flex items-center justify-center"
                >
                  <FaEye className="text-[11px]" />
                </button>
              </div>

              {/* 🔥 DEBUG: Show exact IDs */}
              <div className="mt-2 pt-2 border-t border-[#FFE6A3]/50 text-[10px] text-gray-500 bg-gray-50/50 p-1.5 rounded">
                ID: {test.id?.slice(-8)} | Code: {test.examCode?.slice(0,8)}...
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewType === "table" && (
        <div className="bg-white/95 rounded-2xl border border-[#FFE6A3] overflow-x-auto shadow-md">
          <table className="min-w-full text-xs md:text-sm">
            <thead className="bg-[#FFF9E6]">
              <tr className="text-gray-700">
                <th className="px-3 md:px-4 py-2.5 text-left">Test</th>
                <th className="px-3 md:px-4 py-2.5 text-center">Questions</th>
                <th className="px-3 md:px-4 py-2.5 text-center">Duration</th>
                <th className="px-3 md:px-4 py-2.5 text-center">Difficulty</th>
                <th className="px-3 md:px-4 py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.map((test) => (
                <tr key={test.key} className="border-t border-[#FFE6A3] hover:bg-[#FFFDF5]">
                  <td className="px-3 md:px-4 py-2.5 text-gray-800">
                    <div>
                      <span className="text-xs md:text-sm font-medium block">{test.title}</span>
                      <span className="text-[10px] text-gray-500 block">ID: {test.id?.slice(-8)}</span>
                    </div>
                  </td>
                  <td className="px-3 md:px-4 py-2.5 text-center text-gray-700">{test.questions}</td>
                  <td className="px-3 md:px-4 py-2.5 text-center text-gray-700">{test.duration}</td>
                  <td className="px-3 md:px-4 py-2.5 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] capitalize ${getDifficultyColor(test.difficulty)}`}>
                      {test.difficulty}
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-2.5 text-right">
                    <button onClick={() => startTest(test.id)} className="bg-gradient-to-r from-[#FFCD2C] to-[#E0AC00] text-gray-900 px-2.5 md:px-3 py-1.5 rounded text-[10px] md:text-xs font-semibold shadow hover:shadow-md transition">
                      Start
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredTests.length === 0 && (
        <div className="text-center py-10 text-gray-500 text-sm">
          No tests found matching your search or category
        </div>
      )}
    </div>
  );
};

export default PracticeTestsContent;
