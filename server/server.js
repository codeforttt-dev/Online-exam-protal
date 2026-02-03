const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// import databese & router
const router = require("./src/routes/router"); 
const pool = require("./src/config/db");       

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Online Exam Portal API running 🚀");
});

app.use("/api", router);
// Port Check
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // ✅  DATABASE CHECK
  try {
    await pool.query("SELECT 1");
    console.log("✅ Database Connected");
  } catch (error) {
    console.log("❌ Database Not Connected");
  }
});
