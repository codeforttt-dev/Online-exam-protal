import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  title: String,         
  description: String,
  price: Number,
  duration: Number,      
  totalMarks: Number,
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model("Exam", examSchema);
