import mongoose from "mongoose";

const practiceAttemptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },

    questionNumber: Number,
    type: String,

    selectedAnswer: String,
    selectedAnswers: [String],
    confidence: String,

    isCorrect: Boolean,
    marks: Number,
    status: String // attempted | skipped
  },
  { timestamps: true }
);

export default mongoose.model("PracticeAttempt", practiceAttemptSchema);
