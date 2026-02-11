import mongoose from "mongoose";

const attemptOptionSchema = new mongoose.Schema(
  {
    key: String,
    text: String,
  },
  { _id: false }
);

const practiceAttemptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    practiceTest: { type: mongoose.Schema.Types.ObjectId, ref: "PracticeTest" },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
    examCode: String,

    questionNumber: Number,
    type: String,
    questionText: String,
    explanation: String,
    options: [attemptOptionSchema],
    correctAnswer: String,
    correctAnswers: [String],

    selectedAnswer: String,
    selectedAnswers: [String],
    confidence: String,

    isCorrect: Boolean,
    marks: Number,
    marksReason: String,
    status: String // attempted | skipped
  },
  { timestamps: true }
);

export default mongoose.model("PracticeAttempt", practiceAttemptSchema);
