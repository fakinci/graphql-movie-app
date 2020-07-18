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
const cors = require('cors')// server ve client farklı portlarda çlıştığından birbirini görmesi için
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');
 
const app = express();
app.use(cors())

//dotenv
require('dotenv').config();  // dotenv i   const db = require("./helpers/db")(); nın altına koyarsan çalışmaz   database bağlantısından önce okumalı

//db 
const db = require("./helpers/db")();


 
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);
 
app.listen(5000);