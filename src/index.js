import '../config/env.js';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './data/resolversImport.js';
import { typeDefs } from './data/schema.js';

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.get('/', (req, res) => {
  console.log('Apollo GraphQL Express server is ready');
});

const port = process.env.PORT;
app.listen({ port }, () => {
  console.log(`Server is running at http://localhost:${port}${server.graphqlPath}`);
});
