import ExamRegistration from "../models/examRegistrationModel.js";

export const studentDashboard = async (req, res) => {
  const exams = await ExamRegistration
    .find({ user: req.user._id })
    .populate("exam");

  res.json({
    user: req.user,
    myExams: exams
  });
};
