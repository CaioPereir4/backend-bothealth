const Sequelize = require("sequelize");
const database = require("./db.js");

const User = database.define(
    'user', 
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      secret_key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      role : {
        type: Sequelize.STRING,
        allowNull: false
      },
      company : {
        type: Sequelize.STRING,
        allowNull: false
      },
      thread_id : {
        type: Sequelize.STRING,
        allowNull: true
      },
      messages: {
        type: Sequelize.JSON,
        allowNull: true
      }
    }
);

module.exports = User;