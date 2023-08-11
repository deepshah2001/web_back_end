const express = require("express");
const path = require("path");

const userController = require("../controllers/user");

const router = express.Router();

// http://localhost:portNumber/add-user
router.post("/add-user", userController.postUsers);

// http://localhost:portNumber/get-user
router.get("/get-users", userController.getUsers);

// http://localhost:portNumber/delete-user/:userId
router.post("/deleteUser/:userId", userController.deleteUsers);

module.exports = router;
