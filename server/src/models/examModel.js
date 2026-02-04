import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  title: String,          // Math Olympiad
  description: String,
  price: Number,
  duration: Number,      // minutes
  totalMarks: Number,
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model("Exam", examSchema);
