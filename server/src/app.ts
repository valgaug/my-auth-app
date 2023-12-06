import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import connectDB from './config/db';
// import { typeDefs } from './graphql/typeDefs';
// import { resolvers } from './graphql/resolvers';

const app = express();

// Connect to MongoDB
connectDB();

// Apollo Server setup
// const server = new ApolloServer({ typeDefs, resolvers });

app.use(express.json());

// Applying the Apollo GraphQL middleware and setting the path to '/graphql'
// server.applyMiddleware({ app, path: '/graphql' });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
