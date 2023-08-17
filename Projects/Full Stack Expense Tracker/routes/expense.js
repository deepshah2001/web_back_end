const express = require('express');
const expenses = require('../controllers/expense');

const router = express.Router();

router.get("/expenses", expenses.getExpense)

router.post("/add-expense", expenses.addExpense);

router.post("/delete-expense/:expenseId", expenses.deleteExpense);

module.exports = router;