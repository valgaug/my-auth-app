import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { join } from 'path';
import connectDB from './config/db';
import { resolvers } from './graphql/resolvers';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

connectDB();

// Load GraphQL type definitions
const typeDefs = loadSchemaSync(join(__dirname, './graphql/**/*.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
(async () => {
  await server.start();

  // Configure CORS using environment variable
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );

  app.use(express.json());

  // Applying the Apollo GraphQL middleware
  server.applyMiddleware({ app, path: '/graphql' });

  // Define a root route
  app.get('/', (req, res) => {
    res.send('Server is running');
  });
})();

export default app;
