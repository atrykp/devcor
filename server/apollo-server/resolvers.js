const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_PASS, {
    expiresIn: "30m",
  });
};

module.exports = {
  Query: {},
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      const user = await User.create({ email, name, password });
      console.log(user._id);

      const token = await signToken(user._id);
      if (user) {
        return {
          id,
          message: "user Created",
          success: true,
          token,
        };
      }
    },
  },
};
