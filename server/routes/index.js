const todosController = require("../controllers").todos;
const User = require("../controllers/user");
const Auth = require("../routes/auth");
module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Todos API!"
    })
  );

  //---------------TODO--------------------//
  // app.post("/api/todos", Auth.sessionChecker, todosController.create);
  // app.post("/api/todos/create", Auth.sessionChecker, todosController.get);

  //----------------USERS-----------------//
  app.post("/api/user/signup", User.signup);
  app.post("/api/user/signin", User.signin);
  app.get("/api/user/get", Auth.sessionChecker, User.getUsers);
  app.post("/api/user/forgot", User.checkForgotPassword);

  app.get("/api/customers", (req, res) => {
    const customers = [
      { id: 1, firstName: "John", lastName: "Doe" },
      { id: 2, firstName: "Brad", lastName: "Traversy" },
      { id: 3, firstName: "Mary", lastName: "Swanson" }
    ];
    res.json(customers);
  });
};
