const Sequelize = require('sequelize');

const Expense = require("../models/expense");
const User = require("../models/signup");

// Showing leaderboard according to the expenses done by all the users
exports.showLeaderboard = async (req, res, next) => {
    const leaderboard = await User.findAll({
        attributes: ['id', 'name', [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount']],
        include: [{
            model: Expense,
            attributes: [],
        }],
        group: 'id',
        order: [['total_amount', 'DESC']]
    });

    // const leaderboard = expenses.map(expense => ({
    //     userName: expense.user.dataValues.name,
    //     total_amount: expense.dataValues.total_amount
    // }));

    console.log(leaderboard);

    res.status(200).json({leaderboard: leaderboard});
};
