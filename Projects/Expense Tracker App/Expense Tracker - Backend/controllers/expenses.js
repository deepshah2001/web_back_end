const Expense = require("../models/expenses");

// Adding new expense into the table or database
exports.postNewExpense = async (req, res, next) => {
  console.log(req.body);
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;

  const expense = await Expense.create({
    amount: amount,
    description: description,
    category: category,
  });
  // For passing the data to frontend in json format
  res.status(201).json({ newExpense: expense });
};

// Updating the existing expense that is present in the table or database
exports.putNewExpense = async (req, res, next) => {
  const expenseId = req.body.id;
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  Expense.findOne({ where: { id: expenseId } })
    .then((expense) => {
      expense.amount = amount;
      expense.description = description;
      expense.category = category;
      res.status(201).json({ newExpense: expense });
      // Saving the updated expense into table or database
      return expense.save();
    })
    .then(() => console.log("Edited"))
    .catch((err) => console.log(err));
};

// Retrieving all expenses present in the table or database
exports.getAllExpenses = async (req, res, next) => {
  const expenses = await Expense.findAll();
  res.status(200).json({ expenses: expenses });
};

// Deleting an expense using its expenseId present in table or database
exports.deleteExpense = async (req, res, next) => {
  const expenseId = req.params.expenseId;
  Expense.findByPk(expenseId)
    .then((expense) => {
      // For deleting
      return expense.destroy();
    })
    .then(() => {
      console.log("Deleted!");
    })
    .catch((err) => console.log(err));
  // Passing the updated table again to front-end for updation
  const expenses = await Expense.findAll();
  res.status(201).json({ expenses: expenses });
};

// For editing an expense using its expenseId and retrieving its data into the form in front-end
exports.editExpense = async (req, res, next) => {
  const expenseId = req.params.expenseId;
  Expense.findByPk(expenseId)
    .then((expense) => {
      res.status(201).json({ expenses: expense });
    })
    .catch((err) => console.log(err));
};
