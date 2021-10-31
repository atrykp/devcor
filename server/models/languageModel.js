const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const languageSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  dictionary: [{ from: String, to: String, fromLang: String, toLang: String }],

  flashcards: [
    {
      from: String,
      fromLang: String,
      to: String,
      toLang: String,
      iCan: { type: Boolean, default: false },
      date: { type: String, default: Date.now() },
    },
  ],
  ignoreWords: [String],
});

module.exports = mongoose.model("Language", languageSchema);
