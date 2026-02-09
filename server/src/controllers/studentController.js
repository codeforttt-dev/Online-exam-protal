// server/src/controllers/studentController.js
import Exam from "../models/examModel.js";
import ExamRegistration from "../models/examRegistrationModel.js";
import Result from "../models/resultModel.js";
import StudyLog from "../models/studyLogSchema.js";
import StudyResource from "../models/studyResourceSchema.js";

export const studentDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("Student dashboard userId:", userId.toString());

    const registrations = await ExamRegistration.find({ user: userId })
      .populate("exam")
      .sort({ createdAt: -1 });

    const results = await Result.find({ user: userId })
      .populate("exam")
      .sort({ createdAt: -1 });

    let totalStudyMinutes = 0;
    try {
      const studyLogs = await StudyLog.find({ user: userId });
      totalStudyMinutes = studyLogs.reduce(
        (sum, log) => sum + (log.minutes || 0),
        0
      );
    } catch (e) {
      totalStudyMinutes = 0;
    }

    const upcomingExams = await Exam.find({ isActive: true }).sort({
      createdAt: -1,
    });

    const resources = await StudyResource.find({})
      .populate("exam")
      .sort({ createdAt: -1 });

    return res.json({
      registrations,
      results,
      studyMinutes: totalStudyMinutes,
      upcomingExams,
      resources,
    });
  } catch (error) {
    console.error("Student dashboard error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
