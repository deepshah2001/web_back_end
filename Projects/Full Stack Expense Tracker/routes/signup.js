const express = require("express");

const router = express.Router();

const users = require("../controllers/signup");

router.post("/signup/user", users.addUser);
