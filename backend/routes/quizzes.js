const express = require("express");
const router = express.Router();
const axios = require("axios");
const Quiz = require("../models/Quiz");

router.post("/generate", async (req, res) => {
  try {
    const { subject, text, userId } = req.body;
    const aiURL = process.env.AI_SERVICE_URL + "/generate_quiz";
    const aiRes = await axios.post(aiURL, { subject, text });

    const quiz = await Quiz.create({
      userId,
      subject,
      sourceTextSnippet: text.substring(0, 200),
      questions: aiRes.data.questions,
    });

    res.json({ quiz });
  } catch (err) {
    console.error("Generate quiz error:", err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

router.get("/", async (req, res) => {
  const quizzes = await Quiz.find().sort({ createdAt: -1 });
  res.json({ quizzes });
});

router.post("/score", async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);

    let correct = 0;
    quiz.questions.forEach((q, i) => {
      const userAns = answers.find((a) => a.index === i);
      if (userAns && userAns.answer == q.answer) correct++;
    });

    const score = correct / quiz.questions.length;
    res.json({ score, correct, total: quiz.questions.length });
  } catch (err) {
    console.error("Score error:", err);
    res.status(500).json({ error: "Scoring failed" });
  }
});

module.exports = router;
