import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { join } from 'path';
import connectDB from './config/db';
import { resolvers } from './graphql/resolvers';

const app = express();

// Connect to MongoDB
connectDB();

// Load GraphQL type definitions from all .graphql files in the 'graphql' directory
const typeDefs = loadSchemaSync(join(__dirname, './graphql/**/*.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
(async () => {
  await server.start();
  app.use(express.json());

  // Applying the Apollo GraphQL middleware and setting the path to '/graphql'
  server.applyMiddleware({ app, path: '/graphql' });
})();

export default app;
