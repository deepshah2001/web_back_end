const express = require("express");

// Used middleware for verification of user with their id and storing it in expense table in database.
const userAuthentication = require("../middlewares/auth");
const expenses = require("../controllers/expense");

const router = express.Router();

// /expenses => userAuthentication (middleware) => (next()) -> expenses (middleware)   [Flow of request]
router.get("/expenses", userAuthentication.getVerified, expenses.getExpense);

router.post(
  "/add-expense",
  userAuthentication.getVerified,
  expenses.addExpense
);

router.delete(
  "/delete-expense/:expenseId",
  userAuthentication.getVerified,
  expenses.deleteExpense
);

module.exports = router;
