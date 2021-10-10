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
    logoutUser(id: ID!): MessageResponse
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
  type MessageResponse {
    status: Boolean!
    message: String!
  }
`;

module.exports = typeDefs;
