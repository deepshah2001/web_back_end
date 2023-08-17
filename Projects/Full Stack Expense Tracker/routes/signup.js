const express = require("express");
const users = require("../controllers/signup");

const router = express.Router();

// For signup
router.post("/signup/user", users.addUser);

// For login
router.post("/login/user", users.existingUser);

module.exports = router;