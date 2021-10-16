const User = require("../models/userModel");
const Language = require("../models/languageModel");
const jwt = require("jsonwebtoken");
const { words } = require("lodash");
require("dotenv").config({ path: "../.env" });

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_PASS, {
    expiresIn: "30m",
  });
};

module.exports = {
  Query: {
    getUser: async (_, { id }) => {
      const user = await User.findOne({ _id: id });
      return {
        name: user.name,
        email: user.email,
        id,
        language: user.language,
      };
    },
    loginUser: async (_, { email, password }, ctx) => {
      const userInfo = await User.findOne({ email }).select("+password");

      const isPasswordCorrect = await userInfo.correctPassword(
        password,
        userInfo.password
      );

      if (!isPasswordCorrect) throw new Error("Something went wrong");

      const token = await signToken(userInfo._id);

      ctx.res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 30,
      });

      return {
        id: userInfo._id,
        message: "user Created",
        success: true,
        token,
      };
    },
    isUserAuth: async (_, __, ctx) => {
      const { userId, isLogged } = ctx.req;

      if (!isLogged) return null;
      const user = await User.findOne({ _id: userId });
      return {
        name: user.name,
        email: user.email,
        id: userId,
        language: user.language,
      };
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password }, ctx) => {
      const userExist = await User.findOne({ email });
      if (userExist)
        return {
          id: "",
          message: "User already exist",
          success: false,
          token: "",
        };

      const user = await User.create({
        email,
        name,
        password,
        language: { native: "", learn: "" },
      });
      const token = await signToken(user._id);

      ctx.res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 30,
      });

      if (user) {
        return {
          id: user._id,
          message: "user Created",
          success: true,
          token,
        };
      }
    },
    logoutUser: async (_, { id }, ctx) => {
      const { token } = ctx.req.cookies;
      const { id: reqId } = jwt.verify(token, process.env.JWT_PASS);
      if (id === reqId) {
        ctx.res.cookie("token", "", {
          httpOnly: true,
          maxAge: 1,
        });
        return { message: "user logged out", status: true };
      }
      return { message: "something went wrong", status: false };
    },

    updateUser: async (_, { id }, ctx) => {},
    updateUserLanguage: async (_, { id, native, learn }, ctx) => {
      if (!ctx.req.isLogged)
        return { status: false, message: "can't change language" };
      const update = { native, learn };
      for (let key in update) {
        if (!update[key]) update[key] = "";
      }

      const data = await User.findByIdAndUpdate(
        id,
        {
          language: { ...update },
        },
        { new: true }
      );
      if (!data) return { status: false, message: "can't change language" };
      return { status: true, message: "user language updated" };
    },
    addWord: async (_, { userId, from, to }, ctx) => {
      if (!ctx.req.isLogged)
        return { status: false, message: "sorry something went wrong" };

      const languageObj = await Language.findOneAndUpdate(
        { userId },
        dictionary.words.push({ from, to }),
        { new: true }
      );
    },
  },
};
