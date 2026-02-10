// server/src/models/questionModel.js
import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  key: String,
  text: String,
});

const questionSchema = new mongoose.Schema(
  {
    examCode: String, // e.g. "FINAL_EXAM"

    questionNumber: Number,

    type: {
      type: String,
      enum: [
        "simple",
        "multiple",
        "confidence",
        "branch_parent",
        "branch_child",
      ],
    },

    questionText: String,
    options: [optionSchema],

    correctAnswer: String,  // for simple / confidence / branch
    correctAnswers: [String], // for multiple

    confidenceRequired: Boolean,
    parentQuestion: Number,
    branchKey: String,
  },
  { timestamps: true }
);

export default mongoose.models.Question ||
  mongoose.model("Question", questionSchema);
