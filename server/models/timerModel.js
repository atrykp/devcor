const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timerSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  currentState: String,
  timers: [
    {
      date: { type: String, default: Date.now() },
      focus: [
        {
          startAt: String,
          endAt: String,
        },
      ],
      break: [
        {
          startAt: String,
          endAt: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Timer", timerSchema);
