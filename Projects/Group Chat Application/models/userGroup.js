const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const UserGroup = require('usersgroup', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
})