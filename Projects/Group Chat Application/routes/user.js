const express = require("express");

const User = require("../controllers/user");

const router = express.Router();

// For Sign Up
router.post("/add-user", User.addUser);

// For Log In
router.post("/verify-user", User.verifyUser);

// All users displayed in chat room
router.get("/all-users", User.allUsers);

module.exports = router;
