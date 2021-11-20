const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timerSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  currentState: { type: String, default: "focus" },
  timers: [
    {
      date: String,
      focus: [
        {
          startAt: String,
          endAt: String,
          duration: Number,
        },
      ],
      break: [
        {
          startAt: String,
          endAt: String,
          duration: Number,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Timer", timerSchema);
