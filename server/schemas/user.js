// import { gql } from "apollo-server-express";

// export default gql;
var bcrypt = require("bcrypt-nodejs");
var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var db = require("../models");
const User = db.users;

var userType = new GraphQLObjectType({
  name: "users",
  fields: function() {
    return {
      id: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
      isVerify: {
        type: GraphQLString
      }
    };
  }
});
var queryType = new GraphQLObjectType({
  name: "Query",
  fields: function() {
    return {
      getuser: {
        type: userType,
        args: {
          email: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function(root, params) {
          try {
            console.log(params, "PPPP");
            const users_found = db.users
              .findOne({
                where: {
                  email: params.email
                }
              })
              .then(function(s) {
                console.log(s, "sSss");
                return s;
              })
              .catch(function(error) {
                console.log(error, "EERor");
                return error;
              });
            console.log(users_found, "-USERS FOUND");
            if (users_found.length == 0) {
              throw "NO USERS FOUND";
            }
            return users_found;
          } catch (err) {
            console.log(err);
          }
        }
      }
    };
  }
});
var mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function() {
    return {
      addUser: {
        type: userType,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function(root, params) {
          console.log(params, "params");
          console.log(params.name, "nam");
          User.findOne({
            where: {
              email: params.email
            }
          })
            .then(function(users_found) {
              if (users_found) {
                console.log(users_found, "USERS");
                return {
                  status: "404",
                  message: "User Already Registered"
                };
              }
              if (!users_found) {
                const user = new User({
                  name: params.name,
                  email: params.email,
                  password: params.password
                });
                var salt = bcrypt.genSaltSync(8);
                var hash = bcrypt.hashSync(user.password, salt);
                user.password = hash;

                user.save();
                console.log(user["dataValues"], "NEW_USER");
                return user;
                // console.log(new_user, "NEW_USER");
                // if (!new_user) {
                //   throw new Error("NO USER ADDED");
                // }
                // return ;
              }
            })
            .catch(function(error) {
              console.log(error, "ERROR");
            });
        }
      }
    };
  }
});
module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
