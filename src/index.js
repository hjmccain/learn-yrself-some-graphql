const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

/*
* Actual implementation of the GraphQL schema.
* NOTE: a resolver always has to be named after the
* corresponding field from the schema definition!
*/
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews clone!`,
    feed: (root, args, context, info) => context.db.query.links({}, info),
  },
  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description,
        }
      }, info)
    }
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