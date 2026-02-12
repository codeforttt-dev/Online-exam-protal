import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    name: String,
    studentclass:String,
    whatsapp: {
      type: String,
      required: true,
      index: true // ⭐ important for fast linking
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

export default mongoose.model("Purchase", purchaseSchema);
