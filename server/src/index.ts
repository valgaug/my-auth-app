import { ApolloServer, gql } from 'apollo-server';
import dotenv from 'dotenv';
dotenv.config();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  const { url } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
}

startServer();
