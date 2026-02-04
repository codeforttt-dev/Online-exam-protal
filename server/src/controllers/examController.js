import Exam from "../models/examModel.js";


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


