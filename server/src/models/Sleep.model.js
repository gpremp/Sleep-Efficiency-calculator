const mongoose = require("mongoose");

const sleepSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    unique: true,
    required: true,
  },
  sleepGoal: { type: String, required: true },
  SleepStruggleDuration: { type: String, required: true },
  bedTime: { type: String, required: true },
  wakeTime: { type: String, required: true },
  SleepDuration: { type: Number, required: true },
});

const SleepData = mongoose.model("sleepData", sleepSchema);

module.exports = { SleepData };
