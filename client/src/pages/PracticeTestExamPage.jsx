import { useEffect, useState, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const CONFIDENCE_OPTS = [
  { value: "full", label: "Full Confidence" },
  { value: "middle", label: "Medium Confidence" },
  { value: "low", label: "Low Confidence" },
];

export default function PracticeTestExamPage() {
  // ✅ FIXED: Now using examCode instead of testId
  const { id: examCode } = useParams();
  const navigate = useNavigate();

  const [fixedQuestions, setFixedQuestions] = useState([]);
  const [xQuestion, setXQuestion] = useState(null);
  const [branchQuestions, setBranchQuestions] = useState([]);
  const [counts, setCounts] = useState(null);
  const [branchChoice, setBranchChoice] = useState(null);
  const [branchLocked, setBranchLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const timerRef = useRef(null);

  const [showResultCard, setShowResultCard] = useState(false);
  const [resultData, setResultData] = useState({
    totalMarks: 0,
    detailedAttempts: [],
  });

  // ✅ FIXED: API call now uses examCode directly
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        console.log("🚀 Loading questions for examCode:", examCode); // Debug
        const { data } = await API.get(`/practice-tests/start/${examCode}`);
        if (!data?.success) throw new Error("Failed to load questions");
        if (!cancelled) {
          setFixedQuestions(data.data.fixedQuestions || []);
          setXQuestion(data.data.xQuestion || null);
          setCounts(data.data.counts || null);
          const durationMinutes = Number(data.data?.duration);
          if (Number.isFinite(durationMinutes) && durationMinutes > 0) {
            setTimeLeft(Math.round(durationMinutes * 60));
          } else {
            setTimeLeft(null);
          }
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
  }, [examCode]); // ✅ Changed from testId to examCode

  useEffect(() => {
    setBranchQuestions([]);
    setBranchChoice(null);
    setBranchLocked(false);
    setAnswers({});
    setCurrentIndex(0);
    setTimeLeft(null);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [examCode]);

  useEffect(() => {
    if (timeLeft == null || timeLeft <= 0) return;
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t == null) return t;
        if (t <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timeLeft]);

  const allQuestions = useMemo(() => {
    const fixed = [...fixedQuestions].sort(
      (a, b) => (a.questionNumber || 0) - (b.questionNumber || 0)
    );
    const branch = [...branchQuestions].sort(
      (a, b) => (a.questionNumber || 0) - (b.questionNumber || 0)
    );
    return [...fixed, ...branch];
  }, [fixedQuestions, branchQuestions]);

  const fixedCount = fixedQuestions.length;
  const hasXStep = Boolean(xQuestion);
  const xStepIndex = fixedCount;
  const branchStartIndex = fixedCount + (hasXStep ? 1 : 0);
  const totalSteps = fixedCount + branchQuestions.length + (hasXStep ? 1 : 0);
  const isXStep = hasXStep && currentIndex === xStepIndex;
  const paletteItems = useMemo(() => {
    const items = fixedQuestions.map((q) => ({
      kind: "question",
      question: q,
    }));
    if (hasXStep) {
      items.push({ kind: "x" });
    }
    branchQuestions.forEach((q) => {
      items.push({ kind: "question", question: q });
    });
    return items;
  }, [fixedQuestions, branchQuestions, hasXStep]);

  const getQuestionLabel = (q, index) => {
    if (!q) return index + 1;
    if (q.type === "branch_parent") return "X";
    if (typeof q.questionNumber === "number") return q.questionNumber;
    return index + 1;
  };

  const currentQuestionIndex = isXStep
    ? null
    : currentIndex < fixedCount
    ? currentIndex
    : currentIndex - (hasXStep ? 1 : 0);

  const currentQuestion = isXStep
    ? null
    : currentIndex < fixedCount
    ? fixedQuestions[currentIndex]
    : branchQuestions[currentIndex - branchStartIndex] || null;

  const currentLabel = isXStep
    ? "X"
    : getQuestionLabel(
        currentQuestion,
        currentQuestionIndex ?? currentIndex
      );
  const displayTotal =
    Number.isFinite(counts?.total) && counts?.total > 0
      ? counts.total
      : allQuestions.length;
  const canGoPrev = currentIndex > 0;
  const canGoNext = isXStep ? true : currentIndex < totalSteps - 1;
  const isNextDisabled =
    isXStep && (!branchChoice || (counts?.branch > 0 && !branchQuestions.length));
  const aid = currentQuestion
    ? answers[currentQuestion.questionNumber]
    : undefined;
  const branchChoiceOption =
    xQuestion?.options?.find((opt) => opt.key === branchChoice) || null;

  const formatTime = (seconds) => {
    const total = Number.isFinite(seconds) ? seconds : 0;
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

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

  const handleNext = () => {
    if (!canGoNext || isNextDisabled) return;
    if (!isXStep && currentQuestion) {
      const existing = answers[currentQuestion.questionNumber];
      if (!existing?.status) {
        updateAnswer(currentQuestion.questionNumber, {
          status: "skipped",
          selectedAnswer: null,
          selectedAnswers: [],
          confidence: null,
        });
      }
    }
    setCurrentIndex((idx) => Math.min(totalSteps - 1, idx + 1));
  };

  const handleOptionClick = (q, optionKey) => {
    if (!q) return;

    if (
      q.type === "simple" ||
      q.type === "confidence" ||
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

  const handleBranchSelect = (optionKey) => {
    if (!xQuestion || branchLocked) return;
    const branchChoiceKey =
      typeof optionKey === "string" ? optionKey.trim().toUpperCase() : optionKey;
    setBranchChoice(optionKey);
    setBranchLocked(true);
    loadBranchQuestions(branchChoiceKey);
  };

  // ✅ FIXED: Branch API call now uses examCode
  const loadBranchQuestions = async (choice) => {
    try {
      console.log("🌿 Loading branch questions for:", examCode, choice); // Debug
      const { data } = await API.get(
        `/practice-tests/branch/${examCode}/${choice}`
      );
      if (data?.success) {
        const limit =
          counts?.branch && Number.isFinite(counts.branch) ? counts.branch : 4;
        setBranchQuestions((data.data || []).slice(0, limit));
      }
    } catch (e) {
      console.error("loadBranchQuestions error", e);
    }
  };

  // ✅ FIXED: Submit now passes examCode
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

      console.log("📤 Submitting with examCode:", examCode); // Debug
      const { data } = await API.post("/practice-tests/submit", {
        examCode, // ✅ Changed from testId to examCode
        answers: payloadAnswers,
      });

      if (data.success) {
        setResultData({
          totalMarks: data.totalMarks,
          detailedAttempts: data.detailedAttempts || [],
        });
        setShowResultCard(true);
      }
    } catch (e) {
      console.error("submit error", e);
      setError(e.response?.data?.message || "Submit failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF9E6] via-white to-[#FFF3C4]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-2 border-[#FFCD2C] border-t-transparent animate-spin" />
          <p className="text-sm text-gray-600">
            Loading your practice test...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF9E6] via-white to-[#FFF3C4]">
        <div className="bg-white/90 border border-red-200 rounded-2xl px-6 py-4 shadow-lg">
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-3 text-xs text-gray-600 underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (!allQuestions.length && !xQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF9E6] via-white to-[#FFF3C4]">
        <p className="text-sm text-gray-600">
          No questions found for this test.
        </p>
      </div>
    );
  }

  const attemptedCount = Object.values(answers).filter(
    (a) => a.status === "attempted"
  ).length;
  const skippedCount = Object.values(answers).filter(
    (a) => a.status === "skipped"
  ).length;

  if (showResultCard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF9E6] via-white to-[#FFF3C4] px-4">
        <div className="bg-white/90 border border-emerald-100 rounded-3xl shadow-2xl max-w-md w-full p-6 text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-14 w-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
          <h1 className="text-lg font-semibold text-gray-800">
            Test submitted successfully!
          </h1>
          <p className="text-sm text-gray-600">
            You can now view your detailed answer sheet with correct answers,
            your responses, and marks for each question.
          </p>

          <div className="flex items-center justify-center gap-4 text-xs">
            <div className="px-3 py-2 rounded-xl bg-[#FFF7DA] text-[#E0AC00] border border-[#FFE6A3]">
              <div className="text-[10px] uppercase tracking-wide">
                Total Marks
              </div>
              <div className="text-sm font-semibold">
                {resultData.totalMarks}
              </div>
            </div>
          </div>

          {/* ✅ FIXED: Review route also uses examCode */}
          <button
            onClick={() =>
              navigate(`/student/practice-tests/${examCode}/review`, {
                state: {
                  totalMarks: resultData.totalMarks,
                  detailedAttempts: resultData.detailedAttempts,
                },
              })
            }
            className="mt-2 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FFCD2C] to-[#E0AC00] text-gray-900 text-sm font-semibold shadow-xl hover:shadow-2xl hover:translate-y-[-2px] transition"
          >
            View your result →
          </button>

          <button
            onClick={() => navigate("/student/dashboard")}
            className="block w-full mt-3 text-[11px] text-gray-500 hover:text-gray-700"
          >
            Go back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9E6] via-white to-[#FFF3C4]">
      <div className="w-full max-w-none mx-0 py-6 px-2 md:px-3 lg:px-4 flex flex-col lg:flex-row gap-3 lg:gap-4">
        {/* Left: Question + options */}
        <div className="flex-1 space-y-4">
          {/* Top bar */}
          <div className="bg-white/90 border border-[#FFE6A3] rounded-2xl px-4 py-3 flex items-center justify-between shadow-md">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Practice Test
              </h1>
              <p className="text-xs text-gray-500">
                {isXStep
                  ? "X Input (not counted)"
                  : `Question ${currentLabel} of ${displayTotal}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {timeLeft != null && (
                <div className="text-[10px] px-2 py-1 rounded-full bg-[#FFF7DA] text-gray-700 border border-[#FFE6A3]">
                  Time left: {formatTime(timeLeft)}
                </div>
              )}
              <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                <span>Attempted: {attemptedCount}</span>
                <span className="inline-flex h-2 w-2 rounded-full bg-[#FFCD2C] ml-3" />
                <span>Skipped: {skippedCount}</span>
              </div>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFCD2C] to-[#E0AC00] text-gray-900 text-xs font-semibold shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition"
              >
                Submit Test
              </button>
            </div>
          </div>

          {/* Question / X card */}
          <div className="bg-white/95 border border-[#FFE6A3] rounded-2xl shadow-md p-5 md:p-6">
            {isXStep ? (
              <>
                <div className="flex justify-between items-start gap-3 mb-4">
                  <div className="space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.15em] text-[#E0AC00] font-semibold">
                      X Input
                    </p>
                    <h2 className="font-semibold text-gray-900 leading-relaxed">
                      {xQuestion?.questionText}
                    </h2>
                    <p className="text-[11px] text-gray-500">
                      Choose once to load your branch questions.
                    </p>
                  </div>
                  <div className="shrink-0 text-[10px] px-2 py-1 rounded-full bg-[#FFF7DA] text-gray-700 capitalize border border-[#FFE6A3]">
                    input
                  </div>
                </div>

                <div className="space-y-2">
                  {(xQuestion?.options || []).map((opt) => {
                    const isSelected = branchChoice === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleBranchSelect(opt.key)}
                        disabled={branchLocked}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-sm flex items-start gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed ${
                          isSelected
                            ? "border-[#FFCD2C] bg-[#FFF7DA] shadow-sm"
                            : "border-gray-200 bg-white hover:border-[#FFCD2C]"
                        }`}
                      >
                        <span
                          className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                            isSelected
                              ? "bg-gradient-to-br from-[#FFCD2C] to-[#E0AC00] text-gray-900"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="text-gray-900">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {branchChoiceOption && (
                  <p className="mt-2 text-[10px] text-gray-600">
                    Selected: {branchChoiceOption.key}{" "}
                    {branchChoiceOption.text
                      ? `- ${branchChoiceOption.text}`
                      : ""}
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="flex justify-between items-start gap-3 mb-4">
                  <div className="space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.15em] text-[#E0AC00] font-semibold">
                      Question {currentLabel}
                    </p>
                    <h2 className="font-semibold text-gray-900 leading-relaxed">
                      {currentQuestion?.questionText}
                    </h2>
                    {currentQuestion?.explanation && (
                      <div className="mt-2 text-[11px] text-gray-700 bg-[#FFF9E6] border border-[#FFE6A3] rounded-lg px-3 py-2 whitespace-pre-line">
                        <span className="font-semibold text-gray-800">
                          Explanation:
                        </span>{" "}
                        {currentQuestion.explanation}
                      </div>
                    )}
                    <p className="text-[11px] text-gray-500">
                      {currentQuestion?.type === "simple" &&
                        "Single correct question"}
                      {currentQuestion?.type === "multiple" &&
                        "Multiple correct question (select one or more options)"}
                      {currentQuestion?.type === "confidence" &&
                        "Confidence-based marking � choose your confidence after selecting an answer"}
                      {currentQuestion?.type === "branch_child" &&
                        "Question from your selected branch path"}
                    </p>
                  </div>
                  <div className="shrink-0 text-[10px] px-2 py-1 rounded-full bg-[#FFF7DA] text-gray-700 capitalize border border-[#FFE6A3]">
                    {currentQuestion?.type || "�"}
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
                        onClick={() =>
                          handleOptionClick(currentQuestion, opt.key)
                        }
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-sm flex items-start gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed ${
                          isSelected
                            ? "border-[#FFCD2C] bg-[#FFF7DA] shadow-sm"
                            : "border-gray-200 bg-white hover:border-[#FFCD2C]"
                        }`}
                      >
                        <span
                          className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                            isSelected
                              ? "bg-gradient-to-br from-[#FFCD2C] to-[#E0AC00] text-gray-900"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="text-gray-900">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {currentQuestion?.type === "confidence" && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-semibold text-gray-800">
                        Confidence Level
                      </h3>
                      <p className="text-[10px] text-gray-500">
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
                              ? "bg-gradient-to-r from-[#FFCD2C] to-[#E0AC00] text-gray-900 border-[#FFCD2C]"
                              : "bg-[#FFF9E6] text-gray-700 border-[#FFE6A3] hover:border-[#FFCD2C]"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2">
                      Low: +0.25 / -0.10, Medium: +1 / -0.25, Full: +2 / -0.50
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Navigation actions */}
          <div className="flex justify-between items-center">
            {!isXStep ? (
              <button
                type="button"
                onClick={markSkipped}
                className="px-3 py-1.5 text-[11px] rounded-full bg-[#FFF7DA] text-[#E0AC00] border border-[#FFE6A3] hover:bg-[#FFEBD0] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Skip this question
              </button>
            ) : (
              <div />
            )}

            <div className="flex gap-2">
              {canGoPrev && (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((idx) => Math.max(0, idx - 1))
                  }
                  className="px-3 py-1.5 text-[11px] rounded-full bg-white text-gray-700 border border-gray-200 hover:bg-[#FFF9E6]"
                >
                  Previous
                </button>
              )}
              {canGoNext && (
                <button
                  type="button"
                  disabled={isNextDisabled}
                    onClick={handleNext}
                    className="px-3 py-1.5 text-[11px] rounded-full bg-gradient-to-r from-[#FFCD2C] to-[#E0AC00] text-gray-900 font-medium shadow hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Question palette / summary */}
        <div className="w-full lg:w-72 space-y-4">
          <div className="bg-white/90 border border-[#FFE6A3] rounded-2xl p-4 shadow-md">
            <h3 className="text-xs font-semibold text-gray-800 mb-3">
              Question Palette
            </h3>
            <div className="grid grid-cols-6 gap-2">
              {paletteItems.map((item, idx) => {
                const isCurrent = idx === currentIndex;

                if (item.kind === "x") {
                  const isSelected = Boolean(branchChoice);
                  const bg = isSelected
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-700";
                  return (
                    <button
                      key="x-step"
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-7 text-[10px] rounded-full flex items-center justify-center border ${
                        isCurrent ? "border-gray-900" : "border-transparent"
                      } ${bg}`}
                    >
                      X
                    </button>
                  );
                }

                const q = item.question;
                const a = answers[q.questionNumber];
                const status = a?.status;

                let bg = "bg-gray-100 text-gray-700";
                if (status === "attempted")
                  bg = "bg-emerald-500 text-white";
                else if (status === "skipped")
                  bg = "bg-[#FFCD2C] text-gray-900";

                return (
                  <button
                    key={q.questionNumber}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-7 text-[10px] rounded-full flex items-center justify-center border ${
                      isCurrent ? "border-gray-900" : "border-transparent"
                    } ${bg}`}
                  >
                    {getQuestionLabel(q, idx)}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 space-y-1.5 text-[10px] text-gray-600">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span>Attempted ({attemptedCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FFCD2C]" />
                <span>Skipped ({skippedCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-gray-100 border border-gray-300" />
                <span>
                  Not visited (
                  {allQuestions.length - attemptedCount - skippedCount})
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/90 border border-[#FFE6A3] rounded-2xl p-4 shadow-md text-[11px] text-gray-700">
            <h4 className="text-xs font-semibold text-gray-900 mb-2">
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







