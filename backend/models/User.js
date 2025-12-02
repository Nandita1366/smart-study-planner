const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema(
  {
    score: Number,
    lastReviewed: Date,
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  progress: {
    type: Map,
    of: ProgressSchema,
    default: {},
  },
});

module.exports = mongoose.model("User", UserSchema);
