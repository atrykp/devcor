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
      iCan: Boolean,
    },
  ],
});

module.exports = mongoose.model("Language", languageSchema);
