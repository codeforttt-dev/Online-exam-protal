import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam"
  },

  score: Number,
  total: Number

}, { timestamps: true });

export default mongoose.model("Result", resultSchema);
