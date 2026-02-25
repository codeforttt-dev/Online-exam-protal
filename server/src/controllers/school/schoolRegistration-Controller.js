import bcrypt from "bcryptjs";
import School from "../../models/schools/schoolRegistration-Model.js";

export const registerSchool = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await School.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "School already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const school = await School.create({
      ...req.body,
      password: hashedPassword
    });

    res.status(201).json({
      message: "School registered successfully",
      schoolId: school._id
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getSchools = async (req, res) => {
  try {
    const schools = await School.find({ isApproved: true })
      .select("_id name")
      .sort({ name: 1 });

    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};