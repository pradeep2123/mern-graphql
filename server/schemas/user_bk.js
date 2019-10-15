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
var Validation = require("../../validation");
const User = db.users;
var JWT_SECRET = "I aM InNOceNt";

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
              return {
                status: 404,
                error: "NO USERS FOUND"
              };
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
        resolve: async function(root, params) {
          console.log(params, "params");
          console.log(params.name, "nam");
          var validate = "";
          console.log(params, "PPPP");
          // if (params.email !== "") {
          //   console.log("Email ");

          //   validate = Validation.validate_email(params.email);
          //   if (validate !== true) {
          //     console.log("Email not valid ");

          //     return { status: 404, message: "Please enter a Valid email" };
          //   }
          // }
          // if (params.password !== "") {
          //   validate = Validation.validate_password(params.password);
          //   if (validate !== true) {
          //     return { status: 404, message: "Please enter a Valid email" };
          //   }
          // }
          var users_found = await User.findOne({
            where: { email: params.email }
          });

          if (users_found) {
            console.log("USERdsfdfdfS fOUND");
            return {
              email: 404
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
            return user;
            // console.log(new_user, "NEW_USER");
            // if (!new_user) {
            //   throw new Error("NO USER ADDED");
            // }
            // return ;
          }
        }
      },
      userSignin: {
        type: userType,
        args: {
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: async function(root, params) {
          if (params.email !== "") {
            console.log("Email ");

            let validate = Validation.validate_email(params.email);
            if (validate !== true) {
              console.log("Email not valid ");

              return { status: 422, error: "Please enter a Valid email" };
            }
          }
          var user = await User.findOne({ where: { email: params.email } });
          if (!user) {
            return {
              status: 404,
              error: "User not found,please register"
            };
          }
          if (user) {
            var valid = await bcrypt.compare(params.password, user.password);
            if (valid) {
              var token = jwt.sign(
                { id: user.id, email: user.email },
                JWT_SECRET,
                {
                  expiresIn: 24 * 60 * 60
                }
              );
              console.log(token, "token");
              return {
                status: 202,
                token: token,
                message: "Successfully Created Token"
              };
            }
          }
        }
      }
    };
  }
});
module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
