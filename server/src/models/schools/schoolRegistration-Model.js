import mongoose from "mongoose";

const schoolRegistrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    principalName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    category1: {
      type: String,
    },

    category2: {
      type: String,
    },

    board: {
      type: String,
    },

    medium: {
      type: String,
    },

    address: {
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      }
    },

    isApproved: {
      type: Boolean,
      default: true,
    },

    role: {
      type: String,
      default: "school",
    },
  },
  { timestamps: true }
);

export default mongoose.model("School", schoolRegistrationSchema);