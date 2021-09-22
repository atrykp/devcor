const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const path = require("path");
const { gql } = require("apollo-server-core");
const http = require("http");
var cors = require("cors");

const PORT = process.env.PORT || 3001;

const usersObj = [{ name: "patryk" }, { name: "stefan" }];

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.use(cors());
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  // });
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    name: String!
  }
`;
const resolvers = {
  Query: {
    users: () => usersObj,
  },
};

startApolloServer(typeDefs, resolvers);
