const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Running", "Walking", "Cycling", "Gym", "Yoga", "Swimming"],
    },
    description: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 1 }, // minutes
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exercise", exerciseSchema);