import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const CONFIDENCE_OPTS = [
  { value: "full", label: "Full Confidence" },
  { value: "middle", label: "Medium Confidence" },
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
        // Aage chalke yahan modal ya result page dikha sakte ho
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
          <p className="text-sm text-slate-600">Loading your practice test...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white border border-red-200 rounded-xl px-6 py-4 shadow-sm">
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-3 text-xs text-slate-600 underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (!allQuestions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-600">No questions found for this test.</p>
      </div>
    );
  }

  const attemptedCount = Object.values(answers).filter(
    (a) => a.status === "attempted"
  ).length;
  const skippedCount = Object.values(answers).filter(
    (a) => a.status === "skipped"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto py-6 px-3 md:px-6 flex flex-col lg:flex-row gap-4">
        {/* Left: Question + options */}
        <div className="flex-1 space-y-4">
          {/* Top bar */}
          <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm">
            <div>
              <h1 className="text-lg font-semibold text-slate-800">
                Practice Test
              </h1>
              <p className="text-xs text-slate-500">
                Question {currentIndex + 1} of {allQuestions.length}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                <span>Attempted: {attemptedCount}</span>
                <span className="inline-flex h-2 w-2 rounded-full bg-amber-400 ml-3" />
                <span>Skipped: {skippedCount}</span>
              </div>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-medium shadow hover:bg-emerald-700 transition"
              >
                Submit Test
              </button>
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 md:p-6">
            {/* Question header */}
            <div className="flex justify-between items-start gap-3 mb-4">
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-wide text-amber-500 font-semibold">
                  Question {currentIndex + 1}
                </p>
                <h2 className="font-semibold text-slate-800 leading-relaxed">
                  {currentQuestion?.questionText}
                </h2>
                <p className="text-[11px] text-slate-500">
                  {currentQuestion?.type === "simple" &&
                    "Single correct question"}
                  {currentQuestion?.type === "multiple" &&
                    "Multiple correct question (select one or more options)"}
                  {currentQuestion?.type === "confidence" &&
                    "Confidence-based marking – choose your confidence after selecting an answer"}
                  {currentQuestion?.type === "branch_parent" &&
                    "Branching question – your choice decides the next section"}
                  {currentQuestion?.type === "branch_child" &&
                    "Question from your selected branch path"}
                </p>
              </div>
              <div className="shrink-0 text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 capitalize">
                {currentQuestion?.type || "—"}
              </div>
            </div>

            {/* Options */}
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
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-sm flex items-start gap-2 transition ${
                      isSelected
                        ? "border-amber-500 bg-amber-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-amber-400"
                    }`}
                  >
                    <span
                      className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                        isSelected
                          ? "bg-amber-500 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {opt.key}
                    </span>
                    <span className="text-slate-800">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Confidence section */}
            {currentQuestion?.type === "confidence" && (
              <div className="mt-4 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold text-slate-700">
                    Confidence Level
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Select after choosing an option
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CONFIDENCE_OPTS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() =>
                        handleConfidenceSelect(currentQuestion, c.value)
                      }
                      className={`px-3 py-1.5 text-[11px] rounded-full border transition ${
                        aid?.confidence === c.value
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-500"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-2">
                  Low: +0.25 / -0.10, Medium: +1 / -0.25, Full: +2 / -0.50
                </p>
              </div>
            )}

            {/* Bottom actions */}
            <div className="flex justify-between items-center mt-5">
              <button
                type="button"
                onClick={markSkipped}
                className="px-3 py-1.5 text-[11px] rounded-full bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
              >
                Skip this question
              </button>

              <div className="flex gap-2">
                {currentIndex > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentIndex((idx) => Math.max(0, idx - 1))
                    }
                    className="px-3 py-1.5 text-[11px] rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
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
                    className="px-3 py-1.5 text-[11px] rounded-full bg-amber-500 text-white hover:bg-amber-600"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Question palette / summary */}
        <div className="w-full lg:w-64 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-semibold text-slate-700 mb-3">
              Question Palette
            </h3>
            <div className="grid grid-cols-6 gap-2">
              {allQuestions.map((q, idx) => {
                const a = answers[q.questionNumber];
                const isCurrent = idx === currentIndex;
                const status = a?.status;

                let bg = "bg-slate-100 text-slate-700";
                if (status === "attempted")
                  bg = "bg-emerald-500 text-white";
                else if (status === "skipped")
                  bg = "bg-amber-400 text-white";

                return (
                  <button
                    key={q.questionNumber}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-7 text-[10px] rounded-full flex items-center justify-center border ${
                      isCurrent ? "border-slate-900" : "border-transparent"
                    } ${bg}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 space-y-1.5 text-[10px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span>Attempted ({attemptedCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span>Skipped ({skippedCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-slate-100 border border-slate-300" />
                <span>Not visited ({allQuestions.length - attemptedCount - skippedCount})</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-[11px] text-slate-600">
            <h4 className="text-xs font-semibold text-slate-800 mb-2">
              Instructions
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Select the option and move to next question.</li>
              <li>Use the palette to jump to any question quickly.</li>
              <li>You can change answers before submitting.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
