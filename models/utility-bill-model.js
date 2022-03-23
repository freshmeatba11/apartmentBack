const mongoose = require("mongoose");

const utilityBillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 20,
  },
  recordDate: {
    type: Date,
    required: true,
  },
  previousTotalDegree: {
    type: Number,
    required: true,
    min: 0,
    max: 99999,
  },
  currentTotalDegree: {
    type: Number,
    required: true,
    min: 0,
    max: 99999,
  },
  gas: {
    type: Number,
    required: true,
    min: 0,
    max: 1000,
    default: 0,
  },
  people: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
    default: 1,
  },
  roomA: {
    previousDegree: {
      type: Number,
      required: true,
      min: 0,
      max: 99999,
    },
    currentDegree: {
      type: Number,
      required: true,
      min: 0,
      max: 99999,
    },
    desc: {
      type: String,
      maxLength: 100,
      default: "",
    },
  },
  roomB: {
    previousDegree: {
      type: Number,
      required: true,
      min: 0,
      max: 99999,
    },
    currentDegree: {
      type: Number,
      required: true,
      min: 0,
      max: 99999,
    },
    desc: {
      type: String,
      maxLength: 100,
      default: "",
    },
  },
  roomC: {
    previousDegree: {
      type: Number,
      required: true,
      min: 0,
      max: 99999,
    },
    currentDegree: {
      type: Number,
      required: true,
      min: 0,
      max: 99999,
    },
    desc: {
      type: String,
      maxLength: 100,
      default: "",
    },
  },
  roomD: {
    previousDegree: {
      type: Number,
      required: true,
      min: 0,
      max: 99999,
    },
    currentDegree: {
      type: Number,
      required: true,
      min: 0,
      max: 99999,
    },
    desc: {
      type: String,
      maxLength: 100,
      default: "",
    },
  },
  formDate: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("UtilityBill", utilityBillSchema);
