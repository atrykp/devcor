const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    users: [User]!
    getUser(id: ID!): User
    isUserAuth: User
    loginUser(email: String!, password: String): CreateUserResponse!
  }
  type Mutation {
    createUser(
      email: String!
      name: String!
      password: String
    ): CreateUserResponse!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    language: Lan
  }
  type Lan {
    native: String
    learn: String
  }
  type CreateUserResponse {
    success: Boolean!
    message: String
    id: ID!
    token: String
  }
`;

module.exports = typeDefs;
