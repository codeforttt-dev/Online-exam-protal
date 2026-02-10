// client/src/pages/PracticeTestExamPage.jsx
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const CONFIDENCE_OPTS = [
  { value: "full", label: "Full Confidence" },
  { value: "middle", label: "Middle Confidence" },
  { value: "low", label: "Low Confidence" },
];

export default function PracticeTestExamPage() {
  const { id: examId } = useParams();
  const navigate = useNavigate();

  const [fixedQuestions, setFixedQuestions] = useState([]);
  const [xQuestion, setXQuestion] = useState(null);
  const [branchQuestions, setBranchQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/practice-tests/start/${examId}`);
        if (!data?.success) throw new Error("Failed to load questions");
        if (!cancelled) {
          setFixedQuestions(data.data.fixedQuestions || []);
          setXQuestion(data.data.xQuestion || null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e.response?.data?.message || e.message || "Could not load test"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [examId]);

  const allQuestions = useMemo(() => {
    const list = [...fixedQuestions];
    if (xQuestion) list.push(xQuestion);
    if (branchQuestions.length) list.push(...branchQuestions);
    return list.sort((a, b) => a.questionNumber - b.questionNumber);
  }, [fixedQuestions, xQuestion, branchQuestions]);

  const currentQuestion = allQuestions[currentIndex] || null;
  const aid = currentQuestion
    ? answers[currentQuestion.questionNumber]
    : undefined;

  const updateAnswer = (questionNumber, payload) => {
    setAnswers((prev) => ({
      ...prev,
      [questionNumber]: { ...prev[questionNumber], ...payload },
    }));
  };

  const markSkipped = () => {
    if (!currentQuestion) return;
    updateAnswer(currentQuestion.questionNumber, {
      status: "skipped",
      selectedAnswer: null,
      selectedAnswers: [],
      confidence: null,
    });
  };

  const handleOptionClick = (q, optionKey) => {
    if (!q) return;

    if (
      q.type === "simple" ||
      q.type === "confidence" ||
      q.type === "branch_parent" ||
      q.type === "branch_child"
    ) {
      updateAnswer(q.questionNumber, {
        status: "attempted",
        selectedAnswer: optionKey,
        selectedAnswers: [],
        confidence:
          q.type === "confidence"
            ? answers[q.questionNumber]?.confidence || "middle"
            : null,
      });

      if (q.type === "branch_parent") {
        loadBranchQuestions(optionKey);
      }
    }

    if (q.type === "multiple") {
      const prev = answers[q.questionNumber]?.selectedAnswers || [];
      const next = prev.includes(optionKey)
        ? prev.filter((x) => x !== optionKey)
        : [...prev, optionKey];

      updateAnswer(q.questionNumber, {
        status: "attempted",
        selectedAnswer: null,
        selectedAnswers: next,
        confidence: null,
      });
    }
  };

  const handleConfidenceSelect = (q, level) => {
    if (!q || q.type !== "confidence") return;
    if (!answers[q.questionNumber]?.selectedAnswer) return;

    updateAnswer(q.questionNumber, {
      confidence: level,
      status: "attempted",
    });
  };

  const loadBranchQuestions = async (choice) => {
    try {
      const { data } = await API.get(
        `/practice-tests/branch/${examId}/${choice}`
      );
      if (data?.success) {
        setBranchQuestions(data.data || []);
      }
    } catch (e) {
      console.error("loadBranchQuestions error", e);
    }
  };

  const handleSubmit = async () => {
    try {
      const payloadAnswers = allQuestions.map((q) => {
        const a = answers[q.questionNumber] || {};
        return {
          questionNumber: q.questionNumber,
          status: a.status || "skipped",
          selectedAnswer: a.selectedAnswer || null,
          selectedAnswers: a.selectedAnswers || [],
          confidence: a.confidence || null,
        };
      });

      const { data } = await API.post("/practice-tests/submit", {
        examId,
        answers: payloadAnswers,
      });

      if (data.success) {
        alert(`Test submitted! Total Marks: ${data.totalMarks}`);
        navigate("/dashboard");
      }
    } catch (e) {
      console.error("submit error", e);
      setError(e.response?.data?.message || "Submit failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading test...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!allQuestions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No questions found for this test.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">Practice Test</h1>
            <p className="text-sm text-gray-600">
              Question {currentIndex + 1} of {allQuestions.length}
            </p>
          </div>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm"
          >
            Submit Test
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-5 mb-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="font-semibold">
                Q{currentIndex + 1}. {currentQuestion?.questionText}
              </h2>
              <p className="text-xs text-gray-500">
                {currentQuestion?.type === "simple" &&
                  "Single correct question"}
                {currentQuestion?.type === "multiple" &&
                  "Multiple correct question (select one or more)"}
                {currentQuestion?.type === "confidence" &&
                  "Confidence based question"}
                {currentQuestion?.type === "branch_parent" &&
                  "Branching question - decides next set of questions"}
                {currentQuestion?.type === "branch_child" &&
                  "Branch question from your chosen path"}
              </p>
            </div>
            <div className="text-xs text-gray-500">
              Type: {currentQuestion?.type}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {(currentQuestion?.options || []).map((opt) => {
              const isSelectedSingle =
                aid?.selectedAnswer === opt.key &&
                currentQuestion.type !== "multiple";
              const selectedMulti = aid?.selectedAnswers || [];
              const isSelectedMulti =
                currentQuestion.type === "multiple" &&
                selectedMulti.includes(opt.key);
              const isSelected = isSelectedSingle || isSelectedMulti;

              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleOptionClick(currentQuestion, opt.key)}
                  className={`w-full text-left px-3 py-2 border rounded-lg text-sm ${
                    isSelected
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-200 hover:border-amber-400"
                  }`}
                >
                  <span className="font-semibold mr-2">{opt.key}.</span>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {currentQuestion?.type === "confidence" && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">
                Confidence Level
              </h3>
              <div className="flex gap-2">
                {CONFIDENCE_OPTS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() =>
                      handleConfidenceSelect(currentQuestion, c.value)
                    }
                    className={`px-3 py-1.5 text-xs rounded-full border ${
                      aid?.confidence === c.value
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Low: +0.25 / -0.10, Middle: +1 / -0.25, Full: +2 / -0.50
              </p>
            </div>
          )}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={markSkipped}
              className="px-3 py-1.5 text-xs rounded bg-amber-100 text-amber-800"
            >
              Skip
            </button>
            <div className="flex gap-2">
              {currentIndex > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((idx) => Math.max(0, idx - 1))
                  }
                  className="px-3 py-1.5 text-xs rounded bg-gray-100"
                >
                  Previous
                </button>
              )}
              {currentIndex < allQuestions.length - 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((idx) =>
                      Math.min(allQuestions.length - 1, idx + 1)
                    )
                  }
                  className="px-3 py-1.5 text-xs rounded bg-amber-500 text-white"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-xs">
          <div className="flex gap-4">
            <span>
              Attempted:{" "}
              {
                Object.values(answers).filter(
                  (a) => a.status === "attempted"
                ).length
              }
            </span>
            <span>
              Skipped:{" "}
              {
                Object.values(answers).filter(
                  (a) => a.status === "skipped"
                ).length
              }
            </span>
            <span>Total: {allQuestions.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
