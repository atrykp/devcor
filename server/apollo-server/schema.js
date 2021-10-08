const { gql } = require("apollo-server-core");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }
  type CreateUserResponse {
    success: Boolean!
    message: String
    id: ID!
    token: String
  }
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
`;

module.exports = typeDefs;
