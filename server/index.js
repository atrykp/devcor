const express = require("express");
const cors = require("cors");
const connectDb = require("./mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");
const typeDefs = require("./apollo-server/schema");
const http = require("http");
const resolvers = require("./apollo-server/resolvers");
const cookieParser = require("cookie-parser");

require("dotenv").config({ path: "./server/.env" });
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");

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
      const { token } = req.cookies;

      if (token) {
        const { id } = jwt.verify(token, process.env.JWT_PASS);
        req.isLogged = !!id;
        req.userId = id;
      }

      return {
        req,
        res,
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(express.static(path.resolve(__dirname, "../client/build")));

  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  // });
  server.applyMiddleware({ app, path: "/", cors: false });
  connectDb();
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startApolloServer(typeDefs, resolvers);
