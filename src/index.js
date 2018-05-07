const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload');

/*
* Actual implementation of the GraphQL schema.
* NOTE: a resolver always has to be named after the
* corresponding field from the schema definition!
*/
const resolvers = {
  Query,
  Mutation,
  AuthPayload,
}

/*
* Bundle & pass to server so the server knows which
* operations are accepted and how they should be resolved!
*/
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new WebGLShaderPrecisionFormat({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/public-marblepuma-577/hackernews-node/dev',
      secret: 'mysecret123',
      debug: true,
    })
  })
});

const port = process.env.PORT || 4000;

server.start(() => console.log(`Server is running on port ${port}`));