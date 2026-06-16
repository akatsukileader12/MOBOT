/**
 * MKBOT Global Data Model
 * @author Charles MK
 */

const mongoose = require("mongoose");

const globalSchema = new mongoose.Schema({
  key:   { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, default: null },
  updatedAt: { type: Date, default: Date.now },
});

globalSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Global", globalSchema);
