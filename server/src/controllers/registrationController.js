import ExamRegistration from "../models/examRegistrationModel.js";


// Register exam after payment
export const registerExam = async (req, res) => {
  try {
    const {
      examId,
      studentUniqueId,
      parentName,
      parentPhone,
      schoolName,
      address
    } = req.body;

    const already = await ExamRegistration.findOne({
      user: req.user._id,
      exam: examId
    });

    if (already) {
      return res.status(400).json({ message: "Already registered" });
    }

    const registration = await ExamRegistration.create({
      user: req.user._id,
      exam: examId,
      studentUniqueId,
      parentName,
      parentPhone,
      schoolName,
      address,
      paymentStatus: "paid",
      isAllowedExam: true
    });

    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// show my exams (profile)
export const myExams = async (req, res) => {
  try {
    const exams = await ExamRegistration
      .find({ user: req.user._id })
      .populate("exam");

    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
