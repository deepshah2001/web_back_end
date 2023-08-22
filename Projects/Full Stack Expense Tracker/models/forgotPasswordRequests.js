const Sequelize = require("sequelize");

const sequelize = require("../util/database");

// Created model for structure of table in database
const resetPassword = sequelize.define("forgotPasswordRequest", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = resetPassword;
