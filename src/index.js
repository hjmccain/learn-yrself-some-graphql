const { GraphQLServer } = require('graphql-yoga');
// const typeDefs = require();

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

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
    /*
    * This implementation is actually not necessary,
    * since gQL is apparently wicked smart...
    */
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
  typeDefs: './src/schema.graphql',
  resolvers,
});

const port = process.env.PORT || 4000;

server.start(() => console.log(`Server is running on port ${port}`));