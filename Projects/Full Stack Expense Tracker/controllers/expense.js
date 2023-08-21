const Expense = require("../models/expense");
const User = require('../models/signup');

exports.getExpense = async (req, res, next) => {
  // Finding all the expenses of the user with the user id which has been logged in using the token verification
  const expenses = await Expense.findAll({ where: { userId: req.user.id } });
  res.status(200).json({ expenses: expenses });
  // req.user.getExpenses().then((expenses) => {});
};

exports.addExpense = async (req, res, next) => {
  const { amount, description, category } = req.body;
  // Adding expense of a user with their unique user id in expense table
  const expense = await Expense.create({
    userId: req.user.id,
    amount: amount,
    description: description,
    category: category,
  });

  const user = await User.findOne({where: {id: req.user.id}});
  
  user.update({totalExpense: (user.totalExpense === null) ? Number(amount) : (user.totalExpense + Number(amount))});

  res.status(201).json({ expense: expense });
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.expenseId;
    // Only allowing to delete the expense by the owner of the expense
    const expense = await Expense.findOne({
      where: { id: expenseId, userId: req.user.id },
    });
    if (!expense) {
      return res.send(404).json({ message: "No such expense!" });
    }

    const user = await User.findOne({where: {id: req.user.id}});
    user.update({totalExpense: (user.totalExpense - expense.amount)});

    await expense.destroy();
  } catch (err) {
    console.log(err);
  }
  // Sending back the updated expenses list of a user
  const expenses = await Expense.findAll();
  res.status(200).json({ expenses: expenses });
};
