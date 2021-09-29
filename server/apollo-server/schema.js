const { gql } = require("apollo-server-core");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
  type CreateUserResponse {
    success: Boolean!
    message: String
    id: ID!
    token: String
  }
  type Query {
    users: [User]!
    user(id: ID!): User
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
