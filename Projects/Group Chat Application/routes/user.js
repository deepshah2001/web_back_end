const express = require("express");

const User = require("../controllers/user");

const router = express.Router();

router.post("/add-user", User.addUser);
