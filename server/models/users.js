"use strict";
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );
  console.log(users, "---users model");
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};
