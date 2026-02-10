// client/src/modules/Students/PracticeTests.jsx
import { useState, useEffect, useMemo } from "react";
import {
  FaPlay,
  FaChartLine,
  FaFlask,
  FaAtom,
  FaDna,
  FaBook,
  FaCalculator,
  FaEye,
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

  const { items: apiTests, loading, error } = useSelector(
    (state) => state.practiceTests
  );

  useEffect(() => {
    dispatch(fetchPracticeTests());
  }, [dispatch]);

  const categories = [
    { id: "all", label: "All Tests" },
    { id: "mixed", label: "Mixed" },
  ];

  const tests = useMemo(
    () =>
      apiTests
        .map((t, index) => {
          const icons = [
            <FaFlask key="flask" />,
            <FaAtom key="atom" />,
            <FaDna key="dna" />,
            <FaBook key="book" />,
            <FaCalculator key="calc" />,
            <FaChartLine key="chart" />,
          ];

          const examId = t.exam?._id;

          return {
            id: examId,
            title: t.title,
            description: t.description || "Practice test",
            category: "mixed",
            questions: t.totalQuestions || 20,
            duration: t.duration ? `${t.duration} min` : "—",
            difficulty: "medium",
            icon: icons[index % icons.length],
            taken: 0,
            rating: 0,
            isNew: index < 3,
          };
        })
        .filter((test) => !!test.id),
    [apiTests]
  );

  const filteredTests = tests.filter((test) => {
    const matchesCategory =
      activeCategory === "all" || test.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      test.title.toLowerCase().includes(q) ||
      test.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    if (difficulty === "easy") return "bg-green-100 text-green-800";
    if (difficulty === "hard") return "bg-red-100 text-red-800";
    return "bg-yellow-100 text-yellow-800";
  };

  const startTest = (testId) => {
    navigate(`/practice-tests/${testId}`);
  };

  const startRandomTest = () => {
    if (!tests.length) return;
    const randomTest = tests[Math.floor(Math.random() * tests.length)];
    navigate(`/practice-tests/${randomTest.id}`);
  };

  const viewDetails = () => {
    alert("Details page coming soon 🙂");
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p>Loading practice tests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Practice Tests
          </h1>
          <p className="text-gray-600">
            Attempt tests and improve your performance
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex border rounded-lg overflow-hidden text-sm">
            <button
              className={`px-3 py-2 ${
                viewType === "card"
                  ? "bg-orange-500 text-white"
                  : "bg-white"
              }`}
              onClick={() => setViewType("card")}
            >
              Cards
            </button>
            <button
              className={`px-3 py-2 ${
                viewType === "table"
                  ? "bg-orange-500 text-white"
                  : "bg-white"
              }`}
              onClick={() => setViewType("table")}
            >
              Table
            </button>
          </div>

          <button
            onClick={startRandomTest}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold"
          >
            <FaPlay className="inline mr-2" />
            Random Test
          </button>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search tests..."
        className="w-full px-4 py-2 border rounded-lg"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Cards View */}
      {viewType === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-lg shadow border p-4"
            >
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="text-orange-500">{test.icon}</div>
                  <h3 className="font-semibold">{test.title}</h3>
                </div>
                {test.isNew && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 rounded-full">
                    NEW
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-3">
                {test.description}
              </p>

              <div className="flex justify-between text-sm mb-3">
                <span>{test.questions} Qs</span>
                <span>{test.duration}</span>
              </div>

              <span
                className={`inline-block text-xs px-2 py-1 rounded-full mb-3 ${getDifficultyColor(
                  test.difficulty
                )}`}
              >
                {test.difficulty}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => startTest(test.id)}
                  className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm"
                >
                  <FaPlay className="inline mr-2" />
                  Start
                </button>
                <button
                  onClick={viewDetails}
                  className="px-3 border rounded-lg text-sm"
                >
                  <FaEye />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewType === "table" && (
        <div className="bg-white rounded-lg border overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Test</th>
                <th className="px-4 py-3 text-center">Questions</th>
                <th className="px-4 py-3 text-center">Duration</th>
                <th className="px-4 py-3 text-center">Difficulty</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.map((test) => (
                <tr key={test.id} className="border-t">
                  <td className="px-4 py-3">{test.title}</td>
                  <td className="px-4 py-3 text-center">
                    {test.questions}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {test.duration}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {test.difficulty}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => startTest(test.id)}
                      className="bg-orange-500 text-white px-3 py-1 rounded text-xs"
                    >
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
        <div className="text-center py-10 text-gray-500">
          No tests found
        </div>
      )}
    </div>
  );
};

export default PracticeTestsContent;
