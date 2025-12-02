// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/smartstudy")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// Basic test route
app.get("/", (req, res) => {
  res.send("Backend running successfully!");
});

// API routes
app.use("/api/summarize", require("./routes/summarize"));
app.use("/api/quizzes", require("./routes/quizzes"));
app.use("/api/users", require("./routes/users"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
