const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const User = require("../models/userModel");
const Language = require("../models/languageModel");
const Notebook = require("../models/notebooksModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_PASS, {
    expiresIn: "30m",
  });
};

const ERROR_MESSAGE = { status: false, message: "sorry something went wrong" };

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

    isUserAuth: async (_, __, { req: { userId, isLogged } }) => {
      if (!isLogged) return null;
      const user = await User.findOne({ _id: userId });
      return {
        name: user.name,
        email: user.email,
        id: userId,
        language: user.language,
      };
    },

    getLanguageObj: async (_, { userId }, { req: { isLogged } }) => {
      if (!isLogged) return ERROR_MESSAGE;
      const languageObject = await Language.findOne({ userId }).select("-_id");

      if (!languageObject) {
        await Language.create({
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

    getNotebookObj: async (_, { userId }, { req: { isLogged } }) => {
      if (!isLogged) return ERROR_MESSAGE;
      const notebooksObject = await Notebook.findOne({ userId }).select("-_id");

      if (!notebooksObject) {
        await Notebook.create({
          userId,
          notebooks: [],
        });
        return { userId, notebooks: [] };
      }
      const { notebooks } = notebooksObject;
      return { userId, notebooks };
    },

    searchDictionary: async (
      _,
      { userQuery },
      { req: { userId, isLogged } }
    ) => {
      if (!isLogged) return ERROR_MESSAGE;
      const languageObject = await Language.findOne({ userId: userId });
      const result = languageObject.dictionary.filter(
        (element) =>
          element.from.includes(userQuery) || element.to.includes(userQuery)
      );
      return result;
    },
  },

  Mutation: {
    createUser: async (
      _,
      { name, email, password },
      { req: { userId, isLogged } }
    ) => {
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

    logoutUser: async (_, { id }, { req: { userId, isLogged } }) => {
      const { token } = cookies;
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

    updateUser: async (_, { id }, { req: { userId, isLogged } }) => {},

    updateUserLanguage: async (_, { id, native, learn }, ctx) => {
      if (!isLogged) return { status: false, message: "can't change language" };
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

    addWord: async (
      _,
      { userId, from, to, fromLang, toLang },
      { req: { isLogged } }
    ) => {
      if (!isLogged) return ERROR_MESSAGE;

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

    removeWord: async (_, { wordId }, { req: { userId, isLogged } }) => {
      if (!isLogged) return ERROR_MESSAGE;
      const languageObj = await Language.findOne({ userId: userId });
      if (!languageObj) return ERROR_MESSAGE;
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

    editWord: async (
      _,
      { from, to, wordId },
      { req: { userId, isLogged } }
    ) => {
      if (!isLogged) return ERROR_MESSAGE;
      const languageObj = await Language.findOne({ userId: userId });
      if (!languageObj) return ERROR_MESSAGE;
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

    addIgnoreWord: async (_, { word }, { req: { userId, isLogged } }) => {
      if (!isLogged) return ERROR_MESSAGE;

      const languageObj = await Language.findOne({ userId: userId });

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

    removeIgnoreWord: async (_, { word }, { req: { userId, isLogged } }) => {
      if (!isLogged) return ERROR_MESSAGE;

      const languageObj = await Language.findOne({ userId: userId });

      const isExisting = languageObj.ignoreWords.includes(word);

      if (!isExisting)
        return {
          status: false,
          message: "can not find word",
        };

      languageObj.ignoreWords = languageObj.ignoreWords.filter(
        (element) => element !== word
      );
      const changedLangObj = await languageObj.save();

      if (!changedLangObj)
        return {
          status: false,
          message: "cannot remove a word",
        };
      return {
        status: true,
        message: "Word removed",
      };
    },

    //TODO
    addAndTranslateWords: async (
      _,
      { words },
      { req: { userId, isLogged } }
    ) => {
      if (!isLogged) return ERROR_MESSAGE;

      const languageObj = await Language.findOne({ userId: userId });
    },

    addFlashcard: async (
      _,
      { from, to, fromLang, toLang },
      { req: { userId, isLogged } }
    ) => {
      if (!isLogged) return ERROR_MESSAGE;

      const languageObj = await Language.findOne({ userId: userId });
      languageObj.flashcards.push({ from, to, fromLang, toLang });
      const changedLangObj = await languageObj.save();

      if (!changedLangObj)
        return {
          status: false,
          message: "cannot add flashcard",
        };
      return {
        status: true,
        message: "Flashcard added",
      };
    },

    removeFlashcard: async (
      _,
      { flashcardId },
      { req: { userId, isLogged } }
    ) => {
      if (!isLogged) return ERROR_MESSAGE;
      const languageObj = await Language.findOne({ userId: userId });
      if (!languageObj) return ERROR_MESSAGE;
      try {
        languageObj.flashcards = languageObj.flashcards.filter(
          (element) => element._id.toString() !== flashcardId
        );
        await languageObj.save();
        return { status: true, message: "flashcard deleted" };
      } catch (error) {
        return { status: false, message: error.message };
      }
    },

    editFlashcard: async (
      _,
      { from, to, flashcardId },
      { req: { userId, isLogged } }
    ) => {
      if (!isLogged) return ERROR_MESSAGE;
      const languageObj = await Language.findOne({ userId: userId });
      if (!languageObj) return ERROR_MESSAGE;
      try {
        languageObj.flashcards = languageObj.flashcards.map((element) => {
          if (element._id.toString() !== flashcardId) return element;
          if (from) element.from = from;
          if (to) element.to = to;
          return element;
        });
        await languageObj.save();
        return { status: true, message: "flashcard edited" };
      } catch (error) {
        return { status: false, message: error.message };
      }
    },

    updateFlashcardStatus: async (
      _,
      { flashcardId, iCan },
      { req: { userId, isLogged } }
    ) => {
      if (!isLogged) return ERROR_MESSAGE;
      const languageObj = await Language.findOne({ userId: userId });
      if (!languageObj) return ERROR_MESSAGE;
      try {
        languageObj.flashcards = languageObj.flashcards.map((element) => {
          if (element._id.toString() !== flashcardId) return element;
          element.iCan = iCan;
          return element;
        });
        await languageObj.save();
        return { status: true, message: "flashcard updated" };
      } catch (error) {
        return { status: false, message: error.message };
      }
    },

    addNotebook: async (_, { name }, { req: { userId, isLogged } }) => {
      if (!isLogged) return ERROR_MESSAGE;

      const notebookObj = await Notebook.findOne({ userId: userId });
      notebookObj.notebooks.push({ name, notes: [] });
      const changedLangObj = await notebookObj.save();

      if (!changedLangObj)
        return {
          status: false,
          message: "cannot add notebook",
        };
      return {
        status: true,
        message: "Notebook added",
      };
    },

    addNote: async (
      _,
      { title, text, notebookId },
      { req: { userId, isLogged } }
    ) => {
      if (!isLogged) return ERROR_MESSAGE;

      const notebookObj = await Notebook.findOne({ userId: userId });
      notebookObj.notebooks
        .find((element) => element._id.toString() === notebookId)
        .notes.push({ title, text });
      const changedLangObj = await notebookObj.save();

      if (!changedLangObj)
        return {
          status: false,
          message: "Cannot add note",
        };
      return {
        status: true,
        message: "Note added",
      };
    },

    removeNotebook: async (
      _,
      { notebookId },
      { req: { userId, isLogged } }
    ) => {
      if (!isLogged) return ERROR_MESSAGE;
      const notebookObj = await Notebook.findOne({ userId: userId });
      if (!notebookObj) return ERROR_MESSAGE;
      try {
        notebookObj.notebooks = notebookObj.notebooks.filter(
          (element) => element._id.toString() !== notebookId
        );
        await notebookObj.save();
        return { status: true, message: "notebook deleted" };
      } catch (error) {
        return { status: false, message: error.message };
      }
    },
    removeNote: async (
      _,
      { notebookId, noteId },
      { req: { userId, isLogged } }
    ) => {
      if (!isLogged) return ERROR_MESSAGE;
      const notebookObj = await Notebook.findOne({ userId: userId });
      if (!notebookObj) return ERROR_MESSAGE;
      try {
        notebookObj.notebooks = notebookObj.notebooks
          .find((element) => element._id.toString() === notebookId)
          .notes.filter((element) => element._id.toString() !== noteId);
        await notebookObj.save();
        return { status: true, message: "note deleted" };
      } catch (error) {
        return { status: false, message: error.message };
      }
    },
  },
};
