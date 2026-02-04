import mongoose from "mongoose";

const examRegistrationSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam"
  },

  studentUniqueId: String,

  paymentStatus: {
    type: String,
    default: "pending" // pending | paid
  },

  // parent info
  parentName: String,
  parentPhone: String,

  // school info
  schoolName: String,
  address: String,

  isAllowedExam: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export default mongoose.model("ExamRegistration", examRegistrationSchema);
