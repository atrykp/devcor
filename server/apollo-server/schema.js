const { gql } = require("apollo-server-core");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
  type Query {
    getUser: User
  }
`;

module.exports = typeDefs;
