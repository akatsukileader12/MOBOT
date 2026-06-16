/**
 * MKBOT User Database Model
 * @author Charles MK
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID:   { type: String, required: true, unique: true },
  name:     { type: String, default: "Unknown" },
  role:     { type: Number, default: 0 }, // 0=user 1=mod 2=admin 3=premium 4=dev
  banned:   { type: Boolean, default: false },
  banReason: { type: String, default: "" },
  exp:      { type: Number, default: 0 },
  money:    { type: Number, default: 0 },
  data:     { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("User", userSchema);
