const express = require("express");

const User = require("../controllers/user");

const router = express.Router();

// For Sign Up
router.post("/add-user", User.addUser);

// For Log In
router.post("/verify-user", User.verifyUser);

module.exports = router;
