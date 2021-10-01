require("dotenv").config({ path: "./server/.env" });
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const path = require("path");
const typeDefs = require("./apollo-server/schema");
const http = require("http");
const cors = require("cors");
const connectDb = require("./mongoose");
const resolvers = require("./apollo-server/resolvers");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3001;

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(cookieParser());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      res.cookie("hello", "world");
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(express.static(path.resolve(__dirname, "../client/build")));

  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  // });
  server.applyMiddleware({ app });
  connectDb();
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startApolloServer(typeDefs, resolvers);
