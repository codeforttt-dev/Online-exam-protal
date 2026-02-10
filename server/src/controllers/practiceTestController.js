// server/src/controllers/practiceTestController.js
import PracticeTest from "../models/practiceTest.js";
import Question from "../models/questionModel.js";
import PracticeAttempt from "../models/practiceAttemptModel.js";
import Exam from "../models/examModel.js";

/* =========================
   1️⃣ PRACTICE TEST LIST
========================= */
export const getPracticeTests = async (req, res) => {
  try {
    const tests = await PracticeTest.find({ isActive: true })
      .populate("exam")
      .sort({ createdAt: -1 });

    return res.json(tests);
  } catch (error) {
    console.error("getPracticeTests error:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching practice tests" });
  }
};

/* =========================
   2️⃣ START PRACTICE TEST
   (Questions 1–15 + X)
========================= */
export const startPracticeTest = async (req, res) => {
  try {
    const { examId } = req.params;

    // Exam fetch karo
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    // ✅ Question ko examCode se fetch karo (jaise tumne sample me dikhaya)
    const questions = await Question.find({
      examCode: exam.examCode,
    }).sort({ questionNumber: 1 });

    // 1–15 (simple + multiple + confidence)
    const fixedQuestions = questions.filter(
      (q) => q.questionNumber >= 1 && q.questionNumber <= 15
    );

    // X question (branch parent)
    const xQuestion = questions.find((q) => q.type === "branch_parent");

    return res.json({
      success: true,
      data: {
        fixedQuestions,
        xQuestion,
      },
    });
  } catch (error) {
    console.error("startPracticeTest error:", error);
    return res
      .status(500)
      .json({ message: "Failed to start practice test" });
  }
};

/* =========================
   3️⃣ LOAD BRANCH QUESTIONS
   (A / B choice)
========================= */
export const loadBranch = async (req, res) => {
  try {
    const { examId, choice } = req.params;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    const branchQuestions = await Question.find({
      examCode: exam.examCode,
      type: "branch_child",
      branchKey: choice,
    }).sort({ questionNumber: 1 });

    return res.json({
      success: true,
      data: branchQuestions,
    });
  } catch (error) {
    console.error("loadBranch error:", error);
    return res
      .status(500)
      .json({ message: "Failed to load branch questions" });
  }
};

/* =========================
   4️⃣ SUBMIT PRACTICE TEST
========================= */
export const submitPracticeTest = async (req, res) => {
  try {
    const { examId, answers } = req.body;
    const userId = req.user._id;

    if (!Array.isArray(answers) || !answers.length) {
      return res
        .status(400)
        .json({ message: "Answers array is required" });
    }

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    const questions = await Question.find({
      examCode: exam.examCode,
    }).lean();

    const questionMap = Object.fromEntries(
      questions.map((q) => [q.questionNumber, q])
    );

    let totalMarks = 0;

    await PracticeAttempt.deleteMany({ user: userId, exam: examId });

    for (const ans of answers) {
      const q = questionMap[ans.questionNumber];
      if (!q) continue;

      let marks = 0;
      let isCorrect = false;
      const status = ans.status || "attempted";

      // SKIPPED CASE
      if (status === "skipped") {
        await PracticeAttempt.create({
          user: userId,
          exam: examId,
          questionNumber: ans.questionNumber,
          type: q?.type || null,
          selectedAnswer: ans.selectedAnswer || null,
          selectedAnswers: ans.selectedAnswers || [],
          confidence: ans.confidence || null,
          isCorrect: null,
          marks: 0,
          status: "skipped",
        });
        continue;
      }

      /* 1️⃣ SIMPLE QUESTIONS */
      if (q.type === "simple") {
        isCorrect = ans.selectedAnswer === q.correctAnswer;
        marks = isCorrect ? 1 : -0.25;
      }

      /* 2️⃣ MULTIPLE ANSWER QUESTIONS */
      if (q.type === "multiple") {
        const correct = Array.isArray(q.correctAnswers)
          ? q.correctAnswers
          : [];
        const selected = Array.isArray(ans.selectedAnswers)
          ? ans.selectedAnswers
          : [];

        if (!selected.length) {
          marks = 0;
          isCorrect = false;
        } else {
          const hasWrong = selected.some(
            (opt) => !correct.includes(opt)
          );

          if (hasWrong) {
            marks = -0.25;
            isCorrect = false;
          } else {
            const perCorrect = 0.67;
            marks = perCorrect * selected.length;

            isCorrect =
              selected.length === correct.length &&
              selected.every((s) => correct.includes(s));
          }
        }
      }

      /* 3️⃣ CONFIDENCE QUESTIONS */
      if (q.type === "confidence") {
        isCorrect = ans.selectedAnswer === q.correctAnswer;
        const conf = ans.confidence || "middle";

        if (conf === "full") {
          marks = isCorrect ? 2 : -0.5;
        } else if (conf === "middle") {
          marks = isCorrect ? 1 : -0.25;
        } else if (conf === "low") {
          marks = isCorrect ? 0.25 : -0.1;
        }
      }

      /* 4️⃣ BRANCH PARENT (X QUESTION) */
      if (q.type === "branch_parent") {
        isCorrect = ans.selectedAnswer === q.correctAnswer;
        marks = isCorrect ? 1 : -0.25;
      }

      /* 5️⃣ BRANCH CHILD QUESTIONS (16–20 PATH) */
      if (q.type === "branch_child") {
        isCorrect = ans.selectedAnswer === q.correctAnswer;
        marks = isCorrect ? 1 : -0.25;
      }

      totalMarks += marks;

      await PracticeAttempt.create({
        user: userId,
        exam: examId,
        questionNumber: q.questionNumber,
        type: q.type,
        selectedAnswer: ans.selectedAnswer || null,
        selectedAnswers: ans.selectedAnswers || [],
        confidence: ans.confidence || null,
        isCorrect,
        marks,
        status,
      });
    }

    return res.json({
      success: true,
      totalMarks,
    });
  } catch (error) {
    console.error("submitPracticeTest error:", error);
    return res
      .status(500)
      .json({ message: "Failed to submit practice test" });
  }
};
