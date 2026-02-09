import mongoose from "mongoose";

const practiceTestSchema = new mongoose.Schema(
  {
    title: String,                // Practice Test 1
    description: String,          // Basic math practice
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam"
    },

    totalQuestions: Number,
    duration: Number,             // minutes
    totalMarks: Number,

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("PracticeTest", practiceTestSchema);
