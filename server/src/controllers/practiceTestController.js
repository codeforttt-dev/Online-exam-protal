import mongoose from "mongoose";
import PracticeTest from "../models/practiceTest.js";
import Question from "../models/questionModel.js";
import PracticeAttempt from "../models/practiceAttemptModel.js";
import Exam from "../models/examModel.js";

// âœ… FIXED: resolveTestContext supports BOTH _id AND examCode
const resolveTestContext = async (id) => {
  if (!id) return { practiceTest: null, exam: null, examCode: null };

  const attachExam = async (practiceTest) => {
    if (!practiceTest) return { practiceTest: null, exam: null, examCode: null };

    let exam = practiceTest.exam || null;
    const examId =
      practiceTest.examId ||
      practiceTest.examID ||
      practiceTest.exam_id ||
      (typeof practiceTest.exam === "string" ? practiceTest.exam : null);

    if (!exam && examId && mongoose.isValidObjectId(examId)) {
      exam = await Exam.findById(examId).lean();
    } else if (exam && !exam.examCode && exam._id) {
      exam = await Exam.findById(exam._id).lean();
    }

    const examCode =
      practiceTest.examCode ||
      practiceTest.examcode ||
      practiceTest.exam_code ||
      exam?.examCode ||
      null;

    return { practiceTest, exam, examCode };
  };

  // âœ… STEP 1: Try as MongoDB _id (cc31d4a6 format)
  if (mongoose.isValidObjectId(id)) {
    const practiceTest = await PracticeTest.findById(id).populate("exam").lean();
    if (practiceTest) {
      return attachExam(practiceTest);
    }

    const exam = await Exam.findById(id).lean();
    if (exam) {
      return { practiceTest: null, exam, examCode: exam.examCode || null };
    }
  }

  // âœ… STEP 2: Try as examCode (FINAL_EXAM format)
  const practiceTest = await PracticeTest.findOne({
    $or: [{ examCode: id }, { examcode: id }, { exam_code: id }],
  })
    .populate("exam")
    .lean();

  if (practiceTest) {
    return attachExam(practiceTest);
  }

  // âœ… STEP 3: Direct examCode usage
  return { practiceTest: null, exam: null, examCode: id };
};

/* =========================
   1ï¸âƒ£ PRACTICE TEST LIST
========================= */
export const getPracticeTests = async (req, res) => {
  try {
    const tests = await PracticeTest.find({ isActive: true })
      .populate("exam")
      .sort({ createdAt: -1 })
      .lean();

    const normalizeCode = (code) => (code || "").toString().trim();

    const existingCodes = new Set();
    tests.forEach((t) => {
      const code = normalizeCode(
        t.examCode || t.examcode || t.exam_code || t.exam?.examCode
      );
      if (code) existingCodes.add(code);
    });

    // Add extra tests for examCodes present in Questions but missing in PracticeTest
    const questionCodes = await Question.distinct("examCode", {
      examCode: { $exists: true, $ne: "" },
    });

    const extraCodes = questionCodes
      .map(normalizeCode)
      .filter((code) => code && !existingCodes.has(code));

    let extraTests = [];
    if (extraCodes.length) {
      const examInfo = await Exam.find({ examCode: { $in: extraCodes } }).lean();
      const examByCode = new Map(
        examInfo.map((e) => [normalizeCode(e.examCode), e])
      );

      const counts = await Question.aggregate([
        { $match: { examCode: { $in: extraCodes } } },
        { $group: { _id: "$examCode", total: { $sum: 1 } } },
      ]);
      const countByCode = new Map(
        counts.map((c) => [normalizeCode(c._id), c.total])
      );

      extraTests = extraCodes.map((code) => {
        const exam = examByCode.get(code);
        const total = countByCode.get(code) || 0;
        return {
          _id: code, // use examCode as id so client can navigate by examCode
          examCode: code,
          title: exam?.title || `Practice Test (${code})`,
          description: exam?.description || `Questions for ${code}`,
          duration: exam?.duration,
          totalMarks: exam?.totalMarks,
          totalQuestions: total || undefined,
          isActive: true,
        };
      });
    }

    const merged = extraTests.length ? [...tests, ...extraTests] : tests;

    console.log(`ðŸ“‹ Found ${merged.length} practice tests`);
    return res.json(merged);
  } catch (error) {
    console.error("getPracticeTests error:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching practice tests" });
  }
};

/* =========================
   2ï¸âƒ£ START PRACTICE TEST
   âœ… WORKS WITH: cc31d4a6 (ID) OR FINAL_EXAM (examCode)
========================= */
export const startPracticeTest = async (req, res) => {
  try {
    const { examCode } = req.params; // Can be _id OR examCode
    console.log("ðŸš€ startPracticeTest called with ID/examCode:", examCode);
    
    const ctx = await resolveTestContext(examCode);
    
    console.log("ðŸ” Resolved context:", {
      practiceTestId: ctx.practiceTest?._id,
      examCode: ctx.examCode,
      isValidId: mongoose.isValidObjectId(examCode)
    });

    if (!ctx.examCode && !ctx.practiceTest) {
      return res.status(404).json({
        success: false,
        message: `Test not found for ID/examCode: ${examCode}`,
      });
    }

    // âœ… FIXED: Use resolved examCode OR practiceTest ID as fallback
    const questionQuery = ctx.examCode 
      ? { examCode: ctx.examCode }
      : { practiceTestId: examCode }; // Fallback for custom questions

    console.log("ðŸ“š Fetching questions with query:", questionQuery);

    const questions = await Question.find(questionQuery).sort({ questionNumber: 1 });

    const fixedQuestions = questions.filter(
      (q) => q.questionNumber >= 1 && q.questionNumber <= 15
    );
    const xQuestion = questions.find((q) => q.type === "branch_parent");

    console.log(`âœ… Loaded ${questions.length} total, ${fixedQuestions.length} fixed, xQuestion: ${!!xQuestion}`);

    return res.json({
      success: true,
      data: {
        testId: ctx.practiceTest?._id || examCode,
        examCode: ctx.examCode || examCode,
        fixedQuestions,
        xQuestion,
      },
    });
  } catch (error) {
    console.error("startPracticeTest ERROR:", error);
    return res
      .status(500)
      .json({ message: "Failed to start practice test" });
  }
};

/* =========================
   3ï¸âƒ£ LOAD BRANCH QUESTIONS
   âœ… WORKS WITH: cc31d4a6 (ID) OR FINAL_EXAM (examCode)
========================= */
export const loadBranch = async (req, res) => {
  try {
    const { examCode, choice } = req.params;
    console.log("ðŸŒ¿ loadBranch called with examCode:", examCode, "choice:", choice);
    
    const ctx = await resolveTestContext(examCode);
    if (!ctx.examCode && !ctx.practiceTest) {
      return res.status(404).json({
        success: false,
        message: `Test not found for ID/examCode: ${examCode}`,
      });
    }

    const questionQuery = ctx.examCode 
      ? { 
          examCode: ctx.examCode, 
          type: "branch_child",
          branchKey: choice 
        }
      : { 
          practiceTestId: examCode,
          type: "branch_child", 
          branchKey: choice 
        };

    const branchQuestions = await Question.find(questionQuery).sort({ questionNumber: 1 });

    console.log(`âœ… Loaded ${branchQuestions.length} branch questions for choice: ${choice}`);

    return res.json({
      success: true,
      data: branchQuestions,
    });
  } catch (error) {
    console.error("loadBranch ERROR:", error);
    return res
      .status(500)
      .json({ message: "Failed to load branch questions" });
  }
};

/* =========================
   4ï¸âƒ£ SUBMIT PRACTICE TEST
========================= */
export const submitPracticeTest = async (req, res) => {
  try {
    const { examCode, answers } = req.body;
    const userId = req.user._id;

    console.log("ðŸ“¤ submitPracticeTest called with examCode:", examCode);

    if (!Array.isArray(answers) || !answers.length) {
      return res
        .status(400)
        .json({ message: "Answers array is required" });
    }

    const ctx = await resolveTestContext(examCode);
    if (!ctx.examCode && !ctx.practiceTest) {
      return res.status(404).json({
        success: false,
        message: "Practice test or exam not found",
      });
    }

    const questions = await Question.find({
      $or: [
        { examCode: ctx.examCode },
        { practiceTestId: examCode }
      ]
    }).lean();

    const questionMap = Object.fromEntries(
      questions.map((q) => [q.questionNumber, q])
    );

    let totalMarks = 0;
    const attemptFilter = ctx.practiceTest
      ? { user: userId, practiceTest: ctx.practiceTest._id }
      : ctx.exam
      ? { user: userId, exam: ctx.exam._id }
      : { user: userId, examCode: ctx.examCode || examCode };

    await PracticeAttempt.deleteMany(attemptFilter);

    for (const ans of answers) {
      const q = questionMap[ans.questionNumber];
      if (!q) continue;

      let marks = 0;
      let isCorrect = false;
      const status = ans.status || "attempted";
      let marksReason = "";

      const baseAttempt = {
        user: userId,
        practiceTest: ctx.practiceTest?._id || null,
        exam: ctx.exam?._id || null,
        examCode: ctx.examCode || examCode,
        questionNumber: q.questionNumber,
        type: q.type,
        questionText: q.questionText,
        explanation: q.explanation || "",
        options: q.options || [],
        correctAnswer: q.correctAnswer || null,
        correctAnswers: Array.isArray(q.correctAnswers) ? q.correctAnswers : [],
        selectedAnswer: ans.selectedAnswer || null,
        selectedAnswers: ans.selectedAnswers || [],
        confidence: ans.confidence || null,
        status,
      };

      // MARKING LOGIC (unchanged - perfect as is)
      if (status === "skipped") {
        await PracticeAttempt.create({
          ...baseAttempt,
          isCorrect: null,
          marks: 0,
          marksReason: "Skipped (0)",
        });
        continue;
      }

      if (q.type === "simple") {
        isCorrect = ans.selectedAnswer === q.correctAnswer;
        marks = isCorrect ? 1 : -0.25;
        marksReason = isCorrect ? "Correct (+1)" : "Wrong (-0.25)";
      }

      if (q.type === "multiple") {
        const correct = Array.isArray(q.correctAnswers) ? q.correctAnswers : [];
        const selected = Array.isArray(ans.selectedAnswers) ? ans.selectedAnswers : [];

        if (!selected.length) {
          marks = 0;
          isCorrect = false;
          marksReason = "No option selected (0)";
        } else {
          const hasWrong = selected.some((opt) => !correct.includes(opt));
          if (hasWrong) {
            marks = -0.25;
            isCorrect = false;
            marksReason = "Wrong option selected (-0.25)";
          } else {
            const maxMarks = 2;
            marks = Number((maxMarks / correct.length * selected.length).toFixed(2));
            isCorrect = selected.length === correct.length && selected.every((s) => correct.includes(s));
            marksReason = isCorrect ? "All correct (+2)" : `Partial (+${marks})`;
          }
        }
      }

      if (q.type === "confidence") {
        isCorrect = ans.selectedAnswer === q.correctAnswer;
        const conf = ans.confidence || "middle";
        if (conf === "full") marks = isCorrect ? 2 : -0.5;
        else if (conf === "middle") marks = isCorrect ? 1 : -0.25;
        else marks = isCorrect ? 0.25 : -0.1;
        marksReason = `${conf} conf, ${isCorrect ? "correct" : "wrong"} (${marks > 0 ? "+" : ""}${marks})`;
      }

      if (["branch_parent", "branch_child"].includes(q.type)) {
        isCorrect = ans.selectedAnswer === q.correctAnswer;
        marks = isCorrect ? 1 : -0.25;
        marksReason = isCorrect ? "Correct (+1)" : "Wrong (-0.25)";
      }

      totalMarks += marks;

      await PracticeAttempt.create({
        ...baseAttempt,
        isCorrect,
        marks,
        marksReason,
      });
    }

    const detailedAttempts = await PracticeAttempt.find(attemptFilter)
      .sort({ questionNumber: 1 })
      .lean();

    console.log(`âœ… Test submitted. Total Marks: ${totalMarks.toFixed(2)}`);

    return res.json({
      success: true,
      totalMarks,
      detailedAttempts,
    });
  } catch (error) {
    console.error("submitPracticeTest ERROR:", error);
    return res
      .status(500)
      .json({ message: "Failed to submit practice test" });
  }
};

export default {
  getPracticeTests,
  startPracticeTest,
  loadBranch,
  submitPracticeTest,
};


