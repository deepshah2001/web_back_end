const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expense = require("../models/expense");
const User = require("../models/signup");

// Showing leaderboard according to the expenses done by all the users
exports.showLeaderboard = async (req, res, next) => {
    const expenses = await Expense.findAll({
        attributes: ['userId', [Sequelize.fn('SUM', sequelize.col('amount')), 'total_amount']],
        include: [{
            model: User,
            attributes: ['name'],
            required: true,
        }],
        group: 'userId',
        order: [['total_amount', 'DESC']]
    });

    console.log(expenses);

    const leaderboard = expenses.map(expense => ({
        userName: expense.user.dataValues.name,
        total_amount: expense.dataValues.total_amount
    }));

    res.status(201).json({leaderboard: leaderboard});
};
