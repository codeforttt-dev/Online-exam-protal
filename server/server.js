const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

// Import MongoDB connection
const connectDB = require("./src/config/db");

// Import routes
const router = require("./src/routes/router");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Online Exam Portal API running 🚀");
});

// API routes
app.use("/api", router);

// Start server AFTER DB connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // ✅ MongoDB Atlas connect
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
