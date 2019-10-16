// const Todo = require("../models").Todo;
// console.log(Todo);
// module.exports = {
//   create(req, res) {
//     Todo.create({
//       title: req.body.title
//     })
//       .then(todo => res.status(201).send(todo))
//       .catch(error => res.status(400).send(error));
//   },

//   get(req, res) {
//     var title = req.body.title;
//     console.log(title, "title");
//     Todo.findOne({ where: { title: title } })
//       .then(function(todo_get) {
//         if (todo_get) {
//           console.log(todo_get, "--------todo----------");
//           res.send({
//             success: todo_get,
//             message: "Already data registered !!!"
//           });
//         }
//         if (!todo_get) {
//           Todo.create({
//             title: title
//           })
//             .then(todo => {
//               console.log(todo, "--------todo----------");
//               res.status(201).send(todo);
//             })

//             .catch(error => res.status(400).send(error));
//         }
//       })
//       .catch(function(error) {
//         res.status(400).send(error);
//       });
//   }
// };
