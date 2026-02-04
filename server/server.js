import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";

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

app.get("/", (req, res) => {
  res.send("🚀 Server Running...");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
