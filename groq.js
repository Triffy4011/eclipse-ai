const groq = require('groq');

const graphqlSchema = 
  type Query {
    posts: [Post]
  }

  type Post {
    title: String!
    content: String
  }
;

const api = new groq.GraphQL(graphqlSchema);

module.exports = api;
