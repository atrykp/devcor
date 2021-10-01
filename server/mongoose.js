const mongoose = require("mongoose");
require("dotenv").config();

console.log(process.env.MONGODB_LINK);

const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_LINK, () =>
    console.log("database connected...")
  );
};

module.exports = connectDb;
