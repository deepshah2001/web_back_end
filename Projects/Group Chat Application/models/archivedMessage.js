const Sequelize = require("sequelize");

const sequelize = require("../util/database");

// Creating Model for User so that sequelize can create a table respected to it.
const ArchivedMessage = sequelize.define("archivedMessage", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ArchivedMessage;
