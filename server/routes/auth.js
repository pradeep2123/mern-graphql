var jwt = require("jsonwebtoken");
var User = require("../models").users;
var data = require("../config/data").data;
const sessionChecker = function(req, res, next) {
  if (req.headers.authorization) {
    console.log("DATA VERIFYING OR NOT !!!!!");
    console.log(req.headers.authorization, "req.headers.authorization");
    jwt.verify(req.headers.authorization, data.JWT_SECRET, (error, decoded) => {
      if (error) {
        console.log(error, "error");
        res.send({
          type: "error",
          code: 404,
          status: "Not found",
          error: "Please signin"
        });
      } else {
        console.log(decoded, "-----------DECODED----------");
        req.email = decoded.email;
        User.findOne({ where: { email: req.email } })
          .then(user => {
            req.user = user;
            return next();
          })
          .catch(error => {
            console.log(error, "error");
            res.send({
              type: "error",
              code: 404,
              status: "Not found",
              error: "Please signin"
            });
          });
      }
    });
  } else {
    console.log("Please login or signup");
    res.send({
      type: "error",
      code: 404,
      status: "Not found",
      error: "Please signin"
    });
  }
};

module.exports = {
  sessionChecker
};
