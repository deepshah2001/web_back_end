// Using sequelize for handling SQL Queries without writing it
const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense-tracker", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
