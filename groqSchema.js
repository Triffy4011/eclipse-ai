const { GraphQLObjectType, GraphQLString } = require('graphql');

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
  },
});

const rootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    posts: {
      type: GraphQLList(PostType),
      resolve: () => [], // placeholder resolver
    },
  },
});

module.exports = rootQuery;
