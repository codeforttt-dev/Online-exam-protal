// server/src/models/examModel.js
import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: Number,
    duration: Number,
    totalMarks: Number,
    isActive: {
      type: Boolean,
      default: true,
    },

    // ✅ yeh field ABHI add kar:
    examCode: {
      type: String,
      required: false, // existing data ke liye abhi optional rakho
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Exam ||
  mongoose.model("Exam", examSchema);
