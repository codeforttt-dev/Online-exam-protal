import Exam from "../models/examModel.js";
import ExamRegistration from "../models/examRegistrationModel.js";


// GET all exams (homepage)
export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find({ isActive: true });

    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// CREATE exam (admin)
export const createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);

    res.status(201).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExam = async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);

    // delete related registrations
    await ExamRegistration.deleteMany({ exam: req.params.id });

    res.json({ message: "Exam deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


