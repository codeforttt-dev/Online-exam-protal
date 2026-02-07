import User from "../models/userModel.js";
import Exam from "../models/examModel.js";
import ExamRegistration from "../models/examRegistrationModel.js";

export const adminDashboard = async (req, res) => {
  const users = await User.countDocuments();
  const exams = await Exam.countDocuments();
  const registrations = await ExamRegistration.countDocuments();

  res.json({
    totalUsers: users,
    totalExams: exams,
    totalRegistrations: registrations
  });
};
