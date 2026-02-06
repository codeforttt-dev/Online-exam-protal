import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import examRoutes from "./src/routes/examRoutes.js";
import registrationRoutes from "./src/routes/registrationRoutes.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";


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

// Dashboard
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Server Running...");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
