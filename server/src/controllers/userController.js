import User from "../models/userModel.js";
import jwt from "jsonwebtoken";


// 🔹 Generate Token
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

    const exists = await User.findOne({
      $or: [{ email }, { username: "@" + username }]
    });

    if (exists) {
      return res.status(400).json({
        message: "Email or Username already exists"
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      username
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username, // returns @username
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





/* ========================
   LOGIN
======================== */
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username: username.startsWith("@") ? username : "@" + username
    });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


