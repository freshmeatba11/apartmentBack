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
  totalDegree: {
    type: Number,
    required: true,
    min: 0,
    max: 99999,
  },
  publicUsage: {
    type: Number,
    required: true,
    min: 0,
    max: 500,
    default: 0,
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
    degree: {
      type: Number,
      required: true,
      min: 0,
      max: 99999,
    },
    usage: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
    },
  },
  roomB: {
    degree: {
      type: Number,
      required: true,
      min: 0,
      max: 99999,
    },
    usage: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
    },
  },
  roomC: {
    degree: {
      type: Number,
      required: true,
      min: 0,
      max: 99999,
    },
    usage: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
    },
  },
  roomD: {
    degree: {
      type: Number,
      required: true,
      min: 0,
      max: 99999,
    },
    usage: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
    },
  },
  desc: {
    type: String,
    maxLength: 100,
    default: "",
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
