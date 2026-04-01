const groqSchema = require('./groqSchema');
const graphqlHTTP = require('express-graphql');

const api = graphqlHTTP({
  schema: groqSchema,
  graphiql: true,
});

module.exports = api;
