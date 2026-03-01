import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import Purchase from "../models/purchaseModel.js";


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
      purchaseId,
      name,
      username,
      password,
      email,
      mobile,
      whatsapp,
      studentClass,
      dob,
      gender,
      disability,
      state,
      district,
      pincode,
      address,
      school,
      schoolCountry,
      schoolState,
      schoolDistrict,
      schoolPincode,
      fatherName,
      fatherMobile,
      fatherEmail,
      fatherProfession,
      motherName,
      motherMobile,
      motherEmail,
      motherProfession,
      siblings
    } = req.body;

    /* ========= BASIC VALIDATION ========= */
    if (!name || !username || !password || !email) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    if (!purchaseId) {
      return res.status(400).json({
        message: "Purchase ID missing"
      });
    }

    /* ========= CLEAN USERNAME ========= */
    const cleanUsername = username
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    const finalUsername = "@s-" + cleanUsername;

    /* ========= NORMALIZE EMAIL ========= */
    const normalizedEmail = email.toLowerCase().trim();

    /* ========= PURCHASE CHECK ========= */
    const purchase = await Purchase.findOne({
      _id: purchaseId,
      name,
      whatsapp,
      status: "success"
    });

    if (!purchase) {
      return res.status(400).json({
        message: "Purchase not found or details do not match"
      });
    }

    if (purchase.user) {
      return res.status(400).json({
        message: "Purchase already used"
      });
    }

    /* ========= CHECK EXISTING USER ========= */
    const exists = await User.findOne({
      $or: [
        { username: finalUsername },
        { email: normalizedEmail }
      ]
    });

    if (exists) {
      return res.status(400).json({
        message: "Username or Email already exists"
      });
    }

    /* ========= CREATE USER ========= */
    const user = await User.create({
      name,
      username: finalUsername,
      password,
      email: normalizedEmail,
      mobile,
      whatsapp,
      studentClass,
      dob,
      gender,
      disability,
      state,
      district,
      pincode,
      address,
      school,
      schoolCountry,
      schoolState,
      schoolDistrict,
      schoolPincode,
      fatherName,
      fatherMobile,
      fatherEmail,
      fatherProfession,
      motherName,
      motherMobile,
      motherEmail,
      motherProfession,
      siblings,
      isPaid: true,
      profileCompleted: true
    });

    /* ========= LINK PURCHASE ========= */
    purchase.user = user._id;
    await purchase.save();

    /* ========= RESPONSE ========= */
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const checkUsername = async (req, res) => {
  try {
    let username = req.params.username.toLowerCase().trim();

    // remove special characters
    username = username.replace(/[^a-z0-9_]/g, "");

    // add @
    if (!username.startsWith("@")) {
      username = "@" + username;
    }

    const existing = await User.findOne({ username });

    res.json({
      available: !existing
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
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
