/**
 * MKBOT Thread (Group Chat) Database Model
 * @author Charles MK
 */

const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
  threadID: { type: String, required: true, unique: true },
  threadName: { type: String, default: "Unknown" },
  prefix: { type: String, default: null },
  isStop: { type: Boolean, default: false },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
  settings: {
    antiOut:    { type: Boolean, default: false },
    antiChange: { type: Boolean, default: false },
    welcome:    { type: Boolean, default: true },
    language:   { type: String, default: "en" },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

threadSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Thread", threadSchema);
