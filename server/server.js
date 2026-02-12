import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";

// ✅ SAB MODELS REGISTER KARNE KE LIYE (NEW)
import "./src/models/index.js";

import userRoutes from "./src/routes/userRoutes.js";
import examRoutes from "./src/routes/examRoutes.js";
import registrationRoutes from "./src/routes/registrationRoutes.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import practiceTestRoutes from "./src/routes/practiceTestRoutes.js";
<<<<<<< HEAD
=======
import purchaseRoutes from "./src/routes/purchaseRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
>>>>>>> afzal

dotenv.config();

// connect database
connectDB();

const app = express();

app.use(express.json());

// ✅ CORS
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// routes
app.use("/api/users", userRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/practice-tests", practiceTestRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/purchases", purchaseRoutes);

// Dashboard
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
// payment
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Server Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
