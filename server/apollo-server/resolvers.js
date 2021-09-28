const User = require("../models/userModel");

module.exports = {
  Query: {},
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      const user = await User.create({ email, name, password });
      if (user) {
        return user;
      }
    },
  },
};
