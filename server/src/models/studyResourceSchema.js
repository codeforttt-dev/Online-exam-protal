// server/src/models/studyResourceModel.js
import mongoose from "mongoose";

const studyResourceSchema = new mongoose.Schema(
  {
    title: String,
    type: { type: String, enum: ["pdf", "video"] },
    url: String,
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
  },
  { timestamps: true }
);

export default mongoose.model("StudyResource", studyResourceSchema);
