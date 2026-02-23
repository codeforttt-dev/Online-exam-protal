import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    studentClass: String,

    whatsapp: {
      type: String,
      required: true,
      trim: true
    },

    examName: String,
    price: Number,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    status: {
      type: String,
      default: "success"
    }
  },
  { timestamps: true }
);

/* ✅ THIS IS THE KEY PART */
purchaseSchema.index(
  { name: 1, whatsapp: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "success" }
  }
);


export default mongoose.model("Purchase", purchaseSchema);
