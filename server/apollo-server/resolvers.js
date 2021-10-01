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
      const userExist = await User.findOne({ email });
      if (userExist)
        return {
          id: "",
          message: "User already exist",
          success: false,
          token: "",
        };

      const user = await User.create({ email, name, password });

      const token = await signToken(user._id);
      if (user) {
        return {
          id: user._id,
          message: "user Created",
          success: true,
          token,
        };
      }
    },
    loginUser: async (_, { email, password }, context) => {
      const userInfo = await User.findOne({ email }).select("+password");
      const { cookie } = context;

      const isPasswordCorrect = await userInfo.correctPassword(
        password,
        userInfo.password
      );

      if (!isPasswordCorrect) throw new Error("Something went wrong");

      const token = await signToken(userInfo._id);

      // cookie("hello", "333");

      return {
        id: userInfo._id,
        message: "user Created",
        success: true,
        token,
      };
    },
  },
};
