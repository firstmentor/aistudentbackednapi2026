const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject: String,
  marks: Number,
  grade: String
}, { timestamps: true });

module.exports = mongoose.model("Result", resultSchema);
