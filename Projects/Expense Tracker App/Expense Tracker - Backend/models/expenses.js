const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// Created a model by which our table of database will be designed.
const Expense = sequelize.define('expenses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    amount: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Expense;