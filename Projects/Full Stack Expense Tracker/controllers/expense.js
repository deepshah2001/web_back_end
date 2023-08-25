const Expense = require("../models/expense");
const User = require("../models/signup");

const sequelize = require("../util/database");

exports.getExpense = async (req, res, next) => {
  const EXPENSES_PER_PAGE = Number(req.exp_page);
  console.log(EXPENSES_PER_PAGE);
  const page = +req.query.page || 1;

  console.log(page);

  let totalExpense;
  // Finding all the expenses of the user with the user id which has been logged in using the token verification

  Expense.count({where: {userId: req.user.id}})
    .then((total) => {
      totalExpense = total;
      return Expense.findAll({ 
        offset: (page-1) * EXPENSES_PER_PAGE,
        limit: EXPENSES_PER_PAGE,
        where: { userId: req.user.id } 
      });
    })
    .then(expenses => {
      res.status(200).json({
        expenses: expenses,
        currentPage: page,
        hasNextPage: EXPENSES_PER_PAGE * page < totalExpense,
        nextPage: page + 1,
        hasPreviousPage: page > 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalExpense / EXPENSES_PER_PAGE),
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({err: err})
    });
  // req.user.getExpenses().then((expenses) => {});
};

exports.addExpense = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { amount, description, category } = req.body;
    // Adding expense of a user with their unique user id in expense table
    const expense = await Expense.create(
      {
        userId: req.user.id,
        amount: amount,
        description: description,
        category: category,
      },
      { transaction: t }
    );

    // Updating the total expense after a user adds a new expense
    await User.update(
      {
        totalExpense: sequelize.literal(
          `COALESCE(totalExpense, 0) + ${Number(amount)}`
        ),
      },
      { transaction: t, where: { id: req.user.id } }
    );
    await t.commit();
    res.status(201).json({ expense: expense });
  } catch (err) {
    console.log(err);
    await t.rollback();
    res.status(500).json({ error: err });
  }
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

    const user = await User.findOne({ where: { id: req.user.id } });
    // Updating the total expense after the user deletes an expense
    user.update({ totalExpense: user.totalExpense - expense.amount });

    await expense.destroy();
  } catch (err) {
    console.log(err);
  }
  // Sending back the updated expenses list of a user
  const expenses = await Expense.findAll();
  res.status(200).json({ expenses: expenses });
};
