const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/:id/progress", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ progress: user.progress });
});

router.post("/seed", async (req, res) => {
  const user = await User.create({
    name: "Demo User",
    email: "demo@example.com",
  });
  res.json({ user });
});

module.exports = router;
