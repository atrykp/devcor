const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notebookSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  notebooks: [
    {
      name: String,
      notes: [
        {
          title: String,
          text: String,
          date: { type: String, default: Date.now() },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Notebook", notebookSchema);
