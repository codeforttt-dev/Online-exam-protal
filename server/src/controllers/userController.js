// controllers/userController.js
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

// ============================
// Helper: Generate JWT Token
// ============================
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* ========================
   SIGNUP
======================== */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // username ko clean karo same jaisa schema pre-save mein ho raha hai
    const cleanUsername =
      "@" + username.toLowerCase().trim().replace(/\s+/g, "");

    // Email ya username already exist check
    const exists = await User.findOne({
      $or: [{ email }, { username: cleanUsername }],
    });

    if (exists) {
      return res
        .status(400)
        .json({ message: "Email or Username already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      username, // pre-save hook isko @username form mein convert kar dega
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ========================
   LOGIN
======================== */
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // @ ke saath / bina @ dono handle karo
    const cleanUsername = username.startsWith("@")
      ? username.toLowerCase().trim()
      : "@" + username.toLowerCase().trim().replace(/\s+/g, "");

    const user = await User.findOne({ username: cleanUsername });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Sirf real user ka data bhejo
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ========================
   GET USER PROFILE
   (Protected: /profile)
======================== */
export const getUserProfile = async (req, res) => {
  try {
    // req.user.id/_id protect middleware se aayega
    const user = await User.findById(req.user._id).select(
      "-password -resetToken -resetTokenExpire"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // front-end ko clear structure mein bhejo
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ========================
   UPDATE USER PROFILE
   (Protected: PUT /profile)
======================== */
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // fields update
    if (req.body.name) user.name = req.body.name;

    if (req.body.username) {
      const cleanUsername =
        "@" + req.body.username.toLowerCase().trim().replace(/\s+/g, "");

      // same username kisi aur user ka na ho
      const usernameExists = await User.findOne({
        username: cleanUsername,
        _id: { $ne: user._id },
      });

      if (usernameExists) {
        return res.status(400).json({ message: "Username already taken" });
      }

      user.username = cleanUsername;
    }

    if (req.body.password) {
      user.password = req.body.password; // pre-save hook hash karega
    }

    const updated = await user.save();

    res.json({
      _id: updated._id,
      name: updated.name,
      username: updated.username,
      email: updated.email,
      role: updated.role,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ========================
   FORGOT PASSWORD
======================== */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // security ke liye generic message bhi de sakte ho
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await sendEmail(
      user.email,
      "Password Reset",
      `Click this link to reset password:\n${resetLink}`
    );

    res.json({ message: "Reset link sent to email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ========================
   RESET PASSWORD
======================== */
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token expired or invalid" });
    }

    user.password = password; // pre-save hook hash karega
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
