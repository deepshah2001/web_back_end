const Sequelize = require("sequelize");

const sequelize = require("../util/database");

// Created model for structure of table in database
const FilesDownloaded = sequelize.define("filesdownload", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = FilesDownloaded;
