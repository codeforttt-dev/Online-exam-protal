// server/src/models/studyLogModel.js
import mongoose from "mongoose";

const studyLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    minutes: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("StudyLog", studyLogSchema);
