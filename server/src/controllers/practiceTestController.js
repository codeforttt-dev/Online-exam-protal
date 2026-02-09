// server/src/controllers/practiceTestController.js
import PracticeTest from "../models/practiceTest.js";

export const getPracticeTests = async (req, res) => {
  try {
    const tests = await PracticeTest.find({ isActive: true })
      .populate("exam")
      .sort({ createdAt: -1 });

    res.json(tests);
  } catch (error) {
    console.error("getPracticeTests error:", error);
    res.status(500).json({ message: "Server error fetching practice tests" });
  }
};
