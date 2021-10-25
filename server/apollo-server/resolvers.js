const User = require("../models/userModel");
const Language = require("../models/languageModel");
const jwt = require("jsonwebtoken");

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
    getLanguageObj: async (_, { userId }, ctx) => {
      if (!ctx.req.isLogged)
        return { status: false, message: "sorry something went wrong" };
      const languageObject = await Language.findOne({ userId }).select("-_id");

      if (!languageObject) {
        const newLangObj = await Language.create({
          userId,
          dictionary: [],
          flashcards: [],
          ignoreWords: [],
        });
        return { userId, dictionary: [], flashcards: [], ignoreWords: [] };
      }
      const { dictionary, flashcards, ignoreWords } = languageObject;
      return { userId, dictionary, flashcards, ignoreWords };
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
    addWord: async (_, { userId, from, to, fromLang, toLang }, ctx) => {
      if (!ctx.req.isLogged)
        return { status: false, message: "sorry something went wrong" };

      const languageObj = await Language.findOne({ userId });
      languageObj.dictionary.push({ from, to, fromLang, toLang });
      const changedLangObj = await languageObj.save();

      if (!changedLangObj)
        return {
          status: false,
          message: "cannot add a word",
        };
      return {
        status: true,
        message: "Word added",
      };
    },
    removeWord: async (_, { wordId }, ctx) => {
      if (!ctx.req.isLogged)
        return { status: false, message: "sorry something went wrong" };
      const languageObj = await Language.findOne({ userId: ctx.req.userId });
      if (!languageObj)
        return { status: false, message: "sorry something went wrong" };
      try {
        languageObj.dictionary = languageObj.dictionary.filter(
          (element) => element._id.toString() !== wordId
        );
        await languageObj.save();
        return { status: true, message: "word deleted" };
      } catch (error) {
        return { status: false, message: error.message };
      }
    },
    editWord: async (_, { from, to, wordId }, ctx) => {
      if (!ctx.req.isLogged)
        return { status: false, message: "sorry something went wrong" };
      const languageObj = await Language.findOne({ userId: ctx.req.userId });
      if (!languageObj)
        return { status: false, message: "sorry something went wrong" };
      try {
        languageObj.dictionary = languageObj.dictionary.map((element) => {
          if (element._id.toString() !== wordId) return element;
          if (from) element.from = from;
          if (to) element.to = to;
          return element;
        });
        await languageObj.save();
        return { status: true, message: "word edited" };
      } catch (error) {
        return { status: false, message: error.message };
      }
    },
    addIgnoreWord: async (_, { word }, ctx) => {
      if (!ctx.req.isLogged)
        return { status: false, message: "sorry something went wrong" };

      const languageObj = await Language.findOne({ userId: ctx.req.userId });

      const isExisting = languageObj.ignoreWords.includes(word);

      if (isExisting)
        return {
          status: false,
          message: "word already exist",
        };

      languageObj.ignoreWords.push(word);
      const changedLangObj = await languageObj.save();

      if (!changedLangObj)
        return {
          status: false,
          message: "cannot add a word",
        };
      return {
        status: true,
        message: "Word added",
      };
    },
  },
};
