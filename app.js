const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors"); // allows/disallows cross-site communication
const helmet = require("helmet"); // creates headers that protect from attacks (security)
var { graphqlExpress } = require("apollo-server-express");
var graphiqlExpress = require("apollo-server-express");
var { makeExecutableSchema } = require("graphql-tools");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
require("dotenv").config();

var models = require("./server/models");
var schema = require("./server/schemas/user");
const { postgraphile } = require("postgraphile");

const app = express();

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function(origin, callback) {
    console.log(origin, "----");
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
console.log(process.env.SENDGRID_API_KEY, "________________________");
app.use(cors());
// app.use(
//   postgraphile(
//     process.env.DATABASE_URL ||
//       "postgres://postgres:password@localhost:5432/postgres",
//     "public",
//     {
//       watchPg: true,
//       graphiql: true,
//       enhanceGraphiql: true
//     }
//   )
// );

app.use(helmet());
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Require our routes into the application.
require("./server/routes")(app);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
  })
);
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning of nothingness."
  })
);

module.exports = app;
