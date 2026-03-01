import bcrypt from "bcryptjs";
import School from "../../models/schools/schoolRegistration-Model.js";


export const registerSchool = async (req, res) => {
  try {
    const {
      schoolName,
      principalName,
      email,
      whatsapp,
      password,
      username,
      country,
      state,
      district,
      pincode,
      category1,
      category2,
      board,
      medium
    } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Clean username
    const cleanUsername = username
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    const finalUsername = "@i-" + cleanUsername;

    const existing = await School.findOne({ username: finalUsername });

    if (existing) {
      return res.status(400).json({
        message: "Username already taken"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const school = await School.create({
      name: schoolName,
      username: finalUsername,
      principalName,
      email,
      password: hashedPassword,
      mobile: whatsapp,
      category1,
      category2,
      board,
      medium,
      address: {
        country,
        state,
        district,
        pincode
      }
    });

    res.status(201).json({
      message: "School registered successfully",
      username: finalUsername
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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


export const checkSchoolUsername = async (req, res) => {
  try {
    const clean = req.params.username
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    const finalUsername = "@i-" + clean;

    const existing = await School.findOne({ username: finalUsername });

    res.json({
      available: !existing
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


