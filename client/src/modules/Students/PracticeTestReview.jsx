// client/src/pages/PracticeTestReviewPage.jsx
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function PracticeTestReviewPage() {
  const { id: examId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation() || {};
  const totalMarks = state?.totalMarks ?? 0;
  const attempts = state?.detailedAttempts ?? [];

  if (!attempts.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white border rounded-2xl px-6 py-5 shadow-sm max-w-md w-full text-center">
          <h1 className="text-base font-semibold text-slate-800 mb-1">
            No review data found
          </h1>
          <p className="text-sm text-slate-500">
            Please submit the test first, then open the result screen again.
          </p>
          <button
            onClick={() => navigate("/student/dashboard")}
            className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-black"
          >
            Go to dashboard
          </button>
        </div>
      </div>
    );
  }

  const attemptedCount = attempts.filter((a) => a.status === "attempted").length;
  const skippedCount = attempts.filter((a) => a.status === "skipped").length;
  const notVisited =
    attempts.length - attemptedCount - skippedCount > 0
      ? attempts.length - attemptedCount - skippedCount
      : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto py-6 px-3 md:px-6 space-y-4">
        {/* Header summary */}
        <div className="bg-white border border-slate-200 rounded-2xl px-4 py-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Test Result & Answer Sheet
            </h1>
            <p className="text-xs text-slate-500">
              Review every question, your answer, correct answer and marks.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs">
            <div className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 min-w-[90px]">
              <div className="text-[10px] uppercase tracking-wide">
                Total Marks
              </div>
              <div className="text-sm font-semibold">{totalMarks}</div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 min-w-[90px]">
              <div className="text-[10px] uppercase tracking-wide">
                Attempted
              </div>
              <div className="text-sm font-semibold">{attemptedCount}</div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 min-w-[90px]">
              <div className="text-[10px] uppercase tracking-wide">
                Skipped
              </div>
              <div className="text-sm font-semibold">{skippedCount}</div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 min-w-[90px]">
              <div className="text-[10px] uppercase tracking-wide">
                Not visited
              </div>
              <div className="text-sm font-semibold">{notVisited}</div>
            </div>
            <button
              onClick={() => navigate("/student/dashboard")}
              className="ml-auto px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-black"
            >
              Back to dashboard
            </button>
          </div>
        </div>

        {/* Legend / summary bar */}
        <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm flex flex-wrap items-center gap-4 text-[11px] text-slate-600">
          <div className="font-semibold text-xs text-slate-800">
            Question status legend
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <span>Correct</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span>Incorrect</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span>Skipped</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-slate-200" />
            <span>Not answered / not visited</span>
          </div>
        </div>

        {/* Questions list */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-5 space-y-3">
          <h2 className="text-sm font-semibold text-slate-800 mb-2">
            Question-wise breakdown
          </h2>

          <div className="divide-y divide-slate-100">
            {attempts.map((a, idx) => {
              const isSkipped = a.status === "skipped";
              const isCorrect = a.isCorrect === true;
              const isWrong = a.isCorrect === false;

              let border = "border-slate-200";
              let dot = "bg-slate-300";
              let bgCard = "bg-slate-50";

              if (isSkipped) {
                border = "border-amber-200";
                dot = "bg-amber-400";
                bgCard = "bg-amber-50";
              } else if (isCorrect) {
                border = "border-emerald-200";
                dot = "bg-emerald-500";
                bgCard = "bg-emerald-50";
              } else if (isWrong) {
                border = "border-red-200";
                dot = "bg-red-500";
                bgCard = "bg-red-50";
              }

              const qType = a.type || "simple";

              const userAnswers =
                qType === "multiple"
                  ? a.selectedAnswers || []
                  : a.selectedAnswer
                  ? [a.selectedAnswer]
                  : [];

              const correctAnswers =
                qType === "multiple"
                  ? a.correctAnswers || []
                  : a.correctAnswer
                  ? [a.correctAnswer]
                  : [];

              return (
                <div key={`${a.questionNumber}-${idx}`} className="py-3">
                  <div
                    className={`rounded-xl border ${border} ${bgCard} px-3 py-3 md:px-4 md:py-3`}
                  >
                    {/* Top row: number + status + marks */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                      <div className="flex items-start gap-2">
                        <span className={`mt-1 h-2.5 w-2.5 rounded-full ${dot}`} />
                        <div>
                          <p className="text-[11px] font-semibold text-slate-800">
                            Q{idx + 1}.{" "}
                            <span className="font-normal">{a.questionText}</span>
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            Type: {qType}
                            {qType === "confidence" &&
                              ` • Confidence: ${a.confidence || "Not selected"}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-[10px] min-w-[80px]">
                        <div className="font-semibold">
                          {isSkipped && "Skipped"}
                          {isCorrect && "Correct"}
                          {isWrong && "Incorrect"}
                          {!isSkipped && a.isCorrect == null && "Evaluated"}
                        </div>
                        <div className="text-slate-600">
                          Marks: {typeof a.marks === "number" ? a.marks : 0}
                        </div>
                      </div>
                    </div>

                    {/* Options area */}
                    <div className="space-y-1.5 mt-1">
                      {(a.options || []).map((opt) => {
                        const userSelected = userAnswers.includes(opt.key);
                        const isCorrectOpt = correctAnswers.includes(opt.key);

                        let bg = "bg-white";
                        let borderColor = "border-slate-200";
                        let txt = "text-slate-700";

                        // correct option that user chose
                        if (isCorrectOpt && userSelected) {
                          bg = "bg-emerald-50";
                          borderColor = "border-emerald-400";
                          txt = "text-emerald-800";
                        }
                        // correct option but user ne nahi choose kia
                        else if (isCorrectOpt && !userSelected) {
                          bg = "bg-emerald-50";
                          borderColor = "border-emerald-300";
                          txt = "text-emerald-700";
                        }
                        // galat option jo user ne choose kia
                        else if (!isCorrectOpt && userSelected) {
                          bg = "bg-red-50";
                          borderColor = "border-red-300";
                          txt = "text-red-700";
                        }

                        return (
                          <div
                            key={opt.key}
                            className={`px-3 py-1.5 rounded-lg border text-[11px] flex gap-2 items-start ${bg} ${txt} ${borderColor}`}
                          >
                            <span className="font-semibold min-w-[18px]">
                              {opt.key}.
                            </span>
                            <span>{opt.text}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Summary tags */}
                    <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-slate-600">
                      {userAnswers.length > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200">
                          Your answer:{" "}
                          {userAnswers.join(", ")}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200">
                          Your answer: Not answered
                        </span>
                      )}

                      {correctAnswers.length > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200">
                          Correct answer:{" "}
                          {correctAnswers.join(", ")}
                        </span>
                      )}

                      {qType === "confidence" && (
                        <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200">
                          Confidence: {a.confidence || "Not selected"}
                        </span>
                      )}
                    </div>

                    {a.marksReason && (
                      <p className="mt-2 text-[10px] text-slate-500">
                        Marks logic: {a.marksReason}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
