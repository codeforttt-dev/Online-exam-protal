import User from "../models/userModel.js";
import jwt from "jsonwebtoken";


/* =================================
   GENERATE JWT TOKEN
================================= */
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};



/* =================================
   SIGNUP (REGISTER)
   POST /api/auth/signup
================================= */
export const registerUser = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      mobile,
      dob,
      state,
      district,
      address,
      school,
      fatherName,
      motherName,
      siblings
    } = req.body;

    /* ========= CHECK USER ========= */
    const exists = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (exists) {
      return res.status(400).json({
        message: "Username or Email already exists"
      });
    }

    /* ========= CREATE USER ========= */
    const user = await User.create({
      username,
      password,
      email,
      mobile,
      dob,
      state,
      district,
      address,
      school,
      fatherName,
      motherName,
      siblings,
      profileCompleted: true
    });

    /* ========= RESPONSE ========= */
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



/* =================================
   LOGIN
   POST /api/auth/login
================================= */
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    /* ========= FIND USER ========= */
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    /* ========= CHECK PASSWORD ========= */
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    /* ========= SUCCESS ========= */
    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
