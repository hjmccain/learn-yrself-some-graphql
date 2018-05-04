const { GraphQLServer } = require('graphql-yoga');

/* Define GraphQL schema */
const typeDefs = `
type Query {
  info: String!
}
`

/* Actual implementation of the GraphQL schema */
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews clone!`
  }
}

/*
* Bundle & pass to server so the server knows which
* operations are accepted and how they should be resolved!
*/
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

const port = process.env.PORT || 5000;

server.start(() => console.log(`Server is running on port ${port}`));