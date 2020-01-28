import cors from "cors";
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();
app.use(cors());


const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
    users:[User!]
  }
  type User {
    id: ID!
    username: String!
  }
`;
const resolvers = {
  Query: {
    me: () => me,
    user: (parent, { id }) => users[id],
    users: () => {
      return Object.values(users);
    }
  }
};

// Sample data
let users = [
  {
    id: '1',
    username: 'Kaixer'
  },
  {
    id: '2',
    username: 'Xaki'
  }
];

let me = users[1];

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});
server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});