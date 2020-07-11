// const express = require("express");
// const expressGraphQL = require("express-graphql");    // bu çalışmadı

// const app = express();
// const schema = require("./schema/scheme");

// app.use('/graphql', expressGraphQL({
// 	schema,
// 	graphiql: true
// }));

// app.listen(5000, () => {
//   console.log("server is running...");
// });


const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');
 
const app = express();
 
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);
 
app.listen(5000);