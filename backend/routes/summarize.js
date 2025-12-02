const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const aiURL = process.env.AI_SERVICE_URL + "/summarize";
    const response = await axios.post(aiURL, { text });
    res.json(response.data);
  } catch (err) {
    console.error("Summarize error:", err);
    res.status(500).json({ error: "AI summary failed" });
  }
});

module.exports = router;
