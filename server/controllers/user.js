const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt-nodejs");
const Validation = require("../../validation");

var User = require("../models").users;
console.log(User, "ppp");
var Todo = require("../models").Todo;
var data = require("../config/data").data;
var mail = require("../routes/mail").sendMailToNewUser;
var moment = require("moment");
var sessionStorage = require("sessionstorage");
require("dotenv").config();

const signup = function(req, res, next) {
  console.log(req.body, "req.body");
  console.log(process.env.SENDGRID_API_KEY, "_*******__*******");
  var email = req.body.email;
  var name = req.body.name;
  var password = req.body.password;
  if (email) {
    var email_test = Validation.validate_email(email);
    if (email_test == false) {
      res.send({
        type: "Error",
        status: 404,
        message: "Enter a Valid Email"
      });
    }
  }
  if (password) {
    var password_test = Validation.validate_password(password);
    if (password_test == false) {
      res.send({
        type: "Error",
        status: 404,
        message: "Enter a Valid Password, 1 Up, 1Lo, 1Num,1Special character"
      });
    }
  }
  var user = new User({
    id: "",
    email: email,
    name: name,
    password: password,
    isVerify: false,
    createdAt: "",
    updatedAt: "",
    token: ""
  });
  var salt = bcrypt.genSaltSync(8);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  User.findOne({ where: { email: user.email } })
    .then(async function(user_found) {
      var token = jwt.sign({ email: user.email }, data.JWT_SECRET, {
        expiresIn: 60 * 60
      });

      if (user_found) {
        console.log(user_found["id"], "___*******________");

        if (user_found["isVerify"] == true) {
          res.send({
            type: "Error",
            status: 409,
            message: "User Already Exists,Please Sign it"
          });
        }
        var calculate_time = await Validation.time_difference(
          user_found["updatedAt"]
        );
        console.log(calculate_time, "CALCULATe TIme ");

        if (user_found["isVerify"] == false) {
          if (calculate_time == true) {
            var result_email = await mail(email, token);
            user_found.updatedAt = moment(Date.now()).format();

            User.update(
              {
                id: user_found.id,
                updatedAt: user_found["updatedAt"],
                token: token
              },
              {
                where: {
                  id: user_found.id
                }
              }
            )
              .then(updated_user => {
                res.send({
                  type: "Success",
                  status: 201,
                  message: "Email has sent Expired in 1 hour, Please Verify it"
                });
              })
              .catch(function(error) {
                console.log(error, "ERROR----");
              });
          }
          if (calculate_time == false) {
            res.send({
              type: "Error",
              status: "403",
              message: "Please Verify the Email..."
            });
          } else {
            res.send({
              type: "Error",
              status: "422",
              message: "Valdation Error on Date..."
            });
          }
        }
        console.log("After");
      }

      if (!user_found) {
        var result_email = await mail(email, token);

        console.log(result_email, "*********RESULT_EMAIL***********");

        if (result_email["status"] == 202) {
          console.log("status enter");
          user.token = token;
          var user_saved = await user.save();
          console.log(user_saved, "USER SAVED");

          if (Number.isInteger(user_saved["id"])) {
            res.send({ data: user, message: "Successfully Created" });
          }
        } else {
          res.send({
            type: "Error",
            status: 502,
            message: "User Mail has not Sent"
          });
        }
      }
    })
    .catch(function(error) {
      console.log(error, "Error");
      res.send({
        type: "error",
        status: 404,
        message: "Please signup",
        data: error
      });
    });
};

const signin = function(req, res) {
  console.log(req.body, "---");
  var email_id = req.body.email;
  var password = req.body.password;
  var verify_token = req.body.token || "";
  console.log(req.body, "0===");
  User.findOne({ where: { email: email_id } })
    .then(function(old_user) {
      if (!old_user) {
        res.send({
          type: "error",
          status: 404,
          message: "User Not found, Please Signup"
        });
      }

      if (old_user) {
        if (old_user["token"] !== verify_token) {
          console.log("TOKEN NOT VALID");
          res.send({
            type: "Error",
            status: 404,
            message: "User Not Valid Please Signup"
          });
        } else if (old_user["token"] == verify_token) {
          console.log("---------USER TOKEN MATCHED --------");
          User.update(
            { id: old_user.id, isVerify: true },
            {
              where: {
                id: old_user.id
              }
            }
          )
            .then(updated_status => {
              console.log(updated_status, "UPDated Status--");
              if (bcrypt.compareSync(password, old_user.password)) {
                var token = jwt.sign(
                  { id: old_user.id, email: old_user.email },
                  data.JWT_SECRET,
                  {
                    expiresIn: 24 * 60 * 60
                  }
                );
                // sessionStorage.setItem("token", token);

                res.send({
                  type: "Success",
                  status: 201,
                  message: "successfully_logged in",
                  token: token
                });
              } else {
                console.log("PASSWORD DOSES NOT MATCH");
                res.send({
                  type: "Error",
                  status: 401,
                  message: "Password InCorrect Or User Not found "
                });
              }
            })
            .catch(error => {
              console.log(error, "ERROR ON Token UPDATED ----");
              res.send({
                type: "Error",
                status: 404,
                message: "Error on User Verifying, Please Signup"
              });
            });
        }
      }
    })
    .catch(function(error) {
      console.log(error, "ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
      res.send({
        type: "error",
        status: 404,
        message: "User Not found",
        data: error
      });
    });
};
const getUsers = function(req, res) {
  User.findAll({
    // attributes: ["id", "name", "email"]
  })
    .then(users => {
      res.send({ data: users });
    })
    .catch(error => {
      console.log(error, "error");
      res.send({
        type: "error",
        status: 404,
        message: "User Not found",
        error: "Not Retrieved Users",
        data: error
      });
    });
};

const checkForgotPassword = function(req, res) {
  var email = req.body.email;

  User.findOne({ where: { email: email } })
    .then(async function(user_found) {
      console.log("USER FOUND", user_found);
      if (!user_found) {
        res.send({
          type: "Error",
          status: 404,
          message: "User Not Found , Please Register!"
        });
      } else {
        if (Number.isInteger(user_found["id"])) {
          var result_email = await mail(email);
          if (result_email["status"] == 202) {
            res.send({
              type: "Success",
              status: 201,
              message:
                "Mail has sent,please confirm the register. It expires in 1 hour"
            });
          } else {
            res.send({
              type: "Error",
              status: 502,
              message: "User Mail has not Sent"
            });
          }
        }
      }
    })
    .catch(function(error) {
      console.log(error, "ERror");
    });
};

module.exports = {
  signup,
  signin,
  getUsers,
  checkForgotPassword
};
