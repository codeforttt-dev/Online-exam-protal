import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam"
  },

  question: String,

  options: [String],

  correctAnswer: Number
});

export default mongoose.model("Question", questionSchema);
