const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 4,
    maxlength: 20,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    minlength: 4,
    maxlength: 1000,
    required: true,
  },
  important: {
    type: String,
    enum: ["off", "on"],
    default: "off",
  },
});

module.exports = mongoose.model("Post", postSchema);
