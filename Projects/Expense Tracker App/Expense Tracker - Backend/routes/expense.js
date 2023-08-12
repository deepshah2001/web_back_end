const express = require("express");

const router = express.Router();

const expenses = require("../controllers/expenses");

// For adding a new expense into table
router.post("/add-expense", expenses.postNewExpense);

// For editing a previously existed expenses in the table
router.put("/add-expense", expenses.putNewExpense);

// For retrieving all the expenses from the databse which is present
router.get("/", expenses.getAllExpenses);

// For deleting a specific expenses from the list and database
router.post("/delete-expense/:expenseId", expenses.deleteExpense);

// For editing a expense present in the list or database
router.post("/edit-expense/:expenseId", expenses.editExpense);

module.exports = router;
