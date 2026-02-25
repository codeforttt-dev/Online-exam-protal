import mongoose from "mongoose";

const schoolRegistrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    principalName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    country: String,
    state: String,
    district: String,
    pincode: String,
    isApproved: {
      type: Boolean,
      default: true
    },
    role: {
      type: String,
      default: "school"
    }
  },
  { timestamps: true }
);

export default mongoose.model("School", schoolRegistrationSchema);