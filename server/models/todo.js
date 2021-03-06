"use strict";
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      title: DataTypes.STRING
    },
    {}
  );
  Todo.associate = models => {
    Todo.hasMany(models.TodoItem, {
      foreignKey: "todoId",
      as: "todoItems"
    });
  };
  return Todo;
};
