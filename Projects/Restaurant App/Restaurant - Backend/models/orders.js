const Sequelize = require("sequelize");

const sequelize = require("../util/database");

// Creating a model for the table in the database
const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dish: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  table: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Order;
