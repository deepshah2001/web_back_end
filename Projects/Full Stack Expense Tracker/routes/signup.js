const express = require("express");

// Used middleware for verification of user with their id
const authentication = require('../middlewares/auth');
const users = require("../controllers/signup");

const router = express.Router();

// For signup
router.post("/signup/user", users.addUser);

// For login
router.post("/login/user", users.existingUser);

// Download Expenses for a user
router.get("/user/download", authentication.getVerified, users.getAllExpense);

// List of all downloaded files in the past
router.get("/user/file-downloaded", authentication.getVerified, users.getFilesDownloaded);

module.exports = router;
