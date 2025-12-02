const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    qtype: String,
    question: String,
    options: [String],
    answer: String,
  },
  { _id: false }
);

const QuizSchema = new mongoose.Schema({
  userId: String,
  subject: String,
  sourceTextSnippet: String,
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", QuizSchema);
