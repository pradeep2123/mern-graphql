const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt-nodejs");

var User = require("../models").users;
console.log(User, "ppp");
var Todo = require("../models").Todo;
var data = require("../config/data").data;

const signup = function(req, res, next) {
  console.log(req.body, "req.body");
  var email_id = req.body.email;
  var name = req.body.name;
  var password = req.body.password;

  User.findOne({ where: { email: email_id } })
    .then(function(user_found) {
      console.log("USER REGISTERING IT ");
      if (!user_found) {
        var salt = bcrypt.genSaltSync(8);
        var hash = bcrypt.hashSync(password, salt);
        password = hash;
        User.create({
          email: email_id,
          name: name,
          password: password
        })
          .then(function(success) {
            console.log(success, "SUCC");
            res.send({ data: success, message: "Successfully Created" });
          })
          .catch(function(error) {
            console.log("USER ERROR ON  IT ");
            res.send({ error: "Erron on Creation" });
          });
      } else {
        res.send({ error: "User Already Registered" });
      }
    })
    .catch(function(error) {
      console.log(error, "Error");
      res.send({
        type: "error",
        code: 404,
        status: "Not found",
        error: "Please signup",
        data: error
      });
    });
};

const signin = function(req, res, next) {
  var email_id = req.body.email_id;
  var password = req.body.password;
  console.log(req.body, "0===");
  User.findOne({ where: { email: email_id } })
    .then(function(old_user) {
      if (!old_user) {
        res.send({
          type: "error",
          code: 404,
          status: "Not found",
          error: "Please signin"
        });
      }
      if (old_user) {
        if (bcrypt.compareSync(password, old_user.password)) {
          var token = jwt.sign(
            { id: old_user.id, email: old_user.email },
            data.JWT_SECRET,
            {
              expiresIn: 24 * 60 * 60
            }
          );
          // sessionStorage.setItem("token", token);
          // res.cookie("token1", token);
          res.send({ data: "successfully_logged in", token: token });
        }
      }
    })
    .catch(function(error) {
      res.send({
        type: "error",
        code: 404,
        status: "Not found",
        error: "Incorrect password",
        data: error
      });
    });
};
const getUsers = function(req, res, next) {
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
        code: 404,
        status: "Not found",
        error: "Not Retrieved Users",
        data: error
      });
    });
};
module.exports = {
  signup,
  signin,
  getUsers
};
