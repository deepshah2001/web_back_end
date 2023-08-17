const Expense = require('../models/expense');

exports.getExpense = async(req, res, next) => {
    const expenses = await Expense.findAll();
    res.status(200).json({expenses: expenses});
}

exports.addExpense = async (req, res, next) => {
    const {amount, description, category} = req.body;

    const expense = await Expense.create({
        amount: amount,
        description: description,
        category: category
    });

    res.status(201).json({expense: expense});
};

exports.deleteExpense = async (req, res, next) => {
    const expenseId = req.params.expenseId;

    Expense.findByPk(expenseId)
        .then(expense => {
            return expense.destroy();
        })
        .then(() => console.log("Deleted!"))
        .catch(err => {
            console.log(err);
        });
    
    const expenses = await Expense.findAll();
    res.status(200).json({expenses: expenses});
};
