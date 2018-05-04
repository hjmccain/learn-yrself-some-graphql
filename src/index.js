const { GraphQLServer } = require('graphql-yoga');

/* Define GraphQL schema */
const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Link {
  id: ID!
  description: String
  url: String!
}
`

/*
* Actual implementation of the GraphQL schema.
* NOTE: a resolver always has to be named after the
* corresponding field from the schema definition!
*/
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews clone!`,
    feed: () => links,
  },
  Link: {
    id: root => root.id,
    description: root => root.description,
    url: root => root.url,
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

const port = process.env.PORT || 4000;

server.start(() => console.log(`Server is running on port ${port}`));