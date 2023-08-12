// Using sequelize to handle SQL queries in our back-end
const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
