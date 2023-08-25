const Sequelize = require('sequelize');

const sequelzie = new Sequelize('chat-app', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelzie;