import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/* ================= SIBLING ================= */
const siblingSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  class: String,  // match frontend
  school: String
});


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },

    email: {
      type: String,
      unique: true,
      sparse: true,
      index: true
    },

    password: String,

    mobile: { type: String, index: true },
    whatsapp: { type: String, index: true },

    studentClass: String,
    dob: Date,
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
      },
      disability: {
        type: String,
        enum: ["yes", "no"],
        default: "no"
      },

    // 📍 Personal Address
    state: String,
    district: String,
    pincode: String,
    address: String,

    // 🏫 School Details
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    },
    schoolCountry: String,
    schoolState: String,
    schoolDistrict: String,
    schoolPincode: String,

    // 👨 Father Details
    fatherName: String,
    fatherMobile: String,
    fatherEmail: String,
    fatherProfession: String,

    // 👩 Mother Details
    motherName: String,
    motherMobile: String,
    motherEmail: String,
    motherProfession: String,

    siblings: [siblingSchema],

    isPaid: { type: Boolean, default: false },
    profileCompleted: { type: Boolean, default: false },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student"
    },


    resetToken: String,
    resetTokenExpire: Date
  },
  { timestamps: true }
);

/* ================= HOOKS ================= */

// ✅ safe hashing only if password exists
userSchema.pre("save", async function () {
  if (!this.password || !this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (entered) {
  if (!this.password) return false;
  return bcrypt.compare(entered, this.password);
};


export default mongoose.model("User", userSchema);
